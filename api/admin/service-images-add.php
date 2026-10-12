<?php
/**
 * Admin API — Upload / Replace a service image (UPSERT)
 *
 * POST multipart/form-data:
 *   service_key   (required) — unique service identifier e.g. "acupuncture"
 *   service_label (required) — human-readable name
 *   image         (required) — file upload
 *   alt_text      (optional)
 *
 * Behaviour:
 *   • If no image exists for service_key  → INSERT
 *   • If an image already exists          → DELETE old file, UPDATE record
 *
 * Returns: { success, service_key, service_label, image, alt_text, id, created_at }
 */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

header('Cache-Control: no-store');

function ensureServiceImagesTable(PDO $pdo): void {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `service_images` (
        `id`            VARCHAR(60)  NOT NULL,
        `service_key`   VARCHAR(100) NOT NULL COMMENT 'Unique service identifier',
        `service_label` VARCHAR(150) NOT NULL,
        `image`         VARCHAR(255) NOT NULL COMMENT 'Root-relative path: /uploads/services/<file>',
        `alt_text`      VARCHAR(200) DEFAULT '',
        `sort_order`    INT          DEFAULT 0,
        `created_at`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        `updated_at`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uq_service_key` (`service_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

try {
    $service_key   = trim($_POST['service_key']   ?? '');
    $service_label = trim($_POST['service_label'] ?? '');
    $alt_text      = trim($_POST['alt_text']      ?? '');

    if (empty($service_key) || empty($service_label)) {
        sendJson(["success" => false, "error" => "service_key and service_label are required"], 400);
    }

    // Validate uploaded file
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        $uploadErrors = [
            UPLOAD_ERR_INI_SIZE   => 'File exceeds server limit',
            UPLOAD_ERR_FORM_SIZE  => 'File too large',
            UPLOAD_ERR_PARTIAL    => 'File only partially uploaded',
            UPLOAD_ERR_NO_FILE    => 'No file uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temp directory',
            UPLOAD_ERR_CANT_WRITE => 'Cannot write to disk',
            UPLOAD_ERR_EXTENSION  => 'Upload blocked by extension',
        ];
        $errCode = $_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE;
        $errMsg  = $uploadErrors[$errCode] ?? 'Upload failed';
        sendJson(["success" => false, "error" => $errMsg], 400);
    }

    // Validate MIME type
    $allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    $mimeType = mime_content_type($_FILES['image']['tmp_name']);
    if (!in_array($mimeType, $allowedMimes)) {
        sendJson(["success" => false, "error" => "Only JPG, PNG, WEBP, GIF images allowed. Got: $mimeType"], 400);
    }

    // Validate file size (max 8 MB)
    if ($_FILES['image']['size'] > 8 * 1024 * 1024) {
        sendJson(["success" => false, "error" => "Image must be under 8 MB"], 400);
    }

    // Ensure upload directory exists
    $uploadDir = getUploadDir('services');

    // Build a clean, predictable filename: svc-{service_key}-{timestamp}.{ext}
    $mimeToExt = ['image/jpeg'=>'jpg','image/jpg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];
    $ext      = $mimeToExt[$mimeType] ?? 'jpg';
    $cleanKey = preg_replace('/[^a-z0-9]+/', '-', strtolower($service_key));
    $fileName = 'svc-' . $cleanKey . '-' . round(microtime(true) * 1000) . '.' . $ext;
    $target   = $uploadDir . DIRECTORY_SEPARATOR . $fileName;
    $filePath = '/uploads/services/' . $fileName;   // root-relative, stored in DB

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
        sendJson(["success" => false, "error" => "Failed to save file. Check upload directory permissions."], 500);
    }

    $pdo = getDbConnection();
    ensureServiceImagesTable($pdo);

    // Try to add UNIQUE KEY if it doesn't exist yet (safe for production DBs without it)
    try {
        $pdo->exec("ALTER TABLE `service_images` ADD UNIQUE KEY `uq_service_key` (`service_key`)");
    } catch (Exception $ignore) {
        // Key already exists or duplicate data prevents it — we'll handle duplicates below
    }

    // ── UPSERT: one image per service ─────────────────────────────────────────
    // Delete ALL existing records for this service_key (handles duplicates on prod)
    $existing = $pdo->prepare("SELECT id, image FROM `service_images` WHERE `service_key` = ?");
    $existing->execute([$service_key]);
    $oldRows = $existing->fetchAll(PDO::FETCH_ASSOC);

    foreach ($oldRows as $old) {
        // Delete old physical file safely across environments
        if (!empty($old['image'])) {
            deletePhysicalFile($old['image']);
        }
    }
    // Remove all old DB records for this service
    if (count($oldRows) > 0) {
        $pdo->prepare("DELETE FROM `service_images` WHERE `service_key` = ?")->execute([$service_key]);
    }

    // Always INSERT a single clean new record
    $id = 'svc-' . $cleanKey . '-' . substr(md5(uniqid(rand(), true)), 0, 8);
    $stmt = $pdo->prepare(
        "INSERT INTO `service_images` (`id`, `service_key`, `service_label`, `image`, `alt_text`)
         VALUES (?, ?, ?, ?, ?)"
    );
    $stmt->execute([$id, $service_key, $service_label, $filePath, $alt_text ?: $service_label]);

    sendJson([
        "success"       => true,
        "id"            => $id,
        "service_key"   => $service_key,
        "service_label" => $service_label,
        "image"         => $filePath,
        "alt_text"      => $alt_text ?: $service_label,
        "created_at"    => date('Y-m-d H:i:s'),
    ]);

} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

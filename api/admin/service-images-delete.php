<?php
/**
 * Admin API — Delete a service image
 *
 * POST JSON: { "service_key": "acupuncture" }
 *        OR: { "id": "svc-acupuncture-xyz" }
 *
 * Deletes the physical file and removes the DB record.
 * After deletion the frontend will fall back to the bundled static image.
 */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

header('Cache-Control: no-store');

function ensureServiceImagesTable(PDO $pdo): void {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `service_images` (
        `id`            VARCHAR(60)  NOT NULL,
        `service_key`   VARCHAR(100) NOT NULL,
        `service_label` VARCHAR(150) NOT NULL,
        `image`         VARCHAR(255) NOT NULL,
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
    $rawBody = file_get_contents('php://input');
    $data    = json_decode($rawBody, true);

    $id          = trim($data['id']          ?? '');
    $service_key = trim($data['service_key'] ?? '');

    if (empty($id) && empty($service_key)) {
        sendJson(["success" => false, "error" => "Either 'id' or 'service_key' is required"], 400);
    }

    $pdo = getDbConnection();
    ensureServiceImagesTable($pdo);

    // Fetch the record to get the file path
    if (!empty($id)) {
        $stmt = $pdo->prepare("SELECT * FROM `service_images` WHERE `id` = ? LIMIT 1");
        $stmt->execute([$id]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM `service_images` WHERE `service_key` = ? LIMIT 1");
        $stmt->execute([$service_key]);
    }

    $entry = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$entry) {
        sendJson(["success" => false, "error" => "Service image not found"], 404);
    }

    // Delete the physical file safely across environments
    $imgPath = $entry['image'] ?? '';
    if ($imgPath) {
        deletePhysicalFile($imgPath);
    }

    // Remove DB record
    $del = $pdo->prepare("DELETE FROM `service_images` WHERE `id` = ?");
    $del->execute([$entry['id']]);

    sendJson(["success" => true, "deleted_key" => $entry['service_key']]);

} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

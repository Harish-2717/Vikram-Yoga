<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $name = $_POST['name'] ?? 'Untitled';
        $category = $_POST['category'] ?? 'Our Centre';

        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            sendJson(["success" => false, "error" => "Image file is required"], 400);
        }

        // Validate MIME type
        $allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        $mimeType = mime_content_type($_FILES['image']['tmp_name']);
        if (!in_array($mimeType, $allowedMimes)) {
            sendJson(["success" => false, "error" => "Only JPG, PNG, WEBP, GIF images allowed."], 400);
        }

        // Validate file size (max 8 MB)
        if ($_FILES['image']['size'] > 8 * 1024 * 1024) {
            sendJson(["success" => false, "error" => "Image must be under 8 MB"], 400);
        }

        // Use gallery subfolder for consistency with existing gallery records
        $uploadDir = getUploadDir('gallery');

        $mimeToExt = ['image/jpeg' => 'jpg', 'image/jpg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
        $ext = $mimeToExt[$mimeType] ?? 'jpg';
        $fileName = 'gal-' . time() . '-' . substr(md5(uniqid(rand(), true)), 0, 7) . '.' . $ext;
        $targetPath = $uploadDir . DIRECTORY_SEPARATOR . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            // Store as /uploads/gallery/... path (web-accessible)
            $filePath = "/uploads/gallery/" . $fileName;
        } else {
            sendJson(["success" => false, "error" => "Failed to save uploaded file"], 500);
        }

        $pdo = getDbConnection();
        $id = "gal-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);

        $stmt = $pdo->prepare("INSERT INTO `gallery_images` (`id`, `name`, `image`, `category`, `created_at`) VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$id, $name, $filePath, $category]);

        sendJson(["success" => true, "id" => $id, "image" => $filePath, "name" => $name, "category" => $category]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

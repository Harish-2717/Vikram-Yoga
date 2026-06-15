<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $url = $_POST['social_media_url'] ?? '#';

        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            sendJson(["success" => false, "error" => "Image file is required"], 400);
        }

        $uploadDir = __DIR__ . '/../../public/uploads';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $originalName = $_FILES['image']['name'];
        $cleanName = preg_replace('/[^a-zA-Z0-9.-]/', '_', $originalName);
        $fileName = time() . "-" . $cleanName;
        $targetPath = $uploadDir . '/' . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $filePath = "/uploads/" . $fileName;
        } else {
            sendJson(["success" => false, "error" => "Failed to save uploaded file"], 500);
        }

        $pdo = getDbConnection();
        $id = "img-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);

        $stmt = $pdo->prepare("INSERT INTO `social_images` (`id`, `image`, `social_media_url`, `created_at`) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$id, $filePath, $url]);

        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

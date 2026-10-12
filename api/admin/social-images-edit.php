<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = '';
        $url = '#';

        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        if (strpos($contentType, 'application/json') !== false) {
            $rawBody = file_get_contents('php://input');
            $data = json_decode($rawBody, true);
            $id = $data['id'] ?? '';
            $url = $data['social_media_url'] ?? '#';
        } else {
            $id = $_POST['id'] ?? '';
            $url = $_POST['social_media_url'] ?? '#';
        }

        if (empty($id)) {
            sendJson(["success" => false, "error" => "ID is required"], 400);
        }

        $pdo = getDbConnection();

        $stmtCheck = $pdo->prepare("SELECT * FROM `social_images` WHERE `id` = ?");
        $stmtCheck->execute([$id]);
        $existing = $stmtCheck->fetch();
        if (!$existing) {
            sendJson(["success" => false, "error" => "Social media image not found"], 404);
        }

        $newFilePath = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = getUploadDir();
            $originalName = $_FILES['image']['name'];
            $cleanName = preg_replace('/[^a-zA-Z0-9.-]/', '_', $originalName);
            $fileName = time() . "-" . $cleanName;
            $targetPath = $uploadDir . '/' . $fileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                $newFilePath = "/uploads/" . $fileName;

                if (!empty($existing['image'])) {
                    deletePhysicalFile($existing['image']);
                }
            } else {
                sendJson(["success" => false, "error" => "Failed to save replacement image"], 500);
            }
        }

        if ($newFilePath) {
            $stmt = $pdo->prepare("UPDATE `social_images` SET `social_media_url` = ?, `image` = ? WHERE `id` = ?");
            $stmt->execute([$url, $newFilePath, $id]);
        } else {
            $stmt = $pdo->prepare("UPDATE `social_images` SET `social_media_url` = ? WHERE `id` = ?");
            $stmt->execute([$url, $id]);
        }

        sendJson([
            "success" => true,
            "id" => $id,
            "social_media_url" => $url,
            "image" => $newFilePath ?: $existing['image']
        ]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

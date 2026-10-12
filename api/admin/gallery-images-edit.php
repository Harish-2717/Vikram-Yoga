<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = '';
        $name = 'Untitled';
        $category = 'Our Centre';

        // Check if multipart/form-data or application/json
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        if (strpos($contentType, 'application/json') !== false) {
            $rawBody = file_get_contents('php://input');
            $data = json_decode($rawBody, true);
            $id = $data['id'] ?? '';
            $name = $data['name'] ?? 'Untitled';
            $category = $data['category'] ?? 'Our Centre';
        } else {
            // Form data (supports file upload)
            $id = $_POST['id'] ?? '';
            $name = $_POST['name'] ?? 'Untitled';
            $category = $_POST['category'] ?? 'Our Centre';
        }

        if (empty($id)) {
            sendJson(["success" => false, "error" => "ID is required"], 400);
        }

        $pdo = getDbConnection();

        // Check existing record
        $stmtCheck = $pdo->prepare("SELECT * FROM `gallery_images` WHERE `id` = ?");
        $stmtCheck->execute([$id]);
        $existing = $stmtCheck->fetch();
        if (!$existing) {
            sendJson(["success" => false, "error" => "Gallery image not found"], 404);
        }

        // Handle replacement image upload if provided
        $newFilePath = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = getUploadDir();
            $originalName = $_FILES['image']['name'];
            $cleanName = preg_replace('/[^a-zA-Z0-9.-]/', '_', $originalName);
            $fileName = time() . "-" . $cleanName;
            $targetPath = $uploadDir . '/' . $fileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                $newFilePath = "/uploads/" . $fileName;

                // Delete old physical file safely across environments
                if (!empty($existing['image'])) {
                    deletePhysicalFile($existing['image']);
                }
            } else {
                sendJson(["success" => false, "error" => "Failed to save replacement image"], 500);
            }
        }

        if ($newFilePath) {
            $stmt = $pdo->prepare("UPDATE `gallery_images` SET `name` = ?, `category` = ?, `image` = ? WHERE `id` = ?");
            $stmt->execute([$name, $category, $newFilePath, $id]);
        } else {
            $stmt = $pdo->prepare("UPDATE `gallery_images` SET `name` = ?, `category` = ? WHERE `id` = ?");
            $stmt->execute([$name, $category, $id]);
        }

        sendJson([
            "success" => true,
            "id" => $id,
            "name" => $name,
            "category" => $category,
            "image" => $newFilePath ?: $existing['image']
        ]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

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
        if (isset($_FILES['image']) && $_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE) {
            if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
                $errCode = $_FILES['image']['error'];
                $msg = "File upload failed with error code: " . $errCode;
                if ($errCode === UPLOAD_ERR_INI_SIZE || $errCode === UPLOAD_ERR_FORM_SIZE) {
                    $msg = "Uploaded image exceeds the maximum upload size limit allowed by server.";
                } elseif ($errCode === UPLOAD_ERR_PARTIAL) {
                    $msg = "The image file was only partially uploaded. Please try again.";
                }
                sendJson(["success" => false, "error" => $msg], 400);
            }

            // Validate MIME type
            $allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
            $mimeType = mime_content_type($_FILES['image']['tmp_name']);
            if (!in_array($mimeType, $allowedMimes)) {
                sendJson(["success" => false, "error" => "Only JPG, PNG, WEBP, and GIF images are allowed."], 400);
            }

            // Validate file size (max 10MB)
            if ($_FILES['image']['size'] > 10 * 1024 * 1024) {
                sendJson(["success" => false, "error" => "Image must be under 10 MB in size."], 400);
            }

            $uploadDir = getUploadDir();
            $mimeToExt = ['image/jpeg' => 'jpg', 'image/jpg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
            $ext = $mimeToExt[$mimeType] ?? 'jpg';
            $fileName = 'social-' . time() . '-' . substr(md5(uniqid(rand(), true)), 0, 7) . '.' . $ext;
            $targetPath = $uploadDir . DIRECTORY_SEPARATOR . $fileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                $newFilePath = "/uploads/" . $fileName;

                if (!empty($existing['image'])) {
                    deletePhysicalFile($existing['image']);
                }
            } else {
                sendJson(["success" => false, "error" => "Failed to save replacement image to disk"], 500);
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

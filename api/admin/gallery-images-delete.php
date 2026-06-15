<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $rawBody = file_get_contents('php://input');
        $data = json_decode($rawBody, true);
        
        $id = $data['id'] ?? '';

        if (empty($id)) {
            sendJson(["success" => false, "error" => "ID is required"], 400);
        }

        $pdo = getDbConnection();
        $stmt = $pdo->prepare("SELECT * FROM `gallery_images` WHERE `id` = ?");
        $stmt->execute([$id]);
        $entry = $stmt->fetch();

        if (!$entry) {
            sendJson(["success" => false, "error" => "Entry not found"], 404);
        }

        // Unlink file if it exists in uploads or gallery
        $img = $entry['image'];
        if ($img && (strpos($img, '/uploads/') === 0 || strpos($img, '/gallery/') === 0)) {
            $filePath = __DIR__ . '/../../public' . $img;
            if (file_exists($filePath)) {
                @unlink($filePath);
            }
        }

        $delStmt = $pdo->prepare("DELETE FROM `gallery_images` WHERE `id` = ?");
        $delStmt->execute([$id]);

        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

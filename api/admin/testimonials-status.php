<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $rawBody = file_get_contents('php://input');
        $data = json_decode($rawBody, true);
        
        $id = $data['id'] ?? '';
        $action = $data['action'] ?? '';
        $status = $data['status'] ?? '';
        
        if (empty($id)) {
            sendJson(["success" => false, "error" => "Testimonial ID is required"], 400);
        }

        $pdo = getDbConnection();
        $stmt = $pdo->prepare("SELECT * FROM `testimonials` WHERE `id` = ?");
        $stmt->execute([$id]);
        $testimonial = $stmt->fetch();
        
        if (!$testimonial) {
            sendJson(["success" => false, "error" => "Testimonial not found"], 404);
        }

        if ($action === 'delete') {
            // Unlink image file if it exists in uploads
            $img = $testimonial['image'];
            if ($img && strpos($img, '/uploads/') === 0) {
                $filePath = __DIR__ . '/../../public' . $img;
                if (file_exists($filePath)) {
                    @unlink($filePath);
                }
            }
            
            $stmtDel = $pdo->prepare("DELETE FROM `testimonials` WHERE `id` = ?");
            $stmtDel->execute([$id]);
        } else {
            if (empty($status) || !in_array($status, ['Approved', 'Rejected', 'Pending'])) {
                sendJson(["success" => false, "error" => "Invalid status"], 400);
            }
            
            $stmtUp = $pdo->prepare("UPDATE `testimonials` SET `status` = ? WHERE `id` = ?");
            $stmtUp->execute([$status, $id]);
        }

        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

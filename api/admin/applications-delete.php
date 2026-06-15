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
        
        // Find corresponding payment
        $stmtPay = $pdo->prepare("SELECT * FROM `payments` WHERE `applicationId` = ?");
        $stmtPay->execute([$id]);
        $payment = $stmtPay->fetch();

        if ($payment) {
            $img = $payment['paymentProofScreenshot'];
            if ($img && strpos($img, '/uploads/') === 0) {
                $filePath = __DIR__ . '/../../public' . $img;
                if (file_exists($filePath)) {
                    @unlink($filePath);
                }
            }
        }

        // Delete application (will cascade delete payments due to foreign key)
        $stmtDel = $pdo->prepare("DELETE FROM `applications` WHERE `id` = ?");
        $stmtDel->execute([$id]);

        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

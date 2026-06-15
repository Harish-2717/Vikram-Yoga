<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $rawBody = file_get_contents('php://input');
        $data = json_decode($rawBody, true);
        
        if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
            sendJson(["success" => false, "error" => "Missing required fields"], 400);
        }

        $pdo = getDbConnection();
        $id = "msg-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);
        
        $stmt = $pdo->prepare("INSERT INTO `contact_messages` (
            `id`, `name`, `email`, `phone`, `interest`, `specificInterest`, `message`, `replyStatus`, `created_at`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())");
        
        $stmt->execute([
            $id,
            $data['name'],
            $data['email'],
            $data['phone'] ?? '',
            $data['interest'] ?? '',
            $data['specificInterest'] ?? '',
            $data['message']
        ]);
        
        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

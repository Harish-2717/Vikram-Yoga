<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDbConnection();
        $stmtMsg = $pdo->query("SELECT * FROM `contact_messages` ORDER BY `created_at` DESC");
        $messages = $stmtMsg->fetchAll();
        
        $stmtRep = $pdo->prepare("SELECT `id`, `message`, `sent_at` FROM `contact_message_replies` WHERE `message_id` = ? ORDER BY `sent_at` ASC");
        
        foreach ($messages as &$msg) {
            $stmtRep->execute([$msg['id']]);
            $msg['replies'] = $stmtRep->fetchAll();
        }
        unset($msg); // break reference
        
        sendJson($messages);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

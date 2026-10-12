<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

try {
    $pdo = getDbConnection();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];
    $id = trim($data['id'] ?? $_GET['id'] ?? '');

    if (!$id) {
        sendJson(["success" => false, "error" => "Application ID required"], 400);
    }

    $check = $pdo->prepare("SELECT `id` FROM `retreat_applications` WHERE `id` = ?");
    $check->execute([$id]);
    if (!$check->fetch()) {
        sendJson(["success" => false, "error" => "Application not found"], 404);
    }

    $pdo->prepare("DELETE FROM `retreat_applications` WHERE `id` = ?")->execute([$id]);
    sendJson(["success" => true]);
} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

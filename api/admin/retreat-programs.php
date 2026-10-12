<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all programs (admin sees all, including inactive)
    try {
        $pdo = getDbConnection();
        $stmt = $pdo->query("SELECT * FROM `retreat_programs` ORDER BY `sort_order` ASC, `name` ASC");
        sendJson($stmt->fetchAll());
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }

} elseif ($method === 'POST') {
    // Create new program
    try {
        $pdo = getDbConnection();
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: [];

        $name = trim($data['name'] ?? '');
        if (!$name) {
            sendJson(["success" => false, "error" => "Program name is required"], 400);
        }

        $id = "rp-" . date('Ymd') . "-" . substr(md5(uniqid(rand(), true)), 0, 8);
        $stmt = $pdo->prepare("INSERT INTO `retreat_programs` (`id`, `name`, `description`, `duration`, `is_active`, `sort_order`) VALUES (?,?,?,?,?,?)");
        $stmt->execute([
            $id,
            $name,
            trim($data['description'] ?? ''),
            trim($data['duration'] ?? ''),
            isset($data['is_active']) ? (int)$data['is_active'] : 1,
            (int)($data['sort_order'] ?? 0)
        ]);
        sendJson(["success" => true, "id" => $id]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }

} elseif ($method === 'PUT') {
    // Update existing program
    try {
        $pdo = getDbConnection();
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: [];

        $id = trim($data['id'] ?? '');
        $name = trim($data['name'] ?? '');
        if (!$id || !$name) {
            sendJson(["success" => false, "error" => "Program ID and name are required"], 400);
        }

        $stmt = $pdo->prepare("UPDATE `retreat_programs` SET `name`=?, `description`=?, `duration`=?, `is_active`=?, `sort_order`=?, `updated_at`=NOW() WHERE `id`=?");
        $stmt->execute([
            $name,
            trim($data['description'] ?? ''),
            trim($data['duration'] ?? ''),
            isset($data['is_active']) ? (int)$data['is_active'] : 1,
            (int)($data['sort_order'] ?? 0),
            $id
        ]);
        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }

} elseif ($method === 'DELETE') {
    // Delete program (only if no applications reference it)
    try {
        $pdo = getDbConnection();
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: [];
        $id = trim($data['id'] ?? $_GET['id'] ?? '');

        if (!$id) {
            sendJson(["success" => false, "error" => "Program ID required"], 400);
        }

        // Soft check — don't delete if applications exist (preserve data integrity)
        $usageCheck = $pdo->prepare("SELECT COUNT(*) FROM `retreat_applications` WHERE `program_id` = ?");
        $usageCheck->execute([$id]);
        $count = $usageCheck->fetchColumn();
        if ($count > 0) {
            // Deactivate instead of delete
            $pdo->prepare("UPDATE `retreat_programs` SET `is_active` = 0 WHERE `id` = ?")->execute([$id]);
            sendJson(["success" => true, "message" => "Program deactivated (has {$count} application(s)). Cannot be permanently deleted."]);
        } else {
            $pdo->prepare("DELETE FROM `retreat_programs` WHERE `id` = ?")->execute([$id]);
            sendJson(["success" => true, "message" => "Program deleted."]);
        }
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }

} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

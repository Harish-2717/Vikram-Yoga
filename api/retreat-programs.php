<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDbConnection();
        $stmt = $pdo->query("SELECT `id`, `name`, `description`, `duration` FROM `retreat_programs` WHERE `is_active` = 1 ORDER BY `sort_order` ASC, `name` ASC");
        $programs = $stmt->fetchAll();
        sendJson($programs);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authenticated = isset($_SESSION['admin_user']);
    sendJson(["authenticated" => $authenticated]);
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

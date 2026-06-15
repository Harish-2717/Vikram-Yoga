<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $rawBody = file_get_contents('php://input');
        $data = json_decode($rawBody, true);
        
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        
        if (empty($username) || empty($password)) {
            sendJson(["success" => false, "error" => "Username and password are required"], 400);
        }

        $pdo = getDbConnection();
        $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `username` = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user) {
            sendJson(["success" => false, "error" => "Invalid username or password"], 401);
        }

        // Verify password using standard password_verify (seeded by migrate.php)
        if (!password_verify($password, $user['password_hash'])) {
            sendJson(["success" => false, "error" => "Invalid username or password"], 401);
        }

        // Generate a new secure session token
        $token = bin2hex(random_bytes(32));

        // Restart session with the new token as the session ID
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_destroy();
        }
        
        session_id($token);
        session_start();
        $_SESSION['admin_user'] = $username;

        // Set cookie so future page loads or browser refreshes can use it
        setcookie('session_token', $token, time() + 86400, '/');

        sendJson(["success" => true, "token" => $token]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

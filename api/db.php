<?php
// Prevent direct access to variables
if (session_status() === PHP_SESSION_NONE) {
    // Session is started when required
}

// Enable error reporting for debugging, disable in production if needed
ini_set('display_errors', 1);
error_reporting(E_ALL);

function getDbConnection() {
    $host = 'localhost';
    $dbName = 'yoga';
    $user = 'root';
    $pass = '';

    try {
        $dsn = "mysql:host={$host};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        
        // Ensure database exists and select it
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE `{$dbName}`");
        
        return $pdo;
    } catch (PDOException $e) {
        header("HTTP/1.1 500 Internal Server Error");
        header("Content-Type: application/json");
        echo json_encode(["success" => false, "error" => "Database connection failure: " . $e->getMessage()]);
        exit();
    }
}

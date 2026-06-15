<?php
// Prevent direct access to variables
if (session_status() === PHP_SESSION_NONE) {
    // Session is started when required
}

// Enable error reporting for debugging, disable in production if needed
ini_set('display_errors', 1);
error_reporting(E_ALL);

function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);
            // Remove quotes if present
            $value = trim($value, '"\'');
            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                putenv("{$name}={$value}");
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}

// Load root .env file
loadEnv(__DIR__ . '/../.env');

function getDbConnection() {
    $host = getenv('DB_HOST') ?: 'localhost';
    $dbName = getenv('DB_NAME') ?: 'emerald_serenity_hub';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';

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

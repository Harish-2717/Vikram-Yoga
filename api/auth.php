<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function sendJson($data, $status = 200) {
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function getBearerToken() {
    $headers = null;
    // Try apache_request_headers first
    if (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server keys can be case-insensitive
        foreach ($requestHeaders as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $headers = $value;
                break;
            }
        }
    }
    
    if (!$headers && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (!$headers && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $headers = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    
    if ($headers) {
        if (preg_match('/Bearer\s(\S+)/i', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

function startSessionFromToken() {
    $token = getBearerToken();
    
    // Try to get token from JSON request body
    if (!$token && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $rawBody = file_get_contents('php://input');
        $body = json_decode($rawBody, true);
        if (is_array($body) && isset($body['token'])) {
            $token = $body['token'];
        }
    }
    
    // Try to get token from cookie
    if (!$token && isset($_COOKIE['session_token'])) {
        $token = $_COOKIE['session_token'];
    }

    // Validate token format (hex/alphanumeric)
    if ($token && preg_match('/^[a-zA-Z0-9]{16,128}$/', $token)) {
        session_id($token);
    }
    
    if (session_status() === PHP_SESSION_NONE) {
        // Session lifetime 1 day (86400 seconds)
        ini_set('session.gc_maxlifetime', 86400);
        session_set_cookie_params(86400);
        session_start();
    }
}

// Automatically start session for any auth-dependent API files
startSessionFromToken();

function requireAdmin() {
    if (!isset($_SESSION['admin_user'])) {
        sendJson(["success" => false, "error" => "Unauthorized"], 401);
    }
}

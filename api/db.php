<?php
// Prevent direct access to variables
if (session_status() === PHP_SESSION_NONE) {
    // Session is started when required
}

// Enable error reporting for debugging
ini_set('display_errors', 0);
error_reporting(E_ALL);

function cleanEnvString($val) {
    if ($val === null || $val === false) {
        return '';
    }
    $val = (string)$val;
    // Strip literal escaped control characters like \r, \n, \t
    $val = str_replace(["\\r", "\\n", "\\t"], '', $val);
    // Strip real carriage returns, newlines, tabs, and spaces from edges
    $val = trim($val, " \t\n\r\0\x0B\"'`");
    return $val;
}

$GLOBALS['loaded_env_file'] = null;
$GLOBALS['checked_env_paths'] = [];

function loadEnv($path) {
    $real = realpath($path);
    $checkPath = $real ?: $path;
    $GLOBALS['checked_env_paths'][] = $checkPath;

    if (!file_exists($path) || !is_readable($path)) {
        return false;
    }
    $content = file_get_contents($path);
    if ($content === false) {
        return false;
    }
    
    // Normalize newlines
    $content = str_replace(["\r\n", "\r"], "\n", $content);
    $lines = explode("\n", $content);

    $foundAny = false;
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0 || strpos($line, ';') === 0) {
            continue;
        }
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = cleanEnvString($name);
            $value = cleanEnvString($value);

            if ($name !== '') {
                putenv("{$name}={$value}");
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
                $foundAny = true;
            }
        }
    }

    if ($foundAny) {
        $GLOBALS['loaded_env_file'] = $checkPath;
    }
    return $foundAny;
}

// Check for .env in all common server paths
$possibleEnvPaths = [
    __DIR__ . '/.env',
    __DIR__ . '/../.env',
    __DIR__ . '/../../.env',
];

if (!empty($_SERVER['DOCUMENT_ROOT'])) {
    $possibleEnvPaths[] = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\') . '/.env';
    $possibleEnvPaths[] = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\') . '/api/.env';
    $possibleEnvPaths[] = dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/\\')) . '/.env';
}

foreach ($possibleEnvPaths as $envPath) {
    if (loadEnv($envPath)) {
        break; // Successfully loaded active .env
    }
}

// Support optional static db_config.php if present
if (file_exists(__DIR__ . '/db_config.php')) {
    include_once __DIR__ . '/db_config.php';
}

function getEnvVar($key, $default = '') {
    $val = null;
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        $val = $_ENV[$key];
    } elseif (isset($_SERVER[$key]) && $_SERVER[$key] !== '') {
        $val = $_SERVER[$key];
    } else {
        $g = getenv($key);
        if ($g !== false && $g !== '') {
            $val = $g;
        }
    }

    if ($val === null || $val === '') {
        return $default;
    }

    return cleanEnvString($val);
}

function getDbConnection() {
    $envHost   = getEnvVar('DB_HOST', '');
    $envDbName = getEnvVar('DB_NAME', '');
    $envUser   = getEnvVar('DB_USER', '');
    $envPass   = getEnvVar('DB_PASS', '');

    $attempts = [];

    // Priority 1: If environment variables / .env are explicitly provided
    if ($envHost !== '' || $envDbName !== '') {
        $attempts[] = [
            'host'   => $envHost   ?: 'localhost',
            'dbname' => $envDbName ?: 'u891495087_vikram_yoga',
            'user'   => $envUser   ?: 'u891495087_vikram_yoga',
            'pass'   => $envPass   ?: 'Techinta@2026'
        ];
    }

    // Check if running on live domain/hosting vs local XAMPP
    $isLiveHost = !empty($_SERVER['HTTP_HOST']) && (
        strpos($_SERVER['HTTP_HOST'], 'hostingersite.com') !== false ||
        strpos($_SERVER['HTTP_HOST'], 'localhost') === false
    );

    if ($isLiveHost) {
        // Primary Live Hostinger credentials
        $attempts[] = [
            'host'   => 'localhost',
            'dbname' => 'u891495087_vikram_yoga',
            'user'   => 'u891495087_vikram_yoga',
            'pass'   => 'Techinta@2026'
        ];
        // Local XAMPP fallback
        $attempts[] = [
            'host'   => 'localhost',
            'dbname' => 'yoga',
            'user'   => 'root',
            'pass'   => ''
        ];
    } else {
        // Primary Local XAMPP credentials
        $attempts[] = [
            'host'   => 'localhost',
            'dbname' => 'yoga',
            'user'   => 'root',
            'pass'   => ''
        ];
        // Fallback Live Hostinger credentials
        $attempts[] = [
            'host'   => 'localhost',
            'dbname' => 'u891495087_vikram_yoga',
            'user'   => 'u891495087_vikram_yoga',
            'pass'   => 'Techinta@2026'
        ];
    }

    $lastException = null;

    foreach ($attempts as $config) {
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4";
            $pdo = new PDO($dsn, $config['user'], $config['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            return $pdo;
        } catch (PDOException $e) {
            $lastException = $e;

            // If database does not exist on local root XAMPP (error 1049), auto-create it
            if (($e->getCode() == 1049 || strpos($e->getMessage(), 'Unknown database') !== false) && $config['user'] === 'root') {
                try {
                    $dsnWithoutDb = "mysql:host={$config['host']};charset=utf8mb4";
                    $pdo = new PDO($dsnWithoutDb, $config['user'], $config['pass'], [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]);
                    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$config['dbname']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    $pdo->exec("USE `{$config['dbname']}`");
                    return $pdo;
                } catch (PDOException $createEx) {
                    // Ignore and try next connection candidate
                }
            }
        }
    }

    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json");
    echo json_encode([
        "success" => false, 
        "error" => "Database connection failure: " . ($lastException ? $lastException->getMessage() : "Unknown error"),
        "loaded_env_file" => $GLOBALS['loaded_env_file'] ?: "None (no .env found)",
        "hint" => "Verified connection attempts for both Live Hostinger (u891495087_vikram_yoga) and Local XAMPP."
    ]);
    exit();
}

/**
 * Self-healing helper: moves misplaced files from a legacy public/uploads directory
 * to the real web-accessible uploads/ directory.
 */
function syncOrphanUploads(string $sourceDir, string $destDir): void {
    if (!is_dir($sourceDir) || !is_dir($destDir)) return;
    $items = @scandir($sourceDir);
    if (!$items) return;
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $srcPath = $sourceDir . DIRECTORY_SEPARATOR . $item;
        $destPath = $destDir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($srcPath)) {
            if (!is_dir($destPath)) {
                @mkdir($destPath, 0777, true);
            }
            syncOrphanUploads($srcPath, $destPath);
        } elseif (is_file($srcPath)) {
            if (!file_exists($destPath)) {
                @rename($srcPath, $destPath) || @copy($srcPath, $destPath);
            }
        }
    }
}

/**
 * Resolves the absolute filesystem upload directory.
 *
 * Environments:
 * 1. Live server (Hostinger / cPanel public_html):
 *    - public_html/ IS the web root.
 *    - Uploads live directly in public_html/uploads/
 *
 * 2. Local Vite development:
 *    - Uploads live in public/uploads/ so Vite dev server can serve them at /uploads/...
 */
function getUploadDir(string $subpath = ''): string {
    $subpath = trim(str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $subpath), DIRECTORY_SEPARATOR);

    $apiDir = __DIR__;
    $parent = dirname($apiDir);

    $hasParentUploads = is_dir($parent . DIRECTORY_SEPARATOR . 'uploads');
    $hasPublicDir     = is_dir($parent . DIRECTORY_SEPARATOR . 'public');

    if ($hasParentUploads || !$hasPublicDir) {
        // Live production (e.g. public_html/uploads)
        $uploadRoot = $parent . DIRECTORY_SEPARATOR . 'uploads';
        
        // Self-heal: if files were accidentally uploaded to public_html/public/uploads, sync them
        $legacy = $parent . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'uploads';
        if (is_dir($legacy)) {
            syncOrphanUploads($legacy, $uploadRoot);
        }
    } else {
        // Local Vite dev (e.g. emerald-serenity-hub/public/uploads)
        $uploadRoot = $parent . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'uploads';
    }

    $targetDir = $subpath !== '' ? $uploadRoot . DIRECTORY_SEPARATOR . $subpath : $uploadRoot;

    if (!is_dir($targetDir)) {
        @mkdir($targetDir, 0777, true);
        @chmod($targetDir, 0777);
    }

    return $targetDir;
}

/**
 * Safely removes a file from the uploads directory across environments.
 */
function deletePhysicalFile(string $relativePath): void {
    if (empty($relativePath)) return;
    $clean = '/' . ltrim(str_replace('\\', '/', $relativePath), '/');

    $apiDir = __DIR__;
    $parent = dirname($apiDir);

    $candidates = [
        $parent . $clean,
        $parent . '/public' . $clean,
    ];

    if (!empty($_SERVER['DOCUMENT_ROOT'])) {
        $doc = rtrim(str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']), '/');
        $candidates[] = $doc . $clean;
        $candidates[] = $doc . '/public' . $clean;
    }

    foreach ($candidates as $candidate) {
        if (!empty($candidate) && file_exists($candidate) && is_file($candidate)) {
            @unlink($candidate);
        }
    }
}

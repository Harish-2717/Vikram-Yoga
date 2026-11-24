<?php
/**
 * Diagnostic & Auto-Repair script for Live Server File Structure and Database Paths.
 *
 * Run in browser by navigating to:
 *   https://drvikramyogawellness.com/api/fix-live-paths.php
 *
 * What it does:
 * 1. Resolves the real document root and uploads directory.
 * 2. Ensures uploads/, uploads/services/, uploads/gallery/ subdirs exist with write perms.
 * 3. Migrates any files accidentally trapped in public/uploads/ into uploads/.
 * 4. Checks and fixes DB image paths with /public/ prefix in all image tables.
 * 5. Verifies all gallery, service, social, payment image files exist on disk.
 * 6. Returns a comprehensive JSON report.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

require_once __DIR__ . '/db.php';

$report = [
    "timestamp" => date('Y-m-d H:i:s'),
    "server_environment" => [
        "php_version"   => PHP_VERSION,
        "script_dir"    => __DIR__,
        "document_root" => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
        "http_host"     => $_SERVER['HTTP_HOST'] ?? 'unknown',
    ],
    "resolved_upload_dir"    => null,
    "resolved_gallery_dir"   => null,
    "directories_created"    => [],
    "migrated_orphan_files"  => [],
    "db_checks"              => [],
    "status"                 => "pending"
];

/**
 * Resolve the absolute filesystem path of the public/static gallery directory.
 * On live: public_html/gallery/
 * On local Vite dev: <project>/public/gallery/
 */
function getGalleryDir(): string {
    $apiDir = __DIR__;
    $parent = dirname($apiDir);

    $hasParentUploads = is_dir($parent . DIRECTORY_SEPARATOR . 'uploads');
    $hasPublicDir     = is_dir($parent . DIRECTORY_SEPARATOR . 'public');

    if ($hasParentUploads || !$hasPublicDir) {
        // Live production
        return $parent . DIRECTORY_SEPARATOR . 'gallery';
    } else {
        // Local Vite dev
        return $parent . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'gallery';
    }
}

/**
 * Strip any legacy /public/ prefix from a DB-stored image path.
 * Returns the cleaned path (e.g. /uploads/file.jpg or /gallery/file.jpg).
 */
function cleanImagePath(string $img): string {
    if (strpos($img, '/public/uploads/') === 0) {
        return str_replace('/public/uploads/', '/uploads/', $img);
    }
    if (strpos($img, '/public/gallery/') === 0) {
        return str_replace('/public/gallery/', '/gallery/', $img);
    }
    if (strpos($img, '/public/') === 0) {
        return substr($img, strlen('/public'));
    }
    return $img;
}

/**
 * Resolve a DB image path to an absolute filesystem path for disk-check.
 * Handles both /uploads/... and /gallery/... paths.
 */
function resolveToFilesystem(string $img, string $uploadDir, string $galleryDir): ?string {
    $clean = '/' . ltrim(str_replace('\\', '/', $img), '/');

    // /gallery/... → check against galleryDir
    if (strpos($clean, '/gallery/') === 0) {
        $rel = substr($clean, strlen('/gallery/'));
        return $galleryDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);
    }

    // /uploads/... → check against uploadDir
    if (strpos($clean, '/uploads/') === 0) {
        $rel = substr($clean, strlen('/uploads/'));
        return $uploadDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);
    }

    return null;
}

try {
    $uploadDir  = getUploadDir();
    $galleryDir = getGalleryDir();
    $report["resolved_upload_dir"]  = $uploadDir;
    $report["resolved_gallery_dir"] = $galleryDir;

    // ── Ensure required subdirectories exist ────────────────────────────────
    $dirsToCreate = [
        $uploadDir,
        getUploadDir('services'),
        getUploadDir('gallery'),
    ];
    foreach ($dirsToCreate as $dir) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
            @chmod($dir, 0777);
            $report["directories_created"][] = $dir;
        }
    }

    // Ensure gallery dir exists (for static seeded images)
    if (!is_dir($galleryDir)) {
        @mkdir($galleryDir, 0777, true);
        @chmod($galleryDir, 0777);
        $report["directories_created"][] = $galleryDir;
    }

    // ── Migrate orphan files from legacy public/uploads/ ────────────────────
    $parent = dirname(__DIR__);
    $legacyPublic = $parent . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'uploads';
    if (is_dir($legacyPublic) && realpath($legacyPublic) !== realpath($uploadDir)) {
        syncOrphanUploads($legacyPublic, $uploadDir);
        $report["migrated_orphan_files"][] = "Scanned and synced from {$legacyPublic} into {$uploadDir}";
    }

    // ── Connect to DB ────────────────────────────────────────────────────────
    $pdo = getDbConnection();

    // ── Helper: check + fix image paths in a table ───────────────────────────
    function checkAndFixTable(
        PDO $pdo,
        string $table,
        string $idCol,
        string $imgCol,
        string $uploadDir,
        string $galleryDir
    ): array {
        try {
            $stmt = $pdo->query("SELECT `{$idCol}`, `{$imgCol}` FROM `{$table}`");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return ["error" => "Table check skipped: " . $e->getMessage()];
        }

        $rpt = [
            "total"          => count($rows),
            "found_on_disk"  => 0,
            "missing_on_disk"=> 0,
            "fixed_paths"    => 0,
            "missing_files"  => [],
        ];

        foreach ($rows as $row) {
            $img = $row[$imgCol];
            if (empty($img)) continue;

            // Fix /public/ prefix in DB
            $fixed = cleanImagePath($img);
            if ($fixed !== $img) {
                $pdo->prepare("UPDATE `{$table}` SET `{$imgCol}` = ? WHERE `{$idCol}` = ?")
                    ->execute([$fixed, $row[$idCol]]);
                $img = $fixed;
                $rpt["fixed_paths"]++;
            }

            // Check if file exists on disk
            $diskPath = resolveToFilesystem($img, $uploadDir, $galleryDir);
            if ($diskPath && file_exists($diskPath)) {
                $rpt["found_on_disk"]++;
            } else {
                $rpt["missing_on_disk"]++;
                $rpt["missing_files"][] = [
                    "id"            => $row[$idCol],
                    "db_value"      => $img,
                    "expected_path" => $diskPath ?? "unresolvable",
                ];
            }
        }

        return $rpt;
    }

    // ── 1. gallery_images ────────────────────────────────────────────────────
    $report["db_checks"]["gallery_images"] = checkAndFixTable(
        $pdo, 'gallery_images', 'id', 'image', $uploadDir, $galleryDir
    );

    // ── 2. service_images ────────────────────────────────────────────────────
    $report["db_checks"]["service_images"] = checkAndFixTable(
        $pdo, 'service_images', 'id', 'image', $uploadDir, $galleryDir
    );

    // ── 3. social_images ─────────────────────────────────────────────────────
    $report["db_checks"]["social_images"] = checkAndFixTable(
        $pdo, 'social_images', 'id', 'image', $uploadDir, $galleryDir
    );

    // ── 4. payments ──────────────────────────────────────────────────────────
    $report["db_checks"]["payments"] = checkAndFixTable(
        $pdo, 'payments', 'id', 'paymentProofScreenshot', $uploadDir, $galleryDir
    );

    $report["status"]  = "SUCCESS";
    $report["message"] = "Directories verified, permissions set, orphan files migrated, and legacy DB paths repaired.";

} catch (Exception $e) {
    $report["status"] = "ERROR";
    $report["error"]  = $e->getMessage();
}

echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

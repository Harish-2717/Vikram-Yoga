<?php
/**
 * Diagnostic & Auto-Repair script for Live Server File Structure and Database Paths.
 *
 * Can be run in browser by navigating to:
 * https://yourdomain.com/api/fix-live-paths.php
 *
 * What it does:
 * 1. Resolves the real document root and uploads directory.
 * 2. Ensures uploads/ and uploads/services/ exist with full write permissions.
 * 3. Migrates any files accidentally trapped in public/uploads/ into uploads/.
 * 4. Checks and fixes any DB image path records if they were stored with /public/ prefix.
 * 5. Returns a comprehensive JSON report.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

require_once __DIR__ . '/db.php';

$report = [
    "timestamp" => date('Y-m-d H:i:s'),
    "server_environment" => [
        "php_version" => PHP_VERSION,
        "script_dir" => __DIR__,
        "document_root" => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
        "http_host" => $_SERVER['HTTP_HOST'] ?? 'unknown',
    ],
    "resolved_upload_dir" => null,
    "directories_created" => [],
    "migrated_orphan_files" => [],
    "db_checks" => [],
    "status" => "pending"
];

try {
    $uploadDir = getUploadDir();
    $report["resolved_upload_dir"] = $uploadDir;

    // Ensure subdirectories exist
    $servicesDir = getUploadDir('services');
    if (!is_dir($servicesDir)) {
        @mkdir($servicesDir, 0777, true);
        @chmod($servicesDir, 0777);
        $report["directories_created"][] = $servicesDir;
    }

    // Check for orphan public/uploads directory on live server
    $parent = dirname(__DIR__);
    $legacyPublic = $parent . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'uploads';
    if (is_dir($legacyPublic) && realpath($legacyPublic) !== realpath($uploadDir)) {
        $countBefore = count(scandir($uploadDir));
        syncOrphanUploads($legacyPublic, $uploadDir);
        $report["migrated_orphan_files"][] = "Scanned and synced from {$legacyPublic} into {$uploadDir}";
    }

    // Connect to DB and verify image paths
    $pdo = getDbConnection();

    // 1. service_images
    try {
        $stmt = $pdo->query("SELECT id, service_key, image FROM service_images");
        $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $svcReport = ["total" => count($services), "found_on_disk" => 0, "missing_on_disk" => 0, "fixed_paths" => 0];

        foreach ($services as $row) {
            $img = $row['image'];
            // If path contains /public/uploads/, fix it in DB to /uploads/
            if (strpos($img, '/public/uploads/') === 0) {
                $newImg = str_replace('/public/uploads/', '/uploads/', $img);
                $pdo->prepare("UPDATE service_images SET image = ? WHERE id = ?")->execute([$newImg, $row['id']]);
                $img = $newImg;
                $svcReport["fixed_paths"]++;
            }

            // Check if file exists in upload dir
            $cleanName = ltrim($img, '/');
            // If cleanName starts with uploads/, remove uploads/ prefix to test against $uploadDir
            $rel = preg_replace('#^uploads/#i', '', $cleanName);
            $diskFile = $uploadDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);

            if (file_exists($diskFile)) {
                $svcReport["found_on_disk"]++;
            } else {
                $svcReport["missing_on_disk"]++;
                $svcReport["missing_files"][] = [
                    "id" => $row['id'],
                    "key" => $row['service_key'],
                    "expected_path" => $diskFile,
                    "db_value" => $row['image']
                ];
            }
        }
        $report["db_checks"]["service_images"] = $svcReport;
    } catch (Exception $e) {
        $report["db_checks"]["service_images"] = "Table check skipped: " . $e->getMessage();
    }

    // 2. social_images
    try {
        $stmt = $pdo->query("SELECT id, image FROM social_images");
        $socials = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $socReport = ["total" => count($socials), "found_on_disk" => 0, "missing_on_disk" => 0, "fixed_paths" => 0];

        foreach ($socials as $row) {
            $img = $row['image'];
            if (strpos($img, '/public/uploads/') === 0) {
                $newImg = str_replace('/public/uploads/', '/uploads/', $img);
                $pdo->prepare("UPDATE social_images SET image = ? WHERE id = ?")->execute([$newImg, $row['id']]);
                $img = $newImg;
                $socReport["fixed_paths"]++;
            }

            $cleanName = ltrim($img, '/');
            $rel = preg_replace('#^uploads/#i', '', $cleanName);
            $diskFile = $uploadDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);

            if (file_exists($diskFile)) {
                $socReport["found_on_disk"]++;
            } else {
                $socReport["missing_on_disk"]++;
            }
        }
        $report["db_checks"]["social_images"] = $socReport;
    } catch (Exception $e) {
        $report["db_checks"]["social_images"] = "Table check skipped: " . $e->getMessage();
    }

    // 3. payments
    try {
        $stmt = $pdo->query("SELECT id, applicationId, paymentProofScreenshot FROM payments");
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $payReport = ["total" => count($payments), "found_on_disk" => 0, "missing_on_disk" => 0, "fixed_paths" => 0];

        foreach ($payments as $row) {
            $img = $row['paymentProofScreenshot'];
            if (!$img) continue;

            if (strpos($img, '/public/uploads/') === 0) {
                $newImg = str_replace('/public/uploads/', '/uploads/', $img);
                $pdo->prepare("UPDATE payments SET paymentProofScreenshot = ? WHERE id = ?")->execute([$newImg, $row['id']]);
                $img = $newImg;
                $payReport["fixed_paths"]++;
            }

            $cleanName = ltrim($img, '/');
            $rel = preg_replace('#^uploads/#i', '', $cleanName);
            $diskFile = $uploadDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);

            if (file_exists($diskFile)) {
                $payReport["found_on_disk"]++;
            } else {
                $payReport["missing_on_disk"]++;
            }
        }
        $report["db_checks"]["payments"] = $payReport;
    } catch (Exception $e) {
        $report["db_checks"]["payments"] = "Table check skipped: " . $e->getMessage();
    }

    // 4. gallery_images
    try {
        $stmt = $pdo->query("SELECT id, image FROM gallery_images");
        $galleries = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $galReport = ["total" => count($galleries), "found_on_disk" => 0, "missing_on_disk" => 0, "fixed_paths" => 0];

        foreach ($galleries as $row) {
            $img = $row['image'];
            if (strpos($img, '/public/uploads/') === 0) {
                $newImg = str_replace('/public/uploads/', '/uploads/', $img);
                $pdo->prepare("UPDATE gallery_images SET image = ? WHERE id = ?")->execute([$newImg, $row['id']]);
                $img = $newImg;
                $galReport["fixed_paths"]++;
            }

            $cleanName = ltrim($img, '/');
            $rel = preg_replace('#^uploads/#i', '', $cleanName);
            $diskFile = $uploadDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);

            if (file_exists($diskFile)) {
                $galReport["found_on_disk"]++;
            } else {
                $galReport["missing_on_disk"]++;
            }
        }
        $report["db_checks"]["gallery_images"] = $galReport;
    } catch (Exception $e) {
        $report["db_checks"]["gallery_images"] = "Table check skipped: " . $e->getMessage();
    }

    $report["status"] = "SUCCESS";
    $report["message"] = "Upload directories verified, permissions ensured, and any legacy paths synchronized.";

} catch (Exception $e) {
    $report["status"] = "ERROR";
    $report["error"] = $e->getMessage();
}

echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

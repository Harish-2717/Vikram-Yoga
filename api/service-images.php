<?php
/**
 * Public API — Service Images
 * Returns image records mapped to services.
 * No auth required. Used by the frontend Services page.
 *
 * GET  /api/service-images.php                 → all records
 * GET  /api/service-images.php?key=<service_key> → single service
 *
 * Each record: { service_key, image, alt_text }
 * The "image" field is a root-relative path like /uploads/services/<file>
 * Frontend resolves it to a full URL via resolveImageUrl().
 */

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

// Prevent any caching so uploads appear immediately
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

function ensureServiceImagesTable(PDO $pdo): void {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `service_images` (
        `id`            VARCHAR(60)  NOT NULL,
        `service_key`   VARCHAR(100) NOT NULL COMMENT 'Unique service identifier, e.g. acupuncture',
        `service_label` VARCHAR(150) NOT NULL COMMENT 'Human-readable service name',
        `image`         VARCHAR(255) NOT NULL COMMENT 'Root-relative path: /uploads/services/<file>',
        `alt_text`      VARCHAR(200) DEFAULT '',
        `sort_order`    INT          DEFAULT 0,
        `created_at`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        `updated_at`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uq_service_key` (`service_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

try {
    $pdo = getDbConnection();
    ensureServiceImagesTable($pdo);

    $key = trim($_GET['key'] ?? $_GET['service_key'] ?? '');

    if ($key !== '') {
        // Return the single image for this service key
        $stmt = $pdo->prepare(
            "SELECT `service_key`, `image`, `alt_text`, `id`, `service_label`
             FROM `service_images`
             WHERE `service_key` = ?
             ORDER BY `updated_at` DESC
             LIMIT 1"
        );
        $stmt->execute([$key]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        sendJson($row ?: null);
    } else {
        // Return ALL service→image mappings — deduplicated by service_key
        // Uses a subquery to get the latest record per service_key
        $stmt = $pdo->query(
            "SELECT si.`service_key`, si.`image`, si.`alt_text`, si.`id`, si.`service_label`
             FROM `service_images` si
             INNER JOIN (
                 SELECT `service_key`, MAX(`updated_at`) as max_updated
                 FROM `service_images`
                 GROUP BY `service_key`
             ) latest ON si.`service_key` = latest.`service_key` AND si.`updated_at` = latest.`max_updated`
             ORDER BY si.`service_key` ASC"
        );
        sendJson($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
} catch (Exception $e) {
    // Table missing or DB error — return empty so frontend uses fallbacks
    sendJson([]);
}

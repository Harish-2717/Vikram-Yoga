<?php
/**
 * Admin API — List service images (GET)
 * Returns all service_images rows for the admin panel.
 * Each row: { id, service_key, service_label, image, alt_text, created_at, updated_at }
 *
 * GET /api/admin/service-images.php
 * GET /api/admin/service-images.php?service_key=acupuncture
 */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

function ensureServiceImagesTable(PDO $pdo): void {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `service_images` (
        `id`            VARCHAR(60)  NOT NULL,
        `service_key`   VARCHAR(100) NOT NULL COMMENT 'Unique service identifier',
        `service_label` VARCHAR(150) NOT NULL,
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

    $service_key = trim($_GET['service_key'] ?? $_GET['key'] ?? '');

    if ($service_key !== '') {
        $stmt = $pdo->prepare(
            "SELECT `id`, `service_key`, `service_label`, `image`, `alt_text`, `created_at`, `updated_at`
             FROM `service_images`
             WHERE `service_key` = ?
             LIMIT 1"
        );
        $stmt->execute([$service_key]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $stmt = $pdo->query(
            "SELECT `id`, `service_key`, `service_label`, `image`, `alt_text`, `created_at`, `updated_at`
             FROM `service_images`
             ORDER BY `service_key` ASC"
        );
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    sendJson($rows);
} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

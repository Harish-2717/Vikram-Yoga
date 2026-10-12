<?php
require_once __DIR__ . '/db.php';

try {
    $pdo = getDbConnection();
    
    // Add category column if it doesn't exist
    $stmt = $pdo->query("SHOW COLUMNS FROM `gallery_images` LIKE 'category'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE `gallery_images` ADD COLUMN `category` VARCHAR(100) DEFAULT 'Our Centre' AFTER `image`");
        echo "Column 'category' added to gallery_images.\n";
    } else {
        echo "Column 'category' already exists.\n";
    }

    // Ensure applications table allows null for optional fields
    $pdo->exec("ALTER TABLE `applications` 
        MODIFY `dob` DATE NULL DEFAULT NULL,
        MODIFY `gender` VARCHAR(20) NULL DEFAULT '',
        MODIFY `accommodation` VARCHAR(100) NULL DEFAULT '',
        MODIFY `address` TEXT NULL,
        MODIFY `practisedYoga` VARCHAR(20) NULL DEFAULT '',
        MODIFY `howLong` VARCHAR(100) NULL DEFAULT ''");
    echo "Applications table columns modified to support nullable optional fields.\n";

    // Ensure service_images table exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `service_images` (
        `id` VARCHAR(60) PRIMARY KEY,
        `service_key` VARCHAR(100) NOT NULL,
        `service_label` VARCHAR(150) NOT NULL,
        `image` VARCHAR(255) NOT NULL,
        `alt_text` VARCHAR(200) DEFAULT '',
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_service_key` (`service_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'service_images' verified.\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

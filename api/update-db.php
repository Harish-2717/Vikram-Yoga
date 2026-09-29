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

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

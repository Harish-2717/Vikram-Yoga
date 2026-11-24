<?php
require_once __DIR__ . '/db.php';
try {
    $pdo = getDbConnection();
    echo "CONNECTED\n";
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables: " . implode(", ", $tables) . "\n";
    foreach (['service_images', 'gallery_images', 'social_images'] as $tbl) {
        if (in_array($tbl, $tables)) {
            $cnt = $pdo->query("SELECT COUNT(*) FROM `$tbl`")->fetchColumn();
            echo "$tbl count: $cnt\n";
            $sample = $pdo->query("SELECT * FROM `$tbl` LIMIT 3")->fetchAll(PDO::FETCH_ASSOC);
            print_r($sample);
        } else {
            echo "$tbl does not exist!\n";
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

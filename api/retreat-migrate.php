<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

try {
    $pdo = getDbConnection();

    // --- Ensure tables exist (auto-migration) ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS `retreat_programs` (
        `id` VARCHAR(60) PRIMARY KEY,
        `name` VARCHAR(200) NOT NULL,
        `description` TEXT DEFAULT '',
        `duration` VARCHAR(100) DEFAULT '',
        `is_active` TINYINT(1) DEFAULT 1,
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    $pdo->exec("CREATE TABLE IF NOT EXISTS `retreat_applications` (
        `id` VARCHAR(70) PRIMARY KEY,
        `program_id` VARCHAR(60) DEFAULT NULL,
        `program_name` VARCHAR(200) NOT NULL,
        `first_name` VARCHAR(100) NOT NULL,
        `surname` VARCHAR(100) NOT NULL,
        `email` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(50) NOT NULL,
        `age` VARCHAR(10) NOT NULL,
        `gender` VARCHAR(30) NOT NULL,
        `requires_accommodation` TINYINT(1) DEFAULT 0,
        `accommodation_preference` VARCHAR(50) DEFAULT '',
        `checkin_date` DATE DEFAULT NULL,
        `checkout_date` DATE DEFAULT NULL,
        `num_nights` INT DEFAULT NULL,
        `practised_yoga_before` TINYINT(1) DEFAULT 0,
        `yoga_duration` TEXT DEFAULT '',
        `yoga_styles` TEXT DEFAULT '',
        `has_health_conditions` TINYINT(1) DEFAULT 0,
        `health_details` TEXT DEFAULT '',
        `dietary_requirements` VARCHAR(100) DEFAULT 'No',
        `dietary_other` VARCHAR(200) DEFAULT '',
        `dietary_details` TEXT DEFAULT '',
        `expectations` TEXT DEFAULT '',
        `special_requests` TEXT DEFAULT '',
        `referral_source` VARCHAR(100) DEFAULT '',
        `referral_other` VARCHAR(200) DEFAULT '',
        `declaration_agreed` TINYINT(1) NOT NULL DEFAULT 0,
        `status` ENUM('New','Under Review','Contacted','Confirmed','Rejected') DEFAULT 'New',
        `admin_notes` TEXT DEFAULT '',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_email` (`email`),
        INDEX `idx_status` (`status`),
        INDEX `idx_created_at` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // --- Seed default programs if table is empty ---
    $countCheck = $pdo->query("SELECT COUNT(*) FROM `retreat_programs`")->fetchColumn();
    if ($countCheck == 0) {
        $defaultPrograms = [
            ['id' => 'rp-holistic-7-14', 'name' => '7 Days & 14 Days Holistic Wellness Retreat', 'duration' => '7 or 14 Days', 'sort_order' => 1],
            ['id' => 'rp-yoga-meditation', 'name' => 'Yoga & Meditation Retreat', 'duration' => 'Flexible', 'sort_order' => 2],
            ['id' => 'rp-couple-wellness', 'name' => 'Couple Wellness Retreat', 'duration' => 'Flexible', 'sort_order' => 3],
            ['id' => 'rp-detox-rejuvenation', 'name' => 'Yoga Detox & Rejuvenation Retreat', 'duration' => 'Flexible', 'sort_order' => 4],
            ['id' => 'rp-energy-balancing', 'name' => 'Energy Balancing Retreat', 'duration' => 'Flexible', 'sort_order' => 5],
            ['id' => 'rp-anti-aging', 'name' => 'Anti-Aging & Healthy Longevity Retreat', 'duration' => 'Flexible', 'sort_order' => 6],
            ['id' => 'rp-pain-management', 'name' => 'Pain Management & Therapeutic Wellness Retreat', 'duration' => 'Flexible', 'sort_order' => 7],
            ['id' => 'rp-stress-insomnia', 'name' => 'Stress & Insomnia Management Retreat', 'duration' => 'Flexible', 'sort_order' => 8],
        ];
        $stmtP = $pdo->prepare("INSERT IGNORE INTO `retreat_programs` (`id`, `name`, `duration`, `sort_order`) VALUES (?,?,?,?)");
        foreach ($defaultPrograms as $p) {
            $stmtP->execute([$p['id'], $p['name'], $p['duration'], $p['sort_order']]);
        }
    }

    sendJson(["success" => true, "message" => "Tables and seed data initialized."]);

} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

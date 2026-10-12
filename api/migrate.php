<?php
require_once __DIR__ . '/db.php';

try {
    $pdo = getDbConnection();
    echo "Connected to MySQL database successfully.\n";

    // 1. Create Tables
    
    // Users Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
        `id` VARCHAR(50) PRIMARY KEY,
        `username` VARCHAR(50) UNIQUE NOT NULL,
        `password_hash` VARCHAR(255) NOT NULL,
        `salt` VARCHAR(255) DEFAULT '',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'users' verified.\n";

    // Social Images Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `social_images` (
        `id` VARCHAR(50) PRIMARY KEY,
        `image` VARCHAR(255) NOT NULL,
        `social_media_url` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'social_images' verified.\n";

    // Gallery Images Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `gallery_images` (
        `id` VARCHAR(50) PRIMARY KEY,
        `name` VARCHAR(100) DEFAULT 'Untitled',
        `image` VARCHAR(255) NOT NULL,
        `category` VARCHAR(100) DEFAULT 'Our Centre',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'gallery_images' verified.\n";

    // Applications Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `applications` (
        `id` VARCHAR(50) PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `course` VARCHAR(150) NOT NULL,
        `minorOption` VARCHAR(150) DEFAULT '',
        `dateOfCourse` DATE NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `dob` DATE NOT NULL,
        `gender` VARCHAR(20) NOT NULL,
        `accommodation` VARCHAR(100) NOT NULL,
        `address` TEXT NOT NULL,
        `practisedYoga` VARCHAR(20) NOT NULL,
        `howLong` VARCHAR(100) NOT NULL,
        `whyTeacherTraining` TEXT NULL,
        `meaningOfYoga` TEXT NULL,
        `injuries` TEXT NULL,
        `additionalInfo` TEXT NULL,
        `status` ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'applications' verified.\n";

    // Payments Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `payments` (
        `id` VARCHAR(50) PRIMARY KEY,
        `applicantName` VARCHAR(100) NOT NULL,
        `applicationId` VARCHAR(50) NOT NULL,
        `paymentProofScreenshot` VARCHAR(255) NOT NULL,
        `uploadDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `status` ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
        `remarks` TEXT NULL,
        FOREIGN KEY (`applicationId`) REFERENCES `applications` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'payments' verified.\n";

    // Contact Messages Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_messages` (
        `id` VARCHAR(50) PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `phone` VARCHAR(30) NOT NULL,
        `interest` VARCHAR(100) NOT NULL,
        `specificInterest` VARCHAR(100) DEFAULT '',
        `message` TEXT NOT NULL,
        `replyStatus` ENUM('Pending', 'Replied') DEFAULT 'Pending',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'contact_messages' verified.\n";

    // Contact Message Replies Table (Normalized)
    $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_message_replies` (
        `id` VARCHAR(50) PRIMARY KEY,
        `message_id` VARCHAR(50) NOT NULL,
        `message` TEXT NOT NULL,
        `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`message_id`) REFERENCES `contact_messages` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'contact_message_replies' verified.\n";

    // Testimonials Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `testimonials` (
        `id` VARCHAR(50) PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `rating` INT NOT NULL,
        `role` VARCHAR(100) DEFAULT '',
        `message` TEXT NOT NULL,
        `image` VARCHAR(255) DEFAULT '',
        `status` ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    echo "Table 'testimonials' verified.\n";

    // Service Images Table (maps admin-uploaded images to individual services)
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

    // 2. Read db.json Data
    $dbJsonPath = __DIR__ . '/../data/db.json';
    if (!file_exists($dbJsonPath)) {
        throw new Exception("db.json file not found at: {$dbJsonPath}");
    }

    $dbData = json_decode(file_get_contents($dbJsonPath), true);
    if ($dbData === null) {
        throw new Exception("Failed to parse db.json");
    }

    // 3. Clear Existing Data (To avoid duplicate primary keys on re-run)
    // NOTE: service_images is NOT truncated here — admin-uploaded images are preserved across migrations
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
    $pdo->exec("TRUNCATE TABLE `contact_message_replies`;");
    $pdo->exec("TRUNCATE TABLE `contact_messages`;");
    $pdo->exec("TRUNCATE TABLE `payments`;");
    $pdo->exec("TRUNCATE TABLE `applications`;");
    $pdo->exec("TRUNCATE TABLE `gallery_images`;");
    $pdo->exec("TRUNCATE TABLE `social_images`;");
    $pdo->exec("TRUNCATE TABLE `users`;");
    $pdo->exec("TRUNCATE TABLE `testimonials`;");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");
    echo "Tables truncated for clean data migration.\n";

    // 4. Migrate Users (Create proper PHP password hash for admin)
    $stmt = $pdo->prepare("INSERT INTO `users` (`id`, `username`, `password_hash`, `salt`) VALUES (?, ?, ?, ?)");
    if (isset($dbData['users']) && is_array($dbData['users'])) {
        foreach ($dbData['users'] as $u) {
            // Secure admin user with PHP's standard password_hash() using 'admin123'
            $adminPass = getenv('ADMIN_PASSWORD') ?: 'admin123';
            $hash = password_hash($adminPass, PASSWORD_DEFAULT);
            $stmt->execute([
                $u['id'],
                $u['username'],
                $hash,
                $u['salt'] ?? ''
            ]);
            echo "Migrated user: {$u['username']} with new secure hash.\n";
        }
    } else {
        // Create default admin if not present
        $adminUsername = getenv('ADMIN_USERNAME') ?: 'admin';
        $adminPass = getenv('ADMIN_PASSWORD') ?: 'admin123';
        $hash = password_hash($adminPass, PASSWORD_DEFAULT);
        $stmt->execute(['admin-id', $adminUsername, $hash, '']);
        echo "Created default admin user: {$adminUsername}.\n";
    }

    // 5. Migrate Social Images
    if (isset($dbData['social_images']) && is_array($dbData['social_images'])) {
        $stmt = $pdo->prepare("INSERT INTO `social_images` (`id`, `image`, `social_media_url`, `created_at`) VALUES (?, ?, ?, ?)");
        foreach ($dbData['social_images'] as $img) {
            $stmt->execute([
                $img['id'],
                $img['image'],
                $img['social_media_url'],
                $img['created_at'] ?? date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($dbData['social_images']) . " social_images.\n";
    }

    // 6. Migrate Gallery Images
    if (isset($dbData['gallery_images']) && is_array($dbData['gallery_images'])) {
        $stmt = $pdo->prepare("INSERT INTO `gallery_images` (`id`, `name`, `image`, `category`, `created_at`) VALUES (?, ?, ?, ?, ?)");
        foreach ($dbData['gallery_images'] as $img) {
            $stmt->execute([
                $img['id'],
                $img['name'] ?? 'Untitled',
                $img['image'],
                $img['category'] ?? 'General',
                $img['created_at'] ?? date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($dbData['gallery_images']) . " gallery_images.\n";
    }

    // 7. Migrate Applications
    if (isset($dbData['applications']) && is_array($dbData['applications'])) {
        $stmt = $pdo->prepare("INSERT INTO `applications` (
            `id`, `name`, `course`, `minorOption`, `dateOfCourse`, `email`, `dob`, `gender`, 
            `accommodation`, `address`, `practisedYoga`, `howLong`, `whyTeacherTraining`, 
            `meaningOfYoga`, `injuries`, `additionalInfo`, `status`, `created_at`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($dbData['applications'] as $app) {
            $stmt->execute([
                $app['id'],
                $app['name'],
                $app['course'],
                $app['minorOption'] ?? '',
                $app['dateOfCourse'],
                $app['email'],
                $app['dob'],
                $app['gender'],
                $app['accommodation'],
                $app['address'],
                $app['practisedYoga'],
                $app['howLong'],
                $app['whyTeacherTraining'] ?? '',
                $app['meaningOfYoga'] ?? '',
                $app['injuries'] ?? '',
                $app['additionalInfo'] ?? '',
                $app['status'] ?? 'Pending',
                $app['created_at'] ?? date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($dbData['applications']) . " applications.\n";
    }

    // 8. Migrate Payments
    if (isset($dbData['payments']) && is_array($dbData['payments'])) {
        $stmt = $pdo->prepare("INSERT INTO `payments` (
            `id`, `applicantName`, `applicationId`, `paymentProofScreenshot`, `uploadDate`, `status`, `remarks`
        ) VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($dbData['payments'] as $pay) {
            $stmt->execute([
                $pay['id'],
                $pay['applicantName'],
                $pay['applicationId'],
                $pay['paymentProofScreenshot'],
                $pay['uploadDate'] ?? date('Y-m-d H:i:s'),
                $pay['status'] ?? 'Pending',
                $pay['remarks'] ?? ''
            ]);
        }
        echo "Migrated " . count($dbData['payments']) . " payments.\n";
    }

    // 9. Migrate Contact Messages & Replies
    if (isset($dbData['contact_messages']) && is_array($dbData['contact_messages'])) {
        $stmtMsg = $pdo->prepare("INSERT INTO `contact_messages` (
            `id`, `name`, `email`, `phone`, `interest`, `specificInterest`, `message`, `replyStatus`, `created_at`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmtRep = $pdo->prepare("INSERT INTO `contact_message_replies` (
            `id`, `message_id`, `message`, `sent_at`
        ) VALUES (?, ?, ?, ?)");
        
        $repliesCount = 0;
        foreach ($dbData['contact_messages'] as $msg) {
            $stmtMsg->execute([
                $msg['id'],
                $msg['name'],
                $msg['email'],
                $msg['phone'],
                $msg['interest'],
                $msg['specificInterest'] ?? '',
                $msg['message'],
                $msg['replyStatus'] ?? 'Pending',
                $msg['created_at'] ?? date('Y-m-d H:i:s')
            ]);

            if (isset($msg['replies']) && is_array($msg['replies'])) {
                foreach ($msg['replies'] as $rep) {
                    $stmtRep->execute([
                        $rep['id'],
                        $msg['id'],
                        $rep['message'],
                        $rep['sent_at'] ?? date('Y-m-d H:i:s')
                    ]);
                    $repliesCount++;
                }
            }
        }
        echo "Migrated " . count($dbData['contact_messages']) . " contact_messages and " . $repliesCount . " replies.\n";
    }

    // 10. Migrate Testimonials
    if (isset($dbData['testimonials']) && is_array($dbData['testimonials'])) {
        $stmt = $pdo->prepare("INSERT INTO `testimonials` (
            `id`, `name`, `rating`, `role`, `message`, `image`, `status`, `created_at`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($dbData['testimonials'] as $test) {
            $stmt->execute([
                $test['id'],
                $test['name'],
                $test['rating'],
                $test['role'] ?? '',
                $test['message'],
                $test['image'] ?? '',
                $test['status'] ?? 'Pending',
                $test['created_at'] ?? date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($dbData['testimonials']) . " testimonials.\n";
    }

    echo "\nAll data from db.json migrated to MySQL successfully!\n";

} catch (Exception $e) {
    echo "MIGRATION ERROR: " . $e->getMessage() . "\n";
    exit(1);
}

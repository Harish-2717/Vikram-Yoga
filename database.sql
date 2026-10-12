-- ==============================================================
-- Dr. Vikram Yoga & Wellness Centre - Database Schema
-- Table: service_images & complete schema definitions
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.3+
-- ==============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------
-- 1. Table: service_images
-- Maps admin-uploaded images to individual services across:
-- - YOGA
-- - WELLNESS THERAPY
-- - YOGA & WELLNESS RETREATS
-- - MASSAGE CERTIFICATE COURSES
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_images` (
    `id` VARCHAR(60) NOT NULL,
    `service_key` VARCHAR(100) NOT NULL,
    `service_label` VARCHAR(150) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `alt_text` VARCHAR(200) DEFAULT '',
    `sort_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_service_key` (`service_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 2. Table: gallery_images
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `gallery_images` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) DEFAULT 'Untitled',
    `image` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) DEFAULT 'Our Centre',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 3. Table: social_images
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_images` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) DEFAULT 'Untitled',
    `image` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 4. Table: applications
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `applications` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `course` VARCHAR(150) NOT NULL,
    `minorOption` VARCHAR(150) DEFAULT '',
    `dateOfCourse` DATE NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `dob` DATE NULL DEFAULT NULL,
    `gender` VARCHAR(20) NULL DEFAULT '',
    `accommodation` VARCHAR(100) NULL DEFAULT '',
    `address` TEXT NULL,
    `practisedYoga` VARCHAR(20) NULL DEFAULT '',
    `howLong` VARCHAR(100) NULL DEFAULT '',
    `whyTeacherTraining` TEXT NULL,
    `meaningOfYoga` TEXT NULL,
    `injuries` TEXT NULL,
    `additionalInfo` TEXT NULL,
    `status` ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 5. Table: payments
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `payments` (
    `id` VARCHAR(50) NOT NULL,
    `applicantName` VARCHAR(100) NOT NULL,
    `applicationId` VARCHAR(50) NOT NULL,
    `paymentProofScreenshot` VARCHAR(255) NOT NULL,
    `uploadDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
    `remarks` TEXT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_payments_application` FOREIGN KEY (`applicationId`) 
        REFERENCES `applications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 6. Table: contact_messages
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `interest` VARCHAR(100) NOT NULL,
    `specificInterest` VARCHAR(100) DEFAULT '',
    `message` TEXT NOT NULL,
    `replyStatus` ENUM('Pending', 'Replied') DEFAULT 'Pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 7. Table: contact_message_replies
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_message_replies` (
    `id` VARCHAR(50) NOT NULL,
    `message_id` VARCHAR(50) NOT NULL,
    `message` TEXT NOT NULL,
    `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_replies_message` FOREIGN KEY (`message_id`) 
        REFERENCES `contact_messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- 8. Table: testimonials
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `rating` INT NOT NULL,
    `role` VARCHAR(100) DEFAULT '',
    `message` TEXT NOT NULL,
    `image` VARCHAR(255) DEFAULT '',
    `status` ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

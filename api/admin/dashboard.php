<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDbConnection();
        
        // Stats queries
        $totalApps = intval($pdo->query("SELECT COUNT(*) FROM `applications`")->fetchColumn());
        $pendingApps = intval($pdo->query("SELECT COUNT(*) FROM `applications` WHERE `status` = 'Pending'")->fetchColumn());
        $verifiedPayments = intval($pdo->query("SELECT COUNT(*) FROM `payments` WHERE `status` = 'Verified'")->fetchColumn());
        $totalMessages = intval($pdo->query("SELECT COUNT(*) FROM `contact_messages`")->fetchColumn());
        $pendingMessages = intval($pdo->query("SELECT COUNT(*) FROM `contact_messages` WHERE `replyStatus` = 'Pending'")->fetchColumn());
        $totalTestimonials = intval($pdo->query("SELECT COUNT(*) FROM `testimonials`")->fetchColumn());
        $pendingTestimonials = intval($pdo->query("SELECT COUNT(*) FROM `testimonials` WHERE `status` = 'Pending'")->fetchColumn());

        // Recent items
        $stmtApps = $pdo->query("SELECT * FROM `applications` ORDER BY `created_at` DESC LIMIT 5");
        $recentApps = $stmtApps->fetchAll();

        $stmtMessages = $pdo->query("SELECT * FROM `contact_messages` ORDER BY `created_at` DESC LIMIT 5");
        $recentMessages = $stmtMessages->fetchAll();
        foreach ($recentMessages as &$m) {
            $m['status'] = $m['replyStatus'];
        }
        unset($m);

        sendJson([
            "stats" => [
                "totalApps" => $totalApps,
                "pendingApps" => $pendingApps,
                "verifiedPayments" => $verifiedPayments,
                "totalMessages" => $totalMessages,
                "pendingMessages" => $pendingMessages,
                "totalTestimonials" => $totalTestimonials,
                "pendingTestimonials" => $pendingTestimonials
            ],
            "recentApps" => $recentApps,
            "recentMessages" => $recentMessages
        ]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

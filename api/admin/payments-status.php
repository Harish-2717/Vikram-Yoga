<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../email.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $rawBody = file_get_contents('php://input');
        $data = json_decode($rawBody, true);
        
        $id = $data['id'] ?? '';
        $status = $data['status'] ?? '';
        $remarks = $data['remarks'] ?? '';

        if (empty($id) || empty($status)) {
            sendJson(["success" => false, "error" => "ID and status are required"], 400);
        }

        $pdo = getDbConnection();
        
        // Fetch current payment
        $stmtPay = $pdo->prepare("SELECT * FROM `payments` WHERE `id` = ?");
        $stmtPay->execute([$id]);
        $payment = $stmtPay->fetch();

        if (!$payment) {
            sendJson(["success" => false, "error" => "Payment record not found"], 404);
        }

        $oldStatus = $payment['status'];
        $appId = $payment['applicationId'];

        // Fetch application
        $stmtApp = $pdo->prepare("SELECT * FROM `applications` WHERE `id` = ?");
        $stmtApp->execute([$appId]);
        $app = $stmtApp->fetch();

        // Start Transaction
        $pdo->beginTransaction();

        // Update payment status and remarks
        $stmtUpPay = $pdo->prepare("UPDATE `payments` SET `status` = ?, `remarks` = ? WHERE `id` = ?");
        $stmtUpPay->execute([$status, $remarks, $id]);

        // Update corresponding application status
        if ($app) {
            $stmtUpApp = $pdo->prepare("UPDATE `applications` SET `status` = ? WHERE `id` = ?");
            $stmtUpApp->execute([$status, $appId]);
        }

        $pdo->commit();

        // Send confirmation email if newly verified and has email
        if ($status === 'Verified' && $oldStatus !== 'Verified' && $app && !empty($app['email'])) {
            $year = date('Y');
            $accommodationName = $app['accommodation'] ?: 'Standard';
            
            $mailHtml = <<<HTML
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
  <div style="text-align: center; border-bottom: 2px solid #55b9b7; padding-bottom: 15px; margin-bottom: 20px;">
    <h2 style="color: #0c2a21; margin: 0; font-family: 'Times New Roman', serif;">Dr. Vikram Yoga & Wellness Centre</h2>
    <span style="font-size: 10px; letter-spacing: 2px; color: #55b9b7; font-weight: bold; text-transform: uppercase;">Heal • Harmonize • Transform</span>
  </div>
  <p>Dear <strong>{$app['name']}</strong>,</p>
  <p>We are pleased to inform you that your application and payment for the program <strong>{$app['course']}</strong> (Option: {$app['minorOption']}) starting on <strong>{$app['dateOfCourse']}</strong> have been successfully verified!</p>
  
  <div style="background-color: #fafafa; border-left: 4px solid #55b9b7; padding: 15px; margin: 20px 0; color: #333333; border-radius: 0 8px 8px 0; font-size: 13px;">
    <strong>Registration Details:</strong><br/>
    • Application ID: {$app['id']}<br/>
    • Status: <strong>Verified & Confirmed</strong><br/>
    • Course: {$app['course']}<br/>
    • Start Date: {$app['dateOfCourse']}<br/>
    • Accommodation: {$accommodationName}
  </div>
  
  <p>Your spot is now officially reserved. We will reach out with further coordination details, guidelines, and preparation material as the start date approaches.</p>
  <p>If you have any questions or require support, please connect with us on WhatsApp at +91 8778639989 or reply directly to this email.</p>
  <p style="margin-top: 30px;">Warm regards,<br/><strong>Administrative Team</strong><br/>Dr. Vikram Yoga & Wellness Centre</p>
  <div style="border-top: 1px solid #eeeeee; margin-top: 30px; padding-top: 15px; text-align: center; font-size: 11px; color: #aaaaaa;">
    © {$year} Dr. Vikram Yoga & Wellness Centre. All rights reserved.
  </div>
</div>
HTML;
            sendEmail($app['email'], "Application Confirmed - Dr. Vikram Yoga & Wellness Centre", $mailHtml);
        }

        sendJson(["success" => true]);
    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

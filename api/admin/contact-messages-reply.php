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
        $replySubject = $data['replySubject'] ?? '';
        $replyBody = $data['replyBody'] ?? '';

        if (empty($id) || empty($replySubject) || empty($replyBody)) {
            sendJson(["success" => false, "error" => "ID, subject, and body are required"], 400);
        }

        $pdo = getDbConnection();
        $stmt = $pdo->prepare("SELECT * FROM `contact_messages` WHERE `id` = ?");
        $stmt->execute([$id]);
        $message = $stmt->fetch();

        if (!$message) {
            sendJson(["success" => false, "error" => "Message not found"], 404);
        }

        $year = date('Y');
        $bodyHtml = nl2br(htmlspecialchars($replyBody));

        $mailHtml = <<<HTML
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
  <div style="text-align: center; border-bottom: 2px solid #55b9b7; padding-bottom: 15px; margin-bottom: 20px;">
    <h2 style="color: #0c2a21; margin: 0; font-family: 'Times New Roman', serif;">Dr. Vikram Yoga & Wellness Centre</h2>
    <span style="font-size: 10px; letter-spacing: 2px; color: #55b9b7; font-weight: bold; text-transform: uppercase;">Heal • Harmonize • Transform</span>
  </div>
  <p>Dear <strong>{$message['name']}</strong>,</p>
  <p>Thank you for contacting Dr. Vikram Yoga & Wellness Centre. Regarding your enquiry about <strong>{$message['interest']}</strong>, please find our response below:</p>
  
  <div style="background-color: #fafafa; border-left: 4px solid #55b9b7; padding: 15px; margin: 20px 0; font-style: italic; color: #555555; border-radius: 0 8px 8px 0;">
    {$bodyHtml}
  </div>
  
  <p>If you have any further questions, feel free to reply directly to this email or connect with us on WhatsApp at +91 8778639989.</p>
  <p style="margin-top: 30px;">Warm regards,<br/><strong>Administrative Team</strong><br/>Dr. Vikram Yoga & Wellness Centre</p>
  <div style="border-top: 1px solid #eeeeee; margin-top: 30px; padding-top: 15px; text-align: center; font-size: 11px; color: #aaaaaa;">
    © {$year} Dr. Vikram Yoga & Wellness Centre. All rights reserved.
  </div>
</div>
HTML;

        // Send Email via SMTP
        $emailRes = sendEmail($message['email'], $replySubject, $mailHtml);

        if (!$emailRes['success']) {
            sendJson(["success" => false, "error" => $emailRes['error'] ?: "Failed to send email via SMTP"], 500);
        }

        // Start Transaction
        $pdo->beginTransaction();

        // Update message status to 'Replied'
        $stmtUp = $pdo->prepare("UPDATE `contact_messages` SET `replyStatus` = 'Replied' WHERE `id` = ?");
        $stmtUp->execute([$id]);

        // Insert reply record
        $repId = "rep-" . round(microtime(true) * 1000);
        $stmtIns = $pdo->prepare("INSERT INTO `contact_message_replies` (`id`, `message_id`, `message`, `sent_at`) VALUES (?, ?, ?, NOW())");
        $stmtIns->execute([$repId, $id, $replyBody]);

        $pdo->commit();

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

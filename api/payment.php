<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pdo = getDbConnection();
        
        $applicationId = $_POST['applicationId'] ?? null;
        $paymentMethod = $_POST['paymentMethod'] ?? 'Online Payment';
        
        if (!$applicationId) {
            sendJson(["success" => false, "error" => "Missing Application ID"], 400);
        }

        $filePath = null;
        if (isset($_FILES['proof']) && $_FILES['proof']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = getUploadDir();
            
            $originalName = $_FILES['proof']['name'];
            $cleanName = preg_replace('/[^a-zA-Z0-9.-]/', '_', $originalName);
            $fileName = time() . "-" . $cleanName;
            $targetPath = $uploadDir . '/' . $fileName;
            
            if (move_uploaded_file($_FILES['proof']['tmp_name'], $targetPath)) {
                $filePath = "/uploads/" . $fileName;
            }
        }

        if ($paymentMethod === 'Online Payment' && !$filePath) {
            sendJson(["success" => false, "error" => "Payment proof is required for Online Payment"], 400);
        }

        // We could just update the existing payment created in apply.php, or insert a new one if it doesn't exist
        $stmt = $pdo->prepare("SELECT id FROM `payments` WHERE applicationId = ?");
        $stmt->execute([$applicationId]);
        $existing = $stmt->fetch();

        if ($existing) {
            // Update
            if ($filePath) {
                $update = $pdo->prepare("UPDATE `payments` SET paymentProofScreenshot = ?, uploadDate = NOW() WHERE applicationId = ?");
                $update->execute([$filePath, $applicationId]);
            }
        } else {
            // If for some reason apply didn't create it
            $paymentId = "pay-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);
            // Fetch applicant name
            $stmtApp = $pdo->prepare("SELECT name FROM applications WHERE id = ?");
            $stmtApp->execute([$applicationId]);
            $app = $stmtApp->fetch();
            $applicantName = $app ? $app['name'] : 'Unknown';

            $insert = $pdo->prepare("INSERT INTO `payments` (
                `id`, `applicantName`, `applicationId`, `paymentProofScreenshot`, `uploadDate`, `status`, `remarks`
            ) VALUES (?, ?, ?, ?, NOW(), 'Pending', '')");
            
            $insert->execute([
                $paymentId,
                $applicantName,
                $applicationId,
                $filePath ?: '/uploads/placeholder.png'
            ]);
        }

        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

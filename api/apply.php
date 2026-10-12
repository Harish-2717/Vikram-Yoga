<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pdo = getDbConnection();
        
        // Retrieve POST data
        $name = $_POST['name'] ?? null;
        $course = $_POST['course'] ?? null;
        $minorOption = $_POST['minorOption'] ?? '';
        $dateOfCourse = $_POST['dateOfCourse'] ?? null;
        $email = $_POST['email'] ?? null;
        $dob = $_POST['dob'] ?? '';
        $gender = $_POST['gender'] ?? '';
        $accommodation = $_POST['accommodation'] ?? '';
        $address = $_POST['address'] ?? '';
        $practisedYoga = $_POST['practisedYoga'] ?? '';
        $howLong = $_POST['howLong'] ?? '';
        $whyTeacherTraining = $_POST['whyTeacherTraining'] ?? '';
        $meaningOfYoga = $_POST['meaningOfYoga'] ?? '';
        $injuries = $_POST['injuries'] ?? '';
        $additionalInfo = $_POST['additionalInfo'] ?? '';

        if (!$name || !$course || !$dateOfCourse || !$email) {
            sendJson(["success" => false, "error" => "Missing required form fields"], 400);
        }

        // Handle File Upload
        $filePath = '';
        if (isset($_FILES['proof']) && $_FILES['proof']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = getUploadDir();
            
            // Clean filename to match Node regex replace(/[^a-zA-Z0-9.-]/g, "_")
            $originalName = $_FILES['proof']['name'];
            $cleanName = preg_replace('/[^a-zA-Z0-9.-]/', '_', $originalName);
            $fileName = time() . "-" . $cleanName;
            $targetPath = $uploadDir . '/' . $fileName;
            
            if (move_uploaded_file($_FILES['proof']['tmp_name'], $targetPath)) {
                $filePath = "/uploads/" . $fileName;
            } else {
                sendJson(["success" => false, "error" => "Failed to save uploaded file"], 500);
            }
        }

        $appId = "app-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);

        // Start Transaction
        $pdo->beginTransaction();

        // Insert Application
        $stmtApp = $pdo->prepare("INSERT INTO `applications` (
            `id`, `name`, `course`, `minorOption`, `dateOfCourse`, `email`, `dob`, `gender`, 
            `accommodation`, `address`, `practisedYoga`, `howLong`, `whyTeacherTraining`, 
            `meaningOfYoga`, `injuries`, `additionalInfo`, `status`, `created_at`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())");

        $stmtApp->execute([
            $appId, $name, $course, $minorOption, $dateOfCourse, $email, $dob ?: null, $gender,
            $accommodation, $address, $practisedYoga, $howLong, $whyTeacherTraining,
            $meaningOfYoga, $injuries, $additionalInfo
        ]);

        // Insert Payment
        $paymentId = "pay-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);
        $stmtPay = $pdo->prepare("INSERT INTO `payments` (
            `id`, `applicantName`, `applicationId`, `paymentProofScreenshot`, `uploadDate`, `status`, `remarks`
        ) VALUES (?, ?, ?, ?, NOW(), 'Pending', '')");

        $stmtPay->execute([
            $paymentId,
            $name,
            $appId,
            $filePath ?: '/uploads/placeholder.png'
        ]);

        // Commit Transaction
        $pdo->commit();

        sendJson(["success" => true, "applicationId" => $appId]);
    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

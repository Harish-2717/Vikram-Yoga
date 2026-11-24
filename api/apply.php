<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pdo = getDbConnection();
        
        // Retrieve POST data
        $name = $_POST['name'] ?? null;
        if (!$name && !empty($_POST['firstName'])) {
            $name = trim(($_POST['firstName'] ?? '') . ' ' . ($_POST['surname'] ?? ''));
        }
        $course = $_POST['course'] ?? $_POST['serviceCategory'] ?? null;
        $minorOption = $_POST['minorOption'] ?? $_POST['courseProgram'] ?? '';
        $dateOfCourse = $_POST['dateOfCourse'] ?? $_POST['checkInDate'] ?? date('Y-m-d');
        $email = $_POST['email'] ?? null;
        $dob = $_POST['dob'] ?? $_POST['age'] ?? '';
        $gender = $_POST['gender'] ?? '';
        $accommodation = $_POST['accommodation'] ?? ($_POST['requireAccommodation'] ?? '');
        if ($accommodation === 'Yes' && !empty($_POST['accommodationPreference'])) {
            $accommodation = $_POST['accommodationPreference'];
        }
        $address = $_POST['address'] ?? (!empty($_POST['phone']) ? "Phone / WhatsApp: " . $_POST['phone'] : '');
        $practisedYoga = $_POST['practisedYoga'] ?? ($_POST['certPreviousExperience'] ?? '');
        $howLong = $_POST['howLongPracticing'] ?? $_POST['howLong'] ?? ($_POST['certYearsOfPractice'] ?? '');
        $whyTeacherTraining = $_POST['expectations'] ?? $_POST['whyTeacherTraining'] ?? ($_POST['certGoals'] ?? '');
        $meaningOfYoga = $_POST['yogaStyle'] ?? $_POST['meaningOfYoga'] ?? ($_POST['certTechniques'] ?? '');
        $injuries = !empty($_POST['healthDetails']) 
            ? $_POST['healthDetails'] 
            : (!empty($_POST['certHealthDetails']) 
                ? $_POST['certHealthDetails'] 
                : ($_POST['injuries'] ?? ''));
        
        // Build comprehensive additionalInfo including all retreat & certification details
        $rawAdditionalInfo = $_POST['additionalInfo'] ?? '';
        $details = [];
        if (!empty($_POST['phone'])) $details[] = "Phone / WhatsApp: " . $_POST['phone'];
        if (!empty($_POST['age'])) $details[] = "Age: " . $_POST['age'];
        if (!empty($_POST['requireAccommodation'])) $details[] = "Accommodation Required: " . $_POST['requireAccommodation'];
        if (!empty($_POST['accommodationPreference'])) $details[] = "Accommodation Type: " . $_POST['accommodationPreference'];
        if (!empty($_POST['checkInDate'])) $details[] = "Check-in Date: " . $_POST['checkInDate'];
        if (!empty($_POST['checkOutDate'])) $details[] = "Check-out Date: " . $_POST['checkOutDate'];
        if (!empty($_POST['numberOfNights'])) $details[] = "Number of Nights: " . $_POST['numberOfNights'];

        // Certification-specific fields
        if (!empty($_POST['certPreviousExperience'])) $details[] = "Previous Experience (Massage/Bodywork/Yoga/Therapy): " . $_POST['certPreviousExperience'];
        if (!empty($_POST['certExperienceDescription'])) $details[] = "Experience Description: " . $_POST['certExperienceDescription'];
        if (!empty($_POST['certPreviousInstitute'])) $details[] = "Previous Therapy / Training Institute Attended: " . $_POST['certPreviousInstitute'];
        if (!empty($_POST['certTechniques'])) $details[] = "Techniques / Modalities Practised: " . $_POST['certTechniques'];
        if (!empty($_POST['certYearsOfPractice'])) $details[] = "Years of Practice / Professional Experience: " . $_POST['certYearsOfPractice'];
        if (!empty($_POST['certGoals'])) $details[] = "Goals & Expectations: " . $_POST['certGoals'];
        if (!empty($_POST['certLearnDevelop'])) $details[] = "What would you like to learn or develop: " . $_POST['certLearnDevelop'];
        if (!empty($_POST['certProfessionalUse'])) $details[] = "Plan to use certification professionally: " . $_POST['certProfessionalUse'];
        if (!empty($_POST['certHealthConditions'])) $details[] = "Current Health Conditions/Injuries/Limitations: " . $_POST['certHealthConditions'];
        if (!empty($_POST['certHealthDetails'])) $details[] = "Health Condition Details: " . $_POST['certHealthDetails'];
        if (!empty($_POST['certMedication'])) $details[] = "Currently taking medication/treatment affecting practicals: " . $_POST['certMedication'];
        if (!empty($_POST['certMedicationDetails'])) $details[] = "Medication Details: " . $_POST['certMedicationDetails'];
        if (!empty($_POST['certAdditionalInfo'])) $details[] = "Additional Information: " . $_POST['certAdditionalInfo'];

        // Retreat-specific fields
        if (!empty($_POST['yogaStyle'])) $details[] = "Style of Yoga / Practices: " . $_POST['yogaStyle'];
        if (!empty($_POST['healthConditions'])) $details[] = "Health Conditions / Limitations: " . $_POST['healthConditions'];
        if (!empty($_POST['healthDetails'])) $details[] = "Health Details: " . $_POST['healthDetails'];
        if (!empty($_POST['dietaryRequirement'])) $details[] = "Dietary Requirement: " . $_POST['dietaryRequirement'] . (!empty($_POST['dietaryOther']) ? " (" . $_POST['dietaryOther'] . ")" : "");
        if (!empty($_POST['dietaryDetails'])) $details[] = "Dietary Details: " . $_POST['dietaryDetails'];
        if (!empty($_POST['expectations'])) $details[] = "Retreat Expectations: " . $_POST['expectations'];
        if (!empty($_POST['specialArrangements'])) $details[] = "Special Arrangements: " . $_POST['specialArrangements'];
        
        // Common fields
        if (!empty($_POST['hearAboutUs'])) $details[] = "Heard About Us Via: " . $_POST['hearAboutUs'] . (!empty($_POST['hearAboutUsOther']) ? " (" . $_POST['hearAboutUsOther'] . ")" : "");
        if (!empty($rawAdditionalInfo)) $details[] = "Additional Notes: " . $rawAdditionalInfo;

        $additionalInfo = !empty($details) ? implode("\n\n", $details) : $rawAdditionalInfo;

        if (!$name || !$course || !$email) {
            sendJson(["success" => false, "error" => "Missing required form fields (Name, Category, Email)"], 400);
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

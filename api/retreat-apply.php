<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

try {
    $pdo = getDbConnection();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!$data) {
        $data = $_POST;
    }

    // --- Required fields ---
    $programName    = trim($data['program_name'] ?? '');
    $firstName      = trim($data['first_name'] ?? '');
    $surname        = trim($data['surname'] ?? '');
    $email          = trim($data['email'] ?? '');
    $phone          = trim($data['phone'] ?? '');
    $age            = trim($data['age'] ?? '');
    $gender         = trim($data['gender'] ?? '');
    $declarationAgreed = (int)(!empty($data['declaration_agreed']));

    if (!$programName || !$firstName || !$surname || !$email || !$phone || !$age || !$gender) {
        sendJson(["success" => false, "error" => "Missing required fields. Please fill in all required fields."], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJson(["success" => false, "error" => "Invalid email address."], 400);
    }

    if (!$declarationAgreed) {
        sendJson(["success" => false, "error" => "You must agree to the declaration before submitting."], 400);
    }

    // --- Optional / conditional fields ---
    $programId               = trim($data['program_id'] ?? '');
    $requiresAccommodation   = (int)(!empty($data['requires_accommodation']) && $data['requires_accommodation'] === 'yes');
    $accommodationPreference = $requiresAccommodation ? trim($data['accommodation_preference'] ?? '') : '';
    $checkinDate             = $requiresAccommodation ? (trim($data['checkin_date'] ?? '') ?: null) : null;
    $checkoutDate            = $requiresAccommodation ? (trim($data['checkout_date'] ?? '') ?: null) : null;
    $numNights               = $requiresAccommodation ? (int)($data['num_nights'] ?? 0) : null;

    $practisedYogaBefore  = (int)(!empty($data['practised_yoga_before']) && $data['practised_yoga_before'] === 'yes');
    $yogaDuration         = trim($data['yoga_duration'] ?? '');
    $yogaStyles           = trim($data['yoga_styles'] ?? '');

    $hasHealthConditions  = (int)(!empty($data['has_health_conditions']) && $data['has_health_conditions'] === 'yes');
    $healthDetails        = trim($data['health_details'] ?? '');
    $dietaryRequirements  = trim($data['dietary_requirements'] ?? 'No');
    $dietaryOther         = trim($data['dietary_other'] ?? '');
    $dietaryDetails       = trim($data['dietary_details'] ?? '');

    $expectations         = trim($data['expectations'] ?? '');
    $specialRequests      = trim($data['special_requests'] ?? '');
    $referralSource       = trim($data['referral_source'] ?? '');
    $referralOther        = trim($data['referral_other'] ?? '');

    // --- Prevent duplicate submissions (same email + program within 2 minutes) ---
    $dupCheck = $pdo->prepare("SELECT `id` FROM `retreat_applications` WHERE `email` = ? AND `program_name` = ? AND `created_at` > DATE_SUB(NOW(), INTERVAL 2 MINUTE)");
    $dupCheck->execute([$email, $programName]);
    if ($dupCheck->fetch()) {
        sendJson(["success" => false, "error" => "Duplicate submission detected. Please wait a moment before resubmitting."], 429);
    }

    // --- Generate unique ID ---
    $appId = "ra-" . date('Ymd') . "-" . substr(md5(uniqid(rand(), true)), 0, 8);

    $stmt = $pdo->prepare("INSERT INTO `retreat_applications` (
        `id`, `program_id`, `program_name`,
        `first_name`, `surname`, `email`, `phone`, `age`, `gender`,
        `requires_accommodation`, `accommodation_preference`, `checkin_date`, `checkout_date`, `num_nights`,
        `practised_yoga_before`, `yoga_duration`, `yoga_styles`,
        `has_health_conditions`, `health_details`,
        `dietary_requirements`, `dietary_other`, `dietary_details`,
        `expectations`, `special_requests`,
        `referral_source`, `referral_other`,
        `declaration_agreed`, `status`, `created_at`
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'New',NOW())");

    $stmt->execute([
        $appId, $programId ?: null, $programName,
        $firstName, $surname, $email, $phone, $age, $gender,
        $requiresAccommodation, $accommodationPreference, $checkinDate, $checkoutDate, $numNights > 0 ? $numNights : null,
        $practisedYogaBefore, $yogaDuration, $yogaStyles,
        $hasHealthConditions, $healthDetails,
        $dietaryRequirements, $dietaryOther, $dietaryDetails,
        $expectations, $specialRequests,
        $referralSource, $referralOther,
        $declarationAgreed
    ]);

    sendJson([
        "success" => true,
        "applicationId" => $appId,
        "message" => "Your retreat application has been submitted successfully. Our team will contact you shortly."
    ]);

} catch (Exception $e) {
    sendJson(["success" => false, "error" => "Submission failed: " . $e->getMessage()], 500);
}

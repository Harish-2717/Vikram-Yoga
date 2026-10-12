<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $pdo = getDbConnection();
        $stmt = $pdo->query("SELECT * FROM `testimonials` WHERE `status` = 'Approved' ORDER BY `created_at` DESC");
        $testimonials = $stmt->fetchAll();
        sendJson($testimonials);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} elseif ($method === 'POST') {
    try {
        $pdo = getDbConnection();
        
        $name = $_POST['name'] ?? 'Anonymous';
        $rating = intval($_POST['rating'] ?? '5');
        $role = $_POST['role'] ?? 'Yoga Student';
        $message = $_POST['message'] ?? '';
        
        // Handle File Upload
        $filePath = '';
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
        
        $id = "test-" . round(microtime(true) * 1000) . "-" . substr(md5(uniqid(rand(), true)), 0, 7);
        
        $stmt = $pdo->prepare("INSERT INTO `testimonials` (
            `id`, `name`, `rating`, `role`, `message`, `image`, `status`, `created_at`
        ) VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW())");
        
        $stmt->execute([
            $id,
            $name,
            $rating,
            $role,
            $message,
            $filePath
        ]);
        
        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

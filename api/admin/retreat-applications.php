<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all retreat applications with search/filter
    try {
        $pdo = getDbConnection();
        $conditions = [];
        $params = [];

        $search = $_GET['search'] ?? '';
        $filterStatus = $_GET['status'] ?? '';
        $filterProgram = $_GET['program'] ?? '';
        $filterAccommodation = $_GET['accommodation'] ?? '';

        if ($search) {
            $conditions[] = "(`first_name` LIKE ? OR `surname` LIKE ? OR `email` LIKE ? OR `phone` LIKE ? OR `id` LIKE ?)";
            $like = "%{$search}%";
            $params = array_merge($params, [$like, $like, $like, $like, $like]);
        }
        if ($filterStatus && $filterStatus !== 'All') {
            $conditions[] = "`status` = ?";
            $params[] = $filterStatus;
        }
        if ($filterProgram && $filterProgram !== 'All') {
            $conditions[] = "`program_name` = ?";
            $params[] = $filterProgram;
        }
        if ($filterAccommodation === 'yes') {
            $conditions[] = "`requires_accommodation` = 1";
        } elseif ($filterAccommodation === 'no') {
            $conditions[] = "`requires_accommodation` = 0";
        }

        $where = $conditions ? "WHERE " . implode(" AND ", $conditions) : "";
        $stmt = $pdo->prepare("SELECT * FROM `retreat_applications` {$where} ORDER BY `created_at` DESC");
        $stmt->execute($params);
        $apps = $stmt->fetchAll();
        sendJson($apps);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }

} elseif ($method === 'PUT' || $method === 'POST') {
    // Update application (status, notes, or full edit)
    try {
        $pdo = getDbConnection();
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        $id = $data['id'] ?? '';
        if (!$id) {
            sendJson(["success" => false, "error" => "Application ID required"], 400);
        }

        // Check exists
        $check = $pdo->prepare("SELECT `id` FROM `retreat_applications` WHERE `id` = ?");
        $check->execute([$id]);
        if (!$check->fetch()) {
            sendJson(["success" => false, "error" => "Application not found"], 404);
        }

        $allowedStatuses = ['New', 'Under Review', 'Contacted', 'Confirmed', 'Rejected'];

        $updates = [];
        $updateParams = [];

        if (isset($data['status']) && in_array($data['status'], $allowedStatuses)) {
            $updates[] = "`status` = ?";
            $updateParams[] = $data['status'];
        }
        if (array_key_exists('admin_notes', $data)) {
            $updates[] = "`admin_notes` = ?";
            $updateParams[] = trim($data['admin_notes']);
        }

        if (empty($updates)) {
            sendJson(["success" => false, "error" => "No valid fields to update"], 400);
        }

        $updateParams[] = $id;
        $stmt = $pdo->prepare("UPDATE `retreat_applications` SET " . implode(", ", $updates) . ", `updated_at` = NOW() WHERE `id` = ?");
        $stmt->execute($updateParams);

        sendJson(["success" => true]);
    } catch (Exception $e) {
        sendJson(["success" => false, "error" => $e->getMessage()], 500);
    }

} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}

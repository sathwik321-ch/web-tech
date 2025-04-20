<?php
require_once '../backend/includes/auth.php';
require_once '../backend/includes/functions.php';

// Check if user is logged in and is an admin
if (!isLoggedIn() || getUserRole() !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
    exit;
}

$id = (int)$data['id'];
$status = sanitizeInput($data['status']);

// Validate status
$valid_statuses = ['pending', 'reviewing', 'approved', 'rejected'];
if (!in_array($status, $valid_statuses)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid status']);
    exit;
}

try {
    // Update application status
    $stmt = $conn->prepare("UPDATE applications SET status = ?, updated_at = NOW() WHERE id = ?");
    $stmt->bind_param("si", $status, $id);
    
    if ($stmt->execute()) {
        // Log the status change
        $admin_id = $_SESSION['user_id'];
        $log_stmt = $conn->prepare("INSERT INTO activity_logs (user_id, action, details) VALUES (?, 'update_application_status', ?)");
        $details = json_encode([
            'application_id' => $id,
            'new_status' => $status
        ]);
        $log_stmt->bind_param("is", $admin_id, $details);
        $log_stmt->execute();
        
        echo json_encode(['success' => true]);
    } else {
        throw new Exception("Failed to update application status");
    }
} catch (Exception $e) {
    error_log("Error updating application status: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred while updating the status']);
} 
<?php
/**
 * Reset Password API
 * 
 * This file handles the actual password reset process.
 */

// Include required files
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../includes/functions.php';

// Start session
session_start();

// Set headers for CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, [], 'Invalid request method');
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['token']) || !isset($data['password'])) {
    sendJsonResponse(false, [], 'Token and new password are required');
}

$token = sanitizeInput($data['token']);
$password = $data['password'];

// Validate password strength
if (strlen($password) < 8) {
    sendJsonResponse(false, [], 'Password must be at least 8 characters long');
}

try {
    // Connect to database
    $conn = getConnection();
    
    // Check if token exists and is valid
    $stmt = $conn->prepare("
        SELECT pr.user_id, u.email 
        FROM password_resets pr 
        JOIN users u ON pr.user_id = u.id 
        WHERE pr.token = ? AND pr.expiry > NOW() AND pr.used = 0
    ");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendJsonResponse(false, [], 'Invalid or expired reset token');
    }
    
    $reset_data = $result->fetch_assoc();
    $user_id = $reset_data['user_id'];
    $email = $reset_data['email'];
    
    // Hash new password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Update password
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $hashed_password, $user_id);
    $stmt->execute();
    
    // Mark token as used
    $stmt = $conn->prepare("UPDATE password_resets SET used = 1 WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    
    // Log password reset
    logActivity('password_reset_complete', "User ID: $user_id, Email: $email");
    
    // TODO: Send password changed confirmation email
    // sendPasswordChangedEmail($email);
    
    // Return success response
    sendJsonResponse(true, [
        'message' => 'Password has been reset successfully'
    ]);
    
} catch(Exception $e) {
    error_log("Error during password reset: " . $e->getMessage());
    sendJsonResponse(false, [], $e->getMessage());
}
?> 
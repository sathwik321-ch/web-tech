<?php
/**
 * Forgot Password API
 * 
 * This file handles password reset requests.
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
if (!isset($data['email'])) {
    sendJsonResponse(false, [], 'Email is required');
}

$email = sanitizeInput($data['email']);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, [], 'Invalid email format');
}

try {
    // Connect to database
    $conn = getConnection();
    
    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        // For security reasons, we still return success even if email doesn't exist
        sendJsonResponse(true, [
            'message' => 'If your email is registered, you will receive password reset instructions.'
        ]);
    }
    
    $user = $result->fetch_assoc();
    $user_id = $user['id'];
    
    // Generate reset token
    $reset_token = bin2hex(random_bytes(32));
    $token_expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
    
    // Store reset token
    $stmt = $conn->prepare("INSERT INTO password_resets (user_id, token, expiry) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $reset_token, $token_expiry);
    $stmt->execute();
    
    // Log password reset request
    logActivity('password_reset_request', "User ID: $user_id, Email: $email");
    
    // TODO: Send password reset email
    // sendPasswordResetEmail($email, $reset_token);
    
    // Return success response
    sendJsonResponse(true, [
        'message' => 'If your email is registered, you will receive password reset instructions.'
    ]);
    
} catch(Exception $e) {
    error_log("Error during password reset request: " . $e->getMessage());
    sendJsonResponse(false, [], $e->getMessage());
}
?> 
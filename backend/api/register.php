<?php
/**
 * Registration API
 * 
 * This file handles user registration.
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
if (!isset($data['email']) || !isset($data['password']) || !isset($data['confirm_password'])) {
    sendJsonResponse(false, [], 'All fields are required');
}

$email = sanitizeInput($data['email']);
$password = $data['password'];
$confirm_password = $data['confirm_password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, [], 'Invalid email format');
}

// Validate password
if (strlen($password) < 8) {
    sendJsonResponse(false, [], 'Password must be at least 8 characters long');
}

if ($password !== $confirm_password) {
    sendJsonResponse(false, [], 'Passwords do not match');
}

try {
    // Connect to database
    $conn = getConnection();
    
    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        sendJsonResponse(false, [], 'Email already registered');
    }
    
    // Generate verification token
    $verification_token = bin2hex(random_bytes(32));
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (email, password, verification_token, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("sss", $email, $hashed_password, $verification_token);
    $stmt->execute();
    
    $user_id = $conn->insert_id;
    
    // Log registration
    logActivity('registration', "User ID: $user_id, Email: $email");
    
    // TODO: Send verification email
    // sendVerificationEmail($email, $verification_token);
    
    // Return success response
    sendJsonResponse(true, [
        'message' => 'Registration successful. Please check your email to verify your account.',
        'user' => [
            'id' => $user_id,
            'email' => $email
        ]
    ]);
    
} catch(Exception $e) {
    error_log("Error during registration: " . $e->getMessage());
    sendJsonResponse(false, [], $e->getMessage());
}
?> 
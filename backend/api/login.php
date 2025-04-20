<?php
/**
 * Login API
 * 
 * This file handles user login.
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
if (!isset($data['email']) || !isset($data['password'])) {
    sendJsonResponse(false, [], 'Email and password are required');
}

$email = sanitizeInput($data['email']);
$password = $data['password'];

try {
    // Connect to database
    $conn = getConnection();
    
    // Get user by email
    $stmt = $conn->prepare("SELECT id, email, password, is_verified, status FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        logLoginAttempt($email, false, 'User not found');
        sendJsonResponse(false, [], 'Invalid email or password');
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        logLoginAttempt($email, false, 'Invalid password');
        sendJsonResponse(false, [], 'Invalid email or password');
    }
    
    // Check if account is verified
    if (!$user['is_verified']) {
        logLoginAttempt($email, false, 'Account not verified');
        sendJsonResponse(false, [], 'Please verify your email address');
    }
    
    // Check if account is active
    if ($user['status'] !== 'active') {
        logLoginAttempt($email, false, 'Account not active');
        sendJsonResponse(false, [], 'Your account is not active');
    }
    
    // Update last login time
    $stmt = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $stmt->bind_param("i", $user['id']);
    $stmt->execute();
    
    // Log successful login
    logLoginAttempt($email, true, 'Login successful');
    logActivity('login', "User ID: {$user['id']}");
    
    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    
    // Return success response with user data
    sendJsonResponse(true, [
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'email' => $user['email']
        ]
    ]);
    
} catch(Exception $e) {
    error_log("Error during login: " . $e->getMessage());
    sendJsonResponse(false, [], $e->getMessage());
}
?> 
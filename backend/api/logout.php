<?php
/**
 * Logout API
 * 
 * This file handles user logout.
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

try {
    // Check if user is logged in
    if (!isLoggedIn()) {
        sendJsonResponse(false, [], 'User is not logged in');
    }
    
    // Get user ID for logging
    $userId = $_SESSION['user_id'];
    
    // Log logout activity
    logActivity('logout', "User ID: $userId");
    
    // Update last logout time in database
    $conn = getConnection();
    $stmt = $conn->prepare("UPDATE users SET last_logout = NOW() WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->close();
    closeConnection($conn);
    
    // Destroy session
    session_destroy();
    
    // Return success response
    sendJsonResponse(true, ['message' => 'Logout successful']);

} catch(Exception $e) {
    error_log("Error during logout: " . $e->getMessage());
    sendJsonResponse(false, [], $e->getMessage());
}
?> 
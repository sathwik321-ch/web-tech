<?php
/**
 * Submit Application API
 * 
 * This file handles the submission of startup applications.
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
        sendJsonResponse(false, [], 'Please login to submit an application');
    }
    
    // Get user ID from session
    $userId = $_SESSION['user_id'];
    
    // Get form data
    $programId = isset($_POST['programId']) ? intval($_POST['programId']) : 0;
    $startupName = isset($_POST['startupName']) ? sanitizeInput($_POST['startupName']) : '';
    $startupStage = isset($_POST['startupStage']) ? sanitizeInput($_POST['startupStage']) : '';
    $industry = isset($_POST['industry']) ? sanitizeInput($_POST['industry']) : '';
    $description = isset($_POST['description']) ? sanitizeInput($_POST['description']) : '';
    $fundingNeeded = isset($_POST['fundingNeeded']) ? floatval($_POST['fundingNeeded']) : 0;
    $currentRevenue = isset($_POST['revenue']) ? floatval($_POST['revenue']) : 0;
    $teamSize = isset($_POST['teamSize']) ? intval($_POST['teamSize']) : 0;
    
    // Validate required fields
    if (empty($startupName) || empty($startupStage) || empty($industry) || empty($description)) {
        sendJsonResponse(false, [], 'Please fill in all required fields');
    }
    
    // Handle file uploads
    $pitchDeckPath = handleFileUpload('pitchDeck', UPLOAD_DIR);
    $financialsPath = handleFileUpload('financialProjections', UPLOAD_DIR);
    $incorporationPath = handleFileUpload('incorporationDoc', UPLOAD_DIR);
    
    if (!$pitchDeckPath || !$financialsPath || !$incorporationPath) {
        sendJsonResponse(false, [], 'File upload failed. Please make sure all required documents are uploaded in PDF format.');
    }
    
    // Connect to database
    $conn = getConnection();
    
    // Insert application
    $stmt = $conn->prepare("INSERT INTO applications (user_id, program_id, startup_name, startup_stage, industry, description, funding_needed, current_revenue, team_size, pitch_deck_path, financials_path, incorporation_doc_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception("Database error: " . $conn->error);
    }
    
    $stmt->bind_param("iissssddisss", 
        $userId, 
        $programId, 
        $startupName, 
        $startupStage, 
        $industry, 
        $description, 
        $fundingNeeded, 
        $currentRevenue, 
        $teamSize, 
        $pitchDeckPath, 
        $financialsPath, 
        $incorporationPath
    );
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to save application: " . $stmt->error);
    }
    
    $applicationId = $stmt->insert_id;
    $stmt->close();
    
    // Log activity
    logActivity('application_submitted', "Application ID: $applicationId, Program ID: $programId");
    
    // Close database connection
    closeConnection($conn);
    
    // Return success response
    sendJsonResponse(true, [
        'message' => 'Application submitted successfully',
        'application_id' => $applicationId
    ]);

} catch(Exception $e) {
    error_log("Error submitting application: " . $e->getMessage());
    sendJsonResponse(false, [], $e->getMessage());
}
?> 
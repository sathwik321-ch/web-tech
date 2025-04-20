<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Function to send JSON response
function sendJsonResponse($success, $data = [], $error = '') {
    $response = [
        'success' => $success
    ];
    
    if ($success) {
        $response = array_merge($response, $data);
    } else {
        $response['error'] = $error;
    }
    
    echo json_encode($response);
    exit;
}

try {
    // Get POST data
    $input = file_get_contents('php://input');
    if (!$input) {
        sendJsonResponse(false, [], 'No input data received');
    }

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendJsonResponse(false, [], 'Invalid JSON data received');
    }
    
    if (!isset($data['action']) || !isset($data['data'])) {
        sendJsonResponse(false, [], 'Missing required fields');
    }
    
    // Create activity_logs table if it doesn't exist
    $create_table_sql = "CREATE TABLE IF NOT EXISTS activity_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        action_type VARCHAR(50) NOT NULL,
        action_data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!mysqli_query($conn, $create_table_sql)) {
        sendJsonResponse(false, [], 'Error creating table: ' . mysqli_error($conn));
    }

    // Prepare and insert the log entry
    $action = mysqli_real_escape_string($conn, $data['action']);
    $action_data = mysqli_real_escape_string($conn, json_encode($data['data']));
    
    $sql = "INSERT INTO activity_logs (action_type, action_data) VALUES ('$action', '$action_data')";
    
    if (!mysqli_query($conn, $sql)) {
        sendJsonResponse(false, [], 'Error logging activity: ' . mysqli_error($conn));
    }
    
    // Always return success
    sendJsonResponse(true, [
        'message' => 'Activity logged successfully'
    ]);
    
} catch(Exception $e) {
    sendJsonResponse(false, [], $e->getMessage());
}

<?php
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

    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    $userType = $data['userType'] ?? '';

    // Simple validation
    if (!$username || !$password || !$userType) {
        sendJsonResponse(false, [], 'Please fill in all fields');
    }

    // For testing purposes, always return success
    sendJsonResponse(true, [
        'redirect' => $userType === 'officer' ? 'dashboard.php' : 'index.html',
        'user' => [
            'username' => $username,
            'email' => $username . '@example.com',
            'type' => $userType
        ]
    ]);

} catch (Exception $e) {
    sendJsonResponse(false, [], $e->getMessage());
}
?>

<?php
/**
 * Helper Functions
 * 
 * This file contains helper functions used throughout the application.
 */

require_once 'config.php';

/**
 * Sanitize user input
 * 
 * @param string $input User input to sanitize
 * @return string Sanitized input
 */
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

/**
 * Generate a random token
 * 
 * @param int $length Token length
 * @return string Random token
 */
function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}

/**
 * Handle file upload
 * 
 * @param string $fileKey File key in $_FILES
 * @param string $uploadDir Upload directory
 * @return string|false File path on success, false on failure
 */
function handleFileUpload($fileKey, $uploadDir) {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        error_log("File upload error: " . ($_FILES[$fileKey]['error'] ?? 'File not set'));
        return false;
    }
    
    $file = $_FILES[$fileKey];
    
    // Check file size
    if ($file['size'] > MAX_FILE_SIZE) {
        error_log("File too large: " . $file['size']);
        return false;
    }
    
    // Check file type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, ALLOWED_FILE_TYPES)) {
        error_log("Invalid file type: " . $mimeType);
        return false;
    }
    
    // Generate unique filename
    $fileName = time() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return $fileName;
    }
    
    error_log("Failed to move uploaded file");
    return false;
}

/**
 * Send JSON response
 * 
 * @param bool $success Success status
 * @param array $data Response data
 * @param string $error Error message
 */
function sendJsonResponse($success, $data = [], $error = '') {
    header('Content-Type: application/json');
    
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

/**
 * Check if user is logged in
 * 
 * @return bool True if user is logged in, false otherwise
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Redirect to a URL
 * 
 * @param string $url URL to redirect to
 */
function redirect($url) {
    header("Location: $url");
    exit;
}

/**
 * Log activity
 * 
 * @param string $action Action performed
 * @param string $details Additional details
 * @param int $userId User ID (optional)
 */
function logActivity($user_id, $action, $details) {
    global $conn;
    
    $sql = "INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $ip = $_SERVER['REMOTE_ADDR'];
    $stmt->bind_param("isss", $user_id, $action, $details, $ip);
    $stmt->execute();
}

// Input Validation Functions
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validatePassword($password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    $pattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/";
    return preg_match($pattern, $password);
}

// Token Management
function validateToken($token, $type) {
    global $conn;
    
    $sql = "SELECT * FROM tokens WHERE token = ? AND type = ? AND used = 0 AND expiry > NOW()";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $token, $type);
    $stmt->execute();
    $result = $stmt->get_result();
    
    return $result->num_rows > 0;
}

// Session Management
function regenerateSession() {
    session_regenerate_id(true);
}

function getUserRole() {
    return isset($_SESSION['user_role']) ? $_SESSION['user_role'] : null;
}

// Email Functions
function sendEmail($to, $subject, $message) {
    $headers = 'From: noreply@yourwebsite.com' . "\r\n" .
        'Reply-To: noreply@yourwebsite.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    return mail($to, $subject, $message, $headers);
}

// Database Helper Functions
function getUser($user_id) {
    global $conn;
    
    $sql = "SELECT id, username, email, role, created_at FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    return $result->fetch_assoc();
}

function isAccountLocked($user_id) {
    global $conn;
    
    $sql = "SELECT locked_until FROM users WHERE id = ? AND locked_until > NOW()";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    return $result->num_rows > 0;
}

// Error Handling
function logError($message, $severity = 'ERROR') {
    $log_file = __DIR__ . '/../../logs/error.log';
    $timestamp = date('Y-m-d H:i:s');
    $log_message = "[$timestamp] [$severity] $message\n";
    
    error_log($log_message, 3, $log_file);
}
?> 
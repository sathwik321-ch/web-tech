<?php
require_once 'admin/config.php';
require_once 'backend/includes/auth.php';

// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize input
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $terms = isset($_POST['terms']) ? true : false;

    // Validate input
    if (empty($name) || empty($email) || empty($password) || empty($confirm_password)) {
        $response['message'] = 'All fields are required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format';
    } elseif (strlen($password) < 8) {
        $response['message'] = 'Password must be at least 8 characters long';
    } elseif ($password !== $confirm_password) {
        $response['message'] = 'Passwords do not match';
    } elseif (!$terms) {
        $response['message'] = 'You must agree to the Terms & Conditions';
    } else {
        try {
            // Check if email already exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() > 0) {
                $response['message'] = 'Email already registered';
            } else {
                // Register user
                $result = registerUser($name, $email, $password, 'user');
                
                if ($result['success']) {
                    $response['success'] = true;
                    $response['message'] = 'Registration successful! Please login.';
                    
                    // Log the registration
                    logActivity('user_registration', $result['user_id'], 'User registered successfully');
                    
                    // Redirect to login page after 2 seconds
                    header("refresh:2;url=login.html");
                } else {
                    $response['message'] = $result['message'];
                }
            }
        } catch (PDOException $e) {
            error_log("Registration error: " . $e->getMessage());
            $response['message'] = 'An error occurred during registration. Please try again later.';
        }
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>

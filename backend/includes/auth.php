<?php
/**
 * Authentication Functions
 * 
 * This file contains functions for user authentication, including login, registration,
 * password reset, and session management.
 */

require_once 'config.php';
require_once 'functions.php';
require_once 'db.php';

class Auth {
    private $conn;
    private $max_attempts = 5;
    private $lockout_time = 30; // minutes
    
    public function __construct() {
        global $conn;
        $this->conn = $conn;
    }
    
    public function register($username, $email, $password, $role = 'user') {
        try {
            // Validate input
            if (!validateEmail($email)) {
                throw new Exception('Invalid email format');
            }
            
            if (!validatePassword($password)) {
                throw new Exception('Password does not meet requirements');
            }
            
            // Check if username or email exists
            $stmt = $this->conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
            $stmt->bind_param("ss", $username, $email);
            $stmt->execute();
            if ($stmt->get_result()->num_rows > 0) {
                throw new Exception('Username or email already exists');
            }
            
            // Hash password and create user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $this->conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $username, $email, $hashed_password, $role);
            
            if (!$stmt->execute()) {
                throw new Exception('Failed to create user');
            }
            
            $user_id = $this->conn->insert_id;
            logActivity($user_id, 'REGISTER', 'User registration successful');
            
            return $user_id;
        } catch (Exception $e) {
            logError($e->getMessage());
            throw $e;
        }
    }
    
    public function login($username, $password) {
        try {
            // Check for too many failed attempts
            if ($this->isIpBlocked($_SERVER['REMOTE_ADDR'])) {
                throw new Exception('Too many failed attempts. Please try again later.');
            }
            
            // Get user
            $stmt = $this->conn->prepare("SELECT id, password, role, locked_until FROM users WHERE username = ? OR email = ?");
            $stmt->bind_param("ss", $username, $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                $this->logFailedAttempt($username);
                throw new Exception('Invalid credentials');
            }
            
            $user = $result->fetch_assoc();
            
            // Check if account is locked
            if ($user['locked_until'] !== null && strtotime($user['locked_until']) > time()) {
                throw new Exception('Account is locked. Please try again later.');
            }
            
            // Verify password
            if (!password_verify($password, $user['password'])) {
                $this->logFailedAttempt($username);
                throw new Exception('Invalid credentials');
            }
            
            // Reset failed attempts
            $stmt = $this->conn->prepare("UPDATE users SET failed_attempts = 0, last_login = NOW() WHERE id = ?");
            $stmt->bind_param("i", $user['id']);
            $stmt->execute();
            
            // Start session
            session_start();
            regenerateSession();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_role'] = $user['role'];
            
            logActivity($user['id'], 'LOGIN', 'User logged in successfully');
            
            return $user;
        } catch (Exception $e) {
            logError($e->getMessage());
            throw $e;
        }
    }
    
    public function logout() {
        $user_id = $_SESSION['user_id'] ?? null;
        
        session_start();
        session_destroy();
        
        if ($user_id) {
            logActivity($user_id, 'LOGOUT', 'User logged out successfully');
        }
        
        return true;
    }
    
    public function requestPasswordReset($email) {
        try {
            if (!validateEmail($email)) {
                throw new Exception('Invalid email format');
            }
            
            $stmt = $this->conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                throw new Exception('Email not found');
            }
            
            $user = $result->fetch_assoc();
            $token = bin2hex(random_bytes(32));
            $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
            
            $stmt = $this->conn->prepare("INSERT INTO tokens (user_id, token, type, expiry) VALUES (?, ?, 'password_reset', ?)");
            $stmt->bind_param("iss", $user['id'], $token, $expiry);
            
            if (!$stmt->execute()) {
                throw new Exception('Failed to create reset token');
            }
            
            // Send reset email
            $reset_link = "https://yourwebsite.com/reset-password?token=" . $token;
            $message = "Click the following link to reset your password: " . $reset_link;
            sendEmail($email, "Password Reset Request", $message);
            
            logActivity($user['id'], 'PASSWORD_RESET_REQUEST', 'Password reset requested');
            
            return true;
        } catch (Exception $e) {
            logError($e->getMessage());
            throw $e;
        }
    }
    
    public function resetPassword($token, $new_password) {
        try {
            if (!validatePassword($new_password)) {
                throw new Exception('Password does not meet requirements');
            }
            
            $stmt = $this->conn->prepare("SELECT user_id FROM tokens WHERE token = ? AND type = 'password_reset' AND used = 0 AND expiry > NOW()");
            $stmt->bind_param("s", $token);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                throw new Exception('Invalid or expired token');
            }
            
            $token_data = $result->fetch_assoc();
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            
            // Update password
            $stmt = $this->conn->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->bind_param("si", $hashed_password, $token_data['user_id']);
            
            if (!$stmt->execute()) {
                throw new Exception('Failed to update password');
            }
            
            // Mark token as used
            $stmt = $this->conn->prepare("UPDATE tokens SET used = 1 WHERE token = ?");
            $stmt->bind_param("s", $token);
            $stmt->execute();
            
            logActivity($token_data['user_id'], 'PASSWORD_RESET', 'Password reset successful');
            
            return true;
        } catch (Exception $e) {
            logError($e->getMessage());
            throw $e;
        }
    }
    
    private function logFailedAttempt($username) {
        $ip = $_SERVER['REMOTE_ADDR'];
        
        // Log attempt
        $stmt = $this->conn->prepare("INSERT INTO login_attempts (username, ip_address) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $ip);
        $stmt->execute();
        
        // Update failed attempts for user
        $stmt = $this->conn->prepare("UPDATE users SET failed_attempts = failed_attempts + 1 WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        
        // Check if account should be locked
        $stmt = $this->conn->prepare("SELECT failed_attempts FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if ($user['failed_attempts'] >= $this->max_attempts) {
                $locked_until = date('Y-m-d H:i:s', strtotime("+{$this->lockout_time} minutes"));
                $stmt = $this->conn->prepare("UPDATE users SET locked_until = ? WHERE username = ?");
                $stmt->bind_param("ss", $locked_until, $username);
                $stmt->execute();
            }
        }
    }
    
    private function isIpBlocked($ip) {
        $stmt = $this->conn->prepare("SELECT COUNT(*) as attempts FROM login_attempts WHERE ip_address = ? AND attempted_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
        $stmt->bind_param("s", $ip);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        
        return $result['attempts'] >= $this->max_attempts;
    }
}

/**
 * Register a new user
 * 
 * @param string $username The username
 * @param string $email The email address
 * @param string $password The password
 * @param string $role The user role (default: 'user')
 * @return array The result of the registration
 */
function registerUser($username, $email, $password, $role = 'user') {
    // Validate input
    if (empty($username) || empty($email) || empty($password)) {
        return [
            'success' => false,
            'message' => 'All fields are required'
        ];
    }
    
    if (!validateEmail($email)) {
        return [
            'success' => false,
            'message' => 'Invalid email address'
        ];
    }
    
    if (strlen($password) < 8) {
        return [
            'success' => false,
            'message' => 'Password must be at least 8 characters long'
        ];
    }
    
    // Check if username or email already exists
    $existing_user = getRow(
        "SELECT id FROM users WHERE username = ? OR email = ?",
        [$username, $email]
    );
    
    if ($existing_user) {
        return [
            'success' => false,
            'message' => 'Username or email already exists'
        ];
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    $user_id = insertRow('users', [
        'username' => $username,
        'email' => $email,
        'password' => $hashed_password,
        'role' => $role,
        'created_at' => date('Y-m-d H:i:s')
    ]);
    
    if (!$user_id) {
        return [
            'success' => false,
            'message' => 'Registration failed. Please try again.'
        ];
    }
    
    // Log activity
    logActivity('user_registration', "User registered: $username");
    
    return [
        'success' => true,
        'message' => 'Registration successful',
        'user_id' => $user_id
    ];
}

/**
 * Login a user
 * 
 * @param string $username The username or email
 * @param string $password The password
 * @return array The result of the login
 */
function loginUser($username, $password) {
    // Validate input
    if (empty($username) || empty($password)) {
        return [
            'success' => false,
            'message' => 'Username and password are required'
        ];
    }
    
    // Get user
    $user = getRow(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [$username, $username]
    );
    
    if (!$user) {
        logLoginAttempt($username, false, 'User not found');
        return [
            'success' => false,
            'message' => 'Invalid username or password'
        ];
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        logLoginAttempt($username, false, 'Invalid password');
        return [
            'success' => false,
            'message' => 'Invalid username or password'
        ];
    }
    
    // Check if account is locked
    if ($user['locked_until'] && strtotime($user['locked_until']) > time()) {
        logLoginAttempt($username, false, 'Account locked');
        return [
            'success' => false,
            'message' => 'Account is locked. Please try again later.'
        ];
    }
    
    // Start session
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['last_activity'] = time();
    
    // Update last login
    updateRow(
        'users',
        ['last_login' => date('Y-m-d H:i:s')],
        'id = ?',
        [$user['id']]
    );
    
    // Log activity
    logLoginAttempt($username, true, 'Login successful');
    logActivity('user_login', "User logged in: {$user['username']}");
    
    return [
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ];
}

/**
 * Logout the current user
 * 
 * @return array The result of the logout
 */
function logoutUser() {
    if (isset($_SESSION['username'])) {
        logActivity('user_logout', "User logged out: {$_SESSION['username']}");
    }
    
    session_unset();
    session_destroy();
    
    return [
        'success' => true,
        'message' => 'Logout successful'
    ];
}

/**
 * Request a password reset
 * 
 * @param string $email The email address
 * @return array The result of the request
 */
function requestPasswordReset($email) {
    // Validate email
    if (!validateEmail($email)) {
        return [
            'success' => false,
            'message' => 'Invalid email address'
        ];
    }
    
    // Get user
    $user = getRow(
        "SELECT id, username FROM users WHERE email = ?",
        [$email]
    );
    
    if (!$user) {
        return [
            'success' => true,
            'message' => 'If your email is registered, you will receive a password reset link'
        ];
    }
    
    // Generate token
    $token = generateRandomString(32);
    $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
    
    // Save token
    $token_id = insertRow('password_resets', [
        'user_id' => $user['id'],
        'token' => $token,
        'expires_at' => $expiry,
        'created_at' => date('Y-m-d H:i:s')
    ]);
    
    if (!$token_id) {
        return [
            'success' => false,
            'message' => 'Failed to generate reset token. Please try again.'
        ];
    }
    
    // Send email
    $reset_link = SITE_URL . "/reset-password.php?token=" . $token;
    $to = $email;
    $subject = "Password Reset Request";
    $message = "Hello {$user['username']},\n\n";
    $message .= "You have requested to reset your password. Click the link below to proceed:\n\n";
    $message .= $reset_link . "\n\n";
    $message .= "This link will expire in 1 hour.\n\n";
    $message .= "If you did not request this, please ignore this email.\n\n";
    $message .= "Best regards,\nYour Website Team";
    
    $headers = "From: " . SITE_EMAIL . "\r\n";
    $headers .= "Reply-To: " . SITE_EMAIL . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    if (!mail($to, $subject, $message, $headers)) {
        return [
            'success' => false,
            'message' => 'Failed to send reset email. Please try again.'
        ];
    }
    
    // Log activity
    logActivity('password_reset_request', "Password reset requested for user: {$user['username']}");
    
    return [
        'success' => true,
        'message' => 'If your email is registered, you will receive a password reset link'
    ];
}

/**
 * Reset a user's password
 * 
 * @param string $token The reset token
 * @param string $password The new password
 * @return array The result of the reset
 */
function resetPassword($token, $password) {
    // Validate input
    if (empty($token) || empty($password)) {
        return [
            'success' => false,
            'message' => 'Token and password are required'
        ];
    }
    
    if (strlen($password) < 8) {
        return [
            'success' => false,
            'message' => 'Password must be at least 8 characters long'
        ];
    }
    
    // Get reset token
    $reset = getRow(
        "SELECT * FROM password_resets WHERE token = ? AND used = 0 AND expires_at > NOW()",
        [$token]
    );
    
    if (!$reset) {
        return [
            'success' => false,
            'message' => 'Invalid or expired reset token'
        ];
    }
    
    // Hash new password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Update password
    $updated = updateRow(
        'users',
        ['password' => $hashed_password],
        'id = ?',
        [$reset['user_id']]
    );
    
    if (!$updated) {
        return [
            'success' => false,
            'message' => 'Failed to reset password. Please try again.'
        ];
    }
    
    // Mark token as used
    markTokenAsUsed($token);
    
    // Log activity
    logActivity('password_reset', "Password reset for user ID: {$reset['user_id']}");
    
    return [
        'success' => true,
        'message' => 'Password has been reset successfully'
    ];
}

/**
 * Change a user's password
 * 
 * @param int $user_id The user ID
 * @param string $current_password The current password
 * @param string $new_password The new password
 * @return array The result of the change
 */
function changePassword($user_id, $current_password, $new_password) {
    // Validate input
    if (empty($current_password) || empty($new_password)) {
        return [
            'success' => false,
            'message' => 'Current password and new password are required'
        ];
    }
    
    if (strlen($new_password) < 8) {
        return [
            'success' => false,
            'message' => 'New password must be at least 8 characters long'
        ];
    }
    
    // Get user
    $user = getRow(
        "SELECT * FROM users WHERE id = ?",
        [$user_id]
    );
    
    if (!$user) {
        return [
            'success' => false,
            'message' => 'User not found'
        ];
    }
    
    // Verify current password
    if (!password_verify($current_password, $user['password'])) {
        return [
            'success' => false,
            'message' => 'Current password is incorrect'
        ];
    }
    
    // Hash new password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    
    // Update password
    $updated = updateRow(
        'users',
        ['password' => $hashed_password],
        'id = ?',
        [$user_id]
    );
    
    if (!$updated) {
        return [
            'success' => false,
            'message' => 'Failed to change password. Please try again.'
        ];
    }
    
    // Log activity
    logActivity('password_change', "Password changed for user: {$user['username']}");
    
    return [
        'success' => true,
        'message' => 'Password has been changed successfully'
    ];
}

/**
 * Lock a user's account
 * 
 * @param int $user_id The user ID
 * @param int $minutes The number of minutes to lock the account
 * @return bool Whether the account was locked successfully
 */
function lockAccount($user_id, $minutes = 30) {
    $locked_until = date('Y-m-d H:i:s', strtotime("+$minutes minutes"));
    
    $updated = updateRow(
        'users',
        ['locked_until' => $locked_until],
        'id = ?',
        [$user_id]
    );
    
    if ($updated) {
        logActivity('account_locked', "Account locked for user ID: $user_id for $minutes minutes");
    }
    
    return $updated;
}

/**
 * Unlock a user's account
 * 
 * @param int $user_id The user ID
 * @return bool Whether the account was unlocked successfully
 */
function unlockAccount($user_id) {
    $updated = updateRow(
        'users',
        ['locked_until' => null],
        'id = ?',
        [$user_id]
    );
    
    if ($updated) {
        logActivity('account_unlocked', "Account unlocked for user ID: $user_id");
    }
    
    return $updated;
}
?> 
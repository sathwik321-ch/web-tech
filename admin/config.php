<?php
// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'admin_system');
define('DB_USER', 'root');  // Change in production
define('DB_PASS', '');      // Change in production

// Session configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.gc_maxlifetime', 3600); // 1 hour
ini_set('session.use_strict_mode', 1);

// Security configuration
define('CSRF_TOKEN_SECRET', 'your-secret-key-here'); // Change in production
define('PASSWORD_RESET_EXPIRY', 3600); // 1 hour

// Connect to database
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    error_log('Database connection failed: ' . $e->getMessage());
    die('Database connection failed. Please try again later.');
}

// Helper Functions

/**
 * Sanitize user input
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate CSRF token
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken($token) {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Log login attempts
 */
function logLoginAttempt($email, $success) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("INSERT INTO login_logs (email, success, ip_address) VALUES (?, ?, ?)");
        $stmt->execute([
            $email,
            $success ? 1 : 0,
            $_SERVER['REMOTE_ADDR'] ?? null
        ]);
    } catch (PDOException $e) {
        error_log("Failed to log login attempt: " . $e->getMessage());
    }
}

/**
 * Generate password reset token
 */
function generatePasswordResetToken($email) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Delete any existing unused tokens
        $stmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ? AND used = 0");
        $stmt->execute([$email]);
        
        // Generate new token
        $token = bin2hex(random_bytes(32));
        $expiry = date('Y-m-d H:i:s', time() + PASSWORD_RESET_EXPIRY);
        
        $stmt = $pdo->prepare("INSERT INTO password_resets (email, token, expiry) VALUES (?, ?, ?)");
        $stmt->execute([$email, $token, $expiry]);
        
        return $token;
    } catch (PDOException $e) {
        error_log("Failed to generate password reset token: " . $e->getMessage());
        return false;
    }
}

/**
 * Verify password reset token
 */
function verifyPasswordResetToken($email, $token) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE email = ? AND token = ? AND used = 0 AND expiry > CURRENT_TIMESTAMP");
        $stmt->execute([$email, $token]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    } catch (PDOException $e) {
        error_log("Failed to verify password reset token: " . $e->getMessage());
        return false;
    }
}

/**
 * Mark password reset token as used
 */
function markPasswordResetTokenAsUsed($email, $token) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("UPDATE password_resets SET used = 1 WHERE email = ? AND token = ?");
        $stmt->execute([$email, $token]);
        
        return true;
    } catch (PDOException $e) {
        error_log("Failed to mark password reset token as used: " . $e->getMessage());
        return false;
    }
}

/**
 * Require authentication
 */
function require_auth() {
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }

    // Check session timeout (30 minutes)
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
        session_unset();
        session_destroy();
        header('Location: login.php?timeout=1');
        exit;
    }
    $_SESSION['last_activity'] = time();
}

// Error handling
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("Error [$errno] $errstr on line $errline in file $errfile");
    return true;
});

set_exception_handler(function($e) {
    error_log('Uncaught Exception: ' . $e->getMessage());
    http_response_code(500);
    die('An error occurred. Please try again later.');
});

// Password Hashing
function hash_password($password) {
    return password_hash($password, PASSWORD_ARGON2ID, [
        'memory_cost' => 65536,
        'time_cost' => 4,
        'threads' => 3
    ]);
}
?> 
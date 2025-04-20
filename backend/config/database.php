<?php
/**
 * Database Configuration
 * 
 * This file contains the database connection settings.
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'startup_fund');

/**
 * Get database connection
 * 
 * @return mysqli Database connection
 */
function getConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

/**
 * Close database connection
 * 
 * @param mysqli $conn Database connection
 */
function closeConnection($conn) {
    if ($conn) {
        $conn->close();
    }
}
?> 
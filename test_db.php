<?php
require_once 'config.php';

if ($conn) {
    echo "Database connection successful!<br>";
    
    // Test if we can create tables
    $test_sql = "SHOW TABLES FROM " . DB_NAME;
    $result = mysqli_query($conn, $test_sql);
    
    if ($result) {
        echo "Found tables:<br>";
        while ($row = mysqli_fetch_array($result)) {
            echo "- " . $row[0] . "<br>";
        }
    } else {
        echo "Error listing tables: " . mysqli_error($conn);
    }
} else {
    echo "Database connection failed: " . mysqli_connect_error();
}
?>

<?php
session_start();
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    $conn = getConnection();
    
    // Get user by email
    $stmt = $conn->prepare("SELECT id, full_name, email, password, user_type FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['user_type'] = $user['user_type'];
            
            if ($user['user_type'] == 'admin') {
                header("Location: ../admin/dashboard.php");
            } else {
                header("Location: ../dashboard.php");
            }
        } else {
            $_SESSION['error'] = "Invalid password!";
            header("Location: ../login.html");
        }
    } else {
        $_SESSION['error'] = "User not found!";
        header("Location: ../login.html");
    }
    
    $stmt->close();
    closeConnection($conn);
} else {
    header("Location: ../login.html");
}
?> 
<?php
session_start();
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);
    
    $conn = getConnection();
    
    // Insert contact message
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);
    
    if ($stmt->execute()) {
        // Send email notification
        $to = "admin@startupfund.in";
        $email_subject = "New Contact Form Submission: " . $subject;
        $email_body = "Name: $name\n";
        $email_body .= "Email: $email\n\n";
        $email_body .= "Message:\n$message";
        $headers = "From: $email";
        
        mail($to, $email_subject, $email_body, $headers);
        
        $_SESSION['success'] = "Message sent successfully! We'll get back to you soon.";
    } else {
        $_SESSION['error'] = "Message sending failed! Please try again.";
    }
    
    $stmt->close();
    closeConnection($conn);
    
    header("Location: ../index.php#contact");
} else {
    header("Location: ../index.php");
}
?> 
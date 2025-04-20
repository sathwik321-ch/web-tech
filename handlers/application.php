<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id'])) {
    $_SESSION['error'] = "Please login to submit application!";
    header("Location: ../login.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $program_id = $_POST['program_id'];
    $startup_name = trim($_POST['startup_name']);
    $startup_stage = trim($_POST['startup_stage']);
    $industry = trim($_POST['industry']);
    $description = trim($_POST['description']);
    $funding_needed = floatval($_POST['funding_needed']);
    $current_revenue = floatval($_POST['revenue']);
    $team_size = intval($_POST['team_size']);
    
    $conn = getConnection();
    
    // Handle file uploads
    $upload_dir = "../uploads/";
    $pitch_deck_path = handleFileUpload('pitch_deck', $upload_dir);
    $financials_path = handleFileUpload('financials', $upload_dir);
    $incorporation_path = handleFileUpload('incorporation_doc', $upload_dir);
    
    if (!$pitch_deck_path || !$financials_path || !$incorporation_path) {
        $_SESSION['error'] = "File upload failed! Please try again.";
        header("Location: ../apply.php?program=" . $program_id);
        exit();
    }
    
    // Insert application
    $stmt = $conn->prepare("INSERT INTO applications (user_id, program_id, startup_name, startup_stage, industry, description, funding_needed, current_revenue, team_size, pitch_deck_path, financials_path, incorporation_doc_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("iissssddisss", $user_id, $program_id, $startup_name, $startup_stage, $industry, $description, $funding_needed, $current_revenue, $team_size, $pitch_deck_path, $financials_path, $incorporation_path);
    
    if ($stmt->execute()) {
        $_SESSION['success'] = "Application submitted successfully!";
        header("Location: ../dashboard.php");
    } else {
        $_SESSION['error'] = "Application submission failed! Please try again.";
        header("Location: ../apply.php?program=" . $program_id);
    }
    
    $stmt->close();
    closeConnection($conn);
} else {
    header("Location: ../index.php");
}

function handleFileUpload($file_key, $upload_dir) {
    if (!isset($_FILES[$file_key]) || $_FILES[$file_key]['error'] !== UPLOAD_ERR_OK) {
        return false;
    }
    
    $file = $_FILES[$file_key];
    $file_name = time() . '_' . basename($file['name']);
    $target_path = $upload_dir . $file_name;
    
    // Only allow PDF files
    $allowed_types = ['application/pdf'];
    if (!in_array($file['type'], $allowed_types)) {
        return false;
    }
    
    if (move_uploaded_file($file['tmp_name'], $target_path)) {
        return $file_name;
    }
    
    return false;
}
?> 
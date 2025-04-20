<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception('Invalid input data');
    }

    // Validate required fields
    $required_fields = ['name', 'email', 'phone', 'programId', 'programTitle', 'companyName', 'businessDescription'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            throw new Exception("$field is required");
        }
    }

    // Create applications table if it doesn't exist
    $create_table_sql = "CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        program_id VARCHAR(50) NOT NULL,
        program_title VARCHAR(100) NOT NULL,
        company_name VARCHAR(100) NOT NULL,
        business_description TEXT NOT NULL,
        team_size INT,
        funding_needed DECIMAL(10,2),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if (!mysqli_query($conn, $create_table_sql)) {
        throw new Exception('Error creating table: ' . mysqli_error($conn));
    }

    // Prepare data for insertion
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $phone = mysqli_real_escape_string($conn, $data['phone']);
    $program_id = mysqli_real_escape_string($conn, $data['programId']);
    $program_title = mysqli_real_escape_string($conn, $data['programTitle']);
    $company_name = mysqli_real_escape_string($conn, $data['companyName']);
    $business_description = mysqli_real_escape_string($conn, $data['businessDescription']);
    $team_size = isset($data['teamSize']) ? (int)$data['teamSize'] : 'NULL';
    $funding_needed = isset($data['fundingNeeded']) ? (float)$data['fundingNeeded'] : 'NULL';

    // Insert the application
    $sql = "INSERT INTO applications (
        name, email, phone, program_id, program_title, 
        company_name, business_description, team_size, funding_needed
    ) VALUES (
        '$name', '$email', '$phone', '$program_id', '$program_title',
        '$company_name', '$business_description', $team_size, $funding_needed
    )";

    if (!mysqli_query($conn, $sql)) {
        throw new Exception('Error saving application: ' . mysqli_error($conn));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully!'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>

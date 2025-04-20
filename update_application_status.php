<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$host = 'localhost';
$dbname = 'startup_fund';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $id = isset($data['id']) ? (int)$data['id'] : 0;
    $status = isset($data['status']) ? $data['status'] : '';

    if ($id <= 0) {
        throw new Exception('Invalid application ID');
    }

    if (!in_array($status, ['pending', 'reviewed', 'accepted', 'rejected'])) {
        throw new Exception('Invalid status');
    }

    // Update application status
    $sql = "UPDATE applications SET status = :status WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'id' => $id,
        'status' => $status
    ]);

    if ($stmt->rowCount() === 0) {
        throw new Exception('Application not found');
    }

    echo json_encode([
        'success' => true,
        'message' => 'Status updated successfully'
    ]);

} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

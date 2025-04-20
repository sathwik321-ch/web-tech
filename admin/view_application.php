<?php
require_once '../backend/includes/auth.php';
require_once '../backend/includes/functions.php';

// Check if user is logged in and is an admin
if (!isLoggedIn() || getUserRole() !== 'admin') {
    header('Location: login.php');
    exit;
}

// Get application ID
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    header('Location: dashboard.php');
    exit;
}

try {
    // Get application details
    $stmt = $conn->prepare("
        SELECT a.*, p.name as program_name, p.type as program_type
        FROM applications a
        JOIN programs p ON a.program_id = p.id
        WHERE a.id = ?
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        header('Location: dashboard.php');
        exit;
    }
    
    $application = $result->fetch_assoc();
    
    // Get application history
    $history_stmt = $conn->prepare("
        SELECT * FROM activity_logs 
        WHERE details LIKE ? 
        ORDER BY created_at DESC
    ");
    $search_pattern = '%"application_id":' . $id . '%';
    $history_stmt->bind_param("s", $search_pattern);
    $history_stmt->execute();
    $history = $history_stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    
} catch (Exception $e) {
    error_log("Error fetching application details: " . $e->getMessage());
    header('Location: dashboard.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Details - Admin Dashboard</title>
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Application Details</h1>
            <a href="dashboard.php" class="btn">Back to Dashboard</a>
        </header>

        <div class="application-details">
            <div class="section">
                <h2>Basic Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Application ID:</label>
                        <span><?php echo htmlspecialchars($application['id']); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Program:</label>
                        <span><?php echo htmlspecialchars($application['program_name']); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Status:</label>
                        <span class="status-badge <?php echo $application['status']; ?>">
                            <?php echo ucfirst($application['status']); ?>
                        </span>
                    </div>
                    <div class="info-item">
                        <label>Submitted:</label>
                        <span><?php echo date('F j, Y g:i A', strtotime($application['created_at'])); ?></span>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Applicant Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Name:</label>
                        <span><?php echo htmlspecialchars($application['applicant_name']); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Email:</label>
                        <span><?php echo htmlspecialchars($application['email']); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Phone:</label>
                        <span><?php echo htmlspecialchars($application['phone']); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Company:</label>
                        <span><?php echo htmlspecialchars($application['company_name']); ?></span>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Business Details</h2>
                <div class="info-grid">
                    <div class="info-item full-width">
                        <label>Business Description:</label>
                        <p><?php echo nl2br(htmlspecialchars($application['business_description'])); ?></p>
                    </div>
                    <div class="info-item">
                        <label>Stage:</label>
                        <span><?php echo htmlspecialchars($application['business_stage']); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Industry:</label>
                        <span><?php echo htmlspecialchars($application['industry']); ?></span>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Application History</h2>
                <div class="history-timeline">
                    <?php foreach ($history as $event): ?>
                        <div class="timeline-item">
                            <div class="timeline-date">
                                <?php echo date('M j, Y g:i A', strtotime($event['created_at'])); ?>
                            </div>
                            <div class="timeline-content">
                                <strong><?php echo ucfirst(str_replace('_', ' ', $event['action'])); ?></strong>
                                <?php 
                                $details = json_decode($event['details'], true);
                                if (isset($details['new_status'])) {
                                    echo " - Status changed to " . ucfirst($details['new_status']);
                                }
                                ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="section">
                <h2>Update Status</h2>
                <div class="status-update">
                    <select id="newStatus" class="form-control">
                        <option value="pending" <?php echo $application['status'] === 'pending' ? 'selected' : ''; ?>>Pending</option>
                        <option value="reviewing" <?php echo $application['status'] === 'reviewing' ? 'selected' : ''; ?>>Reviewing</option>
                        <option value="approved" <?php echo $application['status'] === 'approved' ? 'selected' : ''; ?>>Approved</option>
                        <option value="rejected" <?php echo $application['status'] === 'rejected' ? 'selected' : ''; ?>>Rejected</option>
                    </select>
                    <button onclick="updateStatus(<?php echo $id; ?>)" class="btn btn-primary">Update Status</button>
                </div>
            </div>
        </div>
    </div>

    <script>
    function updateStatus(id) {
        const status = document.getElementById('newStatus').value;
        
        if (!confirm('Are you sure you want to update the application status?')) {
            return;
        }

        fetch('update_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                status: status
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Status updated successfully');
                location.reload();
            } else {
                alert('Error updating status: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the status');
        });
    }
    </script>
</body>
</html> 
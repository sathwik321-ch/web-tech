<?php
require_once '../backend/includes/auth.php';
require_once '../backend/includes/functions.php';

// Check if user is logged in and is an admin
if (!isLoggedIn() || getUserRole() !== 'admin') {
    header('Location: login.php');
    exit;
}

// Get filter parameters
$status = isset($_GET['status']) ? sanitizeInput($_GET['status']) : 'all';
$program_type = isset($_GET['program_type']) ? sanitizeInput($_GET['program_type']) : 'all';
$search = isset($_GET['search']) ? sanitizeInput($_GET['search']) : '';

// Build query
$query = "SELECT a.*, u.username, u.email as user_email 
          FROM applications a 
          JOIN users u ON a.user_id = u.id 
          WHERE 1=1";

$params = [];
$types = "";

if ($status !== 'all') {
    $query .= " AND a.status = ?";
    $params[] = $status;
    $types .= "s";
}

if ($program_type !== 'all') {
    $query .= " AND a.program_type = ?";
    $params[] = $program_type;
    $types .= "s";
}

if ($search) {
    $query .= " AND (a.startup_name LIKE ? OR a.full_name LIKE ? OR a.email LIKE ? OR u.username LIKE ?)";
    $search_param = "%$search%";
    $params = array_merge($params, [$search_param, $search_param, $search_param, $search_param]);
    $types .= "ssss";
}

$query .= " ORDER BY a.created_at DESC";

// Get applications
$stmt = $conn->prepare($query);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();
$applications = $result->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - StartupFund</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #4a90e2;
            --secondary-color: #2c3e50;
            --success-color: #27ae60;
            --warning-color: #f39c12;
            --danger-color: #e74c3c;
            --light-gray: #f5f6fa;
            --dark-gray: #2c3e50;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--light-gray);
            color: var(--dark-gray);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: white;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }

        .header h1 {
            color: var(--primary-color);
            margin-bottom: 10px;
        }

        .filters {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .filter-group {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;
        }

        .filter-item {
            flex: 1;
        }

        .filter-item label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .filter-item select,
        .filter-item input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .applications-table {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: var(--primary-color);
            color: white;
            font-weight: 600;
        }

        tr:hover {
            background-color: #f5f5f5;
        }

        .status-badge {
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.85em;
            font-weight: 600;
        }

        .status-pending {
            background-color: var(--warning-color);
            color: white;
        }

        .status-reviewing {
            background-color: var(--primary-color);
            color: white;
        }

        .status-approved {
            background-color: var(--success-color);
            color: white;
        }

        .status-rejected {
            background-color: var(--danger-color);
            color: white;
        }

        .action-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
            margin-right: 5px;
        }

        .view-btn {
            background-color: var(--primary-color);
            color: white;
        }

        .approve-btn {
            background-color: var(--success-color);
            color: white;
        }

        .reject-btn {
            background-color: var(--danger-color);
            color: white;
        }

        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 10px;
        }

        .page-btn {
            padding: 8px 15px;
            border: 1px solid var(--primary-color);
            border-radius: 4px;
            background-color: white;
            color: var(--primary-color);
            cursor: pointer;
        }

        .page-btn.active {
            background-color: var(--primary-color);
            color: white;
        }

        .no-results {
            text-align: center;
            padding: 40px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>Admin Dashboard</h1>
            <p>View and manage startup applications</p>
        </div>
    </div>

    <div class="container">
        <div class="filters">
            <form method="GET" action="">
                <div class="filter-group">
                    <div class="filter-item">
                        <label for="status">Status</label>
                        <select name="status" id="status">
                            <option value="all" <?php echo $status === 'all' ? 'selected' : ''; ?>>All Status</option>
                            <option value="pending" <?php echo $status === 'pending' ? 'selected' : ''; ?>>Pending</option>
                            <option value="reviewing" <?php echo $status === 'reviewing' ? 'selected' : ''; ?>>Reviewing</option>
                            <option value="approved" <?php echo $status === 'approved' ? 'selected' : ''; ?>>Approved</option>
                            <option value="rejected" <?php echo $status === 'rejected' ? 'selected' : ''; ?>>Rejected</option>
                        </select>
                    </div>
                    <div class="filter-item">
                        <label for="program_type">Program Type</label>
                        <select name="program_type" id="program_type">
                            <option value="all" <?php echo $program_type === 'all' ? 'selected' : ''; ?>>All Programs</option>
                            <option value="incubator" <?php echo $program_type === 'incubator' ? 'selected' : ''; ?>>Incubators</option>
                            <option value="accelerator" <?php echo $program_type === 'accelerator' ? 'selected' : ''; ?>>Accelerators</option>
                            <option value="government" <?php echo $program_type === 'government' ? 'selected' : ''; ?>>Government</option>
                            <option value="angel" <?php echo $program_type === 'angel' ? 'selected' : ''; ?>>Angel Investors</option>
                            <option value="sbdc" <?php echo $program_type === 'sbdc' ? 'selected' : ''; ?>>SBDCs</option>
                        </select>
                    </div>
                    <div class="filter-item">
                        <label for="search">Search</label>
                        <input type="text" name="search" id="search" placeholder="Search by startup name, applicant name, or email" value="<?php echo htmlspecialchars($search); ?>">
                    </div>
                </div>
                <button type="submit" class="action-btn view-btn">Apply Filters</button>
            </form>
        </div>

        <div class="applications-table">
            <?php if (empty($applications)): ?>
                <div class="no-results">
                    <i class="fas fa-search fa-3x"></i>
                    <p>No applications found matching your criteria</p>
                </div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Startup Name</th>
                            <th>Applicant</th>
                            <th>Program Type</th>
                            <th>Stage</th>
                            <th>Funding Needed</th>
                            <th>Status</th>
                            <th>Submitted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($applications as $app): ?>
                            <tr>
                                <td><?php echo $app['id']; ?></td>
                                <td><?php echo htmlspecialchars($app['startup_name']); ?></td>
                                <td>
                                    <?php echo htmlspecialchars($app['full_name']); ?><br>
                                    <small><?php echo htmlspecialchars($app['email']); ?></small>
                                </td>
                                <td><?php echo ucfirst($app['program_type']); ?></td>
                                <td><?php echo ucfirst($app['startup_stage']); ?></td>
                                <td>₹<?php echo number_format($app['funding_needed']); ?></td>
                                <td>
                                    <span class="status-badge status-<?php echo $app['status']; ?>">
                                        <?php echo ucfirst($app['status']); ?>
                                    </span>
                                </td>
                                <td><?php echo date('M d, Y', strtotime($app['created_at'])); ?></td>
                                <td>
                                    <button class="action-btn view-btn" onclick="viewApplication(<?php echo $app['id']; ?>)">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <?php if ($app['status'] === 'pending'): ?>
                                        <button class="action-btn approve-btn" onclick="updateStatus(<?php echo $app['id']; ?>, 'approved')">
                                            <i class="fas fa-check"></i> Approve
                                        </button>
                                        <button class="action-btn reject-btn" onclick="updateStatus(<?php echo $app['id']; ?>, 'rejected')">
                                            <i class="fas fa-times"></i> Reject
                                        </button>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>

    <script>
        function viewApplication(id) {
            window.location.href = `view_application.php?id=${id}`;
        }

        function updateStatus(id, status) {
            if (confirm(`Are you sure you want to ${status} this application?`)) {
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
                        location.reload();
                    } else {
                        alert('Failed to update status: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while updating the status');
                });
            }
        }
    </script>
</body>
</html> 
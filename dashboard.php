<?php
session_start();

// Check if user is logged in and is an officer
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'officer') {
    header('Location: login.html');
    exit;
}

// Database connection
$host = 'localhost';
$dbname = 'startup_fund';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch all applications
    $sql = "SELECT * FROM applications ORDER BY submitted_at DESC";
    $stmt = $pdo->query($sql);
    $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Applications Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <nav>
        <div class="logo">
            <h1>StartupFund Dashboard</h1>
        </div>
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="#" id="logoutBtn" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </nav>

    <main class="dashboard-container">
        <div class="dashboard-header">
            <h2>Submitted Applications</h2>
            <div class="filters">
                <select id="statusFilter">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                <input type="text" id="searchInput" placeholder="Search applications...">
            </div>
        </div>

        <div class="applications-grid">
            <?php foreach ($applications as $app): ?>
            <div class="application-card" data-status="<?= htmlspecialchars($app['status']) ?>">
                <div class="card-header">
                    <h3><?= htmlspecialchars($app['startup_name']) ?></h3>
                    <span class="status-badge <?= $app['status'] ?>"><?= ucfirst($app['status']) ?></span>
                </div>
                <div class="card-body">
                    <p><strong>Founder:</strong> <?= htmlspecialchars($app['full_name']) ?></p>
                    <p><strong>Industry:</strong> <?= htmlspecialchars($app['industry']) ?></p>
                    <p><strong>Stage:</strong> <?= htmlspecialchars($app['startup_stage']) ?></p>
                    <p><strong>Funding Needed:</strong> ₹<?= number_format($app['funding_needed']) ?></p>
                    <p><strong>Submitted:</strong> <?= date('d M Y', strtotime($app['submitted_at'])) ?></p>
                </div>
                <div class="card-footer">
                    <button class="view-details-btn" data-id="<?= $app['id'] ?>">
                        View Details
                    </button>
                    <div class="status-actions">
                        <button class="status-btn accept" data-id="<?= $app['id'] ?>" <?= $app['status'] === 'accepted' ? 'disabled' : '' ?>>
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="status-btn reject" data-id="<?= $app['id'] ?>" <?= $app['status'] === 'rejected' ? 'disabled' : '' ?>>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </main>

    <!-- Application Details Modal -->
    <div id="applicationDetailsModal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div id="applicationDetails"></div>
        </div>
    </div>

    <script src="dashboard.js"></script>
</body>
</html>

<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include your database connection
include 'db.php'; 

// Check if data is received
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve POST data
    $item_id = isset($_POST['item_id']) ? intval($_POST['item_id']) : 0;
    $variation_id = isset($_POST['variation_id']) ? intval($_POST['variation_id']) : 0;

    // Validate the inputs
    if ($item_id <= 0 || $variation_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid inputs']);
        exit;
    }

    // Update variation in the database
    $query = "UPDATE basket_items SET variation_id = ? WHERE basket_item_id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare the statement']);
        exit;
    }

    $stmt->bind_param('ii', $variation_id, $item_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update variation']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>

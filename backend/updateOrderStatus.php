<?php
// Allow from specific origin
header("Access-Control-Allow-Origin: http://localhost:3000");

// Allow credentials (cookies, authorization headers, etc.)
header("Access-Control-Allow-Credentials: true");

// Allow specific methods (GET, POST, OPTIONS, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// updateQuantity.php
include('db.php');  // Include the file where the variables are defined

// Establish database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if connection failed
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Debugging: check the POST data
var_dump($_POST);  // This will output the received POST data for debugging

// Your logic to update the order status
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the order ID and new status from the POST data
    $orderId = $_POST['orderId'];
    $newStatus = $_POST['newStatus'];

    // Prepare the SQL query
    $query = "UPDATE orders SET status_id = ? WHERE order_id = ?";

    // Use prepared statements with mysqli
    if ($stmt = $conn->prepare($query)) {
        // Bind parameters to the prepared statement
        $stmt->bind_param("si", $newStatus, $orderId); // "si" means string and integer

        // Execute the query
        if ($stmt->execute()) {
            echo "Order status updated successfully.";
        } else {
            echo "Failed to update order status.";
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing the SQL statement.";
    }
}

// Close the database connection
$conn->close();
?>
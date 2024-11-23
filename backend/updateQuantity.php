<?php
// Allow CORS for all domains (this might be too open for production, adjust as needed)
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow the Content-Type header

// For pre-flight requests (OPTIONS), we return a successful response without processing the request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
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

// Handle the POST request to update quantity
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Extract and validate the POST data
    $itemId = isset($_POST['item_id']) ? (int)$_POST['item_id'] : 0;
    $newQuantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 0;

    // Debugging: check the extracted values
    var_dump($itemId, $newQuantity);  // This will show the values for item_id and quantity

    // Validate input
    if ($itemId <= 0 || $newQuantity <= 0) {
        echo json_encode(["success" => false, "error" => "Invalid input values"]);
        exit;
    }

    // Update query: Fixing the table name to 'basket_items' and using the correct column 'basket_item_id'
    $query = "UPDATE basket_items SET quantity = ? WHERE basket_item_id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param('ii', $newQuantity, $itemId);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Failed to update quantity"]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Failed to prepare query"]);
    }

    // Close the database connection
    $conn->close();
} else {
    // Handle cases where the request method is not POST
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>

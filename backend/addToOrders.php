<?php
session_start();

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Ensure session is started and user_id is available
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'error' => 'No user ID found in session'
    ]);
    exit();
}

$user_id = $_SESSION['user_id'];

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Read the JSON input data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if the user ID in the request matches the session user ID
if (!isset($data['user_id']) || $data['user_id'] !== $user_id) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid user ID'
    ]);
    exit();
}

// Ensure the shipping_address_id is provided in the request
if (!isset($data['shipping_address_id']) || empty($data['shipping_address_id'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Shipping address ID is required'
    ]);
    exit();
}

// Generate a unique order group ID with 5 digits
$order_group_id = str_pad(rand(10000, 99999), 5, "0", STR_PAD_LEFT);  // 5-digit random number

// Log to ensure the order_group_id is being generated correctly
error_log("Generated order_group_id: " . $order_group_id);

// Insert each item into the orders table with the order group ID and shipping_address_id
foreach ($data['items'] as $item) {
    // SQL query to insert the item into orders table including shipping_address_id and status_id
    $sql = "INSERT INTO orders 
(user_id, shipping_address_id, basket_item_id, price, product_id, product_name, quantity, 
 discount_price, image, variation_id, variation_name, shipping, 
 total_payment, payment_method, saved, order_group_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);

if ($stmt) {
// Bind parameters including the shipping_address_id and status_id
$stmt->bind_param("iiidisidsisddsdi", 
    $data['user_id'],   // i
    $data['shipping_address_id'], // i
    $item['basket_item_id'], // i
    $item['price'],     // d
    $item['product_id'], // i
    $item['product_name'], // s
    $item['quantity'],   // i
    $item['discount_price'], // d
    $item['image'],      // s
    $item['variation_id'], // i
    $item['variation_name'], // s
    $item['shipping'],   // d
    $item['total_payment'], // d
    $item['payment_method'], // s
    $item['saved'],      // d
    $order_group_id,     // s
);



// Execute the query
$stmt->execute();

// After successfully inserting into orders, delete from basket
$deleteSql = "DELETE FROM basket_items WHERE basket_item_id = ?";

// Prepare and bind parameters for delete query
$deleteStmt = $conn->prepare($deleteSql);
if ($deleteStmt) {
$deleteStmt->bind_param("i", $item['basket_item_id']);
$deleteStmt->execute();
} else {
echo json_encode([ 'success' => false, 'error' => 'Failed to prepare delete statement' ]);
exit();
}
} else {
echo json_encode([ 'success' => false, 'error' => 'Failed to prepare insert statement' ]);
exit();
}

}

// Close the connection
$conn->close();
?>

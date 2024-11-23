<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Read the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$required_fields = ['user_id', 'product_id', 'variation_id', 'discount_price', 'quantity'];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(['success' => false, 'error' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize and validate input
$user_id = filter_var($data['user_id'], FILTER_VALIDATE_INT);
$product_id = filter_var($data['product_id'], FILTER_VALIDATE_INT);
$variation_id = filter_var($data['variation_id'], FILTER_VALIDATE_INT);
$discount_price = filter_var($data['discount_price'], FILTER_VALIDATE_FLOAT);
$quantity = filter_var($data['quantity'], FILTER_VALIDATE_INT);

if ($user_id === false || $product_id === false || $variation_id === false || $discount_price === false || $quantity === false) {
    echo json_encode(['success' => false, 'error' => 'Invalid data types provided']);
    exit();
}

$added_at = date('Y-m-d H:i:s');

// Check if the item already exists in the basket
$sql_check = "SELECT basket_item_id, quantity FROM basket_items WHERE user_id = ? AND product_id = ? AND variation_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("iii", $user_id, $product_id, $variation_id);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows > 0) {
    // If item exists, update quantity
    $row = $result->fetch_assoc();
    $new_quantity = $row['quantity'] + $quantity;

    $sql_update = "UPDATE basket_items SET quantity = ?, added_at = ? WHERE basket_item_id = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("isi", $new_quantity, $added_at, $row['basket_item_id']);
    
    if ($stmt_update->execute()) {
        echo json_encode(['success' => true, 'message' => 'Basket item quantity updated']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to update quantity']);
    }
} else {
    // If item doesn't exist, insert new item
    $sql_insert = "INSERT INTO basket_items (user_id, product_id, variation_id, discount_price, quantity, added_at) 
                   VALUES (?, ?, ?, ?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("iiidss", $user_id, $product_id, $variation_id, $discount_price, $quantity, $added_at);

    if ($stmt_insert->execute()) {
        echo json_encode(['success' => true, 'message' => 'Item added to basket']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to insert item']);
    }
}

// Close statement and connection
$stmt_check->close();
$conn->close();
?>

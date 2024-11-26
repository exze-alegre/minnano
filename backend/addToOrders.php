<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); // Add your React app's URL here
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Check for preflight request (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get raw POST data
$data = file_get_contents("php://input");

// Decode the JSON data
$decodedData = json_decode($data, true);

// Check if decoding was successful
if ($decodedData === null) {
    echo json_encode(["error" => "Invalid JSON data received", "rawData" => $data]);
    exit;
}

// Insert the data into the database
foreach ($decodedData as $item) {
    $user_id = $item['user_id'];
    $basket_item_id = $item['basket_item_id'];
    $price = $item['price'];
    $product_id = $item['product_id'];
    $product_name = $item['product_name'];
    $quantity = $item['quantity'];
    $discount_price = $item['discount_price'];
    $variation_id = $item['variation_id'];
    $variation_name = $item['variation_name'];
    $image = $item['image'];
    $shipping = $item['shipping']; // Shipping fee
    $total_payment = $item['total_payment']; // Total payment after discount and shipping
    $payment_method = $item['payment_method']; // Payment method
    $saved = $item['saved']; // Saved amount
    $added_at = date('Y-m-d H:i:s');

    // Insert query
    $sql = "INSERT INTO orders (
                user_id, basket_item_id, price, product_id, product_name,
                quantity, discount_price, variation_id,
                variation_name, image, shipping, total_payment,
                payment_method, saved, added_at
            ) VALUES (
                '$user_id', '$basket_item_id', '$price', '$product_id', '$product_name',
                '$quantity', '$discount_price', '$variation_id',
                '$variation_name', '$image', '$shipping', '$total_payment',
                '$payment_method', '$saved', '$added_at'
            )";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Order added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

$conn->close();
?>
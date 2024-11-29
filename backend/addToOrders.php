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

// Insert each item into the orders table
foreach ($data['items'] as $item) {
    // SQL query to insert the item into orders table
    $sql = "INSERT INTO orders 
                (user_id, basket_item_id, price, product_id, product_name, quantity, 
                 discount_price, image, variation_id, variation_name, added_at, shipping, 
                 total_payment, payment_method, saved) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)";

    // Prepare the SQL statement for inserting into the orders table
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        // Bind parameters
        $stmt->bind_param("iiddsssissdsss", 
            $data['user_id'], 
            $item['basket_item_id'], 
            $item['price'], 
            $item['product_id'], 
            $item['product_name'], 
            $item['quantity'], 
            $item['discount_price'], 
            $item['image'], 
            $item['variation_id'], 
            $item['variation_name'], 
            $item['shipping'], 
            $item['total_payment'], 
            $item['payment_method'], 
            $item['saved']
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
            echo json_encode([
                'success' => false,
                'error' => 'Failed to prepare delete statement'
            ]);
            exit();
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to prepare insert statement'
        ]);
        exit();
    }
}

echo json_encode([
    'success' => true,
    'message' => 'Order placed successfully and items removed from basket.'
]);



echo json_encode([
    'success' => true,
    'message' => 'Order placed successfully'
]);

?>

<?php
// Allow requests from the frontend origin
header("Access-Control-Allow-Origin: http://localhost:3000");  // Change this to * to allow all origins (less secure)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);  // Exit early for OPTIONS request
}

// Include database connection (your db.php file)
include('db.php');

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the item_id from query string
    $item_id = isset($_GET['item_id']) ? $_GET['item_id'] : null;
    
    if ($item_id) {
        // Use the database connection from db.php (assumes $conn is defined in db.php)
        global $conn;  // Ensure $conn is available from db.php

        // Prepare and execute delete query
        $query = "DELETE FROM basket_items WHERE basket_item_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $item_id);

        // Execute and check success
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete item"]);
        }

        // Close the connection
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Item ID is required"]);
    }
}
?>

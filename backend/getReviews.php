<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection settings
$servername = "localhost";  // Your database server
$username = "root";         // Your database username
$password = "";             // Your database password
$dbname = "minnano";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the product ID from the GET request
if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

    // Query to get the reviews for a specific product
    $sql = "SELECT review_id, product_id, username, review_text, rating, added_at 
            FROM reviews 
            WHERE product_id = ?";

    // Prepare and bind the query
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $product_id);  // "i" indicates an integer parameter

        // Execute the query
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if any reviews are found
        if ($result->num_rows > 0) {
            // Fetch the reviews and store them in an array
            $reviews = [];
            while ($row = $result->fetch_assoc()) {
                $reviews[] = $row;
            }

            // Set the content type to JSON
            header('Content-Type: application/json');

            // Return the reviews as JSON
            echo json_encode($reviews);
        } else {
            // If no reviews are found, return an empty array
            echo json_encode([]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        // If there's an error preparing the statement
        echo json_encode(['error' => 'Failed to prepare the query']);
    }
} else {
    // If no product ID is passed
    echo json_encode(['error' => 'Product ID is required']);
}

// Close the database connection
$conn->close();
?>

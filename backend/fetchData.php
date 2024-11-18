<?php
header("Access-Control-Allow-Origin: *");  // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Adjust the methods as needed
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow specific headers if necessary

// Database connection
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

// Fetch product data
$sql = "SELECT id, name, description, discountPrice, price, image, rating FROM products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    // Fetch all products and add to an array
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Set the header to specify JSON format and send the data as JSON
header('Content-Type: application/json');
echo json_encode($products);

// Close the connection
$conn->close();
?>

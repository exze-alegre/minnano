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

// Get search query from the request (if present)
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';

// Modify SQL query based on search query
if ($searchQuery) {
    // If a search query is provided, filter products based on the name or description
    $sql = "SELECT id, name, description, discountPrice, price, image, rating FROM products WHERE name LIKE ? OR description LIKE ?";
    $stmt = $conn->prepare($sql);
    $searchTerm = "%" . $searchQuery . "%";  // Add wildcard for partial matching
    $stmt->bind_param("ss", $searchTerm, $searchTerm);
} else {
    // If no search query, fetch all products
    $sql = "SELECT id, name, description, discountPrice, price, image, rating FROM products";
    $stmt = $conn->prepare($sql);
}

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

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
$stmt->close();
$conn->close();
?>
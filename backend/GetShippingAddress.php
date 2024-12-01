<?php
// Start the session
session_start();

// Allow CORS for the frontend
header('Access-Control-Allow-Origin: http://localhost:3000');  // Replace with actual frontend URL
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if the session is valid
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'error' => 'No user ID found in session.'
    ]);
    exit;
}

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch the user ID from the session
$user_id = $_SESSION['user_id'];

if ($user_id) {
    // Prepare the SQL query to fetch data for the specific user
    $query = "SELECT shipping_address_id, full_name, address, contact_number FROM shipping_addresses WHERE user_id = ?";

    // Prepare the statement to prevent SQL injection
    if ($stmt = $conn->prepare($query)) {
        // Bind the user_id parameter to the query
        $stmt->bind_param("i", $user_id);

        // Execute the statement
        $stmt->execute();

        // Get the result of the query
        $result = $stmt->get_result();

        // Check if any rows were returned
        if ($result->num_rows > 0) {
            // Fetch all the rows as an associative array
            $shippingAddresses = $result->fetch_all(MYSQLI_ASSOC);

            // Return the data as JSON
            echo json_encode($shippingAddresses);
        } else {
            // No records found for the given user_id
            echo json_encode([]);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Query preparation failed
        http_response_code(500);
        echo json_encode(["error" => "Unable to prepare SQL statement"]);
    }
} else {
    // If 'user_id' is not passed
    http_response_code(400);
    echo json_encode(["error" => "'user_id' parameter is required"]);
}

// Close the database connection
$conn->close();
?>

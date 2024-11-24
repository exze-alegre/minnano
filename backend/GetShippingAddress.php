<?php
// Allow CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

$user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

if ($user_id) {
    // Prepare the SQL query to fetch data for the specific user
    $query = "SELECT * FROM shipping_addresses WHERE user_id = ?";

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

<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");  // Allow the frontend origin
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");  // Allow credentials (cookies)

// Start the session
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Get the JSON data from the body of the request
$data = json_decode(file_get_contents('php://input'), true);

// Check if data exists and retrieve email and password
if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // Bind only the email to prevent SQL injection
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        error_log('User data: ' . print_r($user, true));  // Log user data to check
    
        if (isset($user['user_id'])) {
            if ($password === $user['password']) {
                // Store user data in session
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['username'] = $user['username']; // Add this line
    
                // Response including user_id, username, and password
                $response = [
                    "status" => "success", 
                    "message" => "Login successful", 
                    "session_id" => session_id(),
                    "user_id" => $user['user_id'],   // Add user_id to response
                    "username" => $user['username'], // Add username to response
                    "password" => $user['password']  // Add password to response (for debugging)
                ];
            } else {
                $response = ["status" => "error", "message" => "Invalid email or password"];
            }
        } else {
            $response = ["status" => "error", "message" => "'user_id' key missing in user data"];
        }
    } else {
        $response = ["status" => "error", "message" => "Invalid email or password"];
    }

    $stmt->close();
} else {
    $response = ["status" => "error", "message" => "Email or password not provided"];
}

echo json_encode($response);

$conn->close();

?>

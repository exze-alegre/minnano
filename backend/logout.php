<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");  // Allow the frontend origin
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");  // Allow credentials (cookies)

// Start the session
session_start();

// Destroy all session data to log the user out
session_unset();
session_destroy();

// Also, delete the session cookie if it's still active
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 42000, '/');  // Expire the session cookie
}

$response = [
    "status" => "success",
    "message" => "Logout successful"
];

echo json_encode($response);
?>

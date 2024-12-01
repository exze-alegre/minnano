<?php
header("Access-Control-Allow-Origin: http://localhost:3000");  // Frontend origin
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");  // Allow cookies

session_start();

// Debugging: Check if the session is initialized
error_log("Session Data: " . print_r($_SESSION, true));  // Log session data for debugging

if (isset($_SESSION['user_id'])) {
  echo json_encode([
    'status' => 'success',
    'user' => [
      'user_id' => $_SESSION['user_id'],
      'email' => $_SESSION['email']
    ]
  ]);
} else {
  echo json_encode([
    'status' => 'error',
    'message' => 'User not logged in',
    'session_data' => $_SESSION // Return session data for debugging
  ]);
}
?>

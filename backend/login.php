<?php
session_start();

// Check if the user is already logged in
if (!isset($_SESSION['user_id'])) {
    // Default login as user with user_id = 1 (you can replace this as per your requirement)
    $_SESSION['user_id'] = 1;  // User 1 is logged in
    $_SESSION['username'] = 'Kairu';  // Default username (you can adjust accordingly)
    $_SESSION['email'] = 'projectemail@mail.com';  // Default email (you can adjust accordingly)

    // You can also add other session data if needed (e.g., user role, etc.)
    echo json_encode([
        'loggedIn' => true,
        'user' => [
            'user_id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'email' => $_SESSION['email']
        ]
    ]);
} else {
    // User is already logged in
    echo json_encode([
        'loggedIn' => true,
        'user' => [
            'user_id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'email' => $_SESSION['email']
        ]
    ]);
}
?>

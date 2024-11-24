<?php
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

// Query to get all active vouchers
$sql = "SELECT * FROM vouchers WHERE active = 1";
$result = $conn->query($sql);

// Prepare the output
$vouchers = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $vouchers[] = $row;
    }
}

// Output vouchers as JSON
echo json_encode($vouchers);
?>

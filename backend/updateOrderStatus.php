<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('db.php');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['orderGroupId']) && isset($_POST['newStatus'])) {
        $orderGroupId = $_POST['orderGroupId'];
        $newStatus = $_POST['newStatus'];

        $query = "UPDATE orders SET status_id = ? WHERE order_group_id = ?";

        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("si", $newStatus, $orderGroupId);

            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false]);
        }
    } else {
        echo json_encode(["success" => false]);
    }
}

$conn->close();
?>

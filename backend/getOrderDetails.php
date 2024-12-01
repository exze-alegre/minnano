<?php
session_start();

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'error' => 'No user ID found in session.'
    ]);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

$user_id = $_SESSION['user_id'];
$orderGroupId = $_GET['orderGroupId'];

$sql = "
    SELECT o.order_id, o.product_name, o.quantity, o.discount_price, o.price, o.image, o.status_id, 
           sa.full_name, sa.address, sa.contact_number
    FROM orders o
    JOIN shipping_addresses sa ON o.shipping_address_id = sa.shipping_address_id
    WHERE o.user_id = ? AND o.order_group_id = ?
";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die(json_encode(['success' => false, 'error' => 'Error preparing the SQL query.']));
}

$stmt->bind_param("ii", $user_id, $orderGroupId);
$stmt->execute();

if ($stmt->errno) {
    die(json_encode(['success' => false, 'error' => 'Query execution failed: ' . $stmt->error]));
}

$result = $stmt->get_result();
$orders = $result->fetch_all(MYSQLI_ASSOC);

if (empty($orders)) {
    echo json_encode(['success' => false, 'error' => 'No order found for this group.']);
    exit;
}

$output = [
    'success' => true,
    'data' => [
        'orderGroupId' => $orderGroupId,
        'shippingAddress' => $orders[0]['address'],
        'shippingContact' => $orders[0]['contact_number'],
        'fullName' => $orders[0]['full_name'], // Include full name here
        'items' => $orders,
    ]
];

echo json_encode($output);
?>

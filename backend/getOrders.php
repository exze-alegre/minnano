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

$sql = "
    SELECT o.order_id, o.user_id, o.shipping_address_id, o.basket_item_id, o.price, o.product_id, o.product_name, o.quantity, 
           o.discount_price, o.image, o.variation_id, o.variation_name, o.added_at, 
           o.shipping, o.total_payment, o.payment_method, o.saved, o.order_group_id, o.status_id
    FROM orders o
    WHERE o.user_id = ?
";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die(json_encode(['success' => false, 'error' => 'Error preparing the SQL query.'])); 
}

$stmt->bind_param("i", $user_id);
$stmt->execute();

if ($stmt->errno) {
    die(json_encode(['success' => false, 'error' => 'Query execution failed: ' . $stmt->error]));
}

$result = $stmt->get_result();
$orders = $result->fetch_all(MYSQLI_ASSOC);

if (empty($orders)) {
    echo json_encode(['success' => false, 'error' => 'No orders found for this user.']);
    exit;
}

$output = [];

foreach ($orders as $order) {
    $variation_sql = "
        SELECT v.variations_id AS variation_id, v.variation_name, v.discount_price, v.image
        FROM variations v
        WHERE v.product_id = ?
    ";

    $variation_stmt = $conn->prepare($variation_sql);
    $variation_stmt->bind_param("i", $order['product_id']);
    $variation_stmt->execute();
    $variation_result = $variation_stmt->get_result();
    $variations = $variation_result->fetch_all(MYSQLI_ASSOC);

    $output[] = [
        'order_id' => $order['order_id'],
        'user_id' => $order['user_id'],
        'shipping_address_id' => $order['shipping_address_id'],
        'basket_item_id' => $order['basket_item_id'],
        'price' => $order['price'],
        'product_id' => $order['product_id'],
        'product_name' => $order['product_name'],
        'quantity' => $order['quantity'],
        'discount_price' => $order['discount_price'],
        'image' => $order['image'],
        'variation_id' => $order['variation_id'],
        'variation_name' => $order['variation_name'],
        'added_at' => $order['added_at'],
        'shipping' => $order['shipping'],
        'total_payment' => $order['total_payment'],
        'payment_method' => $order['payment_method'],
        'saved' => $order['saved'],
        'order_group_id' => $order['order_group_id'],
        'status_id' => $order['status_id'],
        'variations' => $variations
    ];
}

echo json_encode(['success' => true, 'data' => $output]);

$stmt->close();
$variation_stmt->close();
$conn->close();
?>

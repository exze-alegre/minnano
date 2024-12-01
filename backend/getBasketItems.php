<?php
// Start the session
session_start();

// Allow CORS for the frontend (replace with your actual frontend URL)
header('Access-Control-Allow-Origin: http://localhost:3000');  // Specify the frontend URL, not *
header('Access-Control-Allow-Credentials: true');  // Allow credentials (cookies) to be sent

// Allow specific methods (if necessary)
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

// Allow headers (if necessary)
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle OPTIONS preflight request (if any)
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

// SQL query to fetch basket items with product details
$sql = "
    SELECT bi.basket_item_id, bi.user_id, bi.product_id, bi.variation_id, bi.discount_price, bi.quantity, bi.added_at,
           p.name AS product_name, p.description, p.price, p.discountPrice AS product_discount_price, p.rating, p.image1, p.image2, p.image3
    FROM basket_items bi
    JOIN products p ON p.id = bi.product_id
    WHERE bi.user_id = ?
";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die(json_encode(['success' => false, 'error' => 'Error preparing the SQL query.'])); 
}

$stmt->bind_param("i", $user_id);

// Execute the query
$stmt->execute();

// Check for errors in query execution
if ($stmt->errno) {
    die(json_encode(['success' => false, 'error' => 'Query execution failed: ' . $stmt->error]));
}

// Fetch all results
$result = $stmt->get_result();
$items = $result->fetch_all(MYSQLI_ASSOC);

// Check if any items were returned
if (empty($items)) {
    die(json_encode(['success' => false, 'error' => 'No basket items found for this user.']));
}

// Initialize the output array
$output = [];

// Loop through all the basket items
foreach ($items as $item) {
    // SQL query to fetch variations for the product
    $variation_sql = "
        SELECT v.variations_id AS variation_id, v.variation_name, v.discount_price, v.image
        FROM variations v
        WHERE v.product_id = ?
    ";

    $variation_stmt = $conn->prepare($variation_sql);
    $variation_stmt->bind_param("i", $item['product_id']);
    $variation_stmt->execute();
    $variation_result = $variation_stmt->get_result();
    $variations = $variation_result->fetch_all(MYSQLI_ASSOC);

    // Find the selected variation based on basket item variation_id
    $selected_variation = null;
    foreach ($variations as $variation) {
        if ($variation['variation_id'] == $item['variation_id']) {
            $selected_variation = $variation;
            break;
        }
    }

    // Prepare the output array with necessary product and variation data
    $output[] = [
        'basket_item_id' => $item['basket_item_id'],
        'user_id' => $item['user_id'],
        'product_id' => $item['product_id'],
        'variation_id' => $item['variation_id'],
        'discount_price' => $item['discount_price'],
        'quantity' => $item['quantity'],
        'added_at' => $item['added_at'],
        'product_name' => $item['product_name'],
        'description' => $item['description'],
        'price' => $item['price'],
        'product_discount_price' => $item['product_discount_price'],
        'rating' => $item['rating'],
        'image1' => $item['image1'],
        'image2' => $item['image2'],
        'image3' => $item['image3'],
        'selected_variation' => $selected_variation ? [
            'variation_id' => $selected_variation['variation_id'],
            'variation_name' => $selected_variation['variation_name'],
            'discount_price' => $selected_variation['discount_price'],
            'image' => $selected_variation['image']
        ] : null,
        'variations' => $variations  // All variations for the product
    ];
}

// Return the data as JSON
echo json_encode(['success' => true, 'data' => $output]);

// Clean up
$stmt->close();
$variation_stmt->close();
$conn->close();
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
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

// Debugging: check if user_id is set
if ($user_id == 0) {
    die(json_encode(['success' => false, 'error' => 'No user_id parameter provided.']));
}

// SQL query to fetch basket items with related product and variation details
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

// Check for errors in the execution
if ($stmt->errno) {
    die(json_encode(['success' => false, 'error' => 'Query execution failed: ' . $stmt->error]));
}

// Get the result and fetch all data
$result = $stmt->get_result();
$items = $result->fetch_all(MYSQLI_ASSOC);

// Check if items are returned
if (empty($items)) {
    die(json_encode(['success' => false, 'error' => 'No basket items found for this user.']));
}

// Structure the output in the desired format
$output = [];
foreach ($items as $item) {
    // For each basket item, get all variations of the product
    $variation_sql = "
        SELECT v.variations_id AS variation_id, v.variation_name, v.discount_price, v.image
        FROM variations v
        WHERE v.product_id = ?";

    $variation_stmt = $conn->prepare($variation_sql);
    $variation_stmt->bind_param("i", $item['product_id']);
    $variation_stmt->execute();
    $variation_result = $variation_stmt->get_result();
    $variations = $variation_result->fetch_all(MYSQLI_ASSOC);

    // Find the selected variation based on basket_item's variation_id
    $selected_variation = null;
    foreach ($variations as $variation) {
        if ($variation['variation_id'] == $item['variation_id']) {
            $selected_variation = $variation;
            break;
        }
    }

    // Prepare the item data with selected variation and available variations
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
        'selected_variation' => [
            'variation_id' => $selected_variation['variation_id'],
            'variation_name' => $selected_variation['variation_name'],
            'discount_price' => $selected_variation['discount_price'],
            'image' => $selected_variation['image'],
        ],
        'variations' => $variations
    ];
}

// Return the data as JSON
echo json_encode($output);

// Clean up
$stmt->close();
$conn->close();
?>

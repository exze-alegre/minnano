<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minnano";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to get product details and variations
function getProductDetails($conn, $searchQuery, $includeTags, $includeUserData, $includeBasketData) {
    // Split search query into multiple keywords
    $keywords = explode(' ', $searchQuery);

    // Build dynamic WHERE clause for multiple keywords
    $whereClause = [];
    foreach ($keywords as $keyword) {
        $whereClause[] = "(LOWER(p.name) LIKE LOWER(?) OR LOWER(p.description) LIKE LOWER(?) OR LOWER(t.name) LIKE LOWER(?))";
    }
    $whereClauseStr = implode(' OR ', $whereClause);

    // Get products based on search query
    $sql = "SELECT DISTINCT p.id, p.name, p.description, p.discountPrice, p.price, p.image1, p.image2, p.image3, p.image4, p.image5, p.rating 
            FROM products p
            LEFT JOIN product_tags pt ON pt.product_id = p.id
            LEFT JOIN tags t ON t.id = pt.tag_id
            WHERE $whereClauseStr";

    $stmt = $conn->prepare($sql);

    // Bind parameters dynamically
    $paramTypes = str_repeat('s', count($keywords) * 3); // 3 placeholders per keyword
    $paramValues = [];
    foreach ($keywords as $keyword) {
        $searchTerm = "%" . $keyword . "%";
        $paramValues[] = $searchTerm;
        $paramValues[] = $searchTerm;
        $paramValues[] = $searchTerm;
    }
    $stmt->bind_param($paramTypes, ...$paramValues);

    $stmt->execute();
    $result = $stmt->get_result();
    $products = [];

    // Fetch product details
    while ($product = $result->fetch_assoc()) {
        $product_data = [
            "id" => $product['id'],
            "name" => $product['name'],
            "description" => $product['description'],
            "price" => $product['price'],
            "discountPrice" => $product['discountPrice'],
            "rating" => $product['rating'],
            "image1" => $product['image1'],
            "image2" => $product['image2'],
            "image3" => $product['image3'],
            "image4" => $product['image4'],
            "image5" => $product['image5'],
            "variations" => []
        ];

        // Get variations for each product
        $variations_query = "SELECT * FROM variations WHERE product_id = " . $product['id'];
        $variations_result = $conn->query($variations_query);

        // Fetch variation details
        while ($variation = $variations_result->fetch_assoc()) {
            $product_data['variations'][] = [
                "variation_id" => $variation['variations_id'],
                "variation_name" => $variation['variation_name'],
                "discount_price" => $variation['discount_price'],
                "image" => $variation['image_url']  // Updated column name here
            ];
        }

        // Get product tags if requested
        if ($includeTags) {
            $tagsSql = "SELECT t.name FROM tags t
                        JOIN product_tags pt ON pt.tag_id = t.id
                        WHERE pt.product_id = ?";
            $tagsStmt = $conn->prepare($tagsSql);
            $tagsStmt->bind_param("i", $product['id']);
            $tagsStmt->execute();
            $tagsResult = $tagsStmt->get_result();
            $product_data['tags'] = $tagsResult->fetch_all(MYSQLI_ASSOC);
            $tagsStmt->close();
        }

        // Include user data if requested
        if ($includeUserData) {
            $userSql = "SELECT id, username, email FROM users";
            $userResult = $conn->query($userSql);
            $product_data['users'] = $userResult->fetch_all(MYSQLI_ASSOC);
        }

        // Include basket data if requested
        if ($includeBasketData) {
            $basketSql = "SELECT bi.id, bi.product_id, bi.user_id, bi.quantity 
                          FROM basket_items bi
                          WHERE bi.product_id = ?";
            $basketStmt = $conn->prepare($basketSql);
            $basketStmt->bind_param("i", $product['id']);
            $basketStmt->execute();
            $basketResult = $basketStmt->get_result();
            $product_data['basket'] = $basketResult->fetch_all(MYSQLI_ASSOC);
            $basketStmt->close();
        }

        $products[] = $product_data;
    }

    return $products;
}

// Retrieve query parameters
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';
$includeTags = isset($_GET['tags']) ? true : false;
$includeUserData = isset($_GET['users']) ? true : false;
$includeBasketData = isset($_GET['basket']) ? true : false;

// Get the formatted products with variations
$formatted_products = getProductDetails($conn, $searchQuery, $includeTags, $includeUserData, $includeBasketData);

// Set the content type to JSON
header('Content-Type: application/json');

// Output the results as JSON
echo json_encode($formatted_products);

// Close connection
$conn->close();
?>

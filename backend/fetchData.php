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

$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';
$includeTags = isset($_GET['tags']) ? true : false;
$includeVariations = isset($_GET['variations']) ? true : false;

if ($searchQuery) {
    // Split search query into multiple keywords
    $keywords = explode(' ', $searchQuery);

    // Build dynamic WHERE clause for multiple keywords
    $whereClause = [];
    foreach ($keywords as $keyword) {
        $whereClause[] = "(LOWER(p.name) LIKE LOWER(?) OR LOWER(p.description) LIKE LOWER(?) OR LOWER(t.name) LIKE LOWER(?))";
    }
    $whereClauseStr = implode(' OR ', $whereClause);

    $sql = "SELECT DISTINCT p.id, p.name, p.description, p.discountPrice, p.price, p.image, p.rating 
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
} else {
    $sql = "SELECT id, name, description, discountPrice, price, image, rating FROM products";
    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result();
$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productId = $row['id'];

        if ($includeTags) {
            $tagsSql = "SELECT t.name FROM tags t
                        JOIN product_tags pt ON pt.tag_id = t.id
                        WHERE pt.product_id = ?";
            $tagsStmt = $conn->prepare($tagsSql);
            $tagsStmt->bind_param("i", $productId);
            $tagsStmt->execute();
            $tagsResult = $tagsStmt->get_result();
            $row['tags'] = $tagsResult->fetch_all(MYSQLI_ASSOC);
            $tagsStmt->close();
        }

        if ($includeVariations) {
            $variationsSql = "SELECT v.id, v.name, v.price, v.discount_price, v.image 
                              FROM variations v WHERE v.product_id = ?";
            $variationsStmt = $conn->prepare($variationsSql);
            $variationsStmt->bind_param("i", $productId);
            $variationsStmt->execute();
            $variationsResult = $variationsStmt->get_result();
            $row['variations'] = $variationsResult->fetch_all(MYSQLI_ASSOC);
            $variationsStmt->close();
        }

        $products[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($products);

$stmt->close();
$conn->close();

?>

<?php
// Include the database connection
include('db.php');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data (JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if the data is not empty
    if (!empty($data)) {
        // Echo the data received (for debugging purposes)
        echo json_encode([
            "status" => "success",
            "received_data" => $data
        ]);
        
        // Extract data from the POST request
        $basket_item_id = $data['basket_item_id'];
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];
        $product_name = $data['product_name'];
        $quantity = $data['quantity'];
        $price = $data['price'];
        $discount_price = $data['discount_price'];
        $variation_id = $data['variation_id'];
        $variation_name = $data['variation_name'];
        $image = $data['image'];
        $added_at = $data['added_at'];

        // Prepare SQL to insert data into the checkout table
        $sql = "INSERT INTO `checkout` (`basket_item_id`, `user_id`, `product_id`, `product_name`, `quantity`, `price`, `discount_price`, `variation_id`, `variation_name`, `image`, `added_at`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepare the statement
        if ($stmt = $conn->prepare($sql)) {
            // Bind parameters
            $stmt->bind_param("iiissdssdss", 
                $basket_item_id, 
                $user_id, 
                $product_id, 
                $product_name, 
                $quantity, 
                $price, 
                $discount_price, 
                $variation_id, 
                $variation_name, 
                $image, 
                $added_at
            );

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to insert data"]);
            }

            // Close the statement
            $stmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to prepare statement"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid or missing data"]);
    }
}

// Close the database connection
$conn->close();
?>

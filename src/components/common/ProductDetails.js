import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Stars from "./Stars";
import ShippingInfo from "./ShippingInfo";
import CustomDropdown from "./CustomDropdown";
import Notifications from "../common/Notification"; // Import Notifications component
import "../../styles/ProductDetails.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = ({ product, selectedVariation, onVariationSelect }) => {
  const [quantity, setQuantity] = useState(1);
  const [showVariationError, setShowVariationError] = useState(false); // To manage the error message visibility
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [userId, setUserId] = useState(null); // State to store user_id from session
  const variationDropdownRef = useRef(null); // Ref for the dropdown
  const rating = Math.round(product?.rating || 0); // Safe access to product rating
  const [item, setItem] = useState(null);
  // Fetch user ID when component mounts
  useEffect(() => {
    fetch("http://localhost/minnano/backend/getUserIdFromSession.php", {
      method: "GET",
      credentials: "include", // Make sure cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response to inspect the session and user data
        if (data.status === "success") {
          setUserId(data.user.user_id); // Set user_id in state
        } else {
          alert(data.message || "Failed to retrieve user ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
        alert("An error occurred while fetching the user ID.");
      });
  }, []);

  useEffect(() => {
    if (selectedVariation) {
      setQuantity(1); // Reset quantity when variation is selected
      setShowVariationError(false); // Hide the error when a variation is selected
    }
  }, [selectedVariation]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToBasket = () => {
    if (!selectedVariation) {
      setShowVariationError(true); // Show the error message
      if (variationDropdownRef.current) {
        variationDropdownRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the dropdown
      }
      return;
    }

    if (!product) {
      alert("Product is not available.");
      return;
    }

    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    // Set the item data to trigger the useEffect
    setItem({
      user_id: userId, // Use user_id from session
      product_id: product.id,
      variation_id: selectedVariation?.variation_id || null,
      discount_price:
        selectedVariation?.discount_price || product.discountPrice,
      quantity,
    });
  };

  useEffect(() => {
    if (!item) return; // Don't run the effect if item is null

    // Fetch request to backend when the `item` changes
    fetch("http://localhost/minnano/backend/addToBasket.php", {
      method: "POST", // Use POST for sending data
      credentials: "include", // Make sure cookies are sent with the request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item), // Send the item object as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response to inspect the session and user data
        if (data.success) {
          // Add notification for successful addition to cart
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id: Date.now(), message: "Item added to basket!" },
          ]);
        } else {
          alert(data.error || "An error occurred while adding the item.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the item to the basket.");
      });
  }, [item]); // Dependency array will run when `item` change

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 1)) {
      setQuantity(value === "" ? "" : Number(value));
    }
  };

  return (
    <Container className="product-details-container">
      <Row className="justify-content-center">
        <Col>
          <h1>{product?.name || "Product Name"}</h1>
          <div className="price-container">
            <h2 className="discount">
              ₱
              {selectedVariation
                ? selectedVariation.discount_price
                : product?.discountPrice || 0}
            </h2>
            <h2 className="price">
              <s>₱{product?.price || 0}</s>
            </h2>
          </div>
          <div className="stars-rating-container">
            <span className="rating-text">{product?.rating}</span>
            <Stars rating={rating} />
            <span className="sold-text">{product?.sold} sold</span>
          </div>

          <div ref={variationDropdownRef}>
            <CustomDropdown
              title={
                selectedVariation
                  ? selectedVariation.variation_name
                  : "Select A Variation"
              }
              items={product?.variations || []}
              onSelect={onVariationSelect}
              className="custom-dropdown"
            />
          </div>

          {showVariationError && (
            <div className="error-message mt-1" style={{ color: "red" }}>
              *Please select a variation.
            </div>
          )}

          <div className="quantity-container d-flex justify-content-between align-items-center mt-3">
            <Button
              onClick={decreaseQuantity}
              className="quantity-button w-25"
              variant="light"
            >
              -
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <Button
              onClick={increaseQuantity}
              className="quantity-button w-25"
              variant="light"
            >
              +
            </Button>
          </div>

          <Button
            variant="danger"
            onClick={handleAddToBasket}
            className="add-to-basket-button mt-3"
          >
            Add to Basket
          </Button>

          <ShippingInfo />

          {/* Add the Notifications component here */}
          <Notifications notifications={notifications} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

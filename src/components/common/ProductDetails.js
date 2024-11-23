import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Stars from "./Stars";
import ShippingInfo from "./ShippingInfo";
import CustomDropdown from "./CustomDropdown";
import Notifications from "../common/Notification"; // Import Notifications component
import "../../styles/ProductDetails.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = ({
  product,
  addToBasket,
  selectedVariation,
  onVariationSelect,
  basketItems,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showVariationError, setShowVariationError] = useState(false); // To manage the error message visibility
  const [notifications, setNotifications] = useState([]); // State for notifications
  const variationDropdownRef = useRef(null); // Ref for the dropdown
  const rating = Math.round(product?.rating || 0); // Safe access to product rating

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

    const item = {
      user_id: 1, // Ensure this is correct, it can be dynamically set if needed
      product_id: product.id,
      variation_id: selectedVariation?.variation_id || null,
      discount_price:
        selectedVariation?.discount_price || product.discountPrice,
      quantity,
    };

    console.log("Sending item to backend:", item); // Debugging line

    // Send data to backend API
    fetch("http://localhost/minnano/backend/addToBasket.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("Failed to add item:", data.error);
          alert(data.error || "Failed to add item to basket.");
        } else {
          // Add notification for successful addition to cart
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id: Date.now(), message: "Item added to basket!" },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the item to the basket.");
      });
  };

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

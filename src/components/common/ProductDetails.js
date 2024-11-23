import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Stars from "./Stars";
import ShippingInfo from "./ShippingInfo";
import CustomDropdown from "./CustomDropdown";
import "../../styles/ProductDetails.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = ({
  product,
  addToCart,
  selectedVariation,
  onVariationSelect,
}) => {
  const [quantity, setQuantity] = useState(1);
  const rating = Math.round(product?.rating || 0);  // Safe access to product rating

  useEffect(() => {
    if (selectedVariation) {
      setQuantity(1); // Reset quantity when variation is selected
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

  const handleAddToCart = () => {
    if (!product) return; // Make sure product exists

    const item = {
      id: product.id,
      name: product.name,
      price: selectedVariation
        ? selectedVariation.discount_price
        : product.discountPrice,
      quantity,
    };

    // If addToCart is passed as a function, use it
    if (typeof addToCart === "function") {
      addToCart(item);
    } else {
      console.error('addToCart function is not passed correctly');
      // Optionally: alert the user that addToCart is missing
    }

    // Optionally, update localStorage directly (if needed)
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(item);
    localStorage.setItem('cart', JSON.stringify(currentCart));
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
            <span className="rating-text">{rating}</span>
            <Stars rating={rating} />
          </div>

          <CustomDropdown
            title={
              selectedVariation
                ? selectedVariation.variation_name
                : "Select A Variation"
            }
            items={product?.variations || []}
            onSelect={onVariationSelect}
          />

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

          <Button onClick={handleAddToCart} className="add-to-cart-button mt-3">
            Add to Cart
          </Button>

          <ShippingInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

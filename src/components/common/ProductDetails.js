import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import Stars from "./Stars";
import ShippingInfo from "./ShippingInfo";
import "../../styles/ProductDetails.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null); // No variation selected initially
  const [selectedCountry, setSelectedCountry] = useState("");
  const rating = Math.round(product.rating);

  useEffect(() => {
    // Ensure no variation is selected and default data is rendered
    setSelectedVariation(null); // No variation selected initially
  }, [product]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: selectedVariation
        ? selectedVariation.discount_price
        : product.discountPrice, // Use the default product price if no variation is selected
      quantity,
    };
    addToCart(item);
  };

  const handleQuantityChange = (event) => {
    let value = event.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 1)) {
      setQuantity(value === "" ? "" : Number(value));
    }
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
  };

  return (
    <Container className="product-details-container">
      <Row className="justify-content-center">
        <Col>
          <h1>{product.name}</h1>
          <div className="price-container">
            <h2 className="discount">
              ₱
              {selectedVariation
                ? selectedVariation.discount_price
                : product.discountPrice}{" "}
              {/* Show default product price if no variation is selected */}
            </h2>
            <h2 className="price">
              <s>₱{product.price}</s>
            </h2>
          </div>
          <div className="stars-rating-container">
            <span className="rating-text">{product.rating}</span>
            <Stars rating={rating} />
          </div>

          {/* Dropdown for variations */}
          <DropdownButton
            id="variations"
            title={
              selectedVariation
                ? selectedVariation.variation_name
                : "Select A Variation" // Default title when no variation is selected
            }
            className="dropdown-toggle mt-3"
            variant="light"
          >
            {product.variations && product.variations.length > 0 ? (
              product.variations.map((variation) => (
                <Dropdown.Item
                  key={variation.id}
                  onClick={() => handleVariationSelect(variation)}
                >
                  {variation.variation_name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No variations available</Dropdown.Item>
            )}
          </DropdownButton>

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

          {/* Replaced Accordion with new component */}
          <ShippingInfo
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

import React, { useState } from "react";
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
  const [selectedCountry, setSelectedCountry] = useState(""); // Country selection state
  const rating = Math.round(product.rating);

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
      price: product.discountPrice,
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

  return (
    <Container className="product-details-container">
      <Row className="justify-content-center">
        <Col>
          <h1>{product.name}</h1>
          <div className="price-container">
            <h2 className="discount">₱{product.discountPrice}</h2>
            <h2 className="price">
              <s>₱{product.price}</s>
            </h2>
          </div>
          <div className="stars-rating-container">
            <span className="rating-text">{product.rating}</span>
            <Stars rating={rating} />
          </div>
          <DropdownButton
            id="variations"
            title="Select A Variation"
            className="dropdown-toggle mt-3"
            variant="light"
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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

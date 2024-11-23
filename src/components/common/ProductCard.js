import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Correct placement of useNavigate
import Stars from "./Stars";
import "../../styles/ProductCard.scss";

const ProductCard = ({ product, size = "medium" }) => {
  const navigate = useNavigate(); // Call useNavigate inside the component

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } }); // Correctly navigate on click
  };

  const rating = Math.round(product.rating);

  // Dynamically assign classes based on the size prop
  const cardClass = size === "large" ? "large-card" : "small-card";
  const imageClass = size === "large" ? "large-img" : "small-img";

  // Access the main product image as image1
  const productImage = product.image1; // Fallback if image1 is missing

  return (
    <div onClick={handleClick} className="text-decoration-none">
      <Card className={`product-card ${cardClass} mx-auto my-3`}>
        <Card.Img variant="top" src={productImage} className={imageClass} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="discount">
            <strong>₱{product.discountPrice}</strong>
          </Card.Text>
          <Card.Text className="price">
            <s>₱{product.price}</s>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="stars-rating-container">
            <span className="rating-text">{product.rating}</span>
            <Stars rating={rating} />
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProductCard;

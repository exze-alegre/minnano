//ProductCard.js

import React from "react";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "../../styles/ProductCard.scss";

const ProductCard = ({ product, size = "medium" }) => {
  const totalStars = 5;
  const rating = Math.round(product.rating);

  // Dynamically assign classes based on the size prop
  const cardClass = size === "large" ? "large-card" : "small-card";
  const imageClass = size === "large" ? "large-img" : "small-img";

  // Generate stars based on the rating
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="filled-star" />
      ) : (
        <FaStar key={i} className="empty-star" />
      )
    );
  }

  return (
    <Card className={`product-card ${cardClass} mx-auto my-3`}>
      <Card.Img variant="top" src={product.image} className={imageClass} />
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
        <div className="star-icons">{stars}</div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { Card } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../../styles/ProductCard.scss";

const ProductCard = ({ product, size = "medium" }) => {
  const totalStars = 5;
  const rating = Math.round(product.rating);

  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="filled-star" />
      ) : (
        <FaRegStar key={i} className="empty-star" />
      )
    );
  }

  // Adjust the image size based on the "size" prop
  const imageClass = size === "large" ? "large-img" : "small-img";

  // Home page
  // <ProductCard product={product} size="small" />
  // Search Page
  // <ProductCard product={product} size="large" />

  return (
    <Card
      style={{ width: "288px" }}
      className="mx-auto my-3 shadow product-card"
    >
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

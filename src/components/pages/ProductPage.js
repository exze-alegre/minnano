import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import ProductImagePreview from "../common/ProductImagePreview";
import ProductDetails from "../common/ProductDetails";
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap grid components
import "../../styles/ProductPage.scss"; // Import SCSS for custom styling

const ProductPage = () => {
  const { state } = useLocation(); // Access the passed state
  const product = state?.product; // Get the product from the state

  if (!product) {
    return <div>No product data available</div>; // Handle case where product data is missing
  }

  return (
    <div>
      <Header />
      <Container className="product-page-container">
        <Row className="product-page-row">
          {/* First Column for Product Image Preview */}
          <Col className="image-column">
            <ProductImagePreview product={product} />
          </Col>

          {/* Second Column for Product Details */}
          <Col className="detail-column">
            <ProductDetails product={product} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;

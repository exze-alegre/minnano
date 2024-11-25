import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import ProductImagePreview from "../common/ProductImagePreview";
import ProductDetails from "../common/ProductDetails";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/ProductPage.scss"; // Import SCSS for custom styling

const ProductPage = () => {
  const { state } = useLocation(); // Access the passed state
  const product = state?.product; // Get the product from the state

  const [selectedVariation, setSelectedVariation] = useState(null); // Manage selected variation

  // Log product and selectedVariation for debugging
  console.log("Product: ", product);
  console.log("Selected Variation: ", selectedVariation);

  // Early return condition
  if (!product) {
    return <div>No product data available</div>; // Handle case where product data is missing
  }

  const handleVariationSelect = (variation) => {
    console.log("Variation selected: ", variation); // Log the selected variation
    setSelectedVariation(variation); // Update selected variation when user selects a new one
  };

  return (
    <div>
 
      <Container className="product-page-container">
        <BackButton />
        <Row className="product-page-row">
          {/* First Column for Product Image Preview */}
          <Col className="image-column">
            <ProductImagePreview
              product={product}
              selectedVariation={selectedVariation} // Pass selected variation to the image preview
            />
          </Col>

          {/* Second Column for Product Details */}
          <Col className="detail-column">
            <ProductDetails
              product={product}
              selectedVariation={selectedVariation} // Pass selected variation to ProductDetails
              onVariationSelect={handleVariationSelect} // Handle variation change
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;

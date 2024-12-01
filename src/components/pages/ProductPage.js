import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import ProductImagePreview from "../common/ProductImagePreview";
import ProductDetails from "../common/ProductDetails";
import Footer from "../common/Footer";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/ProductPage.scss"; // Import SCSS for custom styling

const ProductPage = () => {
  const { state } = useLocation(); // Access the passed state
  const product = state?.product; // Get the product from the state

  const [selectedVariation, setSelectedVariation] = useState(null); // Manage selected variation
  const [reviews, setReviews] = useState([]); // Store reviews
  const [loading, setLoading] = useState(true); // Loading state for reviews
  const [error, setError] = useState(null); // Error state for reviews

  // Log product and selectedVariation for debugging
  console.log("Product: ", product);
  console.log("Selected Variation: ", selectedVariation);

  // Fetch reviews for the product
  useEffect(() => {
    if (!product) return; // If there's no product, don't fetch reviews

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost/minnano/backend/getReviews.php?product_id=${product.id}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setError("Failed to load reviews.");
        }
      } catch (error) {
        setError("Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product]); // Run when the product changes

  const handleVariationSelect = (variation) => {
    console.log("Variation selected: ", variation); // Log the selected variation
    setSelectedVariation(variation); // Update selected variation when user selects a new one
  };

  if (!product) {
    return <div>No product data available</div>; // Handle case where product data is missing
  }

  return (
    <div>
      <Header />
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

        {/* Reviews Component */}
      </Container>
      <Footer /> {/* Footer is always at the bottom */}
    </div>
  );
};

export default ProductPage;

// components/pages/HomePage.js
import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../styles/Home.scss";
import ProductCarousel from "../common/ProductCarousel";
import { Row, Col } from "react-bootstrap";
import ProductBanner from "../common/ProductBanner"; // Update the import

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/minnano/backend/fetchData.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="home-layout"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures full viewport height
      }}
    >
      <Header />
      <main
        className=""
        style={{
          flex: 1, // Expands to take available space
          padding: "5px",
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        <ProductCarousel />

        <h1 className="ms-5">Featured Products</h1>
        <Row className="product-list-container">
          {products.slice(0, 5).map((product, index) => (
            <Col key={index} md={12} className="mb-5">
              <ProductCard product={product} size="small" />
            </Col>
          ))}
        </Row>
        <ProductBanner />
        <h1 className="ms-5">Check out more from us</h1>
        <Row className="product-list-container">
          {products.slice(6, 16).map((product, index) => (
            <Col key={index} md={12} className="mb-5">
              <ProductCard product={product} size="small" />
            </Col>
          ))}
        </Row>
      </main>
      <Footer /> {/* Footer is always at the bottom */}
    </div>
  );
};

export default Home;
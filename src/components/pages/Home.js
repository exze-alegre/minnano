// components/pages/HomePage.js
import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import Header from "../common/Header";
import "../../styles/Home.scss"; // Assuming you have custom styles for the homepage
import ProductCarousel from "../common/ProductCarousel";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

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
        console.log(data); // Log the data to the console to check it
        setProducts(data); // Assuming you're using useState to store products
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid p-5" style={{ backgroundColor: '#FFF9F9' }}>
  <Header />
  <ProductCarousel />
  <h1>Our Products</h1>
  <Row className="product-list-container">
        {products.slice(0, 5).map((product, index) => (
          <Col key={index} md={5} className="mb-2" > 
            <ProductCard product={product} size="small" />
          </Col>
        ))}
      </Row>
</div>

  );
};

export default Home;
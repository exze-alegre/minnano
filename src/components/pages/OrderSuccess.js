import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import { Container, Row, Col } from "react-bootstrap";
import { IoHappy } from "react-icons/io5"; // Importing the happy icon
import "../../styles/OrderSuccess.scss"; // Custom styles for the component
import { IoArrowBack } from "react-icons/io5"; // Import IoArrowBack icon

const OrderSuccess = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid p-0 m-0">
      <Header />
      <Container>
        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
            <IoArrowBack className="icon" />
          </button>
          <span
            className="button-text"
            onClick={handleGoBack} // Make the text clickable
          >
            Back to Homepage
          </span>
        </div>
      </Container>
      <Container>
        <Row className="justify-content-center pb-4">
          <div className="order-success-message">
            <IoHappy size={50} className="happy-icon mt-5" />
            <h2 className="mt-3 text-secondary">Your order was successful!</h2>
          </div>
        </Row>
        <h4>Continue browsing</h4>
        <Row className="product-list-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size="small" />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default OrderSuccess;

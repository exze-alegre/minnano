// components/pages/HomePage.js
import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import Header from "../common/Header";
import "../../styles/Home.scss"; // Assuming you have custom styles for the homepage

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
    <div className="container-fluid p-0 m-0">
      <Header />
      <h1>Product List</h1>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductCard product={product} size="small" />
        ))}
      </div>
    </div>
  );
};

export default Home;

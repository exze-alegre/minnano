import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from "./components/pages/SearchResult";
import Basket from "./components/pages/Basket";
import Home from "./components/pages/Home";
import ProductPage from "./components/pages/ProductPage";

function App() {
  const [cart, setCart] = useState([]);

  // Initialize cart from localStorage when the app loads
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(currentCart);  // Initialize cart from localStorage
  }, []);

  // Function to add an item to the cart
  const addToCart = (item) => {
    // Add the new item to the cart
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    
    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket cartItems={cart} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/product/:id"
            element={<ProductPage addToCart={addToCart} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

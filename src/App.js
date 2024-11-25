import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from "./components/pages/SearchResult";
import Basket from "./components/pages/Basket";
import Home from "./components/pages/Home";
import ProductPage from "./components/pages/ProductPage";
import Checkout from "./components/pages/Checkout";
import OrderSuccess from "./components/pages/OrderSuccess";
import Login from "./components/pages/Login"; // Import the Login component


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Default to Login */}
          <Route path="/basket" element={<Basket cartItems={cart} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/product/:id"
            element={<ProductPage />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-successful" element={<OrderSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

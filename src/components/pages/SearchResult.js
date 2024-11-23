//SearchResult.js

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import ProductCard from "../common/ProductCard";

const SearchResults = ({ loggedIn, userProfile }) => {
  // Make sure to call useLocation to get the location object
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Fetch search results based on the query
        const response = await fetch(
          `http://localhost/minnano/backend/fetchData.php?query=${encodeURIComponent(
            searchQuery
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    };

    // Fetch results only if there is a query
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]); // Trigger the fetch whenever the searchQuery changes

  return (
    <div className="container-fluid p-0 m-0">
      <Header loggedIn={loggedIn} userProfile={userProfile} />

      <div className="container-fluid p-0 m-0">
        {/* Display the search query in the heading */}
        <p>Search results for "{searchQuery}"</p>
        <div className="product-list-container">
          {/* Display products if available */}
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} size="large" />
            ))
          ) : (
            <p>No products found.</p> // Show a message if no products are found
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

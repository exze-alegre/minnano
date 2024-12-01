import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import ProductCard from "../common/ProductCard";
import BackButton from "../common/BackButton";
import Footer from "../common/Footer";
import "../../styles/SearchResult.scss";

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
    <div className="search-page container-fluid p-0 m-0 ">
      <Header loggedIn={loggedIn} userProfile={userProfile} />
      <BackButton className="back-button" />
      <div className="search-page-container container-fluid">
        <h5>Search results for "{searchQuery}"</h5>
        <div className="product-list-container">
          {/* Display products if available */}
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} size="small" />
            ))
          ) : (
            <p>No products found.</p> // Show a message if no products are found
          )}
        </div>
      </div>
      <Footer /> {/* Footer is always at the bottom */}
    </div>
  );
};

export default SearchResults;

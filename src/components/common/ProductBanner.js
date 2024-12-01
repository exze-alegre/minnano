// components/common/ProductBanner.js
import React from "react";
import "../assets/special_offer.png";

const ProductBanner = () => {
  const bannerImage = require("../assets/special_offer.png");


  return (
    <div
      className="product-banner m-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={bannerImage}
        alt="Promotional Banner"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default ProductBanner;

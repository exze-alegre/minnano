// components/common/ProductBanner.js
import React from "react";

const ProductBanner = () => {
  const bannerImage =
    "https://via.placeholder.com/1240x500/B2BEB5/333333?text=Promotional+Banner";

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

// components/common/ProductCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";

const ProductCarousel = () => {
  const images = [
    require("../assets/special_offer.png"),
    require("../assets/banner1.png"),
    "https://via.placeholder.com/1240x500/899499/333333?text=Image+3",
    "https://via.placeholder.com/1240x500/C0C0C0/333333?text=Image+4",
    "https://via.placeholder.com/1240x500/71797E/333333?text=Image+5",
  ];

  return (
    <Carousel interval={800} className="m-5" controls={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index + 1}`}
            style={{ width: "1240px", height: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;

// components/common/ProductCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";

const ProductCarousel = () => {
  const images = [
    require("../assets/special_offer.png"),
    require("../assets/banner1.png"),
    require("../assets/banner2.png"),
    require("../assets/banner3.png"),
    require("../assets/banner4.png"),
  ];

  return (
    <Carousel interval={1200} className="m-5" >
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

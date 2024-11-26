// components/common/ProductCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";

const ProductCarousel = () => {
  const images = [
    "https://via.placeholder.com/1240x500/ff7f7f/333333?text=Image+1",
    "https://via.placeholder.com/1240x500/7f7fff/333333?text=Image+2",
    "https://via.placeholder.com/1240x500/7fff7f/333333?text=Image+3",
    "https://via.placeholder.com/1240x500/ffff7f/333333?text=Image+4",
    "https://via.placeholder.com/1240x500/ff7fff/333333?text=Image+5",
  ];

  return (
    <Carousel interval={1500} className="m-5" controls={false}>
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

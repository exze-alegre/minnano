import React, { useState, useEffect } from "react";
import "../../styles/ProductImagePreview.scss";

const ProductImagePreview = ({ product, selectedVariation }) => {
  // Collect product images (image1, image2, image3) always visible in thumbnails
  const productImages = [product.image1, product.image2, product.image3];

  // Collect variation images for each variation (if any)
  const variationImages =
    product.variations?.map((variation) => variation.image) || [];

  // Combine product images and variation images (max 5 thumbnails)
  const images = [...productImages, ...variationImages].slice(0, 5); // Ensure there are no more than 5 thumbnails

  // Set the main image, starting with product image1
  const [selectedImage, setSelectedImage] = useState(product.image1);

  useEffect(() => {
    if (selectedVariation && selectedVariation.image) {
      setSelectedImage(selectedVariation.image);
    }
  }, [selectedVariation]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handlePrevImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  if (images.length === 0) {
    return (
      <div className="product-image-preview-wrapper">
        <p>No images available for this product.</p>
      </div>
    );
  }

  return (
    <div className="product-image-preview-wrapper">
      <div className="product-image-preview-container">
        {/* Thumbnails Container */}
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${
                image === selectedImage ? "selected" : ""
              }`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>

        {/* Main Image Container with Navigation Buttons */}
        <div className="main-image-container">
          <button
            className="prev-button"
            onClick={handlePrevImage}
            aria-label="Previous Image"
          >
            &lt;
          </button>
          <img src={selectedImage} alt="Main product" className="main-image" />
          <button
            className="next-button"
            onClick={handleNextImage}
            aria-label="Next Image"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImagePreview;

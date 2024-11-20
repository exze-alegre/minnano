import React, { useState } from "react";
import "../../styles/ProductImagePreview.scss"; // Import your SCSS file for styling

const ProductImagePreview = ({ product }) => {
  // Create an array with all 5 images for the product
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ];

  // Default to the first image, or a placeholder if images are empty
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "https://via.placeholder.com/571x536?text=Main+Image"
  );

  const handleThumbnailClick = (image) => {
    setSelectedImage(image); // Update the main image when a thumbnail is clicked
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
        <div className="thumbnail-container">
          {/* Render thumbnails for all 5 images */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => handleThumbnailClick(image)} // Change the main image on thumbnail click
            />
          ))}
        </div>
        <div className="main-image-container">
          <img src={selectedImage} alt="Main product" className="main-image" />
        </div>
      </div>
    </div>
  );
};

export default ProductImagePreview;

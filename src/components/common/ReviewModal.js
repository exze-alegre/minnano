import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Using Bootstrap for modal styling

const ReviewModal = ({ show, handleClose }) => {
  const [rating, setRating] = useState(0); // Track the selected rating

  // Handle the star click
  const handleStarClick = (index) => {
    setRating(index + 1); // Set the rating based on the clicked star
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              onClick={() => handleStarClick(index)}
              style={{
                cursor: "pointer",
                color: index < rating ? "#FFCD38" : "gray", // Use #f59e0b as the yellow color
                fontSize: "2rem",
                margin: "0 7px",
              }}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="danger"
            onClick={() => {
              handleClose(); // Close the modal after submitting
            }}
          >
            Submit Review
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;

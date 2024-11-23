// BackButton.js
import React from "react";
import { IoArrowBack } from "react-icons/io5"; // Import IoArrowBack icon
import "../../styles/BackButton.scss"; // Import the SCSS file for styles

const BackButton = () => {
  // Function to navigate back in history
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="back-button-container">
      <button className="back-button" onClick={handleGoBack}>
        <IoArrowBack className="icon" />
      </button>
      <span
        className="button-text"
        onClick={handleGoBack} // Make the text clickable
      >
        Back
      </span>
    </div>
  );
};

export default BackButton;

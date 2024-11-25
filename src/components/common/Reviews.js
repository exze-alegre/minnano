// src/components/common/Reviews.js
import React from "react";
import "../../styles/Reviews.scss";

const Reviews = ({ reviews, loading, error }) => {
  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {!loading && reviews.length === 0 && <p>No reviews available.</p>}
      {!loading && reviews.length > 0 && (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.review_id} className="review-item">
              <h5>{review.username}</h5>
              <p>{review.review_text}</p>
              <p>Rating: {review.rating} stars</p>
              <p>
                <small>{new Date(review.added_at).toLocaleDateString()}</small>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;

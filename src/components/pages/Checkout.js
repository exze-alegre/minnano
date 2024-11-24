import React, { useEffect, useState } from "react";
import Header from "../common/Header";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    // Retrieve the checkout items from localStorage
    const storedCheckoutItems = JSON.parse(
      localStorage.getItem("checkoutItems")
    );
    if (storedCheckoutItems) {
      setCheckoutItems(storedCheckoutItems);
    }
  }, []);

  return (
    <div>
      <Header />
      <h2>Checkout Page</h2>
      {checkoutItems.length > 0 ? (
        checkoutItems.map((item) => (
          <div key={item.basket_item_id} style={{ marginBottom: "20px" }}>
            <h3>Product Name: {item.product_name}</h3>
            <p>
              <strong>Price:</strong> ₱{item.price}
            </p>
            <p>
              <strong>Discount Price:</strong> ₱{item.discount_price}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Added At:</strong> {item.added_at}
            </p>
            <p>
              <strong>Product ID:</strong> {item.product_id}
            </p>
            <p>
              <strong>Basket Item ID:</strong> {item.basket_item_id}
            </p>
            {/* Render Variation Name from selected_variation */}
            <p>
              <strong>Variation Name:</strong>{" "}
              {item.selected_variation?.variation_name || "N/A"}
            </p>
            {/* Render Selected Variation (if any) */}
            <p>
              <strong>Selected Variation:</strong>{" "}
              {JSON.stringify(item.selected_variation)}
            </p>
            <p>
              <strong>Variation ID:</strong> {item.variation_id}
            </p>
            <p>
              <strong>User ID:</strong> {item.user_id}
            </p>
            {/* Image Rendering from selected_variation */}
            {item.selected_variation?.image && (
              <img
                src={item.selected_variation.image}
                alt={
                  item.selected_variation.variation_name || "Variation Image"
                }
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </div>
        ))
      ) : (
        <p>No items in checkout.</p>
      )}
    </div>
  );
};

export default Checkout;

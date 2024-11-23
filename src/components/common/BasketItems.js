import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown"; // Import your CustomDropdown component

const BasketItems = ({ items, removeItem }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantSelect = (item, selectedVariant) => {
    console.log(
      `Selected variant for ${item.product_name}: ${selectedVariant.variation_name}`
    );

    // Update the selected variant for the specific item in the basket
    setSelectedVariants((prevState) => ({
      ...prevState,
      [item.basket_item_id]: selectedVariant, // Store selected variant for each item
    }));
  };

  return (
    <div className="basket-items-list">
      {items.map((item) => {
        // Get selected variant for this item, or fallback to default item details
        const selectedVariant =
          selectedVariants[item.basket_item_id] || item.selectedVariant;

        return (
          <div className="basket-item" key={item.basket_item_id}>
            <img
              className="basket-item-image"
              // Display the image of the selected variant, or fallback to default item image
              src={selectedVariant?.variation_image}
              alt={item.product_name}
            />
            <div className="basket-item-details">
              <h3 className="basket-item-name">{item.product_name}</h3>
              <p className="basket-item-price">
                ₱
                {selectedVariant?.variation_discount_price ||
                  item.variation_discount_price}
              </p>
              <p className="basket-item-quantity">Quantity: {item.quantity}</p>

              {/* Pass variations to CustomDropdown */}
              <CustomDropdown
                title="Select Variant"
                items={item.variations} // Passing full variations array
                onSelect={(selectedVariant) =>
                  handleVariantSelect(item, selectedVariant)
                }
                selectedItem={selectedVariant || {}}
              />
            </div>
            <button
              className="remove-item-button"
              onClick={() => removeItem(item.basket_item_id)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BasketItems;

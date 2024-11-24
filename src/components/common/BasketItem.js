import React from "react";
import CustomDropdown from "./CustomDropdown";
import { Button, Row, Col } from "react-bootstrap";
import "../../styles/BasketItem.scss";

const BasketItem = ({
  item,
  handleVariationChange,
  increaseQuantity,
  decreaseQuantity,
  handleQuantityChange,
  removeItem,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (e) => {
    // Log the checkbox state and the item id
    console.log(
      "Checkbox changed for item:",
      item.basket_item_id,
      "Checked:",
      e.target.checked
    );

    // Pass the data to the parent function (onCheckboxChange)
    onCheckboxChange(item.basket_item_id, e.target.checked);
  };

  return (
    <div className="basket-item-row d-flex align-items-center">
      <div className="basket-item-checkbox d-flex align-items-center">
        <input
          type="checkbox"
          onChange={(e) => handleCheckboxChange(e)} // Pass the event directly to the handler
          className="basket-checkbox"
        />
      </div>
      <div className="basket-item-wrapper w-100">
        <Row key={item.basket_item_id} className="basket-item">
          <Col md={3} className="d-flex justify-content-start align-items-left">
            <div className="basket-item-image">
              <img
                src={item.selected_variation?.image || item.image1}
                alt={item.product_name}
                className="img-fluid"
              />
            </div>
          </Col>
          <Col md={7} className="basket-item-details d-flex flex-column">
            <p className="basket-item-name">{item.product_name}</p>
            <p className="variation-text">Variation:</p>
            <CustomDropdown
              title={
                item.selected_variation?.variation_name || "Select Variation"
              }
              items={item.variations}
              onSelect={(selectedVariation) =>
                handleVariationChange(item.basket_item_id, selectedVariation)
              }
            />
            <div className="quantity-and-remove-container d-flex mt-auto justify-content-start align-items-left">
              <div className="quantity-container d-flex align-items-center">
                <Button
                  onClick={() => decreaseQuantity(item.basket_item_id)}
                  className="quantity-button w-25"
                  variant="light"
                >
                  -
                </Button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.basket_item_id, e.target.value)
                  }
                  className="quantity-input"
                />
                <Button
                  onClick={() => increaseQuantity(item.basket_item_id)}
                  className="quantity-button w-25"
                  variant="light"
                >
                  +
                </Button>
              </div>
              <button
                className="remove-item-button"
                onClick={() => removeItem(item.basket_item_id)}
              >
                Remove
              </button>
            </div>
          </Col>
          <Col md={2} className="mt-3 pl-5 d-flex flex-column align-items-end">
            <h2 className="basket-item-price">
              ₱
              {parseFloat(
                item.selected_variation?.discount_price || item.discount_price
              ).toFixed(2)}
            </h2>
            <h2 className="price">
              <s>₱{item.price || 0}</s>
            </h2>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BasketItem;

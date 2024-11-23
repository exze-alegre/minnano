import React from "react";
import CustomDropdown from "../common/CustomDropdown";
import { Button, Row, Col } from "react-bootstrap";
import "../../styles/BasketItem.scss"; // Ensure styles are imported

const BasketItem = ({
  item,
  handleVariationChange,
  increaseQuantity,
  decreaseQuantity,
  handleQuantityChange,
  removeItem,
}) => {
  return (
    <div className="basket-item-wrapper">
      <Row key={item.basket_item_id} className="basket-item">
        <Col
          md={4}
          className="d-flex justify-content-start align-items-left" // Align image to the left
        >
          <div className="basket-item-image">
            <img
              src={item.selected_variation?.image || item.image1}
              alt={item.product_name}
              className="img-fluid" // Ensure the image is responsive
            />
          </div>
        </Col>

        <Col md={6} className="basket-item-details d-flex flex-column">
          <p className="basket-item-name">{item.product_name}</p>

          <p className="mt-1 variation-text">Variation:</p>

          <CustomDropdown
            title={
              item.selected_variation?.variation_name || "Select Variation"
            }
            items={item.variations}
            onSelect={(selectedVariation) =>
              handleVariationChange(item.basket_item_id, selectedVariation)
            }
          />

          {/* Wrap quantity and remove button in the same container */}
          <div className="quantity-and-remove-container d-flex mt-auto justify-content-start align-items-left">
            {/* Quantity container */}
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

            {/* Remove button */}
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

          {/* Display the regular price with strikethrough */}
          <h2 className="price">
            <s>₱{item.price || 0}</s>
          </h2>
        </Col>
      </Row>
    </div>
  );
};

export default BasketItem;

import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import CustomDropdown from "../common/CustomDropdown";
import { Button } from "react-bootstrap";
import "../../styles/Basket.scss";

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    fetchBasketItems();
  }, []);

  const fetchBasketItems = () => {
    fetch("http://localhost/minnano/backend/getBasketItems.php?user_id=1")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (Array.isArray(data)) {
          setBasketItems(data);
        } else {
          console.error("Failed to fetch basket items or the array is empty");
          setBasketItems([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setBasketItems([]);
      });
  };

  const removeItem = (itemId) => {
    fetch(`http://localhost/minnano/backend/removeItem.php?item_id=${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Item removed successfully");
        } else {
          console.error("Failed to remove item:", data.message);
        }
        fetchBasketItems();
      })
      .catch((error) => {
        console.error("Error:", error);
        fetchBasketItems();
      });
  };

  const handleVariationChange = (itemId, selectedVariation) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.basket_item_id === itemId
          ? { ...item, selected_variation: selectedVariation }
          : item
      )
    );

    const variationId = selectedVariation.variation_id;

    fetch("http://localhost/minnano/backend/updateVariation.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        item_id: itemId,
        variation_id: variationId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Variation updated successfully");
        } else {
          console.error("Failed to update variation:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateQuantityInDatabase = (itemId, newQuantity) => {
    const validItemId = parseInt(itemId, 10);
    const validQuantity = parseInt(newQuantity, 10);

    if (isNaN(validItemId) || validItemId <= 0) {
      console.error("Invalid item ID:", itemId);
      return;
    }

    if (isNaN(validQuantity) || validQuantity <= 0) {
      console.error("Invalid quantity:", newQuantity);
      return;
    }

    fetch("http://localhost/minnano/backend/updateQuantity.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        item_id: validItemId,
        quantity: validQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Quantity updated successfully", data);
        } else {
          console.error("Failed to update quantity:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const increaseQuantity = (itemId) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.basket_item_id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    const updatedItem = basketItems.find(
      (item) => item.basket_item_id === itemId
    );
    if (updatedItem) {
      updateQuantityInDatabase(itemId, updatedItem.quantity + 1);
    }
  };

  const decreaseQuantity = (itemId) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.basket_item_id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    const updatedItem = basketItems.find(
      (item) => item.basket_item_id === itemId
    );
    if (updatedItem) {
      updateQuantityInDatabase(itemId, updatedItem.quantity - 1);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.basket_item_id === itemId
          ? { ...item, quantity: updatedQuantity }
          : item
      )
    );
    updateQuantityInDatabase(itemId, updatedQuantity);
  };

  const totalPrice = basketItems.reduce((total, item) => {
    return total + parseFloat(item.discount_price) * item.quantity;
  }, 0);

  return (
    <div className="basket-page">
      <Header />
      <div className="basket-content">
        <div className="basket-items">
          {basketItems.length === 0 ? (
            <p className="empty-basket-message">Your basket is empty</p>
          ) : (
            basketItems.map((item) => (
              <div key={item.basket_item_id} className="basket-item">
                <div className="basket-item-image">
                  <img
                    src={item.selected_variation?.image || item.image1}
                    alt={item.product_name}
                  />
                </div>
                <div className="basket-item-details">
                  <p className="basket-item-name">{item.product_name}</p>
                  <CustomDropdown
                    title={
                      item.selected_variation?.variation_name ||
                      "Select Variation"
                    }
                    items={item.variations}
                    onSelect={(selectedVariation) =>
                      handleVariationChange(
                        item.basket_item_id,
                        selectedVariation
                      )
                    }
                  />
                  <p className="basket-item-price">
                    ₱
                    {parseFloat(
                      item.selected_variation?.discount_price ||
                        item.discount_price
                    ).toFixed(2)}
                  </p>

                  <div className="quantity-container d-flex justify-content-between align-items-center mt-3">
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
                        handleQuantityChange(
                          item.basket_item_id,
                          e.target.value
                        )
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
                </div>
                <button
                  className="remove-item-button"
                  onClick={() => removeItem(item.basket_item_id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="total">
          <h4>Total: ₱{totalPrice.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

export default Basket;

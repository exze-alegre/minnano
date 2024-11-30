import React, { useState, useEffect, useRef } from "react";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import FakeLoader from "../common/FakeLoader";
import BasketItem from "../common/BasketItem"; // Import the new BasketItem component
import Notifications from "../common/Notification"; // Assuming you have a Notifications component
import { Container, Row, Col } from "react-bootstrap";
import BasketEmptyIcon from "../assets/BasketEmptyIcon"; // Import your custom icon component
import "../../styles/Basket.scss";

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [notifications, setNotifications] = useState([]); // New state for notifications
  const loaderRef = useRef();

  useEffect(() => {
    fetchBasketItems();
  }, []);

  const handleCheckboxChange = (itemId, isChecked) => {
    setSelectedItems((prevSelected) =>
      isChecked
        ? [...prevSelected, itemId]
        : prevSelected.filter((id) => id !== itemId)
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      // Trigger notification
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: "Please select item for checkout" },
      ]);
      return; // Stop further execution
    }

    loaderRef.current.startLoading(); // Trigger the loader

    const itemsForCheckout = basketItems
      .filter((item) => selectedItems.includes(item.basket_item_id))
      .map((item) => ({
        added_at: item.added_at,
        basket_item_id: item.basket_item_id,
        price: item.price,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        selected_variation: item.selected_variation,
        discount_price: item.discount_price,
        image: item.image,
        variation_id: item.variation_id,
        variation_name: item.variation_name,
        user_id: item.user_id,
      }));

    // Save selected items to localStorage and navigate
    localStorage.setItem("checkoutItems", JSON.stringify(itemsForCheckout));
    setSelectedItems([]); // Clear selected items
  };

  const fetchBasketItems = () => {
    fetch("http://localhost/minnano/backend/getBasketItems.php", {
      method: "GET",
      credentials: "include", // Ensure cookies (session) are sent
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.success) {
          // Correctly set the basket items from the 'data' field
          setBasketItems(data.data); // Update the state with the basket items
        } else {
          console.error("Error fetching basket items:", data.error);
          setBasketItems([]); // Fallback if something went wrong
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setBasketItems([]); // Fallback if there’s an error with the fetch
      });
  };

  const removeItem = (itemId) => {
    // Show the notification immediately when the button is pressed
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: Date.now(), message: "Item removed successfully!" },
    ]);

    // Proceed with removing the item from the database
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
        fetchBasketItems(); // Refresh the basket items after operation
      })
      .catch((error) => {
        console.error("Error:", error);
        fetchBasketItems(); // Refresh the basket items even on error
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

  // Calculate total price based on the full price of items
  const totalPrice = basketItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  // Calculate total discount price based on the discounted price of items
  const totalDiscountPrice = basketItems.reduce((total, item) => {
    return total + parseFloat(item.discount_price) * item.quantity;
  }, 0);

  // Calculate price after discount
  const priceAfterDiscount = totalPrice - totalDiscountPrice;

  return (
    <div className="basket-page">
      <Header />
      <Container className="basket-page-container">
        <BackButton />
        {/* Empty message container under the BackButton */}
        {basketItems.length === 0 && (
          <div className="empty-basket-message">
            <BasketEmptyIcon />
            <p>Your basket is empty!</p>
          </div>
        )}
        <Row className="basket-row px-5">
          <Col className="basket-items">
            {basketItems.length > 0
              ? basketItems.map((item) => (
                  <BasketItem
                    key={item.basket_item_id}
                    item={item}
                    onCheckboxChange={handleCheckboxChange}
                    handleVariationChange={handleVariationChange}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    handleQuantityChange={handleQuantityChange}
                    removeItem={removeItem}
                  />
                ))
              : null}
          </Col>

          {/* Checkout summary column only appears if there are items in the cart */}
          {basketItems.length > 0 && (
            <Col className="checkout-summary">
              <h3>Cart Summary</h3>
              <p>Total Price: ₱{totalDiscountPrice.toFixed(2)}</p>
              <p>Saved: ₱{priceAfterDiscount.toFixed(2)}</p>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <FakeLoader ref={loaderRef} nextPage="/checkout" />
            </Col>
          )}
        </Row>
        <Notifications notifications={notifications} />
      </Container>
    </div>
  );
};

export default Basket;

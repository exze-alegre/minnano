import React, { useState, useEffect } from 'react';
import Header from "../common/Header";
import "../../styles/Basket.scss";

const Basket = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart data from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const removeItem = (itemId) => {
    // Remove the item from the cart
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);

    // Update localStorage with the new cart
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Ensure quantity is valid
    const validQuantity = newQuantity > 0 && Number.isInteger(newQuantity) ? newQuantity : 1;

    // Update the quantity for the specific item
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: validQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);

    // Update localStorage with the new cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price for the cart
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.discountPrice || item.price; // Use discountPrice if available
    return total + (price * (item.quantity || 1));
  }, 0);

  return (
    <div className="basket-page">
      <Header />
      <div className="basket-content">
        <div className="cart-items">
          <h1 className="page-title">Your Basket</h1>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    <p className="cart-item-price">{`₱${item.discountPrice || item.price}`}</p>
                    {/* Quantity controls */}
                    <div className="quantity-control">
                      <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        value={item.quantity || 1}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                      />
                    </div>
                  </div>
                  {/* Remove button */}
                  <button
                    className="remove-item-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Summary */}
        <div className="checkout-summary">
          <h3>Summary</h3>
          <div className="checkout-item">
            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ₱{totalPrice}</p>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Basket;

import React from 'react';

const BasketItems = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
            {/* Add buttons or inputs for actions like removing or changing quantity */}
            <button>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketItems;

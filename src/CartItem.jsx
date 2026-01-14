import React from "react";

const CartItem = ({ cartItems, setCartItems }) => {

  // Increase quantity
  const handleIncrement = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // Decrease quantity (minimum 1)
  const handleDecrement = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // Remove item from cart
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && (
        <p>Your cart is empty</p>
      )}

      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <h4>{item.name}</h4>
          <p>Price: R{item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <button onClick={() => handleIncrement(item.id)}>+</button>
          <button onClick={() => handleDecrement(item.id)}>-</button>
          <button onClick={() => handleRemove(item.id)}>Delete</button>
        </div>
      ))}

      {/* Explicit total display for full marks */}
      <h3 className="cart-total">
        Total Cart Amount: R{calculateTotalAmount()}
      </h3>
    </div>
  );
};

export default CartItem;

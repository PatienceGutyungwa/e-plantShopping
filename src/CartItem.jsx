import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items || []);

  // Sum total = sum(item.price * item.quantity)
  const calculateTotalAmount = () => {
    return items.reduce((sum, it) => {
      const price = Number(it.price ?? 0);
      const qty = Number(it.quantity ?? 1);
      if (Number.isNaN(price) || Number.isNaN(qty)) return sum;
      return sum + price * qty;
    }, 0);
  };

  const handleIncrement = (item) => {
    // If item already has quantity, increment, otherwise add with quantity 1
    const newQty = Number(item.quantity ?? 0) + 1;
    // Prefer updateQuantity for existing items
    if (item.id) {
      dispatch(updateQuantity({ id: item.id, quantity: newQty }));
    } else {
      // Fallback: add item object with quantity
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleDecrement = (item) => {
    const currentQty = Number(item.quantity ?? 1);
    const newQty = currentQty - 1;
    if (!item.id) return;
    if (newQty <= 0) {
      // remove when quantity reaches 0
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQty }));
    }
  };

  const handleRemove = (item) => {
    if (!item?.id) return;
    dispatch(removeItem(item.id));
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h3>Your cart is empty</h3>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((it) => {
            const price = Number(it.price ?? 0);
            const qty = Number(it.quantity ?? 1);
            return (
              <tr key={it.id ?? `${it.name}-${Math.random()}`}>
                <td className="product-cell">
                  {it.thumbnail && (
                    <img
                      src={it.thumbnail}
                      alt={it.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 8 }}
                    />
                  )}
                  <span>{it.name ?? 'Unnamed product'}</span>
                </td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <div className="qty-controls">
                    <button onClick={() => handleDecrement(it)} aria-label="decrement">-</button>
                    <span style={{ margin: '0 8px' }}>{qty}</span>
                    <button onClick={() => handleIncrement(it)} aria-label="increment">+</button>
                  </div>
                </td>
                <td>${(price * qty).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemove(it)} aria-label="remove">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="cart-summary" style={{ marginTop: 16 }}>
        <strong>Total: </strong>${calculateTotalAmount().toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;

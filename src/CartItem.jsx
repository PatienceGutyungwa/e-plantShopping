import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Utility: calculate total amount for a cart
 * - cartItems: array of { id, price, quantity }
 * - returns number
 */
export function calculateTotalAmount(cartItems = []) {
  return cartItems.reduce((sum, it) => {
    const price = Number(it.price) || 0;
    const qty = Number(it.quantity) || 0;
    return sum + price * qty;
  }, 0);
}

/**
 * CartItem component
 * Props:
 * - item: { id, title, price, quantity, image }
 * - onIncrement(id) optional callback to notify parent to increment quantity
 * - onDecrement(id) optional callback to notify parent to decrement quantity
 * - onRemove(id) optional callback to notify parent to remove item
 *
 * This component works in two modes:
 * 1) Controlled by parent: pass onIncrement/onDecrement/onRemove and the parent's cart state
 * 2) Uncontrolled fallback: no callbacks provided -> component keeps local quantity state
 */
export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const initialQty = Number(item.quantity) || 1;
  const [localQty, setLocalQty] = useState(initialQty);

  // Keep local qty in sync if the parent changes item.quantity
  useEffect(() => {
    if (typeof item.quantity !== "undefined") {
      setLocalQty(Number(item.quantity) || 1);
    }
  }, [item.quantity]);

  const handleIncrement = useCallback(() => {
    if (typeof onIncrement === "function") {
      onIncrement(item.id);
    } else {
      setLocalQty((q) => q + 1);
    }
  }, [onIncrement, item.id]);

  const handleDecrement = useCallback(() => {
    if (typeof onDecrement === "function") {
      onDecrement(item.id);
    } else {
      setLocalQty((q) => {
        const next = Math.max(1, q - 1);
        return next;
      });
    }
  }, [onDecrement, item.id]);

  const handleRemove = useCallback(() => {
    if (typeof onRemove === "function") {
      onRemove(item.id);
    } else {
      // fallback behaviour: if uncontrolled, you might want to signal removal differently,
      // but here we just log so it's obvious in development.
      // In a real app without parent callbacks you might hide the item from UI.
      // eslint-disable-next-line no-console
      console.warn("onRemove not provided. Item would be removed:", item.id);
    }
  }, [onRemove, item.id]);

  const qty = typeof item.quantity !== "undefined" ? Number(item.quantity) || localQty : localQty;
  const price = Number(item.price) || 0;
  const lineTotal = (price * qty).toFixed(2);

  return (
    <div className="cart-item" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 6 }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{item.title}</div>
        <div style={{ color: "#666", marginTop: 4 }}>
          Price: ${price.toFixed(2)} · Total: ${lineTotal}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          aria-label={`decrease-${item.id}`}
          onClick={handleDecrement}
          style={{ padding: "6px 8px" }}
        >
          −
        </button>
        <div style={{ minWidth: 28, textAlign: "center" }}>{qty}</div>
        <button
          aria-label={`increase-${item.id}`}
          onClick={handleIncrement}
          style={{ padding: "6px 8px" }}
        >
          +
        </button>
      </div>

      <div style={{ marginLeft: 12 }}>
        <button
          aria-label={`remove-${item.id}`}
          onClick={handleRemove}
          style={{
            padding: "6px 10px",
            background: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
  }).isRequired,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onRemove: PropTypes.func,
};


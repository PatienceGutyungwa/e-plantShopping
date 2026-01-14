import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // payload can be either an item object ({ id, name, price, ... , quantity? })
    // or an object containing { id, quantity } depending on how callers dispatch.
    addItem: (state, action) => {
      const payload = action.payload;
      const itemId = payload && (payload.id ?? payload);
      if (!itemId) return;

      const existing = state.items.find((it) => it.id === itemId);
      const addQty = Number(payload.quantity ?? 1);

      if (existing) {
        existing.quantity = (Number(existing.quantity ?? 1) + addQty);
      } else {
        // If payload is just an id, create a minimal item shape.
        if (typeof payload === 'object' && payload.id) {
          state.items.push({
            ...payload,
            quantity: addQty,
          });
        } else {
          state.items.push({
            id: itemId,
            quantity: addQty,
          });
        }
      }
    },

    // payload can be id or { id }
    removeItem: (state, action) => {
      const payload = action.payload;
      const id = payload && (payload.id ?? payload);
      if (!id) return;
      state.items = state.items.filter((it) => it.id !== id);
    },

    // payload should be { id, quantity }
    // if quantity <= 0 the item is removed
    updateQuantity: (state, action) => {
      const payload = action.payload || {};
      const id = payload.id;
      if (!id) return;

      const quantity = Number(payload.quantity);
      const existing = state.items.find((it) => it.id === id);
      if (!existing) return;

      if (Number.isNaN(quantity) || quantity <= 0) {
        // remove item when quantity is not positive
        state.items = state.items.filter((it) => it.id !== id);
      } else {
        existing.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

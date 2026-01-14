import { createSlice } from '@reduxjs/toolkit';
 
const cartSlice = createSlice({

  name: 'cart',

  initialState: {

    items: [],

    totalQuantity: 0,

  },

  reducers: {

    addItem: (state, action) => {

      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (!existingItem) {

        state.items.push({ ...action.payload, quantity: 1 });

      } else {

        existingItem.quantity += 1;

      }

      state.totalQuantity += 1;

    },

    removeItem: (state, action) => {

      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {

        state.totalQuantity -= item.quantity;

        state.items = state.items.filter((item) => item.id !== action.payload.id);

      }

    },

    updateQuantity: (state, action) => {

      const { id, amount } = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (item) {

        item.quantity += amount;

        if (item.quantity <= 0) {

          state.items = state.items.filter((item) => item.id !== id);

        }

        state.totalQuantity += amount;

      }

    },

  },

});
 
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
 

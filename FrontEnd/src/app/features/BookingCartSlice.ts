import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, so remove it and adjust total amount
        const item = state.items[existingItemIndex];
        state.totalAmount -= item.price;
        state.items.splice(existingItemIndex, 1);
      } else {
        // Item doesn't exist, so add it and adjust total amount
        state.items.push(action.payload);
        state.totalAmount += action.payload.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { toggleItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

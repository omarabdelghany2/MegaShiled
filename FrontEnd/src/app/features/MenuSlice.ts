import { createSlice } from '@reduxjs/toolkit';
import * as SheetPrimitive from "@radix-ui/react-dialog"


interface MenuState {
  isOpen: boolean;
}

const initialState: MenuState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    toggleMenu: (state) => {
      const toggle = SheetPrimitive.Trigger as unknown as HTMLButtonElement
      toggle.click()
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;

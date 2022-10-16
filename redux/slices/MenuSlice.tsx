import {createSlice} from "@reduxjs/toolkit";

interface IMenuState {
  isOpen: boolean;
}

const initialState: IMenuState = {
  isOpen: false,
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const {openMenu, closeMenu, toggleMenu} = MenuSlice.actions;

export default MenuSlice.reducer;

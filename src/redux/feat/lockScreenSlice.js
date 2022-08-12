import { createSlice } from "@reduxjs/toolkit";
import ASSETS from "../../assets";

export const lockScreenSlice = createSlice({
  name: "lockScreen",
  initialState: {
    wallpaper: ASSETS.images.wallpapers[2].require,
    isLocked: true,
  },
  reducers: {
    setWallpaper: (state, action) => {
      state.wallpaper = action.payload;
    },
    setIsLocked: (state, action) => {
      state.isLocked = action.payload;
    },
  },
});

export const { setWallpaper, setIsLocked } = lockScreenSlice.actions;

export default lockScreenSlice.reducer;

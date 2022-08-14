import { createSlice } from "@reduxjs/toolkit";
import { profiles, wallpapers } from "../../assets";

export const lockScreenSlice = createSlice({
  name: "lockScreen",
  initialState: {
    wallpaper: wallpapers[2],
    profileImage: profiles.deri,
    isLocked: true,
    validPIN: "123123",
  },
  reducers: {
    setWallpaper: (state, action) => {
      state.wallpaper = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setIsLocked: (state, action) => {
      state.isLocked = action.payload;
    },
  },
});

export const { setWallpaper, setIsLocked } = lockScreenSlice.actions;

export default lockScreenSlice.reducer;

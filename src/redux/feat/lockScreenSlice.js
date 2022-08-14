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
    /**
     * Set the wallpaper
     * @param {*} state automatically generated
     * @param {require} action import image
     */
    setWallpaper: (state, action) => {
      state.wallpaper = action.payload;
    },
    /**
     * Set the profile image
     * @param {*} state automatically generated
     * @param {require} action import image
     */
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    /**
     * Set the isLocked state
     * @param {*} state automatically generated
     * @param {boolean} action true or false
     */
    setIsLocked: (state, action) => {
      state.isLocked = action.payload;
    },
  },
});

export const { setWallpaper, setIsLocked } = lockScreenSlice.actions;

export default lockScreenSlice.reducer;

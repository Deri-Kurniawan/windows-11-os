import { createSlice } from "@reduxjs/toolkit";

const desktopSlice = createSlice({
  name: "desktop",
  initialState: {
    activeWindows: [],
  },
  reducers: {
    newActiveWindow: (state, action) => {},
    removeActiveWindow: (state, action) => {},
  },
});

export const { newActiveWindow, removeActiveWindow } = desktopSlice.actions;

export default desktopSlice.reducer;

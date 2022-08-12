import { createSlice } from "@reduxjs/toolkit";
import ASSETS from "../../assets";

const desktopSlice = createSlice({
  name: "desktop",
  initialState: {
    activeWindows: [],
    wallpaper: ASSETS.images.wallpapers[0].require,
    battery: {
      charging: false,
      level: 0,
    },
  },
  reducers: {
    newActiveWindow: (state, action) => {},
    removeActiveWindow: (state, action) => {},
    setBatteryIsCharging: (state, action) => {
      state.battery.charging = action.payload;
    },
    setBatteryLevel: (state, action) => {
      state.battery.level = action.payload;
    },
  },
});

export const {
  newActiveWindow,
  removeActiveWindow,
  setBatteryIsCharging,
  setBatteryLevel,
} = desktopSlice.actions;

export default desktopSlice.reducer;

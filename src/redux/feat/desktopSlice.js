import { createSlice } from "@reduxjs/toolkit";
import { icons, wallpapers } from "../../assets";

const desktopSlice = createSlice({
  name: "desktop",
  initialState: {
    activeWindows: [],
    wallpaper: wallpapers[0],
    battery: {
      charging: false,
      level: 0,
    },
    pinnedApps: [
      {
        id: 1,
        name: "File Explorer",
        icon: icons.apps.winFileExplorer,
        onClick: () => null,
      },
      {
        id: 2,
        name: "File Explorer",
        icon: icons.apps.winFileExplorer,
        onClick: () => null,
      },
    ],
  },
  reducers: {
    newActiveWindow: (state, action) => {},
    removeActiveWindow: (state, action) => {},
    /**
     * Set the wallpaper
     * @param {*} state automatically generated
     * @param {boolean} action true or false
     */
    setBatteryIsCharging: (state, action) => {
      state.battery.charging = action.payload;
    },
    /**
     * Set the battery level
     * @param {*} state automatically generated
     * @param {number} action Float 0 - 1
     */
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

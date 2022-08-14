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
    ]
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

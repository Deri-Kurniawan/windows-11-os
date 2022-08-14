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
        width: 25,
        height: 25,
        onClick: () => console.log("Pinned app 1 clicked"),
      },
      {
        id: 2,
        name: "WhatsApp",
        icon: icons.apps.whatsapp,
        width: 28,
        height: 28,
        onClick: () => console.log("Pinned app 2 clicked"),
      },
      {
        id: 3,
        name: "Google Chrome",
        icon: icons.apps.chrome,
        width: 28,
        height: 28,
        onClick: () => console.log("Pinned app 3 clicked"),
      },
      {
        id: 4,
        name: "Visual Studio Code",
        icon: icons.apps.vscode,
        width: 28,
        height: 28,
        onClick: () => console.log("Pinned app 4 clicked"),
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

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
        name: "File Explorer",
        icon: icons.apps.winFileExplorer,
        width: 25,
        height: 25,
        onClick: () => null,
      },
      {
        name: "WhatsApp",
        icon: icons.apps.whatsapp,
        width: 28,
        height: 28,
        onClick: () => null,
      },
      {
        name: "Google Chrome",
        icon: icons.apps.chrome,
        width: 28,
        height: 28,
        onClick: () => null,
      },
      {
        name: "Visual Studio Code",
        icon: icons.apps.vscode,
        width: 28,
        height: 28,
        onClick: () => null,
      },
    ],
    shortcutApps: [
      {
        name: "Google Chrome",
        icon: icons.apps.chrome,
        onClick: () => null,
      },
      {
        name: "GitHub",
        icon: icons.apps.github,
        onClick: () => null,
      },
      {
        name: "Visual Studio Code",
        icon: icons.apps.vscode,
        onClick: () => null,
      },
      {
        name: "WhatsApp",
        icon: icons.apps.whatsapp,
        onClick: () => null,
      },
      {
        name: "Command Prompt",
        icon: icons.apps.winCMD,
        onClick: () => null,
      },
      {
        name: "Windows Defender",
        icon: icons.apps.winDefender,
        onClick: () => null,
      },
      {
        name: "File Explorer",
        icon: icons.apps.winFileExplorer,
        onClick: () => null,
      },
      {
        name: "Mail",
        icon: icons.apps.winMail,
        onClick: () => null,
      },
      {
        name: "Search",
        icon: icons.apps.winSearch,
        onClick: () => null,
      },
      {
        name: "Settings",
        icon: icons.apps.winSettings,
        onClick: () => null,
      },
      {
        name: "Trash Full",
        icon: icons.apps.winTrashFull,
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

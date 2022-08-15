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
        onClick: () => {
          window.open(
            "https://wa.me/+6285720959031?text=Hello%20there%20from%20the%20desktop%20app!",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
      },
      {
        name: "Google Chrome",
        icon: icons.apps.chrome,
        width: 28,
        height: 28,
        onClick: () => {
          window.open(
            "https://google.com",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
      },
      {
        name: "Visual Studio Code",
        icon: icons.apps.vscode,
        width: 28,
        height: 28,
        onClick: () => {
          window.open(
            "https://vscode.dev",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
      },
    ],
    shortcutApps: [
      {
        name: "Google Chrome",
        icon: icons.apps.chrome,
        onClick: () => {
          window.open(
            "https://google.com",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
      },
      {
        name: "GitHub",
        icon: icons.apps.github,
        onClick: () => {
          window.open(
            "https://github.com/deri-kurniawan",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
      },
      {
        name: "Visual Studio Code",
        icon: icons.apps.vscode,
        onClick: () => {
          window.open(
            "https://vscode.dev",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
      },
      {
        name: "WhatsApp",
        icon: icons.apps.whatsapp,
        onClick: () => {
          window.open(
            "https://wa.me/+6285720959031?text=Hello%20there%20from%20the%20desktop%20app!",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
          );
        },
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
        onClick: () => (window.location.href = "mailto:deri.netuchi@gmail.com"),
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

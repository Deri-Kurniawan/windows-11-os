import { createSlice } from "@reduxjs/toolkit";
import { profiles, wallpapers } from "../../assets";
import initialState from "../initialState";

const desktopSlice = createSlice({
  name: "desktop",
  initialState: {
    profileImage: profiles.deri,
    activeWindows: [...initialState.activeWindows],
    wallpaper: wallpapers[0],
    battery: {
      isCharging: false,
      level: 0,
    },
    winModalToggled: false,
    pinnedApps: [...initialState.pinnedApps],
    shortcutApps: [...initialState.shortcutApps],
  },
  reducers: {
    /**
     * Set the wallpaper
     * @param {*} state automatically generated
     * @param {require} action import image
     */
    setDesktopWallpaper: (state, action) => {
      state.wallpaper = wallpapers[action.payload];
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
     * Add a new window to the activeWindows array
     * @param {*} state
     * @param {object} action { height, width, x, y, title, minimized, maximized, Component }
     */
    newActiveWindow: (state, action) => {
      const {
        height = "80vh",
        width = "80vw",
        x = 10,
        y = 10,
        title = "",
        minimized = false,
        maximized = false,
        Component = () => null,
      } = action.payload;

      const newId = state.activeWindows.length + 1;

      const newWindow = {
        id: newId,
        height,
        width,
        x,
        y,
        title,
        minimized,
        maximized,
        Component,
      };

      state.activeWindows.push(newWindow);
    },
    removeActiveWindow: (state, action) => {
      const filtered = state.activeWindows.filter(
        (win) => win.id !== action.payload
      );

      state.activeWindows = filtered;
    },
    /**
     * minimze a window
     * @param {*} state
     * @param {object} action {id, minimized: boolean}
     */
    minimizeActiveWindow: (state, action) => {
      const { id, minimized } = action.payload;

      const filtered = state.activeWindows.map((win) => {
        if (win.id === id) {
          win.minimized = minimized;
        }
        return win;
      });

      state.activeWindows = filtered;
    },
    /**
     *
     * @param {*} state
     * @param {object} action id
     */
    maximizeActiveWindow: (state, action) => {
      const id = action.payload;

      const filtered = state.activeWindows.map((win) => {
        if (win.id === id) {
          win.maximized = !win.maximized;
        }
        return win;
      });

      state.activeWindows = filtered;
    },
    cancelMaximizeActiveWindow: (state, action) => {
      const id = action.payload;

      const filtered = state.activeWindows.map((win) => {
        if (win.id === id) {
          win.maximized = false;
        }
        return win;
      });

      state.activeWindows = filtered;
    },
    setWinModalToggled: (state, actions) => {
      state.winModalToggled = actions.payload;
    },
    /**
     * Set the wallpaper
     * @param {*} state automatically generated
     * @param {boolean} action true or false
     */
    setBatteryIsCharging: (state, action) => {
      state.battery.isCharging = action.payload;
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
  setDesktopWallpaper,
  setProfileImage,
  newActiveWindow,
  removeActiveWindow,
  minimizeActiveWindow,
  maximizeActiveWindow,
  cancelMaximizeActiveWindow,
  setWinModalToggled,
  setBatteryIsCharging,
  setBatteryLevel,
} = desktopSlice.actions;

export default desktopSlice.reducer;

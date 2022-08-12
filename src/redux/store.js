import { configureStore } from "@reduxjs/toolkit";
import desktopReducer from "./feat/desktopSlice";
import lockScreenReducer from "./feat/lockScreenSlice";

const store = configureStore({
  reducer: {
    desktop: desktopReducer,
    lockScreen: lockScreenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import desktopReducer from "./feat/desktopSlice";

const store = configureStore({
  reducer: {
    desktop: desktopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

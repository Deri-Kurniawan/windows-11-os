import React, { useEffect } from "react";
import LockScreen from "./LockScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  setBatteryIsCharging,
  setBatteryLevel,
} from "./redux/feat/desktopSlice";

function App() {
  const dispatch = useDispatch();
  const isLockedScreen = useSelector((state) => state.lockScreen.isLocked);

  useEffect(() => {
    navigator.getBattery().then((battery) => {
      dispatch(setBatteryIsCharging(battery.charging));
      dispatch(setBatteryLevel(battery.level));

      battery.addEventListener("chargingchange", () => {
        dispatch(setBatteryIsCharging(battery.charging));
        dispatch(setBatteryLevel(battery.level));
      });

      return () => {
        battery.removeEventListener("chargingchange", () => {
          dispatch(setBatteryIsCharging(battery.charging));
        });
        battery.disconnect();
      };
    });
  });

  return (
    <>
      {isLockedScreen ? (
        <LockScreen />
      ) : (
        <div>
          <h1>Desktop Screen</h1>
        </div>
      )}
    </>
  );
}

export default App;

import React, { useEffect } from "react";
import LockScreen from "./screens/LockScreen";
import DesktopScreen from "./screens/DesktopScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  setBatteryIsCharging,
  setBatteryLevel,
} from "./redux/feat/desktopSlice";

function App() {
  const isScreenLocked = useSelector((state) => state.lockScreen.isLocked);
  const dispatch = useDispatch();

  const _batteryDetector = () => {
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
  };

  useEffect(() => {
    _batteryDetector();
  });

  return isScreenLocked ? <LockScreen /> : <DesktopScreen />;
}

export default App;

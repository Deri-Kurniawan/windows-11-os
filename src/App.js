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

  useEffect(() => {
    // Get, Set battery level and charging status
    const interval = setInterval(() => {
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
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return isScreenLocked ? <LockScreen /> : <DesktopScreen />;
}

export default App;

import { useSelector } from "react-redux/es/exports";
import {
  TbBatteryCharging2,
  TbBattery1,
  TbBattery2,
  TbBattery3,
  TbBattery4,
  TbBatteryOff,
} from "react-icons/tb";
import { useEffect, useState } from "react";

const BatteryIcon = (props) => {
  const isCharging = useSelector((state) => state.desktop.battery.isCharging);
  const batteryLevel = useSelector((state) => state.desktop.battery.level);
  const [title, setTitle] = useState("");

  const _setTitleProp = (isCharging, batteryLevel) => {
    if (isCharging) {
      setTitle(
        `Battery status: ${(batteryLevel * 100).toFixed(
          0
        )}% available (plugged in)`
      );
      return;
    }
    setTitle(`Battery status: ${(batteryLevel * 100).toFixed(0)}% remaining`);
  };

  useEffect(() => {
    _setTitleProp(isCharging, batteryLevel);
  }, [isCharging, batteryLevel]);

  if (isCharging === true) {
    return <TbBatteryCharging2 {...props} title={title} />;
  }

  if (!batteryLevel || batteryLevel <= 0) {
    return <TbBatteryOff {...props} title={title} />;
  }

  if (batteryLevel > 0 && batteryLevel <= 0.25) {
    return <TbBattery1 {...props} title={title} />;
  }
  if (batteryLevel > 0.25 && batteryLevel <= 0.5) {
    return <TbBattery2 {...props} title={title} />;
  }
  if (batteryLevel > 0.5 && batteryLevel <= 0.75) {
    return <TbBattery3 {...props} title={title} />;
  }
  if (batteryLevel > 0.75 && batteryLevel <= 1) {
    return <TbBattery4 {...props} title={title} />;
  }
};

export default BatteryIcon;

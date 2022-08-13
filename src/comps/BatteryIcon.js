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
  const charging = useSelector((state) => state.desktop.battery.charging);
  const level = useSelector((state) => state.desktop.battery.level);
  const [title, setTitle] = useState("");

  const _setTitleProp = (charging, level) => {
    if (charging) {
      setTitle(
        `Battery status: ${(level * 100).toFixed(0)}% available (plugged in)`
      );
      return;
    }
    setTitle(`Battery status: ${(level * 100).toFixed(0)}% remaining`);
  };

  useEffect(() => {
    _setTitleProp(charging, level);
  }, [charging, level]);

  if (charging === true) {
    return <TbBatteryCharging2 {...props} title={title} />;
  }

  if (!level || level <= 0) {
    return <TbBatteryOff {...props} title={title} />;
  }

  if (level > 0 && level <= 0.25) {
    return <TbBattery1 {...props} title={title} />;
  }
  if (level > 0.25 && level <= 0.5) {
    return <TbBattery2 {...props} title={title} />;
  }
  if (level > 0.5 && level <= 0.75) {
    return <TbBattery3 {...props} title={title} />;
  }
  if (level > 0.75 && level <= 1) {
    return <TbBattery4 {...props} title={title} />;
  }
};

export default BatteryIcon;

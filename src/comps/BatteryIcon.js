import { useSelector } from "react-redux/es/exports";
import {
  TbBatteryCharging2,
  TbBattery1,
  TbBattery2,
  TbBattery3,
  TbBattery4,
  TbBatteryOff,
} from "react-icons/tb";

const BatteryIcon = (props) => {
  const charging = useSelector((state) => state.desktop.battery.charging);
  const level = useSelector((state) => state.desktop.battery.level);

  if (charging === true) {
    return <TbBatteryCharging2 {...props} />;
  }

  if (!level || level <= 0) {
    return <TbBatteryOff {...props} />;
  }

  if (level > 0 && level <= 0.25) {
    return <TbBattery1 {...props} />;
  }
  if (level > 0.25 && level <= 0.5) {
    return <TbBattery2 {...props} />;
  }
  if (level > 0.5 && level <= 0.75) {
    return <TbBattery3 {...props} />;
  }
  if (level > 0.75 && level <= 1) {
    return <TbBattery4 {...props} />;
  }
};

export default BatteryIcon;

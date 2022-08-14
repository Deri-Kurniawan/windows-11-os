import { useSelector } from "react-redux";
import Taskbar from "../comps/Taskbar";
import DesktopShortcuts from "../comps/DesktopShortcuts";

const DesktopScreen = () => {
  const wallpaper = useSelector((state) => state.desktop.wallpaper);

  return (
    <div
      style={{ backgroundImage: `url(${wallpaper})` }}
      className="text-white bg-no-repeat bg-cover"
    >
      <div className="w-screen h-screen">
        <DesktopShortcuts />
        <Taskbar />
      </div>
    </div>
  );
};

export default DesktopScreen;

import React from "react";
import { useSelector } from "react-redux";
import Taskbar from "../comps/Taskbar";

const DesktopScreen = () => {
  const wallpaper = useSelector((state) => state.desktop.wallpaper);

  return (
    <div
      style={{ backgroundImage: `url(${wallpaper})` }}
      className="text-white bg-no-repeat bg-cover"
    >
      <div className="w-screen h-screen">
        <Taskbar />
      </div>
    </div>
  );
};

export default DesktopScreen;

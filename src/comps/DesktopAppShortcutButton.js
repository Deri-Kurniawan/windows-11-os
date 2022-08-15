import React from "react";
import { useDispatch } from "react-redux";

const DesktopAppShortcutButton = ({
  className = "",
  name = "Unnamed",
  icon,
  onClick,
  width = 35,
  height = 35,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className} w-[5.2em] m-[.1em] p-1 rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter`}
      onClick={(e) => onClick(e, dispatch)}
    >
      <img
        className="m-auto"
        src={icon}
        alt={`${name} Icon`}
        width={width}
        height={height}
      />
      <p className="text-center text-xs">{name}</p>
    </button>
  );
};

export default DesktopAppShortcutButton;

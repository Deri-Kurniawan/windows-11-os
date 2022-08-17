import React from "react";
import { useDispatch } from "react-redux";

const WindowsModalPinnedAppbutton = ({
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
      <div className="relative">
        <img
          className="m-auto"
          src={icon}
          alt={`${name} Icon`}
          width={width}
          height={height}
        />
        <p className="text-xs text-center">{name}</p>
      </div>
    </button>
  );
};

export default WindowsModalPinnedAppbutton;

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
      className={`${className} m-[.1em] w-[5.2em] rounded-md border-black bg-transparent p-1 hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter`}
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
        <p className="text-center text-xs">{name}</p>
      </div>
    </button>
  );
};

export default WindowsModalPinnedAppbutton;

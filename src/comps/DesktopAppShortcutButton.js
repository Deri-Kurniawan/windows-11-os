import React from "react";
import { useDispatch } from "react-redux";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

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
      <div className="relative">
        <img
          className="m-auto"
          src={icon}
          alt={`${name} Icon`}
          width={width}
          height={height}
        />
        <p className="text-center text-xs">{name}</p>
        <FaExternalLinkSquareAlt
          size={13}
          color="white"
          enableBackground={true}
          className="absolute top-5 left-5 bg-sky-500"
        />
      </div>
    </button>
  );
};

export default DesktopAppShortcutButton;

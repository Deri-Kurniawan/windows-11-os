import React from "react";
import { useDispatch } from "react-redux";

const TaskbarAppButton = ({
  className,
  name,
  icon,
  onClick,
  width = 28,
  height = 28,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className} m-[.1em] h-[2.6em] w-[2.6em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter`}
      title={name}
      onClick={(e) => onClick(e, dispatch)}
    >
      <img
        className="m-auto"
        src={icon}
        alt={`${name} Icon`}
        width={width}
        height={height}
      />
    </button>
  );
};

export default TaskbarAppButton;

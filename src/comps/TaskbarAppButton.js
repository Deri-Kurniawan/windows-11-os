import React from "react";

const TaskbarAppButton = ({ className, name, icon, onClick }) => {
  return (
    <button
      className={`${className} h-[2.6em] w-[2.6em] m-[.1em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter`}
      title={name}
      onClick={onClick}
    >
      <img src={icon} alt={`${name} Icon`} />
    </button>
  );
};

export default TaskbarAppButton;

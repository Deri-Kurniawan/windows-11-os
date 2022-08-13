import React, { useState, useEffect } from "react";
import BatteryIcon from "../comps/BatteryIcon";
import { AiOutlineWifi } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import moment from "moment";

const Taskbar = () => {
  const [hours, setHours] = useState(moment().format("HH[:]mm"));
  const [date, setDate] = useState(moment().format("DD[/]MM[/]YYYY"));
  const [dateTitle, setTitle] = useState(moment().format("dddd, DD MMMM YYYY"));

  const _updateTime = () => {
    const interval = setInterval(() => {
      setHours(moment().format("HH[:]mm"));
      setDate(moment().format("DD[/]MM[/]YYYY"));
      setTitle(moment().format("dddd, DD MMMM YYYY"));
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    _updateTime();
  }, []);

  return (
    <div className="absolute bottom-0 h-[2.8em] w-screen border-black bg-transparent text-white backdrop-blur-2xl backdrop-filter">
      <div className="h-[2.8em] flex items-center justify-between">
        <div className="hidden lg:flex flex-1"></div>
        <div className="flex flex-1 items-center justify-start lg:justify-center">
          <button
            className="h-[2.6em] w-[2.6em] m-[.1em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter"
            title="Start"
            onClick={() => null}
          >
            <img
              src="https://img.icons8.com/fluency/344/windows-11.png"
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-1 flex-row justify-end">
          <div className="flex h-[2.6em] m-[.1em] border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter">
            <button className="flex flex-row items-center justify-center">
              <MdOutlineKeyboardArrowUp size={24} />
            </button>
          </div>
          <div
            className="flex h-[2.6em] m-[.1em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter cursor-pointer"
            onClick={() => null}
          >
            <div className="flex flex-row items-center justify-center px-2">
              <button className="px-[2px]" onClick={() => null}>
                <AiOutlineWifi
                  size={19}
                  title="Deri Kurniawan&#013;Internet access"
                />
              </button>
              <button className="px-[2px]" onClick={() => null}>
                <GiSpeaker size={19} title="Speakers" />
              </button>
              <button className="px-[2px]" onClick={() => null}>
                <BatteryIcon size={19} />
              </button>
            </div>
          </div>
          <div
            className="flex h-[2.6em] my-[.1em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter"
            onClick={() => null}
          >
            <div
              className="flex items-center justify-center px-2"
              title={dateTitle}
            >
              <div className="flex flex-col items-end justify-center text-xs">
                <span>{hours}</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-[2.6em] m-[.1em] w-2 opacity-0 hover:opacity-100">
            <span>|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;

import React, { useState, useEffect, Fragment } from "react";
import BatteryIcon from "../comps/BatteryIcon";
import { AiOutlineWifi } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import moment from "moment";
import { useSelector } from "react-redux";
import TaskbarPinnedAppButton from "./TaskbarPinnedAppButton";

const Taskbar = () => {
  const pinnedApps = useSelector((state) => state.desktop.pinnedApps);

  const [hours, setHours] = useState(moment().format("HH[:]mm"));
  const [date, setDate] = useState(moment().format("DD[/]MM[/]YYYY"));
  const [dateTitle, setTitle] = useState(moment().format("dddd, DD MMMM YYYY"));

  const _updateTime = () => {
    return setInterval(() => {
      setHours(moment().format("HH[:]mm"));
      setDate(moment().format("DD[/]MM[/]YYYY"));
      setTitle(moment().format("dddd, DD MMMM YYYY"));
    }, 1000);
  };

  useEffect(() => {
    const updateTimeInterval = _updateTime();
    return () => clearInterval(updateTimeInterval);
  }, []);

  return (
    <div className="fixed bottom-0 h-[2.8em] w-screen border-black bg-transparent text-white backdrop-blur-2xl backdrop-filter z-50">
      <div className="h-[2.8em] flex items-center justify-between">
        <div className="flex-1 hidden lg:flex"></div>
        <div className="flex items-center justify-start flex-1 lg:justify-center">
          <TaskbarPinnedAppButton
            name="Start"
            icon="https://img.icons8.com/fluency/344/windows-11.png"
            onClickHandle={() => null}
          />
          {pinnedApps.length > 0 && (
            <Fragment>
              {pinnedApps.map((app, index) => (
                <TaskbarPinnedAppButton
                  key={index}
                  className="hidden lg:block"
                  {...app}
                />
              ))}
            </Fragment>
          )}
        </div>
        <div className="flex flex-row justify-end flex-1">
          <div className="flex h-[2.6em] m-[.1em] border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter">
            <div
              className="flex flex-row items-center justify-center"
              onClick={() => null}
            >
              <MdOutlineKeyboardArrowUp size={24} />
            </div>
          </div>
          <div
            className="flex h-[2.6em] m-[.1em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter"
            onClick={() => null}
          >
            <div className="flex flex-row items-center justify-center px-2">
              <div
                className="px-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <AiOutlineWifi
                  size={19}
                  title="Deri Kurniawan&#013;Internet access"
                />
              </div>
              <div
                className="px-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <GiSpeaker size={19} title="Speakers" />
              </div>
              <div
                className="px-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <BatteryIcon size={19} />
              </div>
            </div>
          </div>
          <div
            className="h-[2.6em] my-[.1em] flex border-black bg-transparent rounded-md hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter"
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
          <div
            className="flex justify-center items-center h-[2.6em] m-[.1em] w-2 opacity-0 hover:opacity-100"
            onClick={() => null}
          >
            <span>|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;

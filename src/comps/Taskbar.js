import { useState, useEffect } from "react";
import BatteryIcon from "../comps/BatteryIcon";
import { AiOutlineWifi } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import moment from "moment";
import { useSelector } from "react-redux";
import TaskbarPinnedAppButton from "./TaskbarPinnedAppButton";
import { setWinModalToggled } from "../redux/feat/desktopSlice";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { BiBluetooth, BiMoon } from "react-icons/bi";
import { IoAccessibilityOutline, IoAirplaneOutline } from "react-icons/io5";
import { TbBatteryEco, TbBrightnessDown } from "react-icons/tb";

const Taskbar = () => {
  const pinnedApps = useSelector((state) => state.desktop.pinnedApps);
  const winModalToggled = useSelector((state) => state.desktop.winModalToggled);

  const [hours, setHours] = useState(moment().format("HH[:]mm"));
  const [date, setDate] = useState(moment().format("DD[/]MM[/]YYYY"));
  const [dateTitle, setTitle] = useState(moment().format("dddd, DD MMMM YYYY"));
  const [dateToggled, setDateToggled] = useState(false);
  const [featuresToggled, setFeaturesToggled] = useState(false);

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
    <div className="fixed bottom-0 z-50 h-[2.8em] w-screen border-black bg-transparent text-white backdrop-blur-2xl backdrop-filter">
      <div className="flex h-[2.8em] items-center justify-between">
        <div className="hidden flex-1 lg:flex"></div>
        <div className="flex flex-1 items-center justify-start lg:justify-center">
          <TaskbarPinnedAppButton
            name="Start"
            icon="https://img.icons8.com/fluency/344/windows-11.png"
            onClick={(e, dispatch) => {
              dispatch(setWinModalToggled(!winModalToggled));
            }}
          />
          {pinnedApps.length > 0 && (
            <>
              {pinnedApps.map((app, index) => (
                <TaskbarPinnedAppButton
                  key={index}
                  className="hidden lg:block"
                  {...app}
                />
              ))}
            </>
          )}
        </div>
        <div className="flex flex-1 flex-row justify-end">
          <div className="m-[.1em] flex h-[2.6em] border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter">
            <div
              className="flex flex-row items-center justify-center"
              onClick={() => null}
            >
              <MdOutlineKeyboardArrowUp size={24} />
            </div>
          </div>
          <div className="relative">
            <div
              className="m-[.1em] flex h-[2.6em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter"
              onClick={() => {
                setFeaturesToggled((prev) => !prev);
                setDateToggled(false);
              }}
            >
              <div className="flex flex-row items-center justify-center px-2">
                <div className="px-[2px]">
                  <AiOutlineWifi
                    size={19}
                    title="Deri Kurniawan&#013;Internet access"
                  />
                </div>
                <div className="px-[2px]">
                  <GiSpeaker size={19} title="Speakers" />
                </div>
                <div className="px-[2px]">
                  <BatteryIcon size={19} />
                </div>
              </div>
            </div>
            {featuresToggled && (
              <motion.div
                initial={{ right: -1000 }}
                animate={{ right: -77 }}
                className="absolute -top-[281px] -right-[77px] z-10 rounded-md border-[1px] text-sm leading-normal text-gray-100 shadow-lg backdrop-blur-xl backdrop-filter"
              >
                <div className="h-70 w-80 p-4">
                  <div className="mb-4 grid w-full grid-flow-row grid-cols-3 gap-4 text-center text-xs">
                    <div>
                      <div className="grid place-content-center rounded-md border-[1px] border-gray-300 bg-transparent p-4 shadow-lg backdrop-blur-2xl backdrop-filter hover:bg-white/10">
                        <AiOutlineWifi size={19} />
                      </div>
                      <p className="mt-1">Deri Kurniawan</p>
                    </div>
                    <div>
                      <div className="grid place-content-center rounded-md border-[1px] border-gray-300 bg-transparent p-4 shadow-lg backdrop-blur-2xl backdrop-filter hover:bg-white/10">
                        <BiBluetooth size={19} />
                      </div>
                      <p className="mt-1">Bluetooth</p>
                    </div>
                    <div>
                      <div className="grid place-content-center rounded-md border-[1px] border-gray-300 bg-transparent p-4 shadow-lg backdrop-blur-2xl backdrop-filter hover:bg-white/10">
                        <IoAirplaneOutline size={19} />
                      </div>
                      <p className="mt-1">Airplane mode</p>
                    </div>
                    <div>
                      <div className="grid place-content-center rounded-md border-[1px] border-gray-300 bg-transparent p-4 shadow-lg backdrop-blur-2xl backdrop-filter hover:bg-white/10">
                        <TbBatteryEco size={19} />
                      </div>
                      <p className="mt-1">Battery Saver</p>
                    </div>
                    <div>
                      <div className="grid place-content-center rounded-md border-[1px] border-gray-300 bg-transparent p-4 shadow-lg backdrop-blur-2xl backdrop-filter hover:bg-white/10">
                        <BiMoon size={19} />
                      </div>
                      <p className="mt-1">Focus assist</p>
                    </div>
                    <div>
                      <div className="grid place-content-center rounded-md border-[1px] border-gray-300 bg-transparent p-4 shadow-lg backdrop-blur-2xl backdrop-filter hover:bg-white/10">
                        <IoAccessibilityOutline size={19} />
                      </div>
                      <p className="mt-1">Accessibility</p>
                    </div>
                  </div>
                  <div className="mb-6 flex w-full flex-row items-center">
                    <div className="mr-2">
                      <TbBrightnessDown size={19} />
                    </div>
                    <input
                      type="range"
                      value={50}
                      className="range-sm h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    />
                  </div>
                  <div className="flex w-full flex-row items-center">
                    <div className="mr-2">
                      <GiSpeaker size={19} />
                    </div>
                    <input
                      type="range"
                      value={50}
                      className="range-sm h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="relative">
            <div
              className="my-[.1em] flex h-[2.6em] rounded-md border-black bg-transparent hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-3xl hover:backdrop-filter"
              onClick={() => {
                setDateToggled((prev) => !prev);
                setFeaturesToggled(false);
              }}
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
            {dateToggled && (
              <motion.div
                initial={{ right: -1000 }}
                animate={{ right: 0 }}
                className="inverse-toggle absolute -top-[50px] -right-0 z-10 rounded-md  border-[1px] border-gray-300 bg-transparent text-sm leading-normal text-gray-100 subpixel-antialiased shadow-lg backdrop-blur-2xl backdrop-filter"
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="h-10 w-72 p-2">{dateTitle}</div>
                  <button className="p-2">
                    <IoIosArrowUp />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          <div
            className="m-[.1em] flex h-[2.6em] w-2 items-center justify-center opacity-0 hover:opacity-100"
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

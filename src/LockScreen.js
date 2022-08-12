import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BatteryIcon from "./comps/BatteryIcon";
import { TbWifi } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import { Avatar } from "flowbite-react";
import { setIsLocked } from "./redux/feat/lockScreenSlice";
import ASSETS from "./assets";

const LockScreen = () => {
  const wallpaper = useSelector((state) => state.lockScreen.wallpaper);
  const [didUnlock, setDidUnlock] = useState(false);
  const [showPIN, setShowPIN] = useState(false);

  const [hours, setHours] = useState(moment().format("HH"));
  const [minutes, setMinutes] = useState(moment().format("mm"));
  const [dayDateMonth, setDayDateMonth] = useState(
    moment().format("dddd[,] D MMMM")
  );

  const dispatch = useDispatch();

  const onPinChangeHandle = ({ target }) => {
    const PIN = target.value;

    if (PIN.length >= 6) {
      if (PIN === "123456") {
        setShowPIN(false);
        setDidUnlock(false);
        dispatch(setIsLocked(false));
      }
    }
  };

  const onClickShowPINHandle = () => {
    setShowPIN(!showPIN);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newHours = moment().format("HH");
      const newMinutes = moment().format("mm");
      const newDayDateMonth = moment().format("dddd[,] D MMMM");

      setHours(newHours);
      setMinutes(newMinutes);
      setDayDateMonth(newDayDateMonth);
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const eventHandle = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        setDidUnlock(true);
      }

      if (e.code === "Escape") {
        setDidUnlock(false);
        setShowPIN(false);
      }
    };

    window.addEventListener("keydown", eventHandle);
    return () => window.removeEventListener("keydown", eventHandle);
  });

  useEffect(() => {
    if (showPIN === true) {
      const timeout = setTimeout(() => {
        setShowPIN(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [showPIN]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url('${wallpaper}')`,
        }}
        className="bg-cover bg-no-repeat text-white"
      >
        <div className="w-screen h-screen">
          <div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <div className="mt-16 text-8xl font-semibold flex items-center">
                  <span>{hours}</span>
                  <span>&#58;</span>
                  <span>{minutes}</span>
                </div>
              </div>
              <div>
                <div className="mt-3 text-xl">{dayDateMonth}</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10">
            <div className="flex justify-center items-center">
              <div className="mx-1">
                <TbWifi size={30} />
              </div>
              <div className="mx-1">
                <BatteryIcon size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {didUnlock && (
        <div className="absolute top-0 right-0 bottom-0 left-0 w-screen h-screen backdrop-blur-xl text-white">
          <div className="flex flex-col justify-center items-center mt-28">
            <Avatar
              img={ASSETS.images.profile.require}
              rounded={true}
              size="xl"
            />
            <h1 className="text-2xl font-semibold mt-4">Deri Kurniawan</h1>
            <div className="mt-7 bg-gray-800 bg-opacity-70 backdrop-blur-xl">
              <input
                className="w-[50vw] h-[5vh] md:w-[23vw] pr-[1.85em] bg-transparent placeholder-white px-2 tracking-widest"
                type={showPIN ? "text" : "password"}
                onChange={onPinChangeHandle}
                placeholder="PIN"
                maxLength={6}
              />
              <div className="absolute top-[2.5px] right-[2px] p-1">
                <button onClick={onClickShowPINHandle}>
                  <VscEye size={18} />
                </button>
              </div>
            </div>
            <div
              className="mt-4 hover:text-gray-300 cursor-pointer"
              onClick={() => alert("Your PIN is 123456")}
            >
              I forgot my PIN
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LockScreen;

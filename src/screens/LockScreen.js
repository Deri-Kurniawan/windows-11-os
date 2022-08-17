import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BatteryIcon from "../comps/BatteryIcon";
import { TbWifi } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import { IoAccessibilityOutline, IoPower } from "react-icons/io5";
import { setIsLocked } from "../redux/feat/lockScreenSlice";

const CONFIGS = {
  validtPINLoadingTimeout: 1000,
  hidePINAutoTimeout: 3000,
  timeFormat: {
    hours: "HH",
    minutes: "mm",
    dayDateMonth: "dddd[,] D MMMM",
  },
};

const LockScreen = () => {
  const wallpaper = useSelector((state) => state.lockScreen.wallpaper);
  const profileImage = useSelector((state) => state.desktop.profileImage);
  const validPIN = useSelector((state) => state.lockScreen.validPIN);
  const [loginIsSuccess, setLoginIsSuccess] = useState(false);
  const [screenDidUnlock, setScreenDidUnlock] = useState(false);
  const [showPINText, setShowPINText] = useState(false);
  const [PINAttemptIsWrong, setPINAttemptIsWrong] = useState(false);

  const [hours, setHours] = useState(moment().format(CONFIGS.timeFormat.hours));
  const [minutes, setMinutes] = useState(
    moment().format(CONFIGS.timeFormat.minutes)
  );
  const [dayDateMonth, setDayDateMonth] = useState(
    moment().format(CONFIGS.timeFormat.dayDateMonth)
  );

  const dispatch = useDispatch();

  const onChangePIN = ({ target }) => {
    target.value = target.value.trim();
    const PIN = target.value;

    if (PIN.length >= 6) {
      if (PIN === validPIN) {
        setLoginIsSuccess(true);

        setTimeout(() => {
          setShowPINText(false);
          setScreenDidUnlock(false);
          dispatch(setIsLocked(false));
          setLoginIsSuccess(false);
        }, CONFIGS.validtPINLoadingTimeout);
        return;
      }
      setPINAttemptIsWrong(true);
    }
  };

  const onClickShowPIN = () => {
    setShowPINText(!showPINText);
  };

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      const { hours, minutes, dayDateMonth } = CONFIGS.timeFormat;
      const current = {
        hours: moment().format(hours),
        minutes: moment().format(minutes),
        dayDateMonth: moment().format(dayDateMonth),
      };

      setHours(current.hours);
      setMinutes(current.minutes);
      setDayDateMonth(current.dayDateMonth);
    }, 1000);

    const keydownListenerHandle = (e) => {
      if (
        e.code === "Space" ||
        e.code === "Enter" ||
        e.code === "NumpadEnter"
      ) {
        setScreenDidUnlock(true);
      }

      if (e.code === "Escape") {
        setScreenDidUnlock(false);
        setShowPINText(false);
      }
    };

    window.addEventListener("keydown", keydownListenerHandle);

    return () => {
      clearInterval(updateTimeInterval);
      window.removeEventListener("keydown", keydownListenerHandle);
    };
  }, []);

  useEffect(() => {
    if (showPINText === true) {
      const timeout = setTimeout(() => {
        setShowPINText(false);
      }, CONFIGS.hidePINAutoTimeout);

      return () => clearTimeout(timeout);
    }
  }, [showPINText]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `url('${wallpaper}')`,
        }}
        className="text-white bg-no-repeat bg-cover"
        onClick={() => setScreenDidUnlock(true)}
      >
        <div className="w-screen h-screen">
          <div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <div className="flex items-center mt-16 font-semibold text-8xl">
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
            <div className="flex items-center justify-center">
              <div className="mx-2">
                <TbWifi size={30} />
              </div>
              <div className="mx-2">
                <BatteryIcon size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {screenDidUnlock && (
        <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen text-white backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center mt-28">
            <img
              className="w-48 h-48 rounded-full"
              src={profileImage}
              alt="User Profile"
            />
            <h1 className="mt-4 text-2xl font-semibold">Deri Kurniawan</h1>
            {loginIsSuccess ? (
              <div className="flex flex-col items-center justify-center mt-3">
                <div className="w-16 h-16 my-3 bg-transparent border-t-4 border-r-4 border-white border-dotted rounded-full animate-spin"></div>
                <div className="mt-3 text-xl font-semibold">Welcome</div>
              </div>
            ) : (
              <Fragment>
                {PINAttemptIsWrong ? (
                  <Fragment>
                    <div className="mt-7">
                      <div className="mt-4">
                        The PIN is incorrect. Try again.
                      </div>
                    </div>
                    <button
                      className="mt-7 bg-white bg-opacity-30 px-14 py-2 text-center rounded-md ring-2 ring-white border-[1px] backdrop-blur-xl border-black cursor-pointer active:bg-opacity-20"
                      onClick={() => setPINAttemptIsWrong(false)}
                      autoFocus={true}
                    >
                      <span className="font-semibold">OK</span>
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="bg-gray-800 rounded-sm mt-7 bg-opacity-70 backdrop-blur-xl">
                      <input
                        className="w-[15em] h-[2em] md:w-[20em] pr-[1.85em] bg-transparent placeholder-white px-2 tracking-widest rounded-sm"
                        type={showPINText ? "text" : "password"}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        autoFocus={screenDidUnlock}
                        placeholder="PIN"
                        onChange={onChangePIN}
                      />
                      <div className="absolute top-[2.5px] right-[2px] p-1">
                        <button onClick={onClickShowPIN}>
                          <VscEye size={18} />
                        </button>
                      </div>
                    </div>
                    <div
                      className="p-1 mt-4 cursor-pointer hover:text-gray-300"
                      onClick={() => alert(`Your PIN is ${validPIN}`)}
                    >
                      I forgot my PIN
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
            <div className="absolute hidden lg:block bottom-10 right-10">
              <div className="flex items-center justify-center">
                <button className="mx-2" title="Internet">
                  <TbWifi size={30} />
                </button>
                <button className="mx-2" title="Accessibility">
                  <IoAccessibilityOutline size={24} />
                </button>
                <button className="mx-2" title="Power">
                  <IoPower size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LockScreen;

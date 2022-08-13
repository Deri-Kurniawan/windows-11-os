import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BatteryIcon from "../comps/BatteryIcon";
import { TbWifi } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import { IoAccessibilityOutline, IoPower } from "react-icons/io5";
import { setIsLocked } from "../redux/feat/lockScreenSlice";
import ASSETS from "../assets";

const CONFIGS = {
  correctPIN: "123123",
  correctPINLoadingTimeout: 3000,
  hidePINAutoTimeout: 3000,
  timeFormat: {
    hours: "HH",
    minutes: "mm",
    dayDateMonth: "dddd[,] D MMMM",
  },
};

const LockScreen = () => {
  const wallpaper = useSelector((state) => state.lockScreen.wallpaper);
  const [screenDidUnlock, setScreenDidUnlock] = useState(false);
  const [loginIsSuccess, setLoginIsSuccess] = useState(false);
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
      if (PIN === CONFIGS.correctPIN) {
        setLoginIsSuccess(true);

        setTimeout(() => {
          setShowPINText(false);
          setScreenDidUnlock(false);
          dispatch(setIsLocked(false));
          setLoginIsSuccess(false);
        }, CONFIGS.correctPINLoadingTimeout);
        return;
      }
      setPINAttemptIsWrong(true);
    }
  };

  const onClickShowPIN = () => {
    setShowPINText(!showPINText);
  };

  const _updateTimePeriodically = () => {
    const { hours, minutes, dayDateMonth } = CONFIGS.timeFormat;

    const interval = setInterval(() => {
      const current = {
        hours: moment().format(hours),
        minutes: moment().format(minutes),
        dayDateMonth: moment().format(dayDateMonth),
      };

      setHours(current.hours);
      setMinutes(current.minutes);
      setDayDateMonth(current.dayDateMonth);
    }, 1000);

    return () => clearInterval(interval);
  };

  const _keydownListenerPeriodically = () => {
    const eventHandle = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        setScreenDidUnlock(true);
      }

      if (e.code === "Escape") {
        setScreenDidUnlock(false);
        setShowPINText(false);
      }
    };

    window.addEventListener("keydown", eventHandle);
    return () => window.removeEventListener("keydown", eventHandle);
  };

  const _autoHidePINText = (showPINText, miliseconds) => {
    if (showPINText === true) {
      const timeout = setTimeout(() => {
        setShowPINText(false);
      }, miliseconds);

      return () => clearTimeout(timeout);
    }
  };

  useEffect(() => {
    _updateTimePeriodically();
    _keydownListenerPeriodically();
  }, []);

  useEffect(() => {
    _autoHidePINText(showPINText, CONFIGS.hidePINAutoTimeout);
  }, [showPINText]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `url('${wallpaper}')`,
        }}
        className="bg-cover bg-no-repeat text-white"
        onClick={() => setScreenDidUnlock(true)}
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
        <div className="absolute top-0 right-0 bottom-0 left-0 w-screen h-screen backdrop-blur-xl text-white">
          <div className="flex flex-col justify-center items-center mt-28">
            <img
              className="rounded-full w-48 h-48"
              src={ASSETS.images.profile.require}
              alt=""
            />
            <h1 className="text-2xl font-semibold mt-4">Deri Kurniawan</h1>
            {loginIsSuccess ? (
              <div className="mt-3 flex flex-col justify-center items-center">
                <div className="my-3 w-16 h-16 border-white border-t-4 border-r-4 border-dotted rounded-full bg-transparent animate-spin"></div>
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
                    <div className="mt-7 bg-gray-800 bg-opacity-70 backdrop-blur-xl rounded-sm">
                      <input
                        className="w-[15em] h-[2em] md:w-[20em] pr-[1.85em] bg-transparent placeholder-white px-2 tracking-widest rounded-sm"
                        type={showPINText ? "text" : "password"}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        autoComplete="off"
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
                      className="mt-4 hover:text-gray-300 cursor-pointer"
                      onClick={() => alert(`Your PIN is ${CONFIGS.correctPIN}`)}
                    >
                      I forgot my PIN
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
            <div className="hidden lg:block absolute bottom-10 right-10">
              <div className="flex justify-center items-center">
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

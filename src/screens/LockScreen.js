import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BatteryIcon from "../comps/BatteryIcon";
import { TbWifi } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import { IoAccessibilityOutline, IoPower } from "react-icons/io5";
import { setDesktopIsLocked } from "../redux/feat/lockScreenSlice";
import { motion } from "framer-motion";
import { profiles } from "../assets";
import NotificationFrom from "../comps/NotificationFrom";

const CONFIGS = {
  loadingAfterLoginIsSuccessOnMs: 1000,
  autoHidePINOnMs: 3000,
  timeFormat: {
    hours: "HH",
    minutes: "mm",
    dayDateMonth: "dddd[,] D MMMM",
  },
};

const promiseTimeout = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const LockScreen = () => {
  const wallpaper = useSelector((state) => state.lockScreen.wallpaper);
  const profileImage = useSelector((state) => state.desktop.profileImage);
  const validPIN = useSelector((state) => state.lockScreen.validPIN);

  const [loginIsSuccess, setLoginIsSuccess] = useState(false);
  const [PINInputScreen, setPINInputScreen] = useState(false);
  const [PINTextIsShowed, setPINTextIsShowed] = useState(false);
  const [PINAttemptIsWrong, setPINAttemptIsWrong] = useState(false);
  const [helpForgotPIN, setHelpForgotPIN] = useState(false);

  const [hours, setHours] = useState(moment().format(CONFIGS.timeFormat.hours));
  const [minutes, setMinutes] = useState(
    moment().format(CONFIGS.timeFormat.minutes)
  );
  const [dayDateMonth, setDayDateMonth] = useState(
    moment().format(CONFIGS.timeFormat.dayDateMonth)
  );

  const dispatch = useDispatch();

  const changePINHandler = ({ target }) => {
    target.value = target.value.trim();
    const PIN = target.value;

    if (PIN.length >= 6) {
      if (PIN === validPIN) {
        setLoginIsSuccess(true);

        setTimeout(() => {
          setPINTextIsShowed(false);
          setPINInputScreen(false);
          dispatch(setDesktopIsLocked(false));
          setLoginIsSuccess(false);
        }, CONFIGS.loadingAfterLoginIsSuccessOnMs);
        return;
      }
      setPINAttemptIsWrong(true);
    }
  };

  const clickShowPINHandler = () => {
    setPINTextIsShowed(!PINTextIsShowed);
  };

  useEffect(() => {
    const updateTimePeriodically = setInterval(() => {
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

    const keydownEventHandler = (e) => {
      if (
        e.code === "Space" ||
        e.code === "Enter" ||
        e.code === "NumpadEnter"
      ) {
        setPINInputScreen(true);
      }

      if (e.code === "Escape") {
        setPINInputScreen(false);
        setPINTextIsShowed(false);
      }
    };

    window.addEventListener("keydown", keydownEventHandler);

    return () => {
      clearInterval(updateTimePeriodically);
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  useEffect(() => {
    if (PINTextIsShowed === true) {
      const timeout = setTimeout(() => {
        setPINTextIsShowed(false);
      }, CONFIGS.autoHidePINOnMs);

      return () => clearTimeout(timeout);
    }
  }, [PINTextIsShowed]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url('${wallpaper}')`,
        }}
        className="bg-cover bg-no-repeat text-white"
        onClick={() => setPINInputScreen(true)}
      >
        <div className="h-screen w-screen">
          <div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <div className="mt-16 flex items-center text-8xl font-semibold">
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

      {PINInputScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 bottom-0 left-0 right-0 h-screen w-screen text-white backdrop-blur-xl"
        >
          <div className="mt-28 flex flex-col items-center justify-center">
            <img
              className="h-48 w-48 rounded-full"
              src={profileImage}
              alt="User Profile"
            />
            <h1 className="mt-4 text-2xl font-semibold">Deri Kurniawan</h1>
            {loginIsSuccess ? (
              <div className="mt-3 flex flex-col items-center justify-center">
                <div className="my-3 h-16 w-16 animate-spin rounded-full border-t-4 border-r-4 border-dotted border-white bg-transparent"></div>
                <div className="mt-3 text-xl font-semibold">Welcome</div>
              </div>
            ) : (
              <>
                {PINAttemptIsWrong ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-7"
                    >
                      <div className="mt-4">
                        The PIN is incorrect. Try again.
                      </div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-7 cursor-pointer rounded-md border-[1px] border-black bg-white bg-opacity-30 px-14 py-2 text-center ring-2 ring-white backdrop-blur-xl active:bg-opacity-20"
                      onClick={() => setPINAttemptIsWrong(false)}
                      autoFocus={true}
                    >
                      <span className="font-semibold">OK</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <div className="mt-7 rounded-sm bg-gray-800 bg-opacity-70 backdrop-blur-xl">
                      <input
                        className="h-[2em] w-[15em] rounded-sm bg-transparent px-2 pr-[1.85em] tracking-widest placeholder-white md:w-[20em]"
                        type={PINTextIsShowed ? "text" : "password"}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        autoFocus={PINInputScreen}
                        placeholder="PIN"
                        onChange={changePINHandler}
                      />
                      <div className="absolute top-[2.5px] right-[2px] p-1">
                        <button onClick={clickShowPINHandler}>
                          <VscEye size={18} />
                        </button>
                      </div>
                    </div>
                    <div
                      className="mt-4 cursor-pointer p-1 hover:text-gray-300"
                      onClick={() => {
                        setHelpForgotPIN(true);
                        promiseTimeout(20000).then(() =>
                          setHelpForgotPIN(false)
                        );
                      }}
                    >
                      I forgot my PIN
                    </div>
                  </>
                )}
              </>
            )}
            <div className="absolute bottom-10 right-10 hidden lg:block">
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
        </motion.div>
      )}
      {helpForgotPIN && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 z-50 p-5"
        >
          <NotificationFrom
            from="Deri Kurniawan"
            image={profiles.deri}
            message={
              <>
                Hello There!
                <br /> The Secret PIN is{" "}
                <span className="font-semibold">{validPIN}</span>
              </>
            }
          />
        </motion.div>
      )}
    </>
  );
};

export default LockScreen;

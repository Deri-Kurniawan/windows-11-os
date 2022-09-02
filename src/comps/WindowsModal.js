import { IoPower } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import WindowsModalPinnedAppbutton from "./WindowsModalPinnedAppButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { setWinModalToggled } from "../redux/feat/desktopSlice";

const WindowsModal = () => {
  const originShortcutApps = useSelector((state) => state.desktop.pinnedApps);
  const profileImage = useSelector((state) => state.desktop.profileImage);
  const winModalToggled = useSelector((state) => state.desktop.winModalToggled);
  const [shortcutApps, setShortcutApps] = useState(originShortcutApps);

  const dispatch = useDispatch();

  const onChangeSearchText = ({ target }) => {
    if (target.value === "") {
      setShortcutApps(originShortcutApps);
      return;
    }

    const filteredApps = originShortcutApps.filter((app) =>
      app.name.toLowerCase().includes(target.value.toLowerCase())
    );
    setShortcutApps(filteredApps);
  };

  useEffect(() => {
    const dismissHandle = (e) => {
      if (e.key === "Escape") {
        dispatch(setWinModalToggled());
      }
    };

    window.addEventListener("keydown", dismissHandle);

    return () => window.addEventListener("keydown", dismissHandle);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={`${
        winModalToggled === true ? "absolute" : "hidden"
      } top-[2vh] h-[87vh] w-full rounded-md border-[1px] border-gray-500 bg-transparent text-white subpixel-antialiased backdrop-blur-2xl backdrop-filter lg:top-[5vh] lg:left-[30vw] lg:h-[87vh] lg:w-[40vw]`}
    >
      <div className="bg-red-5000 h-[77vh] overflow-hidden px-4 py-2">
        <input
          type="search"
          className="my-4 h-8 w-full rounded-sm border-t-0 border-b-2 border-l-0 border-r-0 border-b-white bg-transparent placeholder:text-white focus:outline-none"
          placeholder="Type here to search"
          onChange={onChangeSearchText}
        />

        <span className="pl-4">Pinned</span>

        {shortcutApps.length > 0 ? (
          <div className="flex flex-row flex-wrap content-start items-start justify-start">
            {shortcutApps.map((app, index) => (
              <WindowsModalPinnedAppbutton
                className="my-2"
                key={index}
                {...app}
              />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-center">No Apps Found</p>
        )}
      </div>

      <div className="absolute bottom-0 h-[10vh] w-full border-t-[1px] border-gray-500">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center">
            <img
              className="mr-2 h-8 w-8 rounded-full"
              src={profileImage}
              alt=""
            />
            <span>Deri Kurniawan</span>
          </div>
          <IoPower size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default WindowsModal;

import Draggable from "react-draggable";
import { BsDash } from "react-icons/bs";
import { IoIosSquareOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeRestore } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { FaPaintBrush } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelMaximizeActiveWindow,
  maximizeActiveWindow,
  minimizeActiveWindow,
  removeActiveWindow,
  setWallpaper,
} from "../redux/feat/desktopSlice";
import { Avatar } from "flowbite-react";
import { wallpapers } from "../assets";
import { motion } from "framer-motion";

const SettingsApp = ({
  id,
  title = "",
  height = "80vh",
  width = "80vw",
  x = 10,
  y = 10,
  minimized = false,
  maximized = false,
}) => {
  const profileImage = useSelector((state) => state.desktop.profileImage);
  const wallpaperActive = useSelector((state) => state.desktop.wallpaper);
  const dispatch = useDispatch();

  return (
    <Draggable
      handle="#draggable"
      defaultPosition={{ x: maximized ? 0 : y, y: maximized ? 0 : x }}
      position={maximized ? { x: 0, y: 0 } : null}
      onDrag={(e, data) => {
        dispatch(cancelMaximizeActiveWindow(id));
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={
          !maximized
            ? { width: width, height: height }
            : { width: "100vw", height: "93vh" }
        }
        className={`absolute inverse-toggle shadow-lg text-gray-100 text-sm subpixel-antialiased  bg-transparent backdrop-blur-2xl backdrop-filter rounded-md leading-normal overflow-hidden z-10 border-[1px] border-gray-300`}
      >
        <div className="flex items-center justify-between">
          <div
            className="flex flex-grow py-2 pl-2 hover:cursor-grab active:cursor-grabbing"
            id="draggable"
          >
            <button className="mr-2">
              <BiArrowBack />
            </button>
            {title}
          </div>
          <div className="flex items-center justify-center text-white">
            <div
              className="flex items-center p-3 hover:bg-white hover:bg-opacity-10"
              title="Minimize"
              onClick={() => {
                dispatch(minimizeActiveWindow({ id, minimized: true }));
              }}
            >
              <BsDash />
            </div>
            <div
              className="flex items-center p-3 ml-2 hover:bg-white hover:bg-opacity-10"
              title={maximized ? "Restore" : "Maximize"}
              onClick={() => {
                dispatch(maximizeActiveWindow(id));
              }}
            >
              {maximized ? <VscChromeRestore /> : <IoIosSquareOutline />}
            </div>
            <div
              className="flex items-center p-3 ml-2 hover:bg-red-500"
              title="Close"
              onClick={() => {
                dispatch(removeActiveWindow(id));
              }}
            >
              <IoCloseOutline />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="hidden col-span-3 px-2 pb-10 lg:grid">
            {/* Sidebar */}
            <div className="mt-2">
              {/* Header */}
              <div className="flex flex-row items-center justify-start">
                <Avatar img={profileImage} size="md" rounded={true} />
                <div className="flex flex-col items-start justify-center ml-3">
                  <p>Deri Kurniawan</p>
                  <p>deri.netuchi@gmail</p>
                </div>
              </div>
              {/* Search */}
              <input
                type="search"
                className="w-full h-8 my-4 bg-gray-900 border-t-0 border-b-2 border-l-0 border-r-0 rounded-sm placeholder:text-white border-b-white focus:outline-none"
                placeholder="Find a setting"
              />
              {/* Settings Options */}
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-center justify-start w-full p-2 bg-transparent bg-white rounded-md bg-opacity-10 backdrop-blur-3xl backdrop-filter">
                  <div className="mr-2">
                    <FaPaintBrush size={18} />
                  </div>
                  <span>Personalization</span>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="grid col-span-12 lg:col-span-9">
            <div className="px-5 pb-5 lg:px-2 lg:p-2">
              <h1 className="mb-3 text-xl font-bold">Personalization</h1>
              <div className="flex flex-col items-start justify-start lg:flex-row">
                <div className="flex flex-1">
                  <img
                    className="w-40 rounded-lg"
                    src={wallpaperActive}
                    alt=""
                  />
                </div>
                <div className="flex flex-col flex-1 mt-3 lg:mt-0">
                  <h2 className="font-bold text-md">Select a theme to apply</h2>

                  <div className="grid grid-cols-3 gap-2 mt-2 grid-row">
                    {wallpapers.length > 0 && (
                      <>
                        {wallpapers.map((wallpaper, index) => (
                          <button
                            key={index}
                            className="rounded-lg hover:ring-blue-300 active:opacity-50"
                            onClick={() => dispatch(setWallpaper(index))}
                          >
                            <img
                              className="rounded-lg"
                              src={wallpaper}
                              alt=""
                            />
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
};

export default SettingsApp;

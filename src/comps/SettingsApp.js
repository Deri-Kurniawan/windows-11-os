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
        className="inverse-toggle absolute z-10 overflow-hidden rounded-md border-[1px]  border-gray-300 bg-transparent text-sm leading-normal text-gray-100 subpixel-antialiased shadow-lg backdrop-blur-2xl backdrop-filter"
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
              className="ml-2 flex items-center p-3 hover:bg-white hover:bg-opacity-10"
              title={maximized ? "Restore" : "Maximize"}
              onClick={() => {
                dispatch(maximizeActiveWindow(id));
              }}
            >
              {maximized ? <VscChromeRestore /> : <IoIosSquareOutline />}
            </div>
            <div
              className="ml-2 flex items-center p-3 hover:bg-red-500"
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
          <div className="hidden px-2 pb-10 md:col-span-4 lg:col-span-3 lg:grid">
            {/* Sidebar */}
            <div className="mt-2">
              {/* Header */}
              <div className="flex flex-row items-center justify-start">
                <img
                  className="h-8 w-8 rounded-full"
                  src={profileImage}
                  alt=""
                />
                <div className="ml-3 flex flex-col items-start justify-center">
                  <p>Deri Kurniawan</p>
                  <p>deri.netuchi@gmail.com</p>
                </div>
              </div>
              {/* Search */}
              <input
                type="search"
                className="my-4 h-8 w-full rounded-sm border-t-0 border-b-2 border-l-0 border-r-0 border-b-white bg-transparent placeholder:text-white focus:outline-none"
                placeholder="Find a setting"
              />
              {/* Settings Options */}
              <div className="flex flex-col items-start justify-start">
                <div className="flex w-full flex-row items-center justify-start rounded-md bg-transparent bg-white bg-opacity-10 p-2 backdrop-blur-3xl backdrop-filter">
                  <div className="mr-2">
                    <FaPaintBrush size={18} />
                  </div>
                  <span>Personalization</span>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="col-span-12 grid md:col-span-8 lg:col-span-9">
            <div className="px-5 pb-5 lg:p-2 lg:px-2">
              <h1 className="mb-3 text-xl font-bold">Personalization</h1>
              <div className="flex flex-col items-start justify-start lg:flex-row">
                <div className="flex flex-1">
                  <img
                    className="w-40 rounded-lg"
                    src={wallpaperActive}
                    alt=""
                  />
                </div>
                <div className="mt-3 flex flex-1 flex-col lg:mt-0">
                  <h2 className="text-md font-bold">Select a theme to apply</h2>

                  <div className="grid-row mt-2 grid grid-cols-3 gap-2">
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

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
      <div
        style={
          !maximized
            ? { width: width, height: height }
            : { width: "100vw", height: "93vh" }
        }
        className={`absolute inverse-toggle shadow-lg text-gray-100 text-sm subpixel-antialiased  bg-transparent backdrop-blur-2xl backdrop-filter rounded-md leading-normal overflow-hidden z-10 border-[1px] border-gray-300`}
      >
        <div className="flex justify-between items-center">
          <div
            className="pl-2 py-2 flex flex-grow hover:cursor-grab active:cursor-grabbing"
            id="draggable"
          >
            <button className="mr-2">
              <BiArrowBack />
            </button>
            {title}
          </div>
          <div className="flex justify-center items-center text-white">
            <div
              className="p-3 flex items-center hover:bg-white hover:bg-opacity-10"
              title="Minimize"
              onClick={() => {
                dispatch(minimizeActiveWindow({ id, minimized: true }));
              }}
            >
              <BsDash />
            </div>
            <div
              className="ml-2 p-3 flex items-center hover:bg-white hover:bg-opacity-10"
              title={maximized ? "Restore" : "Maximize"}
              onClick={() => {
                dispatch(maximizeActiveWindow(id));
              }}
            >
              {maximized ? <VscChromeRestore /> : <IoIosSquareOutline />}
            </div>
            <div
              className="ml-2 p-3 flex items-center hover:bg-red-500"
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
          <div className="hidden lg:grid col-span-3 px-2 pb-10">
            {/* Sidebar */}
            <div className="mt-2">
              {/* Header */}
              <div className="flex flex-row justify-start items-center">
                <Avatar img={profileImage} size="md" rounded={true} />
                <div className="flex flex-col justify-center items-start ml-3">
                  <p>Deri Kurniawan</p>
                  <p>deri.netuchi@gmail</p>
                </div>
              </div>
              {/* Search */}
              <input
                type="search"
                className="bg-gray-900 h-8 rounded-sm w-full placeholder:text-white my-4 border-b-white border-t-0 border-r-0 border-b-2 border-l-0 focus:outline-none"
                placeholder="Find a setting"
              />
              {/* Settings Options */}
              <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row justify-start items-center w-full p-2 rounded-md bg-transparent bg-white bg-opacity-10 backdrop-blur-3xl backdrop-filter">
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
              <h1 className="text-xl font-bold mb-3">Personalization</h1>
              <div className="flex flex-col lg:flex-row justify-start items-start">
                <div className="flex flex-1">
                  <img
                    className="w-40 rounded-lg"
                    src={wallpaperActive}
                    alt=""
                  />
                </div>
                <div className="flex flex-col flex-1 mt-3 lg:mt-0">
                  <h2 className="text-md font-bold">Select a theme to apply</h2>

                  <div className="grid grid-row grid-cols-3 gap-2 mt-2">
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
      </div>
    </Draggable>
  );
};

export default SettingsApp;

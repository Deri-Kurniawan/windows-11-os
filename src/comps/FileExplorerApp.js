import Draggable from "react-draggable";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsArrowUpShort,
  BsCreditCard2FrontFill,
  BsDash,
} from "react-icons/bs";
import { IoIosSquareOutline } from "react-icons/io";
import {
  IoCloseOutline,
  IoReloadOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { VscChromeRestore, VscSearch } from "react-icons/vsc";
import { BiPaste } from "react-icons/bi";
import { FaRegShareSquare, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  cancelMaximizeActiveWindow,
  maximizeActiveWindow,
  minimizeActiveWindow,
  removeActiveWindow,
} from "../redux/feat/desktopSlice";
import { icons } from "../assets";
import { TbArrowsSort, TbCirclePlus, TbCut } from "react-icons/tb";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdOutlineCopyAll,
} from "react-icons/md";
import { CgScan } from "react-icons/cg";
import { HiOutlineViewList } from "react-icons/hi";
import { RiComputerFill } from "react-icons/ri";

const FileExplorerApp = ({
  id,
  title = "",
  height = "80vh",
  width = "80vw",
  x = 10,
  y = 10,
  minimized = false,
  maximized = false,
}) => {
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
        className={`absolute inverse-toggle shadow-lg text-gray-100 text-sm subpixel-antialiased bg-gray-900 rounded-md leading-normal overflow-hidden z-10 border-[1px] border-gray-300`}
      >
        {/* Window Actions */}
        <div className="flex items-center justify-between">
          <div
            className="flex flex-grow py-2 pl-2 hover:cursor-grab active:cursor-grabbing"
            id="draggable"
          >
            <div className="mr-2">
              <img
                className="w-4 h-4"
                src={icons.apps.winFileExplorer}
                alt=""
              />
            </div>
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
        <div className="flex flex-col">
          {/* Tools */}
          <div className="hidden lg:block border-b-[1px] border-gray-300 py-2">
            <div className="flex flex-row w-full">
              <button className="flex items-center justify-center px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                <TbCirclePlus size={23} /> New <MdKeyboardArrowDown />
              </button>
              <div className="border-x-[1px] border-sky-300">
                <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <TbCut size={23} />
                </button>
                <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <MdOutlineCopyAll size={23} />
                </button>
                <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <BiPaste size={23} />
                </button>
                <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <CgScan size={23} />
                </button>
                <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <FaRegShareSquare size={23} />
                </button>
                <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <IoTrashOutline size={23} />
                </button>
              </div>
              <div className="flex border-r-[1px] border-sky-300">
                <button className="flex items-center justify-center px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <TbArrowsSort size={23} /> Sort <MdKeyboardArrowDown />
                </button>
                <button className="flex items-center justify-center px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                  <HiOutlineViewList size={23} /> View <MdKeyboardArrowDown />
                </button>
              </div>
              <button className="px-3 py-1 mx-2 rounded-md hover:bg-white hover:bg-opacity-10">
                <MdMoreHoriz size={23} />
              </button>
            </div>
          </div>
          {/* Navigation */}
          <div className="hidden lg:block border-b-[1px] border-gray-300 py-2">
            <div className="flex flex-row w-full px-1">
              <button className="px-1">
                <BsArrowLeftShort size={23} />
              </button>
              <button className="px-1">
                <BsArrowRightShort size={23} />
              </button>
              <button className="px-1">
                <MdKeyboardArrowDown />
              </button>
              <button className="px-1">
                <BsArrowUpShort size={23} />
              </button>
              <div className="flex flex-1 flex-row justify-between items-center border-[1px] border-white px-2 mx-2">
                <div className="flex">
                  <button className="pr-1">
                    <FaStar color="gold" />
                  </button>
                  <button className="pr-1">
                    <MdKeyboardArrowRight />
                  </button>
                  <span className="pr-10">Quick access</span>
                </div>
                <div className="flex">
                  <button className="flex pl-2">
                    <MdKeyboardArrowDown />
                  </button>
                  <button className="flex pl-2">
                    <IoReloadOutline size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mx-2 bg-transparent">
                <div className="relative text-white focus-within:text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      className="p-1 focus:outline-none focus:shadow-outline"
                    >
                      <VscSearch />
                    </button>
                  </span>
                  <input
                    type="search"
                    name="q"
                    className="py-2 text-sm bg-transparent pl-10 focus:outline-none placeholder:text-white border-[1px] border-white"
                    placeholder="Search"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Container Content */}
          <div className="grid w-full grid-cols-12">
            <div className="hidden lg:grid lg:col-span-2 border-r-[1px] border-white">
              <div className="flex flex-col">
                <div className="flex flex-row justify-start items-center bg-white bg-opacity-10 px-2 py-[1px]">
                  <FaStar color="gold" className="mr-1" />
                  Quick access
                </div>
                <div className="flex flex-row justify-start items-center hover:bg-white hover:bg-opacity-10 px-2 py-[1px]">
                  <BsCreditCard2FrontFill color="skyblue" className="mr-1" />
                  Desktop
                </div>
                <div className="flex flex-row justify-start items-center hover:bg-white hover:bg-opacity-10 px-2 py-[1px]">
                  <RiComputerFill color="skyblue" className="mr-1" />
                  This PC
                </div>
              </div>
            </div>
            <div
              className={`grid col-span-12 lg:col-span-10 h-[73.5vh] ${
                maximized
                  ? "scroll-y-hidden lg:h-71vh lg:overflow-y-scroll"
                  : "overflow-y-scroll lg:h-[57.8vh]"
              }`}
            >
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="pl-2 py-1 border-r-[1px] border-white">
                      Name
                    </th>
                    <th className="pl-2 py-1 border-r-[1px] border-white">
                      Status
                    </th>
                    <th className="pl-2 py-1 border-r-[1px] border-white">
                      Date Modified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                  <tr className="hover:bg-white hover:bg-opacity-10">
                    <td className="pl-2">Deri_Kurniawan_CV.pdf</td>
                    <td className="pl-2"></td>
                    <td className="pl-2">15/05/2022 17:33</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FileExplorerApp;

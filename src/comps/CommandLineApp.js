import { useState } from "react";
import Draggable from "react-draggable";
import { BsDash } from "react-icons/bs";
import { IoIosSquareOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeRestore } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { icons } from "../assets";
import { WIN_FEATURES } from "../const/winSize";
import {
  cancelMaximizeActiveWindow,
  maximizeActiveWindow,
  minimizeActiveWindow,
  removeActiveWindow,
} from "../redux/feat/desktopSlice";

const CommandLineApp = ({
  id,
  title = "",
  height = "80vh",
  width = "80vw",
  x = 10,
  y = 10,
  minimized = false,
  maximized = false,
}) => {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentTerminalDirectory, setCurrentTerminalDirectory] =
    useState("C:\\Users\\Deri");

  const dispatch = useDispatch();

  const onKeydownTerminalInput = (e) => {
    if (e.key === "Enter") {
      // rules for the command
      const command = e.target.value;
      let output = null;
      let ignoreDefaultError = false;

      if (command === "exit") {
        dispatch(removeActiveWindow(id));
        return;
      }

      if (command === "clear" || command === "cls") {
        setTerminalHistory([]);
        e.target.value = "";
        return;
      }

      if (command === "") {
        output = "";
        ignoreDefaultError = true;
      }

      if (command === "linkedin") {
        window.open(
          "https://linkedin.com/in/deri-kurniawan",
          "_blank",
          WIN_FEATURES
        );
        output = "Opening LinkedIn Profile";
        ignoreDefaultError = true;
      }

      if (command === "github") {
        window.open(
          "https://github.com/deri-kurniawan",
          "_blank",
          WIN_FEATURES
        );
        output = "Opening GitHub Profile";
        ignoreDefaultError = true;
      }

      if (command === "whatsapp") {
        const textMessage = encodeURIComponent(
          "Hello Deri Kurniawan!, [your message here]"
        );
        window.open(
          `https://wa.me/+625720959031?text=${textMessage}`,
          "_blank",
          WIN_FEATURES
        );
        output = "Opening WhatsApp";
        ignoreDefaultError = true;
      }

      if (command.includes("code")) {
        window.open("https://vscode.dev", "_blank", WIN_FEATURES);
        output = "Opening Visual Studio Code";
        ignoreDefaultError = true;
      }

      const newDir = command.split(" ")[1];
      if (newDir !== "cd" && command.includes("cd")) {
        if (newDir) {
          const formattedDir = newDir.replace("/", "\\");
          setCurrentTerminalDirectory(formattedDir);
          ignoreDefaultError = true;
        } else {
          output = currentTerminalDirectory;
          ignoreDefaultError = true;
        }
      }

      if (command === "help" || command === "?") {
        output = (
          <p>
            Available commands: <br />
            help - show this help message <br />
            github - open GitHub <br />
            linkedin - open LinkedIn <br />
            whatsapp - open WhatsApp <br />
            code - open VS Code <br />
            cd - change directory <br />
            clear | cls - clear the terminal screen <br />
            exit: close the terminal <br />
          </p>
        );
        ignoreDefaultError = true;
      }

      if (ignoreDefaultError === false) {
        output = (
          <p>
            '{command}' is not recognized as an internal or external command,
            operable program or batch file.
          </p>
        );
      }

      setTerminalHistory([
        ...terminalHistory,
        {
          command,
          output,
          currentDirectory: currentTerminalDirectory,
        },
      ]);
      e.target.value = "";
    }
  };

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
        className="inverse-toggle absolute z-10 overflow-hidden rounded-md bg-gray-800 font-mono text-sm leading-normal text-gray-100 subpixel-antialiased shadow-lg"
      >
        <div className="flex items-center justify-between bg-gray-900">
          <div
            className="flex flex-grow py-2 pl-2 hover:cursor-grab active:cursor-grabbing"
            id="draggable"
          >
            <div className="mr-2">
              <img className="h-4 w-4" src={icons.apps.winCMD} alt="" />
            </div>
            <p className="hidden md:block">{title}</p>
            <p className="md:hidden">Command Line</p>
          </div>
          <div className="flex items-center justify-center text-gray-400">
            <div
              className="flex items-center p-3 hover:bg-gray-600"
              title="Minimize"
              onClick={() => {
                dispatch(minimizeActiveWindow({ id, minimized: true }));
              }}
            >
              <BsDash />
            </div>
            <div
              className="ml-2 flex items-center p-3 hover:bg-gray-600"
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
        <div className="h-full overflow-scroll px-2 pb-10 ">
          <p className="mb-2">
            Microsoft Windows [version 10.0.22000.856] <br />
            (c) Microsoft Corporation. All rights reserved
          </p>
          <p className="my-1">
            Run `help` or `?` command to see available commands
          </p>
          <div className="flex flex-col">
            {terminalHistory.length > 0 && (
              <>
                {terminalHistory.map((line, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex flex-row">
                      <span className="text-green-400">
                        {line.currentDirectory}&gt;
                      </span>
                      <span className="typing flex-1 items-center pl-2">
                        {line.command}
                      </span>
                    </div>
                    {line.output && <div>{line.output}</div>}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex">
            <span className="text-green-400">
              {currentTerminalDirectory}&gt;
            </span>
            <input
              className="typing flex-1 items-center bg-transparent pl-2 outline-none ring-0"
              autoFocus={true}
              onKeyDown={onKeydownTerminalInput}
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default CommandLineApp;

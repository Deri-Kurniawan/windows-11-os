import React, { Fragment, useState } from "react";
import Draggable from "react-draggable";
import { BsDash } from "react-icons/bs";
import { IoIosSquareOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeRestore } from "react-icons/vsc";
import { useDispatch } from "react-redux";
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

      if (command.includes("code")) {
        window.open(
          "https://vscode.dev",
          "_blank",
          "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
        );
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
            clear | cls - clear the terminal screen <br />
            cd - change directory <br />
            code - open VS Code <br />
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
        className={`absolute inverse-toggle shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased  bg-gray-800 rounded-md leading-normal overflow-hidden z-10`}
      >
        <div className="flex justify-between items-center bg-gray-900">
          <div
            className="pl-2 py-2 flex flex-grow hover:cursor-grab active:cursor-grabbing"
            id="draggable"
          >
            {title}
          </div>
          <div
            className="flex justify-center items-center text-gray-400"
            id="focus-area"
          >
            <div
              className="p-3 flex items-center hover:bg-gray-600"
              title="Minimize"
              onClick={() => {
                dispatch(minimizeActiveWindow({ id, minimized: true }));
              }}
            >
              <BsDash />
            </div>
            <div
              className="ml-2 p-3 flex items-center hover:bg-gray-600"
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
        <div className="h-full px-2 pb-10 overflow-scroll ">
          <p className="mb-2">
            Microsoft Windows [version 10.0.22000.856] <br />
            (c) Microsoft Corporation. All rights reserved
          </p>
          <p className="my-1">
            Run `help` or `?` command to see available commands
          </p>
          <div className="flex flex-col">
            {terminalHistory.length > 0 && (
              <Fragment>
                {terminalHistory.map((line, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex flex-row">
                      <span className="text-green-400">
                        {line.currentDirectory}&gt;
                      </span>
                      <span className="flex-1 typing items-center pl-2">
                        {line.command}
                      </span>
                    </div>
                    {line.output && <div>{line.output}</div>}
                  </div>
                ))}
              </Fragment>
            )}
          </div>
          <div className="flex">
            <span className="text-green-400">
              {currentTerminalDirectory}&gt;
            </span>
            <input
              className="flex-1 typing items-center pl-2 bg-transparent ring-0 outline-none"
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

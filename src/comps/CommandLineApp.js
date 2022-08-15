import React, { Fragment, useState } from "react";
import Draggable from "react-draggable";
import { BsDash } from "react-icons/bs";
import { IoIosSquareOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const CommandLineApp = () => {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentTerminalDirectory, setCurrentTerminalDirectory] =
    useState("C:\\Users\\Deri");

  return (
    <Draggable handle="#draggable" defaultPosition={{ x: 10, y: 10 }}>
      <div className="absolute w-[80vw] h-[80vh] inverse-toggle shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased  bg-gray-800 rounded-md leading-normal overflow-hidden z-10">
        <div className="flex justify-between items-center bg-gray-900">
          <div
            className="pl-2 py-2 flex flex-grow hover:cursor-grab active:cursor-grabbing"
            id="draggable"
          >
            C:\Windows\system32\cmd.exe
          </div>
          <div className="flex justify-center items-center">
            <div className="p-3 flex items-center hover:bg-gray-600">
              <BsDash className="text-gray-400" />
            </div>
            <div className="ml-2 p-3 flex items-center hover:bg-gray-600">
              <IoIosSquareOutline className="text-gray-400" />
            </div>
            <div className="ml-2 p-3 flex items-center hover:bg-red-500">
              <IoCloseOutline className="text-gray-400" />
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
                    {line.output && <p>{line.output}</p>}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // rules for the command
                  const command = e.target.value;
                  let output = null;
                  let ignoreDefaultError = true;

                  if (command === "clear" || command === "cls") {
                    setTerminalHistory([]);
                    e.target.value = "";
                    return;
                  }

                  if (command.includes("code")) {
                    window.open(
                      "https://vscode.dev",
                      "_blank",
                      "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50,width=500,height=500"
                    );
                    ignoreDefaultError = false;
                  }

                  const newDir = command.split(" ")[1];
                  if (command.includes("cd")) {
                    if (newDir) {
                      const formattedDir = newDir.replace("/", "\\");
                      setCurrentTerminalDirectory(formattedDir);
                      ignoreDefaultError = false;
                    } else {
                      output = currentTerminalDirectory;
                      ignoreDefaultError = false;
                    }
                  }

                  if (command === "help" || command === "?") {
                    output = (
                      <p>
                        Available commands: <br />
                        `help` - show this help message <br />
                        `clear` - clear the terminal screen <br />
                        `cls` - clear the terminal screen <br />
                        `code` - open VS Code <br />
                        `cd` - change directory <br />
                      </p>
                    );
                    ignoreDefaultError = false;
                  }

                  if (ignoreDefaultError === true) {
                    output = `'${command}' is not recognized as an internal or external command,
                          operable program or batch file.`;
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
              }}
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default CommandLineApp;

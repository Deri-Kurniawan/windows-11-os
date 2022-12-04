"use client";

import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useWindows } from "../providers/WindowsProvider";
import Wallpaper from "./Wallpaper";
import SignInWithPIN from "./SignInWithPIN";
import DateTime from "./DateTime";

const LockScreen: NextPage = (): JSX.Element => {
  const { settings }: any = useWindows();
  const [didSignIn, setDidSignIn] = React.useState<boolean>(false);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" ||
        e.code === "Enter" ||
        e.code === "NumpadEnter"
      ) {
        setDidSignIn(true);
      }

      if (e.code === "Escape") {
        setDidSignIn(false);
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (settings.personalization.lockScreen.wallpaper.dark === true) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [settings.personalization.lockScreen.wallpaper.dark]);

  return (
    <main onClick={() => setDidSignIn(true)}>
      {didSignIn && <SignInWithPIN />}
      <DateTime />
      <Wallpaper data={settings.personalization.lockScreen} />
    </main>
  );
};

export default LockScreen;

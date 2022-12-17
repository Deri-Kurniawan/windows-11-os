"use client";

import React, { createContext, useContext, useState } from "react";
import assets from "../assets";

// @ts-ignore
const Windows = createContext();

export type SettingsType = {
  personalization: {
    background: {
      wallpaper: any;
      fitType: string;
    };
    lockScreen: {
      wallpaper: any;
      fitType: string;
    };
  };
  accounts: {
    yourInfo: {
      name: string;
      email: string;
      role: string;
      avatar: any;
    };
    signInOptions: {
      PIN: {
        enabled: boolean;
        length: number;
        key: string;
      };
    };
  };
};

export const WindowsProvider = ({ children }: any): JSX.Element => {
  const [settings, setSettings] = useState<SettingsType>({
    personalization: {
      background: {
        wallpaper: assets.wallpapers[5] || assets.wallpapers[0],
        fitType: "cover",
      },
      lockScreen: {
        wallpaper: assets.wallpapers[3] || assets.wallpapers[0],
        fitType: "cover",
      },
    },
    accounts: {
      yourInfo: {
        name: "Deri Kurniawan",
        email: "deri.netuchi@gmail.com",
        role: "Administrator",
        avatar:
          "https://deri-kurniawan.vercel.app/static/media/deri.cc224f04f26d75d7f06d.jpg",
      },
      signInOptions: {
        PIN: {
          enabled: true,
          length: 6,
          key: "123456",
        },
      },
    },
  });

  return (
    <Windows.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </Windows.Provider>
  );
};

export const useWindows = () => useContext(Windows);

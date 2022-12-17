import React from "react";
import { WindowsProvider } from "../providers/WindowsProvider";
import "../styles/globals.css";

type RootLayoutPropsType = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutPropsType): JSX.Element {
  return (
    <html>
      <head />
      <body>
        <WindowsProvider>{children}</WindowsProvider>
      </body>
    </html>
  );
}

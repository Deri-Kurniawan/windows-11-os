import { useSelector } from "react-redux";
import Taskbar from "../comps/Taskbar";
import DesktopShortcutList from "../comps/DesktopShortcutList";
import WindowsModal from "../comps/WindowsModal";
import { motion } from "framer-motion";

const DesktopScreen = () => {
  const wallpaper = useSelector((state) => state.desktop.wallpaper);
  const activeWindows = useSelector((state) => state.desktop.activeWindows);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ backgroundImage: `url(${wallpaper})` }}
      className="bg-cover bg-no-repeat text-white transition-all duration-300 ease-in"
    >
      <div className="h-screen w-screen">
        {activeWindows.length > 0 && (
          <>
            {activeWindows
              .filter((win) => win.minimized === false)
              .map(
                (
                  {
                    id,
                    height,
                    width,
                    x,
                    y,
                    title,
                    minimized,
                    maximized,
                    Component,
                  },
                  index
                ) => (
                  <Component
                    key={index}
                    id={id}
                    height={height}
                    width={width}
                    x={x}
                    y={y}
                    title={title}
                    minimized={minimized}
                    maximized={maximized}
                  />
                )
              )}
          </>
        )}
        <DesktopShortcutList />
        <Taskbar />
      </div>
      <WindowsModal />
    </motion.div>
  );
};

export default DesktopScreen;

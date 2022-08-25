import { useSelector } from "react-redux";
import DesktopAppShortcutButton from "../comps/DesktopAppShortcutButton";

const DesktopShortcuts = () => {
  const shortcutApps = useSelector((state) => state.desktop.shortcutApps);

  return (
    <>
      {shortcutApps.length > 0 && (
        <div className="h-[91vh] w-[95vw] flex flex-col flex-wrap content-start justify-start items-start">
          {shortcutApps.map((app, index) => (
            <DesktopAppShortcutButton className="my-2" key={index} {...app} />
          ))}
        </div>
      )}
    </>
  );
};

export default DesktopShortcuts;

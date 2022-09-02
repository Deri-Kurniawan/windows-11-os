import { useSelector } from "react-redux";
import DesktopAppShortcutButton from "../comps/DesktopAppShortcutButton";

const DesktopShortcuts = () => {
  const shortcutApps = useSelector((state) => state.desktop.shortcutApps);

  return (
    <>
      {shortcutApps.length > 0 && (
        <div className="flex h-[91vh] w-[95vw] flex-col flex-wrap content-start items-start justify-start">
          {shortcutApps.map((app, index) => (
            <DesktopAppShortcutButton className="my-2" key={index} {...app} />
          ))}
        </div>
      )}
    </>
  );
};

export default DesktopShortcuts;

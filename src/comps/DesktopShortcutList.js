import { useSelector } from "react-redux";
import DesktopShortcutItem from "./DesktopShortcutItem";

const DesktopShortcutList = () => {
  const shortcutApps = useSelector((state) => state.desktop.shortcutApps);

  return (
    <>
      {shortcutApps.length > 0 && (
        <div className="flex h-[91vh] w-[95vw] flex-col flex-wrap content-start items-start justify-start">
          {shortcutApps.map((app, index) => (
            <DesktopShortcutItem className="my-2" key={index} {...app} />
          ))}
        </div>
      )}
    </>
  );
};

export default DesktopShortcutList;

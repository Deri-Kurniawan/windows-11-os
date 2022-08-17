import { IoPower } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import WindowsModalPinnedAppbutton from './WindowsModalPinnedAppButton';

const WindowsModal = () => {
  const shortcutApps = useSelector((state) => state.desktop.pinnedApps);
  const profileImage = useSelector((state) => state.desktop.profileImage);
  const winModalToggled = useSelector((state) => state.desktop.winModalToggled);

  return (
    <div className={`${winModalToggled === true ? "absolute" : "hidden"} top-[2vh] w-full h-[87vh] lg:top-[5vh] lg:left-[30vw] lg:w-[40vw] lg:h-[87vh] text-white bg-gray-900 rounded-md border-gray-500 border-[1px]`}>
        <div className='h-[77vh] bg-red-5000 px-4 py-2 overflow-hidden'>
          <input
              type="search"
              className="w-full h-8 my-4 bg-gray-900 border-t-0 border-b-2 border-l-0 border-r-0 rounded-sm placeholder:text-white border-b-white focus:outline-none"
              placeholder="Find a setting"
            />
            
          <span className='pl-4'>Pinned</span>
    
          {shortcutApps.length > 0 && (
            <div className="flex flex-row flex-wrap items-start content-start justify-start">
              {shortcutApps.map((app, index) => (
                <WindowsModalPinnedAppbutton className="my-2" key={index} {...app} />
              ))}
            </div>
          )}  
        </div>
        
        <div className='absolute bottom-0 w-full h-[10vh] border-t-[1px] border-gray-500'>
          <div className='flex items-center justify-between h-full px-4'>
            <div className='flex flex-row items-center justify-center'>
              <img className='w-8 h-8 mr-2 rounded-full' src={profileImage} alt="" />
              <span>Deri Kurniawan</span>
            </div>
            <IoPower size={20} />
          </div>
        </div>
    </div>
  );
}

export default WindowsModal
import { useEffect, useState } from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { MdHomeFilled } from 'react-icons/md';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { CollapseButton } from '@ui/CollapseButton';

import logoImage from '../../../public/logo.png';
import { SideBarDesktop } from '@ui/SidebarDesktop';
import { SidebarMobile } from '@ui/SidebarMobile';

const SideBar = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleWindowResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <main>
      {isMobile ? <SidebarMobile /> : <SideBarDesktop />}
    </main>

  );
};

export default SideBar;

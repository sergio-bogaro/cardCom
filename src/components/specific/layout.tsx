import { ReactNode } from 'react';

import Header from './Header';
import SideBar from './SideBar';

interface props {
  children: ReactNode;
}

const Layout = ({ children }: props) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessTokenCAP') : undefined;
  const logged = accessToken != undefined ? true : false;

  if (!logged) return <>{children}</>;

  return (
    <div className="flex h-screen w-full p-2">
      <SideBar />

      <div className="flex w-full flex-col p-2 text-gray-300">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;

import { ReactNode, useEffect, useState } from 'react';

import { Nunito } from '@next/font/google';

import Header from './Header';
import SideBar from './SideBar';

interface props {
  children: ReactNode;
}

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700']
});

const Layout = ({ children }: props) => {
  const [loginScreen, setLoginScreen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessTokenCAP');
    const logged = accessToken ? false : true;
    setLoginScreen(logged);
  });

  if (loginScreen) return <>{children}</>;

  return (
    <div className={`flex h-screen w-full ${nunito.className}`}>
      <SideBar />

      <main className="flex w-full flex-col px-2 text-gray-300">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;

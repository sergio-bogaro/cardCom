import router from 'next/router';
import { ReactNode, useContext, useEffect, useState } from 'react';

import { Nunito } from '@next/font/google';

import { UserContext } from '../../contexts/auth';
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
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) router.push('/home');
    else router.push('/login');
  }, []);

  if (!userData) return <>{children}</>;

  return (
    <div className={`flex h-screen w-full ${nunito.className}`}>
      <SideBar />

      <main className="flex w-full flex-col px-2 text-gray-300 transition-all">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;

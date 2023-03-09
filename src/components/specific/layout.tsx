import router from 'next/router';
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
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessTokenCAP');
    const logged = accessToken ? true : false;
    setUserLogged(logged);

    if (!logged) {
      router.push('/login');
    }
  }, []);

  if (!userLogged) return <>{children}</>;

  return (
    <div className={`flex h-screen w-full ${nunito.className}`}>
      <SideBar />

      <main className="flex w-full flex-col px-2 text-gray-300 duration-300 ease-in-out">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;

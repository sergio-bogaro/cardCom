import router from 'next/router';
import { ReactNode, useContext, useEffect } from 'react';

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
    console.log(userData);
    if (userData) router.push('/home');
    else router.push('/login');
  }, []);

  if (!userData) return <>{children}</>;

  return (
    <div className={`flex h-screen w-full ${nunito.className}`}>
      <SideBar />

      <main className="relative flex w-full flex-col">
        <Header />

        <div className="p-3">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

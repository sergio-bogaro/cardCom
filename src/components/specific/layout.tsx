import { useTheme } from 'next-themes';
import router from 'next/router';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

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

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  function changeTheme(newTheme: string) {
    setTheme(newTheme);
    localStorage.setItem('currentTheme', newTheme);
  }

  useEffect(() => {
    const selectedTheme = localStorage.getItem('currentTheme');

    setMounted(true);
    if (selectedTheme) setTheme(selectedTheme);
    if (userData) router.push('/home');
    else router.push('/login');
  }, []);

  if (!mounted) return null;

  if (!userData) return <>{children}</>;

  console.log(theme);

  return (
    <div className={`flex h-screen w-full ${nunito.className}`}>
      <SideBar />

      <main className="relative flex w-full flex-col px-2 text-gray-300">
        <div className="absolute right-24 bg-transparent">
          {currentTheme === 'dark' ? (
            <button onClick={() => changeTheme('light')}>
              <BsSunFill />
            </button>
          ) : (
            <button onClick={() => changeTheme('dark')}>
              <BsMoonStarsFill />
            </button>
          )}
        </div>
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;

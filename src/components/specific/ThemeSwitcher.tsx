import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
    const selectedTheme = localStorage.getItem('theme');

    if (selectedTheme) setTheme(selectedTheme);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-16 h-10 flex items-center p-3">
      <div className={`w-3/4 ease-in-out duration-150 ${currentTheme === 'light' ? 'translate-x-0' : 'translate-x-full'} `}>
        <div>
          {currentTheme === 'dark' ? (
            <button onClick={() => setTheme('light')}>
              <BsSunFill size={20} color={'white'} />
            </button>
          ) : (
            <button onClick={() => setTheme('dark')}>
              <BsMoonStarsFill size={20} color={'black'} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

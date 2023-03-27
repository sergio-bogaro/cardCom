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
    <div>
      {currentTheme === 'dark' ? (
        <button onClick={() => setTheme('light')}>
          <BsSunFill size={30} color={'white'} />
        </button>
      ) : (
        <button onClick={() => setTheme('dark')}>
          <BsMoonStarsFill size={30} color={'black'} />
        </button>
      )}
    </div>
  );
};

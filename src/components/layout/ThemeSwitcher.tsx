import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

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
          <HiSun size={24} color={'white'} />
        </button>
      ) : (
        <button onClick={() => setTheme('dark')}>
          <HiMoon size={24} color={'black'} />
        </button>
      )}
    </div>
  );
};

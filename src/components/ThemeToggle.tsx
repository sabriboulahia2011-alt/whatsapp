"use client"
import React, { useEffect, useState } from 'react';

// SVG icons
const SunIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="4" fill="currentColor"/><g stroke="currentColor" strokeWidth="1.5"><path d="M10 2v2.5"/><path d="M10 15.5V18"/><path d="M18 10h-2.5"/><path d="M4.5 10H2"/><path d="M15.07 15.07l-1.77-1.77"/><path d="M6.7 6.7L4.93 4.93"/><path d="M15.07 4.93l-1.77 1.77"/><path d="M6.7 13.3l-1.77 1.77"/></g></svg>
);
const MoonIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M15.5 13.5A7 7 0 016.5 4.5a7 7 0 1010 9z" fill="currentColor"/></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8.5l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'system';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark' | 'system'>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    let appliedTheme = theme;
    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const root = document.documentElement;
    if (appliedTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme, hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark' || e.newValue === 'system')) {
        setTheme(e.newValue as 'light' | 'dark' | 'system');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [hasMounted, setTheme]);

  // Listen for system theme changes if in system mode
  useEffect(() => {
    if (!hasMounted || theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      setTheme('system'); // triggers re-evaluation
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [theme, hasMounted, setTheme]);

  if (!hasMounted) return null;

  const options = [
    { value: 'light', label: 'Light', icon: <SunIcon /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
    { value: 'system', label: 'Auto', icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ) },
  ];

  return (
    <div className="inline-flex rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-sm transition-colors duration-300 w-full max-w-xs">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`flex-1 px-4 py-2 text-sm font-medium focus:outline-none transition-colors duration-300 flex items-center justify-center gap-2 ${theme === opt.value ? 'bg-green-500 text-white' : 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-checked={theme === opt.value}
          role="radio"
          onClick={() => setTheme(opt.value as 'light' | 'dark' | 'system')}
        >
          {opt.icon}
          {opt.label}
          {theme === opt.value && <CheckIcon />}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
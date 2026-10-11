import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="w-9 h-9 rounded-lg flex items-center justify-center border border-borderLight dark:border-borderDark bg-white/80 dark:bg-surface-800/80 text-slate-700 dark:text-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary shadow-sm"
    >
      {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-slate-700" />}
    </button>
  );
}

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cse-board-theme') || 'cselight';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cse-board-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'csedark' ? 'cselight' : 'csedark'));

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-sm gap-1 text-xs font-semibold"
      aria-label="Toggle theme"
    >
      {theme === 'csedark' ? '☀️' : '🌙'}
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}

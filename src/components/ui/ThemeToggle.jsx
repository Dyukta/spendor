import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
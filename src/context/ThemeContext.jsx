import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryTheme = params.get('theme');
      if (queryTheme === 'cyberpunk') return 'cyberpunk';
      if (queryTheme === 'professional' || queryTheme === 'light' || queryTheme === 'modern') return 'professional';
    }
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'modern') return 'professional';
    return savedTheme || 'professional';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'cyberpunk' ? 'professional' : 'cyberpunk';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

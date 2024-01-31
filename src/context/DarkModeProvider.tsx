import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { enableDarkMode, disableDarkMode, toggleDarkMode } from '@/app/slices/themeSlice';

interface ThemeContextType {
  isDarkMode: boolean;
  toggle: () => void;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggle = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const enableDark = useCallback(() => {
    dispatch(enableDarkMode());
  }, [dispatch]);

  const disableDark = useCallback(() => {
    dispatch(disableDarkMode());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggle, enableDarkMode: enableDark, disableDarkMode: disableDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useDarkMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a ThemeProvider');
  }
  return context;
}

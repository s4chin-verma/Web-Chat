import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '@/lib/types/redux';

const initialState: ThemeState = {
  isDarkMode:
    (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('darkMode') || 'true')) ||
    false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
    enableDarkMode: state => {
      state.isDarkMode = true;
    },
    disableDarkMode: state => {
      state.isDarkMode = false;
    },
  },
});

export const { toggleDarkMode, enableDarkMode, disableDarkMode } = themeSlice.actions;
export default themeSlice.reducer;

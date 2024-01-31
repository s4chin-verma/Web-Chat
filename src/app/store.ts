import authReducer from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;

import authReducer from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import memberSlice from './slices/memberSlice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { usersApi } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeSlice,
    members: memberSlice,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;

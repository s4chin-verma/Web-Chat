import authReducer from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import chatSlice from './slices/chatSlice';
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './api/allUserQuery';
import { conversationsApi } from './api/conversationQuery';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeSlice,
    chat: chatSlice,
    [conversationsApi.reducerPath]: conversationsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(conversationsApi.middleware, usersApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

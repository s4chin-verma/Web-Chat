import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, storedUser } from '../types';
import { RootState } from '../store';

const initialState: ChatState = {
  chat: false,
  isLoading: false,
  currentChatId: null,
  sender: storedUser ? JSON.parse(storedUser) : null,
  receiver: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<boolean>) => {
      state.chat = action.payload;
    },
    setCurrentChatId: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReceiver: (state, action: PayloadAction<ChatState['receiver']>) => {
      state.receiver = action.payload;
    },
    resetChatState: () => initialState,
  },
});

export const { setChat, setCurrentChatId, resetChatState, setLoading, setReceiver } =
  chatSlice.actions;

export const currentChatId = (state: RootState) => state.chat.currentChatId;
export const isLoading = (state: RootState) => state.chat.isLoading;
export const chat = (state: RootState) => state.chat.chat;

export default chatSlice.reducer;

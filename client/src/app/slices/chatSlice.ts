import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '@/lib/types/redux';
import { RootState } from '../store';

const initialState: ChatState = {
  chat: false,
  isLoading: false,
  currentChatId: null,
  receiver: null,
  messages: null,
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
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      if (state.messages) {
        state.messages.push(action.payload);
      } else {
        state.messages = [action.payload];
      }
    },
    resetChatState: () => initialState,
  },
});

export const {
  setChat,
  setCurrentChatId,
  resetChatState,
  setLoading,
  setReceiver,
  setMessages,
  addMessage,
} = chatSlice.actions;

export const currentChatId = (state: RootState) => state.chat.currentChatId;
export const isLoading = (state: RootState) => state.chat.isLoading;
export const chat = (state: RootState) => state.chat.chat;
export const messages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;

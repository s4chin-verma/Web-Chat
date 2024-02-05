import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, storedUser } from '../types';
import { RootState } from '../store';

const initialState: ChatState = {
  isLoading: false,
  currentChatId: null,
  senderId: null,
  senderPicture: storedUser ? JSON.parse(storedUser).picture : null,
  receiverId: null,
  receiverPicture: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSenderId: (state, action: PayloadAction<string | null>) => {
      state.senderId = action.payload;
    },
    setSenderPicture: (state, action: PayloadAction<string | null>) => {
      state.senderPicture = action.payload;
    },
    setReceiverId: (state, action: PayloadAction<string | null>) => {
      state.receiverId = action.payload;
    },
    setReceiverPicture: (state, action: PayloadAction<string | null>) => {
      state.receiverPicture = action.payload;
    },
    setCurrentChatId: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetChatState: state => {
      state.currentChatId = null;
      state.senderId = null;
      state.receiverId = null;
    },
  },
});

export const {
  setSenderId,
  setReceiverId,
  setCurrentChatId,
  resetChatState,
  setReceiverPicture,
  setSenderPicture,
  setLoading,
} = chatSlice.actions;

export const currentChatId = (state: RootState) => state.chat.currentChatId;
export const senderId = (state: RootState) => state.chat.currentChatId;
export const senderPicture = (state: RootState) => state.chat.currentChatId;
export const receiverId = (state: RootState) => state.chat.currentChatId;
export const receiverPicture = (state: RootState) => state.chat.currentChatId;
export const isLoading = (state: RootState) => state.chat.isLoading;

export default chatSlice.reducer;

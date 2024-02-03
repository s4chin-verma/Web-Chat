import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../types';

const initialState: ChatState = {
  currentChatId: null,
  senderId: null,
  receiverId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSenderId: (state, action: PayloadAction<string | null>) => {
      state.senderId = action.payload;
    },
    setReceiverId: (state, action: PayloadAction<string | null>) => {
      state.receiverId = action.payload;
    },
    setCurrentChatId: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload;
    },
    resetChatState: state => {
      state.currentChatId = null;
      state.senderId = null;
      state.receiverId = null;
    },
  },
});

export const { setSenderId, setReceiverId, setCurrentChatId, resetChatState } = chatSlice.actions;

export default chatSlice.reducer;

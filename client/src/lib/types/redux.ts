export interface AuthState {
  loading: boolean;
  userInfo: User | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

export interface ThemeState {
  isDarkMode: boolean;
}

export type Message = {
  authorId: string;
  msg: string;
};

export interface ChatState {
  chat: boolean;
  isLoading: boolean;
  currentChatId: string | null;
  receiver: User | null;
  messages: Message[] | null;
}

export type User = {
  _id: string;
  username: string;
  picture: string;
  email: string;
};

export type Conversation = {
  _id: string;
  members: string[];
  messages: {
    authorId: string;
    msg: string;
    createdAt: string;
    _id: string;
  }[];
};

export interface AddMessageRequest {
  authorId: string;
  msg: string;
}

export interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
  picture: string | null;
}

export interface LoginUserPayload {
  username: string;
  password: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ChangePasswordPayload {
  password: string;
  token?: string;
}

export const backendURL: string = 'http://localhost:8080';
// import { User } from './queryTypes';
export const storedUser = localStorage.getItem('user');

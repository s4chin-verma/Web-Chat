export const backendURL: string = 'http://localhost:8080';
import { User } from './queryTypes';

export const storedUser = localStorage.getItem('user');
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
export interface ChatState {
  chat: boolean;
  isLoading: boolean;
  currentChatId: string | null;
  receiver: User | null;
  sender: User | null;
}

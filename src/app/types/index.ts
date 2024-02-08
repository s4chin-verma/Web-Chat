export const backendURL: string = 'http://localhost:8080';

export const storedUser = localStorage.getItem('user');
export interface AuthState {
  loading: boolean;
  userInfo: Record<string, any> | null;
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
  senderId: string | null;
  senderPicture: string | null;
  receiverId: string | null;
  receiverPicture: string | null;
}

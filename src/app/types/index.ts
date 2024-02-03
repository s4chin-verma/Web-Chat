export const backendURL: string = 'http://localhost:8080';
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
  currentChatId: string | null;
  senderId: string | null;
  receiverId: string | null;
}

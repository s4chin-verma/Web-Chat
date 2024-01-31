export const backendURL: string = 'http://localhost:8080';

export interface AuthState {
  loading: boolean;
  userInfo: Record<string, any>;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

export interface ThemeState {
  isDarkMode: boolean;
}

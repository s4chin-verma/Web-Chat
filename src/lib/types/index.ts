export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPassInput {
  email: string;
}

export interface ChangePassInput {
  password: string;
  confirmPassword: string;
}

export interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
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
}

export interface AuthState {
  loading: boolean;
  userInfo: Record<string, any>;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

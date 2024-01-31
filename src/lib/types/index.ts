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



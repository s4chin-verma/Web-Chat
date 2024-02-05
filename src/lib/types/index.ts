export const DARK_MODE = 'DARK_MODE';
export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: string | null;
}
export interface ResetPassInput {
  email: string;
}

export interface ChangePassInput {
  password: string;
  confirmPassword: string;
}


type User = {
  _id: string;
  username: string;
  picture: string;
};

export interface ChatSideBarProps {
  users: User[];
}

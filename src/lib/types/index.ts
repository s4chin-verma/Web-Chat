import { User, NavLinkType } from './section';

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

export interface ChatSideBarProps {
  users: User[];
}

export interface NavbarSectionType {
  navLinks: NavLinkType[];
}

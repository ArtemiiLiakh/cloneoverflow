import { userPath } from './paths';

export const UserUpdatePath = userPath;

export interface UserUpdateBody {
  name?: string;
  username?: string;  
  about?: string;
}
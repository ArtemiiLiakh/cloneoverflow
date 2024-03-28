import { UserStatus } from '../types/UserStatus';

export class UserUpdateResponse {
  id: string;
  name: string;
  username: string;
  about: string | null;
  reputation: number;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
import { UserStatus } from '../types/UserStatus';

export class UserGetResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  reputation: number;
  about: string;
  status: UserStatus;
  createdAt: Date;
}
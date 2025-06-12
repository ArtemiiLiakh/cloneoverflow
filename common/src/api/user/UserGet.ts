import { UserStatusEnum } from '@enums/statuses/UserStatus';
import { userPath } from './paths';

export const UserGetPath = userPath+'/:userId';

export interface UserGetParams {
  userId: string;
}

export interface UserGetResponse {
  id: string;
  name: string;
  username: string;
  rating: number;
  status: UserStatusEnum;
  createdAt: string;
  updatedAt: string;
}
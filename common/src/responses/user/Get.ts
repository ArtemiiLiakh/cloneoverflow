import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface UserGetResponse {
  id: string;
  name: string;
  username: string;
  rating: number;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface UserGetResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  about: string;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  questionsAmount?: number;
  answersAmount?: number;
}
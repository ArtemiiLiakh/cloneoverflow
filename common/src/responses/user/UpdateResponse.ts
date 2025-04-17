import { UserStatusEnum } from "@enums/statuses/UserStatus";

export interface UserUpdateResponse {
  id: string;
  name: string;
  username: string;
  rating: number;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
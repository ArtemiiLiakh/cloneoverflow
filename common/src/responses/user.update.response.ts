import { UserStatusEnum } from "../enums/statuses/UserStatus";

export class UserUpdateResponse {
  id: string;
  name: string;
  username: string;
  about: string | null;
  reputation: number;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
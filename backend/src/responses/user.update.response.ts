import { UserStatus } from "@prisma/client";

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
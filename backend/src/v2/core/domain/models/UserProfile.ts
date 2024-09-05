import { UserStatus } from "@cloneoverflow/common";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  reputation: number;
  about: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};
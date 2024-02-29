import { UserProfile } from '@prisma/client';

export class DbUser {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userProfile: UserProfile;
};
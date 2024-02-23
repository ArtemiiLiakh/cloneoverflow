import { UserStatus } from '@prisma/client';

export class AuthSignInResponse {
  id: string;
  name?: string;
  username?: string;
  reputation?: number;
  about?: string;
  status?: UserStatus;
  createdAt: Date;
}
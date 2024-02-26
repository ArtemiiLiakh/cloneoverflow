import { UserStatus } from '@prisma/client';

export class MeResponse {
  id: string;
  name: string;
  username: string;
  reptutation: number;
  status: UserStatus;
}
import { UserStatus } from '@prisma/client';

export class GetMeResponse {
  id: string;
  name: string;
  username: string;
  reptutation: number;
  status: UserStatus;
}
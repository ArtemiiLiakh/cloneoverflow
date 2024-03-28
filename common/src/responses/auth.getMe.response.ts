import { UserStatus } from '../types/UserStatus';

export class GetMeResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatus;
}
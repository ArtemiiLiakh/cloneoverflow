import { UserStatusEnum } from '@cloneoverflow/common';

export interface ExecutorPayload {
  userId: string;
  status: UserStatusEnum;
}
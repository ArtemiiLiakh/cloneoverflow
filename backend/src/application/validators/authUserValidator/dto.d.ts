import { UserStatusEnum } from '@cloneoverflow/common';

export interface AuthUserValidatorInput {
  userId: string;
  status: UserStatusEnum;
}

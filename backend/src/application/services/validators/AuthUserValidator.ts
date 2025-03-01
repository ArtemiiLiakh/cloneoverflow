import { ExecutorPayload } from '@application/services/auth/data';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { Validator } from '@common/services/Validator';
import { UserRepository } from '@core/repositories';

interface ValidatorPayload {
  executor: ExecutorPayload,
}

export class AuthUserValidator implements Validator<ValidatorPayload> {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async validate ({ executor }: ValidatorPayload) {
    if (executor.status === UserStatusEnum.BLOCKED) {
      throw new ForbiddenException('Your account is blocked');
    }

    if (!await this.userRepository.isExist({ 
      userId: executor.userId,
    })) {
      throw new UnauthorizedException();
    }
  }
}
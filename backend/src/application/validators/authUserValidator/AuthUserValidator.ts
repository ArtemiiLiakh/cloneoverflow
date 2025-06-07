import { AccountBlockedException, UserUnauthorized } from '@application/auth/exceptions';
import { UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/user/repository/UserRepository';
import { AuthUserValidatorInput } from './dto';
import { IAuthUserValidator } from './type';

export class AuthUserValidator implements IAuthUserValidator {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async validate (user: AuthUserValidatorInput): Promise<void> {
    if (user.status === UserStatusEnum.BLOCKED) {
      throw new AccountBlockedException();
    }

    if (!await this.userRepository.isExist({ 
      userId: user.userId,
    })) {
      throw new UserUnauthorized();
    }
  }
}
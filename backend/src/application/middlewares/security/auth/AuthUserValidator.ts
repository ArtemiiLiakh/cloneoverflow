import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { MiddlewareValidator } from '@application/interfaces/security/MiddlewareValidator';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { NextFunction, Response } from 'express';

export class AuthUserValidator implements MiddlewareValidator<UserStatusEnum | UserStatusEnum[]> {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  validate (status: UserStatusEnum | UserStatusEnum[] = UserStatusEnum.USER) {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      const user = req.body._user;

      if (
        !user ||
        Array.isArray(status) && status.indexOf(user.status) === -1 ||
        user.status !== status 
      ) {
        throw new ForbiddenException('Status is invalid');
      }

      if (!await this.userRepository.isExist({ userId: user.userId })) {
        throw new UnauthorizedException('User not found');
      }

      next();
    };
  }
}
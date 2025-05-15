import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { MiddlewareValidator } from '@application/interfaces/security/MiddlewareValidator';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories';
import { NextFunction, Response } from 'express';

export class AuthUserValidator implements MiddlewareValidator {
  constructor (
    private userRepository: UserRepository,
  ) {}

  validate () {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      if (!req?.body?._user) {
        throw new UnauthorizedException();
      }

      const { userId, status } = req.body._user;

      if (status === UserStatusEnum.BLOCKED) {
        throw new ForbiddenException('Your account is blocked');
      }

      if (!await this.userRepository.isExist({ userId })) {
        throw new UnauthorizedException();
      }

      next();
    };
  }
}
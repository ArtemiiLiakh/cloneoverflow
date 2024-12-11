import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { MiddlewareValidator } from '@application/interfaces/security/MiddlewareValidator';
import { ForbiddenException, UserStatusEnum } from '@cloneoverflow/common';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { NextFunction, Response } from 'express';

export class AuthUserStatusValidator implements MiddlewareValidator<UserStatusEnum | UserStatusEnum[]> {
  constructor (
    private validateUser: IValidateUserUseCase, 
  ) {}

  validate (status: UserStatusEnum | UserStatusEnum[] = UserStatusEnum.USER) {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      const user = req.body._user;

      if (
        !user ||
        Array.isArray(status) && status.indexOf(user.status) === -1 ||
        user.status !== status 
      ) {
        throw new ForbiddenException();
      }

      await this.validateUser.execute({ userId: user.userId });

      next();
    };
  }
}
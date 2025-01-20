import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { MiddlewareValidator } from '@application/interfaces/security/MiddlewareValidator';
import { ForbiddenException, UnauthorizedException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { NextFunction, Response } from 'express';

export class AuthUserValidator implements MiddlewareValidator {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  validate () {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
      if (!req.body._user) {
        throw new UnauthorizedException();
      }

      const status = req.body._user.status;
      
      const user = await this.userRepository.getPartialById({ 
        userId: req.body._user.userId,
        select: {
          
        },
      })
        .catch(() => { 
          throw new UnauthorizedException();
        });

      if (
        Array.isArray(status) && status.indexOf(user.status) === -1 ||
        user.status !== status 
      ) {
        throw new ForbiddenException('Status is invalid');
      }

      next();
    };
  }
}
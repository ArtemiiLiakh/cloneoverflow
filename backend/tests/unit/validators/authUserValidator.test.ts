import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { AuthUserValidator } from '@application/middlewares/validators';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories';
import { NextFunction, Response } from 'express';

describe('Validator: test AuthUserValidator', () => {
  test('Expect the validation is passed when user is authorized', async () => {
    const userRepository = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    const validation = authUserValidator.validate();

    const req = {
      body: {
        _user: {
          userId: '',
          status: UserStatusEnum.USER,
        },
      },
    } as ExpressRequest;

    const next: NextFunction = jest.fn();

    await validation(
      req, 
      {} as Response, 
      next,
    );

    expect(userRepository.isExist).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('Throws an error if user payload is not passed', async () => {
    const userRepository = {
      isExist: jest.fn(),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    const validation = authUserValidator.validate();

    const next: NextFunction = jest.fn();

    await expect(validation(
      {} as ExpressRequest, 
      {} as Response, 
      next,
    )).rejects.toThrow(UnauthorizedException);

    expect(userRepository.isExist).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('Throws an error if user is blocked', async () => {
    const userRepository = {
      isExist: jest.fn(),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    const validation = authUserValidator.validate();

    const req = {
      body: {
        _user: {
          userId: '',
          status: UserStatusEnum.BLOCKED,
        },
      },
    } as ExpressRequest;

    const next: NextFunction = jest.fn();

    await expect(validation(
      req, 
      {} as Response, 
      next,
    )).rejects.toThrow(ForbiddenException);

    expect(userRepository.isExist).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('Throws an error if user does not exist', async () => {
    const userRepository = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    const validation = authUserValidator.validate();

    const req = {
      body: {
        _user: {
          userId: '',
          status: UserStatusEnum.USER,
        },
      },
    } as ExpressRequest;

    const next: NextFunction = jest.fn();

    await expect(validation(
      req, 
      {} as Response, 
      next,
    )).rejects.toThrow(UnauthorizedException);

    expect(userRepository.isExist).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
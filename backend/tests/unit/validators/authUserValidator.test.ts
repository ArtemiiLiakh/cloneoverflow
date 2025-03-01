import { ExecutorPayload } from '@application/services/auth/data';
import { AuthUserValidator } from '@application/services/validators';
import { ForbiddenException, UnauthorizedException, UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/repositories';

describe('Validator: test AuthUserValidator', () => {
  test('Expect the validation is passed when user exists', async () => {
    const userRepository = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    
    await expect(authUserValidator.validate({
      executor: {} as ExecutorPayload,
    })).resolves.toBeUndefined();

    expect(userRepository.isExist).toHaveBeenCalled();
  });

  test('Throws an error if user is blocked', async () => {
    const userRepository = {
      isExist: jest.fn(),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    
    const executor: ExecutorPayload = {
      userId: '',
      status: UserStatusEnum.BLOCKED,
    };

    await expect(authUserValidator.validate({ 
      executor,
    })).rejects.toThrow(ForbiddenException);

    expect(userRepository.isExist).not.toHaveBeenCalled();
  });

  test('Throws an error if user does not exist', async () => {
    const userRepository = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    
    const user: ExecutorPayload = {
      userId: '',
      status: UserStatusEnum.USER,
    };
    
    await expect(
      authUserValidator.validate({
        executor: user,
      }),
    ).rejects.toThrow(UnauthorizedException);

    expect(userRepository.isExist).toHaveBeenCalled();
  });
});
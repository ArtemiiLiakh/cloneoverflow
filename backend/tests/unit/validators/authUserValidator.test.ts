import { AccountBlockedException, UserUnauthorized } from '@application/auth/exceptions';
import { AuthUserValidator } from '@application/validators';
import { UserStatusEnum } from '@cloneoverflow/common';
import { UserRepository } from '@core/user/repository/UserRepository';

describe('Validator: test AuthUserValidator', () => {
  test('Expect the validation is passed when user exists', async () => {
    const userRepository = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    
    await expect(authUserValidator.validate({
      userId: 'userId',
      status: UserStatusEnum.USER,
    })).resolves.toBeUndefined();

    expect(userRepository.isExist).toHaveBeenCalled();
  });

  test('Throws an error if user is blocked', async () => {
    const userRepository = {
      isExist: jest.fn(),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    
    await expect(authUserValidator.validate({ 
      userId: 'userId',
      status: UserStatusEnum.BLOCKED
    })).rejects.toThrow(AccountBlockedException);

    expect(userRepository.isExist).not.toHaveBeenCalled();
  });

  test('Throws an error if user does not exist', async () => {
    const userRepository = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
    } as Partial<UserRepository>;

    const authUserValidator = new AuthUserValidator(userRepository as UserRepository);
    
    await expect(
      authUserValidator.validate({
        userId: '',
        status: UserStatusEnum.USER,
      }),
    ).rejects.toThrow(UserUnauthorized);

    expect(userRepository.isExist).toHaveBeenCalled();
  });
});
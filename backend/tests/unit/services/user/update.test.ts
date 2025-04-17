import { BadBodyException, ForbiddenException } from '@cloneoverflow/common';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserUpdateUseCase } from '@core/services/user';
import { UserUpdateInput } from '@core/services/user/update/dto';
import { createUser } from '@tests/utils/models/user';

describe('User service: test GetUseCase', () => {
  test('Update user name, username and about information', async () => {
    const user = createUser();

    const payload: UserUpdateInput = {
      executorId: user.userId,
      data: {
        name: 'name2',
        username: 'username2',
        about: 'about2',
      },
    };

    const userRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(false),
      update: jest.fn().mockResolvedValue(user),
    } as Partial<UserRepository>;

    const updateUseCase = new UserUpdateUseCase(
      userRepositoryMock as UserRepository,
    );

    const updatedUser = await updateUseCase.execute(payload);
   
    expect(updatedUser).toBe(user);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
    expect(userRepositoryMock.update).toHaveBeenCalled();
  });

  test('Throw an error because username is already exist and it belongs to another user', () => {
    const user = createUser();

    const payload: UserUpdateInput = {
      executorId: user.userId,
      data: {
        name: 'name2',
        username: user.username,
        about: 'about2',
      },
    };

    const userRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
    } as Partial<UserRepository>;

    const updateUseCase = new UserUpdateUseCase(
      userRepositoryMock as UserRepository,
    );
    expect(updateUseCase.execute(payload)).rejects.toThrow(ForbiddenException);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
  });
});
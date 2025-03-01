import { BadBodyException } from '@cloneoverflow/common';
import { User } from '@core/models/User';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserUpdateUseCase } from '@core/services/user';
import { UserUpdateInput } from '@core/services/user/update/dto';

describe('Service: test UserGetUseCase', () => {
  test('Update user name, username and about information', async () => {
    const executorId = 'userId';

    const userEntity = User.new({
      id: executorId,
      name: 'name',
      username: 'username',
    });

    const payload: UserUpdateInput = {
      executorId,
      data: {
        name: 'name2',
        username: 'username2',
        about: 'about2',
      },
    };

    const userRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(Promise.resolve(false)),
      update: jest.fn().mockResolvedValue(Promise.resolve(userEntity)),
    } as Partial<UserRepository>;

    const updateUseCase = new UserUpdateUseCase(
      userRepositoryMock as UserRepository,
    );

    const updatedUser = await updateUseCase.execute(payload);
    expect(updatedUser).toBe(userEntity);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
    expect(userRepositoryMock.update).toHaveBeenCalled();
  });

  test('Throw an error because username is already exist and it belongs to another user', () => {
    const user1 = User.new({
      name: 'name',
      username: 'username',
    });

    const payload: UserUpdateInput = {
      executorId: user1.id,
      data: {
        name: 'name2',
        username: 'username2',
        about: 'about2',
      },
    };

    const userRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(Promise.resolve(true)),
    } as Partial<UserRepository>;

    const updateUseCase = new UserUpdateUseCase(
      userRepositoryMock as UserRepository,
    );
    expect(updateUseCase.execute(payload)).rejects.toThrow(BadBodyException);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
  });
});
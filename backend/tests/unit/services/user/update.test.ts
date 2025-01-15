import { BadBodyException } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '@core/services/user/dtos/UserServiceInput';
import { UserUpdateUseCase } from '@core/services/user/usecases/update';

describe('Service: test UserGetUseCase', () => {
  test('Update user name, username and about information', async () => {
    const executorId = 'userId';

    const userEntity = User.new({
      id: executorId,
      name: 'name',
      username: 'username',
    });

    const payload: UserServiceInput.Update = {
      executorId,
      data: {
        name: 'name2',
        username: 'username2',
        about: 'about2',
      },
    };

    const userRepositoryMock = {
      isExist: async () => false,
      update: async ({ userId, user, returnEntity }) => {
        expect(userId).toEqual(executorId);
        expect(user.name).toEqual(payload.data.name);
        expect(user.username).toEqual(payload.data.username);
        expect(user.about).toEqual(payload.data.about);
        expect(returnEntity).toBeTruthy();
        return userEntity;
      },
    } as Partial<UserRepository>;

    const updateUseCase = new UserUpdateUseCase(
      userRepositoryMock as UserRepository,
    );

    const updatedUser = await updateUseCase.execute(payload);
    expect(updatedUser).toBe(userEntity);
  });

  test('Throw an error because username is already exist and it belongs to another user', () => {
    const user1 = User.new({
      name: 'name',
      username: 'username',
    });

    const payload: UserServiceInput.Update = {
      executorId: user1.id,
      data: {
        name: 'name2',
        username: 'username2',
        about: 'about2',
      },
    };

    const userRepositoryMock = {
      isExist: async () => true,
    } as Partial<UserRepository>;

    const updateUseCase = new UserUpdateUseCase(
      userRepositoryMock as UserRepository,
    );
    expect(updateUseCase.execute(payload)).rejects.toThrow(BadBodyException);
  });
});
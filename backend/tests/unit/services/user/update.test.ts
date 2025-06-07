import { UserUpdateUseCase } from '@application/user/usecases';
import { UserUpdateInput } from '@application/user/usecases/update/dto';
import { UserRepository } from '@core/user/repository/UserRepository';
import { UsernameAlreadyExists } from '@core/user/exceptions';
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

  test('Throw an error because username already exists and it belongs to another user', () => {
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
    expect(updateUseCase.execute(payload)).rejects.toThrow(UsernameAlreadyExists);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
  });
});
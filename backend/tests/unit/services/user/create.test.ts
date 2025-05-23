import { AlreadyRegisteredException } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserCreateUseCase } from '@core/services/user';
import { UserCreateInput } from '@core/services/user/create/dto';

describe('Service: test UserCreateUseCase', () => {
  test('Create user', async () => {
    const payload: UserCreateInput = {
      name: 'name',
      username: 'username',
      about: 'about',
      email: 'email',
      password: 'password',
    };

    const userRepositoryMock = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
      createWithCreds: jest.fn(),
    } as Partial<UserRepository>;

    const dataHasherMock = {
      hash: jest.fn().mockReturnValue(Promise.resolve('hash')),
    } as Partial<DataHasher>;

    const createUseCase = new UserCreateUseCase(
      userRepositoryMock as UserRepository,
      dataHasherMock as DataHasher,
    );

    await createUseCase.execute(payload);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
    expect(userRepositoryMock.createWithCreds).toHaveBeenCalled();
    expect(dataHasherMock.hash).toHaveBeenCalled();
  });

  test('Throw an error because user already exist', () => {
    const payload: UserCreateInput = {
      name: 'name',
      username: 'username',
      about: 'about',
      email: 'email',
      password: 'password',
    };

    const userRepositoryMock = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as Partial<UserRepository>;

    const createUseCase = new UserCreateUseCase(
      userRepositoryMock as UserRepository,
      {} as DataHasher,
    );

    expect(createUseCase.execute(payload)).rejects.toThrow(AlreadyRegisteredException);
    expect(userRepositoryMock.isExist).toHaveBeenCalled();
  });
});
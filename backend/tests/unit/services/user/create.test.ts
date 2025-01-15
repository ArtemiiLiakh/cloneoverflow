import { AlreadyRegisteredException } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { User } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '@core/services/user/dtos/UserServiceInput';
import { UserCreateUseCase } from '@core/services/user/usecases/create';

describe('Service: test UserCreateUseCase', () => {
  test('Create user', async () => {
    const payload: UserServiceInput.Create = {
      name: 'name',
      username: 'username',
      about: 'about',
      email: 'email',
      password: 'password',
    };

    let newUserId;

    const userRepositoryMock = {
      getPartialUser: async () => null,
      createWithCreds: async ({ creds, user }) => {
        newUserId = user.id;

        expect(user.id).toEqual(creds.id);
        expect(creds.email).toEqual(payload.email);
        expect(creds.password).toEqual('hash');
        expect(user.name).toEqual(payload.name);
        expect(user.username).toEqual(payload.username);
        expect(user.about).toEqual(payload.about);
      },
    } as Partial<UserRepository>;

    const dataHasherMock = {
      hash: async (password) => {
        expect(password).toEqual(payload.password);
        return 'hash';
      },
    } as Partial<DataHasher>;

    const createUseCase = new UserCreateUseCase(
      userRepositoryMock as UserRepository,
      dataHasherMock as DataHasher,
    );

    const user = await createUseCase.execute(payload);
    expect(user.id).toEqual(newUserId);
  });

  test('Throw an error because user already exist', () => {
    const payload: UserServiceInput.Create = {
      name: 'name',
      username: 'username',
      about: 'about',
      email: 'email',
      password: 'password',
    };

    const existingUser = User.new({
      name: 'name',
      username: 'username',
    });

    const userRepositoryMock = {
      getPartialUser: async () => ({ 
        entity: existingUser,
      }),
    } as Partial<UserRepository>;

    const dataHasherMock = {
      hash: async (password) => {
        expect(password).toEqual(payload.password);
        return 'hash';
      },
    } as Partial<DataHasher>;

    const createUseCase = new UserCreateUseCase(
      userRepositoryMock as UserRepository,
      dataHasherMock as DataHasher,
    );

    expect(createUseCase.execute(payload)).rejects.toThrow(AlreadyRegisteredException);
  });
});
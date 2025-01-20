import { User } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserGetUseCase } from '@core/services/user';

describe('Service: test UserGetUseCase', () => {
  test('Get user', async () => {
    const existingUser = User.new({
      name: 'name',
      username: 'username',
    });

    const userRepositoryMock = {
      getById: async ({ userId }) => {
        expect(userId).toEqual(existingUser.id);
        return existingUser;
      },
    } as Partial<UserRepository>;

    const getUseCase = new UserGetUseCase(userRepositoryMock as UserRepository);
    
    const user = await getUseCase.execute({ userId: existingUser.id });
    expect(user).toBe(existingUser);
  });
});
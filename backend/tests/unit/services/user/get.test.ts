import { User } from '@core/models/User';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserGetUseCase } from '@core/services/user';

describe('Service: test UserGetUseCase', () => {
  test('Get user', async () => {
    const existingUser = User.new({
      name: 'name',
      username: 'username',
    });

    const userRepositoryMock = {
      getById: jest.fn().mockReturnValue(Promise.resolve(existingUser)),
    } as Partial<UserRepository>;

    const getUseCase = new UserGetUseCase(userRepositoryMock as UserRepository);
    
    const user = await getUseCase.execute({ userId: existingUser.id });
    expect(user).toBe(existingUser);
    expect(userRepositoryMock.getById).toHaveBeenCalled();
  });
});
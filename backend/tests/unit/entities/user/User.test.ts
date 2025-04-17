import { UserStatusEnum } from '@cloneoverflow/common';
import { User } from '@core/models/user/User';

describe('Entity: test User entity', () => {
  test('Create User entity with fullfiled fields', () => {
    const payload: User = {
      userId: 'userId',
      name: 'name',
      username: 'username',
      rating: 0,
      status: UserStatusEnum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const user = User.new(payload);

    expect(user).toMatchObject(payload);
  });
});
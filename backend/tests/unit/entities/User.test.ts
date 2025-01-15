import { UserStatusEnum } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import { isUUID } from 'class-validator';

describe('Entity: test User entity', () => {
  test('Create User entity with default fields', () => {
    const now = Date.now();
    
    const user = User.new({
      name: 'name',
      username: 'username',
    });

    expect(isUUID(user.id)).toBeTruthy();
    expect(user.name).toEqual('name');
    expect(user.username).toEqual('username');
    expect(user.rating).toEqual(0);
    expect(user.about).toEqual('');
    expect(user.status).toEqual(UserStatusEnum.USER);
    expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(now);
    expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  test('Create User entity with custom fields', () => {
    const date = new Date();
    
    const payload: User = {
      id: 'id',
      name: 'name',
      username: 'username',
      about: 'about',
      rating: 10,
      status: UserStatusEnum.BLOCKED,
      createdAt: date,
      updatedAt: date,
    };

    const user = User.new(payload);

    expect(user).toEqual(payload);
  });
});
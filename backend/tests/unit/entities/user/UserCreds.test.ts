import { UserCreds } from '@core/user';

describe('Entity: test UserCreds entity', () => {
  test('Create UserCreds entity with fullfiled fields', () => {
    const payload: UserCreds = {
      userId: 'userId',
      email: 'email',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const user = UserCreds.new(payload);

    expect(user).toMatchObject(payload);
  });
});
import { UserStatusEnum } from '@cloneoverflow/common';
import { UserProfile } from '@core/models/user';

describe('Entity: test UserProfile entity', () => {
  test('Create UserProfile entity with fullfiled fields', () => {
    const payload: UserProfile = {
      userId: 'userId',
      email: 'email',
      name: 'name',
      username: 'username',
      rating: 0,
      status: UserStatusEnum.USER,
      about: 'about',
      createdAt: new Date(),
      updatedAt: new Date(),
      answerAmount: 0,
      questionAmount: 0,
    };
    
    const user = UserProfile.new(payload);

    expect(user).toMatchObject(payload);
  });
});
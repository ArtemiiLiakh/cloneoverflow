import { UserStatusEnum } from '@cloneoverflow/common';
import { AnswerOwner } from '@core/answer';

describe('Entity: test AnswerOwner entity', () => {
  test('Create AnswerOwner entity with fullfiled fields', () => {
    const payload: AnswerOwner = {
      answerId: 'answerId',
      userId: 'userId',
      name: 'name',
      username: 'username',
      rating: 0,
      status: UserStatusEnum.USER,
    };

    const answer = AnswerOwner.new(payload);

    expect(answer).toMatchObject(payload);
  });
});
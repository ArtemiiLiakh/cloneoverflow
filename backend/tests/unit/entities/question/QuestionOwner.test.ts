import { UserStatusEnum } from '@cloneoverflow/common';
import { QuestionOwner } from '@core/question';

describe('Entity: test QuestionOwner entity', () => {
  test('Create QuestionOwner entity with fullfiled fields', () => {
    const payload: QuestionOwner = {
      questionId: 'questionId',
      userId: 'userId',
      name: 'name',
      username: 'username',
      rating: 0,
      status: UserStatusEnum.BLOCKED,
    };

    const answer = QuestionOwner.new(payload);

    expect(answer).toMatchObject(payload);
  });
});
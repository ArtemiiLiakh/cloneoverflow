import { UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerDetails } from '@core/answer';

describe('Entity: test AnswerDetails entity', () => {
  test('Create AnswerDetails entity with fullfiled fields', () => {
    const payload: AnswerDetails = {
      answerId: 'answerId',
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
      rating: 0,
      isSolution: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: {
        userId: 'userId',
        answerId: 'answerId',
        name: 'name',
        username: 'username',
        rating: 0,
        status: UserStatusEnum.ADMIN,
      },
      voter: {
        id: 'id',
        answerId: 'answerId',
        userId: 'userId',
        voteType: VoteTypeEnum.DOWN,
      },
    };

    const answer = AnswerDetails.new(payload);

    expect(answer).toMatchObject(payload);
  });

  test('Create AnswerDetails entity without owner and voter', () => {
    const payload: AnswerDetails = {
      answerId: 'answerId',
      ownerId: '',
      questionId: 'questionId',
      text: 'text',
      rating: 0,
      isSolution: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: null,
      voter: null,
    };

    const answer = AnswerDetails.new(payload);

    expect(answer).toMatchObject(payload);
  });
});
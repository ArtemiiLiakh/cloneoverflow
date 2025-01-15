import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { isUUID } from 'class-validator';

describe('Entity: test AnswerUser entity', () => {
  test('Create AnswerUser entity with default fields', () => {
    const answerUserStats = AnswerUser.new({
      userId: 'userId',
      answerId: 'answerId',
      status: AnswerUserStatusEnum.OWNER,
    });

    expect(isUUID(answerUserStats.id)).toBeTruthy();
    expect(answerUserStats.userId).toEqual('userId');
    expect(answerUserStats.answerId).toEqual('answerId');
    expect(answerUserStats.status).toEqual(AnswerUserStatusEnum.OWNER);
    expect(answerUserStats.voteType).toEqual(null);
  });

  test('Create AnswerUserStats entity with custom fields', () => {
    const payload: AnswerUser = {
      id: 'id',
      answerId: 'answerId',
      userId: 'userId',
      status: AnswerUserStatusEnum.VOTER,
      voteType: VoteTypeEnum.DOWN,
    };

    const question = AnswerUser.new(payload);

    expect(question).toEqual(payload);
  });
});
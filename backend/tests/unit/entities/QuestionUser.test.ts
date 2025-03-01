import { QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/models/QuestionUser';

describe('Entity: test QuestionUser entity', () => {
  test('Create QuestionUserStats entity with default fields', () => {
    const questionUserStats = QuestionUser.new({
      userId: 'userId',
      questionId: 'questionId',
      status: QuestionUserStatusEnum.OWNER,
    });

    expect(questionUserStats.id).toEqual('');
    expect(questionUserStats.userId).toEqual('userId');
    expect(questionUserStats.questionId).toEqual('questionId');
    expect(questionUserStats.status).toEqual(QuestionUserStatusEnum.OWNER);
    expect(questionUserStats.voteType).toEqual(null);
  });

  test('Create QuestionUserStats entity with custom fields', () => {
    const payload: QuestionUser = {
      id: 'id',
      questionId: 'questionId',
      userId: 'userId',
      status: QuestionUserStatusEnum.ANSWERER,
      voteType: VoteTypeEnum.DOWN,
    };

    const question = QuestionUser.new(payload);

    expect(question).toEqual(payload);
  });
});
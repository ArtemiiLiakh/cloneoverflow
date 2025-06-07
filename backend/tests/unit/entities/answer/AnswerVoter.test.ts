import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerVoter } from '@core/answer';

describe('Entity: test AnswerVoter entity', () => {
  test('Create AnswerVoter entity with fullfiled fields', () => {
    const payload: AnswerVoter = {
      id: 'id',
      userId: 'userId',
      answerId: 'answerId',
      voteType: VoteTypeEnum.UP,
    };

    const answerVoter = AnswerVoter.new(payload);

    expect(answerVoter).toMatchObject(payload);
  });
});
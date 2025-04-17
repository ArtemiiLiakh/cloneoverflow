import { VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionVoter } from '@core/models/question';

describe('Entity: test QuestionVoter entity', () => {
  test('Create QuestionVoter entity with fullfiled fields', () => {
    const payload: QuestionVoter = {
      id: 'id',
      userId: 'userId',
      questionId: 'questionId',
      voteType: VoteTypeEnum.UP,
    };

    const answerVoter = QuestionVoter.new(payload);

    expect(answerVoter).toMatchObject(payload);
  });
});
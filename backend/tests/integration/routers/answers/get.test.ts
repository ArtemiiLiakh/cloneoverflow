import { AnswerGetResponse } from '@cloneoverflow/common/api/answer';
import { Answer } from '@core/answer';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/answers/:answerId', () => {
  let answer: Answer;

  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.userId });

    answer = await answerUtils.create({ ownerId: owner.userId, questionId: +question.questionId });
  });

  test('Expect it returns answer', async () => {
    const answerRes = await supertest(app)
      .get(`/api/answers/${answer.answerId}`)
      .expect(200)
      .then(res => res.body as AnswerGetResponse);
    
    expect(answerRes.id).toEqual(answer.answerId);
    expect(answerRes.owner?.id).toEqual(answer.ownerId);
    expect(answerRes.questionId).toEqual(answer.questionId);
    expect(answerRes.text).toEqual(answer.text);
    expect(answerRes.rating).toEqual(answer.rating);
    expect(answerRes.isSolution).toEqual(answer.isSolution);
  });

  test('When answer id is wrong or not found expect it retuns error 400 or 404', async () => {
    await supertest(app)
      .get('/api/answers/0')
      .expect(404);

    await supertest(app)
      .get('/api/answers/wrongId')
      .expect(400);
  });
});
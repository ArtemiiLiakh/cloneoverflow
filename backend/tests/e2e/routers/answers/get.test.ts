import { AnswerGetResponse } from '@cloneoverflow/common';
import { Answer } from '@core/models';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
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
    const question = await questionUtils.create({ ownerId: owner.id });
    answer = await answerUtils.create({ questionId: question.id, ownerId: owner.id });
  });

  test('Expect it returns answer', async () => {
    const answerRes: AnswerGetResponse = await supertest(app)
      .get(`/api/answers/${answer.id}`)
      .expect(200)
      .then(res => res.body);
    
    expect(answerRes.id).toEqual(answer.id);
    expect(answerRes.owner?.id).toEqual(answer.ownerId);
    expect(answerRes.question.id).toEqual(answer.questionId);
    expect(answerRes.text).toEqual(answer.text);
    expect(answerRes.rate).toEqual(answer.rating);
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
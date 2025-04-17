import { Question } from '@core/models/question';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/questions/:questionId/viewer', () => {
  let question: Question;
  let accessToken: string;
  let questionUtils: QuestionUtils;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);

    const owner = await userUtils.create();
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
    question = await questionUtils.create({ ownerId: owner.userId });
  });

  test('Expect it creates viewer for question and increases its count', async () => {
    await supertest(app)
      .post(`/api/questions/${question.questionId}/viewer`)
      .set('Cookie', accessToken)
      .expect(201);

    const viewedQuestion = await questionUtils.getQuestion(question.questionId);
    
    expect(question.views).toEqual(0);
    expect(viewedQuestion?.views).toEqual(1);
  });

  test('When accessToken is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post(`/api/questions/${question.questionId}/viewer`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post(`/api/questions/${question.questionId}/viewer`)
      .expect(401);
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/viewer')
      .set('Cookie', accessToken)
      .expect(404);

    await supertest(app)
      .post('/api/questions/wrongId/viewer')
      .set('Cookie', accessToken)
      .expect(400);
  });
});
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/questions/:questionId/open', () => {
  let accessToken: string;
  let questionId: string;
  let answerId: string;
  let questionUtils: QuestionUtils;
  let answerUtils: AnswerUtils;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
    questionId = (await questionUtils.create({ 
      ownerId: owner.userId, 
      isClosed: true,
    })).questionId;

    answerId = (await answerUtils.create({ 
      ownerId: owner.userId, 
      questionId: +questionId, 
      isSolution: true,
    })).answerId;
  });

  test('Expect it opens question', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/open`)
      .set('Cookie', accessToken)
      .expect(201);

    const question = await questionUtils.getQuestion(questionId);
    const answer = await answerUtils.getAnswer(answerId);
    
    expect(question?.isClosed).toEqual(false);
    expect(answer?.isSolution).toEqual(false);
  });

  test('When question is already opened expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/open`)
      .set('Cookie', accessToken)
      .expect(403);
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/open')
      .set('Cookie', accessToken)
      .expect(404);

    await supertest(app)
      .post('/api/questions/questionId/open')
      .set('Cookie', accessToken)
      .expect(400);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/questions/0/open')
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post('/api/questions/questionId/open')
      .expect(401);
  });
});
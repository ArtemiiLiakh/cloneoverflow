import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/questions/:questionId/open', () => {
  let ownerAuthToken: string;
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
    
    const tokens = await userUtils.getTokens(owner);
    ownerAuthToken = tokens.accessToken + ';' + tokens.refreshToken;
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
      .set('Cookie', ownerAuthToken)
      .expect(204);

    const question = await questionUtils.getQuestion(questionId);
    const answer = await answerUtils.getAnswer(answerId);
    
    expect(question?.isClosed).toEqual(false);
    expect(answer?.isSolution).toEqual(false);
  });

  test('When question is already opened expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/open`)
      .set('Cookie', ownerAuthToken)
      .expect(403);
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/open')
      .set('Cookie', ownerAuthToken)
      .expect(404);

    await supertest(app)
      .post('/api/questions/questionId/open')
      .set('Cookie', ownerAuthToken)
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
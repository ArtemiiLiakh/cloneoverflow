import { initTestApplication } from '@tests/integration/initTestApplication';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/questions/:questionId/vote', () => {
  let ownerAuthToken: string;
  let userAuthToken: string;
  let ownerId: string;
  let questionId: string;
  
  let app: App;
  let userUtils: UserUtils;
  let questionUtils: QuestionUtils; 

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);

    const owner = await userUtils.create();
    const user = await userUtils.create({ rating: 10000 });

    ownerId = owner.userId;
    questionId = (await questionUtils.create({ ownerId })).questionId;
    
    const ownerTokens = await userUtils.getTokens(owner);
    const userTokens = await userUtils.getTokens(user);

    ownerAuthToken = ownerTokens.accessToken + ';' + ownerTokens.refreshToken;
    userAuthToken = userTokens.accessToken + ';' + userTokens.refreshToken;
  });

  test('Expect it changes rating on vote', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote/up`)
      .set('Cookie', userAuthToken)
      .expect(204);

    const owner = await userUtils.getUser(ownerId);
    const question = await questionUtils.getQuestion(questionId);
    
    expect(owner?.rating).toEqual(1);
    expect(question?.rating).toEqual(1);
  });

  test('Expect it changes rating when user votes question with different type', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote/down`)
      .set('Cookie', userAuthToken)
      .expect(204);

    const owner = await userUtils.getUser(ownerId);
    const question = await questionUtils.getQuestion(questionId);
    
    expect(owner?.rating).toEqual(0);
    expect(question?.rating).toEqual(0);
  });

  test('When user votes the same type twice expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote/up`)
      .set('Cookie', userAuthToken)
      .expect(204);
    
    await supertest(app)
      .post(`/api/questions/${questionId}/vote/up`)
      .set('Cookie', userAuthToken)
      .expect(403);
  });

  test('When owner votes question expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote/down`)
      .set('Cookie', ownerAuthToken)
      .expect(403);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote/up`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post(`/api/questions/${questionId}/vote/down`)
      .expect(401);
  });

  test('When question is not found or id is invalid expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/vote/up')
      .set('Cookie', userAuthToken)
      .expect(404);

    await supertest(app)
      .post('/api/questions/wrongId/vote/up')
      .set('Cookie', userAuthToken)
      .expect(400);
  });
});
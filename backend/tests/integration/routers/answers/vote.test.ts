import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/answers/:id/vote', () => {
  let ownerAuthToken: string;
  let userAuthToken: string;
  let answerId: string;
  let ownerId: string;
  
  let app: App;
  let userUtils: UserUtils;
  let questionUtils: QuestionUtils;
  let answerUtils: AnswerUtils;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest);
    
    const owner = await userUtils.create();
    const user = await userUtils.create({ rating: 10000 });

    ownerId = owner.userId;
    const questionId = (await questionUtils.create({ ownerId })).questionId;
    
    answerId = (await answerUtils.create({ 
      ownerId, 
      questionId: +questionId,
    })).answerId;

    const ownerTokens = await userUtils.getTokens(owner);
    const userTokens = await userUtils.getTokens(user);

    ownerAuthToken = ownerTokens.accessToken + ';' + ownerTokens.refreshToken;
    userAuthToken = userTokens.accessToken + ';' + userTokens.refreshToken;
  });

  test('Expect it changes rating on vote', async () => {
    await supertest(app)
      .post(`/api/answers/${answerId}/vote/up`)
      .set('Cookie', userAuthToken)
      .expect(204);

    const owner = await userUtils.getUser(ownerId);
    const answer = await answerUtils.getAnswer(answerId);

    expect(owner?.rating).toEqual(1);
    expect(answer?.rating).toEqual(1);
  });

  test('Expect it changes rating when user votes question with different type', async () => {
    await supertest(app)
      .post(`/api/answers/${answerId}/vote/down`)
      .set('Cookie', userAuthToken)
      .expect(204);

    const owner = await userUtils.getUser(ownerId);
    const answer = await answerUtils.getAnswer(answerId);

    expect(owner?.rating).toEqual(0);
    expect(answer?.rating).toEqual(0);
  });

  test('When user votes the same type twice expect it returns error 400', async () => {
    await supertest(app)
      .post(`/api/answers/${answerId}/vote/up`)
      .set('Cookie', userAuthToken)
      .expect(204);

    await supertest(app)
      .post(`/api/answers/${answerId}/vote/up`)
      .set('Cookie', userAuthToken)
      .expect(403);
  });

  test('When owner votes expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/answers/${answerId}/vote/up`)
      .set('Cookie', ownerAuthToken)
      .expect(403);
  });

  test('When vote data is invalid expect it returns error 400', async () => {
    await supertest(app)
      .post(`/api/answers/${answerId}/vote`)
      .set('Cookie', userAuthToken)
      .expect(404);
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post(`/api/answers/${answerId}/vote/up`)
      .expect(401);

    await supertest(app)
      .post(`/api/answers/${answerId}/vote/up`)
      .set('Cookie', 'accessToken=wrong')
      .expect(401);
  });

  test('When answerId is not found or id is invalid expect it returns error 400', async () => {
    await supertest(app)
      .post('/api/answers/0/vote/up')
      .set('Cookie', userAuthToken)
      .expect(404);

    await supertest(app)
      .post('/api/answers/wrongId/vote/up')
      .set('Cookie', userAuthToken)
      .expect(400);
  });
});
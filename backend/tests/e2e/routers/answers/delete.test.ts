import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('DELETE /api/answers/:answerId', () => {
  let answerId1: string;
  let answerId2: string;
  
  let ownerAccessToken: string;
  let ownerRefreshToken: string;
  
  let userAccessToken: string;
  let userRefreshToken: string;
  
  let app: App;
  let answerUtils: AnswerUtils;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest);
    
    const owner = await userUtils.create();
    const user = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.userId });
    const answer1 = await answerUtils.create({ ownerId: owner.userId, questionId: +question.questionId });
    const answer2 = await answerUtils.create({ ownerId: owner.userId, questionId: +question.questionId });

    const ownerTokens = await userUtils.getTokens(owner);
    ownerAccessToken = 'accessToken=' + ownerTokens.accessToken;
    ownerRefreshToken = 'refreshToken=' + ownerTokens.refreshToken;

    const userTokens = await userUtils.getTokens(user);
    userAccessToken = 'accessToken=' + userTokens.accessToken;
    userRefreshToken = 'refreshToken=' + userTokens.refreshToken;

    answerId1 = answer1.answerId;
    answerId2 = answer2.answerId;
  });

  test('Expect it deletes question', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId1}`)
      .set('Cookie', [ownerAccessToken, ownerRefreshToken])
      .expect(200);

    expect(await answerUtils.getAnswer(answerId1)).toBeNull();
  });

  test('When answer is not exists expect it returns error 404', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId1}`)
      .set('Cookie', [ownerAccessToken, ownerRefreshToken])
      .expect(404);
  });

  test('When user is not answer owner expect it returns error 403', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .set('Cookie', [userAccessToken, userRefreshToken])
      .expect(403);
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .expect(401);
  });
});
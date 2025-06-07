import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('DELETE /api/answers/:answerId', () => {
  let answerId1: string;
  let answerId2: string;
  
  let ownerAuthTokens: string;
  let userAuthToken: string;
  
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
    ownerAuthTokens = ownerTokens.accessToken + ';' + ownerTokens.refreshToken;

    const userTokens = await userUtils.getTokens(user);
    userAuthToken = userTokens.accessToken + ';' + userTokens.refreshToken;

    answerId1 = answer1.answerId;
    answerId2 = answer2.answerId;
  });

  test('Expect it deletes question', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId1}`)
      .set('Cookie', ownerAuthTokens)
      .expect(204);

    expect(await answerUtils.getAnswer(answerId1)).toBeNull();
  });

  test('When answer is not exists expect it returns error 404', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId1}`)
      .set('Cookie', ownerAuthTokens)
      .expect(404);
  });

  test('When user is not answer owner expect it returns error 403', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .set('Cookie', userAuthToken)
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
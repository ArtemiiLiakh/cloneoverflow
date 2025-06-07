import { AnswerUpdateBody } from '@cloneoverflow/common/api/answer';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/answers/:answerId', () => {
  let answerId: string;
  let ownerAuthTokens: string;
  
  let app: App;
  let userUtils: UserUtils;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();
    
    userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.userId });
    const answer = await answerUtils.create({ 
      ownerId: owner.userId, 
      questionId: +question.questionId,
    });

    answerId = answer.answerId;

    const tokens = await userUtils.getTokens(owner);
    ownerAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });
  
  test('Expect it updates an answer', async () => {
    const updateData: AnswerUpdateBody = {
      text: 'Updated text',
    };

    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send(updateData)
      .set('Cookie', ownerAuthTokens)
      .expect(204);
  });

  test('When user is not answer owner and his rating less than required expect it returns error 403', async () => {
    const user = await userUtils.create({ rating: 0 });
    const userTokens = await userUtils.getTokens(user);
    
    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send({ text: 'Updated text' } as AnswerUpdateBody)
      .set('Cookie', [userTokens.accessToken, userTokens.refreshToken])
      .expect(403);
  });

  test('When answer is not found or id is wrong expect it returns 404 or 400', async () => {
    await supertest(app)
      .patch('/api/answers/0')
      .send({ text: 'Updated text' } as AnswerUpdateBody)
      .set('Cookie', ownerAuthTokens)
      .expect(404);

    await supertest(app)
      .patch('/api/answers/invalidId')
      .send({ text: 'Updated text' } as AnswerUpdateBody)
      .set('Cookie', ownerAuthTokens)
      .expect(400);
  });

  test('When update data is empty expect it returns 400', async () => {
    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .set('Cookie', ownerAuthTokens)
      .expect(400);
  });

  test('When user is unauthorized or access token is wrong expect it returns 401', async () => {
    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send({ text: 'Updated text' } as AnswerUpdateBody)
      .expect(401);

    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send({ text: 'Updated text' } as AnswerUpdateBody)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
  });
});
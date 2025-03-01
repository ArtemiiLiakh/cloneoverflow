import { AnswerUpdateDTO, AnswerUpdateResponse } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/answers/:answerId', () => {
  let answerId: string;
  let ownerAccessToken: string;
  
  let app: App;
  let userUtils: UserUtils;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();
    
    userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.id });
    const answer = await answerUtils.create({ ownerId: owner.id, questionId: question.id });

    answerId = answer.id;
    ownerAccessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
  });
  
  test('Expect it updates an answer', async () => {
    const updateData: AnswerUpdateDTO = {
      text: 'Updated text',
    };

    const updatedAnswer: AnswerUpdateResponse = await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send(updateData)
      .set('Cookie', ownerAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(updatedAnswer.id).toBe(answerId);
    expect(updatedAnswer.text).toBe(updateData.text);
  });

  test('When user is not answer owner and his rating less than required expect it returns error 403', async () => {
    const user = await userUtils.create({ rating: 0 });
    const userAccessToken = 'accessToken='+(await userUtils.getTokens(user)).accessToken;
    
    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send({ text: 'Updated text' } as AnswerUpdateDTO)
      .set('Cookie', userAccessToken)
      .expect(403);
  });

  test('When answer is not found or id is wrong expect it returns 404 or 400', async () => {
    await supertest(app)
      .patch('/api/answers/0')
      .send({ text: 'Updated text' } as AnswerUpdateDTO)
      .set('Cookie', ownerAccessToken)
      .expect(404);

    await supertest(app)
      .patch('/api/answers/invalidId')
      .send({ text: 'Updated text' } as AnswerUpdateDTO)
      .set('Cookie', ownerAccessToken)
      .expect(400);
  });

  test('When update data is empty expect it returns 400', async () => {
    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .set('Cookie', ownerAccessToken)
      .expect(400);
  });

  test('When user is unauthorized or access token is wrong expect it returns 401', async () => {
    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send({ text: 'Updated text' } as AnswerUpdateDTO)
      .expect(401);

    await supertest(app)
      .patch(`/api/answers/${answerId}`)
      .send({ text: 'Updated text' } as AnswerUpdateDTO)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
  });
});
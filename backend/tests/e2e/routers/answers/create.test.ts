import { PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AnswerCreateDTO, AnswerCreateResponse } from '@cloneoverflow/common';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('POST /api/answers', () => {
  let ownerId: string;
  let questionId: string;
  let ownerAccessToken: string;

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.id });
    
    ownerId = owner.id;
    questionId = question.id;
    ownerAccessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
  });

  test('Expect it creates an answer', async () => {
    const createData: AnswerCreateDTO = {
      questionId,
      text: 'answer',
    };

    const answer: AnswerCreateResponse = await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAccessToken)
      .send(createData)
      .expect(201)
      .then(res => res.body);

    expect(answer.ownerId).toEqual(ownerId);
    expect(answer.questionId).toEqual(questionId);
    expect(answer.text).toEqual(createData.text);
    expect(answer.isSolution).toBeFalsy();
    expect(answer.rate).toEqual(0);
  });

  test('When question does not exists or create data is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAccessToken)
      .send({
        questionId: '0',
        text: 'answer',
      } as AnswerCreateDTO)
      .expect(404);

    await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAccessToken)
      .send({
        questionId,
      } as AnswerCreateDTO)
      .expect(400);

    await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAccessToken)
      .expect(400);
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/answers')
      .set('Cookie', 'accessToken=invalidToken')
      .send({})
      .expect(401);

    await supertest(app)
      .post('/api/answers')
      .send({})
      .expect(401);
  });
});
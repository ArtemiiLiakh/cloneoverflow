import { PrismaAnswerRepositoryDI, PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { QuestionCloseDTO } from '@cloneoverflow/common';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('POST /api/questions/:questionId/close', () => {
  let accessToken: string;
  let questionId: string;
  let answerId: string;
  const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
  const answerUtils = new AnswerUtils(PrismaAnswerRepositoryDI, PrismaTransactionDI);

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const owner = await userUtils.create();
    
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
    questionId = (await questionUtils.create({ ownerId: owner.id })).id;
    answerId = (await answerUtils.create({ ownerId: owner.id, questionId })).id;
  });

  test('Expect it opens and closes question', async () => {
    const closeData: QuestionCloseDTO = {
      answerId,
    };

    await supertest(app)
      .patch(`/api/questions/${questionId}/close`)
      .set('Cookie', accessToken)
      .send(closeData)
      .expect(200);

    const question = await questionUtils.getQuestion(questionId);
    const answer = await answerUtils.getAnswer(answerId);
  
    expect(question?.isClosed).toBeTruthy();
    expect(answer?.isSolution).toBeTruthy();
  });

  test('When question is already closed expect it returns error 400', async () => {
    await supertest(app)
      .patch(`/api/questions/${questionId}/close`)
      .set('Cookie', accessToken)
      .send({ answerId })
      .expect(400);
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .patch('/api/questions/0/close')
      .set('Cookie', accessToken)
      .send({ answerId })
      .expect(404);

    await supertest(app)
      .patch('/api/questions/questionId/close')
      .set('Cookie', accessToken)
      .send({ answerId })
      .expect(400);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .patch('/api/questions/0/close')
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .patch('/api/questions/questionId/close')
      .expect(401);
  });
});
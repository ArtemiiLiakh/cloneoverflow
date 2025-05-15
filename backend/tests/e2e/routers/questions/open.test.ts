import { PrismaAnswerRepositoryDI, PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('POST /api/questions/:questionId/open', () => {
  let accessToken: string;
  let questionId: string;
  let answerId: string;
  const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
  const answerUtils = new AnswerUtils(PrismaAnswerRepositoryDI, PrismaTransactionDI);

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const owner = await userUtils.create();
    
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
    questionId = (await questionUtils.create({ ownerId: owner.id, isClosed: true })).id;
    answerId = (await answerUtils.create({ ownerId: owner.id, questionId, isSolution: true })).id;
  });

  test('Expect it opens question', async () => {
    await supertest(app)
      .patch(`/api/questions/${questionId}/open`)
      .set('Cookie', accessToken)
      .expect(200);

    const question = await questionUtils.getQuestion(questionId);
    const answer = await answerUtils.getAnswer(answerId);
    
    expect(question?.isClosed).toEqual(false);
    expect(answer?.isSolution).toEqual(false);
  });

  test('When question is already opened expect it returns error 400', async () => {
    await supertest(app)
      .patch(`/api/questions/${questionId}/open`)
      .set('Cookie', accessToken)
      .expect(400);
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .patch('/api/questions/0/open')
      .set('Cookie', accessToken)
      .expect(404);

    await supertest(app)
      .patch('/api/questions/questionId/open')
      .set('Cookie', accessToken)
      .expect(400);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .patch('/api/questions/0/open')
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .patch('/api/questions/questionId/open')
      .expect(401);
  });
});
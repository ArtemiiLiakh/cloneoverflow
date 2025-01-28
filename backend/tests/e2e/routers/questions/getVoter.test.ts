import { PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { QuestionGetVoterResponse, VoteDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('GET /api/questions/:questionId/voter', () => {
  const voteQuestion = (
    { vote, accessToken, questionId }: { 
      vote: VoteTypeEnum, 
      questionId: string, 
      accessToken: string, 
    },
  ) => {
    return supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .set('Cookie', accessToken)
      .send({ vote } as VoteDTO)
      .expect(200);
  };

  let voterAccessToken: string;
  let voterId: string;
  let questionId: string;

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);

    const owner = await userUtils.create();
    const voter = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.id });
    
    voterId = voter.id;
    questionId = question.id;
    voterAccessToken = 'accessToken='+(await userUtils.getTokens(voter)).accessToken;
  });

  test('Expect it returns voter or null', async () => {
    const res1: QuestionGetVoterResponse = await supertest(app)
      .get(`/api/questions/${questionId}/voter`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res1.voter).toBeNull();

    await voteQuestion({
      questionId,
      vote: VoteTypeEnum.UP,
      accessToken: voterAccessToken,
    });
  
    const res2: QuestionGetVoterResponse = await supertest(app)
      .get(`/api/questions/${questionId}/voter`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res2.voter?.questionId).toEqual(questionId);
    expect(res2.voter?.voterId).toEqual(voterId);
    expect(res2.voter?.voteType).toEqual(VoteTypeEnum.UP);

    await voteQuestion({
      questionId,
      vote: VoteTypeEnum.DOWN,
      accessToken: voterAccessToken,
    });

    const res3: QuestionGetVoterResponse = await supertest(app)
      .get(`/api/questions/${questionId}/voter`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res3.voter?.questionId).toEqual(questionId);
    expect(res3.voter?.voterId).toEqual(voterId);
    expect(res3.voter?.voteType).toBeNull();
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .get(`/api/questions/${questionId}/voter`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
      
    await supertest(app)
      .get(`/api/questions/${questionId}/voter`)
      .expect(401);
  });
    
  test('When question is not found or id is wrong expect it returns error 400 or empty result', async () => {
    const res: QuestionGetVoterResponse = await supertest(app)
      .get('/api/questions/0/voter')
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res.voter).toBeNull();

    await supertest(app)
      .get('/api/questions/wrongId/voter')
      .set('Cookie', voterAccessToken)
      .expect(400);
  });
});
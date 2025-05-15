import { PrismaAnswerRepositoryDI, PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AnswerGetVoterResponse, VoteDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('GET /api/answer/:answerId/voter', () => {
  const voteAnswer = (
    { vote, accessToken, answerId }: { 
      vote: VoteTypeEnum, 
      answerId: string, 
      accessToken: string, 
    },
  ) => {
    return supertest(app)
      .post(`/api/answers/${answerId}/vote`)
      .set('Cookie', accessToken)
      .send({ vote } as VoteDTO)
      .expect(200);
  };

  let voterAccessToken: string;
  let voterId: string;
  let answerId: string;

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
    const answerUtils = new AnswerUtils(PrismaAnswerRepositoryDI, PrismaTransactionDI);

    const owner = await userUtils.create();
    const voter = await userUtils.create({ rating: 10000 });
    const question = await questionUtils.create({ ownerId: owner.id });
    
    voterId = voter.id;
    answerId = (await answerUtils.create({ ownerId: owner.id, questionId: question.id })).id;
    voterAccessToken = 'accessToken='+(await userUtils.getTokens(voter)).accessToken;
  });

  test('Expect it returns voter or null', async () => {
    const res1 = await supertest(app)
      .get(`/api/answers/${answerId}/voter`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res1.voter).toBeNull();

    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.UP,
      accessToken: voterAccessToken,
    });
  
    const res2: AnswerGetVoterResponse = await supertest(app)
      .get(`/api/answers/${answerId}/voter`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res2.voter?.userId).toEqual(voterId);
    expect(res2.voter?.answerId).toEqual(answerId);
    expect(res2.voter?.voteType).toEqual(VoteTypeEnum.UP);

    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.DOWN,
      accessToken: voterAccessToken,
    });

    const res3: AnswerGetVoterResponse = await supertest(app)
      .get(`/api/answers/${answerId}/voter`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);
    
    expect(res3.voter?.userId).toEqual(voterId);
    expect(res3.voter?.answerId).toEqual(answerId);
    expect(res3.voter?.voteType).toBeNull();
  });

  test('When user is unauthenticated or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .get(`/api/answers/${answerId}/voter`)
      .expect(401);

    await supertest(app)
      .get(`/api/answers/${answerId}/voter`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
  });

  test('When answer is not found or id is wrong expect it returns error 400 or empty result', async () => {
    const voter = await supertest(app)
      .get('/api/answers/0/voter')
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(voter.voter).toBeNull();
      
    await supertest(app)
      .get('/api/answers/invalidAnswerId/voter')
      .set('Cookie', voterAccessToken)
      .expect(400);
  });
});
import { QuestionGetVoterResponse, VoteDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/questions/:questionId/vote', () => {
  let app: App;
  let voterAccessToken: string;
  let voterId: string;
  let questionId: string;
  
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
      .expect(201);
  };

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();
    
    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);

    const owner = await userUtils.create();
    const voter = await userUtils.create({ rating: 10000 });
    const question = await questionUtils.create({ ownerId: owner.id });
    
    voterId = voter.id;
    questionId = question.id;
    voterAccessToken = 'accessToken='+(await userUtils.getTokens(voter)).accessToken;
  });

  test('Expect it returns voter or null', async () => {
    const res1: QuestionGetVoterResponse = await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
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
      .get(`/api/questions/${questionId}/vote`)
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
      .get(`/api/questions/${questionId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res3.voter?.questionId).toEqual(questionId);
    expect(res3.voter?.voterId).toEqual(voterId);
    expect(res3.voter?.voteType).toBeNull();
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
      
    await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
      .expect(401);
  });
    
  test('When question is not found or id is wrong expect it returns error 400 or empty result', async () => {
    const res: QuestionGetVoterResponse = await supertest(app)
      .get('/api/questions/0/vote')
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res.voter).toBeNull();

    await supertest(app)
      .get('/api/questions/wrongId/vote')
      .set('Cookie', voterAccessToken)
      .expect(400);
  });
});
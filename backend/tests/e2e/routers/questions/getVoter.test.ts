import { QuestionGetVoterResponse, VoteTypeEnum } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest, { Response } from 'supertest';
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
  ): Promise<Response> => {
    let url: string;
    if (vote === VoteTypeEnum.UP) {
      url = `/api/questions/${questionId}/vote/up`;
    } else {
      url = `/api/questions/${questionId}/vote/down`;
    }

    return supertest(app)
      .post(url)
      .set('Cookie', accessToken)
      .expect(201);
  };

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();
    
    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);

    const owner = await userUtils.create();
    const voter = await userUtils.create({ rating: 10000 });
    const question = await questionUtils.create({ ownerId: owner.userId });
    
    voterId = voter.userId;
    questionId = question.questionId;
    voterAccessToken = 'accessToken='+(await userUtils.getTokens(voter)).accessToken;
  });

  test('Expect it returns voter or null', async () => {
    await voteQuestion({
      questionId,
      vote: VoteTypeEnum.UP,
      accessToken: voterAccessToken,
    });
  
    const voter2: QuestionGetVoterResponse = await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(voter2.questionId).toEqual(questionId);
    expect(voter2.voterId).toEqual(voterId);
    expect(voter2.voteType).toEqual(VoteTypeEnum.UP);

    await voteQuestion({
      questionId,
      vote: VoteTypeEnum.DOWN,
      accessToken: voterAccessToken,
    });

    const voter3: QuestionGetVoterResponse = await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(voter3.questionId).toEqual(questionId);
    expect(voter3.voterId).toEqual(voterId);
    expect(voter3.voteType).toBe(VoteTypeEnum.EMPTY);
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
    
  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .get('/api/questions/0/vote')
      .set('Cookie', voterAccessToken)
      .expect(404);

    await supertest(app)
      .get('/api/questions/wrongId/vote')
      .set('Cookie', voterAccessToken)
      .expect(400);
  });
});
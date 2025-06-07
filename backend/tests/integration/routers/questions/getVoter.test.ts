import { VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionGetVoteResponse } from '@cloneoverflow/common/api/question';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest, { Response } from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/questions/:questionId/vote', () => {
  let app: App;
  let voterAccessToken: string;
  let voterAuthTokens: string;
  let voterId: string;
  let questionId: string;
  
  const voteQuestion = (
    { vote, authTokens, questionId }: { 
      vote: VoteTypeEnum, 
      questionId: string, 
      authTokens: string, 
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
      .set('Cookie', authTokens)
      .expect(204);
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

    const tokens = await userUtils.getTokens(voter);

    voterAccessToken = tokens.accessToken;
    voterAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });

  test('Expect it returns voter or null', async () => {
    await voteQuestion({
      questionId,
      vote: VoteTypeEnum.UP,
      authTokens: voterAuthTokens,
    });
  
    const vote2: QuestionGetVoteResponse = await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(vote2.voterId).toEqual(voterId);
    expect(vote2.voteType).toEqual(VoteTypeEnum.UP);

    await voteQuestion({
      questionId,
      vote: VoteTypeEnum.DOWN,
      authTokens: voterAuthTokens,
    });

    const vote3: QuestionGetVoteResponse = await supertest(app)
      .get(`/api/questions/${questionId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(vote3.voterId).toEqual(voterId);
    expect(vote3.voteType).toBe(VoteTypeEnum.EMPTY);
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
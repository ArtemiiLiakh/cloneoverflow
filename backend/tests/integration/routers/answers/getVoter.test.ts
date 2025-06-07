import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerGetVoteResponse } from '@cloneoverflow/common/api/answer';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest, { Response } from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/answers/:answerId/vote', () => {
  let voterAuthTokens: string;
  let voterAccessToken: string;
  let voterId: string;
  let answerId: string;
  
  let app: App;

  const voteAnswer = (
    { vote, ownerAuthTokens, answerId }: { 
      vote: VoteTypeEnum, 
      answerId: string, 
      ownerAuthTokens: string, 
    },
  ): Promise<Response> => {
    let url = `/api/answers/${answerId}/`;

    if (vote === VoteTypeEnum.UP) {
      url += 'vote/up';
    }
    else if (vote === VoteTypeEnum.DOWN) {
      url += 'vote/down';
    }

    return supertest(app)
      .post(url)
      .set('Cookie', ownerAuthTokens)
      .expect(204);
  };
  
  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    const voter = await userUtils.create({ rating: 10000 });
    const question = await questionUtils.create({ ownerId: owner.userId });
    
    voterId = voter.userId;
    answerId = (await answerUtils.create({ 
      ownerId: owner.userId, 
      questionId: +question.questionId,
    })).answerId;
    
    const tokens = await userUtils.getTokens(voter);
    voterAccessToken = tokens.accessToken;
    voterAuthTokens = voterAccessToken+';'+tokens.refreshToken;
  });

  test('Expect it returns voter or null', async () => {
    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.UP,
      ownerAuthTokens: voterAuthTokens,
    });
  
    const res1 = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body as AnswerGetVoteResponse);

    expect(res1.userId).toEqual(voterId);
    expect(res1.voteType).toEqual(VoteTypeEnum.UP);

    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.DOWN,
      ownerAuthTokens: voterAuthTokens,
    });

    const res2 = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body as AnswerGetVoteResponse);
    
    expect(res2.userId).toEqual(voterId);
    expect(res2.voteType).toBe(VoteTypeEnum.EMPTY);
  });

  test('When user is unauthenticated or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .expect(401);

    await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
  });

  test('When answer is not found or id is wrong expect it returns 400 or 404', async () => {
    await supertest(app)
      .get('/api/answers/0/vote')
      .set('Cookie', voterAccessToken)
      .expect(404);

    await supertest(app)
      .get('/api/answers/invalidAnswerId/vote')
      .set('Cookie', voterAccessToken)
      .expect(400);
  });
});
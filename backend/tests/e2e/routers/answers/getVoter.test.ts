import { AnswerGetVoterResponse, VoteTypeEnum } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest, { Response } from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/answers/:answerId/vote', () => {
  let voterAccessToken: string;
  let voterId: string;
  let answerId: string;
  
  let app: App;

  const voteAnswer = (
    { vote, accessToken, answerId }: { 
      vote: VoteTypeEnum, 
      answerId: string, 
      accessToken: string, 
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
      .set('Cookie', accessToken)
      .expect(200);
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
    
    voterAccessToken = 'accessToken='+(await userUtils.getTokens(voter)).accessToken;
  });

  test('Expect it returns voter or null', async () => {
    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.UP,
      accessToken: voterAccessToken,
    });
  
    const res1 = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body as AnswerGetVoterResponse);

    expect(res1.userId).toEqual(voterId);
    expect(res1.answerId).toEqual(answerId);
    expect(res1.voteType).toEqual(VoteTypeEnum.UP);

    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.DOWN,
      accessToken: voterAccessToken,
    });

    const res2 = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body as AnswerGetVoterResponse);
    
    expect(res2.userId).toEqual(voterId);
    expect(res2.answerId).toEqual(answerId);
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
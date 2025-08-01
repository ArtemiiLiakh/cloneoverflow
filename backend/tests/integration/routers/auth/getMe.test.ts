import { GetMeResponse } from '@cloneoverflow/common/api/auth';
import { User } from '@core/user';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/auth/account/me', () => {
  let user: User;
  let userAccessToken: string;
  
  let app: App;
  let userUtils: UserUtils;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);

    user = await userUtils.create();
    userAccessToken = (await userUtils.getTokens(user)).accessToken;
  });

  test('Expect it returns information about registered user', async () => {
    const res = await supertest(app)
      .get('/api/auth/account/me')
      .set('Cookie', userAccessToken)
      .expect(200)
      .then(res => res.body as GetMeResponse);

    expect(res.id).toEqual(user.userId);
  });

  test('When user does not authorized expect it returns error 401', async () => {
    await supertest(app)
      .get('/api/auth/account/me')
      .expect(401);
  });

  test('When user with access token does not exist expect it returns error 401', async () => {
    await supertest(app)
      .get('/api/auth/account/me')
      .set('Cookie', 'accessToken=invalid')
      .expect(401);

    await userUtils.delete(user.userId);

    await supertest(app)
      .get('/api/auth/account/me')
      .set('Cookie', userAccessToken)
      .expect(401);
  });
});
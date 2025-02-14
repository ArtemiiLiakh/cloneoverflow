import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AuthGetMeResponse } from '@cloneoverflow/common';
import { User } from '@core/domain/entities';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('GET /api/auth/account/me', () => {
  let user: User;
  let userAccessToken: string;
  const userUtils = new UserUtils(PrismaUserRepositoryDI);

  beforeAll(async () => {
    user = await userUtils.create();
    userAccessToken = 'accessToken=' + (await userUtils.getTokens(user)).accessToken;
  });

  test('Expect it returns information about registered user', async () => {
    const res: AuthGetMeResponse = await supertest(app)
      .get('/api/auth/account/me')
      .set('Cookie', userAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res.id).toEqual(user.id);
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

    await userUtils.delete(user.id);

    await supertest(app)
      .get('/api/auth/account/me')
      .set('Cookie', userAccessToken)
      .expect(401);
  });
});
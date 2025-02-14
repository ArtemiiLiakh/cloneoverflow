import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { User } from '@core/domain/entities';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('POST /api/auth/refreshToken', () => {
  let refreshToken: string;
  let user: User;
  const userUtils = new UserUtils(PrismaUserRepositoryDI);
  
  beforeAll(async () => {
    user = await userUtils.create();
    refreshToken = 'refreshToken='+(await userUtils.getTokens(user)).refreshToken;
  });

  test('Expect it refreshes access token', async () => {
    const res = await supertest(app)
      .post('/api/auth/refreshToken')
      .set('Cookie', refreshToken)
      .expect(201);
    
    const accessToken = res.headers['set-cookie']; 

    await supertest(app)
      .get('/api/auth/account/me')
      .set('Cookie', accessToken)
      .expect(200);
  });

  test('When refresh token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/auth/refreshToken')
      .expect(401);

    await supertest(app)
      .post('/api/auth/refreshToken')
      .set('Cookie', 'refreshToken=wrongToken')
      .expect(401);
  });

  test('When refresh token is expired expect it returns error 401', async () => {
    const newRefreshToken = 'refreshToken='+(await userUtils.getTokens(user, {
      expiresIn: -1,
    })).refreshToken;

    await supertest(app)
      .post('/api/auth/refreshToken')
      .set('Cookie', newRefreshToken)
      .expect(401);
  });
});
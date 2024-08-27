import app from "@/app";
import config from "@/config";
import { User } from "@/tests/utils";
import supertest from "supertest";

describe('Test refresh token router', () => {
  it('Refresh access token', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .get('/api/auth/me')
      .set('Cookie', cookies)
      .expect(200);

    const expirationTime = Date.now() + config.authTokens.accessToken.maxAge! + 1000;

    jest.useFakeTimers({
      now: expirationTime,
    });

    await supertest(app)
      .get('/api/auth/me')
      .set('Cookie', cookies)
      .expect(401); 

    const res = await supertest(app)
      .post('/api/auth/refreshToken')
      .set('Cookie', cookies)
      .expect(200);    
      
    await supertest(app)
      .get('/api/auth/me')
      .set('Cookie', res.headers['set-cookie'])
      .expect(200);
  });

  it('Refresh access token with expired refresh token', async () => {
    const { cookies } = await User.signup();

    const expirationTime = Date.now() + config.authTokens.refreshToken.maxAge! + 1000;

    jest.useFakeTimers({
      now: expirationTime,
    });

    await supertest(app)
      .post('/api/auth/refreshToken')
      .set('Cookie', cookies)
      .expect(403);
  });

  it('Refresh access token without refresh token', async () => {
    const { cookies } = await User.signup();

    const expirationTime = Date.now() + config.authTokens.accessToken.maxAge! + 1000;

    jest.useFakeTimers({
      now: expirationTime,
    });

    await supertest(app)
      .post('/api/auth/refreshToken')
      .set('Cookie', cookies[0])
      .expect(401);
  });
});
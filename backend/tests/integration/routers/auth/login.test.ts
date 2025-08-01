import { BasicLoginBody, BasicLoginResponse } from '@cloneoverflow/common/api/auth';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/auth/login', () => {
  const userCreds = {
    id: '',
    email: 'example@gmail.com',
    password: 'password',
  };
  
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    
    const user = await userUtils.create({
      email: userCreds.email,
      password: userCreds.password,
    });

    userCreds.id = user.userId;
  });

  test('Expect it logins successfully', async () => {
    const user = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: userCreds.email,
        password: userCreds.password,
      } as BasicLoginBody)
      .then(res => res.body as BasicLoginResponse);

    expect(user.id).toEqual(userCreds.id);
  });

  test('When email or password is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongEmail@gmail.com',
        password: 'password',
      })
      .expect(401);

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: userCreds.email,
        password: 'wrongPassword',
      })
      .expect(401);
  });
});
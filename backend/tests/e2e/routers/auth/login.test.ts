import { AuthLoginDTO, AuthLoginResponse } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
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

    userCreds.id = user.id;
  });

  test('Expect it logins successfully', async () => {
    const user: AuthLoginResponse = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: userCreds.email,
        password: userCreds.password,
      } as AuthLoginDTO)
      .then(res => res.body);

    expect(user.id).toEqual(userCreds.id);
  });

  test('When email or password is wrong expect it returns error 400', async () => {
    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongEmail@gmail.com',
        password: 'password',
      })
      .expect(400);

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: userCreds.email,
        password: 'wrongPassword',
      })
      .expect(400);
  });
});
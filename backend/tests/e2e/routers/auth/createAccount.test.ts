import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AuthSignupDTO, AuthSignUpResponse } from '@cloneoverflow/common';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { login } from './utils/login';

describe('POST /api/auth/account', () => {
  const userCreds = {
    email: 'anotherEmail@gmail.com',
    username: 'anotherUsername',
  };

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    
    await userUtils.create({
      email: userCreds.email,
      username: userCreds.username,
    });
  });
  
  test('Expect it creates user account', async () => {
    const authData = {
      email: 'example@gmail.com',
      password: 'password',
      username: 'username',
      name: 'name',
    } as AuthSignupDTO;
    
    const res: AuthSignUpResponse = await supertest(app)
      .post('/api/auth/account')
      .send(authData)
      .expect(201)
      .then(res => res.body);

    expect(res.name).toEqual(authData.name);
    expect(res.username).toEqual(authData.username);
  
    await login({
      email: authData.email,
      password: authData.password,
    });
  });

  test('When user with email or username already exists expect it returns error 400', async () => {
    await supertest(app)
      .post('/api/auth/account')
      .send({
        email: userCreds.email,
        password: 'password',
        name: 'name',
        username: 'username1',
      } as AuthSignupDTO)
      .expect(400);

    await supertest(app)
      .post('/api/auth/account')
      .send({
        email: 'example1@gmail.com',
        password: 'password',
        name: 'name',
        username: userCreds.username,
      } as AuthSignupDTO)
      .expect(400);
  });
});
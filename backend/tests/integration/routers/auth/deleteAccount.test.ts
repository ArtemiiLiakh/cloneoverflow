import { VerificationCodeType } from '@cloneoverflow/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { createVerificationCode } from './utils/createVerificationCode';
import { DeleteAccountBody } from '@cloneoverflow/common/api/auth';

describe('DELETE /api/auth/account', () => {
  let user1Cookies: string;
  let user2Cookies: string;
  
  let nest: NestExpressApplication;
  let app: App;

  const user1Creds = {
    id: '',
    email: 'email1@gmail.com',
    password: 'password',
  };

  const user2Creds = {
    id: '',
    email: 'email2@gmail.com',
    password: 'password',
  };
  
  let userUtils: UserUtils;
  
  beforeAll(async () => {
    nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    
    const user1 = await userUtils.create({
      email: user1Creds.email,
      password: user1Creds.password,
    });

    const user2 = await userUtils.create({
      email: user2Creds.email,
      password: user2Creds.password,
    });
  
    user1Creds.id = user1.userId;
    user2Creds.id = user2.userId;

    const user1Tokens = await userUtils.getTokens(user1);
    const user2Tokens = await userUtils.getTokens(user2);
  
    user1Cookies = user1Tokens.accessToken+ ';' + user1Tokens.refreshToken;
    user2Cookies = user2Tokens.accessToken+ ';' + user2Tokens.refreshToken;
  });

  test('Expect it deletes user account', async () => {
    const code = await createVerificationCode(nest, {
      email: user1Creds.email,
      codeType: VerificationCodeType.DeleteAccount,
    });
    
    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user1Cookies)
      .send({
        code,
        email: user1Creds.email,
        password: user1Creds.password,
      } as DeleteAccountBody)
      .expect(204);

    expect(await userUtils.getUser(user1Creds.id)).toBeUndefined();
  });

  test('When user does not exist expect it returns error 401', async () => {
    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user1Cookies)
      .send({
        code: 'code',
        email: user1Creds.email,
        password: user1Creds.password,
      } as DeleteAccountBody)
      .expect(401);
  });

  test('When user email or password is incorrect expect it returns error 401', async () => {
    const code = await createVerificationCode(nest, {
      email: user2Creds.email,
      codeType: VerificationCodeType.DeleteAccount,
    });

    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code,
        email: user2Creds.email,
        password: 'wrongPassword',
      } as DeleteAccountBody)
      .expect(401);

    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code,
        email: 'wrongEmail@gmail.com',
        password: user2Creds.password,
      } as DeleteAccountBody)
      .expect(401);
  });

  test('When verification code is invalid expect it returns 401', async () => {
    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code: 'code',
        email: user2Creds.email,
        password: user2Creds.password,
      } as DeleteAccountBody)
      .expect(400);

    const code = await createVerificationCode(nest, {
      email: user2Creds.email,
      codeType: VerificationCodeType.DeleteAccount,
    }, 1);

    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code: 'code',
        email: user2Creds.email,
        password: user2Creds.password,
      } as DeleteAccountBody)
      .expect(400);

    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code,
        email: user2Creds.email,
        password: user2Creds.password,
      } as DeleteAccountBody)
      .expect(403);
  });

  test('When user is unauthorized expect it returns error 401', async () => {
    const code = await createVerificationCode(nest, {
      email: user2Creds.email,
      codeType: VerificationCodeType.DeleteAccount,
    }, 1);

    await supertest(app)
      .delete('/api/auth/account')
      .send({
        code,
        email: user2Creds.email,
        password: user2Creds.password,
      } as DeleteAccountBody)
      .expect(401);
  });
});
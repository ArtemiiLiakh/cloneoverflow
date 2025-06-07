import { VerificationCodeType } from '@cloneoverflow/common';
import { ChangePasswordBody } from '@cloneoverflow/common/api/auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { createVerificationCode } from './utils/createVerificationCode';
import { login } from './utils/login';

describe('POST /api/auth/password', () => {
  let userAccessToken: string;
  let userOwnerTokens: string;
  
  const userCreds = {
    email: 'example@gmail.com',
    password: 'password',
  };

  let nest: NestExpressApplication;
  let app: App;
  let userUtils: UserUtils;

  beforeAll(async () => {
    nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    
    const user = await userUtils.create({
      email: userCreds.email,
      password: userCreds.password,
    });

    const tokens = await userUtils.getTokens(user);
    userAccessToken = tokens.accessToken;
    userOwnerTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });

  test('Expect it updates password', async () => {
    const code = await createVerificationCode(nest, {
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    });

    const sendData: ChangePasswordBody = {
      email: userCreds.email,
      code,
      oldPassword: userCreds.password,
      newPassword: 'newPassword',
    };

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send(sendData)
      .expect(204);

    await login(app, {
      email: userCreds.email,
      password: sendData.newPassword,
    });

    userCreds.password = sendData.newPassword;
  });

  test('When password was updated expect verification code is inactive', async () => {
    const code = await createVerificationCode(nest, {
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    });

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(204);

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(400);
  });

  test('When user email or old password is incorrect expect it returns error 401', async () => {
    const code = await createVerificationCode(nest, {
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    }, 3);

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: 'wrongEmail@gmail.com',
        code,
        oldPassword: userCreds.password,
        newPassword: 'password',
      } as ChangePasswordBody)
      .expect(401);

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code,
        oldPassword: 'wrongPassword',
        newPassword: 'password',
      } as ChangePasswordBody)
      .expect(401);
    
    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: 'password',
      } as ChangePasswordBody)
      .expect(204);

    userCreds.password = 'password';
  });

  test('When verification code is incorrect expect it returns error 400 or 403', async () => {
    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(400);

    const code = await createVerificationCode(nest, {
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    }, 1);

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(400);

    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userOwnerTokens)
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(403);
  });

  test('When user is unauthorized expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/auth/account/password')
      .set('Cookie', userAccessToken)
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(401);

    await supertest(app)
      .post('/api/auth/account/password')
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as ChangePasswordBody)
      .expect(401);
  });
});
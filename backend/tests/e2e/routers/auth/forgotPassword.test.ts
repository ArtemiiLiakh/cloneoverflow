import { AuthForgotPasswordDTO, VerificationCodeType } from '@cloneoverflow/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { createVerificationCode } from './utils/createVerificationCode';
import { login } from './utils/login';

describe('POST /api/auth/account/forgotPassword', () => {
  const userCreds = {
    email: 'email@gmail.com',
    password: 'password',
  };

  let nest: NestExpressApplication;
  let app: App;

  beforeAll(async () => {
    nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);

    await userUtils.create({
      email: userCreds.email,
      password: userCreds.password,
    });
  });
  
  test('Expect it updates forgotten password', async () => {
    const code = await createVerificationCode(nest, {
      email: userCreds.email,
      codeType: VerificationCodeType.ForgotPassword,
    });
    
    const newPassword = 'newPassword';

    await supertest(app)
      .post('/api/auth/account/forgotPassword')
      .send({
        code,
        email: userCreds.email,
        newPassword,
      } as AuthForgotPasswordDTO)
      .expect(200);
      
    userCreds.password = newPassword;
    
    await login(app, {
      email: userCreds.email,
      password: userCreds.password,
    });
  });

  test('When user with email is not found expect it returns error 404', async () => {
    await supertest(app)
      .post('/api/auth/account/forgotPassword')
      .send({
        code: 'code',
        email: 'wrongEmail@gmail.com',
        newPassword: 'password',
      } as AuthForgotPasswordDTO)
      .expect(404);
  });

  test('When verification code is incorrect expect it returns error 400 or 403', async () => {
    await supertest(app)
      .post('/api/auth/account/forgotPassword')
      .send({
        code: 'code',
        email: userCreds.email,
        newPassword: 'password',
      } as AuthForgotPasswordDTO)
      .expect(400);

    const code = await createVerificationCode(nest, {
      email: userCreds.email,
      codeType: VerificationCodeType.ForgotPassword,
    }, 1);

    await supertest(app)
      .post('/api/auth/account/forgotPassword')
      .send({
        code: 'code',
        email: userCreds.email,
        newPassword: 'password',
      } as AuthForgotPasswordDTO)
      .expect(400);

    await supertest(app)
      .post('/api/auth/account/forgotPassword')
      .send({
        code,
        email: userCreds.email,
        newPassword: 'password',
      } as AuthForgotPasswordDTO)
      .expect(403);
  });
});
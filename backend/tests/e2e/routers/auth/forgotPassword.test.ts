import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AuthForgotPasswordDTO, VerificationCodeType } from '@cloneoverflow/common';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { createVerificationCode } from './utils/createVerificationCode';
import { login } from './utils/login';

describe('POST /api/auth/account/forgotPassword', () => {
  const userCreds = {
    email: 'email@gmail.com',
    password: 'password',
  };

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    await userUtils.create({
      email: userCreds.email,
      password: userCreds.password,
    });
  });
  
  test('Expect it updates forgotten password', async () => {
    const code = await createVerificationCode({
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
    
    await login({
      email: userCreds.email,
      password: userCreds.password,
    });
  });

  test('When user email is incorrect expect it returns error 400', async () => {
    await supertest(app)
      .post('/api/auth/account/forgotPassword')
      .send({
        code: 'code',
        email: 'wrongEmail@gmail.com',
        newPassword: 'password',
      } as AuthForgotPasswordDTO)
      .expect(400);
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

    const code = await createVerificationCode({
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
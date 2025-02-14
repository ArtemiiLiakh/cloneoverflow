import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import { createVerificationCode } from './utils/createVerificationCode';
import { AuthChangePasswordDTO, VerificationCodeType } from '@cloneoverflow/common';
import supertest from 'supertest';
import { app } from '@application/http-rest/server';
import { login } from './utils/login';

describe('PATCH /api/auth/password', () => {
  let userAccessToken: string;
  let userRefreshToken: string;
  const userCreds = {
    email: 'example@gmail.com',
    password: 'password',
  };

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const user = await userUtils.create({
      email: userCreds.email,
      password: userCreds.password,
    });

    const tokens = await userUtils.getTokens(user);
    userAccessToken = 'accessToken='+tokens.accessToken;
    userRefreshToken = 'refreshToken='+tokens.refreshToken;
  });

  test('Expect it updates password', async () => {
    const code = await createVerificationCode({
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    });

    const sendData: AuthChangePasswordDTO = {
      email: userCreds.email,
      code,
      oldPassword: userCreds.password,
      newPassword: 'newPassword',
    };

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send(sendData)
      .expect(200);

    await login({
      email: userCreds.email,
      password: sendData.newPassword,
    });

    userCreds.password = sendData.newPassword;
  });

  test('When password was updated expect verification code is inactive', async () => {
    const code = await createVerificationCode({
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    });

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(200);

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(400);
  });

  test('When user email or old password is incorrect expect it returns error 400', async () => {
    const code = await createVerificationCode({
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    }, 3);

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: 'wrongEmail@gmail.com',
        code,
        oldPassword: userCreds.password,
        newPassword: 'password',
      } as AuthChangePasswordDTO)
      .expect(400);

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code,
        oldPassword: 'wrongPassword',
        newPassword: 'password',
      } as AuthChangePasswordDTO)
      .expect(400);
    
    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: 'password',
      } as AuthChangePasswordDTO)
      .expect(200);

    userCreds.password = 'password';
  });

  test('When verification code is incorrect expect it returns error 400 or 403', async () => {
    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(400);

    const code = await createVerificationCode({
      email: userCreds.email,
      codeType: VerificationCodeType.ChangePassword,
    }, 1);

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(400);

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send({
        email: userCreds.email,
        code,
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(403);
  });

  test('When user is unauthorized expect it returns error 401', async () => {
    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken])
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(401);

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userRefreshToken])
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(401);

    await supertest(app)
      .patch('/api/auth/account/password')
      .send({
        email: userCreds.email,
        code: 'code',
        oldPassword: userCreds.password,
        newPassword: userCreds.password,
      } as AuthChangePasswordDTO)
      .expect(401);
  });
});
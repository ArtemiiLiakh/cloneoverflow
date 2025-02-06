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
  const email = 'example@gmail.com';
  const password = 'password';

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const user = await userUtils.create({
      email,
      password,
    });

    const tokens = await userUtils.getTokens(user);
    userAccessToken = 'accessToken='+tokens.accessToken;
    userRefreshToken = 'refreshToken='+tokens.refreshToken;
  });

  test('Expect it updates password', async () => {
    const code = await createVerificationCode({
      email,
      codeType: VerificationCodeType.ChangePassword,
    });

    const newPassword = 'newPassword';

    const sendData: AuthChangePasswordDTO = {
      email,
      code,
      oldPassword: password,
      newPassword: 'newPassword',
    };

    await supertest(app)
      .patch('/api/auth/account/password')
      .set('Cookie', [userAccessToken, userRefreshToken])
      .send(sendData)
      .expect(200);

    await login({
      email,
      password: newPassword,
    });
  });

  test('', () => {});
});
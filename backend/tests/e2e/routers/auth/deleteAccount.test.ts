import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AuthDeleteAccountDTO, VerificationCodeType } from '@cloneoverflow/common';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { createVerificationCode } from './utils/createVerificationCode';

describe('DELETE /api/auth/account', () => {
  let user1Cookies: string;
  let user2Cookies: string;
  
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
  
  const userUtils = new UserUtils(PrismaUserRepositoryDI);

  beforeAll(async () => {
    const user1 = await userUtils.create({
      email: user1Creds.email,
      password: user1Creds.password,
    });

    const user2 = await userUtils.create({
      email: user2Creds.email,
      password: user2Creds.password,
    });
  
    user1Creds.id = user1.id;
    user2Creds.id = user2.id;

    const user1Tokens = await userUtils.getTokens(user1);
    const user2Tokens = await userUtils.getTokens(user2);
  
    user1Cookies = `accessToken=${user1Tokens.accessToken};refreshToken=${user1Tokens.refreshToken}`;
    user2Cookies = `accessToken=${user2Tokens.accessToken};refreshToken=${user2Tokens.refreshToken}`;
  });

  test('Expect it deletes user account', async () => {
    const code = await createVerificationCode({
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
      } as AuthDeleteAccountDTO)
      .expect(200);

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
      } as AuthDeleteAccountDTO)
      .expect(401);
  });

  test('When user email or password is incorrect expect it returns error 400', async () => {
    const code = await createVerificationCode({
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
      } as AuthDeleteAccountDTO)
      .expect(400);

    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code,
        email: 'wrongEmail@gmail.com',
        password: user2Creds.password,
      } as AuthDeleteAccountDTO)
      .expect(400);
  });

  test('When verification code is invalid expect it returns 400 or 403', async () => {
    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code: 'code',
        email: user2Creds.email,
        password: user2Creds.password,
      } as AuthDeleteAccountDTO)
      .expect(400);

    const code = await createVerificationCode({
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
      } as AuthDeleteAccountDTO)
      .expect(400);

    await supertest(app)
      .delete('/api/auth/account')
      .set('Cookie', user2Cookies)
      .send({
        code,
        email: user2Creds.email,
        password: user2Creds.password,
      } as AuthDeleteAccountDTO)
      .expect(403);
  });

  test('When user is unauthorized expect it returns error 401', async () => {
    const code = await createVerificationCode({
      email: user2Creds.email,
      codeType: VerificationCodeType.DeleteAccount,
    }, 1);

    await supertest(app)
      .delete('/api/auth/account')
      .send({
        code,
        email: user2Creds.email,
        password: user2Creds.password,
      } as AuthDeleteAccountDTO)
      .expect(401);
  });
});
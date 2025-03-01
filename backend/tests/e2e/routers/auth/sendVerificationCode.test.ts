import { AuthVerificationCodeDTO, VerificationCodeType } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/auth/verificationCode', () => {
  const email = 'email@gmail.com';
  
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    await userUtils.create({ email });
  });

  test('Expect it creates verification code', async () => {
    await supertest(app)
      .post('/api/auth/verificationCode')
      .send({
        email,
        codeType: VerificationCodeType.ChangePassword,
      } as AuthVerificationCodeDTO)
      .expect(201);
  });
  
  test('When email is invalid expect it returns 400', async () => {
    await supertest(app)
      .post('/api/auth/verificationCode')
      .send({
        email: 'wrongEmail@gmail.com',
        codeType: VerificationCodeType.ChangePassword,
      } as AuthVerificationCodeDTO)
      .expect(400);

    await supertest(app)
      .post('/api/auth/verificationCode')
      .send({
        email: 'not email',
        codeType: VerificationCodeType.ChangePassword,
      } as AuthVerificationCodeDTO)
      .expect(400);
  });
});
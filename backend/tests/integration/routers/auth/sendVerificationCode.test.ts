import { VerificationCodeType } from '@cloneoverflow/common';
import { SendVerificationCodeBody } from '@cloneoverflow/common/api/auth';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
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
      } as SendVerificationCodeBody)
      .expect(201);
  });
  
  test('When email is invalid expect it returns 404 or 400', async () => {
    await supertest(app)
      .post('/api/auth/verificationCode')
      .send({
        email: 'wrongEmail@gmail.com',
        codeType: VerificationCodeType.ChangePassword,
      } as SendVerificationCodeBody)
      .expect(404);

    await supertest(app)
      .post('/api/auth/verificationCode')
      .send({
        email: 'not email',
        codeType: VerificationCodeType.ChangePassword,
      } as SendVerificationCodeBody)
      .expect(400);
  });
});
import app from "@/app";
import config from "@/config";
import { forgotPasswordMessage } from "@/data/email/forgotPasswordMessage";
import { EmailService } from "@/google/email.service";
import { User } from "@/tests/utils";
import { AuthForgotPasswordDTO, AuthForgotPasswordResolveDTO, AuthLoginDTO, AuthSignupDTO } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test forgot password resolve router', () => {
  it('Forgot password resolve', async () => {
    const oldPassword = 'password';
    const newPassword = 'newPassword';

    const data: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: oldPassword,
    };
    
    await User.signup(data);
    
    await supertest(app)
      .post('/api/auth/forgotPassword')
      .send({
        email: data.email,
      } as AuthForgotPasswordDTO)
      .expect(201);

    const email = new EmailService({} as any);
    
    expect(email.sendEmail).toHaveBeenCalled();
    expect(forgotPasswordMessage).toHaveBeenCalled();

    const code = (forgotPasswordMessage as jest.Mock).mock.results[0].value;

    await supertest(app)
      .post('/api/auth/forgotPassword/resolve')
      .send({
        email: data.email,
        code,
        newPassword: newPassword
      } as AuthForgotPasswordResolveDTO)
      .expect(201);

    const res = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: data.email,
        password: oldPassword,
      } as AuthLoginDTO)
      .expect(400);

    expect(res.body.name).toEqual('LoginException');

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: data.email,
        password: newPassword,
      } as AuthLoginDTO)
      .expect(201)
  });
  
  it('Forgot password resolve with wrong code', async () => {
    const oldPassword = 'password';
    const newPassword = 'newPassword';

    const data: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: oldPassword,
    };
    
    await User.signup(data);
    
    await supertest(app)
      .post('/api/auth/forgotPassword')
      .send({
        email: data.email,
      } as AuthForgotPasswordDTO)
      .expect(201);

    const email = new EmailService({} as any);
    
    expect(email.sendEmail).toHaveBeenCalled();
    expect(forgotPasswordMessage).toHaveBeenCalled();

    await supertest(app)
      .post('/api/auth/forgotPassword/resolve')
      .send({
        email: data.email,
        code: 'wrong_code',
        newPassword: newPassword
      } as AuthForgotPasswordResolveDTO)
      .expect(400);

  });

  it('Forgot password resolve with many tries', async () => {
    const oldPassword = 'password';
    const newPassword = 'newPassword';

    const data: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: oldPassword,
    };
    
    await User.signup(data);
    
    await supertest(app)
      .post('/api/auth/forgotPassword')
      .send({
        email: data.email,
      } as AuthForgotPasswordDTO)
      .expect(201);

    const email = new EmailService({} as any);
    const code = (forgotPasswordMessage as jest.Mock).mock.results[0].value;
    
    expect(email.sendEmail).toHaveBeenCalled();
    expect(forgotPasswordMessage).toHaveBeenCalled();

    for (let i = 1; i < config.cache.CODE_RETRIES; i++) {
      await supertest(app)
      .post('/api/auth/forgotPassword/resolve')
      .send({
        email: data.email,
        code: 'wrong_code',
        newPassword: newPassword
      } as AuthForgotPasswordResolveDTO)
      .expect(400);
    }

    await supertest(app)
    .post('/api/auth/forgotPassword/resolve')
    .send({
      email: data.email,
      code: 'wrong_code',
      newPassword: newPassword
    } as AuthForgotPasswordResolveDTO)
    .expect(403)
    .expect((res) => {
      expect(res.body.name).toEqual('RetriesExpiredException');
    });

    
    await supertest(app)
    .post('/api/auth/forgotPassword/resolve')
    .send({
      email: data.email,
      code: code,
      newPassword: newPassword
    } as AuthForgotPasswordResolveDTO)
    .expect(400);
  });
});
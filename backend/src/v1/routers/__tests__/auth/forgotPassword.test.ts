import app from "@/v1/app";
import { forgotPasswordMessage } from "@/v1/data/email/forgotPasswordMessage";
import { EmailService } from "@/v1/services/google/email.service";
import { User } from "@/v1/tests/utils";
import { AuthForgotPasswordDTO, AuthSignupDTO } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test forgot password router', () => {
  it('Run forgot password', async () => {
    const data: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: 'qwerty'
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

    expect((email.sendEmail as jest.Mock)).toHaveBeenCalled();
    expect((forgotPasswordMessage as jest.Mock)).toHaveBeenCalled();
    expect(code).toBeDefined();
  });
  
  it('Run forgot password with wrong email', async () => { 
    const res = await supertest(app)
      .post('/api/auth/forgotPassword')
      .send({
        email: 'wrongEmail@gmail.com',
      } as AuthForgotPasswordDTO)
      .expect(400);

    const email = new EmailService({} as any);
    expect((email.sendEmail as jest.Mock)).not.toHaveBeenCalled();
  });
});
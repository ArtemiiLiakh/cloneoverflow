import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import { AuthLoginDTO, AuthSignupDTO, GetMeResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test login router', () => {
  it('Login user', async () => {
    const signUpData: AuthSignupDTO = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    };
    const { user } = await User.signup(signUpData);

    const res = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: signUpData.email,
        password: signUpData.password,
      } as AuthLoginDTO)
      .expect(201);

    const userRes: GetMeResponse = res.body;
    
    expect(res.headers['set-cookie']).toBeDefined();
    expect(userRes).toMatchObject(user);
  });

  it('Login with wrong email or password', async () => {
    const signUpData: AuthSignupDTO = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    };
    await User.signup(signUpData);

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: signUpData.email,
        password: 'wrong_password',
      } as AuthLoginDTO)
      .expect(400);

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong_email@gmail.com',
        password: signUpData.password,
      } as AuthLoginDTO)
      .expect(400);
  });

  it('Login with unauthorized user', async () => {
    const signUpData: AuthSignupDTO = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    };

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: signUpData.email,
        password: signUpData.password,
      } as AuthLoginDTO)
      .expect(400);
  });
});
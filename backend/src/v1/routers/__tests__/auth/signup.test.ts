import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import { AuthSignupDTO, GetMeResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test signing up router', () => {
  it('Sign up new user', async () => {
    const data = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
      about: 'about'
    } as AuthSignupDTO;

    const res = await supertest(app)
      .post('/api/auth/signup')
      .send(data)
      .expect(201);

    const user: GetMeResponse = res.body;
    const cookies = res.headers['set-cookie'];

    expect(cookies).toBeDefined();

    const userRes = await User.getUser(user.id, cookies);
    expect(data).toMatchObject({
      email: userRes.email,
      name: userRes.name,
      username: userRes.username,
      about: userRes.about
    });
  });

  it('Signup with same credentials', async () => {
    const data = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
      about: 'about'
    } as AuthSignupDTO;

    await supertest(app)
      .post('/api/auth/signup')
      .send(data)
      .expect(201);
    
    await supertest(app)
      .post('/api/auth/signup')
      .send(data)
      .expect(400);
  });

  it('Signup with same email', async () => {
    const data1 = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name1',
      username: 'username1',
      about: 'about'
    } as AuthSignupDTO;

    const data2 = {
      email: 'email@gmail.com',
      password: 'password',
      name: 'name2',
      username: 'username2',
      about: 'about'
    } as AuthSignupDTO;

    await supertest(app)
      .post('/api/auth/signup')
      .send(data1)
      .expect(201);
    
    await supertest(app)
      .post('/api/auth/signup')
      .send(data2)
      .expect(400)
      .expect((res) => {
        expect(res.body.name).toEqual('AlreadyRegisteredException');
      });
  });

  it('Signup with same username', async () => {
    const data1 = {
      email: 'email1@gmail.com',
      password: 'password',
      name: 'name1',
      username: 'username',
      about: 'about'
    } as AuthSignupDTO;

    const data2 = {
      email: 'email2@gmail.com',
      password: 'password',
      name: 'name2',
      username: 'username',
      about: 'about'
    } as AuthSignupDTO;

    await supertest(app)
      .post('/api/auth/signup')
      .send(data1)
      .expect(201);
    
    await supertest(app)
      .post('/api/auth/signup')
      .send(data2)
      .expect(400)
      .expect((res) => {
        expect(res.body.name).toEqual('AlreadyRegisteredException');
      });
  });
});
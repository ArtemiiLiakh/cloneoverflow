import app from "@/app";
import { User } from "@/tests/utils";
import { AuthChangePasswordDTO, AuthLoginDTO, AuthSignupDTO } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test change password router', () => {
  it('Chage password', async () => {
    const signUpDate: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: 'password'
    };

    const { cookies } = await User.signup(signUpDate); 
    
    await supertest(app)
      .post('/api/auth/changePassword')
      .set('Cookie', cookies)
      .send({
        email: signUpDate.email,
        oldPassword: signUpDate.password,
        newPassword: 'new_password'
      } as AuthChangePasswordDTO)
      .expect(201);

    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: signUpDate.email,
        password: 'new_password'
      } as AuthLoginDTO)
      .expect(201);
  });

  it('Change password with wrong email or current password', async () => {
    const signUpDate: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: 'password'
    };

    const { cookies } = await User.signup(signUpDate); 
    
    await supertest(app)
      .post('/api/auth/changePassword')
      .set('Cookie', cookies)
      .send({
        email: signUpDate.email,
        oldPassword: 'wrong_password',
        newPassword: 'new_password'
      } as AuthChangePasswordDTO)
      .expect(400);
    
    await supertest(app)
      .post('/api/auth/changePassword')
      .set('Cookie', cookies)
      .send({
        email: 'wrongEmail@gmail.com',
        oldPassword: signUpDate.password,
        newPassword: 'new_password'
      } as AuthChangePasswordDTO)
      .expect(400);
    
    await supertest(app)
      .post('/api/auth/login')
      .send({
        email: signUpDate.email,
        password: signUpDate.password,
      } as AuthLoginDTO)
      .expect(201);
  });

  it('Change password with wrong user', async () => {
    const user1Date: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: 'password'
    };

    await User.signup(user1Date); 
    const user2 = await User.signup(); 
    
    await supertest(app)
      .post('/api/auth/changePassword')
      .set('Cookie', user2.cookies)
      .send({
        email: user1Date.email,
        oldPassword: user1Date.password,
        newPassword: 'new_password'
      } as AuthChangePasswordDTO)
      .expect(400);
  });

  it('Change password with unauthorized user', async () => {
    const user1Date: AuthSignupDTO = {
      name: 'name',
      username: 'username',
      email: 'email@gmail.com',
      password: 'password'
    };

    await User.signup(user1Date); 
    
    await supertest(app)
      .post('/api/auth/changePassword')
      .send({
        email: user1Date.email,
        oldPassword: user1Date.password,
        newPassword: 'new_password'
      } as AuthChangePasswordDTO)
      .expect(401);
  });
});
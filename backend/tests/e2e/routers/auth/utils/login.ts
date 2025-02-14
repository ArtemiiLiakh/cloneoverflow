import { app } from '@application/http-rest/server';
import { AuthLoginDTO, AuthLoginResponse } from '@cloneoverflow/common';
import supertest from 'supertest';

export const login = async (data: AuthLoginDTO): Promise<AuthLoginResponse> => {
  const user = await supertest(app)
    .post('/api/auth/login')
    .send(data)
    .expect(200)
    .then(res => res.body);

  return user.body;
};
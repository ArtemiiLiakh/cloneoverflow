import { AuthLoginDTO, AuthLoginResponse } from '@cloneoverflow/common';
import supertest from 'supertest';
import { App } from 'supertest/types';

export const login = async (app: App, data: AuthLoginDTO): Promise<AuthLoginResponse> => {
  const user = await supertest(app)
    .post('/api/auth/login')
    .send(data)
    .expect(200)
    .then(res => res.body);

  return user.body;
};
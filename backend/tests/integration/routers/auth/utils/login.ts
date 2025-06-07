import { BasicLoginBody, BasicLoginResponse } from '@cloneoverflow/common/api/auth';
import supertest from 'supertest';
import { App } from 'supertest/types';

export const login = async (app: App, data: BasicLoginBody): Promise<BasicLoginResponse> => {
  const user = await supertest(app)
    .post('/api/auth/login')
    .send(data)
    .expect(201)
    .then(res => res.body);

  return user.body;
};
import { app } from '@application/http-rest/server';
import { User } from '@core/domain/entities/User';
import { randomUUID } from 'crypto';
import supertest from 'supertest';
import { UserUtils } from '../../utils/UserUtils';
import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';

describe('GET /api/users/:userId', () => {
  const userUtils = new UserUtils(PrismaUserRepositoryDI);
  let user: User;

  beforeAll(async () => {
    user = await userUtils.create();
  });

  test('Expect it returns user info', async () => {
    const res = await supertest(app)
      .get(`/api/users/${user.id}`)
      .expect(200);

    expect(res.body.id).toEqual(user.id);
  });

  test('When user does not exist it returns error 404', async () => {
    await supertest(app)
      .get(`/api/users/${randomUUID()}`)
      .expect(404);
  });

  test('When user id is not uuid it returns error 400', async () => {
    await supertest(app)
      .get('/api/users/wrongId')
      .expect(400);
  });
});
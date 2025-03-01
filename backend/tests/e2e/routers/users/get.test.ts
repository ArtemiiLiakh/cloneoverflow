import { User } from '@core/models/User';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { randomUUID } from 'crypto';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { UserUtils } from '../../utils/UserUtils';

describe('GET /api/users/:userId', () => {
  let app: App;
  let userUtils: UserUtils;
  let user: User;

  beforeAll(async () => {
    const nest = await initTestApplication();
    userUtils = new UserUtils(nest);

    app = nest.getHttpServer();
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
import { User } from '@core/user/User';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import { randomUUID } from 'crypto';
import supertest from 'supertest';
import { App } from 'supertest/types';

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
      .get(`/api/users/${user.userId}`)
      .expect(200);

    expect(res.body.id).toEqual(user.userId);
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
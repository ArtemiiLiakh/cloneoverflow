import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import supertest from "supertest";

describe('Test signout router', () => {
  it('Sign out', async () => {
    const { cookies } = await User.signup();

    const res = await supertest(app)
      .get('/api/auth/signout')
      .set('Cookie', cookies)
      .expect(200);

    await supertest(app)
      .get('/api/auth/me')
      .set('Cookie', res.headers['set-cookie'])
      .expect(401);
  });

  it('Sign out with unauthorized user', async () => {
    await User.signup();

    await supertest(app)
      .get('/api/auth/signout')
      .expect(401);
  });
});
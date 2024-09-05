import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import supertest from "supertest";

describe('Test get me router', () => {
  it('Get me information', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();

    await supertest(app)
      .get('/api/auth/me')
      .set('Cookie', user1.cookies)
      .expect(200)
      .expect((res) => {
        expect(user1.user).toEqual(res.body);
      });

    await supertest(app)
      .get('/api/auth/me')
      .set('Cookie', user2.cookies)
      .expect(200)
      .expect((res) => {
        expect(user2.user).toEqual(res.body);
      });
  });

  it('Get me information with unauthorized user', async () => {
    await User.signup();
    
    await supertest(app)
      .get('/api/auth/me')
      .expect(401);
  });
});
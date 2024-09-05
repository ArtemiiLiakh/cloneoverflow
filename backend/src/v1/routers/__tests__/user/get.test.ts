import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import supertest from "supertest";

describe('Test getting user router', () => {
  it('Get user', async () => {
    const { user, cookies } = await User.signup();
    
    const res = await supertest(app)
      .get(`/api/users/${user.id}/get`)
      .set('Cookie', cookies)
      .expect(200);

    expect(res.body.id).toEqual(user.id);
  });

  it('Get user with wrong id', async () => {
    const { cookies } = await User.signup();
    
    await supertest(app)
      .get(`/api/users/12345/get`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Get with unauthorized user', async () => {
    await supertest(app)
      .get(`/api/users/12345/get`)
      .expect(401);
  });
});
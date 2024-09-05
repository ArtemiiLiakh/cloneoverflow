import supertest from "supertest";
import { 
  AnswerCreateDTO, 
  AnswerCreateResponse, 
  AnswerGetResponse, 
  AuthSignupDTO, 
  GetMeResponse, 
  QuestionCreateDTO, 
  QuestionCreateResponse, 
  QuestionGetResponse, 
  UserGetResponse, 
  VoteDTO, 
  VoteType
} from "@cloneoverflow/common";
import { randomBytes } from 'crypto';
import app from "@/v1/app";

export namespace User {
  export const signup = async (data: AuthSignupDTO = {
    email: randomBytes(4).toString('hex') + '@gmail.com',
    password: 'password',
    name: 'name',
    username: randomBytes(4).toString('hex'),
    about: 'about',
  }) => {
    const res =  await supertest(app)
      .post('/api/auth/signup')
      .send(data)
      .expect(201);
  
    expect(res.body).toBeDefined();
  
    return {
      user: res.body, 
      cookies: res.headers['set-cookie']
    } as {
      user: GetMeResponse,
      cookies: string,
    };
  };
  
  export const getUser = async (userId: string, cookies: string) => {
    const userRes = await supertest(app)
      .get(`/api/users/${userId}/get`)
      .set('Cookie', cookies)
      .expect(200);
  
    return userRes.body as UserGetResponse;
  }
}

export namespace Question {
  export const createQuestion = async (cookies: string, data: QuestionCreateDTO = {
    title: 'question',
    text: 'question text',
    tags: [],
  }) => {
    const res = await supertest(app)
      .post('/api/questions/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(201);
    
    expect(res.body).toBeDefined();
    return res.body as QuestionCreateResponse;
  }
  
  export const getQuestion = async (questionId: string, cookies?: string) => {
    const res = await supertest(app)
    .get(`/api/questions/${questionId}/get`)
    .set('Cookie', cookies ?? '')
    .expect(200);
  
    return res.body as QuestionGetResponse;
  }

  export const voteQuestion = async (cookies: string, questionId: string, vote: VoteType) => {
    await supertest(app)
      .patch(`/api/questions/${questionId}/vote`)
      .set('Cookie', cookies)
      .send({
        vote,
      } as VoteDTO)
      .expect(200);
  }
}

export namespace Answer {
  export const createAnswer = async (cookies: string, data?: AnswerCreateDTO) => {
    if (!data) {
      const question = await Question.createQuestion(cookies);
      data = {
        questionId: question.id,
        text: 'answer'
      };
    }
  
    const res = await supertest(app)
      .post('/api/answers/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(201);  
    
    expect(res.body).toBeDefined();
    return res.body as AnswerCreateResponse;
  }

  export const getAnswer = async (answerId: string, cookies?: string) => {
    const res = await supertest(app)
      .get(`/api/answers/${answerId}/get`)
      .set('Cookie', cookies ?? '')
      .expect(200);

    return res.body as AnswerGetResponse;
  };

  export const voteAnswer = async (cookies: string, answerId: string, vote: VoteType) => {
    await supertest(app)
    .patch(`/api/answers/${answerId}/vote`)
    .set('Cookie', cookies)
    .send({
      vote,
    } as VoteDTO)
    .expect(200);
  }
}
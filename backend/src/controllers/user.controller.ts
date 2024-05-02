import { UserService } from "../services/user.service";
import { UserMapper } from "../mappers/user.mapper";
import { AuthRequest, Body, Query } from "../types/Requests";
import { Response } from "express";
import { 
  UserGetResponse, 
  UserUpdateResponse, 
  UserGetProfileResponse, 
  UserGetAnswersDTO, 
  UserGetAnswersResponse, 
  UserGetQuestionsDTO, 
  UserGetQuestionResponse, 
  UserUpdateDTO,
  OkResponse,
  AuthLoginDTO, 
} from '@cloneoverflow/common';

export class UserController {
  constructor(
    private userService = new UserService(),
    private userMapper = new UserMapper(),
  ) {}

  async get ({ params }: AuthRequest, res: Response<UserGetResponse>) {
    const user = await this.userService.get(params.userId);
    res.send(this.userMapper.get(user));
  }

  async update({ params, body }: AuthRequest & Body<UserUpdateDTO>, res: Response<UserUpdateResponse>) {
    const user = await this.userService.update(params.userId, body);
    res.send(this.userMapper.update(user));
  }

  async getProfile({ params }: AuthRequest, res: Response<UserGetProfileResponse>) {
    const user = await this.userService.getProfile(params.userId);
    res.send(this.userMapper.getProfile(user));
  }

  async getAnswers({ params, query }: AuthRequest & Query<UserGetAnswersDTO>, res: Response<UserGetAnswersResponse>) {
    const { data, pagination } = await this.userService.getAnswers(params.userId, query);
    const answers = this.userMapper.getAnswers(data);
    res.send({
      answers,
      pagination,
    });
  }

  async getQuestions ({ params, query }: AuthRequest & Query<UserGetQuestionsDTO>, res: Response<UserGetQuestionResponse>) {
    const { data, pagination } = await this.userService.getQuestions(params.userId, query);
    const questions = this.userMapper.getQuestions(data);
    res.send({
      questions,
      pagination,
    });
  }

  async delete({ params, body }: AuthRequest & Body<AuthLoginDTO>, res: Response<OkResponse>) {
    await this.userService.delete(params.userId, body, body._user);
    res.send({ message: "ok"});
  }
}
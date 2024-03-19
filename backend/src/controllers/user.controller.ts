import { UserService } from "../services/user.service";
import { UserMapper } from "../mappers/user.mapper";
import { AuthRequest, Body, Query } from "../types/Requests";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { UserUpdateResponse } from "../responses/user.update.response";
import { Response } from "express";
import { UserGetAnswersDTO } from '../dtos/user.getAnswers.dto';
import { PaginatedData } from '../types/PaginatedData';
import { UserGetAnswersResponse } from '../responses/user.getAnswers.response';
import { UserGetQuestionsDTO } from '../dtos/user.getQuestions.dto';
import { UserGetQuestionResponse } from '../responses/user.getQuestion.response';
import { UserGetProfileResponse } from '../responses/user.getProfile.response';

export class UserController {
  constructor(
    private userService = new UserService(),
    private userMapper = new UserMapper(),
  ) {
  }

  async update({ params, body }: AuthRequest & Body<UserUpdateDto>, res: Response<UserUpdateResponse>) {
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
}
import { UserService } from "../services/user.service";
import { UserMapper } from "../mappers/user.mapper";
import { AuthReq, Body, Query } from "../types/Requests";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { UserUpdateResponse } from "../responses/user.update.response";
import { Response } from "express";
import { UserGetAnswersDTO } from '../dtos/user.getAnswers.dto';
import { PaginatedData } from '../types/PaginatedData';
import { UserGetAnswersResponse } from '../responses/user.getAnswers.response';

export class UserController {
  constructor(
    private userService = new UserService(),
    private userMapper = new UserMapper(),
  ) {
  }

  async update(req: AuthReq & Body<UserUpdateDto>, res: Response<UserUpdateResponse>) {
    const user = await this.userService.update(req.params.userId, req.body);
    res.send(this.userMapper.update(user));
  }

  async getAnswers(req: AuthReq & Query<UserGetAnswersDTO>, res: Response<UserGetAnswersResponse>) {
    const { data, pagination } = await this.userService.getAnswers(req.params.userId, req.query);
    const answers = this.userMapper.getAnswers(data);
    res.send({
      answers,
      pagination,
    });
  }
}
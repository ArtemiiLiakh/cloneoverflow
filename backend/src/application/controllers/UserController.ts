import { UserGetAnswerMapperOutput } from "@app/adapters/mappers/user/UserGetAnswersMapper";
import { UserGetMapperOutput } from "@app/adapters/mappers/user/UserGetMapper";
import { UserGetProfileMapperOutput } from "@app/adapters/mappers/user/UserGetProfileMapper";
import { UserGetQuestionMapperOutput } from "@app/adapters/mappers/user/UserGetQuestionsMapper";
import { UserUpdateMapperOutput } from "@app/adapters/mappers/user/UserUpdateMapper";
import { UserServiceFacade } from "@app/services/UserServiceFacade";
import {
  UserGetAnswersDTO,
  UserGetAnswersResponse,
  UserGetDTO,
  UserGetProfileResponse,
  UserGetQuestionResponse,
  UserGetQuestionsDTO,
  UserGetResponse,
  UserUpdateDTO,
  UserUpdateResponse
} from "@cloneoverflow/common";
import { IAnswerGetAllUseCase } from "@core/service/answer/types/usecases";
import { IQuestionGetAllUseCase } from "@core/service/question/types/usecases";
import { WithBody, WithParams, WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";

export class UserController {
  constructor (
    private userService: UserServiceFacade,
    private answerGetAllUseCase: IAnswerGetAllUseCase,
    private questionGetAllUseCase: IQuestionGetAllUseCase,
  ) {}

  async getUser(
    { params, query }: WithParams<{ id: string }> & WithQuery<UserGetDTO>, 
    res: CoreResponse<UserGetResponse>
  ) {
    const user = await this.userService.get({
      userId: params.id,
      include: query.include,
    });
    res.send(UserGetMapperOutput(user));
  }

  async getProfile(
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetProfileResponse>
  ) {
    const profile = await this.userService.getProfile({
      userId: params.userId,
    });
    res.send(UserGetProfileMapperOutput(profile));
  }

  async update(
    { params, body }: WithParams<{ userId: string }> & WithBody<UserUpdateDTO>, 
    res: CoreResponse<UserUpdateResponse>
  ) {
    const user = await this.userService.update({
      userId: params.userId,
      data: body,
    });
    res.send(UserUpdateMapperOutput(user));
  }

  async getAnswers(
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetAnswersDTO>, 
    res: CoreResponse<UserGetAnswersResponse>
  ) {
    const answers = await this.answerGetAllUseCase.execute({
      ownerId: params.userId, 
      orderBy: query.orderBy,
      pagination: query.pagination,
      searchText: query.searchText,
      sortBy: query.sortBy,
    });
    res.send(UserGetAnswerMapperOutput(answers));
  }

  async getQuestions (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetQuestionsDTO>, 
    res: CoreResponse<UserGetQuestionResponse>
  ) {
    const questions = await this.questionGetAllUseCase.execute({
      ownerId: params.userId,
      orderBy: query.orderBy,
      pagination: query.pagination,
      search: query.search,
      sortBy: query.sortBy,
      tags: query.tags,
    });
    res.send(UserGetQuestionMapperOutput(questions));
  }
}
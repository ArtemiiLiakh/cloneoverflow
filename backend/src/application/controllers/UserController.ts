import { UserServiceFacade } from "@app/services/UserServiceFacade";
import { UserGetAnswersDTO, UserGetQuestionsDTO, UserUpdateDTO, UserUpdateResponse } from "@cloneoverflow/common";
import { WithBody, WithParams, WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";
import { QuestionGetAllUseCase } from "@core/service/question/usecase/getAll";
import { AnswerGetAllUseCase } from "@core/service/answer/usecase/getAll";

export class UserController {
  constructor (
    private userService: UserServiceFacade,
    private answerGetAllUseCase: AnswerGetAllUseCase,
    private questionGetAllUseCase: QuestionGetAllUseCase,
  ) {}

  async getUser(
    { params }: WithParams<{ id: string }>, 
    res: CoreResponse
  ) {
    const user = await this.userService.get({
      userId: params.id,
    });

    res.send(user);
  }

  async getProfile(
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse
  ) {
    const profile = await this.userService.getProfile({
      userId: params.userId,
    });

    res.send(profile);
  }

  async update(
    { params, body }: WithParams<{ userId: string }> & WithBody<UserUpdateDTO>, 
    res: CoreResponse<UserUpdateResponse>
  ) {
    const user = await this.userService.update({
      userId: params.userId,
      data: body,
    });

    res.send(user);
  }

  async getAnswers(
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetAnswersDTO>, 
    res: CoreResponse
  ) {
    const answers = await this.answerGetAllUseCase.execute({
      ownerId: params.userId,
      orderBy: query.orderBy,
      searchText: query.searchText,
      sortBy: query.sortBy,
      pagination: query.pagination,
    });

    res.send(answers);
  }

  async getQuestions (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetQuestionsDTO>, 
    res: CoreResponse
  ) {
    const questions = await this.questionGetAllUseCase.execute({
      ownerId: params.userId,
      search: query.search,
      sortBy: query.sortBy,
      orderBy: query.orderBy,
      tags: query.tags,
      pagination: query.pagination,
    });

    res.send(questions);
  }
}
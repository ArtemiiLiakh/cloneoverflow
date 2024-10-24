import { QuestionServiceFacade } from "@app/services/QuestionServiceFacade";
import { OkResponse, QuestionCloseDTO, QuestionCreateDTO, QuestionGetDTO, QuestionUpdateDTO, SearchQuestionsDTO, VoteDTO } from "@cloneoverflow/common";
import { WithAuth, WithBody, WithOptionalAuth, WithParams, WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";
import { SearchQuestionsUseCase } from "@core/service/search/usecase/searchQuestions";

export class QuestionController {
  constructor (
    private questionService: QuestionServiceFacade,
    private searchQuestionsUseCase: SearchQuestionsUseCase,
  ) {}

  async get(
    { user, params }: WithOptionalAuth & WithParams<{ questionId: string }> & WithQuery<QuestionGetDTO> , 
    res: CoreResponse
  ) {
    const question = await this.questionService.get({
      userId: user?.userId,
      questionId: params.questionId,
    });
    
    res.send(question);
  }

  async create(
    { body, user }: WithAuth & WithBody<QuestionCreateDTO>, 
    res: CoreResponse
  ) {
    const question = await this.questionService.create({
      ownerId: user.userId,
      data: body,
    });

    res.status(201);
    res.send(question);
  }
  
  async update(
    { params, body, user }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionUpdateDTO>, 
    res: CoreResponse
  ) {
    const question = await this.questionService.update({
      data: body,
      ownerId: user.userId,
      questionId: params.questionId,
    });

    res.send(question);
  }

  async delete(
    { user, params }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse<OkResponse>
  ) {
    await this.questionService.delete({
      userId: user.userId,
      questionId: params.questionId,
    });
    
    res.send({
      message: 'ok'
    });
  }

  async closeQuestion(
    { user, body, params }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionCloseDTO>, 
    res: CoreResponse<OkResponse>
  ) {
    await this.questionService.close({
      userId: user.userId,
      answerId: body.answerId,
      questionId: params.questionId,
    });

    res.send({
      message: 'ok'
    });
  }
  
  async voteQuestion(
    { body, params, user }: WithAuth & WithParams<{ questionId: string }> & WithBody<VoteDTO>, 
    res: CoreResponse<OkResponse>
  ) {
    await this.questionService.vote({
      userId: user.userId,
      vote: body.vote,
      questionId: params.questionId,
    });
    
    res.send({
      message: 'ok'
    });
  }

  async search (
    { query }: WithQuery<SearchQuestionsDTO>, 
    res: CoreResponse,
  ) {
    const questions = await this.searchQuestionsUseCase.execute(query);
    res.send(questions);
  }
}
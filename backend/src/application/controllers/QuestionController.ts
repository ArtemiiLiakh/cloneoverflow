import { QuestionCreateMapperOutput } from "@app/adapters/mappers/question/QuestionCreateMapper";
import { QuestionGetMapperOutput } from "@app/adapters/mappers/question/QuestionGetMapper";
import { QuestionUpdateMapperOutput } from "@app/adapters/mappers/question/QuestionUpdateMapper";
import { QuestionServiceFacade } from "@app/services/QuestionServiceFacade";
import {
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionCreateResponse,
  QuestionGetDTO,
  QuestionGetResponse,
  QuestionUpdateDTO,
  QuestionUpdateResponse,
  VoteDTO
} from "@cloneoverflow/common";
import { WithAuth, WithBody, WithOptionalAuth, WithParams, WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";

export class QuestionController {
  constructor (
    private questionService: QuestionServiceFacade,
  ) {}

  async get(
    { user, params, query }: WithOptionalAuth & WithParams<{ questionId: string }> & WithQuery<QuestionGetDTO>, 
    res: CoreResponse<QuestionGetResponse>,
  ) {
    const question = await this.questionService.get({
      userId: user?.userId,
      questionId: params.questionId,
      include: query.include,
    });
    
    res.send(QuestionGetMapperOutput(question));
  }

  async create(
    { body, user }: WithAuth & WithBody<QuestionCreateDTO>, 
    res: CoreResponse<QuestionCreateResponse>
  ) {
    const question = await this.questionService.create({
      ownerId: user.userId,
      data: body,
    });

    res.status(201);
    res.send(QuestionCreateMapperOutput(question));
  }
  
  async update(
    { params, body, user }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionUpdateDTO>, 
    res: CoreResponse<QuestionUpdateResponse>
  ) {
    const question = await this.questionService.update({
      data: body,
      ownerId: user.userId,
      questionId: params.questionId,
    });

    res.send(QuestionUpdateMapperOutput(question));
  }

  async delete(
    { user, params }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse
  ) {
    await this.questionService.delete({
      userId: user.userId,
      questionId: params.questionId,
    });
    
    res.status(204);
    res.send({});
  }

  async closeQuestion(
    { user, body, params }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionCloseDTO>, 
    res: CoreResponse
  ) {
    await this.questionService.close({
      userId: user.userId,
      answerId: body.answerId,
      questionId: params.questionId,
    });

    res.status(204);
    res.send({});
  }
  
  async voteQuestion(
    { body, params, user }: WithAuth & WithParams<{ questionId: string }> & WithBody<VoteDTO>, 
    res: CoreResponse
  ) {
    await this.questionService.vote({
      userId: user.userId,
      vote: body.vote,
      questionId: params.questionId,
    });
    
    res.status(204);
    res.send({});
  }
}
import { AnswerCreateMapperOutput } from "@app/adapters/mappers/answers/AnswerCreateMapper";
import { AnswerGetMapperOutput } from "@app/adapters/mappers/answers/AnswersGetMapper";
import { AnswerUpdateMapperOutput } from "@app/adapters/mappers/answers/AnswerUpdateMapper";
import { AnswerServiceFacade } from "@app/services/AnswerServiceFacade";
import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerGetDTO,
  AnswerGetResponse,
  AnswerUpdateDTO,
  AnswerUpdateResponse,
  VoteDTO
} from "@cloneoverflow/common";
import { WithAuth, WithBody, WithOptionalAuth, WithParams, WithQuery } from "./types/Request";
import { CoreResponse } from "./types/Response";

export class AnswerController {
  constructor (
    private answerService: AnswerServiceFacade,
  ) {}

  async get(
    { user, params, query }: WithOptionalAuth & WithParams<{ answerId: string }> & WithQuery<AnswerGetDTO>, 
    res: CoreResponse<AnswerGetResponse>,
  ) {
    const answer = await this.answerService.get({
      answerId: params.answerId,
      userId: user?.userId,
      include: query.include,
    });

    res.send(AnswerGetMapperOutput(answer));
  }

  async create (
    { body, user }: WithAuth & WithBody<AnswerCreateDTO>, 
    res: CoreResponse<AnswerCreateResponse>,
  ) {
    const answer = await this.answerService.create({
      data: {
        questionId: body.questionId,
        text: body.text,
      },
      ownerId: user.userId,
    });

    res.status(201);
    res.send(AnswerCreateMapperOutput(answer));
  }

  async update (
    { params, body, user }: WithAuth & WithParams<{ answerId: string }> & WithBody<AnswerUpdateDTO>, 
    res: CoreResponse<AnswerUpdateResponse>,
  ) {
    const answer = await this.answerService.update({
      answerId: params.answerId,
      ownerId: user.userId,
      data: {
        text: body.text
      },
    });

    res.send(AnswerUpdateMapperOutput(answer));
  }

  async delete(
    { params, user }: WithAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse
  ) {
    await this.answerService.delete({
      answerId: params.answerId,
      userId: user.userId,
    });

    res.status(204);
    res.send({});
  }

  async voteAnswer(
    { params, user, body }: WithAuth & WithParams<{ answerId: string }> & WithBody<VoteDTO>, 
    res: CoreResponse
  ) {
    await this.answerService.vote({
      answerId: params.answerId,
      userId: user.userId,
      vote: body.vote,  
    });

    res.status(204);
    res.send({});
  }
}
import { AnswerServiceFacade } from "@app/services/AnswerServiceFacade";
import { AnswerCreateDTO, AnswerUpdateDTO, OkResponse, VoteDTO } from "@cloneoverflow/common";
import { WithAuth, WithBody, WithOptionalAuth, WithParams } from "./types/Request";
import { CoreResponse } from "./types/Response";

export class AnswerController {
  constructor (
    private answerService: AnswerServiceFacade,
  ) {}

  async get(
    { user, params }: WithOptionalAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse,
  ) {
    const answer = await this.answerService.get({
      answerId: params.answerId,
      userId: user?.userId,
    });

    res.send(answer);
  }

  async create (
    { body, user }: WithAuth & WithBody<AnswerCreateDTO>, 
    res: CoreResponse,
  ) {
    const answer = await this.answerService.create({
      data: {
        questionId: body.questionId,
        text: body.text,
      },
      ownerId: user.userId,
    });

    res.status(201);
    res.send(answer);
  }

  async update (
    { params, body, user }: WithAuth & WithParams<{ answerId: string }> & WithBody<AnswerUpdateDTO>, 
    res: CoreResponse,
  ) {
    const answer = await this.answerService.update({
      answerId: params.answerId,
      ownerId: user.userId,
      data: {
        text: body.text,
      },
    });

    res.send(answer);
  }

  async delete(
    { params, user }: WithAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse<OkResponse>
  ) {
    await this.answerService.delete({
      answerId: params.answerId,
      userId: user.userId,
    });

    res.send({ 
      message: "ok" 
    });
  }

  async voteAnswer(
    { params, user, body }: WithAuth & WithParams<{ answerId: string }> & WithBody<VoteDTO>, 
    res: CoreResponse<OkResponse>
  ) {
    await this.answerService.vote({
      answerId: params.answerId,
      userId: user.userId,
      vote: body.vote,  
    });

    res.send({ 
      message: "ok" 
    });
  }
}
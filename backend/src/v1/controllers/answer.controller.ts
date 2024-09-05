import { AnswerMapper } from '@/v1/mappers/answer.mapper';
import { AnswerService } from '@/v1/services/answer.service';
import { AuthRequest, Body, Params } from '@/v1/types/Requests';
import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerGetResponse,
  AnswerUpdateDTO,
  AnswerUpdateResponse,
  OkResponse,
  VoteDTO,
} from '@cloneoverflow/common';
import { Response } from 'express';

export class AnswerController {
  constructor (
    private answerService: AnswerService,
    private answerMapper = new AnswerMapper(),
  ) {}

  async get(req: AuthRequest & Params<{ answerId: string }>, res: Response<AnswerGetResponse>) {
    const answer = await this.answerService.get(req.params.answerId, req.body?._user?.userId);
    res.send(this.answerMapper.get(answer, req.body?._user?.userId));
  }

  async create ({ body }: AuthRequest & Body<AnswerCreateDTO>, res: Response<AnswerCreateResponse>) {
    const answer = await this.answerService.create(body._user.userId, body);
    res.status(201).send(this.answerMapper.create(answer));
  }

  async update ({ params, body }: AuthRequest & Body<AnswerUpdateDTO>, res: Response<AnswerUpdateResponse>) {
    const answer = await this.answerService.update(params.answerId, body._user.userId, body);
    res.send(this.answerMapper.update(answer));
  }

  async delete(req: AuthRequest & Params<{ answerId: string }>, res: Response<OkResponse>) {
    await this.answerService.delete(req.params.answerId, req.body._user.userId)
    res.send({ 
      message: "ok" 
    });
  }

  async voteAnswer(req: Params<{ answerId: string }> & Body<VoteDTO> & AuthRequest, res: Response<OkResponse>) {
    await this.answerService.voteAnswer(req.params.answerId, req.body._user.userId, req.body.vote);
    res.send({ 
      message: "ok" 
    });
  }
}
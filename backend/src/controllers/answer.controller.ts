import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerUpdateDTO,
  AnswerUpdateResponse,
  AnswerGetResponse,
  OkResponse,
  VoteDTO,
} from '@cloneoverflow/common';
import { Response, query } from 'express';
import { AnswerMapper } from '../mappers/answer.mapper';
import { AnswerService } from '../services/answer.service';
import { AuthRequest, Body, Params } from '../types/Requests';

export class AnswerController {
  constructor (
    private answerService = new AnswerService(),
    private answerMapper = new AnswerMapper(),
  ) {}

  async get(req: Params<{ answerId: string }>, res: Response<AnswerGetResponse>) {
    const answer = await this.answerService.get(req.params.answerId);
    res.send(this.answerMapper.get(answer));
  }

  async create ({ body }: AuthRequest & Body<AnswerCreateDTO>, res: Response<AnswerCreateResponse>) {
    const answer = await this.answerService.create(body._user.userId, body);
    res.send(this.answerMapper.create(answer));
  }

  async update ({ params, body }: AuthRequest & Body<AnswerUpdateDTO>, res: Response<AnswerUpdateResponse>) {
    const answer = await this.answerService.update(params.answerId, body._user.userId, body);
    res.send(this.answerMapper.update(answer));
  }

  async delete(req: Params<{ answerId: string }>, res: Response<OkResponse>) {
    await this.answerService.delete(req.params.answerId)
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
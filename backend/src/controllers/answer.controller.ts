import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerUpdateDTO,
  AnswerUpdateResponse
} from '@clone-overflow/common';
import { Response } from 'express';
import { AnswerMapper } from '../mappers/answer.mapper';
import { AnswerService } from '../services/answer.service';
import { AuthRequest, Body } from '../types/Requests';

export class AnswerController {
  constructor (
    private answerService = new AnswerService(),
    private answerMapper = new AnswerMapper(),
  ) {}

  async create ({ body }: AuthRequest & Body<AnswerCreateDTO>, res: Response<AnswerCreateResponse>) {
    const answer = await this.answerService.create(body._user.userId, body);
    res.send(this.answerMapper.getAnswer(answer));
  }

  async update ({ params, body }: AuthRequest & Body<AnswerUpdateDTO>, res: Response<AnswerUpdateResponse>) {
    const answer = await this.answerService.update(params.answerId, body._user.userId, body);
    res.send(this.answerMapper.update(answer));
  }
}
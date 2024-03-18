import { Response } from 'express';
import { AnswerCreateDTO } from '../dtos/answer.create.dto';
import { AuthRequest, Body } from '../types/Requests';
import { AnswerService } from '../services/answer.service';
import { AnswerCreateResponse } from '../responses/answer.create.response';
import { AnswerMapper } from '../mappers/answer.mapper';

export class AnswerController {
  constructor (
    private answerService = new AnswerService(),
    private answerMapper = new AnswerMapper(),
  ) {}

  async create ({ body }: AuthRequest & Body<AnswerCreateDTO>, res: Response<AnswerCreateResponse>) {
    const answer = await this.answerService.create(body._user.userId, body);
    res.send(this.answerMapper.getAnswer(answer));
  }
}
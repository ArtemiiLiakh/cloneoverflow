import { Response } from 'express';
import { AnswerCreateDTO } from '../dtos/answer.create.dto';
import { AuthRequest, Body } from '../types/Requests';
import { AnswerService } from '../services/answer.service';
import { AnswerCreateResponse } from '../responses/answer.create.response';
import { AnswerMapper } from '../mappers/answer.mapper';
import { AnswerUpdateDTO } from "../dtos/answer.update.dto";
import { AnswerUpdateResponse } from "../responses/answer.update.response";

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
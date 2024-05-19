import {
  QuestionCreateDTO,
  QuestionCreateResponse,
  QuestionUpdateDTO,
  QuestionUpdateResponse,
  QuestionGetResponse,
  OkResponse,
  QuestionGetDTO,
} from '@cloneoverflow/common';
import { Response } from "express";
import { QuestionMapper } from "../mappers/question.mapper";
import { QuestionService } from "../services/question.service";
import { AuthRequest, Body, Params, Query } from "../types/Requests";

export class QuestionController {
  constructor(
    private questionService = new QuestionService(),
    private questionMapper = new QuestionMapper(),
  ) {}
  
  async get(req: Params<{ questionId: string }> & Query<QuestionGetDTO>, res: Response<QuestionGetResponse>) {
    const question = await this.questionService.get(req.params.questionId, req.query);
    res.send(this.questionMapper.get(question));
  }

  async create(req: AuthRequest & Body<QuestionCreateDTO>, res: Response<QuestionCreateResponse>) {
    const question = await this.questionService.create(req.body._user.userId, req.body);
    res.send(this.questionMapper.create(question));
  }
  
  async update({ params, body }: AuthRequest & Body<QuestionUpdateDTO>, res: Response<QuestionUpdateResponse>) {
    const question = await this.questionService.update(params.questionId, body._user.userId, body);
    res.send(this.questionMapper.update(question));
  }

  async delete(req: Params<{ questionId: string }>, res: Response<OkResponse>) {
    await this.questionService.delete(req.params.questionId);
    
    res.send({
      message: 'ok'
    });
  }
}
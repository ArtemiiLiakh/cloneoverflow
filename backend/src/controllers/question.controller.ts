import {
  QuestionCreateDTO,
  QuestionCreateResponse,
  QuestionUpdateDTO,
  QuestionUpdateResponse,
  QuestionGetResponse,
  OkResponse,
  QuestionGetDTO,
  VoteDTO,
  QuestionCloseDTO
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
  
  async get(req: AuthRequest & Params<{ questionId: string }> & Query<QuestionGetDTO> , res: Response<QuestionGetResponse>) {
    const question = await this.questionService.get(req.params.questionId, req.query, req.body?._user?.userId);
    res.send(this.questionMapper.get(question, req.body?._user?.userId));
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

  async closeQuestion(req: Params<{ questionId: string }> & Body<QuestionCloseDTO> & AuthRequest, res: Response<OkResponse>) {
    await this.questionService.closeQuestion(req.params.questionId, req.body.answerId, req.body._user.userId);

    res.send({
      message: 'ok'
    });
  }
  
  async voteQuestion(req: Params<{ questionId: string }> & Body<VoteDTO> & AuthRequest, res: Response<OkResponse>) {
    await this.questionService.voteQuestion(req.params.questionId, req.body._user.userId, req.body.vote);
    
    res.send({
      message: 'ok'
    });
  }
}
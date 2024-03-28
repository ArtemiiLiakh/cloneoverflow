import { 
  QuestionCreateDTO, 
  QuestionCreateResponse, 
  QuestionUpdateDTO, 
  QuestionUpdateResponse 
} from '@clone-overflow/common';
import { Response } from "express";
import { QuestionMapper } from "../mappers/question.mapper";
import { QuestionService } from "../services/question.service";
import { AuthRequest, Body } from "../types/Requests";

export class QuestionController {
  constructor(
    private questionService = new QuestionService(),
    private questionMapper = new QuestionMapper(),
  ) {}
  
  async create(req: AuthRequest & Body<QuestionCreateDTO>, res: Response<QuestionCreateResponse>) {
    const question = await this.questionService.create(req.body._user.userId, req.body);
    res.send(this.questionMapper.create(question));
  }
  
  async update({ params, body }: AuthRequest & Body<QuestionUpdateDTO>, res: Response<QuestionUpdateResponse>) {
    const question = await this.questionService.update(params.questionId, body._user.userId, body);
    res.send(this.questionMapper.update(question));
  }
}
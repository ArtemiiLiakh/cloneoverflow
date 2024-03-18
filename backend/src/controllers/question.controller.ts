import { QuestionService } from "../services/question.service";
import { QuestionMapper } from "../mappers/question.mapper";
import { Body } from "../types/Requests";
import { Response } from "express";
import { QuestionCreateDTO } from "../dtos/question.create.dto";
import { QuestionCreateResponse } from "../responses/question.create.response";
import { AuthRequest } from "../types/Requests";

export class QuestionController {
  constructor(
    private questionService = new QuestionService(),
    private questionMapper = new QuestionMapper(),
  ) {}
  
  async create(req: AuthRequest & Body<QuestionCreateDTO>, res: Response<QuestionCreateResponse>) {
    const question = await this.questionService.create(req.body._user.userId, req.body);
    res.send(this.questionMapper.create(question));
  }
}
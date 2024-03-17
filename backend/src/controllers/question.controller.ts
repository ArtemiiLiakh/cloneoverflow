import { QuestionService } from "../services/question.service";
import { QuestionMapper } from "../mappers/question.mapper";
import { Body } from "../types/Requests";
import { Response } from "express";
import { QuestionCreateDTO } from "../dtos/question.create.dto";
import { QuestionCreateResponse } from "../responses/question.create.response";
import { AuthRequest } from "../types/Requests";
import { QuestionUpdateDTO } from "../dtos/question.update.dto";
import { QuestionUpdateResponse } from "../responses/question.update.response";

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
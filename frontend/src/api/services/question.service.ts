import { AnswerCreateResponse, QuestionCreateDTO } from "@cloneoverflow/common";
import api from "..";
import urls from "../urls";

export class QuestionService {
  static create (data: QuestionCreateDTO): Promise<AnswerCreateResponse> {
    return api.post(urls.create, data)
  }
}
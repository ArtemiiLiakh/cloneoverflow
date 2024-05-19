import { OkResponse, QuestionCreateDTO, QuestionCreateResponse, QuestionGetDTO, QuestionGetResponse, QuestionUpdateDTO, QuestionUpdateResponse } from "@cloneoverflow/common";
import api from "..";
import urls from "../urls";

export class QuestionService {
  static create (data: QuestionCreateDTO): Promise<QuestionCreateResponse> {
    return api.post(urls.createQuestion, data)
  }

  static get(questionId: string, data?: QuestionGetDTO): Promise<QuestionGetResponse> {
    return api.get(urls.getQuestion(questionId), {
      params: data,
    });
  }

  static update(questionId: string, data: QuestionUpdateDTO): Promise<QuestionUpdateResponse> {
    return api.patch(urls.updateQuestion(questionId), data);
  }

  static delete(questionId: string): Promise<OkResponse> {
    return api.delete(urls.deleteQuestion(questionId));
  }
}
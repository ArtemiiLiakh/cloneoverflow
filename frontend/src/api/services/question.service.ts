import { 
  OkResponse, 
  QuestionCreateDTO, 
  QuestionCreateResponse, 
  QuestionGetDTO, 
  QuestionGetResponse, 
  QuestionUpdateDTO, 
  QuestionUpdateResponse, 
  VoteDTO 
} from "@cloneoverflow/common";
import api from "..";
import urls from "../urls";

export class QuestionService {
  static create (data: QuestionCreateDTO): Promise<QuestionCreateResponse> {
    return api.post(urls.createQuestion, data).then((res) => res.data);
  }

  static get(questionId: string, data?: QuestionGetDTO): Promise<QuestionGetResponse> {
    return api.get(urls.getQuestion(questionId), {
      params: data,
    }).then((res) => res.data);
  }

  static update(questionId: string, data: QuestionUpdateDTO): Promise<QuestionUpdateResponse> {
    return api.patch(urls.updateQuestion(questionId), data).then((res) => res.data);
  }

  static delete(questionId: string): Promise<OkResponse> {
    return api.delete(urls.deleteQuestion(questionId)).then((res) => res.data);
  }

  static closeQuestion(questionId: string, answerId: string): Promise<OkResponse> {
    return api.patch(urls.closeQuestion(questionId), {
      answerId,
    }).then((res) => res.data);
  }
  
  static voteQuestion(questionId: string, data: VoteDTO): Promise<OkResponse> {
    return api.patch(urls.voteQuestion(questionId), data).then((res) => res.data);
  }
}
import { AnswerCreateDTO, AnswerCreateResponse, AnswerUpdateDTO, AnswerUpdateResponse } from "@cloneoverflow/common";
import api from "..";
import urls from "../urls";

export class AnswerService {
  static create(data: AnswerCreateDTO): Promise<AnswerCreateResponse> {
    return api.post(urls.createAnswer, data).then((res) => res.data);
  }

  static update(answerId: string, data: AnswerUpdateDTO): Promise<AnswerUpdateResponse> {
    return api.patch(urls.updateAnswer(answerId), data);
  }

  static delete(answerId: string) {
    return api.delete(urls.deleteAnswer(answerId));
  }
}
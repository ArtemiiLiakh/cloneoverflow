import { AnswerCreateDTO, AnswerCreateResponse, AnswerUpdateDTO, AnswerUpdateResponse, OkResponse, VoteDTO } from "@cloneoverflow/common";
import api from "..";
import urls from "../urls";

export class AnswerService {
  static create(data: AnswerCreateDTO): Promise<AnswerCreateResponse> {
    return api.post(urls.createAnswer, data).then((res) => res.data);
  }

  static update(answerId: string, data: AnswerUpdateDTO): Promise<AnswerUpdateResponse> {
    return api.patch(urls.updateAnswer(answerId), data).then((res) => res.data);
  }

  static delete(answerId: string) {
    return api.delete(urls.deleteAnswer(answerId)).then((res) => res.data);
  }

  static voteAnswer(answerId: string, data: VoteDTO): Promise<OkResponse> {
    return api.patch(urls.voteAnswer(answerId), data).then((res) => res.data);
  }
}
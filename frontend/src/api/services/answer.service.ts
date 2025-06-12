import { AnswerCreateBody, AnswerCreateResponse, AnswerUpdateBody } from '@cloneoverflow/common/api/answer';
import api from '..';
import urls from '../urls';

export class AnswerService {
  static create(data: AnswerCreateBody): Promise<AnswerCreateResponse> {
    return api.post(urls.createAnswer, data).then((res) => res.data);
  }

  static update(answerId: string, data: AnswerUpdateBody): Promise<void> {
    return api.patch(urls.updateAnswer(answerId), data).then((res) => res.data);
  }

  static delete(answerId: string): Promise<void> {
    return api.delete(urls.deleteAnswer(answerId)).then((res) => res.data);
  }

  static voteAnswer(answerId: string, vote: 'up' | 'down'): Promise<void> {
    return api.post(urls.voteAnswer(answerId, vote)).then((res) => res.data);
  }
}
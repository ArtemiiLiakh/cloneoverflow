import { AnswersSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import {
  QuestionCloseBody,
  QuestionCreateBody,
  QuestionCreateResponse,
  QuestionGetAnswersQuery,
  QuestionGetAnswersResponse,
  QuestionGetResponse,
  QuestionUpdateBody,
} from '@cloneoverflow/common/api/question';
import api from '..';
import urls from '../urls';

export class QuestionService {
  static create (data: QuestionCreateBody): Promise<QuestionCreateResponse> {
    return api.post(urls.createQuestion, data).then((res) => res.data);
  }

  static get(questionId: string): Promise<QuestionGetResponse> {
    return api.get(urls.getQuestion(questionId)).then((res) => res.data);
  }
  
  static getAnswers(questionId: string, sortBy?: AnswersSortByEnum, orderBy?: OrderByEnum): Promise<QuestionGetAnswersResponse> {
    return api.get(urls.getQuestionAnswers(questionId), {
      params: {
        sortBy,
        orderBy,
      } as QuestionGetAnswersQuery
    }).then((res) => res.data);
  }

  static addViewer (questionId: string): Promise<void> {
    return api.post(urls.addQuestionViewer(questionId));
  }

  static update(questionId: string, data: QuestionUpdateBody): Promise<void> {
    return api.patch(urls.updateQuestion(questionId), data);
  }

  static delete(questionId: string): Promise<void> {
    return api.delete(urls.deleteQuestion(questionId));
  }

  static closeQuestion(questionId: string, body: QuestionCloseBody): Promise<void> {
    return api.post(urls.closeQuestion(questionId), body);
  }

  static openQuestion(questionId: string): Promise<void> {
    return api.post(urls.openQuestion(questionId));
  }
  
  static voteQuestion(questionId: string, vote: 'up' | 'down'): Promise<void> {
    return api.post(urls.voteQuestion(questionId, vote));
  }
  
  static makeFavorite(questionId: string): Promise<void> {
    return api.post(urls.makeFavorite(questionId));
  }

  static removeFavorite(questionId: string): Promise<void> {
    return api.delete(urls.removeFavorite(questionId));
  }
}
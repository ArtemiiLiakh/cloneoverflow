import { AnswerCreateResponse } from '@cloneoverflow/common/api/answer';
import { AnswerCreateOutput } from '@application/answer/usecases/dtos';

export function AnswerCreateMapperOutput (answer: AnswerCreateOutput): AnswerCreateResponse {
  return {
    id: answer.answerId,
  };
}
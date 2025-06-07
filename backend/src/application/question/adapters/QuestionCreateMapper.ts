import { QuestionCreateResponse } from '@cloneoverflow/common/api/question';
import { QuestionCreateOutput } from '@application/question/usecases/dtos';

export function QuestionCreateMapperOutput (
  question: QuestionCreateOutput,
): QuestionCreateResponse {
  return {
    id: question.questionId,
  };
}
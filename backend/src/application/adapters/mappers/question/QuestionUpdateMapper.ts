import { QuestionUpdateResponse } from "@cloneoverflow/common";
import { QuestionServiceOutput } from "@core/service/question/dto/QuestionServiceOutput";

export function QuestionUpdateMapperOutput (
  question: QuestionServiceOutput.Update
): QuestionUpdateResponse {
  return {
    id: question.id,
    title: question.title,
    text: question.text,
    rate: question.rate,
    status: question.status,
    views: question.views,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  };
}
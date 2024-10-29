import { AnswerCreateResponse } from "@cloneoverflow/common";
import { AnswerServiceOutput } from "@core/service/answer/dto/AnswerServiceOutput";

export function AnswerCreateMapperOutput (answer: AnswerServiceOutput.Create): AnswerCreateResponse {
  return {
    id: answer.id,
    ownerId: answer.ownerId,
    questionId: answer.questionId,
    text: answer.text,
    rate: answer.rate,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt,
  }
}
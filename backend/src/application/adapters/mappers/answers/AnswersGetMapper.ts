import { AnswerGetResponse } from "@cloneoverflow/common";
import { AnswerServiceOutput } from "@core/service/answer/dto/AnswerServiceOutput";

export function AnswerGetMapperOutput(answer: AnswerServiceOutput.Get): AnswerGetResponse {
  const owner: AnswerGetResponse["owner"] = answer.owner ? {
    id: answer.owner?.id,
    name: answer.owner?.name,
    reputation: answer.owner?.reputation,
    username: answer.owner?.username,
  } : undefined;

  const question: AnswerGetResponse["question"] = answer.question ? {
    id: answer.question.id,
    title: answer.question.title,
    rate: answer.question.rate,
    status: answer.question.status,
    views: answer.question.views,
    createdAt: answer.question.createdAt,
    updatedAt: answer.question.updatedAt,
  } : undefined;

  return {
    id: answer.entity.id,
    text: answer.entity.text,
    rate: answer.entity.rate,
    isSolution: answer.entity.isSolution,
    createdAt: answer.entity.createdAt,
    updatedAt: answer.entity.updatedAt,
    owner,
    question,
    voteType: answer.user?.voteType,
  };
}
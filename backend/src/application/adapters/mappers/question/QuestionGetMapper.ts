import { QuestionGetResponse } from "@cloneoverflow/common";
import { QuestionServiceOutput } from "@core/service/question/dto/QuestionServiceOutput";

export function QuestionGetMapperOutput(
  question: QuestionServiceOutput.Get
): QuestionGetResponse {
  const owner = question.owner ? {
    id: question.owner.id,
    name: question.owner.name,
    reputation: question.owner.reputation,
    username: question.owner.username,
  } : undefined;

  const answers = question.answers?.map(answer => ({
    id: answer.entity.id,
    text: answer.entity.text,
    rate: answer.entity.rate,
    isSolution: answer.entity.isSolution,
    createdAt: answer.entity.createdAt,
    updatedAt: answer.entity.updatedAt,
    voteType: answer.user?.voteType,
    owner: {
      id: answer.owner.id,
      name: answer.owner.name,
      reputation: answer.owner.reputation,
      username: answer.owner.username,
    },
  }));

  return {
    id: question.entity.id,
    title: question.entity.title,
    text: question.entity.text,
    rate: question.entity.rate,
    status: question.entity.status,
    views: question.entity.views,
    createdAt: question.entity.createdAt,
    updatedAt: question.entity.updatedAt,
    tags: question.tags?.map(tag => tag.text),
    voteType: question.user?.voteType,
    owner,
    answers,
  };
}
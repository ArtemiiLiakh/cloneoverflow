import { UserGetResponse } from "@cloneoverflow/common";
import { UserServiceOutput } from "@core/service/user/dto/UserServiceOutput";

export function UserGetMapperOutput (user: UserServiceOutput.Get): UserGetResponse {
  const questions = user.questions?.map(question => ({
    id: question.id,
    title: question.title,
    rate: question.rate,
    views: question.views,
    status: question.status,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  }));

  const answers = user.answers?.map(answer => ({
    id: answer.id,
    questionId: answer.questionId,
    rate: answer.rate,
    isSolution: answer.isSolution,
    createdAt: answer.createdAt,
    updatedAt: answer.updatedAt
  }));
  
  return {
    id: user.entity.id,
    name: user.entity.name,
    username: user.entity.username,
    reputation: user.entity.reputation,
    status: user.entity.status,
    about: user.entity.about,
    createdAt: user.entity.createdAt,
    updatedAt: user.entity.updatedAt,
    answersAmount: user.answersAmount,
    questionsAmount: user.questionsAmount,
    questions,
    answers,
  };
} 
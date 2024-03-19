import { DbUserGetProfile, DbUser } from "../types/database/DbUser";
import { UserUpdateResponse } from "../responses/user.update.response";
import { MappedUserGetAnswerResponse, UserGetAnswersResponse } from '../responses/user.getAnswers.response';
import { DbAnswer } from '../types/database/DbAnswer';
import { DbQuestion } from '../types/database/DbQuestion';
import { MappedUserGetQuestionResponse } from '../responses/user.getQuestion.response';
import { UserGetProfileResponse } from '../responses/user.getProfile.response';

export class UserMapper {
  update({id, userProfile}: DbUser): UserUpdateResponse {
    return {
      id,
      name: userProfile.name,
      username: userProfile.username,
      about: userProfile.about,
      reputation: userProfile.reputation,
      status: userProfile.status,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt,
    };
  }

  getProfile(user: DbUserGetProfile): UserGetProfileResponse {
    const { userProfile } = user;
    const { answers, questions } = userProfile;
    
    const bestAnswer = answers[0] ? 
      {
        id: answers[0].id,
        text: answers[0].text,
        rate: answers[0].rate,
        isSolution: answers[0].isSolution,
        createdAt: answers[0].createdAt,
        question: {
          id: answers[0].question.id,
          title: answers[0].question.title,
        },
      } : null;

    const bestQuestion = questions[0] ?
      {
        id: questions[0].id,
        title: questions[0].title,
        rate: questions[0].rate,
        status: questions[0].status,
        tags: questions[0].tags.map(tag => tag.name),
        answersAmount: questions[0]._count.answers,
        createdAt: questions[0].createdAt,
      } : null;

    return {
      id: user.id,
      name: userProfile.name,
      username: userProfile.username,
      about: userProfile.about,
      reputation: userProfile.reputation,
      status: userProfile.status,
      answersAmount: userProfile._count.answers,
      questionsAmount: userProfile._count.questions,
      bestAnswer,
      bestQuestion,
      createdAt: userProfile.createdAt,
    };
  }

  getAnswers(answers: DbAnswer[]): MappedUserGetAnswerResponse[] {
    return answers.map(answer => ({
      id: answer.id,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      question: {
        id: answer.question.id,
        title: answer.question.title,
        rate: answer.question.rate,
      },
    }));
  }

  getQuestions(questions: DbQuestion[]): MappedUserGetQuestionResponse[] {
    return questions.map(question => ({
      id: question.id,
      userId: question.userId,
      title: question.title,
      text: question.text,
      rate: question.rate,
      status: question.status,
      tags: question.tags,
      answersAmount: question.answers.length,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));
  }
}
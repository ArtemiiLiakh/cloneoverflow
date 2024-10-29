import { NoEntityWithIdException, QuestionIncludeEnum, UserAnswerStatusEnum, UserQuestionStatusEnum } from "@cloneoverflow/common";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { AnswerRepositoryOutput } from "@core/domain/repositories/answer/output/AnswerRepositoryOutput";
import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { QuestionServiceInput } from "../dto/QuestionServiceInput";
import { QuestionServiceOutput } from "../dto/QuestionServiceOutput";
import { IQuestionAddViewerUseCase, IQuestionGetUseCase } from "../types/usecases";

export class QuestionGetUseCase implements IQuestionGetUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private addViewerUseCase: IQuestionAddViewerUseCase,
  ) {}

  async execute({ userId, questionId, include }: QuestionServiceInput.Get): Promise<QuestionServiceOutput.Get> {
    const questionIncludes: QuestionRepositoryInput.QuestionInclude | undefined = include ? {
      owner: include.includes(QuestionIncludeEnum.OWNER),
      users: include.includes(QuestionIncludeEnum.VOTER) ? {
        userId,
        questionId,
        status: UserQuestionStatusEnum.VOTER,
      } : undefined,
      tags: include.includes(QuestionIncludeEnum.TAGS),
    } : undefined;
    
    const question = await this.questionRepository.findById({
      id: questionId,
      options: {
        include: questionIncludes,
      },
    });

    let answers: AnswerRepositoryOutput.FindMany | undefined;
    
    if (include?.includes(QuestionIncludeEnum.ANSWER)) {
      answers = await this.answerRepository.findMany({
        where: {
          questionId,
        },
        options: {
          include: {
            owner: true,
            users: {
              userId,
              status: UserAnswerStatusEnum.VOTER,
            },
          },
        },
      });
    }
  
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (userId) {
      await this.addViewerUseCase.execute({
        questionId,
        userId,
      });
    }
  
    return {
      entity: question.entity, 
      owner: question.owner,
      answers: answers?.map(answer => ({
        entity: answer.entity,
        owner: answer.owner!,
        user: answer.users?.[0]
      })),
      tags: question.tags,
      user: question.users?.[0],
    };
  }
}
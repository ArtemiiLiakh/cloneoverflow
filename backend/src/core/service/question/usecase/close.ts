import { ForbiddenException, NoEntityWithIdException, QuestionStatus } from "@cloneoverflow/common";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { QuestionServiceInput } from "../dto/QuestionServiceInput";
import { IQuestionCloseUseCase } from "../types/usecases";
import { QuestionServiceOutput } from "../dto/QuestionServiceOutput";

export class QuestionCloseUseCase implements IQuestionCloseUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute({ userId, questionId, answerId }: QuestionServiceInput.CloseQuestion): Promise<QuestionServiceOutput.CloseQuestion> {
    const question = await this.questionRepository.findById({ id: questionId });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    const answer = await this.answerRepository.findById({ id: answerId });

    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (question.entity.ownerId !== userId) {
      throw new ForbiddenException();
    }

    const questionStatus = answer.entity.isSolution ? QuestionStatus.ACTIVE : QuestionStatus.CLOSED;

    await this.unitOfWork.execute(async (unit) => {
      await unit.questionRepository.update({
        id: questionId,
        question: {
          status: questionStatus,
        },
      });

      await unit.answerRepository.updateMany({
        where: {
          questionId,
        },
        answer: {
          isSolution: false,
        },
      });

      await unit.answerRepository.update({
        id: answerId,
        answer: {
          isSolution: !answer.entity?.isSolution,
        },
      });
    });
  }
}
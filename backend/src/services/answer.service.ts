import { AnswerCreateDTO } from '../dtos/answer.create.dto';
import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { BadBodyException } from '../utils/exceptions/BadBodyException';

export class AnswerService {
  constructor (
    private answerRepository = new AnswerRepository(),
    private questionRepository = new QuestionRepository(),
  ) {}

  async create (ownerId: string, { questionId, text }: AnswerCreateDTO) {
    const question = await this.questionRepository.findById(questionId);
    if (!question) throw new BadBodyException('Question does not exist');

    return this.answerRepository.create({
      userId: ownerId,
      questionId,
      text,
    });
  }
}
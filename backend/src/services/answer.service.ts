import { AnswerCreateDTO } from '../dtos/answer.create.dto';
import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { BadBodyException } from '../utils/exceptions/BadBodyException';
import { AnswerUpdateDTO } from "../dtos/answer.update.dto";
import { ForbiddenException } from "../utils/exceptions/ForbiddenExceptioin";

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

  async update (answerId: string, ownerId: string, { text }: AnswerUpdateDTO) {
    const existingAnswer = await this.answerRepository.find({id: answerId});

    if(existingAnswer.userId !== ownerId){
      throw new ForbiddenException();
    }

    return this.answerRepository.update({id: answerId}, {text: text});
  }
}
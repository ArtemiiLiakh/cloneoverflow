import { QuestionRepository } from "../repositories/question.repository";
import { QuestionCreateDTO } from "../dtos/question.create.dto";
import { QuestionUpdateDTO } from "../dtos/question.update.dto";
import { ForbiddenException } from "../utils/exceptions/ForbiddenExceptioin";

export class QuestionService{
  constructor(
    private questionRepository = new QuestionRepository(),
  ) {}

  async create(userId: string, {title, text, tags}: QuestionCreateDTO) {
    return await this.questionRepository.create({
      userId: userId,
      title: title,
      text: text,
      rate: 0,
      status: "ACTIVE",
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      },
    });
  }

  async update(questionId: string, userId: string, {title, text, status, tags}: QuestionUpdateDTO) {
    const existingQuestion = await this.questionRepository.findById(questionId);

    if(existingQuestion.userId !== userId){
      throw new ForbiddenException();
    }

    let updateData: any = {
      title: title,
      text: text,
      status: status
    };

    if (tags !== undefined) {
      await this.questionRepository.updateById(questionId, {
        tags: {
          disconnect: existingQuestion.tags,
        },
      });
      updateData.tags = {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      };
    }

    return await this.questionRepository.updateById(questionId, updateData);
  }
}
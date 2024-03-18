import { QuestionRepository } from "../repositories/question.repository";
import { QuestionCreateDTO } from "../dtos/question.create.dto";

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
}
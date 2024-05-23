import { 
  AnswerCreateDTO, 
  AnswerUpdateDTO, 
  BadBodyException, 
  ForbiddenException, 
  NoEntityWithIdException,
  VoteType, 
} from '@cloneoverflow/common';
import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { PrismaClient, PrismaPromise, QuestionStatus, UserAnswerStatus } from '@prisma/client';

export class AnswerService {
  constructor (
    private answerRepository = new AnswerRepository(),
    private questionRepository = new QuestionRepository(),
    private prisma = new PrismaClient(),
  ) {}

  async create (ownerId: string, { questionId, text }: AnswerCreateDTO) {
    const question = await this.questionRepository.findById(questionId, {
      include: {
        answers: {
          where: {
            userAnswers: {
              some: {
                userId: ownerId,
                status: UserAnswerStatus.OWNER,
              },
            },
          },
        },
      },
    });
    
    if (!question) {
      throw new BadBodyException('Question does not exist');
    }

    if (question.answers.length > 0) {
      throw new ForbiddenException('You already answered this question');
    }

    return this.answerRepository.create({
      questionId,
      text,
      userAnswers: {
        create: {
          userId: ownerId,
        },
      },
    });
  }

  async update (answerId: string, ownerId: string, { text }: AnswerUpdateDTO) {
    const existingAnswer = await this.answerRepository.find({
      id: answerId,
    });

    if(existingAnswer.userAnswers[0].userId !== ownerId){
      throw new ForbiddenException();
    }

    return this.answerRepository.updateById(answerId, { text });
  }

  async get (answerId: string) {
    return await this.answerRepository.find({
      id: answerId,
    });
  }

  async delete (answerId: string) {
    const answer = await this.answerRepository.delete({ id: answerId });

    if (!answer) {
      throw new NoEntityWithIdException('Answers')
    }

    if (answer.isSolution) {
      await this.questionRepository.updateById(answer.questionId, {
        status: QuestionStatus.ACTIVE,
      });
    }
  }

  async voteAnswer(answerId: string, userId: string, vote: VoteType) {
    const votedAnswer = await this.answerRepository.find({
      id: answerId,
    }, {
      include: {
        userAnswers: {
          where: {
            OR: [
              {
                userId,
                answerId,
                status: UserAnswerStatus.OWNER,
              },
              {
                userId,
                answerId,
                status: UserAnswerStatus.VOTER,
              },
            ],
          },
        },
      },
    });

    const { userAnswers: ownerAnswers } = await this.answerRepository.findById(answerId);

    if (!votedAnswer.userAnswers[0]) {
      return this.answerRepository.updateById(answerId, {
        rate: {
          increment: vote === VoteType.UP ? 1 : -1,
        },
        userAnswers: {
          create: {
            userId,
            status: UserAnswerStatus.VOTER,
            voteType: vote,
          },
          update: {
            where: {
              id: ownerAnswers[0].id,
            },
            data: {
              userProfile: {
                update: {
                  reputation: {
                    increment: vote === VoteType.UP ? 1 : -1,
                  },
                },
              },
            },
          },
        },
      });
    }

    if (
      votedAnswer?.userAnswers[0].status === UserAnswerStatus.VOTER && 
      votedAnswer?.userAnswers[0].voteType?.toString() !== vote
    ) {
      return this.prisma.$transaction([
        this.answerRepository.updateById(answerId, {
          userAnswers: {
            update: {
              where: {
                id: ownerAnswers[0].id,
              },
              data: {
                userProfile: {
                  update: {
                    reputation: {
                      increment: vote === VoteType.UP ? 1 : -1,
                    },
                  },
                },
              },
            },
          },
        }),
        this.answerRepository.updateById(answerId, {
          rate: {
            increment: vote === VoteType.UP ? 1 : -1,
          },
          userAnswers: {
            update: {
              where: {
                id: votedAnswer.userAnswers[0].id,
              },
              data:  {
                voteType: votedAnswer?.userAnswers[0].voteType ? null : vote,
              },
            },
          },
        }),
      ], {
        isolationLevel: 'ReadUncommitted',
      });
    }

    throw new ForbiddenException();
  }
}
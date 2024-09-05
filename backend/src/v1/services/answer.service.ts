import { AnswerRepository } from '@/v1/repositories/answer.repository';
import { QuestionRepository } from '@/v1/repositories/question.repository';
import { UserRepository } from '@/v1/repositories/user.repository';
import { DbAnswer, AnswerUserRelation } from '@/v1/types/database/DbAnswer';
import { DbQuestion, QuestionAnswerRelation } from '@/v1/types/database/DbQuestion';
import {
  AnswerCreateDTO,
  AnswerUpdateDTO,
  BadBodyException,
  ForbiddenException,
  NoEntityWithIdException,
  QuestionStatus,
  VoteType,
} from '@cloneoverflow/common';
import { PrismaClient, UserAnswerStatus } from '@prisma/client';

export class AnswerService {
  constructor (
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private prisma: PrismaClient,
  ) {}

  async create (ownerId: string, { questionId, text }: AnswerCreateDTO) {
    const question = await this.questionRepository.findById<DbQuestion & QuestionAnswerRelation>(questionId, {
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
      ownerId,
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
    const answer = await this.answerRepository.find({
      id: answerId,
    });

    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (answer.ownerId !== ownerId){
      throw new ForbiddenException();
    }

    return this.answerRepository.updateById(answerId, { text });
  }

  async get (answerId: string, userId?: string) {
    const answer =  await this.answerRepository.findById<DbAnswer & AnswerUserRelation>(answerId, {
      include: {
        owner: true,
        userAnswers: {
          where: {
            answerId,
            userId,
            status: UserAnswerStatus.VOTER,
          },
        },
      },
    });

    if (!answer) {
      throw new NoEntityWithIdException('Answer')
    }

    return answer;
  }

  async delete (answerId: string, userId: string) {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new NoEntityWithIdException('Answers')
    }

    if (answer.ownerId !== userId) {
      throw new ForbiddenException('You cannot delete someone else\'s question');
    }

    if (answer.isSolution) {
      await this.questionRepository.updateById(answer.questionId, {
        status: QuestionStatus.ACTIVE,
      });
    }

    return this.answerRepository.delete({
      id: answerId,
    });
  }

  async voteAnswer(answerId: string, userId: string, vote: VoteType) {
    const votedAnswer = await this.answerRepository.find<DbAnswer & AnswerUserRelation>({
      id: answerId,
    }, {
      include: {
        userAnswers: {
          where: {
            userId,
            answerId,
            status: UserAnswerStatus.VOTER,
          },
        },
        owner: true,
      },
    });

    if (!votedAnswer) {
      throw new NoEntityWithIdException('Answer');
    }

    if (votedAnswer.ownerId === userId) {
      throw new ForbiddenException('You cannot vote your own answer');
    }

    if (!votedAnswer.userAnswers.length) {
      return this.prisma.$transaction([
        this.userRepository.updateById(votedAnswer.ownerId, {
          userProfile: {
            update: {
              reputation: {
                increment: vote === VoteType.UP ? 1 : -1,
              },
            },
          },
        }),
        this.answerRepository.updateById(answerId, {
          rate: {
            increment: vote === VoteType.UP ? 1 : -1,
          },
          userAnswers: {
            create: {
              userId,
              status: UserAnswerStatus.VOTER,
              voteType: vote,
            },
          },
        }),
      ]);
    }

    if (
      votedAnswer?.userAnswers[0].voteType?.toString() !== vote
    ) {
      return this.prisma.$transaction([
        this.userRepository.updateById(votedAnswer.ownerId, {
          userProfile: {
            update: {
              reputation: {
                increment: vote === VoteType.UP ? 1 : -1,
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
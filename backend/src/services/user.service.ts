import { UserRepository } from "../repositories/user.repository";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { BadBodyException } from "../utils/exceptions/BadBodyException";
import { NoEntityWithIdException } from "../utils/exceptions/NoEntityWithIdException";
import { UserGASortBy, UserGetAnswersDTO } from '../dtos/user.getAnswers.dto';
import { AnswerRepository } from '../repositories/answer.repository';
import { Prisma } from '@prisma/client';
import { OrderBy } from '../types/OrderBy';
import { DbUtils } from '../utils/DatabaseUtils';
import { DbAnswer, DbAnswerQuestion } from '../types/database/DbAnswer';

export class UserService {
  constructor(
    private userRepository = new UserRepository(),
    private answerRepository = new AnswerRepository(),
  ) {}

  async update(userId: string, {name, username, about, reputation, status}: UserUpdateDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    const userExists = await this.userRepository.find({
      userProfile: {
        username: username,
      }
    })
    if (userExists.userProfile?.userId !== userId) {
      throw new BadBodyException("Username already exists");
    }

    await this.userRepository.updateById(userId, {
      userProfile: {
        update: {
          name: name,
          username: username,
          about: about,
          reputation: reputation,
          status: status,
        }
      }
    })
    return await this.userRepository.findById(userId);
  }

  getAnswers(userId: string, {sortBy, orderBy, pagination}: UserGetAnswersDTO) {
    return DbUtils.paginate<Prisma.AnswerFindManyArgs, DbAnswerQuestion>(this.answerRepository, {
      where: {
        userId,
      },
      orderBy: this.getSortBy(sortBy, orderBy),
      include: {
        question: true,
      }
    }, pagination ?? {});
  }

  private getSortBy(sortBy?: UserGASortBy, orderBy?: OrderBy): Prisma.AnswerOrderByWithRelationInput {
    switch (sortBy) {
      case UserGASortBy.RATE:
        return {
          rate: orderBy ?? 'desc',
        };
      case UserGASortBy.DATE:
        return {
          createdAt: orderBy ?? 'asc',
        };
      case UserGASortBy.SOLUTION:
        return {
          isSolution: orderBy ?? 'desc',
        };
    }
    return {};
  }
}
import { IsolationLevel } from '@cloneoverflow/common';
import { AnswerRepository } from './answer/AnswerRepository';
import { AnswerUserRepository } from './answer/AnswerUserRepository';
import { QuestionRepository } from './question/QuestionRepository';
import { QuestionUserRepository } from './question/QuestionUserRepository';
import { TagRepository } from './tag/TagRepository';
import { UserRepository } from './user/UserRepository';

export interface Unit {
  userRepository: UserRepository;
  questionRepository: QuestionRepository;
  questionUserRepository: QuestionUserRepository;
  answerUserRepository: AnswerUserRepository;
  answerRepository: AnswerRepository;
  tagRepository: TagRepository;
}

export interface UnitOfWork {
  execute<I>(fn: (unit: Unit) => Promise<I> | Promise<unknown>[], isolationLevel?: IsolationLevel): Promise<I | null>;
}
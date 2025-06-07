import { IsolationLevel } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerVoterRepository } from '@core/answer/repository/AnswerVoterRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionVoterRepository } from '@core/question/repository/QuestionVoterRepository';
import { TagRepository } from '@core/tag/repository/TagRepository';
import { UserRepository } from '@core/user/repository/UserRepository';

export interface Unit {
  userRepository: UserRepository;
  questionRepository: QuestionRepository;
  questionVoterRepository: QuestionVoterRepository,
  answerRepository: AnswerRepository;
  answerVoterRepository: AnswerVoterRepository,
  tagRepository: TagRepository;
}

export interface UnitOfWork {
  executeFn<I>(
    fn: (unit: Unit) => Promise<I>, 
    isolationLevel?: IsolationLevel,
  ): Promise<I>;

  executeSeq(
    fn: (unit: Unit) => Promise<unknown>[], 
    isolationLevel?: IsolationLevel,
  ): Promise<void>;
}
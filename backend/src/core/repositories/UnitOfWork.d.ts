import { IsolationLevel } from '@cloneoverflow/common';
import { AnswerRepository } from './answer/AnswerRepository';
import { AnswerVoterRepository } from './answer/answerVoter/AnswerVoterRepository';
import { QuestionRepository } from './question/QuestionRepository';
import { QuestionVoterRepository } from './question/questionVoter/QuestionVoterRepository';
import { TagRepository } from './tag/TagRepository';
import { UserRepository } from './user/UserRepository';

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
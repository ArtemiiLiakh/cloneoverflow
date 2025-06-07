import { NotFoundException } from '@cloneoverflow/common';

export class QuestionVoteNotFound extends NotFoundException {
  constructor () {
    super('Question vote not found');
  }
}
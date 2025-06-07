import { NotFoundException } from '@cloneoverflow/common';

export class AnswerVoteNotFound extends NotFoundException {
  constructor () {
    super('Vote for this answer not found');
  }
}
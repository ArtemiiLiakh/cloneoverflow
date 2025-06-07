import { NotFoundException } from '@cloneoverflow/common';

export class AnswerNotFound extends NotFoundException {
  constructor () {
    super('Answer not found');
  }
}
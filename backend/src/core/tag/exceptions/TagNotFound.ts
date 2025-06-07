import { NotFoundException } from '@cloneoverflow/common';

export class TagNotFound extends NotFoundException {
  constructor () {
    super('Tag not found');
  }
}
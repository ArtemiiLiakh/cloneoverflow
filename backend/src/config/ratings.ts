import { readFileSync } from 'fs';
import path from 'path';

interface RatingSchema {
  question: {
    voteUp: number,
    voteDown: number,
    update: number,
    open: number,
    close: number,
    delete: number,
  },
  answer: {
    voteUp: number,
    voteDown: number,
    update: number,
    delete: number,
  },
}

export const ratings = JSON.parse(
  readFileSync(path.join(process.cwd(), 'environment', 'ratings.json')).toString('utf-8'),
) as RatingSchema;

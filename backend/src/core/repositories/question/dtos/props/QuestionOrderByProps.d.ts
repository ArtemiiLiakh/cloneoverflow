import { OrderByEnum, QuestionsSortByEnum } from '@cloneoverflow/common';

export type QuestionOrderByProps = Partial<Record<QuestionsSortByEnum, OrderByEnum>>;
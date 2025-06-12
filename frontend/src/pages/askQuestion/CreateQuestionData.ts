import { z } from 'zod';

export const CreateQuestionData = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(1, 'Body is required'),
  tags: z.array(z.string()).optional(),
});

export type CreateQuestionDataType = z.infer<typeof CreateQuestionData>;
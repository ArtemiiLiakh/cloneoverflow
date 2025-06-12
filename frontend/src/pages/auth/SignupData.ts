import { z } from 'zod';

export const SignupData = z.object({
  name: z
    .string()
    .min(1, 'Name is required'),

  username: z
    .string()
    .min(1, 'Username is required'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email'),

  password: z
    .string()
    .min(1, 'Password is required'),

  repeatPassword: z
    .string()
    .min(1, 'RepeatPassword is required'),

  about: z
    .string()
    .optional()
});

export type SignupDataType = z.infer<typeof SignupData>;
import { z } from 'zod';

export const LoginData = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email'),

  password: z
    .string()
    .min(1, 'Password is required'),
})

export type LoginDataType = z.infer<typeof LoginData>;
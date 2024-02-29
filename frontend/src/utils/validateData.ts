import { validate } from 'class-validator';

export const validateData = async (data: any) => {
  const validatedErrors = await validate(data);
  const messages = [];
  if (validatedErrors.length > 0) {
    for (const error of validatedErrors) {
      messages.push(Object.values(error.constraints ?? {})[0]);
    }
  }
  return messages;
}
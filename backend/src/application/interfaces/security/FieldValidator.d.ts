export interface FieldValidator {
  message: string;
  validate(value: unknown): boolean;
}
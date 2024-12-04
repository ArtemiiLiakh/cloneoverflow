export interface AbstractValidator<T = unknown, R = unknown> {
  validate(data: T): Promise<R>;
}
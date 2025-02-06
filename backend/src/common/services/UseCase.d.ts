export interface UseCase<UseCaseInput, UseCaseOutput> {
  execute(payload: UseCaseInput): Promise<UseCaseOutput>;
}
export type Select<Entity> = {
  [K in keyof Entity]?: true
};

export type SelectResult<S extends Select<Entity>, Entity> = keyof S extends never ? Entity : {
  [K in keyof Entity as S[K] extends true | undefined ? K : never]: Entity[K];
}
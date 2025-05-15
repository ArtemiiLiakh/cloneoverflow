export type WhereInput<T> = T & {
  OR?: (T & {
    AND?: T[], 
  })[],

  AND?: (T & {
    OR?: T[], 
  })[],
} 
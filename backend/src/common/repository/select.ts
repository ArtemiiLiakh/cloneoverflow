export type SelectFields<Entity> = { 
  [I in keyof Entity]?: true
}
export const SingletonDecorator = <T extends new(...args) => any>(target: T) => {
  let instanse: T; 
  return class {
    constructor () {
      if (!instanse) {
        instanse = new target(...arguments);
      }
      return instanse;
    }
  } as T;
}
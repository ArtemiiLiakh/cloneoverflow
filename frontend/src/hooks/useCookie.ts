import Cookies from 'universal-cookie';

export const useCookie = () => {
  const cookie = new Cookies(null, {
    path: '/',
  });

  return {
    get: cookie.get.bind(cookie),
    set: cookie.set.bind(cookie),
    remove: cookie.remove.bind(cookie),
  }
}
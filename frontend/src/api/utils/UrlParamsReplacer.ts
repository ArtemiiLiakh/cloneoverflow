export const UrlParamsReplacer = (url: string, ...params: string[]) => {
  let i = 0;
  return url.replace(/:[a-zA-Z]+/g, () => {
    const param = params.at(i++);
    if (!param) throw new Error(`Not enouth parameters provided for url ${url}. Provided only ${params.length}`);
    return param;
  });
}
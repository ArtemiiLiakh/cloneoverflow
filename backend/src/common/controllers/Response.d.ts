export interface CoreResponseData<TData=object> {
  data: TData,
  status?: number,
  cookies?: object,
}

export interface CoreResponse {
  process<TData>(data: CoreResponseData<TData> | Promise<CoreResponseData<TData>>): Promise<TData>;
}
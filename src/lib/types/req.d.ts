export interface IFetchGlobalConfig {
  url: string;
  defaultOptions?: object;
  alias?: string;
}

interface IReqData {
  [key: string]: any;
}
interface IReqOptions {
  body?: IReqData;
  [key: string]: any;
}
export interface IRequestConfig {
  fullPath?: string;
  ep?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  options?: IReqOptions;
}

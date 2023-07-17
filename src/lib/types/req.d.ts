export interface IFetchGlobalConfig {
  url: string;
  defaultOptions?: any;
}

interface IReqData {
  [key: string]: any;
}
interface IReqOptions {
  body?: IReqData;
  [key: string]: any;
}
export interface IRequestConfig {
  ep: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  options?: IReqOptions;
}

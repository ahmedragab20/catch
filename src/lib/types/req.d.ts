export interface IFetchGlobalConfig {
  url: string;
  defaultOptions?: object;
  alias?: string;
  onReq?: (request: Request) => Request | Promise<Request> | void;
  onRes?: (response: Response) => Response | Promise<Response> | void;
  onErr?: (error: any) => any;
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

export interface FetchInterceptor {
  onRequest: (request: Request) => Request | Promise<Request>;
  onError: (error: any) => any;
}

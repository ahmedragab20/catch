import { TCacheStrategy } from ".";

export interface IFetchGlobalConfig {
  baseURL: string;
  defaultOptions?: object | any;
  alias?: string;
  onReq?: (request: Request) => Request | Promise<Request> | void;
  onRes?: (response: Response) => Response | Promise<Response> | void;
  onErr?: (error: any) => any;
  [key: string]: any;
}

interface IReqData {
  [key: string]: any;
}
interface IReqOptions {
  body?: IReqData;
  [key: string]: any;
}

interface IReqOptions2CustomOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD";
  useWithBaseURL?: boolean;
}
export interface IRequestConfig {
  fullPath: string;
  ep: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  options: IReqOptions;
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD";
}

export interface FetchInterceptor {
  onRequest: (request: Request) => Request | Promise<Request>;
  onError: (error: any) => any;
}

export interface IRequestOptions2 {
  customOptions?: IReqOptions2CustomOptions;
  [key: string]: any;
}

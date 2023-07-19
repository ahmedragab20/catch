import { FetchInterceptor, IReqData } from "../types/req";

interface IBodyOptions {
  urlLike: boolean;
  jsonLike: boolean;
}

export function prettifyRequestBody(
  body: IReqData,
  opts: Partial<IBodyOptions> = {}
) {
  if (!isObject(body)) {
    throw new Error("body must be an object");
  }
  if (!opts?.jsonLike) {
    opts.jsonLike = true;
  }

  let data: any;

  data = opts?.jsonLike ? JSON.stringify(body) : body;

  // redesign it to be applicable for the get requests
  if (opts?.urlLike) {
    data = "?";
    Object.keys(body).forEach((key) => {
      data += `${key}=${
        isObject(body[key]) ? JSON.stringify(body[key]) : body[key]
      }&`;
    });

    data = data.slice(0, data.length - 1);
  }

  return data;
}

export async function interceptFetch(
  onUseInterceptor: FetchInterceptor,
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    // an array to hold the interceptors
    const interceptors: FetchInterceptor[] = [];

    // a function to register interceptors
    if (isObject(onUseInterceptor)) {
      interceptors.push(onUseInterceptor);
    }

    // a function to execute the interceptors
    async function executeInterceptors(request: Request): Promise<Request> {
      let modifiedRequest = request;

      for (const interceptor of interceptors) {
        modifiedRequest = await interceptor.onRequest(modifiedRequest);
      }

      return modifiedRequest;
    }

    // Make the actual request
    const request = new Request(url, options);

    const modifiedRequest = await executeInterceptors(request);

    const response = await fetch(modifiedRequest);

    return response;
  } catch (error) {
    if (isObject(onUseInterceptor) && onUseInterceptor.onError) {
      onUseInterceptor.onError(error);
    }
    throw error;
  }
}

export function plainFetch(url: string, options?: RequestInit) {
  return fetch(url, options);
}

export function supportedCachingStrategy(
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD"
): boolean {
  return cachingStrategies().includes(cache);
}

export function cachingStrategies(): string[] {
  return ["NO-CACHE", "PER-SESSION", "RELOAD"];
}

export function uuidV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isObject(value: any) {
  if (!value) return false;

  return value && Object.prototype.toString.call(value) === "[object Object]";
}

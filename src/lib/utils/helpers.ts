import { FetchInterceptor, IReqData } from "../types/req";

interface IBodyOptions {
  urlLike: boolean;
  jsonLike: boolean;
}

export function prettifyRequestBody(
  body: IReqData,
  opts: Partial<IBodyOptions> = {}
) {
  if (typeof body !== "object") {
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
        typeof body[key] === "object" ? JSON.stringify(body[key]) : body[key]
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
    if (typeof onUseInterceptor === "object") {
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
    if (typeof onUseInterceptor === "object") {
      onUseInterceptor.onError(error);
    }
    throw error;
  }
}

export function plainFetch(url: string, options?: RequestInit) {
  return fetch(url, options);
}

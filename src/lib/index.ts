import {
  FetchInterceptor,
  IFetchGlobalConfig,
  IRequestConfig,
} from "./types/req";

import { prettifyRequestBody, interceptFetch } from "./utils/helpers";
import { validRequestConfig } from "./utils/validation";

export class Catch {
  private config: IFetchGlobalConfig;

  constructor(config: IFetchGlobalConfig) {
    this.config = config || {};
  }

  // plain and quick request
  public async call(req: IRequestConfig): Promise<any> {
    try {
      let { fullPath, ep, method = "GET", options = {} } = req;
      // throw error if there is an invalid request config
      validRequestConfig(req);

      let opts = {
        ...(this.config.defaultOptions || {}),
        ...(options || {}),
      };

      // handle request body
      if (method !== "GET" && opts.body && typeof opts.body === "object") {
        opts.body = prettifyRequestBody(opts.body);
      } else if (
        method === "GET" &&
        opts.body &&
        typeof opts.body === "object"
      ) {
        const body = prettifyRequestBody(opts.body, { urlLike: true });
        delete opts.body;

        ep += body;
      }

      // handle request url
      const fullUrl = !!this.config.url
        ? `${this.config.url}${ep?.[0] === "/" ? ep.slice(1) : ep}`
        : (ep as string);

      // Define interceptor functions
      const requestInterceptor: FetchInterceptor = {
        onRequest: function (): any {
          const request = new Request(
            fullPath || fullUrl,
            // @ts-ignore
            {
              method,
              ...opts,
            }
          );

          // Modify the request before it is sent
          return opts?.onReq?.(request);
        },
        onError: function (error: any) {
          // Handle any errors that occur during the request
          console.error("Error occurred during request:", error);

          return opts?.onErr?.(error);
        },
      };

      // Execute the request

      const response = await interceptFetch(
        requestInterceptor,
        fullPath || fullUrl,
        // @ts-ignore
        {
          method,
          ...opts,
        }
      );

      const data = await response?.json?.();
      return data || response;
    } catch (error) {
      console.error(error);

      //@ts-ignore
      return this.config.defaultOptions?.onErr?.(error);
    }
  }
}

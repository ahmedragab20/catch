import {
  FetchInterceptor,
  IFetchGlobalConfig,
  IRequestConfig,
  IRequestOptions2,
} from "./types/req";

import { IStringObject } from "./types/index";

import {
  prettifyRequestBody,
  interceptFetch,
  plainFetch,
} from "./utils/helpers";
import { validRequestConfig } from "./utils/validation";

export class Catch {
  private readonly config: Partial<IFetchGlobalConfig>;
  private cahes: IStringObject[] = []; // TODO: implement cache

  constructor(config: Partial<IFetchGlobalConfig>) {
    if (typeof config === "string" || !config || typeof config !== "object") {
      throw new Error(
        "Please provide valid config object, check the docs for more info"
      );
    }

    this.config = config;
  }

  private readonly _getRequestBody = (
    method: string,
    ep: string,
    opts: any
  ) => {
    // handle request body
    if (method !== "GET" && opts.body && typeof opts.body === "object") {
      opts.body = prettifyRequestBody(opts.body);
    } else if (method === "GET" && opts.body && typeof opts.body === "object") {
      const body = prettifyRequestBody(opts.body, { urlLike: true });
      delete opts.body;

      ep += body;
    }

    return { ep, opts };
  };

  // TODO: test the post request
  public async call(
    req: IRequestConfig | string,
    reqOptions2: IRequestOptions2 = {}
  ): Promise<any> {
    try {
      if (
        typeof req !== "string" &&
        typeof reqOptions2 === "object" &&
        Object.keys(reqOptions2).length
      ) {
        throw new Error("Not allowed method, check the docs for more details");
      }

      const that = this;
      let url: string = "";
      const hasDirectURL = typeof req === "string";

      if (hasDirectURL) {
        url = req;
      }

      let ep = hasDirectURL ? null : req?.ep;
      let method = hasDirectURL ? "GET" : req?.method || "GET";
      let options = hasDirectURL ? reqOptions2 || {} : req?.options || {};
      let fullPath = hasDirectURL ? null : req?.fullPath;

      // throw error if there is an invalid request config
      validRequestConfig(req);
      let opts: any = {};
      if (options && !!Object.keys(options).length) {
        Object.keys(options).forEach((key) => {
          if (this.config.defaultOptions?.[key] && options?.[key]) {
            opts[key] = {
              ...this.config.defaultOptions?.[key],
              ...options[key],
            };

            return;
          }

          opts[key] = options?.[key];
        });
      }

      // handle request body
      if (method && ep && !fullPath) {
        // EP (endpoint) structure
        ep = this._getRequestBody(method, ep, opts).ep;
        opts = this._getRequestBody(method, ep, opts).opts;
      } else if (fullPath && opts?.body) {
        // options fullPath structure
        if (fullPath.includes("?")) {
          throw new Error("You're URL already is quired");
        }

        fullPath = this._getRequestBody(method, fullPath, opts).ep;
        opts = this._getRequestBody(method, fullPath, opts).opts;
      } else if (url && reqOptions2?.body) {
        // Direct URL structure
        if (url.includes("?")) {
          throw new Error("You're URL already is quired");
        }

        url = `${url}${prettifyRequestBody(opts.body, { urlLike: true })}`;
        delete opts?.body; // once this way only allowed for the GET request
      }

      // handle request url
      const customizedUrl =
        !!this.config.baseURL && ep
          ? `${this.config.baseURL}${ep?.[0] === "/" ? ep.slice(1) : ep}`
          : (ep as string);

      // Define interceptor functions
      const requestInterceptor: FetchInterceptor = {
        onRequest: function (newReq: Request): any {
          return that.config?.onReq?.(newReq);
        },
        onError: function (error: any) {
          return that.config?.onErr?.(error);
        },
      };

      // Execute the request
      const hasRequestInterceptor = !!this.config.onReq;

      url = url || fullPath || customizedUrl;

      console.log(opts);

      const response = !!hasRequestInterceptor
        ? await interceptFetch(requestInterceptor, url, {
            method,
            ...opts,
          })
        : await plainFetch(url, {
            method,
            ...opts,
          });
      // Modify the response object
      const modifiedResponse = !!this.config?.onRes
        ? ((await this.config?.onRes?.(response)) as Response)
        : response;
      const data = await modifiedResponse?.json?.();
      return data;
    } catch (error) {
      console.error(error);

      //@ts-ignore
      return this.config?.onErr?.(error);
    }
  }
}

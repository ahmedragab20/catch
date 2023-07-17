import { IFetchGlobalConfig, IRequestConfig } from "./types/req";
import { prettifyRequestBody } from "./utils/helpers";
import { validRequestConfig } from "./utils/validation";

export class Catch {
  private config: IFetchGlobalConfig;

  constructor(config: IFetchGlobalConfig) {
    this.config = config || {};
  }

  public async call(req: IRequestConfig): Promise<any> {
    try {
      let { fullPath, ep, method = "GET", options = {} } = req;
      // throw error if there is an unvalid request config
      validRequestConfig(req);

      let opts = {
        ...this.config.defaultOptions,
        ...options,
      };

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

      const fullUrl =
        fullPath || !!this.config.url
          ? `${this.config.url}${ep?.[0] === "/" ? ep.slice(1) : ep}`
          : (ep as string);

      const response = await fetch(fullUrl, {
        method,
        ...opts,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

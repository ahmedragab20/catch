import {
  IFetchGlobalConfig,
  IRequestConfig,
  IRequestOptions2,
} from "../types/req";

export const isRegularFunction = (fn: any) => {
  return fn && {}.toString.call(fn) === "[object Function]";
};

export const validRequestConfig = (
  req: Partial<IRequestConfig> | string,
  options2?: IRequestOptions2
) => {
  if (typeof req === "string") {
    return
  };

  const { ep, method = "GET", options = {}, fullPath } = req;

  if (!ep && !fullPath && typeof req !== "string") {
    throw new Error(
      "You gotta provide an object of options or a Direct URL string"
    );
  } else if (
    (ep && typeof ep !== "string") ||
    (fullPath && typeof fullPath !== "string")
  ) {
    throw new Error("ep must be a string");
  } else if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    throw new Error("method must be one of GET, POST, PUT, DELETE, PATCH");
  } else if (options && typeof options !== "object") {
    throw new Error("options must be an object");
  }
};

export const validGlobalConfig = (config: IFetchGlobalConfig) => {
  const { baseURL, defaultOptions = {}, alias } = config;

  if (!baseURL || typeof baseURL !== "string") {
    throw new Error("baseURL is required");
  } else if (typeof defaultOptions !== "object") {
    throw new Error("defaultOptions must be an object");
  } else if (typeof alias !== "string") {
    throw new Error("alias must be a string");
  } else if (window[alias]) {
    throw new Error(
      `The alias ${alias} is already used by another variable in the global scope`
    );
  } else if (config.onErr && typeof config.onErr !== "function") {
    throw new Error("onErr must be a function");
  } else if (config.onReq && typeof config.onReq !== "function") {
    throw new Error("onReq must be a function");
  } else if (config.onRes && typeof config.onRes !== "function") {
    throw new Error("onRes must be a function");
  }
};

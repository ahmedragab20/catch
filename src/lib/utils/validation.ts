import { IFetchGlobalConfig, IRequestConfig } from "../types/req";

export const isRegularFunction = (fn: any) => {
  return fn && fn?.hasOwnProperty("prototype");
};

export const validRequestConfig = (req: IRequestConfig) => {
  const { ep, method = "GET", options = {}, fullPath } = req;

  if (!ep && !fullPath) {
    throw new Error("ep is required");
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
  const { url, defaultOptions = {}, alias } = config;

  if (!url || typeof url !== "string") {
    throw new Error("url is required");
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
  } else if (
    !isRegularFunction(config.onReq) ||
    !isRegularFunction(config.onRes) ||
    !isRegularFunction(config.onErr)
  ) {
    console.warn(
      "you should use regular functions instead of arrow functions for onReq, onRes, and onErr"
    );
  }
};

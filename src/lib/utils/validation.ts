import { IFetchGlobalConfig, IRequestConfig } from "../types/req";

export const validRequestConfig = (req: IRequestConfig) => {
  const { ep, method = "GET", options = {} } = req;

  if (!ep && !req.fullPath) {
    throw new Error("ep is required");
  } else if (typeof ep !== "string") {
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
  }
};

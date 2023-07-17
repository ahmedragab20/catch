import { IRequestConfig } from "../types/req";

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

export const validGlobalConfig = (config: any) => {
  const { url, defaultOptions = {} } = config;

  if (!url) {
    throw new Error("Please provide a url");
  } else if (typeof url !== "string") {
    throw new Error("Url must be a string");
  } else if (typeof defaultOptions !== "object") {
    throw new Error("Default options must be an object");
  }
};

import { IReqData } from "../types/req";

interface IBodyOptions {
  urlLike?: boolean;
}

export function prettifyRequestBody(body: IReqData, opts?: IBodyOptions) {
  if (typeof body !== "object") {
    throw new Error("body must be an object");
  }

  let data: any = new URLSearchParams();
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

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

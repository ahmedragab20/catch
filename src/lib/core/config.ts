import { Catch } from "../index";
import { IFetchGlobalConfig } from "../types/req";
import { validGlobalConfig } from "../utils/validation";

export default (req: IFetchGlobalConfig) => {
  const { url, defaultOptions = {} } = req;

  // throw error if there is an unvalid global config
  validGlobalConfig({
    url,
    defaultOptions,
  });

  const fetch = new Catch({
    url,
    defaultOptions,
  });

  fetch.call = fetch.call.bind(fetch);

  return fetch.call;
};

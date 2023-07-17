import { Catch } from "../index";
import { IFetchGlobalConfig } from "../types/req";
import { validGlobalConfig } from "../utils/validation";
import { AppWindowState } from "../state/window";
export default (req: IFetchGlobalConfig) => {
  const { url, defaultOptions = {}, alias = "$catch" } = req;

  // throw error if there is an unvalid global config
  validGlobalConfig(req);

  let { call } = new Catch({
    url,
    defaultOptions,
  });

  call = call.bind(fetch);

  // set the fetch instance to the window object
  new AppWindowState(alias, call).set();

  console.log(
    `%c🤝🏻 ${alias} Is Ready 🤝🏻`,
    "color: #6050DC; font-weight: bold; font-size: 0.8rem;"
  );

  return call;
};

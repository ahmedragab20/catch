import { createRoot } from "react-dom/client";
import initCatcher from "./lib/core/config";
import "./index.css";

var fetch = initCatcher({
  // this recommended if you use the library in a .js file for better developer experience
  baseURL: "https://dummyjson.com/",
  alias: "$fetch",
  defaultOptions: {
    headers: {
      Accept: "Ahmed is the best developer",
    },
  },
  onReq: reqInterceptor,
  onRes: resInterceptor,
  onErr: onError,
});

async function deletePassenger(id) {
  try {
    const response = await fetch({
      method: "DELETE",
      fullPath: "https://dummyjson.com/carts/1",
      options: {
        headers: { "Content-Type": "application/json" },
        body: {
          merge: true, // this will include existing products in the cart
          products: [
            {
              id: 1,
              quantity: 1,
            },
          ],
        },
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function reqInterceptor(req) {
  console.log({ interceptorRequest: req });

  req.headers.set("Cache-Control", "Ahmed is the best developer EVEEEER");

  return req;
}

function resInterceptor(res) {
  console.log({ interceptorResponse: res });

  return res;
}

function onError(error) {
  return error;
}

const callEP1 = async () => {
  try {
    const response = await fetch({
      ep: "carts",
      cache: "no-cache",
      clearCache: true,
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const callEP2 = async () => {
  try {
    const response = await fetch("carts", {
      customOptions: {
        cache: "PER-SESSION",
        useWithBaseURL: true
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const callEP3 = async () => {
  try {
    const response = await fetch({
      ep: "carts",
      cache: "RELOAD",
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

createRoot(document.getElementById("app")).render(
  <div className="p-5">
    <div>
      <h1 className="font-mono text-2xl">Catcher</h1>
    </div>

    <div className="mt-10 gap-2 flex">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => callEP1()}
      >
        Call EP1
      </button>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => callEP2()}
      >
        Call EP2
      </button>

      <button
        className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => callEP3()}
      >
        Call EP3
      </button>
    </div>
  </div>
);

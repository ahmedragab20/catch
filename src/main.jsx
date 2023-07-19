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
      fullPath: `https://api.instantwebtools.net/v1/passenger/${id}`,
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function reqInterceptor(req) {
  console.log("I got fired🎉", { req });

  req.headers.set("Cache-Control", "Ahmed is the best developer EVEEEER");

  return req;
}

function resInterceptor(res) {
  console.log("outside res", res);
  console.log(res);

  return res;
}

function onError(error) {
  console.warn(`Error: ${error.message}`);
  console.error(error);

  return error;
}

const getProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      body: {
        Accept: "Ahmed is the best developer From GET",
      },
      headers: {
        Accept: "CHECKIIIIING...",
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const getProductsWithFullPath = async () => {
  try {
    const res = await fetch({
      fullPath: "https://dummyjson.com/products",
      cache: "PER-SESSION",
      options: {
        headers: { "Content-Type": "application/json" },
      },
    });

    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const postProductsWithFullPath = async () => {
  const res = fetch({
    method: "POST",
    fullPath: "https://dummyjson.com/products/add",
    cache: "NO-CACHE",
    options: {
      headers: { "Content-Type": "application/json-SSDS" },
      body: {
        title: "BMW Pencil",
      },
    },
  });

  console.log(res);
};

const postProductsWithEP = async () => {
  try {
    const res = await fetch({
      method: "POST",
      ep: "/products/add",
      options: {
        headers: { "Content-Type": "application/json-ooop" },
        body: {
          title: "BMW Pencil",
        },
      },
    });

    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

createRoot(document.getElementById("app")).render(
  <div className="p-5">
    <div>
      <h1 className="font-mono text-2xl">Catcher</h1>
    </div>

    <div className="mt-10">
      <h2 className="text-xl">Example</h2>
      <div className="mt-5">
        <div>
          <p className="mb-2">DELETE:</p>
          <pre>
            <code className="bg-red-200 px-2 py-0.5 rounded-md">
              https://api.instantwebtools.net/v1/passenger/:id
            </code>
          </pre>
          <div className="mt-2">
            <button
              onClick={() => deletePassenger(1)}
              className="bg-red-500 text-white px-4 shadow-xl active:shadow-none active:scale-95 duration-150 py-1 rounded-md"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <p className="mb-2">GET Directly:</p>
          <pre>
            <code className="bg-green-200 px-2 py-0.5 rounded-md">
              https://dummyjson.com/products
            </code>
          </pre>
        </div>
        <div className="mt-2">
          <button
            onClick={() => getProducts()}
            className="bg-green-500 text-white px-4 shadow-xl active:shadow-none active:scale-95 duration-150 py-1 rounded-md"
          >
            GET
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <p className="mb-2">GET WITH FULLPATH:</p>
          <pre>
            <code className="bg-green-200 px-2 py-0.5 rounded-md">
              https://dummyjson.com/products
            </code>
          </pre>
        </div>
        <div className="mt-2">
          <button
            onClick={() => getProductsWithFullPath()}
            className="bg-green-500 text-white px-4 shadow-xl active:shadow-none active:scale-95 duration-150 py-1 rounded-md"
          >
            GET
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <p className="mb-2">POST WITH EP:</p>
          <pre>
            <code className="bg-green-200 px-2 py-0.5 rounded-md">
              https://dummyjson.com/products/add
            </code>
          </pre>
        </div>
        <div className="mt-2">
          <button
            onClick={() => postProductsWithEP()}
            className="bg-amber-500 text-white px-4 shadow-xl active:shadow-none active:scale-95 duration-150 py-1 rounded-md"
          >
            POST (EP)
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <p className="mb-2">POST WITH FULLPATH:</p>
          <pre>
            <code className="bg-green-200 px-2 py-0.5 rounded-md">
              https://dummyjson.com/products/add
            </code>
          </pre>
        </div>
        <div className="mt-2">
          <button
            onClick={() => postProductsWithFullPath()}
            className="bg-amber-500 text-white px-4 shadow-xl active:shadow-none active:scale-95 duration-150 py-1 rounded-md"
          >
            POST (FULLPATH)
          </button>
        </div>
      </div>
    </div>
  </div>
);

import { createRoot } from "react-dom/client";
import initCatcher from "./lib/core/config";
import "./index.css";

const fetch = initCatcher({
  // this recommended if you use the library in a .js file for better developer experience
  url: "https://dummyjson.com/",
  alias: "$fetch",
});

const deletePassenger = async (id) => {
  try {
    const response = await fetch({
      method: "DELETE",
      fullPath: `https://api.instantwebtools.net/v1/passenger/${id}`,
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async () => {
  try {
    const response = await fetch({
      method: "GET",
      ep: "products",
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

createRoot(document.getElementById("app")).render(
  <div className="p-5">
    <div>
      <h1 className="font-mono text-2xl">React Catcher</h1>
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
          <p className="mb-2">GET:</p>
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
    </div>
  </div>
);

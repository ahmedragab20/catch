import { createRoot } from "react-dom/client";
import initCatcher from "./lib/core/config";
import "./index.css";

initCatcher({
  url: "https://dummyjson.com/",
  defaultOptions: {},
  alias: "$fetch",
});
//https://api.instantwebtools.net/v1/passenger/:id

const deletePassenger = async (id) => {
  try {
    const response = await $fetch({
      fullPath
    })
  } catch (error) {
    console.error(error);
  }  
}
createRoot(document.getElementById("app")).render(
  <div className="p-5">
    <div>
      <h1 className=" text-2xl">React Catcher</h1>
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
            <button className="bg-red-500 text-white px-4 shadow-xl active:shadow-none active:scale-95 duration-150 py-1 rounded-md">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

import initCatcher from "./lib/core/config";

initCatcher({
  url: "https://dummyjson.com/",
  defaultOptions: {},
});

// one you initialize the catcher, you can use it like this: $catch({ ep: "/api" })

(function App() {
  document.createElement("div").setAttribute("id", "app");

  const app = document.getElementById("app")!;

  app.innerHTML = `
    <h1>Catcher</h1>
    <p>Catcher is a simple fetch wrapper that makes your life easier.</p>

    <button id="btn">Fetch</button>
  `;

  const btn = document.getElementById("btn")!;

  btn.addEventListener("click", async () => {
    console.log(window.$catch);
  });
})();

import initCatcher from "./lib/core/config";

const fetch = initCatcher({
  url: "https://dummyjson.com/",
  defaultOptions: {},
});

const data = await fetch({
  ep: "/products",
  method: "GET",
  options: {
    body: {
      name: "Ragab",
    },
  },
}).then(async (res) => {
  await fetch({
    ep: "/products",
    method: "GET",
  });
});

const data2 = await fetch({
  ep: "/products",
  method: "GET",
  options: {
    body: {
      name: "Ragab",
    },
  },
}).then((res) => console.log(res));

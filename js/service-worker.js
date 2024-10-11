importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) =>
    (request.destination === "style" && request.url.includes("/styles/")) ||
    (request.destination === "script" && request.url.includes("/js/")) ||
    (request.destination === "image" && request.url.includes("/images/")),
  new workbox.strategies.CacheFirst()
);

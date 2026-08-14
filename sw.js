const CACHE_VERSION = "origo-static-v52";
const APP_SHELL = [
  "/styles.css?v=47", "/home.css?v=83", "/shell.css?v=17",
  "/appearance.css?v=59", "/origo-identity.css?v=20", "/no-effects.css?v=2",
  "/catalog-providers.js?v=6", "/app.min.js?v=178", "/deferred-modules.js?v=7",
  "/assets/origo-logo.svg", "/assets/product-image-placeholder.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== location.origin || url.pathname.startsWith("/api/") || request.mode === "navigate") return;
  const versioned = url.searchParams.has("v") && /\.(?:css|js|mjs)$/.test(url.pathname);
  const image = request.destination === "image";
  if (!versioned && !image) return;
  event.respondWith(caches.match(request).then((cached) => {
    if (versioned && cached) return cached;
    const network = fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE_VERSION).then((cache) => cache.put(request, response.clone()));
      return response;
    });
    return image && cached ? (event.waitUntil(network), cached) : network.catch(() => cached);
  }));
});

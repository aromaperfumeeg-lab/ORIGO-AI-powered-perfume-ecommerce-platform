const CACHE_VERSION = "origo-static-v124";
const APP_SHELL = [
  "/chunks/styles.min.css?v=4", "/chunks/home.min.css?v=6", "/chunks/shell.min.css?v=4",
  "/chunks/home-gender-slider.min.css?v=4", "/chunks/origo-identity.min.css?v=4",
  "/chunks/no-effects.min.css?v=5", "/chunks/appearance.min.css?v=19",
  "/runtime-loader.js?v=15", "/chunks/storefront-core.min.js?v=26",
  "/home-brand-navigation.js?v=6",
  "/appearance.css?v=86", "/origo-identity.css?v=20", "/no-effects.css?v=2",
  "/catalog-providers.js?v=6", "/app.min.js?v=202", "/deferred-modules.js?v=9",
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

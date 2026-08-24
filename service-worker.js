const CACHE='origo-v9';
const CORE=['/','/index.html','/chunks/styles.min.css?v=1','/chunks/home.min.css?v=1','/chunks/shell.min.css?v=1','/chunks/home-gender-slider.min.css?v=1','/chunks/origo-identity.min.css?v=1','/chunks/no-effects.min.css?v=1','/chunks/appearance.min.css?v=1','/runtime-loader.js?v=1','/chunks/storefront-core.min.js?v=1','/offline.html','/assets/origo-mark.svg','/assets/icons/admin-sprite.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(
    fetch(event.request)
      .then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        return response;
      })
      .catch(()=>caches.match(event.request).then(hit=>hit||(event.request.mode==='navigate'?caches.match('/offline.html'):Response.error())))
  );
});

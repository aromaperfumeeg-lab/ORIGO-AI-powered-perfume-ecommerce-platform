const CACHE='origo-v24';
const CORE=['/','/index.html','/chunks/styles.min.css?v=4','/chunks/home.min.css?v=4','/chunks/shell.min.css?v=4','/chunks/home-gender-slider.min.css?v=4','/chunks/origo-identity.min.css?v=4','/chunks/no-effects.min.css?v=5','/chunks/appearance.min.css?v=6','/runtime-loader.js?v=8','/chunks/storefront-core.min.js?v=13','/offline.html','/assets/origo-mark.svg','/assets/icons/admin-sprite.svg'];
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

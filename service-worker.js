const CACHE='origo-v8';
const CORE=['/','/index.html','/styles.css','/smart-finder.css','/alternative-finder.css','/app.js','/media-overrides.js','/offline.html','/system.css','/admin.html','/admin.css','/admin-icons.css','/admin-ai.css','/admin-media.css','/admin.js','/admin-extensions.js','/assets/origo-mark.svg','/assets/icons/admin-sprite.svg','/assets/alternatives/silver-crest-v1.webp','/assets/alternatives/noir-intense-v1.webp','/assets/alternatives/origo-majestic-oud-v1.webp','/assets/products/khamrah-studio-v2.webp','/assets/products/asad-studio-v2.webp','/assets/products/club-studio-v2.webp','/assets/products/caprice-studio-v2.webp','/assets/products/naque-studio-v2.webp','/assets/products/fakhar-studio-v2.webp'];
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

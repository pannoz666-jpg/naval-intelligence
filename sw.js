const CACHE='naval-intelligence-7.7.0';
const FILES=['./','./index.html','./style-v7.7.css','./academy-illustrations-v7.3.js','./style-v7.css','./privacy.html','./app-v7.7.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('naval-intelligence-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){
 e.respondWith(fetch(e.request,{cache:'no-cache'}).catch(async()=>{const c=await caches.open(CACHE);return await c.match('./index.html')||Response.error()}));return;
 }
 e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match(e.request);if(cached)return cached;const res=await fetch(e.request);if(res.ok&&new URL(e.request.url).pathname.endsWith('/academy-illustrations-v7.3.js'))await c.put(e.request,res.clone());return res}));
});

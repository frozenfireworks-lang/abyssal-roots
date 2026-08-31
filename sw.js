const CACHE='abyssal-roots-v4-42-max128';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);try{await cache.addAll(CORE)}catch(_){}await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith((async()=>{try{const fresh=await fetch(event.request);const cache=await caches.open(CACHE);if(fresh&&fresh.ok)cache.put(event.request,fresh.clone());return fresh}catch(_){return (await caches.match(event.request))||(await caches.match('./index.html'))}})())});

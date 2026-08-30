const CACHE='abyssal-roots-v4-36-1-single-file-art';
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png","./assets/hero-sheet-v435.png","./assets/enemy-sheet-v435.png","./assets/chest.png","./assets/altar.png","./assets/root_gate.png","./assets/stairs_arch.png","./assets/beacon_platform.png","./assets/pit.png","./assets/lava.png","./assets/crystal_cluster.png","./assets/wall_arch.png","./assets/lantern_pillar.png"];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const request=event.request;
 event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{
  if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}
  return response;
 }).catch(()=>caches.match(request).then(cached=>cached||caches.match('./index.html'))));
});

self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open('rs-1').then(async c=>{
    const hit=await c.match(r);
    const net=fetch(r).then(x=>{c.put(r,x.clone());return x}).catch(()=>hit);
    return hit||net;
  }));
});

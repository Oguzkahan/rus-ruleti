var C='rus-ruleti-v2';
var A=['./','./index.html','./manifest.webmanifest','./icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(function(r){
    var copy=r.clone();caches.open(C).then(function(c){c.put(e.request,copy)});return r;
  }).catch(function(){return caches.match(e.request,{ignoreSearch:true})}));
});

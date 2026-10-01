// Trainingsplan – Offline-Speicher. Bei jedem Update die Versionsnummer erhöhen.
const CACHE = 'trainingsplan-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Online: neueste Version holen (max. 2,5 s warten). Offline: gespeicherte Version.
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match('./index.html');
      const net = fetch(req).then((res) => { if (res && res.ok) cache.put('./index.html', res.clone()); return res; });
      if (!cached) return net;
      net.catch(() => {});
      const late = new Promise((r) => setTimeout(() => r(cached), 2500));
      try { return await Promise.race([net, late]); } catch (err) { return cached; }
    })());
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});

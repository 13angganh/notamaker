// NotaMaker SW v7.2 — network-first, auto-update
const CACHE = 'notamaker-v7.2';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  // Activate immediately — don't wait for old tabs
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('firebase') ||
      e.request.url.includes('googleapis') ||
      e.request.url.includes('anthropic.com') ||
      e.request.url.includes('cdnjs.cloudflare.com') ||
      e.request.url.includes('fonts.googleapis.com') ||
      e.request.url.includes('gstatic.com')) return;

  // Network-first: always fresh from server, cache as fallback
  e.respondWith(
    fetch(e.request, {cache: 'no-cache'})
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

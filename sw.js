/* ═══════════════════════════════════════════════════════════════════
   🔧 SERVICE WORKER · Matemáticas Interactivas
   Autor: Msc. Néstor Fabio Montoya Palacios
   Versión: 1.0.0
   ═══════════════════════════════════════════════════════════════════
   Estrategia: Network-first con fallback a caché para el shell.
   Mantiene los recursos esenciales disponibles offline.
   ═══════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'matematicas-v1.4.0';

// Archivos del "shell" que se cachean al instalar
const SHELL_FILES = [
  '/Matematicas/',
  '/Matematicas/index.html',
  '/Matematicas/manifest.json',
  '/Matematicas/icon.svg',
  '/Matematicas/js/config.js',
  '/Matematicas/js/app.js',
  '/Matematicas/js/smart-search.js'
];

// ── INSTALL: cachea el shell ─────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(SHELL_FILES).catch(err => {
        console.warn('[SW] No se pudieron cachear algunos archivos:', err);
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: limpia cachés viejas ───────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: Network-first, fallback a caché ───────────────────────
self.addEventListener('fetch', event => {
  // Solo intercepta solicitudes GET del mismo origen
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.origin.includes('iemauxicartago.edu.co')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Actualiza la caché con la respuesta fresca
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   🔔 FÍSICA INTERACTIVA - Service Worker para Notificaciones
   ═══════════════════════════════════════════════════════════════════════════════
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   📅 Marzo 2026
   ═══════════════════════════════════════════════════════════════════════════════ */

const SW_VERSION = '1.0.0';
const CACHE_NAME = 'fisica-v' + SW_VERSION;

// Instalación
self.addEventListener('install', (event) => {
    console.log('🔔 SW: Instalado v' + SW_VERSION);
    self.skipWaiting();
});

// Activación
self.addEventListener('activate', (event) => {
    console.log('🔔 SW: Activado');
    event.waitUntil(clients.claim());
});

// Push notification recibida
self.addEventListener('push', (event) => {
    let data = { title: '📚 Física Interactiva', body: '¡Hay nuevo contenido disponible!', icon: 'icon.svg' };
    if (event.data) {
        try { data = { ...data, ...event.data.json() }; } catch (e) { data.body = event.data.text(); }
    }
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon || 'icon.svg',
            badge: 'icon.svg',
            vibrate: [100, 50, 100],
            data: { url: data.url || 'https://iemauxicartago.edu.co/Fisica/' },
            actions: [
                { action: 'open', title: '🚀 Abrir' },
                { action: 'dismiss', title: 'Cerrar' }
            ]
        })
    );
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.action === 'dismiss') return;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('Fisica') && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(event.notification.data.url || '/Fisica/');
        })
    );
});

console.log('🔔 Service Worker de Física Interactiva cargado');

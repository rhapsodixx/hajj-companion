/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
import { version } from '$service-worker';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

declare let self: ServiceWorkerGlobalScope;

const CACHE_NAME = `patuna-hajj-${version}`;

// self.__WB_MANIFEST is injected by vite-plugin-pwa at build time
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Runtime cache for bundled PDFs in /static/pdfs/ — CacheFirst (immutable for this trip)
registerRoute(
	({ url }) => url.pathname.startsWith('/pdfs/') && url.pathname.endsWith('.pdf'),
	new CacheFirst({
		cacheName: `${CACHE_NAME}-pdfs`,
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
			new ExpirationPlugin({
				maxEntries: 10,
				maxAgeSeconds: 60 * 60 * 24 * 60 // 60 days — covers full Hajj + buffer
			})
		]
	})
);

// Runtime cache for Supabase daily_overrides — StaleWhileRevalidate
// Falls back to cached response instantly if offline
registerRoute(
	({ url }) => url.hostname.includes('supabase.co') && url.pathname.includes('daily_overrides'),
	new StaleWhileRevalidate({
		cacheName: `${CACHE_NAME}-overrides`,
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
			new ExpirationPlugin({
				maxEntries: 5,
				maxAgeSeconds: 60 * 60 * 24 // 24h
			})
		]
	})
);

// Activate immediately — don't wait for old SW to die
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

// Listen for update skip message from InstallPrompt component
self.addEventListener('message', (event) => {
	if (event.data?.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

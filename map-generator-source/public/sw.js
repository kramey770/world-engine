importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js",
);

const { Route, registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

const CACHE_VERSION = "2026-09-22-world-engine-ui-2";
const CACHE_PREFIX = "fmg-";
const cacheName = (name) => `${name}-${CACHE_VERSION}`;

// Activate a new service worker immediately and take control of open pages, instead
// of waiting for every tab to close. Without this, a deploy can leave clients on the
// old worker (and its cached assets) indefinitely.
self.skipWaiting();
workbox.core.clientsClaim();
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter(
							(name) =>
								name.startsWith(CACHE_PREFIX) &&
								!name.endsWith(`-${CACHE_VERSION}`),
						)
						.map((name) => caches.delete(name)),
				),
			),
	);
});

const DAY = 24 * 60 * 60; // in seconds

registerRoute(
	({ request }) => request.mode === "navigate",
	new NetworkFirst({
		networkTimeoutSeconds: 15,
		cacheName: cacheName("fmg-html"),
		plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
	}),
);

// Content-hashed build output (e.g. index-CYYjXhrB.js, 3.BkPmegIK.chunk.js) is
// immutable — the hash changes when the content changes — so cache it forever.
registerRoute(
	({ request, url }) =>
		request.destination === "script" &&
		/(-[A-Za-z0-9_-]{8,}\.js|\.chunk\.js)$/.test(url.pathname),
	new CacheFirst({
			cacheName: cacheName("fmg-immutable"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 90 * DAY }),
		],
	}),
);

// Non-hashed app scripts (main.js, public/modules/**.js) share a stable URL across
// deploys, so StaleWhileRevalidate would serve a stale copy alongside a fresh hashed
// bundle — the exact mismatch that broke the UI. NetworkFirst keeps them in sync with
// the deploy; cache is only a fallback when offline / the network is slow.
registerRoute(
	({ request, url }) =>
		request.destination === "script" &&
		!url.pathname.endsWith("min.js") &&
		!url.pathname.includes("google"),
	new NetworkFirst({
		networkTimeoutSeconds: 10,
		cacheName: cacheName("fmg-scripts"),
		plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
	}),
);

registerRoute(
	({ request }) => request.destination === "style",
	new CacheFirst({
		cacheName: cacheName("fmg-stylesheets"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * DAY }),
		],
	}),
);

registerRoute(
	({ request, url }) =>
		request.destination === "script" && url.pathname.endsWith("min.js"),
	new CacheFirst({
			cacheName: cacheName("fmg-libs"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * DAY }),
		],
	}),
);

registerRoute(
	/.json$/,
	new CacheFirst({
		cacheName: cacheName("fmg-json"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * DAY }),
		],
	}),
);

registerRoute(
	({ request }) => request.destination === "image",
	new CacheFirst({
			cacheName: cacheName("fmg-images"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * DAY }),
		],
	}),
);

registerRoute(
	/.svg$/,
	new CacheFirst({
		cacheName: cacheName("fmg-charges"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * DAY }),
		],
	}),
);

registerRoute(
	({ request }) => request.destination === "font",
	new CacheFirst({
		cacheName: cacheName("fmg-fonts"),
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * DAY }),
		],
	}),
);

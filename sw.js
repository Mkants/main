const CACHE_NAME = "date2024-07-31v1";
const urlsToCache = [
	"/index.html",
	"/script.js",
	"/main-style.css",
	"/jquery.min.js",
	"/404.html",
];

self.addEventListener("install", (event) => {
	// empty
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			/*// キャッシュがあればそのレスポンスを返す
			if (cachedResponse) {
				return cachedResponse;
			}*/

			// ネットワークリクエストを行い、レスポンスを取得
			return fetch(event.request).then((response) => {
				// 有効なレスポンスか確認（オプション）
				/*if (!response || response.status !== 200 || response.type !== "basic") {
					return response;
				}

				// レスポンスをクローンしてキャッシュに保存
				let responseToCache = response.clone();

				caches.open(CACHE_NAME).then((cache) => {
					if (event.request !== "chrome-extension") {
						cache.put(event.request, responseToCache);
					}
				});*/

				return response;
			});
		})
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((cacheName) => {
						// CACHE_NAMEに指定されていないキャッシュを削除
						return cacheName !== CACHE_NAME;
					})
					.map((cacheName) => {
						// 古いキャッシュを削除
						return caches.delete(cacheName);
					})
			);
		})
	);
});

const staticApp = "my-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticApp).then(cache => {
      cache.addAll(assets)
    })
  )
})

fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
    )
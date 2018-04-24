//NEW
//This is the "Offline copy of pages" wervice worker
//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function (event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
      fetch(indexPage).then(function (response) {
          caches.open('pwabuilder-offline').then(function (cache) {
              console.log('[PWA Builder] Cached index page during Install' + response.url);
              return cache.addAll(['/mercado/', '/mercado/index.html', '/mercado/busca.html',
                  '/mercado/carrinho.html', '/mercado/conta.html',
                  '/mercado/conta1.html', '/mercado/contato.html',
                  '/mercado/img/bolsa.jpg', '/mercado/img/calcamasc.jpg',
                  '/mercado/img/camisetamasc.jpg', '/mercado/img/mangueira.jpg',
                  '/mercado/img/muda.jpg', '/mercado/img/vestido.jpg',
                  '/mercado/img/video.jpg', '/mercado/css/busca.css',
                  '/mercado/css/carrinho.css', '/mercado/css/conta.css',
                  '/mercado/css/contato.css', '/mercado/css/ofertas.css',
                  '/mercado/img/i3.png', '/mercado/img/i4.png',
                  '/mercado/img/i5.png', '/mercado/img/icone.png',
                  '/mercado/img/logo1.png', '/mercado/img/maq1.png',
                  '/mercado/img/maq2.png', '/mercado/img/maq3.png',
                  '/mercado/img/maq4.png', '/mercado/img/masc1.png',
                  '/mercado/img/masc2.png', '/mercado/img/masc3.png',
                  '/mercado/img/masc4.png', '/mercado/img/portal-blue-semi.png',
                  '/mercado/img/portal-blue.png', '/mercado/img/portal-green-semi.png',
                  '/mercado/img/portal-green.png', '/mercado/img/portal-orange-semi.png',
                  '/mercado/img/portal-orange.png', '/mercado/img/portal-red-semi.png',
                  '/mercado/img/portal-red.png', '/mercado/img/portal-yellow-semi.png',
                  '/mercado/img/portal-yellow.png', '/mercado/img/slua.png',
                  '/mercado/img/zenite.png', '/mercado/js/script.js',
                  '/mercado/css/style.css'
              ]);
          });
      })
  );
});


//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
var updateCache = function(request){
  return caches.open('pwabuilder-offline').then(function (cache) {
    return fetch(request).then(function (response) {
      console.log('[PWA Builder] add page to offline'+response.url)
      return cache.put(request, response);
    });
  });
};

event.waitUntil(updateCache(event.request));

event.respondWith(
  fetch(event.request).catch(function(error) {
    console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );

    //Check to see if you have it in the cache
    //Return response
    //If not in the cache, then return error page
    return caches.open('pwabuilder-offline').then(function (cache) {
      return cache.match(event.request).then(function (matching) {
        var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
        return report
      });
    });
  })
);
})
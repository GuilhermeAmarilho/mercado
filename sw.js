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
                  '/mercado/img/caderno.png', '/mercado/img/chocolate.png',
                  '/mercado/img/fone.png', '/mercado/img/pizza.png',
                  '/mercado/img/sacola.png',
                  '/mercado/img/muda.jpg', '/mercado/img/vestido.jpg',
                  '/mercado/img/video.jpg', '/mercado/css/busca.css',
                  '/mercado/css/carrinho.css', '/mercado/css/conta.css',
                  '/mercado/css/contato.css', '/mercado/css/ofertas.css',
                  '/mercado/css/bootstrap-theme.css.map', '/mercado/css/bootstrap-theme.css',
                  '/mercado/css/bootstrap-theme.min.css', '/mercado/css/bootstrap-theme.min.css.map',
                  '/mercado/css/bootstrap.css', '/mercado/css/bootstrap.css.map',
                  '/mercado/css/bootstrap.min.css', '/mercado/css/bootstrap.min.css.map',
                  '/mercado/js/bootstrap.js', '/mercado/js/bootstrap.min.js', '/mercado/js/npm.js'
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
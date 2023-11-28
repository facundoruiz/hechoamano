if ('function' === typeof importScripts) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
      );
    if (workbox) {



            self.addEventListener('install', (event) => {
            event.waitUntil(
                caches.open('htc-lite_v1').then((cache) => {
                    return cache.addAll(
                        [
                            './',
                            './offline.html',
                         
                        ]
                    );
                })
            );
        });

       

       
        // Se cachea todo del scope

        console.log(`Yay! Workbox is loaded 🎉`);

        //workbox.routing.registerRoute(new RegExp('/.*'), new workbox.strategies.NetworkFirst());

        // cahce JS bunlde
        workbox.routing.registerRoute(
            new RegExp('/js/.*\\.js'),
            //    /\.js$/,
            //new workbox.strategies.CacheFirst({
            new workbox.strategies.StaleWhileRevalidate({
                // Use a custom cache name.
                cacheName: 'js-cache',
                plugins: [
                    new workbox.expiration.ExpirationPlugin({

                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );
        /*
            workbox.routing.registerRoute(
              // cahce html
              /\.(?:html)$/,
              new workbox.strategies.CacheFirst({
                // Use a custom cache name.
                cacheName: 'html-cache',
                 plugins: [
                  new workbox.expiration.ExpirationPlugin({
                    // Cache for 10 hours.
                    maxAgeSeconds: 1 * 10 * 60 * 60,
                  }),
                ], 
              })
            );
        */

        /**
         * cahce de archivos maestro JSON
         * Cache json locales.
         */
        workbox.routing.registerRoute(
            /\.json$/,
            // Use cache but update in the background.
            //new workbox.strategies.StaleWhileRevalidate({
            new workbox.strategies.NetworkFirst({
                // Use a custom cache name.
                cacheName: 'json-cache',
            }),
        );

        // cache img
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            new workbox.strategies.CacheFirst({
                cacheName: 'img-cache',
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

        // Cache CSS files.
        workbox.routing.registerRoute(
            // new RegExp('/css/.*\\.css'),
            new RegExp('/.*\\.css'),
            // Use cache but update in the background.
            new workbox.strategies.StaleWhileRevalidate({
                // Use a custom cache name.
                cacheName: 'css-cache',
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
                        // Cache for 10 hours.
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            }),
        );




        /**
         * Cache de PAge
         * Cache URL files.
         
         workbox.routing.registerRoute(
            //new RegExp('/remitos/(.*)'),
            new RegExp('/(?:responsables|stock|asistencia)'),
            
            // Use cache but update in the background.
            new workbox.strategies.NetworkFirst({
                //new workbox.strategies.StaleWhileRevalidate({
                    // Use a custom cache name.
                    cacheName: 'page-cache',
                    plugins: [
                        new workbox.expiration.ExpirationPlugin({
                            // Cache for 10 hours.
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                        }),
                    ],
                }),
                );
                
                */
     

        //  //cache 
        //  workbox.routing.registerRoute(
        //     new RegExp('https://unpkg.com/dexie@latest/dist/dexie.js'),
        //     new workbox.strategies.CacheFirst({
        //         cacheName: 'js-cache',
        //         plugins: [
        //             new workbox.expiration.ExpirationPlugin({
        //                 maxEntries: 30,
        //             }),
        //             new workbox.cacheableResponse.CacheableResponsePlugin({
        //                 statuses: [0, 200]
        //             })
        //         ],
        //     }),
        //   );



        // // Cache the Google fonts.
        // workbox.routing.registerRoute(
        //   new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        //   new workbox.strategies.CacheFirst({
        //       cacheName: 'google-fonts',
        //       plugins: [
        //           new workbox.expiration.ExpirationPlugin({
        //               maxEntries: 30,
        //           }),
        //           new workbox.cacheableResponse.CacheableResponsePlugin({
        //               statuses: [0, 200]
        //           })
        //       ],
        //   }),
        // );

        // // Cache the fontawesome fonts.
        // workbox.routing.registerRoute(
        //   /^https:\/\/netdna\.bootstrapcdn\.com\/font-awesome\/4\.7\.0\//,
        //   new workbox.strategies.CacheFirst({
        //       cacheName: 'fontawesome-fonts-stylesheets',
        //       plugins: [
        //           new workbox.expiration.ExpirationPlugin({
        //               maxEntries: 30,
        //           }),
        //           new workbox.cacheableResponse.CacheableResponsePlugin({
        //               statuses: [0, 200]
        //           })
        //       ]
        //   }),
        // );




        // // CAptutar url especifica no fount
        // workbox.routing.registerRoute(
        // // Check to see if the request is a navigation to a new page...
        // new RegExp('/stock'),
        // // Use a Network First caching strategy...
        // new workbox.strategies.NetworkFirst({
        //    // Put all cached files in a cache named 'pages'...
        //    cacheName: 'pages',
        //    plugins: [
        //       // Ensure that only requests that result in a 200 status are cached...
        //       new workbox.expiration.CacheableResponsePlugin({
        //          statuses: [200]
        //       }),
        //       new workbox.expiration.ExpirationPlugin({
        //          maxEntries: 20,
        //          maxAgeSeconds: 1 * 24 * 60 * 60 // 1 Day
        //       }),
        //    ],
        //  })
        // );

        /**Tiempos de cahado 
         *  1 * 10 * 60 * 60 // 10hs
         *  1 * 24 * 60 * 60 // 1 Day
         *  30 * 24 * 60 * 60, // 30 Days
         */
        /* workbox.core.skipWaiting();
         workbox.core.clientsClaim();*/


       




        self.addEventListener('fetch', function(event) {
            var request = event.request;
            if (request.mode === 'navigate') {
                event.respondWith(
                    fetch(request)
                    .catch(function() {
                        return caches.match('offline.html');
                    })
                );
            }
        });



    } else {
        console.log('Boo! Workbox Falló el registro 😬');
    }


}

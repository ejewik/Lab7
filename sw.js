// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

var CACHE_NAME = 'my-site-cache';
var urlsToCache = [ 
    './index.html',
    './components/entry-page.js',
    './components/journal-entry.js',
    './scripts/router.js',
    './scripts/script.js',
    './style.css',
    './settings.svg',
    'https://cse110lab6.herokuapp.com/entries',
];

// installation 

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// fetch

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then(
            function(response) {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }
          );
        })
      );
  });

  // activate 

  self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
  });
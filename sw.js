/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404/index.html","65726824395df0de7e8b789a43b83777"],["/about/index.html","412c41454d0d08c7b2a8ea4b58dcb74a"],["/assets/css/main.css","913155c53cf9a3ab0de787dd4375e80c"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/blog.jpg","98b97152e222381c3da4e29af84e6eb0"],["/assets/img/posts/blog_lg.jpg","40dae46875d4c8bc85a6dec45ff1bddd"],["/assets/img/posts/blog_md.jpg","6b6c5fd413ff56be430931d32a975a9b"],["/assets/img/posts/blog_placehold.jpg","75c606a991e979788d06ca90393b2154"],["/assets/img/posts/blog_sm.jpg","340b608b2edfd340f979c3951fc6e358"],["/assets/img/posts/blog_thumb.jpg","bb5f98b227ab7dc0bee8b2b0bcd5b1b7"],["/assets/img/posts/blog_thumb@2x.jpg","2513c54c7a8963bc416688ec14d28dd7"],["/assets/img/posts/blog_xs.jpg","df6ade3eb9dc27b4a13ed93822dad3f6"],["/assets/img/posts/c.jpg","1031283ec2ce8cfe256ce9019ac59435"],["/assets/img/posts/c_lg.jpg","78fbdc4b47dbaeac1ad30b6ec3755453"],["/assets/img/posts/c_md.jpg","86e130789cb502682bb1079874260eb4"],["/assets/img/posts/c_placehold.jpg","70c61fbd65be02eca78e3ad5c49bd74a"],["/assets/img/posts/c_sm.jpg","bd7e13a11f1f15ecbd4d732fc05c0b86"],["/assets/img/posts/c_thumb.jpg","873c11a19ed7a8621f02f8de62a4f859"],["/assets/img/posts/c_thumb@2x.jpg","3fb177286c162091289585efc4306cf9"],["/assets/img/posts/c_xs.jpg","38e14525846395f22215b59141621bdb"],["/assets/img/posts/coding.jpg","311e99e6ab43c25769de0dc5d42f2979"],["/assets/img/posts/coding_lg.jpg","d79f116732ead9ff5be197df36947252"],["/assets/img/posts/coding_md.jpg","579102dfa074db3dad0d55af8ab58099"],["/assets/img/posts/coding_placehold.jpg","4e97ddc12427ef4e4afe9c7eb0a65329"],["/assets/img/posts/coding_sm.jpg","fca39a2b51fe3dcdcc47ed030fbd596f"],["/assets/img/posts/coding_thumb.jpg","2779f55a90be5c2349729f924aff0bfc"],["/assets/img/posts/coding_thumb@2x.jpg","420cbbe43dc03e111ccb9ccc6f2416a1"],["/assets/img/posts/coding_xs.jpg","8c2666f79d4d478ae79d3b72363f9afc"],["/assets/img/posts/git.jpg","0867584cabd8affc2faec59b5551361e"],["/assets/img/posts/git_lg.jpg","f1fa4683f92432da67b60e7969b5788d"],["/assets/img/posts/git_md.jpg","0ed34a1b16fa46126378d611eb004b6e"],["/assets/img/posts/git_placehold.jpg","c1b89ae23e2d8916fcb84c0b98ddbdfa"],["/assets/img/posts/git_sm.jpg","e3c13ea1e7319364341f79b17f5d6f3f"],["/assets/img/posts/git_thumb.jpg","f0b4ff177b0ea29876ac49cc827452f1"],["/assets/img/posts/git_thumb@2x.jpg","1c891854abc2c0b63872d5b9cfd0b466"],["/assets/img/posts/git_xs.jpg","92beab6a7d91b1cf46ecc26a87a0ce4c"],["/assets/img/posts/markdown.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/markdown_lg.jpg","e782f6bdfdc54f4fd2375d6f24070075"],["/assets/img/posts/markdown_md.jpg","6e570af9331448cd8d42d86ecf4bb26f"],["/assets/img/posts/markdown_placehold.jpg","15bab20661cd3621ca882b7c8130394b"],["/assets/img/posts/markdown_sm.jpg","42fa37551fee88d621b43ec2e1a075f8"],["/assets/img/posts/markdown_thumb.jpg","44754f60b7159f2e8c9470f98ff8b8d7"],["/assets/img/posts/markdown_thumb@2x.jpg","05b299c8b9e8d1b38b5ba7ce7e905f05"],["/assets/img/posts/markdown_xs.jpg","ea9f92b55da23c5349d55f2bd86c7601"],["/assets/img/posts/python.jpg","e510fd1093950864e2a4c188113fb1b5"],["/assets/img/posts/python_lg.jpg","90588ba8cc503989a63c077aec4beba8"],["/assets/img/posts/python_md.jpg","52f689a7b7ca1bd2a6d026547d349e75"],["/assets/img/posts/python_placehold.jpg","aaa5b4fac415e1e8499454407d120dac"],["/assets/img/posts/python_sm.jpg","925f1821f19fd07458c22610c03282d0"],["/assets/img/posts/python_thumb.jpg","95008c7ee6853f60677120a224ddb877"],["/assets/img/posts/python_thumb@2x.jpg","4e2eb6d8e53bb01e962d4b6058f890ba"],["/assets/img/posts/python_xs.jpg","4ad7c4d05c4598ccee9443cd610aead9"],["/assets/img/posts/title_lg.jpg","9575db486c03413daab88d8bd4a41419"],["/assets/img/posts/title_md.jpg","c7479cf588e93676d38299364b2525a6"],["/assets/img/posts/title_placehold.jpg","513b44a50735d23c2c1c9fd12ef63a56"],["/assets/img/posts/title_sm.jpg","3b54dd0b5548dd77b19c153a29ddd22f"],["/assets/img/posts/title_thumb.jpg","e03320189c31c31b4f22ea025d9f2975"],["/assets/img/posts/title_thumb@2x.jpg","649a8924362fb58586d983a071510b10"],["/assets/img/posts/title_xs.jpg","37c1e21067fd2254d0fbb76090ef6806"],["/assets/img/posts/typing.jpg","f9614e5f1662bdce52884a8613f0216e"],["/assets/img/posts/typing_lg.jpg","f54e56eb1b09ed6c77b8c20fd3a94954"],["/assets/img/posts/typing_md.jpg","a39af07b6e7daa8d26b7fe8b81274d13"],["/assets/img/posts/typing_placehold.jpg","5c485f1618beaa11dcadabb04c8649be"],["/assets/img/posts/typing_sm.jpg","90ba4350e1da70ebf093c795c872fdce"],["/assets/img/posts/typing_thumb.jpg","0bcf5b11ea8a64d330d9993114aaef3f"],["/assets/img/posts/typing_thumb@2x.jpg","4666b584f00768ea1cd842a029a36197"],["/assets/img/posts/typing_xs.jpg","84624699dd38213909537ddb2b46760d"],["/assets/img/posts/words.jpg","ccfb615834a84ca588c9054f76c34398"],["/assets/img/posts/words_lg.jpg","0017a83e3d2e047e75ea487ef360d83f"],["/assets/img/posts/words_md.jpg","98e531e6a40ebe24a906007c3b5e5898"],["/assets/img/posts/words_placehold.jpg","f771da71dcafc66e64f01fbc09923aa6"],["/assets/img/posts/words_sm.jpg","142cfd595f5c8a29afa515318362f32b"],["/assets/img/posts/words_thumb.jpg","2926ca24f6876d2027a02e29b5979379"],["/assets/img/posts/words_thumb@2x.jpg","54d28c477e56c393a38536da844585ed"],["/assets/img/posts/words_xs.jpg","e01494599f2e785bdcedcb8c7b0c4888"],["/assets/js/bundle.js","1fef10796953f7999a99ccbb8434dd90"],["/blog-start/index.html","e30e72e907ff9011fafc45579cd0e9d0"],["/c-set-program/index.html","7e4535441b7298c3f5a57d12eb8cea55"],["/char-and-string/index.html","103561a16efa76a1bb3e499da5c13764"],["/coding-holic/index.html","8f9bb892bba9754dd1b1a1ecbee1e77b"],["/git-how-to/index.html","134e3df8e658a196a5b28a5cf5da4959"],["/got-new-mac/index.html","b1d05342a83baf6b856879bb52e4ee44"],["/index.html","a7395c4faea616eee12fae67c1364890"],["/input-functions-in-c/index.html","185fa16c34f04966a1d943d04e682e8f"],["/markdown-cheatsheet/index.html","fc1eea5755cf24ccca7bc6adcd95f633"],["/python-code-style/index.html","3a20a0278ced5a0bf5ef96b3c8a41e1f"],["/sw.js","92ad31513699f725c033dac2fee65014"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});








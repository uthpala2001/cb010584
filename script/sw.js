//creating a constant for static cache
const statCache='statv4';
//creating a constant for dynamic cache
const dynaCache='dynav1';

//storing shell/static assets in an array
const assets=['/','/home page.html','/main.js','/logo.png','/fallback.html','./Wages/activity1.html','/Wages/activity page.html','/Wages/beaches page.html',
'/Wages/form1.html','/Wages/form2.html','/Wages/heritage locations.html','/Wages/home1.html','/Wages/hotel contact page.html','/Wages/purchase1.html','/Wages/cart.html',
'/purchase1.json','/Wages/style/purchase1.css','/Wages/purches & donations.html','/Wages/script/form2.js','/Wages/script/form1.js','/Wages/types of wild life attractions.html',
'/Wages/style/activity page.css','/Wages/style/activity1.css','/Wages/style/beaches page.css','/Wages/style/form1.css','/Wages/style/form2.css','/Wages/style/heritage locations.css',
'/Wages/style/heritage2.css','/Wages/style/home page.css','/Wages/style/home1.css','/Wages/style/hotel contact page.css','/Wages/style/purches & donations.css','/Wages/style/types of wild life attractions.css',
'/Wages/heritage2.html','/Wages/script/activity page.js','/Wages/script/activity1.js','/Wages/script/home page.js','/Wages/script/home1.js','/Wages/script/purchase & donations.js','/Wages/script/purchase1.js',
'/Wages/android-chrome-192x192.png','/Wages/android-chrome-200x200.png','/Wages/apple-touch-icon.png','/Wages/avoni.jpg','/Wages/balloon1.jpg','/Wages/balloon3.webp','/Wages/balloonwall.jpg','/Wagesbeaches.jpg',
'/Wages/browserconfig.xml','/Wages/buddhism.jpg','/Wages/cave1.jpg','/Wages/cave2.JPG','/Wages/cave3.jpg','/Wages/christianity.jpg','/Wages/Colombo.jpg','/Wages/culture.jpeg','/Wages/dambulla1.jpg','/Wages/dambulla2.JPG',
'/Wages/dambulla3.jpg','/Wages/ella.jpg','/Wages/epic.jpg','/Wages/favicon-16x16.png','/Wages/favicon-32x32.png','/Wages/favicon.ico','/Wages/fire.JPG','/Wages/flower2.jpg','/Wages/flower3.jpg','/Wages/flower4.jpg',
'/Wages/flowewr1.jpg','/Wages/hair2.webp','/Wages/heritage.jpg','/Wages/hiking1.jpg','/Wages/hikkaduwa1.jpg','/Wages/hikkaduwa2.jpg','/Wages/hinduism.jpg','/manifest.json'];

//the install event
self.addEventListener('install',(evt)=>{
    //console.log("Service worker installed.");
    //install event should wait until whatever inside evt.waitUntil() finishes.
    evt.waitUntil(
        //open static cache
        caches.open(statCache)
    .then((cache)=>{
        console.log("Caching assets...");
        //adding all assets in assets array into cache
        cache.addAll(assets);
    })
    );
    
});

//The activate event
self.addEventListener('activate',(evt)=>{
    //console.log("Service worker is active!");
    evt.waitUntil(
        //accessing all versions of caches available currently
        caches.keys()
        .then((keys)=>{
            //console.log(keys);
            //going through the list pf caches, checking whether the cache name is equal to current cache version/s:static and dynamic and getting rid of any old cache versions
            return Promise.all(
                keys.filter(key=>key!==statCache && key!==dynaCache)
                .map(key=>caches.delete(key))
            );

        })
    );
});

//The fetch event handler
self.addEventListener('fetch',(evt)=>{
    //console.log("Fetch event",evt);
    //interrupt the normal request and respond with a custom response
    evt.respondWith(
        //check if the resource exists in cache
        caches.match(evt.request)
        .then((cacheRes)=>{
            //return from cache if it is there in cache. or else fetch from server
            return cacheRes || fetch(evt.request)
            //when fetching from server, add the request and response to dynamic cache to access the resource/s when offline
            .then(fetchRes=>{
                return caches.open(dynaCache)
                .then(cache=>{
                    cache.put(evt.request.url,fetchRes.clone());
                    return fetchRes;
                });
            });
            //returning the fallback page if the resource is not available in any of the caches
        }).catch(()=>{
            //check whether the request url contains .html in it
            if(evt.request.url.indexOf('.html')>-1){
                return caches.match('/fallback.html')
            }
            })
    );
})
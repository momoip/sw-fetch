// const loc = new URL(location);
const params = (new URL(location)).searchParams;

const isOn = params.get('enable') === '1';
console.log('isOn', isOn)
const blur = params.get('blur') || 0;
const q = params.get('q') || 'auto';
const f = params.get('f') || 'auto';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js');
  });
}

self.addEventListener('fetch', (e) => {
  console.log('fetch event triggered')
  // if (isOn) {
    if (e.request.url.indexOf('.jpg') >= 0) {
      const url = `https://res.cloudinary.com/picturecloud7/image/fetch/f_${f}/q_${q}/e_blur:${blur}/${e.request.url}`
      e.respondWith(
        fetch(url)
      )
    }
  // }
});
var ynsInjection =
  '(' +
  function () {
    const tag = '[YT-Nonstop]';
    const isYoutubeMusic = window.location.hostname === 'music.youtube.com';

    function log(message) {
      console.log(`${tag}[${getMilliseconds()}] ${message}`);
    }

    function getMilliseconds() {
      return +new Date();
    }

    setInterval(() => window._lact = Date.now(), 900000);
      log('Active Time Reset');
  } +
  ')();';
console.log(`[YT-Nonstop ${chrome.runtime.getManifest().version}]`);

var script = document.createElement('script');
script.textContent = ynsInjection;
(document.head || document.documentElement).appendChild(script);
script.remove();

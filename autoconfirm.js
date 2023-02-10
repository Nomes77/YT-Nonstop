var ytnonstopInjection =
  '(' +
  function () {
    // Declare constants
    const YTMusic = window.location.hostname === 'music.youtube.com';
    const appName = YTMusic ? 'ytmusic-app' : 'ytd-app';
    const popupEventNodename = YTMusic ? 'YTMUSIC-YOU-THERE-RENDERER' : 'YT-CONFIRM-DIALOG-RENDERER';
    const popupContainer = YTMusic ? 'ytmusic-popup-container' : 'ytd-popup-container';
    const videoElement = document.querySelector('video');
    const playButtonPause = YTMusic ? '#play-pause-button[title="Pause"]' : '.ytp-play-button[data-title-no-tooltip="Pause"]';
    const playButtonPlay = YTMusic ? '#play-pause-button[title="Play"]' : '.ytp-play-button[data-title-no-tooltip="Play"]';

    // General functions
    function asDoubleDigit(value) {
      return value < 10 ? '0' + value : value;
    }
    function getTimestamp() {
      let dt = new Date();
      let time = asDoubleDigit(dt.getHours()) + ':' + asDoubleDigit(dt.getMinutes()) + ':' + asDoubleDigit(dt.getSeconds());
      return time;
    }
    function log(message) {
      console.log(`[YT-Nonstop | ${getTimestamp()}] ${message}`);
    }

    // 1. Method: Set last time active all 10 minutes to now | Does probably not help
    setInterval(() => {
      window._lact = Date.now();
      log('Reset last time active');
    },
    600000);

    // 2. Method: Looks for popup
    function listenForPopupEvent() {
      document.addEventListener('yt-popup-opened', (e) => {
        if (e.detail.nodeName === popupEventNodename) {
          document.querySelector(popupContainer).handleClosePopupAction_();
          videoElement.play();
          log('Popup hidden and video played again');
        }
      });
    }
    listenForPopupEvent();

    // 3. Method: Pause and UnPause after 30 minutes
    setInterval(() => {
      if (window.location.href.indexOf("/watch") == -1 ) return;
      if (playButtonPause) {
        document.querySelector(playButtonPause).click();
        document.querySelector(playButtonPlay).click();
        log('Paused and unpaused video');
      }
    },
    1800000);
  } +
  ')();';

var script = document.createElement('script');
script.textContent = ytnonstopInjection;
(document.head || document.documentElement).appendChild(script);
script.remove();

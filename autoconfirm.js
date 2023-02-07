var ytnonstopInjection =
  '(' +
  function () {
    // 1. Method: Set last time active all 10 minutes to now | Does probably not help
    setInterval(() => window._lact = Date.now(), 600000);

    // 2. Method: Looks for popup and override pause button
    const YTMusic = window.location.hostname === 'music.youtube.com';
    const appName = YTMusic ? 'ytmusic-app' : 'ytd-app';
    const popupEventNodename = YTMusic ? 'YTMUSIC-YOU-THERE-RENDERER' : 'YT-CONFIRM-DIALOG-RENDERER';
    const popupContainer = YTMusic ? 'ytmusic-popup-container' : 'ytd-popup-container';

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let appObserver = null;

    const idleTimeoutMillis = 5000;
    let lastInteractionTime = new Date().getTime();

    function getIdleTime() {
      return new Date().getTime() - lastInteractionTime;
    }
    function isIdle() {
      return getIdleTime() >= idleTimeoutMillis;
    }

    function listenForPopupEvent() {
      document.addEventListener('yt-popup-opened', (e) => {
        if (isIdle() && e.detail.nodeName === popupEventNodename) {
          document.querySelector(popupContainer).handleClosePopupAction_();
          videoElement.play();
        }
      });
    }

    listenForPopupEvent();
  } +
  ')();';

var script = document.createElement('script');
script.textContent = ytnonstopInjection;
(document.head || document.documentElement).appendChild(script);
script.remove();

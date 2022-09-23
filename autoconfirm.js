// 1. Method: Set last time active all 10 minutes to now | Does probably not help
setInterval(() => window._lact = Date.now(), 600000);

// 2. Method: Looks for popup and override pause button
const YTMusic = window.location.hostname === 'music.youtube.com';
const appName = YTMusic ? 'ytmusic-app' : 'ytd-app';
const popupEventNodename = YTMusic ? 'YTMUSIC-YOU-THERE-RENDERER' : 'YT-CONFIRM-DIALOG-RENDERER';
const popupContainer = YTMusic ? 'ytmusic-popup-container' : 'ytd-popup-container';

const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let appObserver = null;

let pauseRequested = false;
let pauseRequestedTimeout;
const TimeoutMillis = 5000;
let lastInteractionTime = new Date().getTime();

let videoElement = null;

function isIdle() {
  return getIdleTime() >= TimeoutMillis;
}
function getIdleTime() {
  return new Date().getTime() - lastInteractionTime;
}

function observeApp() {
  appObserver = new MutationObserver((mutations, observer) => {
    overrideVideoPause();
  });
  appObserver.observe(document.querySelector(appName), {
    childList: true,
    subtree: true
  });
}

function listenForPopupEvent() {
  document.addEventListener('yt-popup-opened', (e) => {
    if (isIdle() && e.detail.nodeName === popupEventNodename) {
      document.querySelector(popupContainer).handleClosePopupAction_();
      pauseVideo();
      videoElement.play();
    }
  });
}

function overrideVideoPause() {
  if (videoElement?.ytnonstop_pause !== undefined) return;
  if (document.querySelector('video') === null) return;
  videoElement = document.querySelector('video');
  listenForMediaKeys();
  videoElement.ytnonstop_pause = videoElement.pause;
  videoElement.pause = () => {
    if (!isIdle()) {
      pauseVideo();
      return;
    }
    pauseRequested = true;
    setPauseRequestedTimeout();
  };
}

function setPauseRequestedTimeout(justClear = false) {
  clearTimeout(pauseRequestedTimeout);
  if (justClear) return;
  pauseRequestedTimeout = setTimeout(() => {
    pauseRequested = false;
  }, TimeoutMillis);
}

function pauseVideo() {
  videoElement?.ytnonstop_pause();
  pauseRequested = false;
  setPauseRequestedTimeout(true);
}

function processInteraction(action) {
  if (pauseRequested) {
    pauseVideo();
    return;
  }
  lastInteractionTime = new Date().getTime();
}

function listenForMouse() {
  const eventName = window.PointerEvent ? 'pointer' : 'mouse';
  document.addEventListener(eventName + 'down', (e) => {
    processInteraction(eventName + 'down');
  });
  document.addEventListener(eventName + 'up', (e) => {
    processInteraction(eventName + 'up');
  });
}

function listenForKeyboard() {
  document.addEventListener('keydown', (e) => {
    processInteraction('keydown');
  });
  document.addEventListener('keyup', (e) => {
    processInteraction('keyup');
  });
}

function listenForMediaKeys() {
  if (navigator.mediaSession === undefined) {
    return;
  }
  navigator.mediaSession.setActionHandler('pause', () => {
    pauseVideo();
  });
  navigator.mediaSession.ytnonstop_setActionHandler = navigator.mediaSession.setActionHandler;
  navigator.mediaSession.setActionHandler = (action, fn) => {
    if (action === 'pause') {
      return;
    }
    navigator.mediaSession.ytnonstop_setActionHandler(action, fn);
  };
}

listenForMouse();
listenForKeyboard();

listenForPopupEvent();
observeApp();
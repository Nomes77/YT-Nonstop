// Variables
let target = ["YT-CONFIRM-DIALOG-RENDERER"];

// custom quick functions
function close(b){
  b.click();
}

// 1. Method: Set last time active all 10 minutes to now | Does probably not help
setInterval(() => window._lact = Date.now(), 600000);

// 2. Method: Look for popup which gets dynamicially created
const settings = { childList: true, subtree: true };
const documentTarget = document.documentElement;
const callback = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.target.nodeName === target[0]) {
      let a = document.getElementsByTagName("yt-confirm-dialog-renderer")[0];
      let b = a.getElementsByClassName("style-scope yt-confirm-dialog-renderer style-blue-text size-default")[0];
      close(b);
    }
  }
}
const observer = new MutationObserver(callback);
observer.observe(documentTarget, settings);

// 3. Method: If popup is already open close it
if (document.getElementsByTagName("yt-confirm-dialog-renderer")[0].getElementsByTagName("yt-button-renderer")[1]) close(document.getElementsByTagName("yt-confirm-dialog-renderer")[0].getElementsByTagName("yt-button-renderer")[1]);

// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
var autoconfirm = document.createElement('script');
autoconfirm.src = chrome.runtime.getURL('autoconfirm.js');
autoconfirm.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(autoconfirm);

var autoskip = document.createElement('script');
autoskip.src = chrome.runtime.getURL('autoskip.js');
autoskip.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(autoskip);

window.onload = (event) => {
    chrome.runtime.onMessage.addListener( (data) => {
        postMessage(data, '*');
    });
    chrome.storage.sync.get(null, function(data) {
        data = {
            autoSkip: data.autoSkip === undefined || data.autoSkip === null ? true : JSON.parse(data.autoSkip),
        }
        postMessage(data, '*');
        // injectScript(YTNonstop, 'html');
    });
};
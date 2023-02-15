// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
var autoconfirm_skip = document.createElement('script');
autoconfirm_skip.src = chrome.runtime.getURL('autoconfirm&skip.js');
autoconfirm_skip.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(autoconfirm_skip);

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
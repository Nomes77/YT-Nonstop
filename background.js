"use strict";

function Reload() {
  chrome.tabs.query({
    url:[
      "https://www.youtube.com/*",
      "https://music.youtube.com/*",
      "https://m.youtube.com/*"
    ]
  },
  t => {
    for(let o of t){
      chrome.tabs.reload(o.id)
    }
  })
}

function ShowPopup() {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '^https:\/\/(www|music|m)\.youtube\.com' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowAction()]
      }
    ]);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  Reload();
  ShowPopup();
});
chrome.runtime.onStartup.addListener(() => {
  ShowPopup();
});

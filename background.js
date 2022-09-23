"use strict";

chrome.runtime.onStartup.addListener(() => {
  ShowPopup();
});
chrome.runtime.onInstalled.addListener(() => {
  Reload();
  ShowPopup();
});

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
};

function Reload() {
  chrome.tabs.query({
    url: [
      "https://www.youtube.com/*",
      "https://music.youtube.com/*",
      "https://m.youtube.com/*"
    ]
  }, (tabs) => {
    for(let tab of tabs) {
      chrome.tabs.reload(tab.id)
    }
  });
};

"use strict";

chrome.runtime.onInstalled.addListener(() => {
  Reload();
});

function Reload() {
  chrome.tabs.query({
    url: [
      "https://www.youtube.com/*",
      "https://music.youtube.com/*"
    ]
  }, (tabs) => {
    for(let tab of tabs) {
      chrome.tabs.reload(tab.id)
    }
  });
};

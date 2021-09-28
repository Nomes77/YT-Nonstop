"use strict";
chrome.runtime.onInstalled.addListener((function(){
  chrome.tabs.query({
    url:[
      "https://www.youtube.com/*",
      "https://music.youtube.com/*",
      "https://m.youtube.com/*"
    ]
  },
  t => {
    for(let o of t){
      console.log(o);
      chrome.tabs.reload(o.id)
    }
  })
}));
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.youtube.com' }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'music.youtube.com' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
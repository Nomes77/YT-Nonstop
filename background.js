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
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    let activeWebsites = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.youtube.com' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'music.youtube.com' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'm.youtube.com' }
        })
      ],
      actions: [new chrome.declarativeContent.ShowAction()]
    };
    let rules = [activeWebsites];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

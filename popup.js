window.onload=()=>{
document.getElementById("autotube-skip-toggle").addEventListener(
  "click",(
    function(t){
      setAutoTubeListeners("autoSkip")
    }
  )
);
setSettings([{key:"autoSkip",cb:setAutoSkip}]);
function setSettings(t){
  chrome.storage.sync.get(null,(function(e){
    const o={};
    t.forEach(({key:t,cb:n})=>{
      if(e===undefined||e[t]===undefined||e[t]===null){
        o.key=n(true)
      }
      else if(!e[t]){n(false)}
      else{n(true)}
  });
  Object.keys(o).length>0&&chrome.storage.sync.set(o,(function(){}))
  }))
}
function setAutoTubeListeners(t){
  const e={autoSkip:document.getElementById("autotube-skip-toggle").checked}[t];
    chrome.tabs.query({
      url:[
        "https://www.youtube.com/*",
        "https://music.youtube.com/*",
        "https://m.youtube.com/*"
      ]
    },o=>{
      for(let n of o){
        console.log(n,{[t]:e});
        chrome.tabs.sendMessage(n.id,{[t]:e})
      }
    });
    chrome.storage.sync.set({[t]:e})
}
function setAutoSkip(t){
  return document.getElementById("autotube-skip-toggle").toggleAttribute("checked",t)
}
document.getElementById("version").append(`${chrome.runtime.getManifest().version}`)}
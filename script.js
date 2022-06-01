function loadPageAccess() {
    let pageAccess = document.createElement('script');
    pageAccess.src = chrome.runtime.getURL('autoconfirm.js');
    pageAccess.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(pageAccess);
}

_script = document.createElement('script');
_script.setAttribute('src', chrome.runtime.getURL('autoskip.js'));
(document.head||document.documentElement).appendChild( _script  );
_script.parentNode.removeChild( _script);

window.onload=t=>{
	chrome.runtime.onMessage.addListener(t=>{
		postMessage(t,"*")
	});
	chrome.storage.sync.get(null,(function(t){
		t={
			autoSkip:t.autoSkip===undefined||t.autoSkip===null?true:JSON.parse(t.autoSkip)
		};
		postMessage(t,"*");
		injectScript(YTNonstop,"html")
	}))
};
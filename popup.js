window.onload = () => {
    document.getElementById('autoskip-toggle').addEventListener("click", function(event) {
        //native html input element toggles on click
        setAutoTubeListeners('autoSkip');
    });
    setSettings([
        {key: 'autoSkip', cb: setAutoSkip},
    ]);
}; // end window.onload

// helpers
function setSettings(items){
    chrome.storage.sync.get(null, function(data) {
        const setItems = {};
        items.forEach( ({key, cb}) => {
            if (data === undefined || data[key] === undefined || data[key] === null) {
                setItems.key = cb(true);
            } else if(!data[key]) {
                cb(false);
            } else {
                cb(true);
            }
        });
        // update items if they were undefined or null
        Object.keys(setItems).length > 0 && chrome.storage.sync.set(setItems, function() {});
    });
}

function setAutoTubeListeners(key) {
    const value = {
        autoSkip: document.getElementById('autoskip-toggle').checked,
    }[key];
    chrome.tabs.query({
      url: [
        "https://www.youtube.com/*",
        "https://music.youtube.com/*",
        "https://m.youtube.com/*"
      ]
    },
    (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {[key]: value});
      }
    });
    chrome.storage.sync.set({[key]: value});
}

function setAutoSkip(status) {
    return document.getElementById('autoskip-toggle').toggleAttribute('checked', status);
}

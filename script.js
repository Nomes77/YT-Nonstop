function injectScript(YTNonstop, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var init_inject_script = document.createElement('script');
    var run_inject_script = document.createElement('script');

    init_inject_script.setAttribute('type', 'text/javascript');
    run_inject_script.setAttribute('type', 'text/javascript');

    init_inject_script.append(`YTNonstop = ${YTNonstop}()`);
    node.appendChild(init_inject_script);

    run_inject_script.append("autotube = YTNonstop = new YTNonstop();");
    node.appendChild(run_inject_script);

    init_inject_script.remove();
}

let YTNonstop = (function YTNonstop(options) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const autotube = {
         _autoSkip: null,
         //getters
         getIsAutoSkip: function() { return autotube._autoSkip},
         // setters
         setAutoSkip: function(value) { return autotube._autoSkip = value},
    }
    const player = () => document.getElementById('movie_player');

    // .getPlayerState(): -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = video cued
    // if video ended ---> skip to next video 
    const skip = () => {
        if (player().getPlayerState() === 0 && !YTMusic) {
            const overlay = document.querySelector('.ytp-autonav-endscreen-countdown-overlay[style="display: none;"]');
            const play = document.querySelector('.ytp-autonav-endscreen-upnext-play-button');
            const cancel = document.querySelector('.ytp-autonav-endscreen-upnext-cancel-button');

            if (overlay) {
                log('Return skip; autonav-endscreen is not visible.');
                return;
            } else
            if (autotube.getIsAutoSkip() == true) {
                play.click();
                log('Skipped to next video');
            } else
            if (autotube.getIsAutoSkip() == false) {
                // player().setAutonav(false);
                cancel.click();
                document.querySelector('.ytp-autonav-endscreen-countdown-overlay').remove();
                log('Canceled next video');
            }
        }
    }

    const autonav_button = () => {
        const autonav_on = document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="true"]')
                        || document.querySelector('#automix[role="button"][aria-pressed="true"]');
        const autonav_off = document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="false"]')
                         || document.querySelector('#automix[role="button"][aria-pressed="false"]');

        if (autotube.getIsAutoSkip() == true && autonav_off) {
            autonav_off.click();
            log('Enabled autoplay/autonav');
        } else
        if (autotube.getIsAutoSkip() == false && autonav_on) {
            autonav_on.click();
            log('Disabled autoplay/autonav');
        }
    }

    const autonav_button_style = () => {
        const autonav = document.querySelector('.ytp-button[data-tooltip-target-id="ytp-autonav-toggle-button"]')
                     || document.querySelector('ytmusic-app .autoplay.ytmusic-tab-renderer');

        autonav.setAttribute("style", "height:0px; width:0px; opacity:0");
        log('Hide autoplay/autonav, since the button is overriden');
    }

    function run() {
        const play_button = {
            getButton: window.document.querySelector('.ytp-play-button.ytp-button')
                    || window.document.getElementById('play-pause-button'),
            config: { attributes: true, childList: true, subtree: true },
            callback: (mutationsList, observer) => {
                skip();
            }
        }

        const loadSettings = {
            setSettings: setInterval(() => {
                if (window.location.href.indexOf("/watch") == -1 ) return;

                // set play button observer
                try {
                    const play_button_observer = new MutationObserver(play_button.callback);
                    play_button_observer.observe(play_button.getButton, play_button.config);
                } catch(e) {
                    log('Play button does not exist; reload page');
                    window.location.reload();
                }

                // set autonav button
                autonav_button();
                autonav_button_style();

                clearInterval(loadSettings.setSettings);
            }, 1000),

            setAutonavButton: setInterval(() => {
                if (window.location.href.indexOf("/watch") == -1 ) return;
                autonav_button();
            }, 5000)
        }

        return autotube;
    };

    // exposing functions
    function _getIsAutoSkip() { return autotube.getIsAutoSkip() };
    function YTNonstop () {
        this.isAutoSkip = _getIsAutoSkip;
        run();
    };
    
    const eventHandler = (key, value) => {
        switch(key) {
            case "autoSkip": 
                autotube.setAutoSkip(value);
                break;
        }
    }
    addEventListener('message', function(data) {
        for (key in data.data){
            eventHandler(key, data.data[key]);
        }
    });

    // Return YTNonstop object
    return YTNonstop;
});

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

injectScript(YTNonstop, 'html');

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
    const YTMusic = window.location.hostname === 'music.youtube.com';
    const videoPlayer = document.getElementById('movie_player');

    function getTimestamp() {
        return new Date().toLocaleTimeString();
    }
    function log(message) {
        console.log(`[YT-Nonstop | ${getTimestamp()}] ${message}`);
    }

    // .getPlayerState(): -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = video cued
    // if video paused ---> play video
    const play = () => {
        const popupEventNodename = YTMusic ? document.querySelector('YTMUSIC-YOU-THERE-RENDERER') :
                                             document.querySelector('YT-CONFIRM-DIALOG-RENDERER');
        const popupContainer = YTMusic ? document.getElementsByTagName('ytmusic-popup-container')[0] :
                                         document.getElementsByTagName('ytd-popup-container')[0];

        if (videoPlayer.getPlayerState() === 2 && popupEventNodename) {
            videoPlayer.playVideo();
            popupContainer.remove();
            log('Popup hidden and video played again');
        }
    }

    // if video ended ---> skip to next video
    const skip = () => {
        if (videoPlayer.getPlayerState() === 0 && !YTMusic) {
            const overlay = document.querySelector('.ytp-autonav-endscreen-countdown-overlay[style="display: none;"]');
            const overlay_v = document.getElementsByClassName('ytp-autonav-endscreen-countdown-overlay')[0];
            const next = document.getElementsByClassName('ytp-autonav-endscreen-upnext-play-button')[0];
            const cancel = document.getElementsByClassName('ytp-autonav-endscreen-upnext-cancel-button')[0];
            const autonav_off = document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="false"]');

            if (autotube.getIsAutoSkip() == true && (!overlay || autonav_off)) {
                // videoPlayer.setAutonav(true);
                // videoPlayer.nextVideo();
                overlay_v.remove();
                next.click();
                log('Skipped to next video');
            } else
            if (autotube.getIsAutoSkip() == false && !overlay) {
                // videoPlayer.setAutonav(false);
                overlay_v.remove();
                cancel.click();
                log('Canceled next video');
            }
        }
    }

    const autonav_button = () => {
        const autonav_on = YTMusic ? document.querySelector('#automix[role="button"][aria-pressed="true"]') :
                                     document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="true"]');
        const autonav_off = YTMusic ? document.querySelector('#automix[role="button"][aria-pressed="false"]') :
                                      document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="false"]');

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
        const autonav = YTMusic ? document.getElementsByClassName('autoplay')[1] :
                                  document.querySelector('.ytp-button[data-tooltip-target-id="ytp-autonav-toggle-button"]');

        autonav.setAttribute("style", "height:0px; width:0px; opacity:0");
        log('Hide autoplay/autonav, since the button is overriden');
    }

    function run() {
        const play_button = {
            getButton: window.document.getElementsByClassName('ytp-play-button ytp-button')[0]
                    || window.document.getElementById('play-pause-button'),
            config: { attributes: true, childList: true, subtree: true },
            callback: (mutationsList, observer) => {
                play();
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
            }, 5000),

            // Autoplay Method 1: Set last time active all 20 minutes to now
            // Autoplay Method 2: If video paused and popup visible ---> play video
            // Autoplay Method 3: Pause and UnPause after 20 minutes
            setOtherMethods: setInterval(() => {
                if (window.location.href.indexOf("/watch") == -1 ) return;
                window._lact = Date.now();
                log('Reset last time active');
                play();
                // if (videoPlayer.getPlayerState() === 1) {
                //     videoPlayer.pauseVideo();
                //     videoPlayer.playVideo();
                //     log('Paused and unpaused video');
                // }
            }, 600000)
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

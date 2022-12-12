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
        if (autotube.getIsAutoSkip() == true && player().getPlayerState() === 0) {
            player().setAutonav(true);

            const playList = player().getPlaylist();
            const currentIndex = player().getPlaylistIndex();
            const loop = document.querySelector('#playlist-action-menu ytd-playlist-loop-button-renderer button[aria-label] path[d="M20,14h2v5L5.84,19.02l1.77,1.77l-1.41,1.41L1.99,18l4.21-4.21l1.41,1.41l-1.82,1.82L20,17V14z M4,7l14.21-0.02l-1.82,1.82 l1.41,1.41L22.01,6l-4.21-4.21l-1.41,1.41l1.77,1.77L2,5v6h2V7z"]');
            const shuffle = document.querySelector('#playlist-action-menu ytd-toggle-button-renderer button[aria-label][aria-pressed="true"]');

            if (playList === null || playList === undefined) {
                return player().nextVideo();
            } else
            if (loop || shuffle) {
                return;
            } else {
                playList.length - 1 == currentIndex 
                    ? player().nextVideo() 
                    : player().playVideoAt(currentIndex + 1); 
            }
        } else {
            player().setAutonav(false);
        }
    }

    function run() {
        const play_button = {
            getButton: window.document.querySelector('.ytp-play-button.ytp-button') || window.document.getElementById('play-pause-button'),
            config: { attributes: true, childList: true, subtree: true },
            callback: (mutationsList, observer) => {
                skip();
            }
        }

        const loadSettings = {
            setInterval: setInterval(() => {
                if (window.location.href.indexOf("/watch") == -1 ) return;

                // set play button observer
                const play_button_observer = new MutationObserver(play_button.callback);
                play_button_observer.observe(play_button.getButton, play_button.config);

                // set autonav button
                loadSettings.setButton();

                clearInterval(loadSettings.setInterval);
            }, 1000),

            setButton: function() {
                const autonav_on = document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="true"]')
                    || document.querySelector('#automix[role="button"][aria-pressed="true"]');
                const autonav_off = document.querySelector('.ytp-autonav-toggle-button-container > .ytp-autonav-toggle-button[aria-checked="false"]')
                    || document.querySelector('#automix[role="button"][aria-pressed="false"]');

                if (autotube.getIsAutoSkip() == true && autonav_off) {
                    autonav_off.click();
                } else
                if (autotube.getIsAutoSkip() == false && autonav_on) {
                    autonav_on.click();
                }
            }
        }

        setInterval(() => {
            if (window.location.href.indexOf("/watch") == -1 ) return;
            loadSettings.setButton();
        }, 5000);

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

injectScript(YTNonstop, 'html');

[![Commit rate](https://img.shields.io/github/commit-activity/m/BPower0036/YT-Nonstop?label=Commits&color=succes)](https://github.com/BPower0036/YT-Nonstop/commits/)
[![Last commit](https://img.shields.io/github/last-commit/BPower0036/YT-Nonstop?label=Last%20commit&color=informational)](https://github.com/BPower0036/YT-Nonstop/commits/main)
[![Issues](https://img.shields.io/github/issues/BPower0036/YT-Nonstop?label=Issues&color=red)](https://github.com/BPower0036/YT-Nonstop/issues)
[![Issues](https://img.shields.io/github/issues-closed/BPower0036/YT-Nonstop?color=green&label=Issues)](https://github.com/BPower0036/YT-Nonstop/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub Release Date](https://img.shields.io/github/release-date/BPower0036/YT-Nonstop?label=Latest%20Release&color=white)](https://github.com/BPower0036/YT-Nonstop/releases/)
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg?label=License&color=lightgrey)](https://github.com/BPower0036/YT-Nonstop/blob/main/LICENSE) </br>
[![](https://img.shields.io/badge/dynamic/json?label=Edge&color=important&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fddobgngkifgapahlheghhckckkcgpikf)](https://microsoftedge.microsoft.com/addons/detail/ytnonstop/ddobgngkifgapahlheghhckckkcgpikf)
[![](https://img.shields.io/badge/dynamic/json?label=Rating&color=yellow&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fddobgngkifgapahlheghhckckkcgpikf)](https://microsoftedge.microsoft.com/addons/detail/ytnonstop/ddobgngkifgapahlheghhckckkcgpikf)
[![](https://img.shields.io/badge/dynamic/json?label=Users&color=blueviolet&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fddobgngkifgapahlheghhckckkcgpikf)](https://microsoftedge.microsoft.com/addons/detail/ytnonstop/ddobgngkifgapahlheghhckckkcgpikf)</br>
[![](https://img.shields.io/amo/v/yt-nonstop?label=FireFox&color=important)](https://addons.mozilla.org/en-US/firefox/addon/yt-nonstop/)
[![](https://img.shields.io/amo/rating/yt-nonstop?label=Rating&color=yellow)](https://addons.mozilla.org/en-US/firefox/addon/yt-nonstop/)
[![](https://img.shields.io/amo/users/yt-nonstop?label=Users&color=blueviolet)](https://addons.mozilla.org/en-US/firefox/addon/yt-nonstop/)
***
# YT-Nonstop

Autoclicker for Youtube's latest "feature" - Video paused. Continue watching?</br>
Furthermore it keeps YouTube running and auto-skip to the next video on the list 🔥

<p align="center">
<a href="https://addons.mozilla.org/en-US/firefox/addon/yt-nonstop/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get YT-Nonstop for Firefox"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/youtube-nonstop/ddobgngkifgapahlheghhckckkcgpikf"><img src="https://user-images.githubusercontent.com/585534/107280673-a5ece780-6a26-11eb-9cc7-9fa9f9f81180.png" alt="Get YT-Nonstop for Microsoft Edge"></a>
</p>

***
#### In your Firefox, media keys may be disabled. To enable the functionality:
1. Navigate to `about:config` from your address bar
2. If there is a warning message just confirm that you understand the risks
3. Search for `media.hardwaremediakeys.enabled` and set to TRUE
4. Search for `dom.media.mediasession.enabled` and set to TRUE
5. Restart your browser

***
#### If you want to load the extension by yourself in your browser without installing it from store or Microsoft suddenly decides to take action against it, follow the instructions below:

1. Clone or download this repository
   - If you download it, make sure to extract it first
3. Open the Extension Management page by navigating to `edge://extensions`
   - The Extension Management page can also be opened by clicking on the Edge menu, hovering over More Tools then selecting Extensions.
6. Enable Developer Mode by clicking the toggle switch next to Developer mode.
7. Click the Load unpacked button and select the extension directory.
8. Ta-da! The extension has been successfully installed!

***
### Difference Edge and FireFox extension
1. Delete the second half of the `background.js` file.
2. Delete the following lines form the `manifest` file.
   - ```  "persistent": false, ```
   - ```  "permissions": ["declarativeContent"], ```

const script = document.createElement('script');
script.textContent = 'setInterval(() => window._lact = Date.now(), 900000);';
script.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(script);
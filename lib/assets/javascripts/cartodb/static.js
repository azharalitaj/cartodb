var CartoNode = require('../../../../vendor/assets/javascripts/carto-node/carto-node.js');
var PACKAGE = require('../../../../package.json');
var version = PACKAGE.version;
var AssetsVersionHelper = require('./helpers/assets_version');

window.StaticConfig = window.StaticConfig || {};
window.CartoConfig = window.CartoConfig || {};

function redirectToLogin () {
  window.location = '/login';
}

(function (window, document) {
  var client = new CartoNode.AuthenticatedClient();

  client.getConfig(function (err, response, data) {
    window.CartoConfig.data = data;

    if (err) {
      console.error(err);
      return redirectToLogin();
    }

    var spinnerEl = document.querySelector('.spinner');
    spinnerEl.parentNode.classList.add('is-hidden');

    var assetsUrl = AssetsVersionHelper.getAssetsUrl(version);

    (function (w, d, a, favicon, stylesheets, scripts, l, h, s, t) {
      l = d.createElement('link');
      l.rel = 'shortcut icon';
      l.href = a + favicon;
      h = d.getElementsByTagName('head')[0];
      h.appendChild(l);

      stylesheets.forEach(function (src) {
        l = d.createElement('link');
        l.rel = 'stylesheet';
        l.href = a + src;
        h = d.getElementsByTagName('head')[0];
        h.appendChild(l);
      });

      scripts.forEach(function (src) {
        s = d.createElement('script');
        t = d.getElementsByTagName('script')[0];
        s.async = false;
        s.src = a + src;
        t.parentNode.insertBefore(s, t);
      });
    })(window, document, assetsUrl, '/favicons/favicon.ico', window.StaticConfig.stylesheets, window.StaticConfig.scripts);
  });
})(window, document);

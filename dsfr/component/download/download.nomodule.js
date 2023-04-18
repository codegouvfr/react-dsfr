/*! DSFR v1.9.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.9.1'
  };

  var api = window[config.namespace];

  var DownloadSelector = {
    DOWNLOAD_ASSESS_FILE: ("" + (api.internals.ns.attr.selector('assess-file'))),
    DOWNLOAD_DETAIL: ("" + (api.internals.ns.selector('download__detail')))
  };

  var AssessFile = /*@__PURE__*/(function (superclass) {
    function AssessFile () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) AssessFile.__proto__ = superclass;
    AssessFile.prototype = Object.create( superclass && superclass.prototype );
    AssessFile.prototype.constructor = AssessFile;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AssessFile';
    };

    AssessFile.prototype.init = function init () {
      this.lang = this.getLang(this.node);
      this.href = this.getAttribute('href');

      this.hreflang = this.getAttribute('hreflang');
      this.file = {};
      this.detail = this.querySelector(DownloadSelector.DOWNLOAD_DETAIL);
      this.update();
    };

    AssessFile.prototype.getFileLength = function getFileLength () {
      var this$1$1 = this;

      if (this.href === undefined) {
        this.length = -1;
        return;
      }

      fetch(this.href, { method: 'HEAD', mode: 'cors' }).then(function (response) {
        this$1$1.length = response.headers.get('content-length') || -1;
        if (this$1$1.length === -1) {
          api.inspector.warn('File size unknown: ' + this$1$1.href + '\nUnable to get HTTP header: "content-length"');
        }
        this$1$1.update();
      });
    };

    AssessFile.prototype.update = function update () {
      // TODO V2: implémenter async
      if (this.isLegacy) { this.length = -1; }

      if (!this.length) {
        this.getFileLength();
        return;
      }

      var details = [];
      if (this.detail) {
        if (this.href) {
          var extension = this.parseExtension(this.href);
          if (extension) { details.push(extension.toUpperCase()); }
        }

        if (this.length !== -1) {
          details.push(this.bytesToSize(this.length));
        }

        if (this.hreflang) {
          details.push(this.getLangDisplayName(this.hreflang));
        }

        this.detail.innerHTML = details.join(' - ');
      }
    };

    AssessFile.prototype.getLang = function getLang (elem) {
      if (elem.lang) { return elem.lang; }
      if (document.documentElement === elem) { return window.navigator.language; }
      return this.getLang(elem.parentElement);
    };

    AssessFile.prototype.parseExtension = function parseExtension (url) {
      var regexExtension = /\.(\w{1,9})(?:$|[?#])/;
      return url.match(regexExtension)[0].replace('.', '');
    };

    AssessFile.prototype.getLangDisplayName = function getLangDisplayName (locale) {
      if (this.isLegacy) { return locale; }
      var displayNames = new Intl.DisplayNames([this.lang], { type: 'language' });
      var name = displayNames.of(locale);
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    AssessFile.prototype.bytesToSize = function bytesToSize (bytes) {
      if (bytes === -1) { return null; }

      var sizeUnits = ['octets', 'ko', 'Mo', 'Go', 'To'];
      if (this.getAttribute(api.internals.ns.attr('assess-file')) === 'bytes') {
        sizeUnits = ['bytes', 'KB', 'MB', 'GB', 'TB'];
      }

      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
      if (i === 0) { return (bytes + " " + (sizeUnits[i])); }

      var size = bytes / (Math.pow( 1000, i ));
      var roundedSize = Math.round((size + Number.EPSILON) * 100) / 100; // arrondi a 2 décimal
      var stringSize = String(roundedSize).replace('.', ',');

      return (stringSize + " " + (sizeUnits[i]));
    };

    Object.defineProperties( AssessFile, staticAccessors );

    return AssessFile;
  }(api.core.Instance));

  api.download = {
    DownloadSelector: DownloadSelector,
    AssessFile: AssessFile

  };

  api.internals.register(api.download.DownloadSelector.DOWNLOAD_ASSESS_FILE, api.download.AssessFile);

})();
//# sourceMappingURL=download.nomodule.js.map

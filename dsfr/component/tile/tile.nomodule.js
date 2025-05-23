/*! DSFR v1.13.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.13.2'
  };

  var api = window[config.namespace];

  var TileDownload = /*@__PURE__*/(function (superclass) {
    function TileDownload () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TileDownload.__proto__ = superclass;
    TileDownload.prototype = Object.create( superclass && superclass.prototype );
    TileDownload.prototype.constructor = TileDownload;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TileDownload';
    };

    TileDownload.prototype.init = function init () {
      var this$1$1 = this;

      this.addAscent(api.core.AssessEmission.UPDATE, function (details) {
        this$1$1.descend(api.core.AssessEmission.UPDATE, details);
      });
      this.addAscent(api.core.AssessEmission.ADDED, function () {
        this$1$1.descend(api.core.AssessEmission.ADDED);
      });
    };

    Object.defineProperties( TileDownload, staticAccessors );

    return TileDownload;
  }(api.core.Instance));

  var TileSelector = {
    DOWNLOAD: api.internals.ns.selector('tile--download'),
    DOWNLOAD_DETAIL: ((api.internals.ns.selector('tile--download')) + " " + (api.internals.ns.selector('tile__detail')))
  };

  api.tile = {
    TileSelector: TileSelector,
    TileDownload: TileDownload
  };

  api.internals.register(api.tile.TileSelector.DOWNLOAD, api.tile.TileDownload);
  api.internals.register(api.tile.TileSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

})();
//# sourceMappingURL=tile.nomodule.js.map

/*! DSFR v1.10.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.10.1'
  };

  var api = window[config.namespace];

  var CardDownload = /*@__PURE__*/(function (superclass) {
    function CardDownload () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) CardDownload.__proto__ = superclass;
    CardDownload.prototype = Object.create( superclass && superclass.prototype );
    CardDownload.prototype.constructor = CardDownload;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CardDownload';
    };

    CardDownload.prototype.init = function init () {
      var this$1$1 = this;

      this.addAscent(api.core.AssessEmission.UPDATE, function (details) {
        this$1$1.descend(api.core.AssessEmission.UPDATE, details);
      });
      this.addAscent(api.core.AssessEmission.ADDED, function () {
        this$1$1.descend(api.core.AssessEmission.ADDED);
      });
    };

    Object.defineProperties( CardDownload, staticAccessors );

    return CardDownload;
  }(api.core.Instance));

  var CardSelector = {
    DOWNLOAD: api.internals.ns.selector('card--download'),
    DOWNLOAD_DETAIL: ((api.internals.ns.selector('card--download')) + " " + (api.internals.ns.selector('card__end')) + " " + (api.internals.ns.selector('card__detail')))
  };

  api.card = {
    CardSelector: CardSelector,
    CardDownload: CardDownload
  };

  api.internals.register(api.card.CardSelector.DOWNLOAD, api.card.CardDownload);
  api.internals.register(api.card.CardSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

})();
//# sourceMappingURL=card.nomodule.js.map

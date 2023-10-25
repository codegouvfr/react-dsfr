/*! DSFR v1.10.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.10.2'
  };

  var api = window[config.namespace];

  var TRANSCRIPTION = api.internals.ns.selector('transcription');

  var TranscriptionSelector = {
    TRANSCRIPTION: TRANSCRIPTION,
    BUTTON: (TRANSCRIPTION + "__btn")
  };

  var Transcription = /*@__PURE__*/(function (superclass) {
    function Transcription () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Transcription.__proto__ = superclass;
    Transcription.prototype = Object.create( superclass && superclass.prototype );
    Transcription.prototype.constructor = Transcription;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Transcription';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(TranscriptionSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Transcription.prototype, prototypeAccessors );
    Object.defineProperties( Transcription, staticAccessors );

    return Transcription;
  }(api.core.Instance));

  api.transcription = {
    Transcription: Transcription,
    TranscriptionSelector: TranscriptionSelector
  };

  api.internals.register(api.transcription.TranscriptionSelector.TRANSCRIPTION, api.transcription.Transcription);

})();
//# sourceMappingURL=transcription.nomodule.js.map

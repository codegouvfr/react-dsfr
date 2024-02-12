/*! DSFR v1.11.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.11.1'
  };

  var patch = {
    namespace: 'a4e35ba2a938ba9d007689dbf3f46acbb9807869'
  };

  var executor = {};
  var promise = new Promise(function (resolve, reject) {
    executor.resolve = resolve;
    executor.reject = reject;
  });

  window[patch.namespace] = {
    configuration: window[config.namespace],
    promise: promise
  };

  var patchInternals = function () {
    var api = window[config.namespace];
    if (!api || !api.internals) {
      requestAnimationFrame(patchInternals);
      return;
    }
    if (api.inspector.trace) { api.inspector.log = api.inspector.trace; }

    executor.resolve();
  };

  patchInternals();

})();
//# sourceMappingURL=patch.nomodule.js.map

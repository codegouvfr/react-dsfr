/*! DSFR v1.7.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.7.2'
  };

  var api = window[config.namespace];

  var TagSelector = {
    TAG_PRESSABLE: ((api.internals.ns.selector('tag')) + "[aria-pressed]")
  };

  api.tag = {
    TagSelector: TagSelector
  };

  api.internals.register(api.tag.TagSelector.TAG_PRESSABLE, api.core.Toggle);

})();
//# sourceMappingURL=tag.nomodule.js.map

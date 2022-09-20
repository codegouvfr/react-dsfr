/*! DSFR v1.7.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.7.2'
};

const api = window[config.namespace];

const TagSelector = {
  TAG_PRESSABLE: `${api.internals.ns.selector('tag')}[aria-pressed]`
};

api.tag = {
  TagSelector: TagSelector
};

api.internals.register(api.tag.TagSelector.TAG_PRESSABLE, api.core.Toggle);
//# sourceMappingURL=tag.module.js.map

/*! DSFR v1.12.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.12.1'
};

const api = window[config.namespace];

const ButtonSelector = {
  EQUISIZED_BUTTON: `${api.internals.ns.selector('btns-group--equisized')} ${api.internals.ns.selector('btn')}`,
  EQUISIZED_GROUP: api.internals.ns.selector('btns-group--equisized')
};

api.button = {
  ButtonSelector: ButtonSelector
};

api.internals.register(api.button.ButtonSelector.EQUISIZED_BUTTON, api.core.Equisized);
api.internals.register(api.button.ButtonSelector.EQUISIZED_GROUP, api.core.EquisizedsGroup);
//# sourceMappingURL=button.module.js.map

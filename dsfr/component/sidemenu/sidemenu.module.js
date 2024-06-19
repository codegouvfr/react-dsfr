/*! DSFR v1.12.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.12.0'
};

const api = window[config.namespace];

const ITEM = api.internals.ns.selector('sidemenu__item');
const COLLAPSE = api.internals.ns.selector('collapse');

const SidemenuSelector = {
  LIST: api.internals.ns.selector('sidemenu__list'),
  COLLAPSE: `${ITEM} > ${COLLAPSE}, ${ITEM} > *:not(${ITEM}):not(${COLLAPSE}) > ${COLLAPSE}, ${ITEM} > *:not(${ITEM}):not(${COLLAPSE}) > *:not(${ITEM}):not(${COLLAPSE}) > ${COLLAPSE}`,
  COLLAPSE_LEGACY: `${ITEM} ${COLLAPSE}`,
  ITEM: api.internals.ns.selector('sidemenu__item'),
  BUTTON: api.internals.ns.selector('sidemenu__btn')
};

class SidemenuList extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'SidemenuList';
  }

  validate (member) {
    return super.validate(member) && member.node.matches(api.internals.legacy.isLegacy ? SidemenuSelector.COLLAPSE_LEGACY : SidemenuSelector.COLLAPSE);
  }
}

class SidemenuItem extends api.core.Instance {
  static get instanceClassName () {
    return 'SidemenuItem';
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(SidemenuSelector.BUTTON));
    return buttons[0];
  }
}

api.sidemenu = {
  SidemenuList: SidemenuList,
  SidemenuItem: SidemenuItem,
  SidemenuSelector: SidemenuSelector
};

api.internals.register(api.sidemenu.SidemenuSelector.LIST, api.sidemenu.SidemenuList);
api.internals.register(api.sidemenu.SidemenuSelector.ITEM, api.sidemenu.SidemenuItem);
//# sourceMappingURL=sidemenu.module.js.map

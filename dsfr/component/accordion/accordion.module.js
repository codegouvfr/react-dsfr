/*! DSFR v1.12.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.12.1'
};

const api = window[config.namespace];

const ACCORDION = api.internals.ns.selector('accordion');
const COLLAPSE = api.internals.ns.selector('collapse');

const AccordionSelector = {
  GROUP: api.internals.ns.selector('accordions-group'),
  ACCORDION: ACCORDION,
  COLLAPSE: `${ACCORDION} > ${COLLAPSE}, ${ACCORDION} > *:not(${ACCORDION}):not(${COLLAPSE}) > ${COLLAPSE}, ${ACCORDION} > *:not(${ACCORDION}):not(${COLLAPSE}) > *:not(${ACCORDION}):not(${COLLAPSE}) > ${COLLAPSE}`,
  COLLAPSE_LEGACY: `${ACCORDION} ${COLLAPSE}`,
  BUTTON: `${ACCORDION}__btn`
};

class Accordion extends api.core.Instance {
  static get instanceClassName () {
    return 'Accordion';
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(AccordionSelector.BUTTON));
    return buttons[0];
  }
}

class AccordionsGroup extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'AccordionsGroup';
  }

  validate (member) {
    const match = member.node.matches(api.internals.legacy.isLegacy ? AccordionSelector.COLLAPSE_LEGACY : AccordionSelector.COLLAPSE);
    return super.validate(member) && match;
  }
}

api.accordion = {
  Accordion: Accordion,
  AccordionSelector: AccordionSelector,
  AccordionsGroup: AccordionsGroup
};

api.internals.register(api.accordion.AccordionSelector.GROUP, api.accordion.AccordionsGroup);
api.internals.register(api.accordion.AccordionSelector.ACCORDION, api.accordion.Accordion);
//# sourceMappingURL=accordion.module.js.map

/*! DSFR v1.7.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.7.2'
};

const api = window[config.namespace];

const AccordionSelector = {
  GROUP: api.internals.ns.selector('accordions-group'),
  COLLAPSE: `${api.internals.ns.selector('accordion')} > ${api.internals.ns.selector('collapse')}`
};

class AccordionsGroup extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'AccordionsGroup';
  }

  validate (member) {
    return member.node.matches(AccordionSelector.COLLAPSE);
  }
}

api.accordion = {
  AccordionSelector: AccordionSelector,
  AccordionsGroup: AccordionsGroup
};

api.internals.register(api.accordion.AccordionSelector.GROUP, api.accordion.AccordionsGroup);
//# sourceMappingURL=accordion.module.js.map

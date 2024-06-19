/*! DSFR v1.12.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.12.0'
  };

  var api = window[config.namespace];

  var ACCORDION = api.internals.ns.selector('accordion');
  var COLLAPSE = api.internals.ns.selector('collapse');

  var AccordionSelector = {
    GROUP: api.internals.ns.selector('accordions-group'),
    ACCORDION: ACCORDION,
    COLLAPSE: (ACCORDION + " > " + COLLAPSE + ", " + ACCORDION + " > *:not(" + ACCORDION + "):not(" + COLLAPSE + ") > " + COLLAPSE + ", " + ACCORDION + " > *:not(" + ACCORDION + "):not(" + COLLAPSE + ") > *:not(" + ACCORDION + "):not(" + COLLAPSE + ") > " + COLLAPSE),
    COLLAPSE_LEGACY: (ACCORDION + " " + COLLAPSE),
    BUTTON: (ACCORDION + "__btn")
  };

  var Accordion = /*@__PURE__*/(function (superclass) {
    function Accordion () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Accordion.__proto__ = superclass;
    Accordion.prototype = Object.create( superclass && superclass.prototype );
    Accordion.prototype.constructor = Accordion;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Accordion';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(AccordionSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Accordion.prototype, prototypeAccessors );
    Object.defineProperties( Accordion, staticAccessors );

    return Accordion;
  }(api.core.Instance));

  var AccordionsGroup = /*@__PURE__*/(function (superclass) {
    function AccordionsGroup () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) AccordionsGroup.__proto__ = superclass;
    AccordionsGroup.prototype = Object.create( superclass && superclass.prototype );
    AccordionsGroup.prototype.constructor = AccordionsGroup;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AccordionsGroup';
    };

    AccordionsGroup.prototype.validate = function validate (member) {
      var match = member.node.matches(api.internals.legacy.isLegacy ? AccordionSelector.COLLAPSE_LEGACY : AccordionSelector.COLLAPSE);
      return superclass.prototype.validate.call(this, member) && match;
    };

    Object.defineProperties( AccordionsGroup, staticAccessors );

    return AccordionsGroup;
  }(api.core.CollapsesGroup));

  api.accordion = {
    Accordion: Accordion,
    AccordionSelector: AccordionSelector,
    AccordionsGroup: AccordionsGroup
  };

  api.internals.register(api.accordion.AccordionSelector.GROUP, api.accordion.AccordionsGroup);
  api.internals.register(api.accordion.AccordionSelector.ACCORDION, api.accordion.Accordion);

})();
//# sourceMappingURL=accordion.nomodule.js.map

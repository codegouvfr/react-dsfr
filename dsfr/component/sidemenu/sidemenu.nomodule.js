/*! DSFR v1.13.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.13.0'
  };

  var api = window[config.namespace];

  var ITEM = api.internals.ns.selector('sidemenu__item');
  var COLLAPSE = api.internals.ns.selector('collapse');

  var SidemenuSelector = {
    LIST: api.internals.ns.selector('sidemenu__list'),
    COLLAPSE: (ITEM + " > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + "):not(" + COLLAPSE + ") > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + "):not(" + COLLAPSE + ") > *:not(" + ITEM + "):not(" + COLLAPSE + ") > " + COLLAPSE),
    COLLAPSE_LEGACY: (ITEM + " " + COLLAPSE),
    ITEM: api.internals.ns.selector('sidemenu__item'),
    BUTTON: api.internals.ns.selector('sidemenu__btn')
  };

  var SidemenuList = /*@__PURE__*/(function (superclass) {
    function SidemenuList () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) SidemenuList.__proto__ = superclass;
    SidemenuList.prototype = Object.create( superclass && superclass.prototype );
    SidemenuList.prototype.constructor = SidemenuList;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuList';
    };

    SidemenuList.prototype.validate = function validate (member) {
      return superclass.prototype.validate.call(this, member) && member.node.matches(api.internals.legacy.isLegacy ? SidemenuSelector.COLLAPSE_LEGACY : SidemenuSelector.COLLAPSE);
    };

    Object.defineProperties( SidemenuList, staticAccessors );

    return SidemenuList;
  }(api.core.CollapsesGroup));

  var SidemenuItem = /*@__PURE__*/(function (superclass) {
    function SidemenuItem () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) SidemenuItem.__proto__ = superclass;
    SidemenuItem.prototype = Object.create( superclass && superclass.prototype );
    SidemenuItem.prototype.constructor = SidemenuItem;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuItem';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(SidemenuSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( SidemenuItem.prototype, prototypeAccessors );
    Object.defineProperties( SidemenuItem, staticAccessors );

    return SidemenuItem;
  }(api.core.Instance));

  api.sidemenu = {
    SidemenuList: SidemenuList,
    SidemenuItem: SidemenuItem,
    SidemenuSelector: SidemenuSelector
  };

  api.internals.register(api.sidemenu.SidemenuSelector.LIST, api.sidemenu.SidemenuList);
  api.internals.register(api.sidemenu.SidemenuSelector.ITEM, api.sidemenu.SidemenuItem);

})();
//# sourceMappingURL=sidemenu.nomodule.js.map

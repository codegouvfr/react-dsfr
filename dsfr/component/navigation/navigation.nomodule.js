/*! DSFR v1.14.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.14.2'
  };

  var api = window[config.namespace];

  var ITEM = api.internals.ns.selector('nav__item');
  var COLLAPSE = api.internals.ns.selector('collapse');

  var NavigationSelector = {
    NAVIGATION: api.internals.ns.selector('nav'),
    COLLAPSE: (ITEM + " > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + "):not(" + COLLAPSE + ") > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + "):not(" + COLLAPSE + ") > *:not(" + ITEM + "):not(" + COLLAPSE + ") > " + COLLAPSE),
    COLLAPSE_LEGACY: (ITEM + " " + COLLAPSE),
    ITEM: ITEM,
    ITEM_RIGHT: (ITEM + "--align-right"),
    MENU: api.internals.ns.selector('menu'),
    BUTTON: api.internals.ns.selector('nav__btn'),
    TRANSLATE_BUTTON: api.internals.ns.selector('translate__btn')
  };

  var NavigationItem = /*@__PURE__*/(function (superclass) {
    function NavigationItem () {
      superclass.call(this);
      this._isRightAligned = false;
    }

    if ( superclass ) NavigationItem.__proto__ = superclass;
    NavigationItem.prototype = Object.create( superclass && superclass.prototype );
    NavigationItem.prototype.constructor = NavigationItem;

    var prototypeAccessors = { isRightAligned: { configurable: true },collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NavigationItem';
    };

    NavigationItem.prototype.init = function init () {
      this.addAscent(api.core.DisclosureEmission.ADDED, this.calculate.bind(this));
      this.addAscent(api.core.DisclosureEmission.REMOVED, this.calculate.bind(this));
      this.isResizing = true;
      this.calculate();
    };

    NavigationItem.prototype.resize = function resize () {
      this.calculate();
    };

    NavigationItem.prototype.calculate = function calculate () {
      var collapse = this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
      if (collapse && this.isBreakpoint(api.core.Breakpoints.LG) && collapse.element.node.matches(NavigationSelector.MENU)) {
        var right = this.element.node.parentElement.getBoundingClientRect().right; // todo: ne fonctionne que si la nav fait 100% du container
        var width = collapse.element.node.getBoundingClientRect().width;
        var left = this.element.node.getBoundingClientRect().left;
        this.isRightAligned = left + width > right;
      } else { this.isRightAligned = false; }
    };

    prototypeAccessors.isRightAligned.get = function () {
      return this._isRightAligned;
    };

    prototypeAccessors.isRightAligned.set = function (value) {
      if (this._isRightAligned === value) { return; }
      this._isRightAligned = value;
      if (value) { api.internals.dom.addClass(this.element.node, NavigationSelector.ITEM_RIGHT); }
      else { api.internals.dom.removeClass(this.element.node, NavigationSelector.ITEM_RIGHT); }
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && (button.hasClass(NavigationSelector.BUTTON) || button.hasClass(NavigationSelector.TRANSLATE_BUTTON)); });
      return buttons[0];
    };

    Object.defineProperties( NavigationItem.prototype, prototypeAccessors );
    Object.defineProperties( NavigationItem, staticAccessors );

    return NavigationItem;
  }(api.core.Instance));

  var NavigationMousePosition = {
    NONE: -1,
    INSIDE: 0,
    OUTSIDE: 1
  };

  var Navigation = /*@__PURE__*/(function (superclass) {
    function Navigation () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Navigation.__proto__ = superclass;
    Navigation.prototype = Object.create( superclass && superclass.prototype );
    Navigation.prototype.constructor = Navigation;

    var prototypeAccessors = { hasOpenedMenu: { configurable: true },index: { configurable: true },canUngroup: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Navigation';
    };

    Navigation.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.clicked = false;
      this.out = false;
      this.addEmission(api.core.RootEmission.CLICK, this._handleRootClick.bind(this));
      this.listen('mousedown', this.handleMouseDown.bind(this));
      this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
      this.listenClick({ capture: true });
      this.isResizing = true;
    };

    Navigation.prototype.validate = function validate (member) {
      return superclass.prototype.validate.call(this, member) && member.element.node.matches(api.internals.legacy.isLegacy ? NavigationSelector.COLLAPSE_LEGACY : NavigationSelector.COLLAPSE);
    };

    prototypeAccessors.hasOpenedMenu.get = function () {
      return this.isBreakpoint(api.core.Breakpoints.LG) && this.index > -1;
    };

    Navigation.prototype._keydown = function _keydown (keyCode) {
      var this$1$1 = this;

      switch (keyCode) {
        case api.core.KeyCodes.ESCAPE:
          if (!this.hasOpenedMenu) { return; }
          this.index = -1;
          break;

        case api.core.KeyCodes.TAB:
          if (!this.hasOpenedMenu) { return; }
          this.request(function () {
            if (this$1$1.current.node.contains(document.activeElement)) { return; }
            this$1$1.index = -1;
          });
          break;
      }
    };

    Navigation.prototype.handleMouseDown = function handleMouseDown (e) {
      if (!this.hasOpenedMenu) { return; }
      this.position = this.current.node.contains(e.target) ? NavigationMousePosition.INSIDE : NavigationMousePosition.OUTSIDE;
      this.requestPosition();
    };

    Navigation.prototype.handleClick = function handleClick (e) {
      if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
        this.index = -1;
      }
    };

    Navigation.prototype._handleRootClick = function _handleRootClick (target) {
      if (!this.isBreakpoint(api.core.Breakpoints.LG)) { return; }
      if (!this.node.contains(target)) {
        this.out = true;
        this.requestPosition();
      }
    };

    Navigation.prototype.requestPosition = function requestPosition () {
      if (this.isRequesting) { return; }
      this.isRequesting = true;
      this.request(this.getPosition.bind(this));
    };

    Navigation.prototype.getPosition = function getPosition () {
      if (this.out) {
        switch (this.position) {
          case NavigationMousePosition.OUTSIDE:
            this.index = -1;
            break;

          case NavigationMousePosition.INSIDE:
            if (this.current && !this.current.node.contains(document.activeElement)) { this.current.focus(); }
            break;

          default:
            if (this.index > -1 && !this.current.hasFocus) { this.index = -1; }
        }
      }

      this.request(this.requested.bind(this));
    };

    Navigation.prototype.requested = function requested () {
      this.position = NavigationMousePosition.NONE;
      this.out = false;
      this.isRequesting = false;
    };

    prototypeAccessors.index.get = function () { return superclass.prototype.index; };

    prototypeAccessors.index.set = function (value) {
      if (value === -1 && this.current && this.current.hasFocus) { this.current.focus(); }
      superclass.prototype.index = value;
    };

    prototypeAccessors.canUngroup.get = function () {
      return !this.isBreakpoint(api.core.Breakpoints.LG);
    };

    Navigation.prototype.resize = function resize () {
      this.update();
    };

    Object.defineProperties( Navigation.prototype, prototypeAccessors );
    Object.defineProperties( Navigation, staticAccessors );

    return Navigation;
  }(api.core.CollapsesGroup));

  api.navigation = {
    Navigation: Navigation,
    NavigationItem: NavigationItem,
    NavigationMousePosition: NavigationMousePosition,
    NavigationSelector: NavigationSelector
  };

  api.internals.register(api.navigation.NavigationSelector.NAVIGATION, api.navigation.Navigation);
  api.internals.register(api.navigation.NavigationSelector.ITEM, api.navigation.NavigationItem);

})();
//# sourceMappingURL=navigation.nomodule.js.map

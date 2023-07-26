/*! DSFR v1.9.3 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.9.3'
  };

  var api = window[config.namespace];

  var Breadcrumb = /*@__PURE__*/(function (superclass) {
    function Breadcrumb () {
      superclass.call(this);
      this.count = 0;
      this.focusing = this.focus.bind(this);
    }

    if ( superclass ) Breadcrumb.__proto__ = superclass;
    Breadcrumb.prototype = Object.create( superclass && superclass.prototype );
    Breadcrumb.prototype.constructor = Breadcrumb;

    var prototypeAccessors = { proxy: { configurable: true },links: { configurable: true },collapse: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Breadcrumb';
    };

    Breadcrumb.prototype.init = function init () {
      this.getCollapse();
      this.isResizing = true;
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, superclass.prototype.proxy, {
        focus: scope.focus.bind(scope),
        disclose: scope.collapse.disclose.bind(scope.collapse)
      });
    };

    Breadcrumb.prototype.getCollapse = function getCollapse () {
      var collapse = this.collapse;
      if (collapse) {
        collapse.listen(api.core.DisclosureEvent.DISCLOSE, this.focusing);
      } else {
        this.addAscent(api.core.DisclosureEmission.ADDED, this.getCollapse.bind(this));
      }
    };

    Breadcrumb.prototype.resize = function resize () {
      var collapse = this.collapse;
      var links = this.links;
      if (!collapse || !links.length) { return; }

      if (this.isBreakpoint(api.core.Breakpoints.MD)) {
        if (collapse.buttonHasFocus) { links[0].focus(); }
      } else {
        if (links.indexOf(document.activeElement) > -1) { collapse.focus(); }
      }
    };

    prototypeAccessors.links.get = function () {
      return [].concat( this.querySelectorAll('a[href]') );
    };

    prototypeAccessors.collapse.get = function () {
      return this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
    };

    Breadcrumb.prototype.focus = function focus () {
      this.count = 0;
      this._focus();
    };

    Breadcrumb.prototype._focus = function _focus () {
      var link = this.links[0];
      if (!link) { return; }
      link.focus();
      this.request(this.verify.bind(this));
    };

    Breadcrumb.prototype.verify = function verify () {
      this.count++;
      if (this.count > 100) { return; }
      var link = this.links[0];
      if (!link) { return; }
      if (document.activeElement !== link) { this._focus(); }
    };

    Object.defineProperties( Breadcrumb.prototype, prototypeAccessors );
    Object.defineProperties( Breadcrumb, staticAccessors );

    return Breadcrumb;
  }(api.core.Instance));

  var BreadcrumbSelector = {
    BREADCRUMB: api.internals.ns.selector('breadcrumb')
  };

  api.breadcrumb = {
    BreadcrumbSelector: BreadcrumbSelector,
    Breadcrumb: Breadcrumb
  };

  api.internals.register(api.breadcrumb.BreadcrumbSelector.BREADCRUMB, api.breadcrumb.Breadcrumb);

})();
//# sourceMappingURL=breadcrumb.nomodule.js.map

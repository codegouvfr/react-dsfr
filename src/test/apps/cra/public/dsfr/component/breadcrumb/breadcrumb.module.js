/*! DSFR v1.7.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.7.2'
};

const api = window[config.namespace];

class Breadcrumb extends api.core.Instance {
  constructor () {
    super();
    this.count = 0;
    this.focusing = this.focus.bind(this);
  }

  static get instanceClassName () {
    return 'Breadcrumb';
  }

  init () {
    this.getCollapse();
    this.isResizing = true;
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      focus: scope.focus.bind(scope),
      disclose: scope.collapse.disclose.bind(scope.collapse)
    });
  }

  getCollapse () {
    const collapse = this.collapse;
    if (collapse) {
      collapse.listen(api.core.DisclosureEvent.DISCLOSE, this.focusing);
    } else {
      this.addAscent(api.core.DisclosureEmission.ADDED, this.getCollapse.bind(this));
    }
  }

  resize () {
    const collapse = this.collapse;
    const links = this.links;
    if (!collapse || !links.length) return;

    if (this.isBreakpoint(api.core.Breakpoints.MD)) {
      if (collapse.buttonHasFocus) links[0].focus();
    } else {
      if (links.indexOf(document.activeElement) > -1) collapse.focus();
    }
  }

  get links () {
    return [...this.querySelectorAll('a[href]')];
  }

  get collapse () {
    return this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
  }

  focus () {
    this.count = 0;
    this._focus();
  }

  _focus () {
    const link = this.links[0];
    if (!link) return;
    link.focus();
    this.request(this.verify.bind(this));
  }

  verify () {
    this.count++;
    if (this.count > 100) return;
    const link = this.links[0];
    if (!link) return;
    if (document.activeElement !== link) this._focus();
  }
}

const BreadcrumbSelector = {
  BREADCRUMB: api.internals.ns.selector('breadcrumb')
};

api.breadcrumb = {
  BreadcrumbSelector: BreadcrumbSelector,
  Breadcrumb: Breadcrumb
};

api.internals.register(api.breadcrumb.BreadcrumbSelector.BREADCRUMB, api.breadcrumb.Breadcrumb);
//# sourceMappingURL=breadcrumb.module.js.map

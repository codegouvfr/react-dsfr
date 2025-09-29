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

  var HeaderSelector = {
    HEADER: api.internals.ns.selector('header'),
    BRAND_LINK: api.internals.ns.selector('header__brand a'),
    TOOLS_LINKS: api.internals.ns.selector('header__tools-links'),
    MENU_LINKS: api.internals.ns.selector('header__menu-links'),
    BUTTONS: ((api.internals.ns.selector('header__tools-links')) + " " + (api.internals.ns.selector('btns-group')) + ", " + (api.internals.ns.selector('header__tools-links')) + " " + (api.internals.ns.selector('links-group'))),
    MODALS: ("" + (api.internals.ns.selector('header__search')) + (api.internals.ns.selector('modal')) + ", " + (api.internals.ns.selector('header__menu')) + (api.internals.ns.selector('modal')))
  };

  var HeaderLinks = /*@__PURE__*/(function (superclass) {
    function HeaderLinks () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) HeaderLinks.__proto__ = superclass;
    HeaderLinks.prototype = Object.create( superclass && superclass.prototype );
    HeaderLinks.prototype.constructor = HeaderLinks;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderLinks';
    };

    HeaderLinks.prototype.init = function init () {
      var header = this.queryParentSelector(HeaderSelector.HEADER);
      this.toolsLinks = header.querySelector(HeaderSelector.TOOLS_LINKS);
      this.menuLinks = header.querySelector(HeaderSelector.MENU_LINKS);
      var copySuffix = '-mobile';

      var toolsHtml = this.toolsLinks.innerHTML.replace(/  +/g, ' ');
      var menuHtml = this.menuLinks.innerHTML.replace(/  +/g, ' ');
      // Pour éviter de dupliquer des id, on ajoute un suffixe aux id et aria-controls duppliqués.
      var toolsHtmlIdList = toolsHtml.match(/id="(.*?)"/gm) || [];

      // on a besoin d'échapper les backslash dans la chaine de caractère
      // eslint-disable-next-line no-useless-escape
      toolsHtmlIdList = toolsHtmlIdList.map(function (element) { return element.replace('id=\"', '').replace('\"', ''); });

      var dupplicateAttributes = ['aria-controls', 'aria-describedby', 'aria-labelledby'];

      var toolsHtmlDuplicateId = toolsHtml.replace(/id="(.*?)"/gm, ("id=\"$1" + copySuffix + "\""));

      for (var i$1 = 0, list$1 = dupplicateAttributes; i$1 < list$1.length; i$1 += 1) {
        var attribute = list$1[i$1];

        var toolsHtmlAttributeList = toolsHtml.match(new RegExp((attribute + "=\"(.*?)\""), 'gm'));
        if (toolsHtmlAttributeList) {
          for (var i = 0, list = toolsHtmlAttributeList; i < list.length; i += 1) {
            var element = list[i];

            var attributeValue = element.replace((attribute + "=\""), '').replace('"', '');
            if (toolsHtmlIdList.includes(attributeValue)) {
              toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace((attribute + "=\"" + attributeValue + "\""), (attribute + "=\"" + (attributeValue + copySuffix) + "\""));
            }        }
        }
      }

      if (toolsHtmlDuplicateId === menuHtml) { return; }

      switch (api.mode) {
        case api.Modes.ANGULAR:
        case api.Modes.REACT:
        case api.Modes.VUE:
          this.warn(("header__tools-links content is different from header__menu-links content.\nAs you're using a dynamic framework, you should handle duplication of this content yourself, please refer to documentation:\n" + (api.header.doc)));
          break;

        default:
          this.menuLinks.innerHTML = toolsHtmlDuplicateId;
      }
    };

    Object.defineProperties( HeaderLinks, staticAccessors );

    return HeaderLinks;
  }(api.core.Instance));

  var HeaderModal = /*@__PURE__*/(function (superclass) {
    function HeaderModal () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) HeaderModal.__proto__ = superclass;
    HeaderModal.prototype = Object.create( superclass && superclass.prototype );
    HeaderModal.prototype.constructor = HeaderModal;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderModal';
    };

    HeaderModal.prototype.init = function init () {
      this.storeAria();
      this.isResizing = true;
    };

    HeaderModal.prototype.resize = function resize () {
      if (this.isBreakpoint(api.core.Breakpoints.LG)) { this.deactivateModal(); }
      else { this.activateModal(); }
    };

    HeaderModal.prototype.activateModal = function activateModal () {
      var modal = this.element.getInstance('Modal');
      if (!modal) {
        this.request(this.activateModal.bind(this));
        return;
      }
      this.restoreAria();
      modal.isActive = true;
      this.listenClick({ capture: true });
    };

    HeaderModal.prototype.deactivateModal = function deactivateModal () {
      var modal = this.element.getInstance('Modal');
      if (!modal) {
        this.request(this.deactivateModal.bind(this));
        return;
      }
      modal.conceal();
      modal.isActive = false;
      this.storeAria();
      this.unlistenClick({ capture: true });
    };

    HeaderModal.prototype.storeAria = function storeAria () {
      if (this.hasAttribute('aria-labelledby')) { this._ariaLabelledby = this.getAttribute('aria-labelledby'); }
      if (this.hasAttribute('aria-label')) { this._ariaLabel = this.getAttribute('aria-label'); }
      this.removeAttribute('aria-labelledby');
      this.removeAttribute('aria-label');
    };

    HeaderModal.prototype.restoreAria = function restoreAria () {
      if (this._ariaLabelledby) { this.setAttribute('aria-labelledby', this._ariaLabelledby); }
      if (this._ariaLabel) { this.setAttribute('aria-label', this._ariaLabel); }
    };

    HeaderModal.prototype.handleClick = function handleClick (e) {
      if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
        var modal = this.element.getInstance('Modal');
        modal.conceal();
      }
    };

    Object.defineProperties( HeaderModal, staticAccessors );

    return HeaderModal;
  }(api.core.Instance));

  api.header = {
    HeaderLinks: HeaderLinks,
    HeaderModal: HeaderModal,
    HeaderSelector: HeaderSelector,
    doc: 'https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/en-tete'
  };

  api.internals.register(api.header.HeaderSelector.TOOLS_LINKS, api.header.HeaderLinks);
  api.internals.register(api.header.HeaderSelector.MODALS, api.header.HeaderModal);

})();
//# sourceMappingURL=header.nomodule.js.map

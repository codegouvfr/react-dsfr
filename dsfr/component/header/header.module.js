/*! DSFR v1.13.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.13.0'
};

const api = window[config.namespace];

const HeaderSelector = {
  HEADER: api.internals.ns.selector('header'),
  TOOLS_LINKS: api.internals.ns.selector('header__tools-links'),
  MENU_LINKS: api.internals.ns.selector('header__menu-links'),
  BUTTONS: `${api.internals.ns.selector('header__tools-links')} ${api.internals.ns.selector('btns-group')}, ${api.internals.ns.selector('header__tools-links')} ${api.internals.ns.selector('links-group')}`,
  MODALS: `${api.internals.ns.selector('header__search')}${api.internals.ns.selector('modal')}, ${api.internals.ns.selector('header__menu')}${api.internals.ns.selector('modal')}`
};

class HeaderLinks extends api.core.Instance {
  static get instanceClassName () {
    return 'HeaderLinks';
  }

  init () {
    const header = this.queryParentSelector(HeaderSelector.HEADER);
    this.toolsLinks = header.querySelector(HeaderSelector.TOOLS_LINKS);
    this.menuLinks = header.querySelector(HeaderSelector.MENU_LINKS);
    const copySuffix = '-mobile';

    const toolsHtml = this.toolsLinks.innerHTML.replace(/  +/g, ' ');
    const menuHtml = this.menuLinks.innerHTML.replace(/  +/g, ' ');
    // Pour éviter de dupliquer des id, on ajoute un suffixe aux id et aria-controls duppliqués.
    let toolsHtmlIdList = toolsHtml.match(/id="(.*?)"/gm) || [];

    // on a besoin d'échapper les backslash dans la chaine de caractère
    // eslint-disable-next-line no-useless-escape
    toolsHtmlIdList = toolsHtmlIdList.map(element => element.replace('id=\"', '').replace('\"', ''));

    const dupplicateAttributes = ['aria-controls', 'aria-describedby', 'aria-labelledby'];

    let toolsHtmlDuplicateId = toolsHtml.replace(/id="(.*?)"/gm, `id="$1${copySuffix}"`);

    for (const attribute of dupplicateAttributes) {
      const toolsHtmlAttributeList = toolsHtml.match(new RegExp(`${attribute}="(.*?)"`, 'gm'));
      if (toolsHtmlAttributeList) {
        for (const element of toolsHtmlAttributeList) {
          const attributeValue = element.replace(`${attribute}="`, '').replace('"', '');
          if (toolsHtmlIdList.includes(attributeValue)) {
            toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace(`${attribute}="${attributeValue}"`, `${attribute}="${attributeValue + copySuffix}"`);
          }        }
      }
    }

    if (toolsHtmlDuplicateId === menuHtml) return;

    switch (api.mode) {
      case api.Modes.ANGULAR:
      case api.Modes.REACT:
      case api.Modes.VUE:
        this.warn(`header__tools-links content is different from header__menu-links content.
As you're using a dynamic framework, you should handle duplication of this content yourself, please refer to documentation:
${api.header.doc}`);
        break;

      default:
        this.menuLinks.innerHTML = toolsHtmlDuplicateId;
    }
  }
}

class HeaderModal extends api.core.Instance {
  static get instanceClassName () {
    return 'HeaderModal';
  }

  init () {
    this.storeAria();
    this.isResizing = true;
  }

  resize () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this.deactivateModal();
    else this.activateModal();
  }

  activateModal () {
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    modal.isEnabled = true;
    this.restoreAria();
    this.listenClick({ capture: true });
  }

  deactivateModal () {
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    modal.conceal();
    modal.isEnabled = false;
    this.storeAria();
    this.unlistenClick({ capture: true });
  }

  storeAria () {
    if (this.hasAttribute('aria-labelledby')) this._ariaLabelledby = this.getAttribute('aria-labelledby');
    if (this.hasAttribute('aria-label')) this._ariaLabel = this.getAttribute('aria-label');
    this.removeAttribute('aria-labelledby');
    this.removeAttribute('aria-label');
  }

  restoreAria () {
    if (this._ariaLabelledby) this.setAttribute('aria-labelledby', this._ariaLabelledby);
    if (this._ariaLabel) this.setAttribute('aria-label', this._ariaLabel);
  }

  handleClick (e) {
    if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
      const modal = this.element.getInstance('Modal');
      modal.conceal();
    }
  }
}

api.header = {
  HeaderLinks: HeaderLinks,
  HeaderModal: HeaderModal,
  HeaderSelector: HeaderSelector,
  doc: 'https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete'
};

api.internals.register(api.header.HeaderSelector.TOOLS_LINKS, api.header.HeaderLinks);
api.internals.register(api.header.HeaderSelector.MODALS, api.header.HeaderModal);
//# sourceMappingURL=header.module.js.map

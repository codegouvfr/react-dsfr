/*! DSFR v1.14.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.14.2'
};

const api = window[config.namespace];

const ModalSelector = {
  MODAL: api.internals.ns.selector('modal'),
  SCROLL_DIVIDER: api.internals.ns.selector('scroll-divider'),
  BODY: api.internals.ns.selector('modal__body'),
  TITLE: api.internals.ns.selector('modal__title')
};

class ModalButton extends api.core.DisclosureButton {
  constructor () {
    super(api.core.DisclosureType.OPENED);
  }

  static get instanceClassName () {
    return 'ModalButton';
  }
}

const ModalAttribute = {
  CONCEALING_BACKDROP: api.internals.ns.attr('concealing-backdrop')
};

class Modal extends api.core.Disclosure {
  constructor () {
    super(api.core.DisclosureType.OPENED, ModalSelector.MODAL, ModalButton, 'ModalsGroup');
    this._isDecorated = false;
    this.scrolling = this.resize.bind(this, false);
    this.resizing = this.resize.bind(this, true);
  }

  static get instanceClassName () {
    return 'Modal';
  }

  init () {
    super.init();
    this._isDialog = this.node.tagName === 'DIALOG';
    this.listenClick();
    this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
  }

  _keydown (keyCode) {
    switch (keyCode) {
      case api.core.KeyCodes.ESCAPE:
        this._escape();
        break;
    }
  }

  // TODO v2 : passer les tagName d'action en constante
  _escape () {
    const tagName = document.activeElement ? document.activeElement.tagName : undefined;
    const isTooltipReferent = document.activeElement ? document.activeElement.hasAttribute('data-fr-js-tooltip-referent') : false;

    if (isTooltipReferent) return;

    switch (tagName) {
      case 'INPUT':
      case 'LABEL':
      case 'TEXTAREA':
      case 'SELECT':
      case 'AUDIO':
      case 'VIDEO':
        break;

      default:
        if (this.isDisclosed) {
          this.conceal();
          this.focus();
        }
    }
  }

  retrieved () {
    this._ensureAccessibleName();
  }

  get body () {
    return this.element.getDescendantInstances('ModalBody', 'Modal')[0];
  }

  handleClick (e) {
    if (e.target === this.node && this.getAttribute(ModalAttribute.CONCEALING_BACKDROP) !== 'false') this.conceal();
  }

  disclose (withhold) {
    if (!super.disclose(withhold)) return false;
    if (this.body) {
      this.body.isResizing = true;
      this.body.resize();
    }
    this.isScrollLocked = true;
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('open', 'true');
    if (!this._isDialog) {
      this.decorateDialog();
    }
    return true;
  }

  conceal (withhold, preventFocus) {
    if (!super.conceal(withhold, preventFocus)) return false;
    this.isScrollLocked = false;
    this.removeAttribute('aria-modal');
    this.removeAttribute('open');
    if (this.body) this.body.isResizing = false;
    if (!this._isDialog) {
      this.stripDialog();
    }
    return true;
  }

  get isDialog () {
    return this._isDialog;
  }

  set isDialog (value) {
    this._isDialog = value;
  }

  get isActive () {
    return super.isActive;
  }

  set isActive (value) {
    super.isActive = value;
    if (value) this._ensureAccessibleName();
  }

  decorateDialog () {
    if (this._isDecorated) return;
    this._isDecorated = true;
    this._hasDialogRole = this.getAttribute('role') === 'dialog';
    if (!this._hasDialogRole) this.setAttribute('role', 'dialog');
  }

  stripDialog () {
    if (!this._isDecorated) return;
    this._isDecorated = false;
    if (!this._hasDialogRole) this.removeAttribute('role');
  }

  _setAccessibleName (node, append) {
    const id = this.retrieveNodeId(node, append);
    this.warn(`add reference to ${append} for accessible name (aria-labelledby)`);
    this.setAttribute('aria-labelledby', id);
  }

  _ensureAccessibleName () {
    if (!this.isActive || !this.isEnabled || (this.isEnabled && (this.hasAttribute('aria-labelledby') || this.hasAttribute('aria-label')))) return;
    this.warn('missing accessible name');
    const title = this.node.querySelector(ModalSelector.TITLE);
    const primary = this.primaryButtons[0];

    switch (true) {
      case title !== null:
        this._setAccessibleName(title, 'title');
        break;

      case primary !== undefined:
        this.warn('missing required title, fallback to primary button');
        this._setAccessibleName(primary, 'primary');
        break;
    }
  }
}

const unordereds = [
  '[tabindex="0"]',
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  'details>summary:first-of-type',
  'details',
  'iframe'
];

const UNORDEREDS = unordereds.join();

const ordereds = [
  '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
];

const ORDEREDS = ordereds.join();

const isFocusable = (element, container) => {
  if (!(element instanceof Element)) return false;
  const windowElement = window.frameElement ? window.frameElement.contentWindow : window;
  const style = windowElement.getComputedStyle(element);
  if (!style) return false;
  if (style.visibility === 'hidden') return false;
  if (container === undefined) container = element;

  while (container.contains(element)) {
    if (style.display === 'none') return false;
    element = element.parentElement;
  }

  return true;
};

class FocusTrap {
  constructor (onTrap, onUntrap) {
    this.element = null;
    this.activeElement = null;
    this.onTrap = onTrap;
    this.onUntrap = onUntrap;
    this.waiting = this.wait.bind(this);
    this.handling = this.handle.bind(this);
    this.focusing = this.maintainFocus.bind(this);
    this.current = null;
    this.window = window.frameElement ? window.frameElement.contentWindow : window;
  }

  get trapped () { return this.element !== null; }

  trap (element) {
    if (this.trapped) this.untrap();

    this.element = element;
    this.isTrapping = true;
    this.wait();

    if (this.onTrap) this.onTrap();
  }

  wait () {
    if (!isFocusable(this.element)) {
      this.window.requestAnimationFrame(this.waiting);
      return;
    }

    this.trapping();
  }

  trapping () {
    if (!this.isTrapping) return;
    this.isTrapping = false;
    const focusables = this.focusables;
    if (focusables.length && focusables.indexOf(this.window.document.activeElement) === -1) focusables[0].focus();
    this.element.setAttribute('aria-modal', true);
    this.window.addEventListener('keydown', this.handling);
    this.window.document.body.addEventListener('focus', this.focusing, true);
  }

  stun (node) {
    for (const child of node.children) {
      if (child === this.element) continue;
      if (child.contains(this.element)) {
        this.stun(child);
        continue;
      }
      this.stunneds.push(new Stunned(child));
    }
  }

  maintainFocus (event) {
    if (!this.element.contains(event.target)) {
      const focusables = this.focusables;
      if (focusables.length === 0) return;
      const first = focusables[0];
      event.preventDefault();
      first.focus();
    }
  }

  handle (e) {
    if (e.keyCode !== 9) return;

    const focusables = this.focusables;
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const index = focusables.indexOf(this.window.document.activeElement);

    if (e.shiftKey) {
      if (!this.element.contains(this.window.document.activeElement) || index < 1) {
        e.preventDefault();
        last.focus();
      } else if (this.window.document.activeElement.tabIndex > 0 || focusables[index - 1].tabIndex > 0) {
        e.preventDefault();
        focusables[index - 1].focus();
      }
    } else {
      if (!this.element.contains(this.window.document.activeElement) || index === focusables.length - 1 || index === -1) {
        e.preventDefault();
        first.focus();
      } else if (this.window.document.activeElement.tabIndex > 0) {
        e.preventDefault();
        focusables[index + 1].focus();
      }
    }
  }

  get focusables () {
    let unordereds = api.internals.dom.querySelectorAllArray(this.element, UNORDEREDS);

    /**
     *  filtrage des radiobutttons de même name (la navigations d'un groupe de radio se fait à la flèche et non pas au tab
     **/
    const radios = api.internals.dom.querySelectorAllArray(this.window.document.documentElement, 'input[type="radio"]');

    if (radios.length) {
      const groups = {};

      for (const radio of radios) {
        const name = radio.getAttribute('name');
        if (groups[name] === undefined) groups[name] = new RadioButtonGroup(name);
        groups[name].push(radio);
      }

      unordereds = unordereds.filter((unordered) => {
        if (unordered.tagName.toLowerCase() !== 'input' || (unordered.getAttribute('type') && unordered.getAttribute('type').toLowerCase() !== 'radio')) return true;
        const name = unordered.getAttribute('name');
        return groups[name].keep(unordered);
      });
    }

    const ordereds = api.internals.dom.querySelectorAllArray(this.element, ORDEREDS);

    ordereds.sort((a, b) => a.tabIndex - b.tabIndex);

    const noDuplicates = unordereds.filter((element) => ordereds.indexOf(element) === -1);
    const concateneds = ordereds.concat(noDuplicates);
    return concateneds.filter((element) => element.tabIndex !== '-1' && isFocusable(element, this.element));
  }

  untrap () {
    if (!this.trapped) return;
    this.isTrapping = false;

    this.element.removeAttribute('aria-modal');
    this.window.removeEventListener('keydown', this.handling);
    this.window.document.body.removeEventListener('focus', this.focusing, true);

    this.element = null;

    if (this.onUntrap) this.onUntrap();
  }

  dispose () {
    this.untrap();
  }
}

class Stunned {
  constructor (element) {
    this.element = element;
    // this.hidden = element.getAttribute('aria-hidden');
    this.inert = element.getAttribute('inert');

    // this.element.setAttribute('aria-hidden', true);
    this.element.setAttribute('inert', '');
  }

  unstun () {
    /*
    if (this.hidden === null) this.element.removeAttribute('aria-hidden');
    else this.element.setAttribute('aria-hidden', this.hidden);
     */

    if (this.inert === null) this.element.removeAttribute('inert');
    else this.element.setAttribute('inert', this.inert);
  }
}

class RadioButtonGroup {
  constructor (name) {
    this.name = name;
    this.buttons = [];
  }

  push (button) {
    this.buttons.push(button);
    const windowElement = window.frameElement ? window.frameElement.contentWindow : window;
    if (button === windowElement.document.activeElement || button.checked || this.selected === undefined) this.selected = button;
  }

  keep (button) {
    return this.selected === button;
  }
}

class ModalsGroup extends api.core.DisclosuresGroup {
  constructor () {
    super('Modal', false);
    this.focusTrap = new FocusTrap();
  }

  static get instanceClassName () {
    return 'ModalsGroup';
  }

  apply (value, initial) {
    super.apply(value, initial);
    if (this.current === null) this.focusTrap.untrap();
    else this.focusTrap.trap(this.current.node);
  }
}

const OFFSET = 32; // 32px => 8v => 2rem

class ModalBody extends api.core.Instance {
  static get instanceClassName () {
    return 'ModalBody';
  }

  init () {
    this.listen('scroll', this.divide.bind(this));
  }

  divide () {
    if (this.node.scrollHeight > this.node.clientHeight) {
      if (this.node.offsetHeight + this.node.scrollTop >= this.node.scrollHeight) {
        this.removeClass(ModalSelector.SCROLL_DIVIDER);
      } else {
        this.addClass(ModalSelector.SCROLL_DIVIDER);
      }
    } else {
      this.removeClass(ModalSelector.SCROLL_DIVIDER);
    }
  }

  resize () {
    this.adjust();
    this.request(this.adjust.bind(this));
  }

  adjust () {
    const iframe = window.frameElement;
    const windowElement = iframe ? iframe.contentWindow : window;
    const offset = OFFSET * (this.isBreakpoint(api.core.Breakpoints.MD) ? 2 : 1);
    if (this.isLegacy) this.style.maxHeight = `${windowElement.innerHeight - offset}px`;
    else this.style.setProperty('--modal-max-height', `${windowElement.innerHeight - offset}px`);
    this.divide();
  }
}

api.modal = {
  Modal: Modal,
  ModalButton: ModalButton,
  ModalBody: ModalBody,
  ModalsGroup: ModalsGroup,
  ModalSelector: ModalSelector
};

api.internals.register(api.modal.ModalSelector.MODAL, api.modal.Modal);
api.internals.register(api.modal.ModalSelector.BODY, api.modal.ModalBody);
api.internals.register(api.core.RootSelector.ROOT, api.modal.ModalsGroup);
//# sourceMappingURL=modal.module.js.map

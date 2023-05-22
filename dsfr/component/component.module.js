/*! DSFR v1.9.3 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.9.3'
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

const ButtonSelector = {
  EQUISIZED_BUTTON: `${api.internals.ns.selector('btns-group--equisized')} ${api.internals.ns.selector('btn')}`,
  EQUISIZED_GROUP: api.internals.ns.selector('btns-group--equisized')
};

api.button = {
  ButtonSelector: ButtonSelector
};

api.internals.register(api.button.ButtonSelector.EQUISIZED_BUTTON, api.core.Equisized);
api.internals.register(api.button.ButtonSelector.EQUISIZED_GROUP, api.core.EquisizedsGroup);

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

class ToggleInput extends api.core.Instance {
  static get instanceClassName () {
    return 'ToggleInput';
  }

  get isChecked () {
    return this.node.checked;
  }
}

class ToggleStatusLabel extends api.core.Instance {
  static get instanceClassName () {
    return 'ToggleStatusLabel';
  }

  init () {
    this.register(`input[id="${this.getAttribute('for')}"]`, ToggleInput);
    this.update();
    this.isSwappingFont = true;
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      update: scope.update.bind(scope)
    });
  }

  get input () {
    return this.getRegisteredInstances('ToggleInput')[0];
  }

  update () {
    this.node.style.removeProperty('--toggle-status-width');
    const checked = this.input.isChecked;

    const style = getComputedStyle(this.node, ':before');
    let maxWidth = parseFloat(style.width);
    this.input.node.checked = !checked;

    const style2 = getComputedStyle(this.node, ':before');
    const width = parseFloat(style2.width);
    if (width > maxWidth) maxWidth = width;
    this.input.node.checked = checked;

    this.node.style.setProperty('--toggle-status-width', (maxWidth / 16) + 'rem');
  }

  swapFont (families) {
    this.update();
  }
}

const ToggleSelector = {
  STATUS_LABEL: `${api.internals.ns.selector('toggle__label')}${api.internals.ns.attr.selector('checked-label')}${api.internals.ns.attr.selector('unchecked-label')}`
};

// import { ToggleInput } from './script/toggle/toggle-input.js';

api.toggle = {
  ToggleStatusLabel: ToggleStatusLabel,
  ToggleSelector: ToggleSelector
};

api.internals.register(api.toggle.ToggleSelector.STATUS_LABEL, api.toggle.ToggleStatusLabel);

const SidemenuSelector = {
  LIST: api.internals.ns.selector('sidemenu__list'),
  COLLAPSE: `${api.internals.ns.selector('sidemenu__item')} > ${api.internals.ns.selector('collapse')}`
};

class SidemenuList extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'SidemenuList';
  }

  validate (member) {
    return member.node.matches(SidemenuSelector.COLLAPSE);
  }
}

api.sidemenu = {
  SidemenuList: SidemenuList,
  SidemenuSelector: SidemenuSelector
};

api.internals.register(api.sidemenu.SidemenuSelector.LIST, api.sidemenu.SidemenuList);

const ModalSelector = {
  MODAL: api.internals.ns.selector('modal'),
  SCROLL_DIVIDER: api.internals.ns.selector('scroll-divider'),
  BODY: api.internals.ns.selector('modal__body')
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
    this.scrolling = this.resize.bind(this, false);
    this.resizing = this.resize.bind(this, true);
  }

  static get instanceClassName () {
    return 'Modal';
  }

  init () {
    super.init();
    this.listen('click', this.click.bind(this));
    this.listenKey(api.core.KeyCodes.ESCAPE, this.conceal.bind(this, false, false), true, true);
  }

  get body () {
    return this.element.getDescendantInstances('ModalBody', 'Modal')[0];
  }

  click (e) {
    if (e.target === this.node && this.getAttribute(ModalAttribute.CONCEALING_BACKDROP) !== 'false') this.conceal();
  }

  disclose (withhold) {
    if (!super.disclose(withhold)) return false;
    if (this.body) this.body.activate();
    this.isScrollLocked = true;
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('open', 'true');
    return true;
  }

  conceal (withhold, preventFocus) {
    if (!super.conceal(withhold, preventFocus)) return false;
    this.isScrollLocked = false;
    this.removeAttribute('aria-modal');
    this.removeAttribute('open');
    if (this.body) this.body.deactivate();
    return true;
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
  const style = window.getComputedStyle(element);
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
      window.requestAnimationFrame(this.waiting);
      return;
    }

    this.trapping();
  }

  trapping () {
    if (!this.isTrapping) return;
    this.isTrapping = false;
    const focusables = this.focusables;
    if (focusables.length && focusables.indexOf(document.activeElement) === -1) focusables[0].focus();
    this.element.setAttribute('aria-modal', true);
    window.addEventListener('keydown', this.handling);
    document.body.addEventListener('focus', this.focusing, true);
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

    const index = focusables.indexOf(document.activeElement);

    if (e.shiftKey) {
      if (!this.element.contains(document.activeElement) || index < 1) {
        e.preventDefault();
        last.focus();
      } else if (document.activeElement.tabIndex > 0 || focusables[index - 1].tabIndex > 0) {
        e.preventDefault();
        focusables[index - 1].focus();
      }
    } else {
      if (!this.element.contains(document.activeElement) || index === focusables.length - 1 || index === -1) {
        e.preventDefault();
        first.focus();
      } else if (document.activeElement.tabIndex > 0) {
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
    const radios = api.internals.dom.querySelectorAllArray(document.documentElement, 'input[type="radio"]');

    if (radios.length) {
      const groups = {};

      for (const radio of radios) {
        const name = radio.getAttribute('name');
        if (groups[name] === undefined) groups[name] = new RadioButtonGroup(name);
        groups[name].push(radio);
      }

      unordereds = unordereds.filter((unordered) => {
        if (unordered.tagName.toLowerCase() !== 'input' || unordered.getAttribute('type').toLowerCase() !== 'radio') return true;
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
    window.removeEventListener('keydown', this.handling);
    document.body.removeEventListener('focus', this.focusing, true);

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
    if (button === document.activeElement || button.checked || this.selected === undefined) this.selected = button;
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

  activate () {
    this.isResizing = true;
    this.resize();
  }

  deactivate () {
    this.isResizing = false;
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
    const offset = OFFSET * (this.isBreakpoint(api.core.Breakpoints.MD) ? 2 : 1);
    if (this.isLegacy) this.style.maxHeight = `${window.innerHeight - offset}px`;
    else this.style.setProperty('--modal-max-height', `${window.innerHeight - offset}px`);
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

const PasswordEmission = {
  TOGGLE: api.internals.ns.emission('password', 'toggle'),
  ADJUST: api.internals.ns.emission('password', 'adjust')
};

class PasswordToggle extends api.core.Instance {
  static get instanceClassName () {
    return 'PasswordToggle';
  }

  init () {
    this.listen('click', this.toggle.bind(this));
    this.ascend(PasswordEmission.ADJUST, this.width);
    this.isSwappingFont = true;
    this._isChecked = this.isChecked;
  }

  get width () {
    const style = getComputedStyle(this.node.parentNode);
    return parseInt(style.width);
  }

  get isChecked () {
    return this.node.checked;
  }

  set isChecked (value) {
    this._isChecked = value;
    this.ascend(PasswordEmission.TOGGLE, value);
  }

  toggle () {
    this.isChecked = !this._isChecked;
  }

  swapFont (families) {
    this.ascend(PasswordEmission.ADJUST, this.width);
  }
}

class Password extends api.core.Instance {
  static get instanceClassName () {
    return 'Password';
  }

  init () {
    this.addAscent(PasswordEmission.TOGGLE, this.toggle.bind(this));
    this.addAscent(PasswordEmission.ADJUST, this.adjust.bind(this));
  }

  toggle (value) {
    this.descend(PasswordEmission.TOGGLE, value);
  }

  adjust (value) {
    this.descend(PasswordEmission.ADJUST, value);
  }
}

const PasswordSelector = {
  PASSWORD: api.internals.ns.selector('password'),
  INPUT: api.internals.ns.selector('password__input'),
  LABEL: api.internals.ns.selector('password__label'),
  TOOGLE: `${api.internals.ns.selector('password__checkbox')} input[type="checkbox"]`
};

class PasswordInput extends api.core.Instance {
  static get instanceClassName () {
    return 'PasswordInput';
  }

  init () {
    this.addDescent(PasswordEmission.TOGGLE, this.toggle.bind(this));
    this._isRevealed = this.hasAttribute('type') === 'password';
    this.listen('keydown', this.capslock.bind(this)); // for capslock enabled
    this.listen('keyup', this.capslock.bind(this)); // for capslock desabled
  }

  toggle (value) {
    this.isRevealed = value;
    this.setAttribute('type', value ? 'text' : 'password');
  }

  get isRevealed () {
    return this._isRevealed;
  }

  capslock (event) {
    if (event && typeof event.getModifierState !== 'function') return;
    if (event.getModifierState('CapsLock')) {
      this.node.parentNode.setAttribute(api.internals.ns.attr('capslock'), '');
    } else {
      this.node.parentNode.removeAttribute(api.internals.ns.attr('capslock'));
    }
  }

  set isRevealed (value) {
    this._isRevealed = value;
    this.setAttribute('type', value ? 'text' : 'password');
  }
}

class PasswordLabel extends api.core.Instance {
  static get instanceClassName () {
    return 'PasswordLabel';
  }

  init () {
    this.addDescent(PasswordEmission.ADJUST, this.adjust.bind(this));
  }

  adjust (value) {
    const valueREM = Math.ceil(value / 16);
    this.node.style.paddingRight = valueREM + 'rem';
  }
}

api.password = {
  Password: Password,
  PasswordToggle: PasswordToggle,
  PasswordSelector: PasswordSelector,
  PasswordInput: PasswordInput,
  PasswordLabel: PasswordLabel
};

api.internals.register(api.password.PasswordSelector.INPUT, api.password.PasswordInput);
api.internals.register(api.password.PasswordSelector.PASSWORD, api.password.Password);
api.internals.register(api.password.PasswordSelector.TOOGLE, api.password.PasswordToggle);
api.internals.register(api.password.PasswordSelector.LABEL, api.password.PasswordLabel);

const NavigationSelector = {
  NAVIGATION: api.internals.ns.selector('nav'),
  COLLAPSE: `${api.internals.ns.selector('nav__item')} > ${api.internals.ns.selector('collapse')}`,
  ITEM: api.internals.ns.selector('nav__item'),
  ITEM_RIGHT: api.internals.ns('nav__item--align-right'),
  MENU: api.internals.ns.selector('menu')
};

class NavigationItem extends api.core.Instance {
  constructor () {
    super();
    this._isRightAligned = false;
  }

  static get instanceClassName () {
    return 'NavigationItem';
  }

  init () {
    this.addAscent(api.core.DisclosureEmission.ADDED, this.calculate.bind(this));
    this.addAscent(api.core.DisclosureEmission.REMOVED, this.calculate.bind(this));
    this.isResizing = true;
    this.calculate();
  }

  resize () {
    this.calculate();
  }

  calculate () {
    const collapse = this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
    if (collapse && this.isBreakpoint(api.core.Breakpoints.LG) && collapse.element.node.matches(NavigationSelector.MENU)) {
      const right = this.element.node.parentElement.getBoundingClientRect().right; // todo: ne fonctionne que si la nav fait 100% du container
      const width = collapse.element.node.getBoundingClientRect().width;
      const left = this.element.node.getBoundingClientRect().left;
      this.isRightAligned = left + width > right;
    } else this.isRightAligned = false;
  }

  get isRightAligned () {
    return this._isRightAligned;
  }

  set isRightAligned (value) {
    if (this._isRightAligned === value) return;
    this._isRightAligned = value;
    if (value) api.internals.dom.addClass(this.element.node, NavigationSelector.ITEM_RIGHT);
    else api.internals.dom.removeClass(this.element.node, NavigationSelector.ITEM_RIGHT);
  }
}

const NavigationMousePosition = {
  NONE: -1,
  INSIDE: 0,
  OUTSIDE: 1
};

class Navigation extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'Navigation';
  }

  init () {
    super.init();
    this.clicked = false;
    this.out = false;
    this.listen('focusout', this.focusOutHandler.bind(this));
    this.listen('mousedown', this.mouseDownHandler.bind(this));
    this.listen('click', this.clickHandler.bind(this), { capture: true });
  }

  validate (member) {
    return member.element.node.matches(NavigationSelector.COLLAPSE);
  }

  mouseDownHandler (e) {
    if (!this.isBreakpoint(api.core.Breakpoints.LG) || this.index === -1 || !this.current) return;
    this.position = this.current.node.contains(e.target) ? NavigationMousePosition.INSIDE : NavigationMousePosition.OUTSIDE;
    this.requestPosition();
  }

  clickHandler (e) {
    if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) this.index = -1;
  }

  focusOutHandler (e) {
    if (!this.isBreakpoint(api.core.Breakpoints.LG)) return;
    this.out = true;
    this.requestPosition();
  }

  requestPosition () {
    if (this.isRequesting) return;
    this.isRequesting = true;
    this.request(this.getPosition.bind(this));
  }

  getPosition () {
    if (this.out) {
      switch (this.position) {
        case NavigationMousePosition.OUTSIDE:
          this.index = -1;
          break;

        case NavigationMousePosition.INSIDE:
          if (this.current && !this.current.node.contains(document.activeElement)) this.current.focus();
          break;

        default:
          if (this.index > -1 && !this.current.hasFocus) this.index = -1;
      }
    }

    this.request(this.requested.bind(this));
  }

  requested () {
    this.position = NavigationMousePosition.NONE;
    this.out = false;
    this.isRequesting = false;
  }

  get index () { return super.index; }

  set index (value) {
    if (value === -1 && this.current !== null && this.current.hasFocus) this.current.focus();
    super.index = value;
  }
}

api.navigation = {
  Navigation: Navigation,
  NavigationItem: NavigationItem,
  NavigationMousePosition: NavigationMousePosition,
  NavigationSelector: NavigationSelector
};

api.internals.register(api.navigation.NavigationSelector.NAVIGATION, api.navigation.Navigation);
api.internals.register(api.navigation.NavigationSelector.ITEM, api.navigation.NavigationItem);

/**
  * TabButton correspond au bouton cliquable qui change le panel
  * TabButton étend de DisclosureButton qui ajoute/enelve l'attribut aria-selected,
  * Et change l'attributte tabindex a 0 si le boutton est actif (value=true), -1 s'il n'est pas actif (value=false)
 */
class TabButton extends api.core.DisclosureButton {
  constructor () {
    super(api.core.DisclosureType.SELECT);
  }

  static get instanceClassName () {
    return 'TabButton';
  }

  apply (value) {
    super.apply(value);
    if (this.isPrimary) {
      this.setAttribute('tabindex', value ? '0' : '-1');
      if (value) {
        if (this.list) this.list.focalize(this);
      }
    }
  }

  get list () {
    return this.element.getAscendantInstance('TabsList', 'TabsGroup');
  }
}

const TabSelector = {
  TAB: api.internals.ns.selector('tabs__tab'),
  GROUP: api.internals.ns.selector('tabs'),
  PANEL: api.internals.ns.selector('tabs__panel'),
  LIST: api.internals.ns.selector('tabs__list'),
  SHADOW: api.internals.ns.selector('tabs__shadow'),
  SHADOW_LEFT: api.internals.ns.selector('tabs__shadow--left'),
  SHADOW_RIGHT: api.internals.ns.selector('tabs__shadow--right'),
  PANEL_START: api.internals.ns.selector('tabs__panel--direction-start'),
  PANEL_END: api.internals.ns.selector('tabs__panel--direction-end')
};

const TabPanelDirection = {
  START: 'direction-start',
  END: 'direction-end',
  NONE: 'none'
};

/**
  * Tab coorespond au panel d'un élement Tabs (tab panel)
  * Tab étend disclosure qui ajoute/enleve le modifier --selected,
  * et ajoute/eleve l'attribut hidden, sur le panel
  */
class TabPanel extends api.core.Disclosure {
  constructor () {
    super(api.core.DisclosureType.SELECT, TabSelector.PANEL, TabButton, 'TabsGroup');
    this._direction = TabPanelDirection.NONE;
    this._isPreventingTransition = false;
  }

  static get instanceClassName () {
    return 'TabPanel';
  }

  get direction () {
    return this._direction;
  }

  set direction (value) {
    if (value === this._direction) return;
    switch (this._direction) {
      case TabPanelDirection.START:
        this.removeClass(TabSelector.PANEL_START);
        break;

      case TabPanelDirection.END:
        this.removeClass(TabSelector.PANEL_END);
        break;

      case TabPanelDirection.NONE:
        break;

      default:
        return;
    }

    this._direction = value;

    switch (this._direction) {
      case TabPanelDirection.START:
        this.addClass(TabSelector.PANEL_START);
        break;

      case TabPanelDirection.END:
        this.addClass(TabSelector.PANEL_END);
        break;
    }
  }

  get isPreventingTransition () {
    return this._isPreventingTransition;
  }

  set isPreventingTransition (value) {
    if (this._isPreventingTransition === value) return;
    if (value) this.addClass(api.internals.motion.TransitionSelector.NONE);
    else this.removeClass(api.internals.motion.TransitionSelector.NONE);
    this._isPreventingTransition = value === true;
  }

  translate (direction, initial) {
    this.isPreventingTransition = initial;
    this.direction = direction;
  }

  reset () {
    this.group.index = 0;
  }
}

/**
* TabGroup est la classe étendue de DiscosuresGroup
* Correspond à un objet Tabs avec plusieurs tab-button & Tab (panel)
*/
class TabsGroup extends api.core.DisclosuresGroup {
  constructor () {
    super('TabPanel');
  }

  static get instanceClassName () {
    return 'TabsGroup';
  }

  init () {
    super.init();
    this.listen('transitionend', this.transitionend.bind(this));
    this.listenKey(api.core.KeyCodes.RIGHT, this.pressRight.bind(this), true, true);
    this.listenKey(api.core.KeyCodes.LEFT, this.pressLeft.bind(this), true, true);
    this.listenKey(api.core.KeyCodes.HOME, this.pressHome.bind(this), true, true);
    this.listenKey(api.core.KeyCodes.END, this.pressEnd.bind(this), true, true);
    this.isRendering = true;

    if (this.list) this.list.apply();
  }

  get list () {
    return this.element.getDescendantInstances('TabsList', 'TabsGroup', true)[0];
  }

  transitionend (e) {
    this.isPreventingTransition = true;
  }

  get buttonHasFocus () {
    return this.members.some(member => member.buttonHasFocus);
  }

  /**
   * Selectionne l'element suivant de la liste si on est sur un bouton
   * Si on est à la fin on retourne au début
   */
  pressRight () {
    if (this.buttonHasFocus) {
      if (this.index < this.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }

      this.focus();
    }
  };

  /**
   * Selectionne l'element précédent de la liste si on est sur un bouton
   * Si on est au debut retourne a la fin
   */
  pressLeft () {
    if (this.buttonHasFocus) {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.length - 1;
      }

      this.focus();
    }
  };

  /**
   * Selectionne le permier element de la liste si on est sur un bouton
   */
  pressHome () {
    if (this.buttonHasFocus) {
      this.index = 0;
      this.focus();
    }
  };

  /**
   * Selectionne le dernier element de la liste si on est sur un bouton
   */
  pressEnd () {
    if (this.buttonHasFocus) {
      this.index = this.length - 1;
      this.focus();
    }
  };

  focus () {
    if (this.current) {
      this.current.focus();
    }
  }

  apply () {
    for (let i = 0; i < this._index; i++) this.members[i].translate(TabPanelDirection.START);
    this.current.translate(TabPanelDirection.NONE);
    for (let i = this._index + 1; i < this.length; i++) this.members[i].translate(TabPanelDirection.END);
    this.isPreventingTransition = false;
  }

  get isPreventingTransition () {
    return this._isPreventingTransition;
  }

  set isPreventingTransition (value) {
    if (this._isPreventingTransition === value) return;
    if (value) this.addClass(api.internals.motion.TransitionSelector.NONE);
    else this.removeClass(api.internals.motion.TransitionSelector.NONE);
    this._isPreventingTransition = value === true;
  }

  render () {
    if (this.current === null) return;
    const paneHeight = Math.round(this.current.node.offsetHeight);
    if (this.panelHeight === paneHeight) return;
    this.panelHeight = paneHeight;
    let listHeight = 0;
    if (this.list) listHeight = this.list.node.offsetHeight;
    this.style.setProperty('--tabs-height', (this.panelHeight + listHeight) + 'px');
  }
}

const FOCALIZE_OFFSET = 16;
const SCROLL_OFFSET$1 = 16; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

class TabsList extends api.core.Instance {
  static get instanceClassName () {
    return 'TabsList';
  }

  init () {
    this.listen('scroll', this.scroll.bind(this));
    this.isResizing = true;
  }

  get group () {
    return this.element.getAscendantInstance('TabsGroup', 'TabsList');
  }

  focalize (btn) {
    const btnRect = btn.getRect();
    const listRect = this.getRect();
    const actualScroll = this.node.scrollLeft;
    if (btnRect.left < listRect.left) this.node.scrollTo(actualScroll - listRect.left + btnRect.left - FOCALIZE_OFFSET, 0);
    else if (btnRect.right > listRect.right) this.node.scrollTo(actualScroll - listRect.right + btnRect.right + FOCALIZE_OFFSET, 0);
  }

  get isScrolling () {
    return this._isScrolling;
  }

  set isScrolling (value) {
    if (this._isScrolling === value) return;
    this._isScrolling = value;
    this.apply();
  }

  apply () {
    if (!this.group) return;
    if (this._isScrolling) {
      this.group.addClass(TabSelector.SHADOW);
      this.scroll();
    } else {
      this.group.removeClass(TabSelector.SHADOW_RIGHT);
      this.group.removeClass(TabSelector.SHADOW_LEFT);
      this.group.removeClass(TabSelector.SHADOW);
    }
  }

  /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
  scroll () {
    if (!this.group) return;
    const scrollLeft = this.node.scrollLeft;
    const isMin = scrollLeft <= SCROLL_OFFSET$1;
    const max = this.node.scrollWidth - this.node.clientWidth - SCROLL_OFFSET$1;

    const isMax = Math.abs(scrollLeft) >= max;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const minSelector = isRtl ? TabSelector.SHADOW_RIGHT : TabSelector.SHADOW_LEFT;
    const maxSelector = isRtl ? TabSelector.SHADOW_LEFT : TabSelector.SHADOW_RIGHT;

    if (isMin) {
      this.group.removeClass(minSelector);
    } else {
      this.group.addClass(minSelector);
    }

    if (isMax) {
      this.group.removeClass(maxSelector);
    } else {
      this.group.addClass(maxSelector);
    }
  }

  resize () {
    this.isScrolling = this.node.scrollWidth > this.node.clientWidth + SCROLL_OFFSET$1;
    this.setProperty('--tab-list-height', `${this.getRect().height}px`);
  }

  dispose () {
    this.isScrolling = false;
  }
}

api.tab = {
  TabPanel: TabPanel,
  TabButton: TabButton,
  TabsGroup: TabsGroup,
  TabsList: TabsList,
  TabSelector: TabSelector
};

api.internals.register(api.tab.TabSelector.PANEL, api.tab.TabPanel);
api.internals.register(api.tab.TabSelector.GROUP, api.tab.TabsGroup);
api.internals.register(api.tab.TabSelector.LIST, api.tab.TabsList);

const TableEmission = {
  SCROLLABLE: api.internals.ns.emission('table', 'scrollable'),
  CHANGE: api.internals.ns.emission('table', 'change'),
  CAPTION_HEIGHT: api.internals.ns.emission('table', 'captionheight')
};

const PADDING = '1rem'; // padding de 4v sur le caption

class Table extends api.core.Instance {
  static get instanceClassName () {
    return 'Table';
  }

  init () {
    this.addAscent(TableEmission.CAPTION_HEIGHT, this.setCaptionHeight.bind(this));
  }

  setCaptionHeight (value) {
    this.setProperty('--table-offset', `calc(${value}px + ${PADDING})`);
  }
}

const TableSelector = {
  TABLE: api.internals.ns.selector('table'),
  SHADOW: api.internals.ns.selector('table__shadow'),
  SHADOW_LEFT: api.internals.ns.selector('table__shadow--left'),
  SHADOW_RIGHT: api.internals.ns.selector('table__shadow--right'),
  ELEMENT: `${api.internals.ns.selector('table')}:not(${api.internals.ns.selector('table--no-scroll')}) table`,
  CAPTION: `${api.internals.ns.selector('table')} table caption`
};

const SCROLL_OFFSET = 8; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

class TableElement extends api.core.Instance {
  static get instanceClassName () {
    return 'TableElement';
  }

  init () {
    this.listen('scroll', this.scroll.bind(this));
    this.content = this.querySelector('tbody');
    this.isResizing = true;
  }

  get isScrolling () {
    return this._isScrolling;
  }

  set isScrolling (value) {
    if (this._isScrolling === value) return;
    this._isScrolling = value;

    if (value) {
      this.addClass(TableSelector.SHADOW);
      this.scroll();
    } else {
      this.removeClass(TableSelector.SHADOW);
      this.removeClass(TableSelector.SHADOW_LEFT);
      this.removeClass(TableSelector.SHADOW_RIGHT);
    }
  }

  /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
  scroll () {
    const isMin = this.node.scrollLeft <= SCROLL_OFFSET;
    const max = this.content.offsetWidth - this.node.offsetWidth - SCROLL_OFFSET;
    const isMax = Math.abs(this.node.scrollLeft) >= max;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const minSelector = isRtl ? TableSelector.SHADOW_RIGHT : TableSelector.SHADOW_LEFT;
    const maxSelector = isRtl ? TableSelector.SHADOW_LEFT : TableSelector.SHADOW_RIGHT;

    if (isMin) {
      this.removeClass(minSelector);
    } else {
      this.addClass(minSelector);
    }

    if (isMax) {
      this.removeClass(maxSelector);
    } else {
      this.addClass(maxSelector);
    }
  }

  resize () {
    this.isScrolling = this.content.offsetWidth > this.node.offsetWidth;
  }

  dispose () {
    this.isScrolling = false;
  }
}

class TableCaption extends api.core.Instance {
  static get instanceClassName () {
    return 'TableCaption';
  }

  init () {
    this.height = 0;
    this.isResizing = true;
  }

  resize () {
    const height = this.getRect().height;
    if (this.height === height) return;
    this.height = height;
    this.ascend(TableEmission.CAPTION_HEIGHT, height);
  }
}

api.table = {
  Table: Table,
  TableElement: TableElement,
  TableCaption: TableCaption,
  TableSelector: TableSelector
};

api.internals.register(api.table.TableSelector.TABLE, api.table.Table);
api.internals.register(api.table.TableSelector.ELEMENT, api.table.TableElement);
api.internals.register(api.table.TableSelector.CAPTION, api.table.TableCaption);

const TagEvent = {
  DISMISS: api.internals.ns.event('dismiss')
};

class TagDismissible extends api.core.Instance {
  static get instanceClassName () {
    return 'TagDismissible';
  }

  init () {
    this.listen('click', this.click.bind(this));
  }

  click () {
    this.focusClosest();

    switch (api.mode) {
      case api.Modes.ANGULAR:
      case api.Modes.REACT:
      case api.Modes.VUE:
        this.request(this.verify.bind(this));
        break;

      default:
        this.remove();
    }

    this.dispatch(TagEvent.DISMISS);
  }

  verify () {
    if (document.body.contains(this.node)) api.inspector.warn(`a TagDismissible has just been dismissed and should be removed from the dom. In ${api.mode} mode, the api doesn't handle dom modification. An event ${TagEvent.DISMISS} is dispatched by the element to trigger the removal`);
  }
}

const TagSelector = {
  PRESSABLE: `${api.internals.ns.selector('tag')}[aria-pressed]`,
  DISMISSIBLE: `${api.internals.ns.selector('tag--dismiss')}`
};

api.tag = {
  TagDismissible: TagDismissible,
  TagSelector: TagSelector,
  TagEvent: TagEvent
};

api.internals.register(api.tag.TagSelector.PRESSABLE, api.core.Toggle);
api.internals.register(api.tag.TagSelector.DISMISSIBLE, api.tag.TagDismissible);

const DownloadSelector = {
  DOWNLOAD_ASSESS_FILE: `${api.internals.ns.attr.selector('assess-file')}`,
  DOWNLOAD_DETAIL: `${api.internals.ns.selector('download__detail')}`
};

class AssessFile extends api.core.Instance {
  static get instanceClassName () {
    return 'AssessFile';
  }

  init () {
    this.lang = this.getLang(this.node);
    this.href = this.getAttribute('href');

    this.hreflang = this.getAttribute('hreflang');
    this.file = {};
    this.detail = this.querySelector(DownloadSelector.DOWNLOAD_DETAIL);
    this.update();
  }

  getFileLength () {
    if (this.href === undefined) {
      this.length = -1;
      return;
    }

    fetch(this.href, { method: 'HEAD', mode: 'cors' }).then(response => {
      this.length = response.headers.get('content-length') || -1;
      if (this.length === -1) {
        api.inspector.warn('File size unknown: ' + this.href + '\nUnable to get HTTP header: "content-length"');
      }
      this.update();
    });
  }

  update () {
    // TODO V2: implémenter async
    if (this.isLegacy) this.length = -1;

    if (!this.length) {
      this.getFileLength();
      return;
    }

    const details = [];
    if (this.detail) {
      if (this.href) {
        const extension = this.parseExtension(this.href);
        if (extension) details.push(extension.toUpperCase());
      }

      if (this.length !== -1) {
        details.push(this.bytesToSize(this.length));
      }

      if (this.hreflang) {
        details.push(this.getLangDisplayName(this.hreflang));
      }

      this.detail.innerHTML = details.join(' - ');
    }
  }

  getLang (elem) {
    if (elem.lang) return elem.lang;
    if (document.documentElement === elem) return window.navigator.language;
    return this.getLang(elem.parentElement);
  }

  parseExtension (url) {
    const regexExtension = /\.(\w{1,9})(?:$|[?#])/;
    return url.match(regexExtension)[0].replace('.', '');
  }

  getLangDisplayName (locale) {
    if (this.isLegacy) return locale;
    const displayNames = new Intl.DisplayNames([this.lang], { type: 'language' });
    const name = displayNames.of(locale);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  bytesToSize (bytes) {
    if (bytes === -1) return null;

    let sizeUnits = ['octets', 'ko', 'Mo', 'Go', 'To'];
    if (this.getAttribute(api.internals.ns.attr('assess-file')) === 'bytes') {
      sizeUnits = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
    if (i === 0) return `${bytes} ${sizeUnits[i]}`;

    const size = bytes / (1000 ** i);
    const roundedSize = Math.round((size + Number.EPSILON) * 100) / 100; // arrondi a 2 décimal
    const stringSize = String(roundedSize).replace('.', ',');

    return `${stringSize} ${sizeUnits[i]}`;
  }
}

api.download = {
  DownloadSelector: DownloadSelector,
  AssessFile: AssessFile

};

api.internals.register(api.download.DownloadSelector.DOWNLOAD_ASSESS_FILE, api.download.AssessFile);

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
    let toolsHtmlDuplicateId = toolsHtml.replace(/(<nav[.\s\S]*-translate [.\s\S]*) id="(.*?)"([.\s\S]*<\/nav>)/gm, '$1 id="$2' + copySuffix + '"$3');
    toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace(/(<nav[.\s\S]*-translate [.\s\S]*) aria-controls="(.*?)"([.\s\S]*<\/nav>)/gm, '$1 aria-controls="$2' + copySuffix + '"$3');

    if (toolsHtmlDuplicateId === menuHtml) return;

    switch (api.mode) {
      case api.Modes.ANGULAR:
      case api.Modes.REACT:
      case api.Modes.VUE:
        api.inspector.warn(`header__tools-links content is different from header__menu-links content.
As you're using a dynamic framework, you should handle duplication of this content yourself, please refer to documentation:
${api.header.doc}`);
        break;

      default:
        this.menuLinks.innerHTML = toolsHtmlDuplicateId;
    }
  }
}

class HeaderModal extends api.core.Instance {
  constructor () {
    super();
    this._clickHandling = this.clickHandler.bind(this);
  }

  static get instanceClassName () {
    return 'HeaderModal';
  }

  init () {
    this.isResizing = true;
  }

  resize () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this.unqualify();
    else this.qualify();
  }

  qualify () {
    this.setAttribute('role', 'dialog');
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    const buttons = modal.buttons;
    let id = '';
    for (const button of buttons) {
      id = button.id || id;
      if (button.isPrimary && id) break;
    }
    this.setAttribute('aria-labelledby', id);
    this.listen('click', this._clickHandling, { capture: true });
  }

  unqualify () {
    const modal = this.element.getInstance('Modal');
    if (modal) modal.conceal();
    this.removeAttribute('role');
    this.removeAttribute('aria-labelledby');
    this.unlisten('click', this._clickHandling, { capture: true });
  }

  clickHandler (e) {
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

const DisplaySelector = {
  DISPLAY: api.internals.ns.selector('display'),
  RADIO_BUTTONS: `input[name="${api.internals.ns('radios-theme')}"]`,
  FIELDSET: api.internals.ns.selector('fieldset')
};

class Display extends api.core.Instance {
  static get instanceClassName () {
    return 'Display';
  }

  init () {
    this.radios = this.querySelectorAll(DisplaySelector.RADIO_BUTTONS);

    if (api.scheme) {
      this.changing = this.change.bind(this);
      for (const radio of this.radios) radio.addEventListener('change', this.changing);
      this.addDescent(api.scheme.SchemeEmission.SCHEME, this.apply.bind(this));
      this.ascend(api.scheme.SchemeEmission.ASK);
    } else {
      this.querySelector(DisplaySelector.FIELDSET).setAttribute('disabled', '');
    }
  }

  get scheme () {
    return this._scheme;
  }

  set scheme (value) {
    if (this._scheme === value || !api.scheme) return;
    switch (value) {
      case api.scheme.SchemeValue.SYSTEM:
      case api.scheme.SchemeValue.LIGHT:
      case api.scheme.SchemeValue.DARK:
        this._scheme = value;
        for (const radio of this.radios) {
          radio.checked = radio.value === value;
        }
        this.ascend(api.scheme.SchemeEmission.SCHEME, value);
        break;
    }
  }

  change () {
    for (const radio of this.radios) {
      if (radio.checked) {
        this.scheme = radio.value;
        return;
      }
    }
  }

  apply (value) {
    this.scheme = value;
  }

  dispose () {
    for (const radio of this.radios) radio.removeEventListener('change', this.changing);
  }
}

api.display = {
  Display: Display,
  DisplaySelector: DisplaySelector
};

api.internals.register(api.display.DisplaySelector.DISPLAY, api.display.Display);
//# sourceMappingURL=component.module.js.map

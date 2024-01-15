/*! DSFR v1.11.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.11.0'
  };

  var api = window[config.namespace];

  var ModalSelector = {
    MODAL: api.internals.ns.selector('modal'),
    SCROLL_DIVIDER: api.internals.ns.selector('scroll-divider'),
    BODY: api.internals.ns.selector('modal__body'),
    TITLE: api.internals.ns.selector('modal__title')
  };

  var ModalButton = /*@__PURE__*/(function (superclass) {
    function ModalButton () {
      superclass.call(this, api.core.DisclosureType.OPENED);
    }

    if ( superclass ) ModalButton.__proto__ = superclass;
    ModalButton.prototype = Object.create( superclass && superclass.prototype );
    ModalButton.prototype.constructor = ModalButton;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalButton';
    };

    Object.defineProperties( ModalButton, staticAccessors );

    return ModalButton;
  }(api.core.DisclosureButton));

  var ModalAttribute = {
    CONCEALING_BACKDROP: api.internals.ns.attr('concealing-backdrop')
  };

  var Modal = /*@__PURE__*/(function (superclass) {
    function Modal () {
      superclass.call(this, api.core.DisclosureType.OPENED, ModalSelector.MODAL, ModalButton, 'ModalsGroup');
      this._isActive = false;
      this.scrolling = this.resize.bind(this, false);
      this.resizing = this.resize.bind(this, true);
    }

    if ( superclass ) Modal.__proto__ = superclass;
    Modal.prototype = Object.create( superclass && superclass.prototype );
    Modal.prototype.constructor = Modal;

    var prototypeAccessors = { body: { configurable: true },isDialog: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Modal';
    };

    Modal.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this._isDialog = this.node.tagName === 'DIALOG';
      this.isScrolling = false;
      this.listenClick();
      this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
    };

    Modal.prototype._keydown = function _keydown (keyCode) {
      switch (keyCode) {
        case api.core.KeyCodes.ESCAPE:
          this._escape();
          break;
      }
    };

    // TODO v2 : passer les tagName d'action en constante
    Modal.prototype._escape = function _escape () {
      var tagName = document.activeElement ? document.activeElement.tagName : undefined;

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
    };

    Modal.prototype.retrieved = function retrieved () {
      this._ensureAccessibleName();
    };

    prototypeAccessors.body.get = function () {
      return this.element.getDescendantInstances('ModalBody', 'Modal')[0];
    };

    Modal.prototype.handleClick = function handleClick (e) {
      if (e.target === this.node && this.getAttribute(ModalAttribute.CONCEALING_BACKDROP) !== 'false') { this.conceal(); }
    };

    Modal.prototype.disclose = function disclose (withhold) {
      if (!superclass.prototype.disclose.call(this, withhold)) { return false; }
      if (this.body) { this.body.activate(); }
      this.isScrollLocked = true;
      this.setAttribute('aria-modal', 'true');
      this.setAttribute('open', 'true');
      if (!this._isDialog) {
        this.activateModal();
      }
      return true;
    };

    Modal.prototype.conceal = function conceal (withhold, preventFocus) {
      if (!superclass.prototype.conceal.call(this, withhold, preventFocus)) { return false; }
      this.isScrollLocked = false;
      this.removeAttribute('aria-modal');
      this.removeAttribute('open');
      if (this.body) { this.body.deactivate(); }
      if (!this._isDialog) {
        this.deactivateModal();
      }
      return true;
    };

    prototypeAccessors.isDialog.get = function () {
      return this._isDialog;
    };

    prototypeAccessors.isDialog.set = function (value) {
      this._isDialog = value;
    };

    Modal.prototype.activateModal = function activateModal () {
      if (this._isActive) { return; }
      this._isActive = true;
      this._hasDialogRole = this.getAttribute('role') === 'dialog';
      if (!this._hasDialogRole) { this.setAttribute('role', 'dialog'); }
    };

    Modal.prototype.deactivateModal = function deactivateModal () {
      if (!this._isActive) { return; }
      this._isActive = false;
      if (!this._hasDialogRole) { this.removeAttribute('role'); }
    };

    Modal.prototype._setAccessibleName = function _setAccessibleName (node, append) {
      var id = this.retrieveNodeId(node, append);
      this.warn(("add reference to " + append + " for accessible name (aria-labelledby)"));
      this.setAttribute('aria-labelledby', id);
    };

    Modal.prototype._ensureAccessibleName = function _ensureAccessibleName () {
      if (this.hasAttribute('aria-labelledby') || this.hasAttribute('aria-label')) { return; }
      this.warn('missing accessible name');
      var title = this.node.querySelector(ModalSelector.TITLE);
      var primary = this.primaryButtons[0];

      switch (true) {
        case title !== null:
          this._setAccessibleName(title, 'title');
          break;

        case primary !== undefined:
          this.warn('missing required title, fallback to primary button');
          this._setAccessibleName(primary, 'primary');
          break;
      }
    };

    Object.defineProperties( Modal.prototype, prototypeAccessors );
    Object.defineProperties( Modal, staticAccessors );

    return Modal;
  }(api.core.Disclosure));

  var unordereds = [
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

  var UNORDEREDS = unordereds.join();

  var ordereds = [
    '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
  ];

  var ORDEREDS = ordereds.join();

  var isFocusable = function (element, container) {
    if (!(element instanceof Element)) { return false; }
    var style = window.getComputedStyle(element);
    if (!style) { return false; }
    if (style.visibility === 'hidden') { return false; }
    if (container === undefined) { container = element; }

    while (container.contains(element)) {
      if (style.display === 'none') { return false; }
      element = element.parentElement;
    }

    return true;
  };

  var FocusTrap = function FocusTrap (onTrap, onUntrap) {
    this.element = null;
    this.activeElement = null;
    this.onTrap = onTrap;
    this.onUntrap = onUntrap;
    this.waiting = this.wait.bind(this);
    this.handling = this.handle.bind(this);
    this.focusing = this.maintainFocus.bind(this);
    this.current = null;
  };

  var prototypeAccessors = { trapped: { configurable: true },focusables: { configurable: true } };

  prototypeAccessors.trapped.get = function () { return this.element !== null; };

  FocusTrap.prototype.trap = function trap (element) {
    if (this.trapped) { this.untrap(); }

    this.element = element;
    this.isTrapping = true;
    this.wait();

    if (this.onTrap) { this.onTrap(); }
  };

  FocusTrap.prototype.wait = function wait () {
    if (!isFocusable(this.element)) {
      window.requestAnimationFrame(this.waiting);
      return;
    }

    this.trapping();
  };

  FocusTrap.prototype.trapping = function trapping () {
    if (!this.isTrapping) { return; }
    this.isTrapping = false;
    var focusables = this.focusables;
    if (focusables.length && focusables.indexOf(document.activeElement) === -1) { focusables[0].focus(); }
    this.element.setAttribute('aria-modal', true);
    window.addEventListener('keydown', this.handling);
    document.body.addEventListener('focus', this.focusing, true);
  };

  FocusTrap.prototype.stun = function stun (node) {
    for (var i = 0, list = node.children; i < list.length; i += 1) {
      var child = list[i];

        if (child === this.element) { continue; }
      if (child.contains(this.element)) {
        this.stun(child);
        continue;
      }
      this.stunneds.push(new Stunned(child));
    }
  };

  FocusTrap.prototype.maintainFocus = function maintainFocus (event) {
    if (!this.element.contains(event.target)) {
      var focusables = this.focusables;
      if (focusables.length === 0) { return; }
      var first = focusables[0];
      event.preventDefault();
      first.focus();
    }
  };

  FocusTrap.prototype.handle = function handle (e) {
    if (e.keyCode !== 9) { return; }

    var focusables = this.focusables;
    if (focusables.length === 0) { return; }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    var index = focusables.indexOf(document.activeElement);

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
  };

  prototypeAccessors.focusables.get = function () {
      var this$1$1 = this;

    var unordereds = api.internals.dom.querySelectorAllArray(this.element, UNORDEREDS);

    /**
     *filtrage des radiobutttons de même name (la navigations d'un groupe de radio se fait à la flèche et non pas au tab
     **/
    var radios = api.internals.dom.querySelectorAllArray(document.documentElement, 'input[type="radio"]');

    if (radios.length) {
      var groups = {};

      for (var i = 0, list = radios; i < list.length; i += 1) {
        var radio = list[i];

          var name = radio.getAttribute('name');
        if (groups[name] === undefined) { groups[name] = new RadioButtonGroup(name); }
        groups[name].push(radio);
      }

      unordereds = unordereds.filter(function (unordered) {
        if (unordered.tagName.toLowerCase() !== 'input' || unordered.getAttribute('type').toLowerCase() !== 'radio') { return true; }
        var name = unordered.getAttribute('name');
        return groups[name].keep(unordered);
      });
    }

    var ordereds = api.internals.dom.querySelectorAllArray(this.element, ORDEREDS);

    ordereds.sort(function (a, b) { return a.tabIndex - b.tabIndex; });

    var noDuplicates = unordereds.filter(function (element) { return ordereds.indexOf(element) === -1; });
    var concateneds = ordereds.concat(noDuplicates);
    return concateneds.filter(function (element) { return element.tabIndex !== '-1' && isFocusable(element, this$1$1.element); });
  };

  FocusTrap.prototype.untrap = function untrap () {
    if (!this.trapped) { return; }
    this.isTrapping = false;

    this.element.removeAttribute('aria-modal');
    window.removeEventListener('keydown', this.handling);
    document.body.removeEventListener('focus', this.focusing, true);

    this.element = null;

    if (this.onUntrap) { this.onUntrap(); }
  };

  FocusTrap.prototype.dispose = function dispose () {
    this.untrap();
  };

  Object.defineProperties( FocusTrap.prototype, prototypeAccessors );

  var Stunned = function Stunned (element) {
    this.element = element;
    // this.hidden = element.getAttribute('aria-hidden');
    this.inert = element.getAttribute('inert');

    // this.element.setAttribute('aria-hidden', true);
    this.element.setAttribute('inert', '');
  };

  Stunned.prototype.unstun = function unstun () {
    /*
    if (this.hidden === null) this.element.removeAttribute('aria-hidden');
    else this.element.setAttribute('aria-hidden', this.hidden);
     */

    if (this.inert === null) { this.element.removeAttribute('inert'); }
    else { this.element.setAttribute('inert', this.inert); }
  };

  var RadioButtonGroup = function RadioButtonGroup (name) {
    this.name = name;
    this.buttons = [];
  };

  RadioButtonGroup.prototype.push = function push (button) {
    this.buttons.push(button);
    if (button === document.activeElement || button.checked || this.selected === undefined) { this.selected = button; }
  };

  RadioButtonGroup.prototype.keep = function keep (button) {
    return this.selected === button;
  };

  var ModalsGroup = /*@__PURE__*/(function (superclass) {
    function ModalsGroup () {
      superclass.call(this, 'Modal', false);
      this.focusTrap = new FocusTrap();
    }

    if ( superclass ) ModalsGroup.__proto__ = superclass;
    ModalsGroup.prototype = Object.create( superclass && superclass.prototype );
    ModalsGroup.prototype.constructor = ModalsGroup;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalsGroup';
    };

    ModalsGroup.prototype.apply = function apply (value, initial) {
      superclass.prototype.apply.call(this, value, initial);
      if (this.current === null) { this.focusTrap.untrap(); }
      else { this.focusTrap.trap(this.current.node); }
    };

    Object.defineProperties( ModalsGroup, staticAccessors );

    return ModalsGroup;
  }(api.core.DisclosuresGroup));

  var OFFSET = 32; // 32px => 8v => 2rem

  var ModalBody = /*@__PURE__*/(function (superclass) {
    function ModalBody () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ModalBody.__proto__ = superclass;
    ModalBody.prototype = Object.create( superclass && superclass.prototype );
    ModalBody.prototype.constructor = ModalBody;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalBody';
    };

    ModalBody.prototype.init = function init () {
      this.listen('scroll', this.divide.bind(this));
    };

    ModalBody.prototype.activate = function activate () {
      this.isResizing = true;
      this.resize();
    };

    ModalBody.prototype.deactivate = function deactivate () {
      this.isResizing = false;
    };

    ModalBody.prototype.divide = function divide () {
      if (this.node.scrollHeight > this.node.clientHeight) {
        if (this.node.offsetHeight + this.node.scrollTop >= this.node.scrollHeight) {
          this.removeClass(ModalSelector.SCROLL_DIVIDER);
        } else {
          this.addClass(ModalSelector.SCROLL_DIVIDER);
        }
      } else {
        this.removeClass(ModalSelector.SCROLL_DIVIDER);
      }
    };

    ModalBody.prototype.resize = function resize () {
      this.adjust();
      this.request(this.adjust.bind(this));
    };

    ModalBody.prototype.adjust = function adjust () {
      var offset = OFFSET * (this.isBreakpoint(api.core.Breakpoints.MD) ? 2 : 1);
      if (this.isLegacy) { this.style.maxHeight = (window.innerHeight - offset) + "px"; }
      else { this.style.setProperty('--modal-max-height', ((window.innerHeight - offset) + "px")); }
      this.divide();
    };

    Object.defineProperties( ModalBody, staticAccessors );

    return ModalBody;
  }(api.core.Instance));

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

})();
//# sourceMappingURL=modal.nomodule.js.map

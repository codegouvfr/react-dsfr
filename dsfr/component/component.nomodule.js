/*! DSFR v1.10.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.10.1'
  };

  var api = window[config.namespace];

  var ACCORDION = api.internals.ns.selector('accordion');
  var COLLAPSE$2 = api.internals.ns.selector('collapse');

  var AccordionSelector = {
    GROUP: api.internals.ns.selector('accordions-group'),
    ACCORDION: ACCORDION,
    COLLAPSE: (ACCORDION + " > " + COLLAPSE$2 + ", " + ACCORDION + " > *:not(" + ACCORDION + ", " + COLLAPSE$2 + ") > " + COLLAPSE$2 + ", " + ACCORDION + " > *:not(" + ACCORDION + ", " + COLLAPSE$2 + ") > *:not(" + ACCORDION + ", " + COLLAPSE$2 + ") > " + COLLAPSE$2),
    COLLAPSE_LEGACY: (ACCORDION + " " + COLLAPSE$2),
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

  var ButtonSelector = {
    EQUISIZED_BUTTON: ((api.internals.ns.selector('btns-group--equisized')) + " " + (api.internals.ns.selector('btn'))),
    EQUISIZED_GROUP: api.internals.ns.selector('btns-group--equisized')
  };

  api.button = {
    ButtonSelector: ButtonSelector
  };

  api.internals.register(api.button.ButtonSelector.EQUISIZED_BUTTON, api.core.Equisized);
  api.internals.register(api.button.ButtonSelector.EQUISIZED_GROUP, api.core.EquisizedsGroup);

  var CardDownload = /*@__PURE__*/(function (superclass) {
    function CardDownload () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) CardDownload.__proto__ = superclass;
    CardDownload.prototype = Object.create( superclass && superclass.prototype );
    CardDownload.prototype.constructor = CardDownload;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CardDownload';
    };

    CardDownload.prototype.init = function init () {
      var this$1$1 = this;

      this.addAscent(api.core.AssessEmission.UPDATE, function (details) {
        this$1$1.descend(api.core.AssessEmission.UPDATE, details);
      });
      this.addAscent(api.core.AssessEmission.ADDED, function () {
        this$1$1.descend(api.core.AssessEmission.ADDED);
      });
    };

    Object.defineProperties( CardDownload, staticAccessors );

    return CardDownload;
  }(api.core.Instance));

  var CardSelector = {
    DOWNLOAD: api.internals.ns.selector('card--download'),
    DOWNLOAD_DETAIL: ((api.internals.ns.selector('card--download')) + " " + (api.internals.ns.selector('card__end')) + " " + (api.internals.ns.selector('card__detail')))
  };

  api.card = {
    CardSelector: CardSelector,
    CardDownload: CardDownload
  };

  api.internals.register(api.card.CardSelector.DOWNLOAD, api.card.CardDownload);
  api.internals.register(api.card.CardSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

  var BreadcrumbSelector = {
    BREADCRUMB: api.internals.ns.selector('breadcrumb'),
    BUTTON: api.internals.ns.selector('breadcrumb__button')
  };

  var Breadcrumb = /*@__PURE__*/(function (superclass) {
    function Breadcrumb () {
      superclass.call(this);
      this.count = 0;
      this.focusing = this.focus.bind(this);
    }

    if ( superclass ) Breadcrumb.__proto__ = superclass;
    Breadcrumb.prototype = Object.create( superclass && superclass.prototype );
    Breadcrumb.prototype.constructor = Breadcrumb;

    var prototypeAccessors = { proxy: { configurable: true },links: { configurable: true },collapse: { configurable: true },collapsePrimary: { configurable: true } };
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

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(BreadcrumbSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Breadcrumb.prototype, prototypeAccessors );
    Object.defineProperties( Breadcrumb, staticAccessors );

    return Breadcrumb;
  }(api.core.Instance));

  api.breadcrumb = {
    BreadcrumbSelector: BreadcrumbSelector,
    Breadcrumb: Breadcrumb
  };

  api.internals.register(api.breadcrumb.BreadcrumbSelector.BREADCRUMB, api.breadcrumb.Breadcrumb);

  var TooltipSelector = {
    TOOLTIP: api.internals.ns.selector('tooltip'),
    SHOWN: api.internals.ns.selector('tooltip--shown'),
    BUTTON: api.internals.ns.selector('btn--tooltip')
  };

  var TooltipReferentState = {
    FOCUS: 1 << 0,
    HOVER: 1 << 1
  };

  var TooltipReferent = /*@__PURE__*/(function (superclass) {
    function TooltipReferent () {
      superclass.call(this);
      this._state = 0;
    }

    if ( superclass ) TooltipReferent.__proto__ = superclass;
    TooltipReferent.prototype = Object.create( superclass && superclass.prototype );
    TooltipReferent.prototype.constructor = TooltipReferent;

    var prototypeAccessors = { state: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TooltipReferent';
    };

    TooltipReferent.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.listen('focusin', this.focusIn.bind(this));
      this.listen('focusout', this.focusOut.bind(this));
      if (!this.matches(TooltipSelector.BUTTON)) {
        var mouseover = this.mouseover.bind(this);
        this.listen('mouseover', mouseover);
        this.placement.listen('mouseover', mouseover);
        var mouseout = this.mouseout.bind(this);
        this.listen('mouseout', mouseout);
        this.placement.listen('mouseout', mouseout);
      }
      this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
      this.listen('click', this._click.bind(this));
      this.addEmission(api.core.RootEmission.CLICK, this._clickOut.bind(this));
    };

    TooltipReferent.prototype._click = function _click () {
      this.focus();
    };

    TooltipReferent.prototype._clickOut = function _clickOut (target) {
      if (!this.node.contains(target)) { this.blur(); }
    };

    TooltipReferent.prototype._keydown = function _keydown (keyCode) {
      switch (keyCode) {
        case api.core.KeyCodes.ESCAPE:
          this.blur();
          this.close();
          break;
      }
    };

    TooltipReferent.prototype.close = function close () {
      this.state = 0;
    };

    prototypeAccessors.state.get = function () {
      return this._state;
    };

    prototypeAccessors.state.set = function (value) {
      if (this._state === value) { return; }
      this.isShown = value > 0;
      this._state = value;
    };

    TooltipReferent.prototype.focusIn = function focusIn () {
      this.state |= TooltipReferentState.FOCUS;
    };

    TooltipReferent.prototype.focusOut = function focusOut () {
      this.state &= ~TooltipReferentState.FOCUS;
    };

    TooltipReferent.prototype.mouseover = function mouseover () {
      this.state |= TooltipReferentState.HOVER;
    };

    TooltipReferent.prototype.mouseout = function mouseout () {
      this.state &= ~TooltipReferentState.HOVER;
    };

    Object.defineProperties( TooltipReferent.prototype, prototypeAccessors );
    Object.defineProperties( TooltipReferent, staticAccessors );

    return TooltipReferent;
  }(api.core.PlacementReferent));

  var ns = function (name) { return ((config.prefix) + "-" + name); };

  ns.selector = function (name, notation) {
    if (notation === undefined) { notation = '.'; }
    return ("" + notation + (ns(name)));
  };

  ns.attr = function (name) { return ("data-" + (ns(name))); };

  ns.attr.selector = function (name, value) {
    var result = ns.attr(name);
    if (value !== undefined) { result += "=\"" + value + "\""; }
    return ("[" + result + "]");
  };

  ns.event = function (type) { return ((config.namespace) + "." + type); };

  ns.emission = function (domain, type) { return ("emission:" + domain + "." + type); };

  var TooltipEvent = {
    SHOW: ns.event('show'),
    HIDE: ns.event('hide')
  };

  var TooltipState = {
    HIDDEN: 'hidden',
    SHOWN: 'shown',
    HIDING: 'hiding'
  };

  var Tooltip = /*@__PURE__*/(function (superclass) {
    function Tooltip () {
      superclass.call(this, api.core.PlacementMode.AUTO, [api.core.PlacementPosition.TOP, api.core.PlacementPosition.BOTTOM], [api.core.PlacementAlign.CENTER, api.core.PlacementAlign.START, api.core.PlacementAlign.END]);
      this.modifier = '';
      this._state = TooltipState.HIDDEN;
    }

    if ( superclass ) Tooltip.__proto__ = superclass;
    Tooltip.prototype = Object.create( superclass && superclass.prototype );
    Tooltip.prototype.constructor = Tooltip;

    var prototypeAccessors = { isShown: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Tooltip';
    };

    Tooltip.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.register(("[aria-describedby=\"" + (this.id) + "\"]"), TooltipReferent);
      this.listen('transitionend', this.transitionEnd.bind(this));
    };

    Tooltip.prototype.transitionEnd = function transitionEnd () {
      if (this._state === TooltipState.HIDING) {
        this._state = TooltipState.HIDDEN;
        this.isShown = false;
      }
    };

    prototypeAccessors.isShown.get = function () {
      return superclass.prototype.isShown;
    };

    prototypeAccessors.isShown.set = function (value) {
      if (!this.isEnabled) { return; }
      switch (true) {
        case value:
          this._state = TooltipState.SHOWN;
          this.addClass(TooltipSelector.SHOWN);
          this.dispatch(TooltipEvent.SHOW);
          superclass.prototype.isShown = true;
          break;

        case this.isShown && !value && this._state === TooltipState.SHOWN:
          this._state = TooltipState.HIDING;
          this.removeClass(TooltipSelector.SHOWN);
          break;

        case this.isShown && !value && this._state === TooltipState.HIDDEN:
          this.dispatch(TooltipEvent.HIDE);
          superclass.prototype.isShown = false;
          break;
      }
    };

    Tooltip.prototype.render = function render () {
      superclass.prototype.render.call(this);
      var x = this.referentRect.center - this.rect.center;
      var limit = this.rect.width * 0.5 - 8;
      if (x < -limit) { x = -limit; }
      if (x > limit) { x = limit; }
      this.setProperty('--arrow-x', ((x.toFixed(2)) + "px"));
    };

    Object.defineProperties( Tooltip.prototype, prototypeAccessors );
    Object.defineProperties( Tooltip, staticAccessors );

    return Tooltip;
  }(api.core.Placement));

  api.tooltip = {
    Tooltip: Tooltip,
    TooltipSelector: TooltipSelector,
    TooltipEvent: TooltipEvent
  };

  api.internals.register(api.tooltip.TooltipSelector.TOOLTIP, api.tooltip.Tooltip);

  var ToggleInput = /*@__PURE__*/(function (superclass) {
    function ToggleInput () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ToggleInput.__proto__ = superclass;
    ToggleInput.prototype = Object.create( superclass && superclass.prototype );
    ToggleInput.prototype.constructor = ToggleInput;

    var prototypeAccessors = { isChecked: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ToggleInput';
    };

    prototypeAccessors.isChecked.get = function () {
      return this.node.checked;
    };

    Object.defineProperties( ToggleInput.prototype, prototypeAccessors );
    Object.defineProperties( ToggleInput, staticAccessors );

    return ToggleInput;
  }(api.core.Instance));

  var ToggleStatusLabel = /*@__PURE__*/(function (superclass) {
    function ToggleStatusLabel () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ToggleStatusLabel.__proto__ = superclass;
    ToggleStatusLabel.prototype = Object.create( superclass && superclass.prototype );
    ToggleStatusLabel.prototype.constructor = ToggleStatusLabel;

    var prototypeAccessors = { proxy: { configurable: true },input: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ToggleStatusLabel';
    };

    ToggleStatusLabel.prototype.init = function init () {
      this.register(("input[id=\"" + (this.getAttribute('for')) + "\"]"), ToggleInput);
      this.update();
      this.isSwappingFont = true;
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, superclass.prototype.proxy, {
        update: scope.update.bind(scope)
      });
    };

    prototypeAccessors.input.get = function () {
      return this.getRegisteredInstances('ToggleInput')[0];
    };

    ToggleStatusLabel.prototype.update = function update () {
      this.node.style.removeProperty('--toggle-status-width');
      var checked = this.input.isChecked;

      var style = getComputedStyle(this.node, ':before');
      var maxWidth = parseFloat(style.width);
      this.input.node.checked = !checked;

      var style2 = getComputedStyle(this.node, ':before');
      var width = parseFloat(style2.width);
      if (width > maxWidth) { maxWidth = width; }
      this.input.node.checked = checked;

      this.node.style.setProperty('--toggle-status-width', (maxWidth / 16) + 'rem');
    };

    ToggleStatusLabel.prototype.swapFont = function swapFont (families) {
      this.update();
    };

    Object.defineProperties( ToggleStatusLabel.prototype, prototypeAccessors );
    Object.defineProperties( ToggleStatusLabel, staticAccessors );

    return ToggleStatusLabel;
  }(api.core.Instance));

  var ToggleSelector = {
    STATUS_LABEL: ("" + (api.internals.ns.selector('toggle__label')) + (api.internals.ns.attr.selector('checked-label')) + (api.internals.ns.attr.selector('unchecked-label')))
  };

  // import { ToggleInput } from './script/toggle/toggle-input.js';

  api.toggle = {
    ToggleStatusLabel: ToggleStatusLabel,
    ToggleSelector: ToggleSelector
  };

  api.internals.register(api.toggle.ToggleSelector.STATUS_LABEL, api.toggle.ToggleStatusLabel);

  var ITEM$1 = api.internals.ns.selector('sidemenu__item');
  var COLLAPSE$1 = api.internals.ns.selector('collapse');

  var SidemenuSelector = {
    LIST: api.internals.ns.selector('sidemenu__list'),
    COLLAPSE: (ITEM$1 + " > " + COLLAPSE$1 + ", " + ITEM$1 + " > *:not(" + ITEM$1 + ", " + COLLAPSE$1 + ") > " + COLLAPSE$1 + ", " + ITEM$1 + " > *:not(" + ITEM$1 + ", " + COLLAPSE$1 + ") > *:not(" + ITEM$1 + ", " + COLLAPSE$1 + ") > " + COLLAPSE$1),
    COLLAPSE_LEGACY: (ITEM$1 + " " + COLLAPSE$1),
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

  var PasswordEmission = {
    TOGGLE: api.internals.ns.emission('password', 'toggle'),
    ADJUST: api.internals.ns.emission('password', 'adjust')
  };

  var PasswordToggle = /*@__PURE__*/(function (superclass) {
    function PasswordToggle () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) PasswordToggle.__proto__ = superclass;
    PasswordToggle.prototype = Object.create( superclass && superclass.prototype );
    PasswordToggle.prototype.constructor = PasswordToggle;

    var prototypeAccessors = { width: { configurable: true },isChecked: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PasswordToggle';
    };

    PasswordToggle.prototype.init = function init () {
      this.listenClick();
      this.ascend(PasswordEmission.ADJUST, this.width);
      this.isSwappingFont = true;
      this._isChecked = this.isChecked;
    };

    prototypeAccessors.width.get = function () {
      var style = getComputedStyle(this.node.parentNode);
      return parseInt(style.width);
    };

    prototypeAccessors.isChecked.get = function () {
      return this.node.checked;
    };

    prototypeAccessors.isChecked.set = function (value) {
      this._isChecked = value;
      this.ascend(PasswordEmission.TOGGLE, value);
    };

    PasswordToggle.prototype.handleClick = function handleClick () {
      this.isChecked = !this._isChecked;
    };

    PasswordToggle.prototype.swapFont = function swapFont (families) {
      this.ascend(PasswordEmission.ADJUST, this.width);
    };

    Object.defineProperties( PasswordToggle.prototype, prototypeAccessors );
    Object.defineProperties( PasswordToggle, staticAccessors );

    return PasswordToggle;
  }(api.core.Instance));

  var Password = /*@__PURE__*/(function (superclass) {
    function Password () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Password.__proto__ = superclass;
    Password.prototype = Object.create( superclass && superclass.prototype );
    Password.prototype.constructor = Password;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Password';
    };

    Password.prototype.init = function init () {
      this.addAscent(PasswordEmission.TOGGLE, this.toggle.bind(this));
      this.addAscent(PasswordEmission.ADJUST, this.adjust.bind(this));
    };

    Password.prototype.toggle = function toggle (value) {
      this.descend(PasswordEmission.TOGGLE, value);
    };

    Password.prototype.adjust = function adjust (value) {
      this.descend(PasswordEmission.ADJUST, value);
    };

    Object.defineProperties( Password, staticAccessors );

    return Password;
  }(api.core.Instance));

  var PasswordSelector = {
    PASSWORD: api.internals.ns.selector('password'),
    INPUT: api.internals.ns.selector('password__input'),
    LABEL: api.internals.ns.selector('password__label'),
    TOOGLE: ((api.internals.ns.selector('password__checkbox')) + " input[type=\"checkbox\"]")
  };

  var PasswordInput = /*@__PURE__*/(function (superclass) {
    function PasswordInput () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) PasswordInput.__proto__ = superclass;
    PasswordInput.prototype = Object.create( superclass && superclass.prototype );
    PasswordInput.prototype.constructor = PasswordInput;

    var prototypeAccessors = { isRevealed: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PasswordInput';
    };

    PasswordInput.prototype.init = function init () {
      this.addDescent(PasswordEmission.TOGGLE, this.toggle.bind(this));
      this._isRevealed = this.hasAttribute('type') === 'password';
      this.listen('keydown', this.capslock.bind(this)); // for capslock enabled
      this.listen('keyup', this.capslock.bind(this)); // for capslock desabled
    };

    PasswordInput.prototype.toggle = function toggle (value) {
      this.isRevealed = value;
      this.setAttribute('type', value ? 'text' : 'password');
    };

    prototypeAccessors.isRevealed.get = function () {
      return this._isRevealed;
    };

    PasswordInput.prototype.capslock = function capslock (event) {
      if (event && typeof event.getModifierState !== 'function') { return; }
      if (event.getModifierState('CapsLock')) {
        this.node.parentNode.setAttribute(api.internals.ns.attr('capslock'), '');
      } else {
        this.node.parentNode.removeAttribute(api.internals.ns.attr('capslock'));
      }
    };

    prototypeAccessors.isRevealed.set = function (value) {
      this._isRevealed = value;
      this.setAttribute('type', value ? 'text' : 'password');
    };

    Object.defineProperties( PasswordInput.prototype, prototypeAccessors );
    Object.defineProperties( PasswordInput, staticAccessors );

    return PasswordInput;
  }(api.core.Instance));

  var PasswordLabel = /*@__PURE__*/(function (superclass) {
    function PasswordLabel () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) PasswordLabel.__proto__ = superclass;
    PasswordLabel.prototype = Object.create( superclass && superclass.prototype );
    PasswordLabel.prototype.constructor = PasswordLabel;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PasswordLabel';
    };

    PasswordLabel.prototype.init = function init () {
      this.addDescent(PasswordEmission.ADJUST, this.adjust.bind(this));
    };

    PasswordLabel.prototype.adjust = function adjust (value) {
      var valueREM = Math.ceil(value / 16);
      this.node.style.paddingRight = valueREM + 'rem';
    };

    Object.defineProperties( PasswordLabel, staticAccessors );

    return PasswordLabel;
  }(api.core.Instance));

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

  var ITEM = api.internals.ns.selector('nav__item');
  var COLLAPSE = api.internals.ns.selector('collapse');

  var NavigationSelector = {
    NAVIGATION: api.internals.ns.selector('nav'),
    COLLAPSE: (ITEM + " > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + ", " + COLLAPSE + ") > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + ", " + COLLAPSE + ") > *:not(" + ITEM + ", " + COLLAPSE + ") > " + COLLAPSE),
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

    var prototypeAccessors = { index: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Navigation';
    };

    Navigation.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.clicked = false;
      this.out = false;
      this.listen('focusout', this.focusOutHandler.bind(this));
      this.listen('mousedown', this.mouseDownHandler.bind(this));
      this.listenClick({ capture: true });
    };

    Navigation.prototype.validate = function validate (member) {
      return superclass.prototype.validate.call(this, member) && member.element.node.matches(api.internals.legacy.isLegacy ? NavigationSelector.COLLAPSE_LEGACY : NavigationSelector.COLLAPSE);
    };

    Navigation.prototype.mouseDownHandler = function mouseDownHandler (e) {
      if (!this.isBreakpoint(api.core.Breakpoints.LG) || this.index === -1 || !this.current) { return; }
      this.position = this.current.node.contains(e.target) ? NavigationMousePosition.INSIDE : NavigationMousePosition.OUTSIDE;
      this.requestPosition();
    };

    Navigation.prototype.clickHandler = function clickHandler (e) {
      if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) { this.index = -1; }
    };

    Navigation.prototype.focusOutHandler = function focusOutHandler (e) {
      if (!this.isBreakpoint(api.core.Breakpoints.LG)) { return; }
      this.out = true;
      this.requestPosition();
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

  /**
    * TabButton correspond au bouton cliquable qui change le panel
    * TabButton étend de DisclosureButton qui ajoute/enelve l'attribut aria-selected,
    * Et change l'attributte tabindex a 0 si le boutton est actif (value=true), -1 s'il n'est pas actif (value=false)
   */
  var TabButton = /*@__PURE__*/(function (superclass) {
    function TabButton () {
      superclass.call(this, api.core.DisclosureType.SELECT);
    }

    if ( superclass ) TabButton.__proto__ = superclass;
    TabButton.prototype = Object.create( superclass && superclass.prototype );
    TabButton.prototype.constructor = TabButton;

    var prototypeAccessors = { list: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabButton';
    };

    TabButton.prototype.handleClick = function handleClick (e) {
      superclass.prototype.handleClick.call(this, e);
      this.focus();
    };

    TabButton.prototype.apply = function apply (value) {
      superclass.prototype.apply.call(this, value);
      if (this.isPrimary) {
        this.setAttribute('tabindex', value ? '0' : '-1');
        if (value) {
          if (this.list) { this.list.focalize(this); }
        }
      }
    };

    prototypeAccessors.list.get = function () {
      return this.element.getAscendantInstance('TabsList', 'TabsGroup');
    };

    Object.defineProperties( TabButton.prototype, prototypeAccessors );
    Object.defineProperties( TabButton, staticAccessors );

    return TabButton;
  }(api.core.DisclosureButton));

  var TabSelector = {
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

  var TabPanelDirection = {
    START: 'direction-start',
    END: 'direction-end',
    NONE: 'none'
  };

  /**
    * Tab coorespond au panel d'un élement Tabs (tab panel)
    * Tab étend disclosure qui ajoute/enleve le modifier --selected,
    * et ajoute/eleve l'attribut hidden, sur le panel
    */
  var TabPanel = /*@__PURE__*/(function (superclass) {
    function TabPanel () {
      superclass.call(this, api.core.DisclosureType.SELECT, TabSelector.PANEL, TabButton, 'TabsGroup');
      this._direction = TabPanelDirection.NONE;
      this._isPreventingTransition = false;
    }

    if ( superclass ) TabPanel.__proto__ = superclass;
    TabPanel.prototype = Object.create( superclass && superclass.prototype );
    TabPanel.prototype.constructor = TabPanel;

    var prototypeAccessors = { direction: { configurable: true },isPreventingTransition: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabPanel';
    };

    prototypeAccessors.direction.get = function () {
      return this._direction;
    };

    prototypeAccessors.direction.set = function (value) {
      if (value === this._direction) { return; }
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
    };

    prototypeAccessors.isPreventingTransition.get = function () {
      return this._isPreventingTransition;
    };

    prototypeAccessors.isPreventingTransition.set = function (value) {
      if (this._isPreventingTransition === value) { return; }
      if (value) { this.addClass(api.internals.motion.TransitionSelector.NONE); }
      else { this.removeClass(api.internals.motion.TransitionSelector.NONE); }
      this._isPreventingTransition = value === true;
    };

    TabPanel.prototype.translate = function translate (direction, initial) {
      this.isPreventingTransition = initial;
      this.direction = direction;
    };

    TabPanel.prototype.reset = function reset () {
      if (this.group) { this.group.retrieve(true); }
    };

    TabPanel.prototype._electPrimaries = function _electPrimaries (candidates) {
      var this$1$1 = this;

      if (!this.group || !this.group.list) { return []; }
      return superclass.prototype._electPrimaries.call(this, candidates).filter(function (candidate) { return this$1$1.group.list.node.contains(candidate.node); });
    };

    Object.defineProperties( TabPanel.prototype, prototypeAccessors );
    Object.defineProperties( TabPanel, staticAccessors );

    return TabPanel;
  }(api.core.Disclosure));

  var TabKeys = {
    LEFT: 'tab_keys_left',
    RIGHT: 'tab_keys_right',
    HOME: 'tab_keys_home',
    END: 'tab_keys_end'
  };

  var TabEmission = {
    PRESS_KEY: api.internals.ns.emission('tab', 'press_key'),
    LIST_HEIGHT: api.internals.ns.emission('tab', 'list_height')
  };

  /**
  * TabGroup est la classe étendue de DiscosuresGroup
  * Correspond à un objet Tabs avec plusieurs tab-button & Tab (panel)
  */
  var TabsGroup = /*@__PURE__*/(function (superclass) {
    function TabsGroup () {
      superclass.call(this, 'TabPanel');
    }

    if ( superclass ) TabsGroup.__proto__ = superclass;
    TabsGroup.prototype = Object.create( superclass && superclass.prototype );
    TabsGroup.prototype.constructor = TabsGroup;

    var prototypeAccessors = { list: { configurable: true },buttonHasFocus: { configurable: true },isPreventingTransition: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabsGroup';
    };

    TabsGroup.prototype.init = function init () {
      superclass.prototype.init.call(this);

      this.listen('transitionend', this.transitionend.bind(this));
      this.addAscent(TabEmission.PRESS_KEY, this.pressKey.bind(this));
      this.addAscent(TabEmission.LIST_HEIGHT, this.setListHeight.bind(this));
      this.isRendering = true;
    };

    TabsGroup.prototype.getIndex = function getIndex (defaultIndex) {
      if ( defaultIndex === void 0 ) defaultIndex = 0;

      superclass.prototype.getIndex.call(this, defaultIndex);
    };

    prototypeAccessors.list.get = function () {
      return this.element.getDescendantInstances('TabsList', 'TabsGroup', true)[0];
    };

    TabsGroup.prototype.setListHeight = function setListHeight (value) {
      this.listHeight = value;
    };

    TabsGroup.prototype.transitionend = function transitionend (e) {
      this.isPreventingTransition = true;
    };

    prototypeAccessors.buttonHasFocus.get = function () {
      return this.members.some(function (member) { return member.buttonHasFocus; });
    };

    TabsGroup.prototype.pressKey = function pressKey (key) {
      switch (key) {
        case TabKeys.LEFT:
          this.pressLeft();
          break;

        case TabKeys.RIGHT:
          this.pressRight();
          break;

        case TabKeys.HOME:
          this.pressHome();
          break;

        case TabKeys.END:
          this.pressEnd();
          break;
      }
    };

    /**
     * Selectionne l'element suivant de la liste si on est sur un bouton
     * Si on est à la fin on retourne au début
     */
    TabsGroup.prototype.pressRight = function pressRight () {
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
    TabsGroup.prototype.pressLeft = function pressLeft () {
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
    TabsGroup.prototype.pressHome = function pressHome () {
      if (this.buttonHasFocus) {
        this.index = 0;
        this.focus();
      }
    };
    /**
     * Selectionne le dernier element de la liste si on est sur un bouton
     */
    TabsGroup.prototype.pressEnd = function pressEnd () {
      if (this.buttonHasFocus) {
        this.index = this.length - 1;
        this.focus();
      }
    };
    TabsGroup.prototype.focus = function focus () {
      if (this.current) {
        this.current.focus();
      }
    };

    TabsGroup.prototype.apply = function apply () {
      for (var i = 0; i < this._index; i++) { this.members[i].translate(TabPanelDirection.START); }
      if (this.current) { this.current.translate(TabPanelDirection.NONE); }
      for (var i$1 = this._index + 1; i$1 < this.length; i$1++) { this.members[i$1].translate(TabPanelDirection.END); }
      this.isPreventingTransition = false;
    };

    prototypeAccessors.isPreventingTransition.get = function () {
      return this._isPreventingTransition;
    };

    prototypeAccessors.isPreventingTransition.set = function (value) {
      if (this._isPreventingTransition === value) { return; }
      if (value) { this.addClass(api.internals.motion.TransitionSelector.NONE); }
      else { this.removeClass(api.internals.motion.TransitionSelector.NONE); }
      this._isPreventingTransition = value === true;
    };

    TabsGroup.prototype.render = function render () {
      if (this.current === null) { return; }
      this.node.scrollTop = 0;
      this.node.scrollLeft = 0;
      var paneHeight = Math.round(this.current.node.offsetHeight);
      if (this.panelHeight === paneHeight) { return; }
      this.panelHeight = paneHeight;
      this.style.setProperty('--tabs-height', (this.panelHeight + this.listHeight) + 'px');
    };

    Object.defineProperties( TabsGroup.prototype, prototypeAccessors );
    Object.defineProperties( TabsGroup, staticAccessors );

    return TabsGroup;
  }(api.core.DisclosuresGroup));

  var FOCALIZE_OFFSET = 16;
  var SCROLL_OFFSET$1 = 16; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

  var TabsList = /*@__PURE__*/(function (superclass) {
    function TabsList () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TabsList.__proto__ = superclass;
    TabsList.prototype = Object.create( superclass && superclass.prototype );
    TabsList.prototype.constructor = TabsList;

    var prototypeAccessors = { isScrolling: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabsList';
    };

    TabsList.prototype.init = function init () {
      this.listen('scroll', this.scroll.bind(this));
      this.listenKey(api.core.KeyCodes.RIGHT, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.RIGHT), true, true);
      this.listenKey(api.core.KeyCodes.LEFT, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.LEFT), true, true);
      this.listenKey(api.core.KeyCodes.HOME, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.HOME), true, true);
      this.listenKey(api.core.KeyCodes.END, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.END), true, true);
      this.isResizing = true;
    };

    TabsList.prototype.focalize = function focalize (btn) {
      var btnRect = btn.getRect();
      var listRect = this.getRect();
      var actualScroll = this.node.scrollLeft;
      if (btnRect.left < listRect.left) { this.node.scrollTo(actualScroll - listRect.left + btnRect.left - FOCALIZE_OFFSET, 0); }
      else if (btnRect.right > listRect.right) { this.node.scrollTo(actualScroll - listRect.right + btnRect.right + FOCALIZE_OFFSET, 0); }
    };

    prototypeAccessors.isScrolling.get = function () {
      return this._isScrolling;
    };

    prototypeAccessors.isScrolling.set = function (value) {
      if (this._isScrolling === value) { return; }
      this._isScrolling = value;
      this.apply();
    };

    TabsList.prototype.apply = function apply () {
      if (this._isScrolling) {
        this.addClass(TabSelector.SHADOW);
        this.scroll();
      } else {
        this.removeClass(TabSelector.SHADOW_RIGHT);
        this.removeClass(TabSelector.SHADOW_LEFT);
        this.removeClass(TabSelector.SHADOW);
      }
    };

    /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
    TabsList.prototype.scroll = function scroll () {
      var scrollLeft = this.node.scrollLeft;
      var isMin = scrollLeft <= SCROLL_OFFSET$1;
      var max = this.node.scrollWidth - this.node.clientWidth - SCROLL_OFFSET$1;

      var isMax = Math.abs(scrollLeft) >= max;
      var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      var minSelector = isRtl ? TabSelector.SHADOW_RIGHT : TabSelector.SHADOW_LEFT;
      var maxSelector = isRtl ? TabSelector.SHADOW_LEFT : TabSelector.SHADOW_RIGHT;

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
    };

    TabsList.prototype.resize = function resize () {
      this.isScrolling = this.node.scrollWidth > this.node.clientWidth + SCROLL_OFFSET$1;
      var height = this.getRect().height;
      this.setProperty('--tabs-list-height', (height + "px"));
      this.ascend(TabEmission.LIST_HEIGHT, height);
    };

    TabsList.prototype.dispose = function dispose () {
      this.isScrolling = false;
    };

    Object.defineProperties( TabsList.prototype, prototypeAccessors );
    Object.defineProperties( TabsList, staticAccessors );

    return TabsList;
  }(api.core.Instance));

  api.tab = {
    TabPanel: TabPanel,
    TabButton: TabButton,
    TabsGroup: TabsGroup,
    TabsList: TabsList,
    TabSelector: TabSelector,
    TabEmission: TabEmission
  };

  api.internals.register(api.tab.TabSelector.PANEL, api.tab.TabPanel);
  api.internals.register(api.tab.TabSelector.GROUP, api.tab.TabsGroup);
  api.internals.register(api.tab.TabSelector.LIST, api.tab.TabsList);

  var TableEmission = {
    SCROLLABLE: api.internals.ns.emission('table', 'scrollable'),
    CHANGE: api.internals.ns.emission('table', 'change'),
    CAPTION_HEIGHT: api.internals.ns.emission('table', 'captionheight')
  };

  var PADDING = '1rem'; // padding de 4v sur le caption

  var Table = /*@__PURE__*/(function (superclass) {
    function Table () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Table.__proto__ = superclass;
    Table.prototype = Object.create( superclass && superclass.prototype );
    Table.prototype.constructor = Table;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Table';
    };

    Table.prototype.init = function init () {
      this.addAscent(TableEmission.CAPTION_HEIGHT, this.setCaptionHeight.bind(this));
    };

    Table.prototype.setCaptionHeight = function setCaptionHeight (value) {
      this.setProperty('--table-offset', ("calc(" + value + "px + " + PADDING + ")"));
    };

    Object.defineProperties( Table, staticAccessors );

    return Table;
  }(api.core.Instance));

  var TableSelector = {
    TABLE: api.internals.ns.selector('table'),
    SHADOW: api.internals.ns.selector('table__shadow'),
    SHADOW_LEFT: api.internals.ns.selector('table__shadow--left'),
    SHADOW_RIGHT: api.internals.ns.selector('table__shadow--right'),
    ELEMENT: ((api.internals.ns.selector('table')) + ":not(" + (api.internals.ns.selector('table--no-scroll')) + ") table"),
    CAPTION: ((api.internals.ns.selector('table')) + " table caption")
  };

  var SCROLL_OFFSET = 8; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

  var TableElement = /*@__PURE__*/(function (superclass) {
    function TableElement () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TableElement.__proto__ = superclass;
    TableElement.prototype = Object.create( superclass && superclass.prototype );
    TableElement.prototype.constructor = TableElement;

    var prototypeAccessors = { isScrolling: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TableElement';
    };

    TableElement.prototype.init = function init () {
      this.listen('scroll', this.scroll.bind(this));
      this.content = this.querySelector('tbody');
      this.isResizing = true;
    };

    prototypeAccessors.isScrolling.get = function () {
      return this._isScrolling;
    };

    prototypeAccessors.isScrolling.set = function (value) {
      if (this._isScrolling === value) { return; }
      this._isScrolling = value;

      if (value) {
        this.addClass(TableSelector.SHADOW);
        this.scroll();
      } else {
        this.removeClass(TableSelector.SHADOW);
        this.removeClass(TableSelector.SHADOW_LEFT);
        this.removeClass(TableSelector.SHADOW_RIGHT);
      }
    };

    /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
    TableElement.prototype.scroll = function scroll () {
      var isMin = this.node.scrollLeft <= SCROLL_OFFSET;
      var max = this.content.offsetWidth - this.node.offsetWidth - SCROLL_OFFSET;
      var isMax = Math.abs(this.node.scrollLeft) >= max;
      var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      var minSelector = isRtl ? TableSelector.SHADOW_RIGHT : TableSelector.SHADOW_LEFT;
      var maxSelector = isRtl ? TableSelector.SHADOW_LEFT : TableSelector.SHADOW_RIGHT;

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
    };

    TableElement.prototype.resize = function resize () {
      this.isScrolling = this.content.offsetWidth > this.node.offsetWidth;
    };

    TableElement.prototype.dispose = function dispose () {
      this.isScrolling = false;
    };

    Object.defineProperties( TableElement.prototype, prototypeAccessors );
    Object.defineProperties( TableElement, staticAccessors );

    return TableElement;
  }(api.core.Instance));

  var TableCaption = /*@__PURE__*/(function (superclass) {
    function TableCaption () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TableCaption.__proto__ = superclass;
    TableCaption.prototype = Object.create( superclass && superclass.prototype );
    TableCaption.prototype.constructor = TableCaption;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TableCaption';
    };

    TableCaption.prototype.init = function init () {
      this.height = 0;
      this.isResizing = true;
    };

    TableCaption.prototype.resize = function resize () {
      var height = this.getRect().height;
      if (this.height === height) { return; }
      this.height = height;
      this.ascend(TableEmission.CAPTION_HEIGHT, height);
    };

    Object.defineProperties( TableCaption, staticAccessors );

    return TableCaption;
  }(api.core.Instance));

  api.table = {
    Table: Table,
    TableElement: TableElement,
    TableCaption: TableCaption,
    TableSelector: TableSelector
  };

  api.internals.register(api.table.TableSelector.TABLE, api.table.Table);
  api.internals.register(api.table.TableSelector.ELEMENT, api.table.TableElement);
  api.internals.register(api.table.TableSelector.CAPTION, api.table.TableCaption);

  var TagEvent = {
    DISMISS: api.internals.ns.event('dismiss')
  };

  var TagDismissible = /*@__PURE__*/(function (superclass) {
    function TagDismissible () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TagDismissible.__proto__ = superclass;
    TagDismissible.prototype = Object.create( superclass && superclass.prototype );
    TagDismissible.prototype.constructor = TagDismissible;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TagDismissible';
    };

    TagDismissible.prototype.init = function init () {
      this.listenClick();
    };

    TagDismissible.prototype.handleClick = function handleClick () {
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
    };

    TagDismissible.prototype.verify = function verify () {
      if (document.body.contains(this.node)) { this.warn(("a TagDismissible has just been dismissed and should be removed from the dom. In " + (api.mode) + " mode, the api doesn't handle dom modification. An event " + (TagEvent.DISMISS) + " is dispatched by the element to trigger the removal")); }
    };

    Object.defineProperties( TagDismissible, staticAccessors );

    return TagDismissible;
  }(api.core.Instance));

  var TagSelector = {
    PRESSABLE: ((api.internals.ns.selector('tag')) + "[aria-pressed]"),
    DISMISSIBLE: ("" + (api.internals.ns.selector('tag--dismiss')))
  };

  api.tag = {
    TagDismissible: TagDismissible,
    TagSelector: TagSelector,
    TagEvent: TagEvent
  };

  api.internals.register(api.tag.TagSelector.PRESSABLE, api.core.Toggle);
  api.internals.register(api.tag.TagSelector.DISMISSIBLE, api.tag.TagDismissible);

  var TRANSCRIPTION = api.internals.ns.selector('transcription');

  var TranscriptionSelector = {
    TRANSCRIPTION: TRANSCRIPTION,
    BUTTON: (TRANSCRIPTION + "__btn")
  };

  var Transcription = /*@__PURE__*/(function (superclass) {
    function Transcription () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Transcription.__proto__ = superclass;
    Transcription.prototype = Object.create( superclass && superclass.prototype );
    Transcription.prototype.constructor = Transcription;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Transcription';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(TranscriptionSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Transcription.prototype, prototypeAccessors );
    Object.defineProperties( Transcription, staticAccessors );

    return Transcription;
  }(api.core.Instance));

  api.transcription = {
    Transcription: Transcription,
    TranscriptionSelector: TranscriptionSelector
  };

  api.internals.register(api.transcription.TranscriptionSelector.TRANSCRIPTION, api.transcription.Transcription);

  var TileDownload = /*@__PURE__*/(function (superclass) {
    function TileDownload () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TileDownload.__proto__ = superclass;
    TileDownload.prototype = Object.create( superclass && superclass.prototype );
    TileDownload.prototype.constructor = TileDownload;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TileDownload';
    };

    TileDownload.prototype.init = function init () {
      var this$1$1 = this;

      this.addAscent(api.core.AssessEmission.UPDATE, function (details) {
        this$1$1.descend(api.core.AssessEmission.UPDATE, details);
      });
      this.addAscent(api.core.AssessEmission.ADDED, function () {
        this$1$1.descend(api.core.AssessEmission.ADDED);
      });
    };

    Object.defineProperties( TileDownload, staticAccessors );

    return TileDownload;
  }(api.core.Instance));

  var TileSelector = {
    DOWNLOAD: api.internals.ns.selector('tile--download'),
    DOWNLOAD_DETAIL: ((api.internals.ns.selector('tile--download')) + " " + (api.internals.ns.selector('tile__detail')))
  };

  api.tile = {
    TileSelector: TileSelector,
    TileDownload: TileDownload
  };

  api.internals.register(api.tile.TileSelector.DOWNLOAD, api.tile.TileDownload);
  api.internals.register(api.tile.TileSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

  var HeaderSelector = {
    HEADER: api.internals.ns.selector('header'),
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
      var toolsHtmlDuplicateId = toolsHtml.replace(/id="(.*?)"/gm, 'id="$1' + copySuffix + '"');
      toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace(/(<nav[.\s\S]*-translate [.\s\S]*) aria-controls="(.*?)"([.\s\S]*<\/nav>)/gm, '$1 aria-controls="$2' + copySuffix + '"$3');

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
      superclass.call(this);
      this._clickHandling = this.clickHandler.bind(this);
    }

    if ( superclass ) HeaderModal.__proto__ = superclass;
    HeaderModal.prototype = Object.create( superclass && superclass.prototype );
    HeaderModal.prototype.constructor = HeaderModal;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderModal';
    };

    HeaderModal.prototype.init = function init () {
      this.isResizing = true;
    };

    HeaderModal.prototype.resize = function resize () {
      if (this.isBreakpoint(api.core.Breakpoints.LG)) { this.deactivateModal(); }
      else { this.activateModal(); }
    };

    HeaderModal.prototype.activateModal = function activateModal () {
      var modal = this.element.getInstance('Modal');
      if (!modal) { return; }
      modal.isEnabled = true;
      this.listen('click', this._clickHandling, { capture: true });
    };

    HeaderModal.prototype.deactivateModal = function deactivateModal () {
      var modal = this.element.getInstance('Modal');
      if (!modal) { return; }
      modal.conceal();
      modal.isEnabled = false;
      this.unlisten('click', this._clickHandling, { capture: true });
    };

    HeaderModal.prototype.clickHandler = function clickHandler (e) {
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
    doc: 'https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete'
  };

  api.internals.register(api.header.HeaderSelector.TOOLS_LINKS, api.header.HeaderLinks);
  api.internals.register(api.header.HeaderSelector.MODALS, api.header.HeaderModal);

  var DisplaySelector = {
    DISPLAY: api.internals.ns.selector('display'),
    RADIO_BUTTONS: ("input[name=\"" + (api.internals.ns('radios-theme')) + "\"]"),
    FIELDSET: api.internals.ns.selector('fieldset')
  };

  var Display = /*@__PURE__*/(function (superclass) {
    function Display () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Display.__proto__ = superclass;
    Display.prototype = Object.create( superclass && superclass.prototype );
    Display.prototype.constructor = Display;

    var prototypeAccessors = { scheme: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Display';
    };

    Display.prototype.init = function init () {
      this.radios = this.querySelectorAll(DisplaySelector.RADIO_BUTTONS);

      if (api.scheme) {
        this.changing = this.change.bind(this);
        for (var i = 0, list = this.radios; i < list.length; i += 1) {
          var radio = list[i];

          radio.addEventListener('change', this.changing);
        }
        this.addDescent(api.scheme.SchemeEmission.SCHEME, this.apply.bind(this));
        this.ascend(api.scheme.SchemeEmission.ASK);
      } else {
        this.querySelector(DisplaySelector.FIELDSET).setAttribute('disabled', '');
      }
    };

    prototypeAccessors.scheme.get = function () {
      return this._scheme;
    };

    prototypeAccessors.scheme.set = function (value) {
      if (this._scheme === value || !api.scheme) { return; }
      switch (value) {
        case api.scheme.SchemeValue.SYSTEM:
        case api.scheme.SchemeValue.LIGHT:
        case api.scheme.SchemeValue.DARK:
          this._scheme = value;
          for (var i = 0, list = this.radios; i < list.length; i += 1) {
            var radio = list[i];

        radio.checked = radio.value === value;
          }
          this.ascend(api.scheme.SchemeEmission.SCHEME, value);
          break;
      }
    };

    Display.prototype.change = function change () {
      for (var i = 0, list = this.radios; i < list.length; i += 1) {
        var radio = list[i];

        if (radio.checked) {
          this.scheme = radio.value;
          return;
        }
      }
    };

    Display.prototype.apply = function apply (value) {
      this.scheme = value;
    };

    Display.prototype.dispose = function dispose () {
      for (var i = 0, list = this.radios; i < list.length; i += 1) {
        var radio = list[i];

        radio.removeEventListener('change', this.changing);
      }
    };

    Object.defineProperties( Display.prototype, prototypeAccessors );
    Object.defineProperties( Display, staticAccessors );

    return Display;
  }(api.core.Instance));

  api.display = {
    Display: Display,
    DisplaySelector: DisplaySelector
  };

  api.internals.register(api.display.DisplaySelector.DISPLAY, api.display.Display);

})();
//# sourceMappingURL=component.nomodule.js.map

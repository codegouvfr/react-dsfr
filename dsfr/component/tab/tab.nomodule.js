/*! DSFR v1.11.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.11.1'
  };

  var api = window[config.namespace];

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
  var SCROLL_OFFSET = 16; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

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
      var isMin = scrollLeft <= SCROLL_OFFSET;
      var max = this.node.scrollWidth - this.node.clientWidth - SCROLL_OFFSET;

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
      this.isScrolling = this.node.scrollWidth > this.node.clientWidth + SCROLL_OFFSET;
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

})();
//# sourceMappingURL=tab.nomodule.js.map

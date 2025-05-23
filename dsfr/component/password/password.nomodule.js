/*! DSFR v1.13.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.13.2'
  };

  var api = window[config.namespace];

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

})();
//# sourceMappingURL=password.nomodule.js.map

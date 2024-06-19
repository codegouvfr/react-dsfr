/*! DSFR v1.12.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.12.0'
  };

  var api = window[config.namespace];

  var CheckboxSelector = {
    INPUT: ((api.internals.ns.selector('checkbox-group')) + " input[type=\"checkbox\"]")
  };

  var CheckboxEmission = {
    CHANGE: api.internals.ns.emission('checkbox', 'change'),
    RETRIEVE: api.internals.ns.emission('checkbox', 'retrieve')
  };

  var CheckboxInput = /*@__PURE__*/(function (superclass) {
    function CheckboxInput () {
      superclass.call(this);
      this._handlingChange = this.handleChange.bind(this);
    }

    if ( superclass ) CheckboxInput.__proto__ = superclass;
    CheckboxInput.prototype = Object.create( superclass && superclass.prototype );
    CheckboxInput.prototype.constructor = CheckboxInput;

    var prototypeAccessors = { isChecked: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CheckboxInput';
    };

    CheckboxInput.prototype.init = function init () {
      this.node.addEventListener('change', this._handlingChange);
      this.addDescent(CheckboxEmission.RETRIEVE, this._handlingChange);
      this.handleChange();
    };

    prototypeAccessors.isChecked.get = function () {
      return this.node.checked;
    };

    CheckboxInput.prototype.handleChange = function handleChange () {
      this.ascend(CheckboxEmission.CHANGE, this.node);
    };

    Object.defineProperties( CheckboxInput.prototype, prototypeAccessors );
    Object.defineProperties( CheckboxInput, staticAccessors );

    return CheckboxInput;
  }(api.core.Instance));

  api.checkbox = {
    CheckboxSelector: CheckboxSelector,
    CheckboxEmission: CheckboxEmission,
    CheckboxInput: CheckboxInput
  };

  api.internals.register(api.checkbox.CheckboxSelector.INPUT, api.checkbox.CheckboxInput);

})();
//# sourceMappingURL=checkbox.nomodule.js.map

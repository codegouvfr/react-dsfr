/*! DSFR v1.13.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.13.2'
};

const api = window[config.namespace];

const CheckboxSelector = {
  INPUT: `${api.internals.ns.selector('checkbox-group')} input[type="checkbox"]`
};

const CheckboxEmission = {
  CHANGE: api.internals.ns.emission('checkbox', 'change'),
  RETRIEVE: api.internals.ns.emission('checkbox', 'retrieve')
};

class CheckboxInput extends api.core.Instance {
  static get instanceClassName () {
    return 'CheckboxInput';
  }

  constructor () {
    super();
    this._handlingChange = this.handleChange.bind(this);
  }

  init () {
    this.node.addEventListener('change', this._handlingChange);
    this.addDescent(CheckboxEmission.RETRIEVE, this._handlingChange);
    this.handleChange();
  }

  get isChecked () {
    return this.node.checked;
  }

  handleChange () {
    this.ascend(CheckboxEmission.CHANGE, this.node);
  }
}

api.checkbox = {
  CheckboxSelector: CheckboxSelector,
  CheckboxEmission: CheckboxEmission,
  CheckboxInput: CheckboxInput
};

api.internals.register(api.checkbox.CheckboxSelector.INPUT, api.checkbox.CheckboxInput);
//# sourceMappingURL=checkbox.module.js.map

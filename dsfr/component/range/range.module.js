/*! DSFR v1.12.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.12.1'
};

const api = window[config.namespace];

const RangeSelector = {
  RANGE: api.internals.ns.selector('range'),
  RANGE_SM: api.internals.ns.selector('range--sm'),
  RANGE_STEP: api.internals.ns.selector('range--step'),
  RANGE_DOUBLE: api.internals.ns.selector('range--double'),
  RANGE_DOUBLE_STEP: api.internals.ns.selector('range--double') + api.internals.ns.selector('range--step'),
  RANGE_INPUT: api.internals.ns.selector('range input[type=range]:nth-of-type(1)'),
  RANGE_INPUT2: `${api.internals.ns.selector('range--double')} input[type=range]:nth-of-type(2)`,
  RANGE_OUTPUT: api.internals.ns.selector('range__output'),
  RANGE_MIN: api.internals.ns.selector('range__min'),
  RANGE_MAX: api.internals.ns.selector('range__max'),
  RANGE_PREFIX: api.internals.ns.attr('prefix'),
  RANGE_SUFFIX: api.internals.ns.attr('suffix')
};

const RangeEmission = {
  VALUE: api.internals.ns.emission('range', 'value'),
  VALUE2: api.internals.ns.emission('range', 'value2'),
  OUTPUT: api.internals.ns.emission('range', 'output'),
  CONSTRAINTS: api.internals.ns.emission('range', 'constraints'),
  MIN: api.internals.ns.emission('range', 'min'),
  MAX: api.internals.ns.emission('range', 'max'),
  STEP: api.internals.ns.emission('range', 'step'),
  PREFIX: api.internals.ns.emission('range', 'prefix'),
  SUFFIX: api.internals.ns.emission('range', 'suffix'),
  DISABLED: api.internals.ns.emission('range', 'disabled'),
  ENABLE_POINTER: api.internals.ns.emission('range', 'enable_pointer')
};

class RangeModel {
  constructor () {
    this._width = 0;
    this._min = 0;
    this._max = 0;
    this._value = 0;
    this._thumbSize = 24;
    this._innerWidth = 0;
    this._prefix = '';
    this._suffix = '';
    this._background = {};
  }

  configure (model) {
    if (!model) return;
    this._prefix = model._prefix;
    this._suffix = model._suffix;
    this._width = model.width;
    this.setConstraints(model._constraints);
    this.value = model.value;
    this.update();
  }

  setPrefix (value) {
    this._prefix = value !== null ? value : '';
  }

  setSuffix (value) {
    this._suffix = value !== null ? value : '';
  }

  _decorate (value) {
    return `${this._prefix}${value}${this._suffix}`;
  }

  get width () {
    return this._width;
  }

  set width (value) {
    this._width = value;
  }

  get isSm () {
    return this._isSm;
  }

  set isSm (value) {
    if (this._isSm === value) return;
    this._isSm = value;
    this.setThumbSize(value ? 16 : 24);
    this.update();
  }

  setThumbSize (value, mult = 1) {
    this._thumbSize = value;
    this._innerPadding = value * mult;
  }

  get textValue () {
    return this._decorate(this._value);
  }

  get value () {
    return this._value;
  }

  set value (value) {
    this._value = value;
  }

  get outputX () {
    return this._outputX;
  }

  setConstraints (constraints) {
    this._constraints = constraints;
    this._min = constraints.min;
    this._max = constraints.max;
    this._step = constraints.step;
    this._rangeWidth = constraints.rangeWidth;
  }

  get min () {
    return this._min;
  }

  get textMin () {
    return this._decorate(this._min);
  }

  get max () {
    return this._max;
  }

  get textMax () {
    return this._decorate(this._max);
  }

  get step () {
    return this._step;
  }

  get output () {
    return {
      text: this.textValue,
      transform: `translateX(${this._translateX}px) translateX(-${this._centerPercent}%)`
    };
  }

  _getRatio (value) {
    return (value - this._min) / this._rangeWidth;
  }

  get progress () {
    return this._progress;
  }

  update () {
    this._update();
  }

  _update () {
    this._innerWidth = this._width - this._innerPadding;
    const ratio = this._getRatio(this._value);
    this._translateX = ratio * this._width;
    this._centerPercent = ratio * 100;
    this._progress = {
      right: `${(this._innerWidth * ratio + this._innerPadding * 0.5).toFixed(2)}px`
    };
  }
}

class RangeModelStep extends RangeModel {
  get stepWidth () {
    return `${this._stepWidth.toFixed(3)}px`;
  }

  _update () {
    super._update();
    const steps = this._rangeWidth / this._step;
    this._stepWidth = this._innerWidth / steps;
    if (this._stepWidth < 1 || !isFinite(this._stepWidth)) this._stepWidth = 4;
    while (this._stepWidth < 4) this._stepWidth *= 2;
  }
}

class RangeModelDouble extends RangeModel {
  get value2 () {
    return this._value;
  }

  set value2 (value) {
    if (this._value2 === value) return;
    this._value2 = value;
    this.update();
  }

  get textValue () {
    return `${this._decorate(this._value)} - ${this._decorate(this._value2)}`;
  }

  setThumbSize (value) {
    super.setThumbSize(value, 2);
  }

  _update () {
    super._update();
    const ratio = this._getRatio((this._value + this._value2) * 0.5);
    this._translateX = ratio * this._width;
    this._centerPercent = ratio * 100;
    const ratio1 = this._getRatio(this._value);
    const ratio2 = this._getRatio(this._value2);
    this._progress = {
      left: `${(this._innerWidth * ratio1 + this._innerPadding * 0.25).toFixed(2)}px`,
      right: `${(this._innerWidth * ratio2 + this._innerPadding * 0.75).toFixed(2)}px`
    };
  }
}

class RangeModelDoubleStep extends RangeModelDouble {
  get stepWidth () {
    return `${this._stepWidth.toFixed(3)}px`;
  }

  _update () {
    super._update();
    const steps = this._rangeWidth / this._step;
    this._stepWidth = this._innerWidth / steps;
    if (this._stepWidth < 4) this._stepWidth *= Math.ceil(4 / this._stepWidth);
  }
}

const RangeTypes = {
  STEP: 'step',
  DOUBLE: 'double',
  DOUBLE_STEP: 'double-step',
  DEFAULT: 'default'
};

class Range extends api.core.Instance {
  static get instanceClassName () {
    return 'Range';
  }

  init () {
    this._retrieveType();
    this._retrieveSize();
    if (this.isLegacy) {
      this.isResizing = true;
      this.isMouseMoving = true;
    } else {
      this._observer = new ResizeObserver(this.resize.bind(this));
      this._observer.observe(this.node);
    }

    this.addAscent(RangeEmission.CONSTRAINTS, this.setConstraints.bind(this));
    this.addAscent(RangeEmission.VALUE, this.setValue.bind(this));
    this.addAscent(RangeEmission.VALUE2, this.setValue2.bind(this));
    if (this.getAttribute(RangeSelector.RANGE_PREFIX)) this.setPrefix(this.getAttribute(RangeSelector.RANGE_PREFIX));
    if (this.getAttribute(RangeSelector.RANGE_SUFFIX)) this.setSuffix(this.getAttribute(RangeSelector.RANGE_SUFFIX));
    this.update();
  }

  _retrieveType () {
    switch (true) {
      case this.matches(RangeSelector.RANGE_DOUBLE_STEP):
        this.type = RangeTypes.DOUBLE;
        break;

      case this.matches(RangeSelector.RANGE_DOUBLE):
        this.type = RangeTypes.DOUBLE;
        break;

      case this.matches(RangeSelector.RANGE_STEP):
        this.type = RangeTypes.STEP;
        break;

      default:
        this.type = RangeTypes.DEFAULT;
    }
  }

  set type (value) {
    if (this._type === value) return;
    this._type = value;

    const oldModel = this._model;

    switch (this._type) {
      case RangeTypes.DOUBLE_STEP:
        this._model = new RangeModelDoubleStep();
        break;

      case RangeTypes.DOUBLE:
        this._model = new RangeModelDouble();
        break;

      case RangeTypes.STEP:
        this._model = new RangeModelStep();
        break;

      default:
        this._model = new RangeModel();
    }

    this._model.configure(oldModel);
  }

  get type () {
    return this._type;
  }

  _retrieveSize () {
    this._model.isSm = this.matches(RangeSelector.RANGE_SM);
  }

  resize () {
    this._retrieveWidth();
    this.update();
  }

  _retrieveWidth () {
    this._model.width = this.getRect().width;
  }

  setValue (value) {
    this._model.value = value;
    switch (this._type) {
      case RangeTypes.DOUBLE_STEP:
      case RangeTypes.DOUBLE:
        this.descend(RangeEmission.VALUE, value);
        break;
    }
    this.update();
  }

  setValue2 (value) {
    this._model.value2 = value;
    this.descend(RangeEmission.VALUE2, value);
    this.update();
  }

  setConstraints (constraints) {
    this._model.setConstraints(constraints);
    this.update();
    this.descend(RangeEmission.CONSTRAINTS, constraints);
  }

  setPrefix (value) {
    this._model.setPrefix(value);
    this.update();
  }

  setSuffix (value) {
    this._model.setSuffix(value);
    this.update();
  }

  mutate (attributesNames) {
    switch (true) {
      case attributesNames.includes('class'):
        this._retrieveType();
        this._retrieveSize();
        break;

      case attributesNames.includes(RangeSelector.RANGE_PREFIX):
      case attributesNames.includes(RangeSelector.RANGE_SUFFIX):
        this._model.setPrefix(this.getAttribute(RangeSelector.RANGE_PREFIX));
        this._model.setSuffix(this.getAttribute(RangeSelector.RANGE_SUFFIX));
        this.update();
        break;
    }
  }

  update () {
    this._model.update();
    this.descend(RangeEmission.OUTPUT, this._model.output);
    this.descend(RangeEmission.MIN, this._model.textMin);
    this.descend(RangeEmission.MAX, this._model.textMax);
    const progress = this._model.progress;
    if (progress.left) {
      this.style.setProperty('--progress-left', progress.left);
    } else {
      this.style.removeProperty('--progress-left');
    }
    if (progress.right) {
      this.style.setProperty('--progress-right', progress.right);
      if (this.isLegacy) {
        if (progress.left) {
          this.style.setProperty('background-position-x', progress.left);
          this.style.setProperty('background-size', `${parseFloat(progress.right) - parseFloat(progress.left)}px ${this._model.isSm ? '8px' : '12px'}`);
        }
      }
    } else {
      this.style.removeProperty('--progress-right');
      if (this.isLegacy) {
        this.style.removeProperty('background-size');
        this.style.removeProperty('background-position-x');
      }
    }
    if (this._model.stepWidth) this.style.setProperty('--step-width', this._model.stepWidth);
    else this.style.removeProperty('--step-width');
  }

  mouseMove (point) {
    if (this._type !== RangeTypes.DOUBLE && this._type !== RangeTypes.DOUBLE_STEP) return;
    const x = point.x - this.getRect().left;
    this.descend(RangeEmission.ENABLE_POINTER, (parseFloat(this._model.progress.right) - parseFloat(this._model.progress.left)) / 2 + parseFloat(this._model.progress.left) < x ? 2 : 1);
  }

  dispose () {
    this._observer.disconnect();
  }
}

class RangeConstraints {
  constructor (node) {
    this._min = isNaN(node.min) ? 0 : node.min;
    this._max = isNaN(node.max) ? 100 : node.max;
    this._step = isNaN(node.step) ? 1 : node.step;
    this._rangeWidth = this._max - this._min;
  }

  get min () {
    return this._min;
  }

  get max () {
    return this._max;
  }

  get step () {
    return this._step;
  }

  get rangeWidth () {
    return this._rangeWidth;
  }

  test (min, max, step) {
    return this._min === min && this._max === max && this._step === step;
  }
}

class RangeInput extends api.core.Instance {
  static get instanceClassName () {
    return 'RangeInput';
  }

  init () {
    this._init();
    this.node.value = this.getAttribute('value');
    this._changing = this.change.bind(this);
    this._listenerType = this.isLegacy ? 'change' : 'input';
    this.listen(this._listenerType, this._changing);
    if (this.isLegacy) this.addDescent(RangeEmission.ENABLE_POINTER, this._enablePointer.bind(this));
    this.change();
  }

  _init () {
    this._pointerId = 1;
    this.request(() => {
      if (!this.hasAttribute('min')) this.setAttribute('min', 0);
      this.ascend(RangeEmission.CONSTRAINTS, new RangeConstraints(this.node));
      this.ascend(RangeEmission.DISABLED, this.node.disabled);
    });

    this.addDescent(RangeEmission.VALUE2, this.setValue.bind(this));
  }

  _enablePointer (pointerId) {
    const isEnabled = pointerId === this._pointerId;
    if (this._isPointerEnabled === isEnabled) return;
    this._isPointerEnabled = isEnabled;
    if (isEnabled) this.style.removeProperty('pointer-events');
    else this.style.setProperty('pointer-events', 'none');
  }

  setValue (value) {
    if (parseFloat(this.node.value) > value) {
      this.node.value = value;
      this.dispatch('change', undefined, true);
      this.change();
    }
  }

  change () {
    this.ascend(RangeEmission.VALUE, parseFloat(this.node.value));
  }

  mutate (attributesNames) {
    if (attributesNames.includes('disabled')) this.ascend(RangeEmission.DISABLED, this.node.disabled);
    if (attributesNames.includes('min') || attributesNames.includes('max') || attributesNames.includes('step')) {
      this.ascend(RangeEmission.CONSTRAINTS, new RangeConstraints(this.node));
      this.change();
    }
  }

  dispose () {
    if (this._listenerType) this.unlisten(this._listenerType, this._changing);
  }
}

class RangeInput2 extends RangeInput {
  static get instanceClassName () {
    return 'RangeInput2';
  }

  _init () {
    this._pointerId = 2;
    this.addDescent(RangeEmission.CONSTRAINTS, this.setConstraints.bind(this));
    this.addDescent(RangeEmission.VALUE, this.setValue.bind(this));
  }

  setValue (value) {
    if (parseFloat(this.node.value) < value) {
      this.node.value = value;
      this.dispatch('change', undefined, true);
      this.change();
    }
  }

  change () {
    this.ascend(RangeEmission.VALUE2, parseFloat(this.node.value));
  }

  setConstraints (constraints) {
    this.node.min = constraints.min;
    this.node.max = constraints.max;
    this.node.step = constraints.step;
    this.change();
  }

  mutate (attributesNames) {}
}

class RangeOutput extends api.core.Instance {
  static get instanceClassName () {
    return 'RangeOutput';
  }

  init () {
    this.addDescent(RangeEmission.OUTPUT, this.change.bind(this));
  }

  change (data) {
    this.node.innerText = data.text;
    this.node.style.transform = data.transform;
  }
}

class RangeLimit extends api.core.Instance {
  static get instanceClassName () {
    return 'RangeLimit';
  }

  init () {
    switch (true) {
      case this.matches(RangeSelector.RANGE_MIN):
        this.addDescent(RangeEmission.MIN, this.change.bind(this));
        break;

      case this.matches(RangeSelector.RANGE_MAX):
        this.addDescent(RangeEmission.MAX, this.change.bind(this));
        break;
    }
  }

  change (text) {
    this.node.innerText = text;
  }
}

api.range = {
  Range: Range,
  RangeInput: RangeInput,
  RangeInput2: RangeInput2,
  RangeOutput: RangeOutput,
  RangeLimit: RangeLimit,
  RangeEmission: RangeEmission,
  RangeSelector: RangeSelector
};

api.internals.register(api.range.RangeSelector.RANGE, api.range.Range);
api.internals.register(api.range.RangeSelector.RANGE_INPUT, api.range.RangeInput);
api.internals.register(api.range.RangeSelector.RANGE_INPUT2, api.range.RangeInput2);
api.internals.register(api.range.RangeSelector.RANGE_OUTPUT, api.range.RangeOutput);
api.internals.register(api.range.RangeSelector.RANGE_MIN, api.range.RangeLimit);
api.internals.register(api.range.RangeSelector.RANGE_MAX, api.range.RangeLimit);
//# sourceMappingURL=range.module.js.map

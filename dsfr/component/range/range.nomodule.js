/*! DSFR v1.11.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.11.2'
  };

  var api = window[config.namespace];

  var RangeSelector = {
    RANGE: api.internals.ns.selector('range'),
    RANGE_SM: api.internals.ns.selector('range--sm'),
    RANGE_STEP: api.internals.ns.selector('range--step'),
    RANGE_DOUBLE: api.internals.ns.selector('range--double'),
    RANGE_DOUBLE_STEP: api.internals.ns.selector('range--double') + api.internals.ns.selector('range--step'),
    RANGE_INPUT: api.internals.ns.selector('range input[type=range]:nth-of-type(1)'),
    RANGE_INPUT2: ((api.internals.ns.selector('range--double')) + " input[type=range]:nth-of-type(2)"),
    RANGE_OUTPUT: api.internals.ns.selector('range__output'),
    RANGE_MIN: api.internals.ns.selector('range__min'),
    RANGE_MAX: api.internals.ns.selector('range__max'),
    RANGE_PREFIX: api.internals.ns.attr('prefix'),
    RANGE_SUFFIX: api.internals.ns.attr('suffix')
  };

  var RangeEmission = {
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

  var RangeModel = function RangeModel () {
    this._width = 0;
    this._min = 0;
    this._max = 0;
    this._value = 0;
    this._thumbSize = 24;
    this._innerWidth = 0;
    this._prefix = '';
    this._suffix = '';
    this._background = {};
  };

  var prototypeAccessors$1 = { width: { configurable: true },isSm: { configurable: true },textValue: { configurable: true },value: { configurable: true },outputX: { configurable: true },min: { configurable: true },textMin: { configurable: true },max: { configurable: true },textMax: { configurable: true },step: { configurable: true },output: { configurable: true },progress: { configurable: true } };

  RangeModel.prototype.configure = function configure (model) {
    if (!model) { return; }
    this._prefix = model._prefix;
    this._suffix = model._suffix;
    this._width = model.width;
    this.setConstraints(model._constraints);
    this.value = model.value;
    this.update();
  };

  RangeModel.prototype.setPrefix = function setPrefix (value) {
    this._prefix = value !== null ? value : '';
  };

  RangeModel.prototype.setSuffix = function setSuffix (value) {
    this._suffix = value !== null ? value : '';
  };

  RangeModel.prototype._decorate = function _decorate (value) {
    return ("" + (this._prefix) + value + (this._suffix));
  };

  prototypeAccessors$1.width.get = function () {
    return this._width;
  };

  prototypeAccessors$1.width.set = function (value) {
    this._width = value;
  };

  prototypeAccessors$1.isSm.get = function () {
    return this._isSm;
  };

  prototypeAccessors$1.isSm.set = function (value) {
    if (this._isSm === value) { return; }
    this._isSm = value;
    this.setThumbSize(value ? 16 : 24);
    this.update();
  };

  RangeModel.prototype.setThumbSize = function setThumbSize (value, mult) {
      if ( mult === void 0 ) mult = 1;

    this._thumbSize = value;
    this._innerPadding = value * mult;
  };

  prototypeAccessors$1.textValue.get = function () {
    return this._decorate(this._value);
  };

  prototypeAccessors$1.value.get = function () {
    return this._value;
  };

  prototypeAccessors$1.value.set = function (value) {
    this._value = value;
  };

  prototypeAccessors$1.outputX.get = function () {
    return this._outputX;
  };

  RangeModel.prototype.setConstraints = function setConstraints (constraints) {
    this._constraints = constraints;
    this._min = constraints.min;
    this._max = constraints.max;
    this._step = constraints.step;
    this._rangeWidth = constraints.rangeWidth;
  };

  prototypeAccessors$1.min.get = function () {
    return this._min;
  };

  prototypeAccessors$1.textMin.get = function () {
    return this._decorate(this._min);
  };

  prototypeAccessors$1.max.get = function () {
    return this._max;
  };

  prototypeAccessors$1.textMax.get = function () {
    return this._decorate(this._max);
  };

  prototypeAccessors$1.step.get = function () {
    return this._step;
  };

  prototypeAccessors$1.output.get = function () {
    return {
      text: this.textValue,
      transform: ("translateX(" + (this._translateX) + "px) translateX(-" + (this._centerPercent) + "%)")
    };
  };

  RangeModel.prototype._getRatio = function _getRatio (value) {
    return (value - this._min) / this._rangeWidth;
  };

  prototypeAccessors$1.progress.get = function () {
    return this._progress;
  };

  RangeModel.prototype.update = function update () {
    this._update();
  };

  RangeModel.prototype._update = function _update () {
    this._innerWidth = this._width - this._innerPadding;
    var ratio = this._getRatio(this._value);
    this._translateX = ratio * this._width;
    this._centerPercent = ratio * 100;
    this._progress = {
      right: (((this._innerWidth * ratio + this._innerPadding * 0.5).toFixed(2)) + "px")
    };
  };

  Object.defineProperties( RangeModel.prototype, prototypeAccessors$1 );

  var RangeModelStep = /*@__PURE__*/(function (RangeModel) {
    function RangeModelStep () {
      RangeModel.apply(this, arguments);
    }

    if ( RangeModel ) RangeModelStep.__proto__ = RangeModel;
    RangeModelStep.prototype = Object.create( RangeModel && RangeModel.prototype );
    RangeModelStep.prototype.constructor = RangeModelStep;

    var prototypeAccessors$1 = { stepWidth: { configurable: true } };

    prototypeAccessors$1.stepWidth.get = function () {
      return ((this._stepWidth.toFixed(3)) + "px");
    };

    RangeModelStep.prototype._update = function _update () {
      RangeModel.prototype._update.call(this);
      var steps = this._rangeWidth / this._step;
      this._stepWidth = this._innerWidth / steps;
      while (this._stepWidth < 4) { this._stepWidth *= 2; }
    };

    Object.defineProperties( RangeModelStep.prototype, prototypeAccessors$1 );

    return RangeModelStep;
  }(RangeModel));

  var RangeModelDouble = /*@__PURE__*/(function (RangeModel) {
    function RangeModelDouble () {
      RangeModel.apply(this, arguments);
    }

    if ( RangeModel ) RangeModelDouble.__proto__ = RangeModel;
    RangeModelDouble.prototype = Object.create( RangeModel && RangeModel.prototype );
    RangeModelDouble.prototype.constructor = RangeModelDouble;

    var prototypeAccessors$2 = { value2: { configurable: true },textValue: { configurable: true } };

    prototypeAccessors$2.value2.get = function () {
      return this._value;
    };

    prototypeAccessors$2.value2.set = function (value) {
      if (this._value2 === value) { return; }
      this._value2 = value;
      this.update();
    };

    prototypeAccessors$2.textValue.get = function () {
      return ((this._decorate(this._value)) + " - " + (this._decorate(this._value2)));
    };

    RangeModelDouble.prototype.setThumbSize = function setThumbSize (value) {
      RangeModel.prototype.setThumbSize.call(this, value, 2);
    };

    RangeModelDouble.prototype._update = function _update () {
      RangeModel.prototype._update.call(this);
      var ratio = this._getRatio((this._value + this._value2) * 0.5);
      this._translateX = ratio * this._width;
      this._centerPercent = ratio * 100;
      var ratio1 = this._getRatio(this._value);
      var ratio2 = this._getRatio(this._value2);
      this._progress = {
        left: (((this._innerWidth * ratio1 + this._innerPadding * 0.25).toFixed(2)) + "px"),
        right: (((this._innerWidth * ratio2 + this._innerPadding * 0.75).toFixed(2)) + "px")
      };
    };

    Object.defineProperties( RangeModelDouble.prototype, prototypeAccessors$2 );

    return RangeModelDouble;
  }(RangeModel));

  var RangeModelDoubleStep = /*@__PURE__*/(function (RangeModelDouble) {
    function RangeModelDoubleStep () {
      RangeModelDouble.apply(this, arguments);
    }

    if ( RangeModelDouble ) RangeModelDoubleStep.__proto__ = RangeModelDouble;
    RangeModelDoubleStep.prototype = Object.create( RangeModelDouble && RangeModelDouble.prototype );
    RangeModelDoubleStep.prototype.constructor = RangeModelDoubleStep;

    var prototypeAccessors$3 = { stepWidth: { configurable: true } };

    prototypeAccessors$3.stepWidth.get = function () {
      return ((this._stepWidth.toFixed(3)) + "px");
    };

    RangeModelDoubleStep.prototype._update = function _update () {
      RangeModelDouble.prototype._update.call(this);
      var steps = this._rangeWidth / this._step;
      this._stepWidth = this._innerWidth / steps;
      if (this._stepWidth < 4) { this._stepWidth *= Math.ceil(4 / this._stepWidth); }
    };

    Object.defineProperties( RangeModelDoubleStep.prototype, prototypeAccessors$3 );

    return RangeModelDoubleStep;
  }(RangeModelDouble));

  var RangeTypes = {
    STEP: 'step',
    DOUBLE: 'double',
    DOUBLE_STEP: 'double-step',
    DEFAULT: 'default'
  };

  var Range = /*@__PURE__*/(function (superclass) {
    function Range () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Range.__proto__ = superclass;
    Range.prototype = Object.create( superclass && superclass.prototype );
    Range.prototype.constructor = Range;

    var prototypeAccessors = { type: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Range';
    };

    Range.prototype.init = function init () {
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
      if (this.getAttribute(RangeSelector.RANGE_PREFIX)) { this.setPrefix(this.getAttribute(RangeSelector.RANGE_PREFIX)); }
      if (this.getAttribute(RangeSelector.RANGE_SUFFIX)) { this.setSuffix(this.getAttribute(RangeSelector.RANGE_SUFFIX)); }
      this.update();
    };

    Range.prototype._retrieveType = function _retrieveType () {
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
    };

    prototypeAccessors.type.set = function (value) {
      if (this._type === value) { return; }
      this._type = value;

      var oldModel = this._model;

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
    };

    prototypeAccessors.type.get = function () {
      return this._type;
    };

    Range.prototype._retrieveSize = function _retrieveSize () {
      this._model.isSm = this.matches(RangeSelector.RANGE_SM);
    };

    Range.prototype.resize = function resize () {
      this._retrieveWidth();
      this.update();
    };

    Range.prototype._retrieveWidth = function _retrieveWidth () {
      this._model.width = this.getRect().width;
    };

    Range.prototype.setValue = function setValue (value) {
      this._model.value = value;
      switch (this._type) {
        case RangeTypes.DOUBLE_STEP:
        case RangeTypes.DOUBLE:
          this.descend(RangeEmission.VALUE, value);
          break;
      }
      this.update();
    };

    Range.prototype.setValue2 = function setValue2 (value) {
      this._model.value2 = value;
      this.descend(RangeEmission.VALUE2, value);
      this.update();
    };

    Range.prototype.setConstraints = function setConstraints (constraints) {
      this._model.setConstraints(constraints);
      this.update();
      this.descend(RangeEmission.CONSTRAINTS, constraints);
    };

    Range.prototype.setPrefix = function setPrefix (value) {
      this._model.setPrefix(value);
      this.update();
    };

    Range.prototype.setSuffix = function setSuffix (value) {
      this._model.setSuffix(value);
      this.update();
    };

    Range.prototype.mutate = function mutate (attributesNames) {
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
    };

    Range.prototype.update = function update () {
      this._model.update();
      this.descend(RangeEmission.OUTPUT, this._model.output);
      this.descend(RangeEmission.MIN, this._model.textMin);
      this.descend(RangeEmission.MAX, this._model.textMax);
      var progress = this._model.progress;
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
            this.style.setProperty('background-size', ((parseFloat(progress.right) - parseFloat(progress.left)) + "px " + (this._model.isSm ? '8px' : '12px')));
          }
        }
      } else {
        this.style.removeProperty('--progress-right');
        if (this.isLegacy) {
          this.style.removeProperty('background-size');
          this.style.removeProperty('background-position-x');
        }
      }
      if (this._model.stepWidth) { this.style.setProperty('--step-width', this._model.stepWidth); }
      else { this.style.removeProperty('--step-width'); }
    };

    Range.prototype.mouseMove = function mouseMove (point) {
      if (this._type !== RangeTypes.DOUBLE && this._type !== RangeTypes.DOUBLE_STEP) { return; }
      var x = point.x - this.getRect().left;
      this.descend(RangeEmission.ENABLE_POINTER, (parseFloat(this._model.progress.right) - parseFloat(this._model.progress.left)) / 2 + parseFloat(this._model.progress.left) < x ? 2 : 1);
    };

    Range.prototype.dispose = function dispose () {
      this._observer.disconnect();
    };

    Object.defineProperties( Range.prototype, prototypeAccessors );
    Object.defineProperties( Range, staticAccessors );

    return Range;
  }(api.core.Instance));

  var RangeConstraints = function RangeConstraints (node) {
    this._min = isNaN(node.min) ? 0 : node.min;
    this._max = isNaN(node.max) ? 100 : node.max;
    this._step = isNaN(node.step) ? 1 : node.step;
    this._rangeWidth = this._max - this._min;
  };

  var prototypeAccessors = { min: { configurable: true },max: { configurable: true },step: { configurable: true },rangeWidth: { configurable: true } };

  prototypeAccessors.min.get = function () {
    return this._min;
  };

  prototypeAccessors.max.get = function () {
    return this._max;
  };

  prototypeAccessors.step.get = function () {
    return this._step;
  };

  prototypeAccessors.rangeWidth.get = function () {
    return this._rangeWidth;
  };

  RangeConstraints.prototype.test = function test (min, max, step) {
    return this._min === min && this._max === max && this._step === step;
  };

  Object.defineProperties( RangeConstraints.prototype, prototypeAccessors );

  var RangeInput = /*@__PURE__*/(function (superclass) {
    function RangeInput () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) RangeInput.__proto__ = superclass;
    RangeInput.prototype = Object.create( superclass && superclass.prototype );
    RangeInput.prototype.constructor = RangeInput;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'RangeInput';
    };

    RangeInput.prototype.init = function init () {
      this._init();
      this.node.value = this.getAttribute('value');
      this._changing = this.change.bind(this);
      this._listenerType = this.isLegacy ? 'change' : 'input';
      this.listen(this._listenerType, this._changing);
      if (this.isLegacy) { this.addDescent(RangeEmission.ENABLE_POINTER, this._enablePointer.bind(this)); }
      this.change();
    };

    RangeInput.prototype._init = function _init () {
      var this$1$1 = this;

      this._pointerId = 1;
      this.request(function () {
        if (!this$1$1.hasAttribute('min')) { this$1$1.setAttribute('min', 0); }
        this$1$1.ascend(RangeEmission.CONSTRAINTS, new RangeConstraints(this$1$1.node));
        this$1$1.ascend(RangeEmission.DISABLED, this$1$1.node.disabled);
      });

      this.addDescent(RangeEmission.VALUE2, this.setValue.bind(this));
    };

    RangeInput.prototype._enablePointer = function _enablePointer (pointerId) {
      var isEnabled = pointerId === this._pointerId;
      if (this._isPointerEnabled === isEnabled) { return; }
      this._isPointerEnabled = isEnabled;
      if (isEnabled) { this.style.removeProperty('pointer-events'); }
      else { this.style.setProperty('pointer-events', 'none'); }
    };

    RangeInput.prototype.setValue = function setValue (value) {
      if (parseFloat(this.node.value) > value) {
        this.node.value = value;
        this.change();
      }
    };

    RangeInput.prototype.change = function change () {
      this.ascend(RangeEmission.VALUE, parseFloat(this.node.value));
    };

    RangeInput.prototype.mutate = function mutate (attributesNames) {
      if (attributesNames.includes('disabled')) { this.ascend(RangeEmission.DISABLED, this.node.disabled); }
      if (attributesNames.includes('min') || attributesNames.includes('max') || attributesNames.includes('step')) {
        this.ascend(RangeEmission.CONSTRAINTS, new RangeConstraints(this.node));
        this.change();
      }
    };

    RangeInput.prototype.dispose = function dispose () {
      if (this._listenerType) { this.unlisten(this._listenerType, this._changing); }
    };

    Object.defineProperties( RangeInput, staticAccessors );

    return RangeInput;
  }(api.core.Instance));

  var RangeInput2 = /*@__PURE__*/(function (RangeInput) {
    function RangeInput2 () {
      RangeInput.apply(this, arguments);
    }

    if ( RangeInput ) RangeInput2.__proto__ = RangeInput;
    RangeInput2.prototype = Object.create( RangeInput && RangeInput.prototype );
    RangeInput2.prototype.constructor = RangeInput2;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'RangeInput2';
    };

    RangeInput2.prototype._init = function _init () {
      this._pointerId = 2;
      this.addDescent(RangeEmission.CONSTRAINTS, this.setConstraints.bind(this));
      this.addDescent(RangeEmission.VALUE, this.setValue.bind(this));
    };

    RangeInput2.prototype.setValue = function setValue (value) {
      if (parseFloat(this.node.value) < value) {
        this.node.value = value;
        this.change();
      }
    };

    RangeInput2.prototype.change = function change () {
      this.ascend(RangeEmission.VALUE2, parseFloat(this.node.value));
    };

    RangeInput2.prototype.setConstraints = function setConstraints (constraints) {
      this.node.min = constraints.min;
      this.node.max = constraints.max;
      this.node.step = constraints.step;
      this.change();
    };

    RangeInput2.prototype.mutate = function mutate (attributesNames) {};

    Object.defineProperties( RangeInput2, staticAccessors );

    return RangeInput2;
  }(RangeInput));

  var RangeOutput = /*@__PURE__*/(function (superclass) {
    function RangeOutput () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) RangeOutput.__proto__ = superclass;
    RangeOutput.prototype = Object.create( superclass && superclass.prototype );
    RangeOutput.prototype.constructor = RangeOutput;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'RangeOutput';
    };

    RangeOutput.prototype.init = function init () {
      this.addDescent(RangeEmission.OUTPUT, this.change.bind(this));
    };

    RangeOutput.prototype.change = function change (data) {
      this.node.innerText = data.text;
      this.node.style.transform = data.transform;
    };

    Object.defineProperties( RangeOutput, staticAccessors );

    return RangeOutput;
  }(api.core.Instance));

  var RangeLimit = /*@__PURE__*/(function (superclass) {
    function RangeLimit () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) RangeLimit.__proto__ = superclass;
    RangeLimit.prototype = Object.create( superclass && superclass.prototype );
    RangeLimit.prototype.constructor = RangeLimit;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'RangeLimit';
    };

    RangeLimit.prototype.init = function init () {
      switch (true) {
        case this.matches(RangeSelector.RANGE_MIN):
          this.addDescent(RangeEmission.MIN, this.change.bind(this));
          break;

        case this.matches(RangeSelector.RANGE_MAX):
          this.addDescent(RangeEmission.MAX, this.change.bind(this));
          break;
      }
    };

    RangeLimit.prototype.change = function change (text) {
      this.node.innerText = text;
    };

    Object.defineProperties( RangeLimit, staticAccessors );

    return RangeLimit;
  }(api.core.Instance));

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

})();
//# sourceMappingURL=range.nomodule.js.map

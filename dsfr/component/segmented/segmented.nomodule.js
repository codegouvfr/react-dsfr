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

  var SegmentedSelector = {
    SEGMENTED: api.internals.ns.selector('segmented'),
    SEGMENTED_ELEMENTS: api.internals.ns.selector('segmented__elements'),
    SEGMENTED_ELEMENT: api.internals.ns.selector('segmented__element input'),
    SEGMENTED_LEGEND: api.internals.ns.selector('segmented__legend')
  };

  var SegmentedEmission = {
    ADDED: api.internals.ns.emission('segmented', 'added'),
    REMOVED: api.internals.ns.emission('segmented', 'removed')
  };

  var Segmented = /*@__PURE__*/(function (superclass) {
    function Segmented () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Segmented.__proto__ = superclass;
    Segmented.prototype = Object.create( superclass && superclass.prototype );
    Segmented.prototype.constructor = Segmented;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Segmented';
    };

    Segmented.prototype.init = function init () {
      this.elements = this.node.querySelector(SegmentedSelector.SEGMENTED_ELEMENTS);
      this.legend = this.node.querySelector(SegmentedSelector.SEGMENTED_LEGEND);
      this.addAscent(SegmentedEmission.ADDED, this.resize.bind(this));
      this.addAscent(SegmentedEmission.REMOVED, this.resize.bind(this));
      this._isLegendInline = this.legend && this.legend.classList.contains(((api.prefix) + "-segmented__legend--inline"));
      this.isResizing = true;
    };

    Segmented.prototype.resize = function resize () {
      var SEGMENTED_VERTICAL = (api.prefix) + "-segmented--vertical";
      var LEGEND_INLINE = (api.prefix) + "-segmented__legend--inline";
      var gapOffset = 16;

      this.removeClass(SEGMENTED_VERTICAL);

      if (this._isLegendInline) {
        this.legend.classList.add(LEGEND_INLINE);

        if (this.node.offsetWidth > this.node.parentNode.offsetWidth || (this.elements.scrollWidth + this.legend.offsetWidth + gapOffset) > this.node.parentNode.offsetWidth) {
          this.legend.classList.remove(LEGEND_INLINE);
        }
      }

      if (this.elements.offsetWidth > this.node.parentNode.offsetWidth || this.elements.scrollWidth > this.node.parentNode.offsetWidth) {
        this.addClass(SEGMENTED_VERTICAL);
      } else {
        this.removeClass(SEGMENTED_VERTICAL);
      }
    };

    Object.defineProperties( Segmented, staticAccessors );

    return Segmented;
  }(api.core.Instance));

  var SegmentedElement = /*@__PURE__*/(function (superclass) {
    function SegmentedElement () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) SegmentedElement.__proto__ = superclass;
    SegmentedElement.prototype = Object.create( superclass && superclass.prototype );
    SegmentedElement.prototype.constructor = SegmentedElement;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SegmentedElement';
    };

    SegmentedElement.prototype.init = function init () {
      this.ascend(SegmentedEmission.ADDED);
    };

    SegmentedElement.prototype.dispose = function dispose () {
      this.ascend(SegmentedEmission.REMOVED);
    };

    Object.defineProperties( SegmentedElement, staticAccessors );

    return SegmentedElement;
  }(api.core.Instance));

  api.segmented = {
    SegmentedSelector: SegmentedSelector,
    SegmentedEmission: SegmentedEmission,
    SegmentedElement: SegmentedElement,
    Segmented: Segmented
  };

  api.internals.register(api.segmented.SegmentedSelector.SEGMENTED, api.segmented.Segmented);
  api.internals.register(api.segmented.SegmentedSelector.SEGMENTED_ELEMENT, api.segmented.SegmentedElement);

})();
//# sourceMappingURL=segmented.nomodule.js.map

/*! DSFR v1.11.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.11.2'
};

const api = window[config.namespace];

const SegmentedSelector = {
  SEGMENTED: api.internals.ns.selector('segmented'),
  SEGMENTED_ELEMENTS: api.internals.ns.selector('segmented__elements'),
  SEGMENTED_ELEMENT: api.internals.ns.selector('segmented__element input'),
  SEGMENTED_LEGEND: api.internals.ns.selector('segmented__legend')
};

const SegmentedEmission = {
  ADDED: api.internals.ns.emission('segmented', 'added'),
  REMOVED: api.internals.ns.emission('segmented', 'removed')
};

class Segmented extends api.core.Instance {
  static get instanceClassName () {
    return 'Segmented';
  }

  init () {
    this.elements = this.node.querySelector(SegmentedSelector.SEGMENTED_ELEMENTS);
    this.legend = this.node.querySelector(SegmentedSelector.SEGMENTED_LEGEND);
    this.addAscent(SegmentedEmission.ADDED, this.resize.bind(this));
    this.addAscent(SegmentedEmission.REMOVED, this.resize.bind(this));
    this._isLegendInline = this.legend && this.legend.classList.contains(`${api.prefix}-segmented__legend--inline`);
    this.isResizing = true;
  }

  resize () {
    const SEGMENTED_VERTICAL = `${api.prefix}-segmented--vertical`;
    const LEGEND_INLINE = `${api.prefix}-segmented__legend--inline`;
    const gapOffset = 16;

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
  }
}

class SegmentedElement extends api.core.Instance {
  static get instanceClassName () {
    return 'SegmentedElement';
  }

  init () {
    this.ascend(SegmentedEmission.ADDED);
  }

  dispose () {
    this.ascend(SegmentedEmission.REMOVED);
  }
}

api.segmented = {
  SegmentedSelector: SegmentedSelector,
  SegmentedEmission: SegmentedEmission,
  SegmentedElement: SegmentedElement,
  Segmented: Segmented
};

api.internals.register(api.segmented.SegmentedSelector.SEGMENTED, api.segmented.Segmented);
api.internals.register(api.segmented.SegmentedSelector.SEGMENTED_ELEMENT, api.segmented.SegmentedElement);
//# sourceMappingURL=segmented.module.js.map

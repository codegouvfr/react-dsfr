/*! DSFR v1.12.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.12.1'
};

const api = window[config.namespace];

const TableEmission = {
  SCROLLABLE: api.internals.ns.emission('table', 'scrollable'),
  CHANGE: api.internals.ns.emission('table', 'change'),
  CAPTION_HEIGHT: api.internals.ns.emission('table', 'captionheight'),
  CAPTION_WIDTH: api.internals.ns.emission('table', 'captionwidth')
};

class Table extends api.core.Instance {
  static get instanceClassName () {
    return 'Table';
  }

  init () {
    this.addAscent(TableEmission.CAPTION_HEIGHT, this.setCaptionHeight.bind(this));
  }

  setCaptionHeight (value) {
    this.setProperty('--table-offset', value);
  }
}

class TableWrapper extends api.core.Instance {
  static get instanceClassName () {
    return 'TableWrapper';
  }

  init () {
    this.addAscent(TableEmission.CAPTION_HEIGHT, this.setCaptionHeight.bind(this));
  }

  setCaptionHeight (value) {
    requestAnimationFrame(() => this.ascend(TableEmission.CAPTION_HEIGHT, 0));
    this.setProperty('--table-offset', value);
  }
}

const TableSelector = {
  TABLE: api.internals.ns.selector('table'),
  TABLE_WRAPPER: [`${api.internals.ns.selector('table')} ${api.internals.ns.selector('table__wrapper')}`],
  SHADOW: api.internals.ns.selector('table__shadow'),
  SHADOW_LEFT: api.internals.ns.selector('table__shadow--left'),
  SHADOW_RIGHT: api.internals.ns.selector('table__shadow--right'),
  ELEMENT: [`${api.internals.ns.selector('table')}:not(${api.internals.ns.selector('table--no-scroll')}) table`],
  CAPTION: `${api.internals.ns.selector('table')} table caption`,
  ROW: `${api.internals.ns.selector('table')} tbody tr`,
  COL: `${api.internals.ns.selector('table')} thead th`
};

const SCROLL_OFFSET = 0; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

class TableElement extends api.core.Instance {
  static get instanceClassName () {
    return 'TableElement';
  }

  init () {
    this.listen('scroll', this.scroll.bind(this));
    this.content = this.querySelector('tbody');
    this.tableOffsetHeight = 0;
    this.isResizing = true;
  }

  get isScrolling () {
    return this._isScrolling;
  }

  set isScrolling (value) {
    if (this._isScrolling === value) return;
    this._isScrolling = value;

    if (value) {
      this.addClass(TableSelector.SHADOW);
      this.scroll();
    } else {
      this.removeClass(TableSelector.SHADOW);
      this.removeClass(TableSelector.SHADOW_LEFT);
      this.removeClass(TableSelector.SHADOW_RIGHT);
    }
  }

  /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
  scroll () {
    const isMin = this.node.scrollLeft <= SCROLL_OFFSET;
    const max = this.content.offsetWidth - this.node.offsetWidth - SCROLL_OFFSET;
    const isMax = Math.abs(this.node.scrollLeft) >= max;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const minSelector = isRtl ? TableSelector.SHADOW_RIGHT : TableSelector.SHADOW_LEFT;
    const maxSelector = isRtl ? TableSelector.SHADOW_LEFT : TableSelector.SHADOW_RIGHT;

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
  }

  resize () {
    this.isScrolling = this.content.offsetWidth > this.node.offsetWidth;
  }

  dispose () {
    this.isScrolling = false;
  }
}

const PADDING = '1rem'; // padding de 4v sur le caption
class TableCaption extends api.core.Instance {
  static get instanceClassName () {
    return 'TableCaption';
  }

  init () {
    this.height = 0;
    this.isResizing = true;
  }

  resize () {
    const height = this.getRect().height;
    if (this.height === height) return;
    this.height = height;
    this.ascend(TableEmission.CAPTION_HEIGHT, `calc(${height}px + ${PADDING})`);
  }
}

const CheckboxEmission = {
  CHANGE: api.internals.ns.emission('checkbox', 'change'),
  RETRIEVE: api.internals.ns.emission('checkbox', 'retrieve')
};

class TableRow extends api.core.Instance {
  static get instanceClassName () {
    return 'TableRow';
  }

  init () {
    if (api.checkbox) {
      this.addAscent(CheckboxEmission.CHANGE, this._handleCheckboxChange.bind(this));
      this.descend(CheckboxEmission.RETRIEVE);
    }
  }

  _handleCheckboxChange (node) {
    if (node.name === 'row-select') {
      this.isSelected = node.checked === true;
    }
  }

  render () {
    const height = this.getRect().height + 2;
    if (this._height === height) return;
    this._height = height;
    this.setProperty('--row-height', `${this._height}px`);
  }

  get isSelected () {
    return this._isSelected;
  }

  set isSelected (value) {
    if (this._isSelected === value) return;
    this.isRendering = value;
    this._isSelected = value;
    this.setAttribute('aria-selected', value);
  }
}

api.table = {
  Table: Table,
  TableWrapper: TableWrapper,
  TableElement: TableElement,
  TableCaption: TableCaption,
  TableSelector: TableSelector,
  TableRow: TableRow
};

api.internals.register(api.table.TableSelector.TABLE, api.table.Table);
api.internals.register(api.table.TableSelector.TABLE_WRAPPER, api.table.TableWrapper);
api.internals.register(api.table.TableSelector.ELEMENT, api.table.TableElement);
api.internals.register(api.table.TableSelector.CAPTION, api.table.TableCaption);
api.internals.register(api.table.TableSelector.ROW, api.table.TableRow);
//# sourceMappingURL=table.module.js.map

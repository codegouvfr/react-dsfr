/*! DSFR v1.12.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.12.1'
  };

  var api = window[config.namespace];

  var TableEmission = {
    SCROLLABLE: api.internals.ns.emission('table', 'scrollable'),
    CHANGE: api.internals.ns.emission('table', 'change'),
    CAPTION_HEIGHT: api.internals.ns.emission('table', 'captionheight'),
    CAPTION_WIDTH: api.internals.ns.emission('table', 'captionwidth')
  };

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
      this.setProperty('--table-offset', value);
    };

    Object.defineProperties( Table, staticAccessors );

    return Table;
  }(api.core.Instance));

  var TableWrapper = /*@__PURE__*/(function (superclass) {
    function TableWrapper () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TableWrapper.__proto__ = superclass;
    TableWrapper.prototype = Object.create( superclass && superclass.prototype );
    TableWrapper.prototype.constructor = TableWrapper;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TableWrapper';
    };

    TableWrapper.prototype.init = function init () {
      this.addAscent(TableEmission.CAPTION_HEIGHT, this.setCaptionHeight.bind(this));
    };

    TableWrapper.prototype.setCaptionHeight = function setCaptionHeight (value) {
      var this$1$1 = this;

      requestAnimationFrame(function () { return this$1$1.ascend(TableEmission.CAPTION_HEIGHT, 0); });
      this.setProperty('--table-offset', value);
    };

    Object.defineProperties( TableWrapper, staticAccessors );

    return TableWrapper;
  }(api.core.Instance));

  var TableSelector = {
    TABLE: api.internals.ns.selector('table'),
    TABLE_WRAPPER: [((api.internals.ns.selector('table')) + " " + (api.internals.ns.selector('table__wrapper')))],
    SHADOW: api.internals.ns.selector('table__shadow'),
    SHADOW_LEFT: api.internals.ns.selector('table__shadow--left'),
    SHADOW_RIGHT: api.internals.ns.selector('table__shadow--right'),
    ELEMENT: [((api.internals.ns.selector('table')) + ":not(" + (api.internals.ns.selector('table--no-scroll')) + ") table")],
    CAPTION: ((api.internals.ns.selector('table')) + " table caption"),
    ROW: ((api.internals.ns.selector('table')) + " tbody tr"),
    COL: ((api.internals.ns.selector('table')) + " thead th")
  };

  var SCROLL_OFFSET = 0; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

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
      this.tableOffsetHeight = 0;
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

  var PADDING = '1rem'; // padding de 4v sur le caption
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
      this.ascend(TableEmission.CAPTION_HEIGHT, ("calc(" + height + "px + " + PADDING + ")"));
    };

    Object.defineProperties( TableCaption, staticAccessors );

    return TableCaption;
  }(api.core.Instance));

  var CheckboxEmission = {
    CHANGE: api.internals.ns.emission('checkbox', 'change'),
    RETRIEVE: api.internals.ns.emission('checkbox', 'retrieve')
  };

  var TableRow = /*@__PURE__*/(function (superclass) {
    function TableRow () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TableRow.__proto__ = superclass;
    TableRow.prototype = Object.create( superclass && superclass.prototype );
    TableRow.prototype.constructor = TableRow;

    var prototypeAccessors = { isSelected: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TableRow';
    };

    TableRow.prototype.init = function init () {
      if (api.checkbox) {
        this.addAscent(CheckboxEmission.CHANGE, this._handleCheckboxChange.bind(this));
        this.descend(CheckboxEmission.RETRIEVE);
      }
    };

    TableRow.prototype._handleCheckboxChange = function _handleCheckboxChange (node) {
      if (node.name === 'row-select') {
        this.isSelected = node.checked === true;
      }
    };

    TableRow.prototype.render = function render () {
      var height = this.getRect().height + 2;
      if (this._height === height) { return; }
      this._height = height;
      this.setProperty('--row-height', ((this._height) + "px"));
    };

    prototypeAccessors.isSelected.get = function () {
      return this._isSelected;
    };

    prototypeAccessors.isSelected.set = function (value) {
      if (this._isSelected === value) { return; }
      this.isRendering = value;
      this._isSelected = value;
      this.setAttribute('aria-selected', value);
    };

    Object.defineProperties( TableRow.prototype, prototypeAccessors );
    Object.defineProperties( TableRow, staticAccessors );

    return TableRow;
  }(api.core.Instance));

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

})();
//# sourceMappingURL=table.nomodule.js.map

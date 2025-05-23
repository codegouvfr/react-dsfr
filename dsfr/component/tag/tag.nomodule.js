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

  var TagEvent = {
    DISMISS: api.internals.ns.event('dismiss')
  };

  var TagDismissible = /*@__PURE__*/(function (superclass) {
    function TagDismissible () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TagDismissible.__proto__ = superclass;
    TagDismissible.prototype = Object.create( superclass && superclass.prototype );
    TagDismissible.prototype.constructor = TagDismissible;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TagDismissible';
    };

    TagDismissible.prototype.init = function init () {
      this.listenClick();
    };

    TagDismissible.prototype.handleClick = function handleClick () {
      this.focusClosest();

      switch (api.mode) {
        case api.Modes.ANGULAR:
        case api.Modes.REACT:
        case api.Modes.VUE:
          this.request(this.verify.bind(this));
          break;

        default:
          this.remove();
      }

      this.dispatch(TagEvent.DISMISS);
    };

    TagDismissible.prototype.verify = function verify () {
      if (document.body.contains(this.node)) { this.warn(("a TagDismissible has just been dismissed and should be removed from the dom. In " + (api.mode) + " mode, the api doesn't handle dom modification. An event " + (TagEvent.DISMISS) + " is dispatched by the element to trigger the removal")); }
    };

    Object.defineProperties( TagDismissible, staticAccessors );

    return TagDismissible;
  }(api.core.Instance));

  var TagSelector = {
    PRESSABLE: ((api.internals.ns.selector('tag')) + "[aria-pressed]"),
    DISMISSIBLE: ("" + (api.internals.ns.selector('tag--dismiss')))
  };

  api.tag = {
    TagDismissible: TagDismissible,
    TagSelector: TagSelector,
    TagEvent: TagEvent
  };

  api.internals.register(api.tag.TagSelector.PRESSABLE, api.core.Toggle);
  api.internals.register(api.tag.TagSelector.DISMISSIBLE, api.tag.TagDismissible);

})();
//# sourceMappingURL=tag.nomodule.js.map

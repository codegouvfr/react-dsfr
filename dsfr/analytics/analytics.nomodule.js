/*! DSFR v1.9.3 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.9.3'
  };

  var api = window[config.namespace];

  var patch = {
    namespace: 'a4e35ba2a938ba9d007689dbf3f46acbb9807869'
  };

  var Collection = {
    MANUAL: 'manual',
    LOAD: 'load',
    FULL: 'full',
    HASH: 'hash'
  };

  var key = '_EA_';
  var DISABLED = key + "disabled";
  var TOGGLE = key + "toggle";

  var Opt = function Opt () {
    this._configure();
  };

  var prototypeAccessors$f = { isDisabled: { configurable: true } };

  Opt.prototype._configure = function _configure () {
    var scope = this;
    window[DISABLED] = function () { return scope.isDisabled; };
    window[TOGGLE] = this.toggle.bind(this);
  };

  prototypeAccessors$f.isDisabled.get = function () {
    return localStorage.getItem(key);
  };

  Opt.prototype.toggle = function toggle () {
    if (this.isDisabled) { this.enable(); }
    else { this.disable(); }
  };

  Opt.prototype.enable = function enable () {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  };

  Opt.prototype.disable = function disable () {
    localStorage.setItem(key, '1');
  };

  Object.defineProperties( Opt.prototype, prototypeAccessors$f );

  var opt = new Opt();

  var PUSH = 'EA_push';

  var Init = function Init (domain) {
    var this$1$1 = this;

    this._domain = domain;
    this._isLoaded = false;
    this._promise = new Promise(function (resolve, reject) {
      this$1$1._resolve = resolve;
      this$1$1._reject = reject;
    });
  };

  var prototypeAccessors$e = { id: { configurable: true },store: { configurable: true } };

  prototypeAccessors$e.id.get = function () {
    return this._id;
  };

  prototypeAccessors$e.store.get = function () {
    return this._store;
  };

  Init.prototype.configure = function configure () {
    this.init();
    return this._promise;
  };

  Init.prototype.init = function init () {
      var this$1$1 = this;

    var bit = 5381;
    for (var i = this._domain.length - 1; i > 0; i--) { bit = (bit * 33) ^ this._domain.charCodeAt(i); }
    bit >>>= 0;
    this._id = "_EA_" + bit;

    this._store = [];
    this._store.eah = this._domain;
    window[this._id] = this._store;

    if (!window[PUSH]) { window[PUSH] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return this$1$1.store.push(args);
        }; }

    if (opt.isDisabled) {
      api.inspector.warn('User opted out, eulerian is disabled');
      this._reject('User opted out, eulerian is disabled');
    } else { this.load(); }
  };

  Init.prototype.load = function load () {
    var stamp = new Date() / 1E7 | 0;
    var offset = stamp % 26;
    var key = String.fromCharCode(97 + offset, 122 - offset, 65 + offset) + (stamp % 1E3);
    this._script = document.createElement('script');
    this._script.ea = this.id;
    this._script.async = true;
    this._script.addEventListener('load', this.loaded.bind(this));
    this._script.addEventListener('error', this.error.bind(this));
    this._script.src = "//" + (this._domain) + "/" + key + ".js?2";
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(this._script, node);
  };

  Init.prototype.error = function error () {
    api.inspector.error('unable to load Eulerian script file. the domain declared in your configuration must match the domain provided by the Eulerian interface (tag creation)');
    this._reject('eulerian script loading error');
  };

  Init.prototype.loaded = function loaded () {
    if (this._isLoaded) { return; }
    this._isLoaded = true;
    this._resolve();
  };

  Object.defineProperties( Init.prototype, prototypeAccessors$e );

  /*
  (function(e, a) {
    var i = e.length,
      y = 5381,
      k = 'script',
      s = window,
      v = document,
      o = v.createElement(k);
    for (; i;) {
      i -= 1;
      y = (y * 33) ^ e.charCodeAt(i)
    }
    y = '_EA_' + (y >>>= 0);
    (function(e, a, s, y) {
      s[a] = s[a] || function() {
        (s[y] = s[y] || []).push(arguments);
        s[y].eah = e;
      };
    }(e, a, s, y));
    i = new Date / 1E7 | 0;
    o.ea = y;
    y = i % 26;
    o.async = 1;
    o.src = '//' + e + '/' + String.fromCharCode(97 + y, 122 - y, 65 + y) + (i % 1E3) + '.js?2';
    s = v.getElementsByTagName(k)[0];
    s.parentNode.insertBefore(o, s);
  })
  ('mon.domainedetracking.com', 'EA_push');
  */

  /*
  (function(e, a) {
    var i = e.length,
      y = 5381,
      k = 'script',
      z = '_EA_',
      zd = z + 'disabled',
      s = window,
      v = document,
      o = v.createElement(k),
      l = s.localStorage;
    for (; i;) {
      i -= 1;
      y = (y * 33) ^ e.charCodeAt(i)
    }
    y = z + (y >>>= 0);
    (function(e, a, s, y, z, zd, l) {
      s[a] = s[a] || function() {
        (s[y] = s[y] || []).push(arguments);
        s[y].eah = e;
      };
      s[zd] = function() {
        return l.getItem(z);
      };
      s[z + 'toggle'] = function() {
        (s[zd]()) ? l.removeItem(z): l.setItem(z, 1);
      }
    }(e, a, s, y, z, zd, l));
    if (!s[zd]()) {
      i = new Date / 1E7 | 0;
      o.ea = y;
      y = i % 26;
      o.async = 1;
      o.src = '//' + e + '/' + String.fromCharCode(97 + y, 122 - y, 65 + y) + (i % 1E3) + '.js?2';
      s = v.getElementsByTagName(k)[0];
      s.parentNode.insertBefore(o, s);
    }
  })('mon.domainedetracking.com', 'EA_push');
  */

  var State = {
    UNKNOWN: -1,
    CONFIGURING: 0,
    CONFIGURED: 1,
    INITIATED: 2,
    READY: 3
  };

  var TarteAuCitronIntegration = function TarteAuCitronIntegration (config) {
    var this$1$1 = this;

    this._config = config;
    this._state = State.UNKNOWN;
    this._promise = new Promise(function (resolve, reject) {
      this$1$1._resolve = resolve;
      this$1$1._reject = reject;
    });
  };

  TarteAuCitronIntegration.prototype.configure = function configure () {
    if (this._state >= State.CONFIGURED) { return this._promise; }
    if (this._state === State.UNKNOWN) {
      api.inspector.info('analytics configures tarteaucitron');
      this._state = State.CONFIGURING;
    }

    var tarteaucitron = window.tarteaucitron;
    if (!tarteaucitron || !tarteaucitron.services) {
      window.requestAnimationFrame(this.configure.bind(this));
      return;
    }

    this._state = State.CONFIGURED;
    var init = this.init.bind(this);

    var data = {
      key: 'eulerian',
      type: 'analytic',
      name: 'Eulerian Analytics',
      needConsent: true,
      cookies: ['etuix'],
      uri: 'https://eulerian.com/vie-privee',
      js: init,
      fallback: function () { tarteaucitron.services.eulerian.js(); }
    };

    tarteaucitron.services.eulerian = data;
    if (!tarteaucitron.job) { tarteaucitron.job = []; }
    tarteaucitron.job.push('eulerian');

    return this._promise;
  };

  TarteAuCitronIntegration.prototype.init = function init () {
    if (this._state >= State.INITIATED) { return; }
    this._state = State.INITIATED;
    window.__eaGenericCmpApi = this.integrate.bind(this);
    var update = this.update.bind(this);
    window.addEventListener('tac.close_alert', update);
    window.addEventListener('tac.close_panel', update);
  };

  TarteAuCitronIntegration.prototype.integrate = function integrate (cmpApi) {
    if (this._state >= State.READY) { return; }
    this._state = State.READY;
    this._cmpApi = cmpApi;

    api.inspector.info('analytics has integrated tarteaucitron');

    this._resolve();
    this.update();
  };

  TarteAuCitronIntegration.prototype.update = function update () {
    if (this._state < State.READY) { return; }
    this._cmpApi('tac', window.tarteaucitron, 1);
  };

  var ConsentManagerPlatform = function ConsentManagerPlatform (config) {
    this._config = config;

    if (config) {
      switch (config.id) {
        case 'tarteaucitron':
          this.integrateTarteAuCitron();
          break;
      }
    }
  };

  ConsentManagerPlatform.prototype.integrateTarteAuCitron = function integrateTarteAuCitron () {
    this._tac = new TarteAuCitronIntegration(this._config);
    return this._tac.configure();
  };

  ConsentManagerPlatform.prototype.optin = function optin () {

  };

  var push = function (type, layer) {
    if (typeof window.EA_push !== 'function') {
      api.inspector.warn('Analytics datalayer not sent, Eulerian API isn\'t yet avalaible');
      return;
    }

    api.inspector.info('analytics', type, layer);

    window.EA_push(type, layer);
  };

  var PushType = {
    COLLECTOR: 'collector',
    ACTION: 'action',
    ACTION_PARAMETER: 'actionparam'
  };

  var ActionMode = {
    IN: 'in',
    OUT: 'out',
    NONE: 'none'
  };

  /*  '["\'<>*$&~`|\\\\?^~]'; */
  var RESTRICTED = {
    '0x0022': '＂',
    '0x0024': '＄',
    '0x0026': '＆',
    '0x0027': '＇',
    '0x002a': '＊',
    '0x002c': '，',
    '0x003c': '＜',
    '0x003e': '＞',
    '0x003f': '？',
    '0x005c': '＼',
    '0x005e': '＾',
    '0x0060': '｀',
    '0x007c': '｜',
    '0x007e': '～'
  };

  // import TABLE from './unicode-table';

  var charCodeHex = function (char) {
    var code = char.charCodeAt(0).toString(16);
    return '0x0000'.slice(0, -code.length) + code;
  };

  var normalize = function (text) {
    if (!text) { return text; }
    // text = [...text].map(char => TABLE[charCodeHex(char)] || char).join('');
    text = [].concat( text ).map(function (char) { return RESTRICTED[charCodeHex(char)] || char; }).join('');
    text = text.replace(/\s+/g, ' ').replace(/\s/g, '_');
    text = text.toLowerCase();
    return text;
  };

  var validateString = function (value, name, allowNull) {
    if ( allowNull === void 0 ) allowNull = true;

    switch (true) {
      case typeof value === 'number':
        return ("" + value);

      case typeof value === 'string':
        return value;

      case value === undefined && allowNull:
      case value === null && allowNull:
        return '';
    }

    api.inspector.warn(("unexpected value '" + value + "' set at analytics." + name + ". Expecting a String"));
    return null;
  };

  var validateNumber = function (value, name, allowNull) {
    if ( allowNull === void 0 ) allowNull = true;

    switch (true) {
      case !isNaN(value):
        return value;

      case typeof value === 'string' && !isNaN(Number(value)):
        return Number(value);

      case value === undefined && allowNull:
      case value === null && allowNull:
        return -1;
    }

    api.inspector.warn(("unexpected value '" + value + "' set at analytics." + name + ". Expecting a Number"));
    return null;
  };

  var validateBoolean = function (value, name) {
    switch (true) {
      case typeof value === 'boolean':
        return value;

      case typeof value === 'string' && value.toLowerCase() === 'true':
      case value === '1':
      case value === 1:
        return true;

      case typeof value === 'string' && value.toLowerCase() === 'false':
      case value === '0':
      case value === 0:
        return false;

      case value === undefined:
      case value === null:
        return value;
    }

    api.inspector.warn(("unexpected value '" + value + "' set at analytics." + name + ". Expecting a Boolean"));
    return null;
  };

  var validateLang = function (value, name, allowNull) {
    if ( allowNull === void 0 ) allowNull = true;

    switch (true) {
      case typeof value === 'string' && /^[A-Za-z]{2}$|^[A-Za-z]{2}[-_]/.test(value):
        return value.split(/[-_]/)[0].toLowerCase();

      case value === undefined && allowNull:
      case value === null && allowNull:
        return '';
    }

    api.inspector.warn(("unexpected value '" + value + "' set at analytics." + name + ". Expecting language as a String following ISO 639-1 format"));
    return null;
  };

  var validateGeography = function (value, name, allowNull) {
    if ( allowNull === void 0 ) allowNull = true;

    switch (true) {
      case typeof value === 'string':
        if (!/^FR-[A-Z0-9]{2,3}$/.test(value)) { api.inspector.warn(("value '" + value + "' set at analytics." + name + " with wrong format. Geographic location should be a String following ISO 3166-2:FR format")); }
        return value;

      case value === undefined && allowNull:
      case value === null && allowNull:
        return '';
    }

    api.inspector.warn(("unexpected value '" + value + "' set at analytics." + name + ". Expecting geographic location as a String following ISO 3166-2:FR format"));
    return null;
  };

  var ActionStatus = {
    UNSTARTED: {
      id: 'unstarted',
      value: -1
    },
    STARTED: {
      id: 'started',
      value: 1
    },
    ENDED: {
      id: 'ended',
      value: 2
    },
    SINGULAR: {
      id: 'singular',
      value: 3
    }
  };

  var getParametersLayer = function (data) {
    return Object.entries(data).map(function (ref) {
      var key = ref[0];
      var value = ref[1];

      return ['actionpname', normalize(key), 'actionpvalue', normalize(value)];
    }).flat();
  };

  var Action = function Action (name) {
    this._isMuted = false;
    this._name = name;
    this._status = ActionStatus.UNSTARTED;
    this._labels = [];
    this._parameters = {};
  };

  var prototypeAccessors$d = { isMuted: { configurable: true },isSingular: { configurable: true },status: { configurable: true },name: { configurable: true },labels: { configurable: true },reference: { configurable: true },parameters: { configurable: true },_base: { configurable: true } };

  prototypeAccessors$d.isMuted.get = function () {
    return this._isMuted;
  };

  prototypeAccessors$d.isMuted.set = function (value) {
    this._isMuted = value;
  };

  prototypeAccessors$d.isSingular.get = function () {
    return this._status === ActionStatus.SINGULAR;
  };

  prototypeAccessors$d.status.get = function () {
    return this._status;
  };

  prototypeAccessors$d.name.get = function () {
    return this._name;
  };

  prototypeAccessors$d.labels.get = function () {
    return this._labels;
  };

  prototypeAccessors$d.reference.get = function () {
    return this._reference;
  };

  prototypeAccessors$d.parameters.get = function () {
    return this._parameters;
  };

  Action.prototype.singularize = function singularize () {
    this._status = ActionStatus.SINGULAR;
  };

  Action.prototype.rewind = function rewind () {
    switch (this._status) {
      case ActionStatus.STARTED:
      case ActionStatus.ENDED:
        this._status = ActionStatus.UNSTARTED;
    }
  };

  Action.prototype.addParameter = function addParameter (key, value) {
    this._parameters[key] = value;
  };

  Action.prototype.removeParameter = function removeParameter (key) {
    delete this._parameters[key];
  };

  prototypeAccessors$d.reference.set = function (value) {
    var valid = validateString(value, ("action " + (this._name)));
    if (valid !== null) { this._reference = valid; }
  };

  prototypeAccessors$d._base.get = function () {
    return ['actionname', this._name];
  };

  Action.prototype._getLayer = function _getLayer (mode, data) {
      if ( data === void 0 ) data = {};

    if (this._isMuted) { return []; }
    var layer = this._base;
    switch (mode) {
      case ActionMode.IN:
      case ActionMode.OUT:
        layer.push('actionmode', mode);
        break;
    }

    var labels = this._labels.slice(0, 5);
    labels.length = 5;
    if (labels.some(function (label) { return label; })) { layer.push('actionlabel', labels.map(function (label) { return typeof label === 'string' ? normalize(label) : ''; }).join(',')); }

    if (this._reference) { layer.push('actionref', this._reference); }

    layer.push.apply(layer, getParametersLayer(Object.assign(this._parameters, data || {})));
    return layer;
  };

  Action.prototype.start = function start (data) {
    var mode;
    switch (this._status) {
      case ActionStatus.UNSTARTED:
        mode = ActionMode.IN;
        this._status = ActionStatus.STARTED;
        break;

      case ActionStatus.SINGULAR:
        mode = ActionMode.NONE;
        break;

      default:
        api.inspector.error(("unexpected start on action " + (this._name) + " with status " + (this._status.id)));
        return [];
    }
    return this._getLayer(mode, data);
  };

  Action.prototype.end = function end (data) {
    var mode;
    switch (this._status) {
      case ActionStatus.STARTED:
        mode = ActionMode.OUT;
        this._status = ActionStatus.ENDED;
        break;

      case ActionStatus.UNSTARTED:
      case ActionStatus.ENDED:
        mode = ActionMode.NONE;
        this._status = ActionStatus.ENDED;
        break;

      case ActionStatus.SINGULAR:
        mode = ActionMode.NONE;
        break;
    }
    return this._getLayer(mode, data);
  };

  Action.prototype.resume = function resume (data) {
    if (this._isMuted) { return []; }
    if (this._status.value >= ActionStatus.ENDED.value) {
      api.inspector.error(("unexpected resuming on action " + (this._name) + " with status " + (this._status.id)));
      return [];
    }
    var layer = this._base;
    if (data) { layer.push.apply(layer, getParametersLayer(data)); }
    return layer;
  };

  Object.defineProperties( Action.prototype, prototypeAccessors$d );

  var Actions = function Actions () {
    this._actions = [];
    this._isRatingEnabled = false;
  };

  var prototypeAccessors$c = { isRatingEnabled: { configurable: true } };

  Actions.prototype.configure = function configure (config) {
    this._isRatingEnabled = config.enableRating === true;
  };

  prototypeAccessors$c.isRatingEnabled.get = function () {
    return this._isRatingEnabled;
  };

  Actions.prototype.rewind = function rewind () {
    this._actions.forEach(function (action) { return action.rewind(); });
  };

  Actions.prototype.getAction = function getAction (name) {
    var action = this._actions.filter(function (action) { return action.name === name; })[0];
    if (!action) {
      action = new Action(name);
      this._actions.push(action);
    }
    return action;
  };

  Actions.prototype.hasAction = function hasAction (name) {
    return this._actions.some(function (action) { return action.name === name; });
  };

  Actions.prototype.remove = function remove (action) {
    var index = this._actions.indexOf(action);
    if (index === -1) { return false; }
    this._actions.splice(index, 1);
    return true;
  };

  Object.defineProperties( Actions.prototype, prototypeAccessors$c );

  Actions.ActionMode = ActionMode;

  var actions = new Actions();
  Actions.instance = actions;

  var Renderer = function Renderer () {
    this._renderables = [];
    this._rendering = this.render.bind(this);
    requestAnimationFrame(this._rendering);
  };

  Renderer.prototype.add = function add (renderable) {
    var index = this._renderables.indexOf(renderable);
    if (index === -1) { this._renderables.push(renderable); }
  };

  Renderer.prototype.remove = function remove (renderable) {
    var index = this._renderables.indexOf(renderable);
    if (index > -1) { this._renderables.splice(index, 1); }
  };

  Renderer.prototype.render = function render () {
    this._renderables.forEach(function (renderable) { return renderable.render(); });
    requestAnimationFrame(this._rendering);
  };

  var renderer = new Renderer();

  var SLICE = 80;

  var Queue = function Queue () {
    this._startingActions = [];
    this._endingActions = [];
    this._handlingVisibilityChange = this._handleVisibilityChange.bind(this);
    this._handlingEnd = this._handleEnd.bind(this);
    this._isStarted = false;
    this._isListening = false;
    this.reset();
  };

  Queue.prototype.setCollector = function setCollector (collector) {
    this._collector = collector;
  };

  Queue.prototype.reset = function reset (ending) {
      if ( ending === void 0 ) ending = false;

    this._type = PushType.ACTION;
    if (!ending) { this._startingActions.length = 0; }
    this._endingActions.length = 0;
    this._count = 0;
    this._delay = -1;
    this._isRequested = false;
    this._unlisten();
  };

  Queue.prototype.start = function start () {
    if (this._isStarted) { return; }
    this._isStarted = true;
    renderer.add(this);
  };

  Queue.prototype.collect = function collect () {
    this._type = PushType.COLLECTOR;
    this._request();
  };

  Queue.prototype.appendStartingAction = function appendStartingAction (action, data) {
    if (!action || this._startingActions.some(function (queued) { return queued.test(action); })) {
      api.inspector.log('appendStartingAction exists or null', action);
      return;
    }
    var queued = new QueuedAction(action, data);
    this._startingActions.push(queued);
    this._request();
  };

  Queue.prototype.appendEndingAction = function appendEndingAction (action, data) {
    if (!action || this._endingActions.some(function (queued) { return queued.test(action); })) {
      api.inspector.log('appendEndingAction exists or null', action);
      return;
    }
    var queued = new QueuedAction(action, data);
    this._endingActions.push(queued);
    this._request();
  };

  Queue.prototype._request = function _request () {
    this._listen();
    this._isRequested = true;
    this._delay = 4;
  };

  Queue.prototype._listen = function _listen () {
    if (this._isListening) { return; }
    this._isListening = true;
    document.addEventListener('visibilitychange', this._handlingVisibilityChange);
    document.addEventListener('unload', this._handlingEnd);
    document.addEventListener('beforeunload', this._handlingEnd);
    document.addEventListener('pagehide', this._handlingEnd);
  };

  Queue.prototype._unlisten = function _unlisten () {
    if (!this._isListening) { return; }
    this._isListening = false;
    document.removeEventListener('visibilitychange', this._handlingVisibilityChange);
    document.removeEventListener('unload', this._handlingEnd);
    document.removeEventListener('beforeunload', this._handlingEnd);
    document.removeEventListener('pagehide', this._handlingEnd);
  };

  Queue.prototype._handleVisibilityChange = function _handleVisibilityChange (e) {
    if (document.visibilityState === 'hidden') { this.send(); }
  };

  Queue.prototype._handleEnd = function _handleEnd () {
    this.send();
  };

  Queue.prototype.render = function render () {
    if (this._delay <= -1) { return; }
    this._delay--;
    this._count++;
    switch (true) {
      case this._count > 20:
      case this._delay === 0:
        this.send();
        break;
    }
  };

  Queue.prototype.send = function send (ending) {
      if ( ending === void 0 ) ending = false;

    if (!this._isRequested) { return; }
    var actionLayers = [];
    if (!ending) { actionLayers.push.apply(actionLayers, this._startingActions.map(function (queued) { return queued.start(); }).filter(function (layer) { return layer.length > 0; })); }
    actionLayers.push.apply(actionLayers, this._endingActions.map(function (queued) { return queued.end(); }).filter(function (layer) { return layer.length > 0; }));

    var length = ((actionLayers.length / SLICE) + 1) | 0;
    var slices = [];
    for (var i = 0; i < length; i++) {
      var slice = actionLayers.slice(i * SLICE, (i + 1) * SLICE);
      slices.push(slice.flat());
    }

    if (this._type === PushType.COLLECTOR) {
      var layer = this._collector.layer;
      if (slices.length > 0) {
        var slice$1 = slices.splice(0, 1)[0];
        if (slice$1.length > 0) { layer.push.apply(layer, slice$1); }
      }
      layer.flat();
      if (layer.length > 0) { push(PushType.COLLECTOR, layer); }
    }

    if (slices.length > 0) {
      for (var i$1 = 0; i$1 < slices.length; i$1++) {
        var slice$2 = slices[i$1];
        if (slice$2.length > 0) { push(PushType.ACTION, slice$2); }
      }
    }

    this.reset(ending);
  };

  var QueuedAction = function QueuedAction (action, data) {
    this._action = action;
    this._data = data;
  };

  QueuedAction.prototype.test = function test (action) {
    return this._action === action;
  };

  QueuedAction.prototype.start = function start () {
    return this._action.start(this._data);
  };

  QueuedAction.prototype.end = function end () {
    return this._action.end(this._data);
  };

  var queue = new Queue();

  var Debug = function Debug () {};

  var prototypeAccessors$b = { debugger: { configurable: true },isActive: { configurable: true } };

  prototypeAccessors$b.debugger.get = function () {
    return window._oEa;
  };

  prototypeAccessors$b.isActive.get = function () {
    if (!this.debugger) { return false; }
    return this.debugger._dbg === '1';
  };

  prototypeAccessors$b.isActive.set = function (value) {
    if (!this.debugger || this.isActive === value) { return; }
    this.debugger.debug(value ? 1 : 0);
  };

  Object.defineProperties( Debug.prototype, prototypeAccessors$b );

  var debug = new Debug();

  var Status = {
    CONNECTED: {
      id: 'connected',
      value: 'connecté',
      isConnected: true,
      isDefault: true
    },
    ANONYMOUS: {
      id: 'anonymous',
      value: 'anonyme',
      isConnected: false,
      isDefault: true
    },
    GUEST: {
      id: 'guest',
      value: 'invité',
      isConnected: false
    }
  };

  var Profile = {
    VISITOR: {
      id: 'visitor',
      value: 'visitor'
    },
    LOOKER: {
      id: 'looker',
      value: 'looker'
    },
    SHOPPER: {
      id: 'shopper',
      value: 'shopper'
    },
    BUYER: {
      id: 'buyer',
      value: 'buyer'
    },
    REBUYER: {
      id: 'rebuyer',
      value: 'rebuyer'
    }
  };

  var Type$2 = {
    INDIVIDUAL: {
      id: 'individual',
      value: 'part'
    },
    PROFESSIONNAL: {
      id: 'professionnal',
      value: 'pro'
    }
  };

  var User = function User (config) {
    this._config = config || {};
  };

  var prototypeAccessors$a = { uid: { configurable: true },email: { configurable: true },isNew: { configurable: true },status: { configurable: true },profile: { configurable: true },language: { configurable: true },type: { configurable: true },layer: { configurable: true } };

  User.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this._isConnected = false;
    this.status = Status.ANONYMOUS;
    if (!clear && this._config.connect) { this.connect(this._config.connect.uid, this._config.connect.email, this._config.connect.isNew); }
    else {
      this._uid = undefined;
      this._email = undefined;
      this._isNew = false;
    }
    this.profile = clear ? undefined : this._config.profile;
    this.language = clear ? undefined : this._config.language;
    this.type = clear ? undefined : this._config.type;
  };

  User.prototype.connect = function connect (uid, email, isNew) {
      if ( isNew === void 0 ) isNew = false;

    this._uid = validateString(uid, 'user.uid');
    if (/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/.test(email)) { api.inspector.warn('Please check analytics.user.email is properly encrypted '); }
    this._email = validateString(email, 'user.email');
    this._isNew = validateBoolean(isNew);
    this._isConnected = true;
    this.status = Status.CONNECTED;
  };

  prototypeAccessors$a.uid.get = function () {
    return this._uid;
  };

  prototypeAccessors$a.email.get = function () {
    return this._email;
  };

  prototypeAccessors$a.isNew.get = function () {
    return this._isNew;
  };

  prototypeAccessors$a.status.set = function (id) {
      var this$1$1 = this;

    var stati = Object.values(Status).filter(function (status) { return status.isConnected === this$1$1._isConnected; });
    this._status = stati.filter(function (status) { return status.id === id || status.value === id; })[0] || stati.filter(function (status) { return status.isDefault; })[0];
  };

  prototypeAccessors$a.status.get = function () {
    return this._status.id;
  };

  prototypeAccessors$a.profile.set = function (id) {
    this._profile = Object.values(Profile).filter(function (profile) { return profile.id === id || profile.value === id; })[0];
  };

  prototypeAccessors$a.profile.get = function () {
    return this._profile.id;
  };

  prototypeAccessors$a.language.set = function (value) {
    var valid = validateLang(value, 'user.language');
    if (valid !== null) { this._language = valid; }
  };

  prototypeAccessors$a.language.get = function () {
    return this._language || navigator.language;
  };

  prototypeAccessors$a.type.set = function (id) {
    this._type = Object.values(Type$2).filter(function (type) { return type.id === id || type.value === id; })[0];
  };

  prototypeAccessors$a.type.get = function () {
    return this._type.id;
  };

  prototypeAccessors$a.layer.get = function () {
    var layer = [];
    if (this.uid) { layer.push('uid', normalize(this.uid)); }
    if (this.email) { layer.push('email', normalize(this.email)); }
    if (this.isNew) { layer.push('newcustomer', '1'); }
    if (this.language) { layer.push('user_language', this.language); }
    layer.push('user_login_status', this._status.value);
    if (this._profile) { layer.push('profile', this._profile.value); }
    if (this._type) { layer.push('user_type', this._type.value); }
    return layer;
  };

  Object.defineProperties( User.prototype, prototypeAccessors$a );

  User.Status = Status;
  User.Profile = Profile;
  User.Type = Type$2;

  var Environment = {
    DEVELOPMENT: {
      id: 'development',
      value: 'dev'
    },
    STAGE: {
      id: 'stage',
      value: 'stage'
    },
    PRODUCTION: {
      id: 'production',
      value: 'prod'
    }
  };

  var Site = function Site (config) {
    this._config = config || {};
  };

  var prototypeAccessors$9 = { environment: { configurable: true },entity: { configurable: true },language: { configurable: true },target: { configurable: true },type: { configurable: true },region: { configurable: true },department: { configurable: true },api: { configurable: true },layer: { configurable: true } };

  Site.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this.environment = clear ? Environment.DEVELOPMENT.id : this._config.environment;
    this.entity = clear ? undefined : this._config.entity;
    this.language = clear ? undefined : this._config.language;
    this.target = clear ? undefined : this._config.target;
    this.type = clear ? undefined : this._config.type;
    this.region = clear ? undefined : this._config.region;
    this.department = clear ? undefined : this._config.department;
    this._api = api.version;
  };

  prototypeAccessors$9.environment.set = function (value) {
    switch (value) {
      case Environment.PRODUCTION.id:
      case Environment.PRODUCTION.value:
        this._environment = Environment.PRODUCTION;
        break;

      case Environment.STAGE.id:
      case Environment.STAGE.value:
        this._environment = Environment.STAGE;
        break;

      case Environment.DEVELOPMENT.id:
      case Environment.DEVELOPMENT.value:
        this._environment = Environment.DEVELOPMENT;
        break;

      default:
        this._environment = Environment.DEVELOPMENT;
    }
  };

  prototypeAccessors$9.environment.get = function () {
    return this._environment ? this._environment.id : Environment.DEVELOPMENT.id;
  };

  prototypeAccessors$9.entity.set = function (value) {
    var valid = validateString(value, 'site.entity');
    if (valid !== null) { this._entity = valid; }
  };

  prototypeAccessors$9.entity.get = function () {
    return this._entity;
  };

  prototypeAccessors$9.language.set = function (value) {
    var valid = validateLang(value, 'site.language');
    if (valid !== null) { this._language = valid; }
  };

  prototypeAccessors$9.language.get = function () {
    return this._language || document.documentElement.lang;
  };

  prototypeAccessors$9.target.set = function (value) {
    var valid = validateString(value, 'site.target');
    if (valid !== null) { this._target = valid; }
  };

  prototypeAccessors$9.target.get = function () {
    return this._target;
  };

  prototypeAccessors$9.type.set = function (value) {
    var valid = validateString(value, 'site.type');
    if (valid !== null) { this._type = valid; }
  };

  prototypeAccessors$9.type.get = function () {
    return this._type;
  };

  prototypeAccessors$9.region.set = function (value) {
    var valid = validateGeography(value, 'site.region');
    if (valid !== null) { this._region = valid; }
  };

  prototypeAccessors$9.region.get = function () {
    return this._region;
  };

  prototypeAccessors$9.department.set = function (value) {
    var valid = validateGeography(value, 'site.department');
    if (valid !== null) { this._department = valid; }
  };

  prototypeAccessors$9.department.get = function () {
    return this._department;
  };

  prototypeAccessors$9.api.get = function () {
    return this._api;
  };

  prototypeAccessors$9.layer.get = function () {
    var layer = [];
    layer.push('site_environment', this._environment.value);
    if (this.entity) { layer.push('site_entity', normalize(this.entity)); }
    else { api.inspector.warn('entity is required in analytics.site'); }
    if (this.language) { layer.push('site_language', this.language); }
    if (this.target) { layer.push('site_target', normalize(this.target)); }
    if (this.type) { layer.push('site_type', normalize(this.type)); }
    if (this.region) { layer.push('site_region', this.region); }
    if (this.department) { layer.push('site_department', this.department); }
    if (this.api) { layer.push('api_version', this.api); }
    return layer;
  };

  Object.defineProperties( Site.prototype, prototypeAccessors$9 );

  Site.Environment = Environment;

  var Page = function Page (config) {
    this._config = config || {};
  };

  var prototypeAccessors$8 = { path: { configurable: true },referrer: { configurable: true },title: { configurable: true },name: { configurable: true },labels: { configurable: true },categories: { configurable: true },isError: { configurable: true },template: { configurable: true },segment: { configurable: true },group: { configurable: true },subtemplate: { configurable: true },theme: { configurable: true },subtheme: { configurable: true },related: { configurable: true },depth: { configurable: true },current: { configurable: true },total: { configurable: true },filters: { configurable: true },layer: { configurable: true } };

  Page.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this.path = clear ? '' : this._config.path;
    this.referrer = clear ? '' : this._config.referrer;
    this.title = clear ? '' : this._config.title;
    this.name = clear ? '' : this._config.name;
    this._labels = clear || !this._config.labels ? ['', '', '', '', ''] : this._config.labels;
    this._categories = clear || !this._config.categories ? ['', '', ''] : this._config.categories;
    this._labels.length = 5;
    this.isError = !clear && this._config.isError;
    this.template = clear ? '' : this._config.template;
    this.group = clear ? '' : this._config.group;
    this.segment = clear ? '' : this._config.segment;
    this.subtemplate = clear ? '' : this._config.subtemplate;
    this.theme = clear ? '' : this._config.theme;
    this.subtheme = clear ? '' : this._config.subtheme;
    this.related = clear ? '' : this._config.related;
    this.depth = clear || isNaN(this._config.depth) ? 0 : this._config.depth;
    this.current = clear || isNaN(this._config.current) ? -1 : this._config.current;
    this.total = clear || isNaN(this._config.total) ? -1 : this._config.total;
    this._filters = clear || !this._config.filters ? [] : this._config.filters;
  };

  prototypeAccessors$8.path.set = function (value) {
    var valid = validateString(value, 'page.path');
    if (valid !== null) { this._path = valid; }
  };

  prototypeAccessors$8.path.get = function () {
    return this._path || ("" + (document.location.pathname) + (document.location.search));
  };

  prototypeAccessors$8.referrer.set = function (value) {
    var valid = validateString(value, 'page.referrer');
    if (valid !== null) { this._referrer = valid; }
  };

  prototypeAccessors$8.referrer.get = function () {
    return this._referrer;
  };

  prototypeAccessors$8.title.set = function (value) {
    var valid = validateString(value, 'page.title');
    if (valid !== null) { this._title = valid; }
  };

  prototypeAccessors$8.title.get = function () {
    return this._title || document.title;
  };

  prototypeAccessors$8.name.set = function (value) {
    var valid = validateString(value, 'page.name');
    if (valid !== null) { this._name = valid; }
  };

  prototypeAccessors$8.name.get = function () {
    return this._name || this.title;
  };

  prototypeAccessors$8.labels.get = function () {
    return this._labels;
  };

  prototypeAccessors$8.categories.get = function () {
    return this._categories;
  };

  prototypeAccessors$8.isError.set = function (value) {
    var valid = validateBoolean(value, 'page.isError');
    if (valid !== null) { this._isError = valid; }
  };

  prototypeAccessors$8.isError.get = function () {
    return this._isError;
  };

  prototypeAccessors$8.template.set = function (value) {
    var valid = validateString(value, 'page.template');
    if (valid !== null) { this._template = valid; }
  };

  prototypeAccessors$8.template.get = function () {
    return this._template || 'autres';
  };

  prototypeAccessors$8.segment.set = function (value) {
    var valid = validateString(value, 'page.segment');
    if (valid !== null) { this._segment = valid; }
  };

  prototypeAccessors$8.segment.get = function () {
    return this._segment || this.template;
  };

  prototypeAccessors$8.group.set = function (value) {
    var valid = validateString(value, 'page.group');
    if (valid !== null) { this._group = valid; }
  };

  prototypeAccessors$8.group.get = function () {
    return this._group || this.template;
  };

  prototypeAccessors$8.subtemplate.set = function (value) {
    var valid = validateString(value, 'page.subtemplate');
    if (valid !== null) { this._subtemplate = valid; }
  };

  prototypeAccessors$8.subtemplate.get = function () {
    return this._subtemplate;
  };

  prototypeAccessors$8.theme.set = function (value) {
    var valid = validateString(value, 'page.theme');
    if (valid !== null) { this._theme = valid; }
  };

  prototypeAccessors$8.theme.get = function () {
    return this._theme;
  };

  prototypeAccessors$8.subtheme.set = function (value) {
    var valid = validateString(value, 'page.subtheme');
    if (valid !== null) { this._subtheme = valid; }
  };

  prototypeAccessors$8.subtheme.get = function () {
    return this._subtheme;
  };

  prototypeAccessors$8.related.set = function (value) {
    var valid = validateString(value, 'page.related');
    if (valid !== null) { this._related = valid; }
  };

  prototypeAccessors$8.related.get = function () {
    return this._related;
  };

  prototypeAccessors$8.depth.set = function (value) {
    var valid = validateNumber(value, 'page.depth');
    if (valid !== null) { this._depth = valid; }
  };

  prototypeAccessors$8.depth.get = function () {
    return this._depth;
  };

  prototypeAccessors$8.current.set = function (value) {
    var valid = validateNumber(value, 'page.current');
    if (valid !== null) { this._current = valid; }
  };

  prototypeAccessors$8.current.get = function () {
    return this._current;
  };

  prototypeAccessors$8.total.set = function (value) {
    var valid = validateNumber(value, 'page.total');
    if (valid !== null) { this._total = valid; }
  };

  prototypeAccessors$8.total.get = function () {
    return this._total;
  };

  prototypeAccessors$8.filters.get = function () {
    return this._filters;
  };

  prototypeAccessors$8.layer.get = function () {
    var layer = [];
    if (this.path) { layer.push('path', normalize(this.path)); }
    if (this.referrer) { layer.push('referrer', normalize(this.referrer)); }
    if (this.title) { layer.push('page_title', normalize(this.title)); }
    if (this.name) { layer.push('page_name', normalize(this.name)); }

    var labels = this._labels.slice(0, 5);
    labels.length = 5;
    if (labels.some(function (label) { return label; })) { layer.push('pagelabel', labels.map(function (label) { return typeof label === 'string' ? normalize(label) : ''; }).join(',')); }

    this._categories.forEach(function (category, index) {
      if (category) { layer.push(("page_category" + (index + 1)), category); }
    });

    if (this._isError) { layer.push('error', '1'); }

    layer.push('page_template', normalize(this.template));
    layer.push('pagegroup', normalize(this.group));
    layer.push('site-segment', normalize(this.segment));

    if (this.subtemplate) { layer.push('page_subtemplate', normalize(this.subtemplate)); }
    if (this.theme) { layer.push('page_theme', normalize(this.theme)); }
    if (this.subtheme) { layer.push('page_subtheme', normalize(this.subtheme)); }
    if (this.related) { layer.push('page_related', normalize(this.related)); }
    if (!isNaN(this.depth)) { layer.push('page_depth', this.depth); }

    if (!isNaN(this.current) && this.current > -1) {
      var pagination = "" + (this.current);
      if (!isNaN(this.total) && this.total > -1) { pagination += "/" + (this.total); }
      layer.push('page_pagination', pagination);
    }

    if (this.filters.length && this.filters.some(function (label) { return label; })) {
      var filters = this.filters.map(function (filter) { return typeof filter === 'string' ? normalize(filter) : ''; });
      layer.push('page_filters', filters.join(','));
    }
    return layer;
  };

  Object.defineProperties( Page.prototype, prototypeAccessors$8 );

  var Method = {
    STANDARD: {
      id: 'standard',
      value: 'standard',
      isDefault: true
    },
    AUTOCOMPLETE: {
      id: 'autocomplete',
      value: 'autocompletion'
    }
  };

  var Search = function Search (config) {
    this._config = config || {};
  };

  var prototypeAccessors$7 = { engine: { configurable: true },results: { configurable: true },terms: { configurable: true },category: { configurable: true },theme: { configurable: true },type: { configurable: true },method: { configurable: true },layer: { configurable: true } };

  Search.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this.engine = clear ? undefined : this._config.engine;
    this.results = clear || isNaN(this._config.results) ? -1 : this._config.results;
    this.terms = clear ? undefined : this._config.terms;
    this.category = clear ? undefined : this._config.category;
    this.theme = clear ? undefined : this._config.theme;
    this.type = clear ? undefined : this._config.type;
    this.method = clear ? undefined : this._config.method;
  };

  prototypeAccessors$7.engine.set = function (value) {
    var valid = validateString(value, 'search.engine');
    if (valid !== null) { this._engine = valid; }
  };

  prototypeAccessors$7.engine.get = function () {
    return this._engine;
  };

  prototypeAccessors$7.results.set = function (value) {
    var valid = validateNumber(value, 'search.results');
    if (valid !== null) { this._results = valid; }
  };

  prototypeAccessors$7.results.get = function () {
    return this._results;
  };

  prototypeAccessors$7.terms.set = function (value) {
    var valid = validateString(value, 'search.terms');
    if (valid !== null) { this._terms = valid; }
  };

  prototypeAccessors$7.terms.get = function () {
    return this._terms;
  };

  prototypeAccessors$7.category.set = function (value) {
    var valid = validateString(value, 'search.category');
    if (valid !== null) { this._category = valid; }
  };

  prototypeAccessors$7.category.get = function () {
    return this._category;
  };

  prototypeAccessors$7.theme.set = function (value) {
    var valid = validateString(value, 'search.theme');
    if (valid !== null) { this._theme = valid; }
  };

  prototypeAccessors$7.theme.get = function () {
    return this._theme;
  };

  prototypeAccessors$7.type.set = function (value) {
    var valid = validateString(value, 'search.type');
    if (valid !== null) { this._type = valid; }
    this._type = value;
  };

  prototypeAccessors$7.type.get = function () {
    return this._type;
  };

  prototypeAccessors$7.method.set = function (id) {
    var methods = Object.values(Method);
    this._method = methods.filter(function (method) { return method.id === id || method.value === id; })[0] || methods.filter(function (method) { return method.isDefault; })[0];
  };

  prototypeAccessors$7.method.get = function () {
    return this._method;
  };

  prototypeAccessors$7.layer.get = function () {
    var layer = [];
    if (this.engine) { layer.push('isearchengine', normalize(this.engine)); }
    if (this.results > -1) { layer.push('isearchresults', this.results); }
    if (this.terms) { layer.push('isearchkey', 'search_terms', 'isearchdata', normalize(this.terms)); }
    if (this.category) { layer.push('isearchkey', 'search_category', 'isearchdata', normalize(this.category)); }
    if (this.theme) { layer.push('isearchkey', 'search_theme', 'isearchdata', normalize(this.theme)); }
    if (this.type) { layer.push('isearchkey', 'search_type', 'isearchdata', normalize(this.type)); }
    if (this._method && layer.length) { layer.push('isearchkey', 'search_method', 'isearchdata', this._method.value); }
    return layer;
  };

  Object.defineProperties( Search.prototype, prototypeAccessors$7 );

  Search.Method = Method;

  var Funnel = function Funnel (config) {
    this._config = config || {};
  };

  var prototypeAccessors$6 = { id: { configurable: true },type: { configurable: true },name: { configurable: true },step: { configurable: true },current: { configurable: true },total: { configurable: true },objective: { configurable: true },error: { configurable: true },layer: { configurable: true } };

  Funnel.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this.id = clear ? undefined : this._config.id;
    this.type = clear ? undefined : this._config.type;
    this.name = clear ? undefined : this._config.name;
    this.step = clear ? undefined : this._config.step;
    this.current = clear || isNaN(this._config.current) ? -1 : this._config.current;
    this.total = clear || isNaN(this._config.total) ? -1 : this._config.total;
    this.objective = clear ? undefined : this._config.objective;
    this.error = clear ? undefined : this._config.error;
  };

  prototypeAccessors$6.id.set = function (value) {
    var valid = validateString(value, 'funnel.id');
    if (valid !== null) { this._id = valid; }
  };

  prototypeAccessors$6.id.get = function () {
    return this._id;
  };

  prototypeAccessors$6.type.set = function (value) {
    var valid = validateString(value, 'funnel.type');
    if (valid !== null) { this._type = valid; }
  };

  prototypeAccessors$6.type.get = function () {
    return this._type;
  };

  prototypeAccessors$6.name.set = function (value) {
    var valid = validateString(value, 'funnel.name');
    if (valid !== null) { this._name = valid; }
  };

  prototypeAccessors$6.name.get = function () {
    return this._name;
  };

  prototypeAccessors$6.step.set = function (value) {
    var valid = validateString(value, 'funnel.step');
    if (valid !== null) { this._step = valid; }
  };

  prototypeAccessors$6.step.get = function () {
    return this._step;
  };

  prototypeAccessors$6.current.set = function (value) {
    var valid = validateNumber(value, 'funnel.current');
    if (valid !== null) { this._current = valid; }
  };

  prototypeAccessors$6.current.get = function () {
    return this._current;
  };

  prototypeAccessors$6.total.set = function (value) {
    var valid = validateNumber(value, 'funnel.total');
    if (valid !== null) { this._total = valid; }
  };

  prototypeAccessors$6.total.get = function () {
    return this._total;
  };

  prototypeAccessors$6.objective.set = function (value) {
    var valid = validateString(value, 'funnel.objective');
    if (valid !== null) { this._objective = valid; }
    this._objective = value;
  };

  prototypeAccessors$6.objective.get = function () {
    return this._objective;
  };

  prototypeAccessors$6.error.set = function (value) {
    var valid = validateString(value, 'funnel.error');
    if (valid !== null) { this._error = valid; }
    this._error = value;
  };

  prototypeAccessors$6.error.get = function () {
    return this._error;
  };

  prototypeAccessors$6.layer.get = function () {
    var layer = [];
    if (this.id) { layer.push('funnel_id', normalize(this.id)); }
    if (this.type) { layer.push('funnel_type', normalize(this.type)); }
    if (this.name) { layer.push('funnel_name', normalize(this.name)); }
    if (this.step) { layer.push('funnel_step_name', normalize(this.step)); }
    if (!isNaN(this.current) && this.current > -1) { layer.push('funnel_step_number', this.current); }
    if (!isNaN(this.total) && this.total > -1) { layer.push('funnel_step_max', this.total); }
    if (this.objective) { layer.push('funnel_objective', normalize(this.objective)); }
    if (this.error) { layer.push('funnel_error', normalize(this.error)); }
    return layer;
  };

  Object.defineProperties( Funnel.prototype, prototypeAccessors$6 );

  var Location = function Location (onChange, isListeningHash) {
    if ( isListeningHash === void 0 ) isListeningHash = false;

    this._onChange = onChange;
    this._isListeningHash = isListeningHash;
    this._update();
    renderer.add(this);
  };

  var prototypeAccessors$5 = { path: { configurable: true },hasTitle: { configurable: true },title: { configurable: true },referrer: { configurable: true } };

  Location.prototype._update = function _update () {
    this._pathname = document.location.pathname;
    this._search = document.location.search;
    this._hash = document.location.hash;
    this._path = "" + (this._pathname) + (this._search);
    if (this._isListeningHash) { this._path += this._hash; }
    this._hasTitle = this._title === document.title;
    this._title = document.title;
  };

  Location.prototype.render = function render () {
    if (this._pathname !== document.location.pathname || this._search !== document.location.search) { this.change(); }
    if (this._isListeningHash && this._hash !== document.location.hash) { this.change(); }
  };

  Location.prototype.change = function change () {
    this._referrer = this._path;
    this._update();
    this._onChange();
  };

  prototypeAccessors$5.path.get = function () {
    return this._path;
  };

  prototypeAccessors$5.hasTitle.get = function () {
    return this._hasTitle;
  };

  prototypeAccessors$5.title.get = function () {
    return this._title;
  };

  prototypeAccessors$5.referrer.get = function () {
    return this._referrer;
  };

  Object.defineProperties( Location.prototype, prototypeAccessors$5 );

  var CollectorEvent = {
    COLLECT: api.internals.ns.event('collect')
  };

  var ActioneeEmission = {
    REWIND: api.internals.ns.emission('analytics', 'rewind')
  };

  var Collector = function Collector (config) {
    switch (config.collection) {
      case Collection.MANUAL:
      case Collection.LOAD:
      case Collection.FULL:
      case Collection.HASH:
        this._collection = config.collection;
        break;

      default:
        /* deprecated start */
        if (config.mode) {
          switch (config.mode) {
            case 'manual':
              this._collection = config.collection;
              break;
          }
        }
        /* deprecated end */

        switch (true) {
          /* deprecated */
          case config.mode === 'manual':
            this._collection = Collection.MANUAL;
            break;

          case api.mode === api.Modes.ANGULAR:
          case api.mode === api.Modes.REACT:
          case api.mode === api.Modes.VUE:
            this._collection = Collection.FULL;
            break;

          default:
            this._collection = Collection.LOAD;
        }
    }

    this._user = new User(config.user);
    this._site = new Site(config.site);
    this._page = new Page(config.page);
    this._search = new Search(config.search);
    this._funnel = new Funnel(config.funnel);

    this._isCollected = false;
    this._delay = -1;
    queue.setCollector(this);
  };

  var prototypeAccessors$4 = { page: { configurable: true },user: { configurable: true },site: { configurable: true },search: { configurable: true },funnel: { configurable: true },collection: { configurable: true },layer: { configurable: true } };

  prototypeAccessors$4.page.get = function () {
    return this._page;
  };

  prototypeAccessors$4.user.get = function () {
    return this._user;
  };

  prototypeAccessors$4.site.get = function () {
    return this._site;
  };

  prototypeAccessors$4.search.get = function () {
    return this._search;
  };

  prototypeAccessors$4.funnel.get = function () {
    return this._funnel;
  };

  Collector.prototype.start = function start () {
    var handleChange = this._handleChange.bind(this);
    switch (this._collection) {
      case Collection.LOAD:
        this.collect();
        break;

      case Collection.FULL:
        this.collect();
        this._location = new Location(handleChange);
        break;

      case Collection.HASH:
        this.collect();
        this._location = new Location(handleChange, true);
        break;
    }
  };

  Collector.prototype._handleChange = function _handleChange () {
    queue.send(true);
    this._delay = 6;
    renderer.add(this);
  };

  Collector.prototype.render = function render () {
    this._delay--;
    if (this._delay < 0) {
      renderer.remove(this);
      this._changed();
    }
  };

  Collector.prototype._changed = function _changed () {
    this._isCollected = false;
    actions.rewind();
    this._page.referrer = this._location.referrer;
    if (this._location.hasTitle) { this._page.title = this._location.title; }
    this._page.path = this._location.path;
    var event = new CustomEvent(CollectorEvent.COLLECT);
    document.documentElement.dispatchEvent(event);
    this.collect();
    if (api.internals && api.internals.stage && api.internals.stage.root) { api.internals.stage.root.descend(ActioneeEmission.REWIND); }
  };

  Collector.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this._user.reset(clear);
    this._site.reset(clear);
    this._page.reset(clear);
    this._search.reset(clear);
    this._funnel.reset(clear);
  };

  Collector.prototype.collect = function collect () {
    if (this._isCollected) { return; }
    queue.collect();
    this._isCollected = true;
  };

  prototypeAccessors$4.collection.get = function () {
    return this._collection;
  };

  prototypeAccessors$4.layer.get = function () {
    return ( this._user.layer ).concat( this._site.layer,
      this._page.layer,
      this._search.layer,
      this._funnel.layer
    );
  };

  Object.defineProperties( Collector.prototype, prototypeAccessors$4 );

  var Analytics = function Analytics () {
    var this$1$1 = this;

    this._isReady = false;
    this._readiness = new Promise(function (resolve, reject) {
      if (this$1$1._isReady) { resolve(); }
      else {
        this$1$1._resolve = resolve;
        this$1$1._reject = reject;
      }
    });
    this._configure();
  };

  var prototypeAccessors$3 = { isReady: { configurable: true },readiness: { configurable: true },page: { configurable: true },user: { configurable: true },site: { configurable: true },search: { configurable: true },funnel: { configurable: true },cmp: { configurable: true },opt: { configurable: true },collection: { configurable: true },isDebugging: { configurable: true } };

  Analytics.prototype._configure = function _configure () {
    switch (true) {
      case window[patch.namespace] !== undefined:
        this._config = window[patch.namespace].configuration.analytics;
        window[patch.namespace].promise.then(this._build.bind(this), function () {});
        break;

      case api.internals !== undefined && api.internals.configuration !== undefined && api.internals.configuration.analytics !== undefined && api.internals.configuration.analytics.domain !== undefined:
        this._config = api.internals.configuration.analytics;
        this._build();
        break;

      case api.analytics !== undefined && api.analytics.domain !== undefined:
        this._config = api.analytics;
        this._build();
        break;

      default:
        api.inspector.warn('analytics configuration is incorrect or missing (required : domain)');
    }
  };

  Analytics.prototype._build = function _build () {
      var this$1$1 = this;

    this._init = new Init(this._config.domain);
    this._init.configure().then(this._start.bind(this), function (reason) { return this$1$1._reject(reason); });
  };

  prototypeAccessors$3.isReady.get = function () {
    return this._isReady;
  };

  prototypeAccessors$3.readiness.get = function () {
    return this._readiness;
  };

  Analytics.prototype._start = function _start () {
    if (this._isReady) { return; }

    this._cmp = new ConsentManagerPlatform(this._config.cmp);
    this._collector = new Collector(this._config);
    this._collector.reset();
    actions.configure(this._config);

    this._isReady = true;
    this._resolve();

    queue.start();
    this._collector.start();
  };

  prototypeAccessors$3.page.get = function () {
    return this._collector.page;
  };

  prototypeAccessors$3.user.get = function () {
    return this._collector.user;
  };

  prototypeAccessors$3.site.get = function () {
    return this._collector._site;
  };

  prototypeAccessors$3.search.get = function () {
    return this._collector.search;
  };

  prototypeAccessors$3.funnel.get = function () {
    return this._collector.funnel;
  };

  prototypeAccessors$3.cmp.get = function () {
    return this._cmp;
  };

  prototypeAccessors$3.opt.get = function () {
    return opt;
  };

  prototypeAccessors$3.collection.get = function () {
    return this._collector.collection;
  };

  prototypeAccessors$3.isDebugging.get = function () {
    return debug.isActive;
  };

  prototypeAccessors$3.isDebugging.set = function (value) {
    debug.isActive = value;
  };

  Analytics.prototype.push = function push$1 (type, layer) {
    push(type, layer);
  };

  Analytics.prototype.reset = function reset (clear) {

    this._collector.reset();
  };

  Analytics.prototype.collect = function collect () {
    this._collector.collect();
  };

  Object.defineProperties( Analytics.prototype, prototypeAccessors$3 );

  var analytics = new Analytics();

  analytics.Collection = Collection;
  analytics.PushType = PushType;

  /**
   * Copy properties from multiple sources including accessors.
   * source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#copier_des_accesseurs
   *
   * @param {object} [target] - Target object to copy into
   * @param {...objects} [sources] - Multiple objects
   * @return {object} A new object
   *
   * @example
   *
   *     const obj1 = {
   *        key: 'value'
   *     };
   *     const obj2 = {
   *        get function01 () {
   *          return a-value;
   *        }
   *        set function01 () {
   *          return a-value;
   *        }
   *     };
   *     completeAssign(obj1, obj2)
   */
  var completeAssign = function (target) {
    var sources = [], len = arguments.length - 1;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

    sources.forEach(function (source) {
      var descriptors = Object.keys(source).reduce(function (descriptors, key) {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
      }, {});

      Object.getOwnPropertySymbols(source).forEach(function (sym) {
        var descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
          descriptors[sym] = descriptor;
        }
      });
      Object.defineProperties(target, descriptors);
    });
    return target;
  };

  api.analytics = completeAssign(analytics, {});

  var Type$1 = {
    // impression
    IMPRESSION: {
      id: 'impression', // element appeared in the page
      isSingular: true,
      isBeginning: true,
      attributed: false,
      type: 'impression'
    },
    // interaction
    CLICK: {
      id: 'click', // generic click interaction
      isBeginning: true,
      attributed: true,
      type: 'interaction',
      event: 'click',
      method: 'eventListener'
    },
    INTERNAL: {
      id: 'internal', // anchor click redirecting on an internal url
      isBeginning: true,
      attributed: true,
      type: 'interaction',
      event: 'click',
      method: 'eventListener'
    },
    EXTERNAL: {
      id: 'external', // anchor click redirecting on an external url
      isBeginning: true,
      attributed: true,
      type: 'interaction',
      event: 'click',
      method: 'eventListener'
    },
    DOWNLOAD: {
      id: 'download', // anchor click downloading a file
      isBeginning: true,
      attributed: true,
      type: 'interaction',
      event: 'click',
      method: 'eventListener'
    },
    BUTTON: {
      id: 'button', // button click
      isBeginning: true,
      attributed: true,
      type: 'interaction',
      event: 'click',
      method: 'eventListener'
    },
    DOUBLE_CLICK: {
      id: 'dblclick', // double click
      isBeginning: true,
      attributed: true,
      type: 'interaction',
      event: 'dblclick',
      method: 'eventListener'
    },
    // event
    OPEN: {
      id: 'open', // open event
      isSingular: true,
      attributed: false,
      type: 'event',
      method: 'eventListener'
    },
    COMPLETE: {
      id: 'complete', // complete event
      isSingular: true,
      attributed: false,
      type: 'event',
      method: 'eventListener'
    },
    FOCUS: {
      id: 'focus', // focus event
      isSingular: true,
      attributed: false,
      type: 'event',
      method: 'eventListener'
    },
    ERROR: {
      id: 'error', // error event
      isSingular: true,
      attributed: false,
      type: 'event'
    },
    ADD: {
      id: 'add', // add event
      isSingular: true,
      attributed: false,
      type: 'event'
    },
    REMOVE: {
      id: 'remove', // remove event
      isSingular: true,
      attributed: false,
      type: 'event'
    },
    DISPLAY: {
      id: 'display', // display event
      isSingular: true,
      attributed: false,
      type: 'event'
    },
    CHANGE: {
      id: 'change', // input event change
      isSingular: true,
      attributed: true,
      type: 'event',
      event: 'change',
      method: 'change'
    },
    PROGRESS: {
      id: 'progress', // video retention event with percent of the part reached
      isBeginning: true,
      attributed: true,
      type: 'event'
    },
    // component interaction
    SHARE: {
      id: 'share', // component share click (share)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    PRESS: {
      id: 'press', // component press click (pressable tag)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    RELEASE: {
      id: 'release', // component release click (pressable tag)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    DISMISS: {
      id: 'dismiss', // component dismiss click (dismissible tag)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    UPLOAD: {
      id: 'upload', // component upload click (upload)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    CHECK: {
      id: 'check', // component check click (checkbox, radio, toggle)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    UNCHECK: {
      id: 'uncheck', // component uncheck click (checkbox, radio, toggle)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    SELECT: {
      id: 'select', // component select change (select)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    SUBSCRIBE: {
      id: 'subscribe', // component subscribe click (follow)
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    // component event
    DISCLOSE: {
      id: 'disclose', // component disclose event (accordion, modal, tab)
      isBeginning: true,
      attributed: false,
      type: 'event'
    },
    SEARCH: {
      id: 'search', // component disclose event (accordion, modal, tab)
      isBeginning: true,
      attributed: false,
      type: 'event'
    },
    SHOW: {
      id: 'show', // component show event (tooltip)
      isSingular: true,
      attributed: false,
      type: 'event'
    },
    HIDE: {
      id: 'hide', // component hide event (tooltip)
      isSingular: true,
      attributed: false,
      type: 'event'
    },
    // video
    AUTOPLAY: {
      id: 'autoplay', // video autoplay event
      isBeginning: true,
      attributed: false,
      type: 'event'
    },
    PLAY: {
      id: 'play', // video play click
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    PAUSE: {
      id: 'pause', // video pause click
      isBeginning: true,
      attributed: false,
      type: 'interaction'
    },
    END: {
      id: 'end', // video end event
      isBeginning: true,
      attributed: false,
      type: 'event'
    }
  };

  var Type = {
    UNDEFINED: 'undefined',
    HEADING: 'heading',
    COMPONENT: 'component',
    CONTENT: 'content'
  };

  var NODE_POSITION = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINED_BY;

  var Heading = function Heading (heading) {
    this._label = heading.textContent.trim();
    this._level = Number(heading.tagName.charAt(1));
  };

  var prototypeAccessors$2 = { level: { configurable: true },label: { configurable: true } };

  prototypeAccessors$2.level.get = function () {
    return this._level;
  };

  prototypeAccessors$2.label.get = function () {
    return this._label;
  };

  Object.defineProperties( Heading.prototype, prototypeAccessors$2 );

  var Member = function Member (node, target, level) {
    this._type = Type.UNDEFINED;
    this._node = node;
    this._target = target;
    this._level = level;
    this._label = '';
    this._component = '';
    this._isValid = true;
    this.analyse();
  };

  var prototypeAccessors$1$1 = { type: { configurable: true },level: { configurable: true },label: { configurable: true },component: { configurable: true },node: { configurable: true },target: { configurable: true },isValid: { configurable: true } };

  Member.prototype._parseHeadings = function _parseHeadings () {
      var this$1$1 = this;

    var selector = Array.from({ length: this._level }, function (v, i) { return ("h" + (i + 1)); }).join(',');
    this._headings = Array.from(this._node.querySelectorAll(selector)).filter(function (heading) { return heading === this$1$1._node || heading.parentNode === this$1$1._node || (heading.parentNode != null && heading.parentNode.parentNode === this$1$1._node); }).filter(function (heading) { return (this$1$1._target.compareDocumentPosition(heading) & NODE_POSITION) > 0; }).map(function (heading) { return new Heading(heading); }).reverse();
  };

  Member.prototype._getComponent = function _getComponent () {
    if (typeof api !== 'function') { return false; }
    var element = api(this._node);
    if (!element) { return false; }
    var instance = Object.values(element).filter(function (actionee) { return actionee.isActionee; }).sort(function (a, b) { return b.priority - a.priority; })[0];
    if (!instance) { return false; }

    this._type = Type.COMPONENT;
    this._isValid = instance.validate(this._target);
    var selector = Array.from({ length: 6 }, function (v, i) { return ("h" + (i + 1)); }).join(',');
    var heading = this._node.closest(selector);
    if (heading) {
      this._level = Number(heading.tagName.charAt(1)) - 1;
    }

    if (!isNaN(instance.level) && instance.level < this._level) { this._level = instance.level; }
    this._label = instance.label;
    this._component = instance.component;
    return true;
  };

  Member.prototype._getHeading = function _getHeading () {
      var this$1$1 = this;

    if (!this._headings.length) { return false; }
    var labels = [];
    this._headings.forEach(function (heading) {
      if (heading.level <= this$1$1._level) {
        if (heading.level > 1) { labels.unshift(heading.label); }
        this$1$1._level = heading.level - 1;
      }
    });
    if (!labels.length) { return false; }
    this._type = Type.HEADING;
    this._label = labels.join(' › ');
    return true;
  };

  Member.prototype.analyse = function analyse () {
    this._parseHeadings();
    if (this._getComponent()) { return; }
    if (this._getHeading()) { return; }
    if (this._node !== this._target) { return; }

    var label = this._node.textContent.trim();
    if (!label) { return; }
    this._type = Type.CONTENT;
    this._label = label;
  };

  prototypeAccessors$1$1.type.get = function () {
    return this._type;
  };

  prototypeAccessors$1$1.level.get = function () {
    return this._level;
  };

  prototypeAccessors$1$1.label.get = function () {
    return this._label;
  };

  prototypeAccessors$1$1.component.get = function () {
    return this._component;
  };

  prototypeAccessors$1$1.node.get = function () {
    return this._node;
  };

  prototypeAccessors$1$1.target.get = function () {
    return this._target;
  };

  prototypeAccessors$1$1.isValid.get = function () {
    return this._isValid;
  };

  Object.defineProperties( Member.prototype, prototypeAccessors$1$1 );

  var Hierarchy = function Hierarchy (node) {
    this._node = node;
    this._process();
  };

  var prototypeAccessors$1 = { localComponent: { configurable: true },globalComponent: { configurable: true },label: { configurable: true },title: { configurable: true },component: { configurable: true } };

  Hierarchy.prototype._process = function _process () {
    // console.log('_______________ start ____________________');
    var member = new Member(this._node, this._node, 6);
    // console.log('- FIRST MEMBER', member);
    this._level = member.level;
    this._members = [member];

    var node = this._node.parentNode;

    while (document.documentElement.contains(node) && node !== document.documentElement && this._level > 0) {
      // console.log('MEMBERS ARRAY', this._members);
      // console.log('NODE ANALYSIS', node);
      var member$1 = new Member(node, this._node, this._level);
      // console.log('NEW MEMBER', member);
      switch (true) {
        case member$1.type === Type.UNDEFINED:
          // console.log('****UNDEFINED');
          break;

        case !member$1.isValid:
          // console.log('****INVALID');
          break;

        case member$1.label === this._members[0].label && member$1.type === Type.HEADING && this._members[0].type === Type.COMPONENT:
          // console.log('***** SAME');
          // do nothing
          break;

        case member$1.label === this._members[0].label && member$1.type === Type.COMPONENT && this._members[0].type === Type.HEADING:
          // console.log('***** SAME INVERT');
          this._members.splice(0, 1, member$1);
          break;

        default:
          this._members.unshift(member$1);
          if (member$1.level < this._level) { this._level = member$1.level; }
      }

      node = node.parentNode;
    }

    this._label = normalize(this._members[this._members.length - 1].label);
    this._title = normalize(this._members.filter(function (member) { return member.label; }).map(function (member) { return member.label; }).join(' › '));
    var components = this._members.filter(function (member) { return member.component; }).map(function (member) { return member.component; });
    this._component = normalize(components.join(' › '));
    this._localComponent = components[components.length - 1];
    this._globalComponent = components[0];

    // console.log('========= end ===========');
  };

  prototypeAccessors$1.localComponent.get = function () {
    return this._localComponent;
  };

  prototypeAccessors$1.globalComponent.get = function () {
    return this._globalComponent;
  };

  prototypeAccessors$1.label.get = function () {
    return this._label;
  };

  prototypeAccessors$1.title.get = function () {
    return this._title;
  };

  prototypeAccessors$1.component.get = function () {
    return this._component;
  };

  Object.defineProperties( Hierarchy.prototype, prototypeAccessors$1 );

  var ActionElement = function ActionElement (node, type, id, category, title, parameters, isRatingActive) {
    if ( category === void 0 ) category = '';
    if ( title === void 0 ) title = null;
    if ( parameters === void 0 ) parameters = {};

    this._node = node;
    this._type = type;
    this._id = id || this._node.id;
    this._isMuted = false;
    this._title = title;
    this._category = category;
    this._parameters = parameters;
    this._isRatingActive = isRatingActive;
    this._hasBegun = false;

    // this._init();
    requestAnimationFrame(this._init.bind(this));
  };

  var prototypeAccessors = { isMuted: { configurable: true },action: { configurable: true } };

  ActionElement.prototype._init = function _init () {
      var this$1$1 = this;

    this._hierarchy = new Hierarchy(this._node);

    var id = '';
    var type = '';
    if (this._id) { id = "_[" + (this._id) + "]"; }
    else { api.inspector.warn(("Analytics API requires an id to be set on tracked element. Missing on " + (this._node.outerHTML))); }
    if (this._type) { type = "(" + (this._type.id) + ")_"; }
    this._name = "" + type + (this._title || this._hierarchy.title) + id;

    this._action = actions.getAction(this._name, this._type.status);
    if (this._type.isSingular) { this._action.singularize(); }
    Object.keys(this._parameters).forEach(function (key) { return this$1$1._action.addParameter(key, this$1$1._parameters[key]); });
    this._action.isMuted = this._isMuted;

    this._action.labels[0] = this._type.id;
    this._action.labels[1] = this._hierarchy.globalComponent;
    this._action.labels[2] = this._hierarchy.localComponent;
    this._action.labels[4] = this._category;

    if (this._hierarchy.label) { this._action.addParameter('component_label', this._hierarchy.label); }
    if (this._hierarchy.title) { this._action.addParameter('heading_hierarchy', this._hierarchy.title); }
    if (this._hierarchy.component) { this._action.addParameter('component_hierarchy', this._hierarchy.component); }

    this.begin();
  };

  prototypeAccessors.isMuted.get = function () {
    return this._action ? this._action.isMuted : this._isMuted;
  };

  prototypeAccessors.isMuted.set = function (value) {
    this._isMuted = value;
    if (this._action) { this._action.isMuted = value; }
  };

  prototypeAccessors.action.get = function () {
    return this._action;
  };

  ActionElement.prototype.rewind = function rewind () {
    this._hasBegun = false;
    this.begin();
  };

  ActionElement.prototype.begin = function begin (data) {
      if ( data === void 0 ) data = {};

    if (this._hasBegun) { return; }
    this._hasBegun = true;
    if (this._type.isBeginning) { queue.appendStartingAction(this._action, data); }
  };

  ActionElement.prototype.act = function act (data) {
      var this$1$1 = this;
      if ( data === void 0 ) data = {};

    if (this._isMuted) { return; }
    if (!this._action) {
      requestAnimationFrame(function () { return this$1$1.act(data); });
      return;
    }
    queue.appendEndingAction(this._action, data);
  };

  ActionElement.prototype.dispose = function dispose () {
    actions.remove(this._action);
  };

  Object.defineProperties( ActionElement.prototype, prototypeAccessors );

  ActionElement.isRatingEnabled = false;

  var Actionee = /*@__PURE__*/(function (superclass) {
    function Actionee (priority, isRatingActive, category, title) {
      if ( priority === void 0 ) priority = -1;
      if ( isRatingActive === void 0 ) isRatingActive = false;
      if ( category === void 0 ) category = '';
      if ( title === void 0 ) title = null;

      superclass.call(this);
      this._type = null;
      this._priority = priority;
      this._category = category;
      this._title = title;
      this._parameters = {};
      this._data = {};
      this._isMuted = false;
      this._isRatingActive = isRatingActive;
    }

    if ( superclass ) Actionee.__proto__ = superclass;
    Actionee.prototype = Object.create( superclass && superclass.prototype );
    Actionee.prototype.constructor = Actionee;

    var prototypeAccessors = { proxy: { configurable: true },data: { configurable: true },isMuted: { configurable: true },priority: { configurable: true },isInteractive: { configurable: true },actionElement: { configurable: true },label: { configurable: true },value: { configurable: true },isActionee: { configurable: true },level: { configurable: true },type: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Actionee';
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;

      var proxy = {
        validate: function (target, members) { return scope.validate(target, members); }
      };

      var proxyAccessors = {
        get isActionee () {
          return true;
        },
        get label () {
          return scope.label;
        },
        get priority () {
          return scope.priority;
        },
        get level () {
          return scope.level;
        },
        get node () {
          return scope.node; // TODO: remove in v2
        }
      };

      return api.internals.property.completeAssign.call(this, superclass.prototype.proxy, proxy, proxyAccessors);
    };

    prototypeAccessors.data.get = function () {
      return this._data;
    };

    Actionee.prototype._config = function _config (element, registration) {
      superclass.prototype._config.call(this, element, registration);

      if (this._type === null) {
        this._isMuted = true;
        return;
      }

      this._actionElement = new ActionElement(this.node, this._type, this.id, this._category, this._title, this._parameters, this._isRatingActive);
      if (this._isMuted) { this._actionElement.isMuted = true; }

      this.addDescent(ActioneeEmission.REWIND, this.rewind.bind(this));

      var actionees = element.instances.filter(function (instance) { return instance.isActionee && instance.type; }).sort(function (a, b) { return b.priority - a.priority; });
      if (actionees.length <= 1) { return; }
      actionees.forEach(function (actionee, index) { actionee.isMuted = index > 0; });
    };

    prototypeAccessors.isMuted.get = function () {
      return this._actionElement ? this._actionElement.isMuted : this._isMuted;
    };

    prototypeAccessors.isMuted.set = function (value) {
      this._isMuted = value;
      if (this._actionElement) { this._actionElement.isMuted = value; }
    };

    prototypeAccessors.priority.get = function () {
      return this._priority;
    };

    Actionee.prototype.setPriority = function setPriority (value) {
      this._priority = value;
    };

    prototypeAccessors.isInteractive.get = function () {
      return this.node.tagName === 'A' || this.node.tagName === 'BUTTON';
    };

    Actionee.prototype.detectInteractionType = function detectInteractionType (node) {
      if (!node) { node = this.node; }
      var tag = node.tagName;
      var href = node.getAttribute('href');
      var isDownload = node.hasAttribute('download');
      var hostname = node.hostname;

      switch (true) {
        case tag !== 'A':
          this._type = Type$1.CLICK;
          break;

        case isDownload:
          this._type = Type$1.DOWNLOAD;
          this.value = href;
          break;

        case hostname === location.hostname :
          this._type = Type$1.INTERNAL;
          this.value = href;
          break;

        case hostname.length > 0 :
          this._type = Type$1.EXTERNAL;
          this.value = href;
          break;

        default:
          this._type = Type$1.CLICK;
          break;
      }
    };

    Actionee.prototype.setClickType = function setClickType () {
      this._type = Type$1.CLICK;
    };

    Actionee.prototype.listenClick = function listenClick (target) {
      if (target) {
        this._clickTarget = target;
        this._clickHandler = this.handleClick.bind(this);
        this._clickTarget.addEventListener('click', this._clickHandler, { capture: true });
      } else { this.listen('click', this.handleClick.bind(this), { capture: true }); }
    };

    Actionee.prototype.handleClick = function handleClick () {
      this.act();
    };

    Actionee.prototype.setImpressionType = function setImpressionType () {
      this._type = Type$1.IMPRESSION;
    };

    Actionee.prototype.rewind = function rewind () {
      if (this._actionElement) { this._actionElement.rewind(); }
    };

    Actionee.prototype.act = function act (data) {
      if ( data === void 0 ) data = {};

      if (this._actionElement !== undefined) {
        this._data.component_value = this.value;
        this._actionElement.act(Object.assign(this._data, data));
      }
    };

    Actionee.prototype.getFirstText = function getFirstText (node) {
      if (!node) { node = this.node; }
      if (node.childNodes && node.childNodes.length > 0) {
        for (var i = 0; i < node.childNodes.length; i++) {
          if (node.childNodes[i].nodeType === Node.TEXT_NODE) {
            var text = node.childNodes[i].textContent.trim();
            if (text) {
              return this.cropText(text);
            }
          }
        }

        for (var i$1 = 0; i$1 < node.childNodes.length; i$1++) {
          var text$1 = this.getFirstText(node.childNodes[i$1]);
          if (text$1) {
            return this.cropText(text$1);
          }
        }
      }
      return '';
    };

    Actionee.prototype.cropText = function cropText (text, length) {

      return text.length > 50 ? ((text.substring(0, 50).trim()) + "[...]") : text;
    };

    Actionee.prototype.getInteractionLabel = function getInteractionLabel () {
      var title = this.getAttribute('title');
      if (title) { return this.cropText(title); }

      var text = this.getFirstText();
      if (text) { return text; }

      var img = this.node.querySelector('img');
      if (img) {
        var alt = img.getAttribute('alt');
        if (alt) { return this.cropText(alt); }
      }

      return null;
    };

    Actionee.prototype.getHeadingLabel = function getHeadingLabel (length) {
      var this$1$1 = this;
      if ( length === void 0 ) length = 6;

      var selector = Array.from({ length: length }, function (v, i) { return ("h" + (i + 1)); }).join(',');
      var headings = Array.from(this.querySelectorAll(selector)).filter(function (heading) { return (this$1$1.node.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0; });
      if (headings.length) {
        for (var i = 0, list = headings; i < list.length; i += 1) {
          var heading = list[i];

          var text = this.getFirstText(heading);
          if (text) { return text; }
        }
      }
    };

    Actionee.prototype.detectLevel = function detectLevel (node) {
      if (!node) { node = this.node; }
      var selector = Array.from({ length: 6 }, function (v, i) { return ("h" + (i + 1)); }).join(',');
      var levels = Array.from(node.querySelectorAll(selector)).map(function (heading) { return Number(heading.tagName.charAt(1)); });
      if (levels.length) { this._level = Math.min.apply(null, levels) - 1; }
    };

    Actionee.prototype.validate = function validate (target) {
      return true;
    };

    prototypeAccessors.actionElement.get = function () {
      return this._actionElement;
    };

    prototypeAccessors.label.get = function () {
      return null;
    };

    prototypeAccessors.value.get = function () {
      return this._value || this.label;
    };

    prototypeAccessors.value.set = function (value) {
      this._value = value;
    };

    prototypeAccessors.isActionee.get = function () {
      return true;
    };

    prototypeAccessors.level.get = function () {
      return this._level;
    };

    prototypeAccessors.type.get = function () {
      return this._type;
    };

    Actionee.prototype.dispose = function dispose () {
      if (this._clickTarget) {
        this._clickTarget.removeEventListener('click', this._clickHandler);
      }
      superclass.prototype.dispose.call(this);
    };

    Object.defineProperties( Actionee.prototype, prototypeAccessors );
    Object.defineProperties( Actionee, staticAccessors );

    return Actionee;
  }(api.core.Instance));

  var AttributeActionee = /*@__PURE__*/(function (Actionee) {
    function AttributeActionee () {
      Actionee.call(this, 100);
    }

    if ( Actionee ) AttributeActionee.__proto__ = Actionee;
    AttributeActionee.prototype = Object.create( Actionee && Actionee.prototype );
    AttributeActionee.prototype.constructor = AttributeActionee;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AttributeActionee';
    };

    AttributeActionee.prototype.init = function init () {
      this._attribute = this.registration.selector.replace(/[[\]]/g, '');
      var id = this._attribute.split('-').pop();
      this._type = Object.values(Type$1).filter(function (type) { return type.id === id; })[0];
      this._title = this.getAttribute(this._attribute);
      if (this._type === Type$1.CLICK) { this.detectInteractionType(); }

      switch (this._type.method) {
        case 'eventListener':
          this.listen(this._type.event, this.handleEvent.bind(this));
          break;

        case 'change':
          this.listen(this._type.event, this.handleChange.bind(this));
          break;
      }
    };

    AttributeActionee.prototype.handleEvent = function handleEvent (e) {
      this._actionElement.act();
    };

    AttributeActionee.prototype.handleChange = function handleChange (e) {
      this._actionElement.act({ change_value: e.target.value });
    };

    AttributeActionee.prototype.dispose = function dispose () {
      this._actionElement.dispose();
      Actionee.prototype.dispose.call(this);
    };

    Object.defineProperties( AttributeActionee, staticAccessors );

    return AttributeActionee;
  }(Actionee));

  var integrateAttributes = function () {
    Object.values(Type$1)
      .filter(function (type) { return type.attributed; })
      .forEach(function (type) { return api.internals.register(api.internals.ns.attr.selector(("analytics-" + (type.id))), AttributeActionee); });
  };

  var ButtonEmission = {
    CLICK: api.internals.ns.emission('button', 'click')
  };

  var ComponentActionee = /*@__PURE__*/(function (Actionee) {
    function ComponentActionee (priority, isRatingActive) {
      if ( priority === void 0 ) priority = -1;
      if ( isRatingActive === void 0 ) isRatingActive = false;

      Actionee.call(this, priority, isRatingActive, 'dsfr_component');
    }

    if ( Actionee ) ComponentActionee.__proto__ = Actionee;
    ComponentActionee.prototype = Object.create( Actionee && Actionee.prototype );
    ComponentActionee.prototype.constructor = ComponentActionee;

    var prototypeAccessors = { proxy: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ComponentActionee';
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;

      var proxyAccessors = {
        get component () {
          return scope.component;
        }
      };

      return api.internals.property.completeAssign.call(this, Actionee.prototype.proxy, proxyAccessors);
    };

    ComponentActionee.prototype.setDiscloseType = function setDiscloseType () {
      this._type = Type$1.DISCLOSE;
    };

    ComponentActionee.prototype.listenDisclose = function listenDisclose () {
      this.listen(api.core.DisclosureEvent.DISCLOSE, this._handleDisclose.bind(this), { capture: true });
    };

    ComponentActionee.prototype._handleDisclose = function _handleDisclose () {
      this.act();
    };

    ComponentActionee.prototype.setChangeType = function setChangeType () {
      this._type = Type$1.CHANGE;
    };

    ComponentActionee.prototype.listenChange = function listenChange () {
      this.listen('change', this._handleChange.bind(this), { capture: true });
    };

    ComponentActionee.prototype._handleChange = function _handleChange (e) {
      if (e.target && e.target.value) {
        this.setChangeValue(e);
        this.act();
      }
    };

    ComponentActionee.prototype.setChangeValue = function setChangeValue (e) {
      this.value = e.target.value;
    };

    ComponentActionee.prototype.listenInputValidation = function listenInputValidation (node, type, isSendingInputValue) {
      if ( type === void 0 ) type = Type$1.CLICK;
      if ( isSendingInputValue === void 0 ) isSendingInputValue = false;

      if (!node) { node = this.node; }
      this._type = type;
      this._isSendingInputValue = isSendingInputValue;
      this.addAscent(ButtonEmission.CLICK, this._actValidatedInput.bind(this));
      var button = this.element.getDescendantInstances('ButtonActionee', null, true)[0];
      if (button) { button.isMuted = true; }
      this._validatedInput = node.querySelector('input');
      this._inputValidationHandler = this._handleInputValidation.bind(this);
      if (this._validatedInput) { this._validatedInput.addEventListener('keydown', this._inputValidationHandler); }
    };

    ComponentActionee.prototype._handleInputValidation = function _handleInputValidation (e) {
      if (e.keyCode === 13) { this._actValidatedInput(); }
    };

    ComponentActionee.prototype._actValidatedInput = function _actValidatedInput () {
      var this$1$1 = this;

      if (this._isActingValidatedInput) { return; }
      this._isActingValidatedInput = true;
      if (this._isSendingInputValue) { this.value = this._validatedInput.value.trim(); }
      this.act();
      this.request(function () { this$1$1._isActingValidatedInput = false; });
    };

    ComponentActionee.prototype.setCheckType = function setCheckType () {
      this._type = Type$1.CHECK;
    };

    ComponentActionee.prototype.detectCheckableType = function detectCheckableType () {
      var isChecked = this.node.checked;
      this._type = isChecked ? Type$1.UNCHECK : Type$1.CHECK;
    };

    ComponentActionee.prototype.listenCheckable = function listenCheckable () {
      this.listen('change', this._handleCheckable.bind(this), { capture: true });
    };

    ComponentActionee.prototype._handleCheckable = function _handleCheckable (e) {
      if (e.target && e.target.value !== 'on') {
        this.value = e.target.value;
      }

      switch (true) {
        case this._type === Type$1.CHECK && e.target.checked:
        case this._type === Type$1.UNCHECK && !e.target.checked:
          this.act();
          break;
      }
    };

    ComponentActionee.prototype.detectPressableType = function detectPressableType () {
      var isPressable = this.node.hasAttribute('aria-pressed');
      if (isPressable) {
        var isPressed = this.node.getAttribute('aria-pressed') === 'true';
        this._type = isPressed ? Type$1.RELEASE : Type$1.PRESS;
      }
      return isPressable;
    };

    ComponentActionee.prototype.listenPressable = function listenPressable () {
      this.listen('click', this._handlePressable.bind(this), { capture: true });
    };

    ComponentActionee.prototype._handlePressable = function _handlePressable (e) {
      switch (true) {
        case this._type === Type$1.PRESS && e.target.getAttribute('aria-pressed') === 'false':
        case this._type === Type$1.RELEASE && e.target.getAttribute('aria-pressed') === 'true':
          this.act();
          break;
      }
    };

    ComponentActionee.prototype.setDismissType = function setDismissType () {
      this._type = Type$1.DISMISS;
    };

    prototypeAccessors.component.get = function () {
      return null;
    };

    ComponentActionee.prototype.dispose = function dispose () {
      if (this._validatedInput) {
        this._validatedInput.removeEventListener('keydown', this._inputValidationHandler);
      }

      Actionee.prototype.dispose.call(this);
    };

    Object.defineProperties( ComponentActionee.prototype, prototypeAccessors );
    Object.defineProperties( ComponentActionee, staticAccessors );

    return ComponentActionee;
  }(Actionee));

  var AccordionSelector = {
    ACCORDION: api.internals.ns.selector('accordion'),
    TITLE: api.internals.ns.selector('accordion__title')
  };

  var ID$B = 'accordion';

  var AccordionButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function AccordionButtonActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) AccordionButtonActionee.__proto__ = ComponentActionee;
    AccordionButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    AccordionButtonActionee.prototype.constructor = AccordionButtonActionee;

    var prototypeAccessors = { button: { configurable: true },label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AccordionButtonActionee';
    };

    AccordionButtonActionee.prototype.init = function init () {
      this.setClickType();
      this.id = this.node.id || this.registration.creator.node.id;
      this.listenClick();
    };

    prototypeAccessors.button.get = function () {
      return this.element.getInstance('CollapseButton');
    };

    AccordionButtonActionee.prototype.handleClick = function handleClick () {
      if (this.button && !this.button.disclosed) { this.act(); }
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'bouton d\'accordéon';
    };

    prototypeAccessors.component.get = function () {
      return ID$B;
    };

    Object.defineProperties( AccordionButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( AccordionButtonActionee, staticAccessors );

    return AccordionButtonActionee;
  }(ComponentActionee));

  var AccordionActionee = /*@__PURE__*/(function (ComponentActionee) {
    function AccordionActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) AccordionActionee.__proto__ = ComponentActionee;
    AccordionActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    AccordionActionee.prototype.constructor = AccordionActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AccordionActionee';
    };

    AccordionActionee.prototype.init = function init () {
      this.setDiscloseType();
      this.wrapper = this.node.closest(AccordionSelector.ACCORDION);
      this.detectLevel(this.wrapper);
      this.register(("[aria-controls=\"" + (this.id) + "\"]"), AccordionButtonActionee);
      this.listenDisclose();
    };

    prototypeAccessors.label.get = function () {
      if (this.wrapper) {
        var title = this.wrapper.querySelector(AccordionSelector.TITLE);
        if (title) {
          var text = this.getFirstText(title);
          if (text) { return text; }
        }
      }
      var instance = this.element.getInstance('Collapse');
      if (instance) {
        var button = instance.buttons.filter(function (button) { return button.isPrimary; })[0];
        if (button) {
          var text$1 = this.getFirstText(button);
          if (text$1) { return text$1; }
        }
      }
      return 'accordéon';
    };

    prototypeAccessors.component.get = function () {
      return ID$B;
    };

    AccordionActionee.prototype.dispose = function dispose () {
      ComponentActionee.prototype.dispose.call(this);
    };

    Object.defineProperties( AccordionActionee.prototype, prototypeAccessors );
    Object.defineProperties( AccordionActionee, staticAccessors );

    return AccordionActionee;
  }(ComponentActionee));

  var BreadcrumbSelector = {
    LINK: api.internals.ns.selector('breadcrumb__link'),
    COLLAPSE: ((api.internals.ns.selector('breadcrumb')) + " " + (api.internals.ns.selector('collapse')))
  };

  var BreadcrumbButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function BreadcrumbButtonActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) BreadcrumbButtonActionee.__proto__ = ComponentActionee;
    BreadcrumbButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    BreadcrumbButtonActionee.prototype.constructor = BreadcrumbButtonActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'BreadcrumbButtonActionee';
    };

    BreadcrumbButtonActionee.prototype.init = function init () {
      if (this.isBreakpoint(api.core.Breakpoints.MD)) { return; }
      this.setClickType();
      this.id = this.node.id || this.registration.creator.node.id;
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }
      return 'voir le fil d\'ariane';
    };

    prototypeAccessors.component.get = function () {
      return null;
    };

    Object.defineProperties( BreadcrumbButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( BreadcrumbButtonActionee, staticAccessors );

    return BreadcrumbButtonActionee;
  }(ComponentActionee));

  var ID$A = 'breadcrumb';

  var BreadcrumbActionee = /*@__PURE__*/(function (ComponentActionee) {
    function BreadcrumbActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) BreadcrumbActionee.__proto__ = ComponentActionee;
    BreadcrumbActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    BreadcrumbActionee.prototype.constructor = BreadcrumbActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'BreadcrumbActionee';
    };

    BreadcrumbActionee.prototype.init = function init () {
      if (!this.isBreakpoint(api.core.Breakpoints.MD)) {
        this.setDiscloseType();
        this.register(("[aria-controls=\"" + (this.id) + "\"]"), BreadcrumbButtonActionee);
        this.listenDisclose();
      } else {
        this.setImpressionType();
      }
    };

    prototypeAccessors.label.get = function () {
      return 'fil d\'ariane';
    };

    prototypeAccessors.component.get = function () {
      return ID$A;
    };

    Object.defineProperties( BreadcrumbActionee.prototype, prototypeAccessors );
    Object.defineProperties( BreadcrumbActionee, staticAccessors );

    return BreadcrumbActionee;
  }(ComponentActionee));

  var BreadcrumbLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function BreadcrumbLinkActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) BreadcrumbLinkActionee.__proto__ = ComponentActionee;
    BreadcrumbLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    BreadcrumbLinkActionee.prototype.constructor = BreadcrumbLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'BreadcrumbLinkActionee';
    };

    BreadcrumbLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    BreadcrumbLinkActionee.prototype.handleClick = function handleClick () {
      this.act();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }
      return 'lien fil d\'ariane';
    };

    prototypeAccessors.component.get = function () {
      return null;
    };

    Object.defineProperties( BreadcrumbLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( BreadcrumbLinkActionee, staticAccessors );

    return BreadcrumbLinkActionee;
  }(ComponentActionee));

  var ButtonSelector = {
    BUTTON: ((api.internals.ns.selector('btn')) + ":not(" + (api.internals.ns.selector('btn--close')) + ")")
  };

  var ID$z = 'button';

  var ButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ButtonActionee () {
      ComponentActionee.call(this, 1, true);
      this._data = {};
    }

    if ( ComponentActionee ) ButtonActionee.__proto__ = ComponentActionee;
    ButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ButtonActionee.prototype.constructor = ButtonActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ButtonActionee';
    };

    ButtonActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    ButtonActionee.prototype.handleClick = function handleClick () {
      this.ascend(ButtonEmission.CLICK);
      this.act();
    };

    prototypeAccessors.label.get = function () {
      if (this.node.tagName === 'input') {
        switch (this.node.type) {
          case 'button':
          case 'submit':
            if (this.hasAttribute('value')) { return this.getAttribute('value'); }
        }
      }
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }
      return 'bouton';
    };

    prototypeAccessors.component.get = function () {
      return ID$z;
    };

    Object.defineProperties( ButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( ButtonActionee, staticAccessors );

    return ButtonActionee;
  }(ComponentActionee));

  var AlertSelector = {
    ALERT: api.internals.ns.selector('alert'),
    TITLE: api.internals.ns.selector('alert__title')
  };

  var ID$y = 'alert';

  var AlertActionee = /*@__PURE__*/(function (ComponentActionee) {
    function AlertActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) AlertActionee.__proto__ = ComponentActionee;
    AlertActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    AlertActionee.prototype.constructor = AlertActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AlertActionee';
    };

    AlertActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var alertTitle = this.node.querySelector(AlertSelector.TITLE);
      if (alertTitle) {
        var text = this.getFirstText(alertTitle);
        if (text) { return text; }
      }
      return 'alerte';
    };

    prototypeAccessors.component.get = function () {
      return ID$y;
    };

    Object.defineProperties( AlertActionee.prototype, prototypeAccessors );
    Object.defineProperties( AlertActionee, staticAccessors );

    return AlertActionee;
  }(ComponentActionee));

  var BadgeSelector = {
    BADGE: api.internals.ns.selector('badge')
  };

  var ID$x = 'badge';

  var BadgeActionee = /*@__PURE__*/(function (ComponentActionee) {
    function BadgeActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) BadgeActionee.__proto__ = ComponentActionee;
    BadgeActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    BadgeActionee.prototype.constructor = BadgeActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'BadgeActionee';
    };

    BadgeActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'badge';
    };

    prototypeAccessors.component.get = function () {
      return ID$x;
    };

    Object.defineProperties( BadgeActionee.prototype, prototypeAccessors );
    Object.defineProperties( BadgeActionee, staticAccessors );

    return BadgeActionee;
  }(ComponentActionee));

  var CalloutSelector = {
    CALLOUT: api.internals.ns.selector('callout'),
    TITLE: api.internals.ns.selector('callout__title')
  };

  var ID$w = 'callout';

  var CalloutActionee = /*@__PURE__*/(function (ComponentActionee) {
    function CalloutActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) CalloutActionee.__proto__ = ComponentActionee;
    CalloutActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    CalloutActionee.prototype.constructor = CalloutActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CalloutActionee';
    };

    CalloutActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var calloutTitle = this.node.querySelector(CalloutSelector.TITLE);
      if (calloutTitle) {
        var text = this.getFirstText(calloutTitle);
        if (text) { return text; }
      }

      return 'mise en avant';
    };

    prototypeAccessors.component.get = function () {
      return ID$w;
    };

    Object.defineProperties( CalloutActionee.prototype, prototypeAccessors );
    Object.defineProperties( CalloutActionee, staticAccessors );

    return CalloutActionee;
  }(ComponentActionee));

  var ConnectSelector = {
    CONNECT: api.internals.ns.selector('connect'),
    LINK: api.internals.ns.selector('connect + * a, connect + a')
  };

  var ID$v = 'connect';

  var ConnectActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ConnectActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) ConnectActionee.__proto__ = ComponentActionee;
    ConnectActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ConnectActionee.prototype.constructor = ConnectActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ConnectActionee';
    };

    ConnectActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      if (this.node.classList.contains('fr-connect--plus')) { return 'FranceConnect+'; }
      return 'FranceConnect';
    };

    prototypeAccessors.component.get = function () {
      return ID$v;
    };

    Object.defineProperties( ConnectActionee.prototype, prototypeAccessors );
    Object.defineProperties( ConnectActionee, staticAccessors );

    return ConnectActionee;
  }(ComponentActionee));

  var ConnectLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ConnectLinkActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) ConnectLinkActionee.__proto__ = ComponentActionee;
    ConnectLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ConnectLinkActionee.prototype.constructor = ConnectLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ConnectLinkActionee';
    };

    ConnectLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      return this.getFirstText() || 'qu\'est-ce que FranceConnect ?';
    };

    prototypeAccessors.component.get = function () {
      return ID$v;
    };

    Object.defineProperties( ConnectLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( ConnectLinkActionee, staticAccessors );

    return ConnectLinkActionee;
  }(ComponentActionee));

  var ContentSelector = {
    CONTENT: api.internals.ns.selector('content-media'),
    IMG: api.internals.ns.selector('content-media__img')
  };

  var ID$u = 'content-media';

  var ContentActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ContentActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) ContentActionee.__proto__ = ComponentActionee;
    ContentActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ContentActionee.prototype.constructor = ContentActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ContentActionee';
    };

    ContentActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    ContentActionee.prototype._getImageLabel = function _getImageLabel () {
      var contentImg = this.querySelector(ContentSelector.IMG);
      if (!contentImg) { return false; }
      var img = contentImg.getElementsByTagName('img')[0];
      if (img) {
        var alt = img.getAttribute('alt');
        if (alt) { return alt; }
        var ariaLabel = img.getAttribute('aria-label');
        if (ariaLabel) { return ariaLabel; }
      }
      var svg = contentImg.getElementsByTagName('svg')[0];
      if (svg) {
        var ariaLabel$1 = svg.getAttribute('aria-label');
        if (ariaLabel$1) { return ariaLabel$1; }
        var title = svg.querySelector('title');
        if (title) {
          var textContent = title.textContent;
          if (textContent) { return textContent.trim(); }
        }
      }
      return false;
    };

    prototypeAccessors.label.get = function () {
      var ariaLabel = this.getAttribute('aria-label');
      if (ariaLabel) { return ariaLabel; }

      var imageLabel = this._getImageLabel();
      if (imageLabel) { return imageLabel; }

      var iframe = this.querySelector('iframe');
      if (iframe) {
        var title = iframe.getAttribute('title');
        if (title) { return title; }
        var ariaLabel$1 = iframe.getAttribute('aria-label');
        if (ariaLabel$1) { return ariaLabel$1; }
      }

      var video = this.querySelector('video');
      if (video) {
        var ariaLabel$2 = video.getAttribute('aria-label');
        if (ariaLabel$2) { return ariaLabel$2; }
      }

      return 'contenu média';
    };

    prototypeAccessors.component.get = function () {
      return ID$u;
    };

    Object.defineProperties( ContentActionee.prototype, prototypeAccessors );
    Object.defineProperties( ContentActionee, staticAccessors );

    return ContentActionee;
  }(ComponentActionee));

  var ConsentSelector = {
    BANNER: api.internals.ns.selector('consent-banner')
  };

  var ID$t = 'consent';

  var ConsentActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ConsentActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) ConsentActionee.__proto__ = ComponentActionee;
    ConsentActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ConsentActionee.prototype.constructor = ConsentActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ConsentActionee';
    };

    prototypeAccessors.label.get = function () {
      return 'gestionnaire de consentement';
    };

    prototypeAccessors.component.get = function () {
      return ID$t;
    };

    Object.defineProperties( ConsentActionee.prototype, prototypeAccessors );
    Object.defineProperties( ConsentActionee, staticAccessors );

    return ConsentActionee;
  }(ComponentActionee));

  var CardSelector = {
    CARD: api.internals.ns.selector('card'),
    LINK: ((api.internals.ns.selector('card__title')) + " a"),
    TITLE: api.internals.ns.selector('card__title')
  };

  var ID$s = 'card';

  var CardActionee = /*@__PURE__*/(function (ComponentActionee) {
    function CardActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) CardActionee.__proto__ = ComponentActionee;
    CardActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    CardActionee.prototype.constructor = CardActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CardActionee';
    };

    CardActionee.prototype.init = function init () {
      var link = this.node.querySelector(CardSelector.LINK);
      if (link) {
        this.link = link;
        this.detectInteractionType(link);
        this.listenClick(link);
      } else { this.setImpressionType(); }
    };

    prototypeAccessors.label.get = function () {
      var cardTitle = this.node.querySelector(CardSelector.TITLE);
      if (cardTitle) {
        var text = this.getFirstText(cardTitle);
        if (text) { return text; }
      }

      var heading = this.getHeadingLabel();
      if (heading) { return heading; }

      return 'carte';
    };

    prototypeAccessors.component.get = function () {
      return ID$s;
    };

    Object.defineProperties( CardActionee.prototype, prototypeAccessors );
    Object.defineProperties( CardActionee, staticAccessors );

    return CardActionee;
  }(ComponentActionee));

  var CheckboxSelector = {
    INPUT: api.internals.ns.selector('checkbox-group [type="checkbox"]')
  };

  var ID$r = 'checkbox';

  var CheckboxActionee = /*@__PURE__*/(function (ComponentActionee) {
    function CheckboxActionee () {
      ComponentActionee.call(this, 1, true);
      this._data = {};
    }

    if ( ComponentActionee ) CheckboxActionee.__proto__ = ComponentActionee;
    CheckboxActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    CheckboxActionee.prototype.constructor = CheckboxActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CheckboxActionee';
    };

    CheckboxActionee.prototype.init = function init () {
      this.detectCheckableType();
      this.listenCheckable();
    };

    prototypeAccessors.label.get = function () {
      var label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
      if (label) {
        var text = this.getFirstText(label);
        if (text) { return text; }
      }
      return 'case à cocher';
    };

    prototypeAccessors.component.get = function () {
      return ID$r;
    };

    Object.defineProperties( CheckboxActionee.prototype, prototypeAccessors );
    Object.defineProperties( CheckboxActionee, staticAccessors );

    return CheckboxActionee;
  }(ComponentActionee));

  var DownloadSelector = {
    LINK: api.internals.ns.selector('download__link')
  };

  var ID$q = 'download';

  var DownloadActionee = /*@__PURE__*/(function (ComponentActionee) {
    function DownloadActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) DownloadActionee.__proto__ = ComponentActionee;
    DownloadActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    DownloadActionee.prototype.constructor = DownloadActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'DownloadActionee';
    };

    DownloadActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var text = this.getFirstText();
      if (text) { return text; }
      return 'téléchargement';
    };

    prototypeAccessors.component.get = function () {
      return ID$q;
    };

    Object.defineProperties( DownloadActionee.prototype, prototypeAccessors );
    Object.defineProperties( DownloadActionee, staticAccessors );

    return DownloadActionee;
  }(ComponentActionee));

  var FooterSelector = {
    FOOTER: api.internals.ns.selector('footer'),
    FOOTER_LINKS: ((api.internals.ns.selector('footer')) + " a[href], " + (api.internals.ns.selector('footer')) + " button")
  };

  var ID$p = 'footer';

  var FooterActionee = /*@__PURE__*/(function (ComponentActionee) {
    function FooterActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) FooterActionee.__proto__ = ComponentActionee;
    FooterActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    FooterActionee.prototype.constructor = FooterActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'FooterActionee';
    };

    FooterActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      return 'pied de page';
    };

    prototypeAccessors.component.get = function () {
      return ID$p;
    };

    Object.defineProperties( FooterActionee.prototype, prototypeAccessors );
    Object.defineProperties( FooterActionee, staticAccessors );

    return FooterActionee;
  }(ComponentActionee));

  var FollowSelector = {
    FOLLOW: api.internals.ns.selector('follow'),
    NEWSLETTER_INPUT_GROUP: api.internals.ns.selector('follow__newsletter') + ' ' + api.internals.ns.selector('input-group')
  };

  var ID$o = 'follow';

  var FollowActionee = /*@__PURE__*/(function (ComponentActionee) {
    function FollowActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) FollowActionee.__proto__ = ComponentActionee;
    FollowActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    FollowActionee.prototype.constructor = FollowActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'FollowActionee';
    };

    FollowActionee.prototype.init = function init () {
      this._inputGroup = this.querySelector(FollowSelector.NEWSLETTER_INPUT_GROUP);
      if (this._inputGroup) {
        this.listenInputValidation(this._inputGroup, Type$1.SUBSCRIBE);
        var input = this.element.getDescendantInstances('InputActionee', null, true)[0];
        if (input) { input.isMuted = true; }
      }
    };

    prototypeAccessors.label.get = function () {
      return 'lettre d\'information et réseaux sociaux';
    };

    prototypeAccessors.component.get = function () {
      return ID$o;
    };

    Object.defineProperties( FollowActionee.prototype, prototypeAccessors );
    Object.defineProperties( FollowActionee, staticAccessors );

    return FollowActionee;
  }(ComponentActionee));

  var FooterLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function FooterLinkActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) FooterLinkActionee.__proto__ = ComponentActionee;
    FooterLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    FooterLinkActionee.prototype.constructor = FooterLinkActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'FooterLinkActionee';
    };

    FooterLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var label = this.getInteractionLabel();
      if (label) { return label; }

      return 'lien pied de page';
    };

    Object.defineProperties( FooterLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( FooterLinkActionee, staticAccessors );

    return FooterLinkActionee;
  }(ComponentActionee));

  var ID$n = 'header';

  var HeaderActionee = /*@__PURE__*/(function (ComponentActionee) {
    function HeaderActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) HeaderActionee.__proto__ = ComponentActionee;
    HeaderActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    HeaderActionee.prototype.constructor = HeaderActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderActionee';
    };

    HeaderActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      return 'en-tête';
    };

    prototypeAccessors.component.get = function () {
      return ID$n;
    };

    Object.defineProperties( HeaderActionee.prototype, prototypeAccessors );
    Object.defineProperties( HeaderActionee, staticAccessors );

    return HeaderActionee;
  }(ComponentActionee));

  var HeaderSelector = {
    TOOLS_BUTTON: ((api.internals.ns.selector('header__tools-links')) + " " + (api.internals.ns.selector('btns-group')) + " " + (api.internals.ns.selector('btn'))),
    MENU_BUTTON: ((api.internals.ns.selector('header__menu-links')) + " " + (api.internals.ns.selector('btns-group')) + " " + (api.internals.ns.selector('btn')))
  };

  var HeaderModalButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function HeaderModalButtonActionee () {
      ComponentActionee.call(this, 4);
    }

    if ( ComponentActionee ) HeaderModalButtonActionee.__proto__ = ComponentActionee;
    HeaderModalButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    HeaderModalButtonActionee.prototype.constructor = HeaderModalButtonActionee;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderModalButtonActionee';
    };

    Object.defineProperties( HeaderModalButtonActionee, staticAccessors );

    return HeaderModalButtonActionee;
  }(ComponentActionee));

  var HeaderModalActionee = /*@__PURE__*/(function (ComponentActionee) {
    function HeaderModalActionee () {
      ComponentActionee.call(this, null, 0);
    }

    if ( ComponentActionee ) HeaderModalActionee.__proto__ = ComponentActionee;
    HeaderModalActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    HeaderModalActionee.prototype.constructor = HeaderModalActionee;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderModalActionee';
    };

    HeaderModalActionee.prototype.init = function init () {
      if (this.isBreakpoint(api.core.Breakpoints.LG)) {
        this.setPriority(4);
        this.register(("[aria-controls=\"" + (this.id) + "\"]"), HeaderModalButtonActionee);
      }
    };

    Object.defineProperties( HeaderModalActionee, staticAccessors );

    return HeaderModalActionee;
  }(ComponentActionee));

  var HeaderToolsButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function HeaderToolsButtonActionee () {
      ComponentActionee.call(this, 4);
    }

    if ( ComponentActionee ) HeaderToolsButtonActionee.__proto__ = ComponentActionee;
    HeaderToolsButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    HeaderToolsButtonActionee.prototype.constructor = HeaderToolsButtonActionee;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderToolsButtonActionee';
    };

    HeaderToolsButtonActionee.prototype.init = function init () {
      if (this.isBreakpoint(api.core.Breakpoints.LG)) { this._priority = -1; }
    };

    Object.defineProperties( HeaderToolsButtonActionee, staticAccessors );

    return HeaderToolsButtonActionee;
  }(ComponentActionee));

  var HeaderMenuButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function HeaderMenuButtonActionee () {
      ComponentActionee.apply(this, arguments);
    }

    if ( ComponentActionee ) HeaderMenuButtonActionee.__proto__ = ComponentActionee;
    HeaderMenuButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    HeaderMenuButtonActionee.prototype.constructor = HeaderMenuButtonActionee;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderMenuButtonActionee';
    };

    HeaderMenuButtonActionee.prototype.init = function init () {
      if (this.isBreakpoint(api.core.Breakpoints.LG)) { this.setPriority(4); }
    };

    Object.defineProperties( HeaderMenuButtonActionee, staticAccessors );

    return HeaderMenuButtonActionee;
  }(ComponentActionee));

  var HighlightSelector = {
    HIGHLIGHT: api.internals.ns.selector('highlight')
  };

  var ID$m = 'highlight';

  var HighlightActionee = /*@__PURE__*/(function (ComponentActionee) {
    function HighlightActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) HighlightActionee.__proto__ = ComponentActionee;
    HighlightActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    HighlightActionee.prototype.constructor = HighlightActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HighlightActionee';
    };

    HighlightActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      return 'mise en exergue';
    };

    prototypeAccessors.component.get = function () {
      return ID$m;
    };

    Object.defineProperties( HighlightActionee.prototype, prototypeAccessors );
    Object.defineProperties( HighlightActionee, staticAccessors );

    return HighlightActionee;
  }(ComponentActionee));

  var InputSelector = {
    INPUT: api.internals.ns.selector('input-group')
  };

  var ID$l = 'input';

  var InputActionee = /*@__PURE__*/(function (ComponentActionee) {
    function InputActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) InputActionee.__proto__ = ComponentActionee;
    InputActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    InputActionee.prototype.constructor = InputActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'InputActionee';
    };

    InputActionee.prototype.init = function init () {
      this.setImpressionType();
      this._input = this.querySelector(api.internals.ns.selector('input'));
      this._label = this.querySelector(api.internals.ns.selector('label'));
      this._inputWrap = this.querySelector(api.internals.ns.selector('input-wrap'));

      if (this._inputWrap) { this.listenInputValidation(this._inputWrap); }
    };

    prototypeAccessors.label.get = function () {
      if (this._label) {
        var text = this.getFirstText(this._label);
        if (text) { return text; }
      }

      return 'champ de saisie';
    };

    prototypeAccessors.component.get = function () {
      return ID$l;
    };

    Object.defineProperties( InputActionee.prototype, prototypeAccessors );
    Object.defineProperties( InputActionee, staticAccessors );

    return InputActionee;
  }(ComponentActionee));

  var LinkSelector = {
    LINK: api.internals.ns.selector('link')
  };

  var ID$k = 'link';

  var LinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function LinkActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) LinkActionee.__proto__ = ComponentActionee;
    LinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    LinkActionee.prototype.constructor = LinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'LinkActionee';
    };

    LinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'lien';
    };

    prototypeAccessors.component.get = function () {
      return ID$k;
    };

    Object.defineProperties( LinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( LinkActionee, staticAccessors );

    return LinkActionee;
  }(ComponentActionee));

  var ModalSelector = {
    TITLE: api.internals.ns.selector('modal__title')
  };

  var ID$j = 'modal';

  var ModalActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ModalActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) ModalActionee.__proto__ = ComponentActionee;
    ModalActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ModalActionee.prototype.constructor = ModalActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalActionee';
    };

    ModalActionee.prototype.init = function init () {
      this.setDiscloseType();
      this.detectLevel();
      this.listenDisclose();
    };

    prototypeAccessors.label.get = function () {
      var title = this.node.querySelector(ModalSelector.TITLE);

      if (title) {
        var text = this.getFirstText(title);
        if (text) { return text; }
      }

      var heading = this.getHeadingLabel(2);
      if (heading) { return heading; }

      var instance = this.element.getInstance('Modal');
      if (instance) {
        var button = instance.buttons.filter(function (button) { return button.isPrimary; })[0];
        if (button) {
          var text$1 = this.getFirstText(button.node);
          if (text$1) { return text$1; }
        }
      }
      return 'modale';
    };

    prototypeAccessors.component.get = function () {
      return ID$j;
    };

    Object.defineProperties( ModalActionee.prototype, prototypeAccessors );
    Object.defineProperties( ModalActionee, staticAccessors );

    return ModalActionee;
  }(ComponentActionee));

  var NavigationSelector = {
    LINK: api.internals.ns.selector('nav__link'),
    BUTTON: api.internals.ns.selector('nav__btn')
  };

  var NavigationActionee = /*@__PURE__*/(function (ComponentActionee) {
    function NavigationActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) NavigationActionee.__proto__ = ComponentActionee;
    NavigationActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    NavigationActionee.prototype.constructor = NavigationActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NavigationActionee';
    };

    prototypeAccessors.label.get = function () {
      return 'navigation';
    };

    Object.defineProperties( NavigationActionee.prototype, prototypeAccessors );
    Object.defineProperties( NavigationActionee, staticAccessors );

    return NavigationActionee;
  }(ComponentActionee));

  var NavigationSectionActionee = /*@__PURE__*/(function (ComponentActionee) {
    function NavigationSectionActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) NavigationSectionActionee.__proto__ = ComponentActionee;
    NavigationSectionActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    NavigationSectionActionee.prototype.constructor = NavigationSectionActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NavigationSectionActionee';
    };

    NavigationSectionActionee.prototype.init = function init () {
      this._wrapper = this.node.closest(api.navigation.NavigationSelector.ITEM);
    };

    prototypeAccessors.label.get = function () {
      if (this._wrapper) {
        var button = this._wrapper.querySelector(NavigationSelector.BUTTON);
        if (button) {
          var text = this.getFirstText(button);
          if (text) { return text; }
        }
      }

      var instance = this.element.getInstance('Collapse');
      if (instance) {
        var button$1 = instance.buttons.filter(function (button) { return button.isPrimary; })[0];
        if (button$1) {
          var text$1 = this.getFirstText(button$1);
          if (text$1) { return text$1; }
        }
      }
      return 'section de navigation';
    };

    Object.defineProperties( NavigationSectionActionee.prototype, prototypeAccessors );
    Object.defineProperties( NavigationSectionActionee, staticAccessors );

    return NavigationSectionActionee;
  }(ComponentActionee));

  var ID$i = 'navigation';

  var NavigationLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function NavigationLinkActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) NavigationLinkActionee.__proto__ = ComponentActionee;
    NavigationLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    NavigationLinkActionee.prototype.constructor = NavigationLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NavigationLinkActionee';
    };

    NavigationLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'lien de navigation';
    };

    prototypeAccessors.component.get = function () {
      return ID$i;
    };

    Object.defineProperties( NavigationLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( NavigationLinkActionee, staticAccessors );

    return NavigationLinkActionee;
  }(ComponentActionee));

  var NoticeSelector = {
    NOTICE: api.internals.ns.selector('notice'),
    TITLE: api.internals.ns.selector('notice__title')
  };

  var ID$h = 'notice';

  var NoticeActionee = /*@__PURE__*/(function (ComponentActionee) {
    function NoticeActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) NoticeActionee.__proto__ = ComponentActionee;
    NoticeActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    NoticeActionee.prototype.constructor = NoticeActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NoticeActionee';
    };

    NoticeActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var noticeTitle = this.node.querySelector(NoticeSelector.TITLE);
      if (noticeTitle) {
        var firstText = this.getFirstText(noticeTitle);
        if (firstText) { return firstText; }
      }

      return 'bandeau d\'information importante';
    };

    prototypeAccessors.component.get = function () {
      return ID$h;
    };

    Object.defineProperties( NoticeActionee.prototype, prototypeAccessors );
    Object.defineProperties( NoticeActionee, staticAccessors );

    return NoticeActionee;
  }(ComponentActionee));

  var PaginationSelector = {
    PAGINATION: api.internals.ns.selector('pagination'),
    LINK: api.internals.ns.selector('pagination__link'),
    NEXT_LINK: api.internals.ns.selector('pagination__link--next'),
    LAST_LINK: api.internals.ns.selector('pagination__link--last'),
    ANALYTICS_TOTAL: api.internals.ns.attr('analytics-page-total'),
    CURRENT: '[aria-current="page"]'
  };

  var ID$g = 'pagination';

  var PaginationActionee = /*@__PURE__*/(function (ComponentActionee) {
    function PaginationActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) PaginationActionee.__proto__ = ComponentActionee;
    PaginationActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    PaginationActionee.prototype.constructor = PaginationActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PaginationActionee';
    };

    PaginationActionee.prototype.init = function init () {
      this.setPagination();
    };

    prototypeAccessors.label.get = function () {
      return 'pagination';
    };

    prototypeAccessors.component.get = function () {
      return ID$g;
    };

    PaginationActionee.prototype.setPagination = function setPagination () {
      var currentLink = this.node.querySelector(PaginationSelector.CURRENT);
      if (!currentLink) { return; }
      var currentLabel = this.getFirstText(currentLink);
      if (!currentLabel) { return; }
      var current = this.getInt(currentLabel);
      if (isNaN(current)) { return; }
      api.analytics.page.current = current;

      var total = this.getTotalPage();
      if (isNaN(total)) { return; }
      api.analytics.page.total = total;
    };

    PaginationActionee.prototype.getTotalPage = function getTotalPage () {
      var attr = parseInt(this.node.getAttribute(PaginationSelector.ANALYTICS_TOTAL));
      if (!isNaN(attr)) { return attr; }
      var links = this.node.querySelectorAll(((PaginationSelector.LINK) + ":not(" + (PaginationSelector.NEXT_LINK) + "):not(" + (PaginationSelector.LAST_LINK) + ")"));
      if (!links) { return null; }
      var totalLabel = this.getFirstText(links[links.length - 1]);
      if (!totalLabel) { return null; }
      return this.getInt(totalLabel);
    };

    PaginationActionee.prototype.getInt = function getInt (val) {
      var ints = val.match(/\d+/);
      if (!ints || ints.length === 0) { return null; }
      return parseInt(ints[0]);
    };

    Object.defineProperties( PaginationActionee.prototype, prototypeAccessors );
    Object.defineProperties( PaginationActionee, staticAccessors );

    return PaginationActionee;
  }(ComponentActionee));

  var PaginationLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function PaginationLinkActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) PaginationLinkActionee.__proto__ = ComponentActionee;
    PaginationLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    PaginationLinkActionee.prototype.constructor = PaginationLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PaginationLinkActionee';
    };

    PaginationLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }
      return 'lien pagination';
    };

    prototypeAccessors.component.get = function () {
      return null;
    };

    Object.defineProperties( PaginationLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( PaginationLinkActionee, staticAccessors );

    return PaginationLinkActionee;
  }(ComponentActionee));

  var RadioSelector = {
    INPUT: api.internals.ns.selector('radio-group [type="radio"]')
  };

  var FormSelector = {
    LABEL: api.internals.ns.selector('label'),
    FIELDSET: api.internals.ns.selector('fieldset'),
    LEGEND: api.internals.ns.selector('fieldset__legend')
  };

  var ID$f = 'radio';

  var RadioActionee = /*@__PURE__*/(function (ComponentActionee) {
    function RadioActionee () {
      ComponentActionee.call(this, 1, true);
      this._data = {};
    }

    if ( ComponentActionee ) RadioActionee.__proto__ = ComponentActionee;
    RadioActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    RadioActionee.prototype.constructor = RadioActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'RadioActionee';
    };

    RadioActionee.prototype.init = function init () {
      this.setCheckType();
      this.listenCheckable();
    };

    prototypeAccessors.label.get = function () {
      var parts = [];
      var fieldset = this.node.closest(FormSelector.FIELDSET);
      if (fieldset) {
        var legend = fieldset.querySelector(FormSelector.LEGEND);
        if (legend) {
          var firstTextLegend = this.getFirstText(legend);
          if (firstTextLegend) { parts.push(firstTextLegend); }
        }
      }
      var label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
      if (label) {
        var firstTextLabel = this.getFirstText(label);
        if (firstTextLabel) { parts.push(firstTextLabel); }
      }
      return parts.join(' › ');
    };

    prototypeAccessors.component.get = function () {
      return ID$f;
    };

    Object.defineProperties( RadioActionee.prototype, prototypeAccessors );
    Object.defineProperties( RadioActionee, staticAccessors );

    return RadioActionee;
  }(ComponentActionee));

  var QuoteSelector = {
    QUOTE: api.internals.ns.selector('quote')
  };

  var ID$e = 'quote';

  var QuoteActionee = /*@__PURE__*/(function (ComponentActionee) {
    function QuoteActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) QuoteActionee.__proto__ = ComponentActionee;
    QuoteActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    QuoteActionee.prototype.constructor = QuoteActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'QuoteActionee';
    };

    QuoteActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var blockquote = this.node.querySelector('blockquote');
      if (blockquote) {
        var firstText = this.getFirstText(blockquote);
        if (firstText) {
          return firstText;
        }
      }
      return 'citation';
    };

    prototypeAccessors.component.get = function () {
      return ID$e;
    };

    Object.defineProperties( QuoteActionee.prototype, prototypeAccessors );
    Object.defineProperties( QuoteActionee, staticAccessors );

    return QuoteActionee;
  }(ComponentActionee));

  var SearchSelector = {
    SEARCH_BAR: api.internals.ns.selector('search-bar')
  };

  var ID$d = 'search';

  var SearchActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SearchActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) SearchActionee.__proto__ = ComponentActionee;
    SearchActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SearchActionee.prototype.constructor = SearchActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SearchActionee';
    };

    SearchActionee.prototype.init = function init () {
      this.listenInputValidation(this.node, Type$1.SEARCH, true);
    };

    prototypeAccessors.label.get = function () {
      return 'barre de recherche';
    };

    prototypeAccessors.component.get = function () {
      return ID$d;
    };

    Object.defineProperties( SearchActionee.prototype, prototypeAccessors );
    Object.defineProperties( SearchActionee, staticAccessors );

    return SearchActionee;
  }(ComponentActionee));

  var SelectSelector = {
    SELECT: api.internals.ns.selector('select')
  };

  var ID$c = 'select';

  var SelectActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SelectActionee () {
      ComponentActionee.call(this, 1, true);
      this._data = {};
    }

    if ( ComponentActionee ) SelectActionee.__proto__ = ComponentActionee;
    SelectActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SelectActionee.prototype.constructor = SelectActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SelectActionee';
    };

    SelectActionee.prototype.init = function init () {
      this.setChangeType();
      this.listenChange();
    };

    SelectActionee.prototype.setChangeValue = function setChangeValue (e) {
      if (!e.target || !e.target.selectedOptions) { return; }
      var value = Array.from(e.target.selectedOptions).map(function (option) { return option.text; }).join(' - ');
      if (value) { this.value = value; }
    };

    prototypeAccessors.label.get = function () {
      var label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
      if (label) {
        var firstText = this.getFirstText(label);
        if (firstText) { return firstText; }
      }

      return 'liste déroulante';
    };

    prototypeAccessors.component.get = function () {
      return ID$c;
    };

    Object.defineProperties( SelectActionee.prototype, prototypeAccessors );
    Object.defineProperties( SelectActionee, staticAccessors );

    return SelectActionee;
  }(ComponentActionee));

  var SidemenuSelector = {
    SIDEMENU: api.internals.ns.selector('sidemenu'),
    ITEM: api.internals.ns.selector('sidemenu__item'),
    LINK: api.internals.ns.selector('sidemenu__link'),
    BUTTON: api.internals.ns.selector('sidemenu__btn'),
    TITLE: api.internals.ns.selector('sidemenu__title')
  };

  var SidemenuActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SidemenuActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) SidemenuActionee.__proto__ = ComponentActionee;
    SidemenuActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SidemenuActionee.prototype.constructor = SidemenuActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuActionee';
    };

    prototypeAccessors.label.get = function () {
      var sidemenu = this.node.closest(SidemenuSelector.SIDEMENU);
      if (sidemenu) {
        var title = sidemenu.querySelector(SidemenuSelector.TITLE);
        if (title) {
          var firstText = this.getFirstText(title);
          if (firstText) { return firstText; }
        }
      }

      return 'menu Latéral';
    };

    Object.defineProperties( SidemenuActionee.prototype, prototypeAccessors );
    Object.defineProperties( SidemenuActionee, staticAccessors );

    return SidemenuActionee;
  }(ComponentActionee));

  var ID$b = 'sidemenu';

  var SidemenuLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SidemenuLinkActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) SidemenuLinkActionee.__proto__ = ComponentActionee;
    SidemenuLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SidemenuLinkActionee.prototype.constructor = SidemenuLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuLinkActionee';
    };

    SidemenuLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'lien menu latéral';
    };

    prototypeAccessors.component.get = function () {
      return ID$b;
    };

    Object.defineProperties( SidemenuLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( SidemenuLinkActionee, staticAccessors );

    return SidemenuLinkActionee;
  }(ComponentActionee));

  var SidemenuSectionActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SidemenuSectionActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) SidemenuSectionActionee.__proto__ = ComponentActionee;
    SidemenuSectionActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SidemenuSectionActionee.prototype.constructor = SidemenuSectionActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuSectionActionee';
    };

    SidemenuSectionActionee.prototype.init = function init () {
      this._wrapper = this.node.closest(SidemenuSelector.ITEM);
    };

    prototypeAccessors.label.get = function () {
      if (this._wrapper) {
        var button = this._wrapper.querySelector(SidemenuSelector.BUTTON);
        if (button) {
          var firstText = this.getFirstText(button);
          if (firstText) { return firstText; }
        }
      }
      var instance = this.element.getInstance('Collapse');
      if (instance) {
        var button$1 = instance.buttons.filter(function (button) { return button.isPrimary; })[0];
        if (button$1) {
          var firstTextBtn = this.getFirstText(button$1);
          if (firstTextBtn) { return firstTextBtn; }
        }
      }
      return 'section menu latéral';
    };

    Object.defineProperties( SidemenuSectionActionee.prototype, prototypeAccessors );
    Object.defineProperties( SidemenuSectionActionee, staticAccessors );

    return SidemenuSectionActionee;
  }(ComponentActionee));

  var ShareSelector = {
    SHARE: api.internals.ns.selector('share'),
    TITLE: api.internals.ns.selector('share__title')
  };

  var ID$a = 'share';

  var ShareActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ShareActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) ShareActionee.__proto__ = ComponentActionee;
    ShareActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ShareActionee.prototype.constructor = ShareActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ShareActionee';
    };

    ShareActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var title = this.querySelector(ShareSelector.TITLE);
      if (title) {
        var firstText = this.getFirstText(title);
        if (firstText) { return firstText; }
      }
      return 'boutons de partage';
    };

    prototypeAccessors.component.get = function () {
      return ID$a;
    };

    Object.defineProperties( ShareActionee.prototype, prototypeAccessors );
    Object.defineProperties( ShareActionee, staticAccessors );

    return ShareActionee;
  }(ComponentActionee));

  var StepperSelector = {
    STEPPER: api.internals.ns.selector('stepper')
  };

  var ID$9 = 'stepper';

  var StepperActionee = /*@__PURE__*/(function (ComponentActionee) {
    function StepperActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) StepperActionee.__proto__ = ComponentActionee;
    StepperActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    StepperActionee.prototype.constructor = StepperActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'StepperActionee';
    };

    StepperActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      return 'indicateur d\'étapes';
    };

    prototypeAccessors.component.get = function () {
      return ID$9;
    };

    Object.defineProperties( StepperActionee.prototype, prototypeAccessors );
    Object.defineProperties( StepperActionee, staticAccessors );

    return StepperActionee;
  }(ComponentActionee));

  var SummarySelector = {
    SUMMARY: api.internals.ns.selector('summary'),
    LINK: api.internals.ns.selector('summary__link'),
    TITLE: api.internals.ns.selector('summary__title'),
    ITEM: ((api.internals.ns.selector('summary')) + " li")
  };

  var SummaryActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SummaryActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) SummaryActionee.__proto__ = ComponentActionee;
    SummaryActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SummaryActionee.prototype.constructor = SummaryActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SummaryActionee';
    };

    prototypeAccessors.label.get = function () {
      var title = this.node.querySelector(SummarySelector.TITLE);
      if (title) {
        var firstText = this.getFirstText(title);
        if (firstText) { return firstText; }
      }
      return 'sommaire';
    };

    Object.defineProperties( SummaryActionee.prototype, prototypeAccessors );
    Object.defineProperties( SummaryActionee, staticAccessors );

    return SummaryActionee;
  }(ComponentActionee));

  var ID$8 = 'summary';

  var SummaryLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SummaryLinkActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) SummaryLinkActionee.__proto__ = ComponentActionee;
    SummaryLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SummaryLinkActionee.prototype.constructor = SummaryLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SummaryLinkActionee';
    };

    SummaryLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }
      return 'lien sommaire';
    };

    prototypeAccessors.component.get = function () {
      return ID$8;
    };

    Object.defineProperties( SummaryLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( SummaryLinkActionee, staticAccessors );

    return SummaryLinkActionee;
  }(ComponentActionee));

  var SummarySectionActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SummarySectionActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) SummarySectionActionee.__proto__ = ComponentActionee;
    SummarySectionActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    SummarySectionActionee.prototype.constructor = SummarySectionActionee;

    var prototypeAccessors = { label: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SummarySectionActionee';
    };

    SummarySectionActionee.prototype.init = function init () {
      this._link = this.querySelector(SummarySelector.LINK);
    };

    SummarySectionActionee.prototype.validate = function validate (target) {
      return this._link !== target;
    };

    prototypeAccessors.label.get = function () {
      if (!this._link) { return null; }
      var firstText = this.getFirstText(this._link);
      if (firstText) { return firstText; }
      return 'section sommaire';
    };

    Object.defineProperties( SummarySectionActionee.prototype, prototypeAccessors );
    Object.defineProperties( SummarySectionActionee, staticAccessors );

    return SummarySectionActionee;
  }(ComponentActionee));

  var ID$7 = 'tab';

  var TabButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TabButtonActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) TabButtonActionee.__proto__ = ComponentActionee;
    TabButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TabButtonActionee.prototype.constructor = TabButtonActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabButtonActionee';
    };

    TabButtonActionee.prototype.init = function init () {
      this.setClickType();
      this.id = this.node.id || this.registration.creator.node.id;
      this.listen('click', this.click.bind(this), { capture: true });
    };

    TabButtonActionee.prototype.click = function click () {
      this.act();
    };

    prototypeAccessors.label.get = function () {
      var text = this.getFirstText();
      if (text) { return text; }
      return 'bouton onglet';
    };

    prototypeAccessors.component.get = function () {
      return ID$7;
    };

    Object.defineProperties( TabButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( TabButtonActionee, staticAccessors );

    return TabButtonActionee;
  }(ComponentActionee));

  var TabActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TabActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) TabActionee.__proto__ = ComponentActionee;
    TabActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TabActionee.prototype.constructor = TabActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabActionee';
    };

    TabActionee.prototype.init = function init () {
      this.setDiscloseType();
      this.register(("[aria-controls=\"" + (this.id) + "\"]"), TabButtonActionee);
      this._instance = this.element.getInstance('TabPanel');
      this.listenDisclose();
    };

    prototypeAccessors.label.get = function () {
      var tabs = this.node.closest(api.tab.TabSelector.GROUP);
      if (tabs) {
        var tab = tabs.querySelector(((api.tab.TabSelector.LIST) + " [aria-controls=\"" + (this.id) + "\"]" + (api.tab.TabSelector.TAB)));
        if (tab) {
          var firstTextTab = this.getFirstText(tab);
          if (firstTextTab) { return firstTextTab; }
        }
      }

      var button = this._instance.buttons.filter(function (button) { return button.isPrimary; })[0];
      if (button) {
        var firstTextBtn = this.getFirstText(button);
        if (firstTextBtn) { return firstTextBtn; }
      }
      return 'onglet';
    };

    prototypeAccessors.component.get = function () {
      return ID$7;
    };

    Object.defineProperties( TabActionee.prototype, prototypeAccessors );
    Object.defineProperties( TabActionee, staticAccessors );

    return TabActionee;
  }(ComponentActionee));

  var TableSelector = {
    TABLE: api.internals.ns.selector('table')
  };

  var ID$6 = 'table';

  var TableActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TableActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) TableActionee.__proto__ = ComponentActionee;
    TableActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TableActionee.prototype.constructor = TableActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TableActionee';
    };

    TableActionee.prototype.init = function init () {
      this.setImpressionType();
    };

    prototypeAccessors.label.get = function () {
      var caption = this.node.querySelector('caption');
      if (caption) {
        var firstText = this.getFirstText(caption);
        if (firstText) { return firstText; }
      }
      return 'tableau';
    };

    prototypeAccessors.component.get = function () {
      return ID$6;
    };

    Object.defineProperties( TableActionee.prototype, prototypeAccessors );
    Object.defineProperties( TableActionee, staticAccessors );

    return TableActionee;
  }(ComponentActionee));

  var TileSelector = {
    TILE: api.internals.ns.selector('tile'),
    LINK: ("" + (api.internals.ns.selector('tile__link'))),
    TITLE: api.internals.ns.selector('tile__title')
  };

  var ID$5 = 'tile';

  var TileActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TileActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) TileActionee.__proto__ = ComponentActionee;
    TileActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TileActionee.prototype.constructor = TileActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TileActionee';
    };

    TileActionee.prototype.init = function init () {
      var link = this.node.querySelector(TileSelector.LINK);
      if (link) {
        this.link = link;
        this.detectInteractionType(link);
        this.listenClick(link);
      } else { this.setImpressionType(); }
    };

    prototypeAccessors.label.get = function () {
      var tileTitle = this.node.querySelector(TileSelector.TITLE);
      if (tileTitle) { return this.getFirstText(tileTitle); }

      var heading = this.getHeadingLabel();
      if (heading) { return heading; }

      return 'tuile';
    };

    prototypeAccessors.component.get = function () {
      return ID$5;
    };

    Object.defineProperties( TileActionee.prototype, prototypeAccessors );
    Object.defineProperties( TileActionee, staticAccessors );

    return TileActionee;
  }(ComponentActionee));

  var ToggleSelector = {
    INPUT: api.internals.ns.selector('toggle [type="checkbox"]')
  };

  var ID$4 = 'toggle';

  var ToggleActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ToggleActionee () {
      ComponentActionee.call(this, 1, true);
      this._data = {};
    }

    if ( ComponentActionee ) ToggleActionee.__proto__ = ComponentActionee;
    ToggleActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ToggleActionee.prototype.constructor = ToggleActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ToggleActionee';
    };

    ToggleActionee.prototype.init = function init () {
      this.detectCheckableType();
      this.listenCheckable();
    };

    prototypeAccessors.label.get = function () {
      var label = this.node.parentNode.querySelector(api.internals.ns.selector('toggle__label'));
      if (label) {
        var firstText = this.getFirstText(label);
        if (firstText) { return firstText; }
      }

      return 'interrupteur';
    };

    prototypeAccessors.component.get = function () {
      return ID$4;
    };

    Object.defineProperties( ToggleActionee.prototype, prototypeAccessors );
    Object.defineProperties( ToggleActionee, staticAccessors );

    return ToggleActionee;
  }(ComponentActionee));

  var TagSelector = {
    TAG: api.internals.ns.selector('tag'),
    PRESSABLE: '[aria-pressed]',
    DISMISSIBLE: ("" + (api.internals.ns.selector('tag--dismiss', '')))
  };

  var ID$3 = 'tag';

  var TagActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TagActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) TagActionee.__proto__ = ComponentActionee;
    TagActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TagActionee.prototype.constructor = TagActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TagActionee';
    };

    TagActionee.prototype.init = function init () {
      switch (true) {
        case this.detectPressableType():
          this.listenPressable();
          break;

        case this.isInteractive && this.node.classList.contains(TagSelector.DISMISSIBLE):
          this.setDismissType();
          this.listenClick();
          break;

        case this.isInteractive:
          this.detectInteractionType();
          this.listenClick();
          break;

        default:
          this.setImpressionType();
      }
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'tag';
    };

    prototypeAccessors.component.get = function () {
      return ID$3;
    };

    Object.defineProperties( TagActionee.prototype, prototypeAccessors );
    Object.defineProperties( TagActionee, staticAccessors );

    return TagActionee;
  }(ComponentActionee));

  var TranscriptionSelector = {
    TRANSCRIPTION: api.internals.ns.selector('transcription'),
    COLLAPSE: ((api.internals.ns.selector('transcription')) + " " + (api.internals.ns.selector('collapse'))),
    TITLE: api.internals.ns.selector('transcription__title')
  };

  var ID$2 = 'transcription';

  var TranscriptionButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TranscriptionButtonActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) TranscriptionButtonActionee.__proto__ = ComponentActionee;
    TranscriptionButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TranscriptionButtonActionee.prototype.constructor = TranscriptionButtonActionee;

    var prototypeAccessors = { button: { configurable: true },label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TranscriptionButtonActionee';
    };

    TranscriptionButtonActionee.prototype.init = function init () {
      this.setClickType();
      this.id = this.node.id || this.registration.creator.node.id;
      this.listenClick();
    };

    prototypeAccessors.button.get = function () {
      return this.element.getInstance('CollapseButton');
    };

    TranscriptionButtonActionee.prototype.handleClick = function handleClick () {
      var button = this.button;
      if (button && !button.disclosed) { this.act(); }
    };

    prototypeAccessors.label.get = function () {
      var text = this.getFirstText();
      if (text) { return text; }
      return 'bouton transcription';
    };

    prototypeAccessors.component.get = function () {
      return ID$2;
    };

    Object.defineProperties( TranscriptionButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( TranscriptionButtonActionee, staticAccessors );

    return TranscriptionButtonActionee;
  }(ComponentActionee));

  var TranscriptionActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TranscriptionActionee () {
      ComponentActionee.call(this, 2, true);
    }

    if ( ComponentActionee ) TranscriptionActionee.__proto__ = ComponentActionee;
    TranscriptionActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TranscriptionActionee.prototype.constructor = TranscriptionActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TranscriptionActionee';
    };

    TranscriptionActionee.prototype.init = function init () {
      this.setDiscloseType();
      this.wrapper = this.node.closest(TranscriptionSelector.ACCORDION);
      this.detectLevel(this.wrapper);
      this.register(("[aria-controls=\"" + (this.id) + "\"]"), TranscriptionButtonActionee);
      this.listenDisclose();
    };

    prototypeAccessors.label.get = function () {
      if (this.wrapper) {
        var title = this.wrapper.querySelector(TranscriptionSelector.TITLE);
        if (title) {
          var firstTextTitle = this.getFirstText(title);
          if (firstTextTitle) { return firstTextTitle; }
        }
      }
      var instance = this.element.getInstance('Collapse');
      if (instance) {
        var button = instance.buttons.filter(function (button) { return button.isPrimary; })[0];
        if (button) {
          var firstTextBtn = this.getFirstText(button);
          if (firstTextBtn) { return firstTextBtn; }
        }
      }
      return 'transcription';
    };

    prototypeAccessors.component.get = function () {
      return ID$2;
    };

    Object.defineProperties( TranscriptionActionee.prototype, prototypeAccessors );
    Object.defineProperties( TranscriptionActionee, staticAccessors );

    return TranscriptionActionee;
  }(ComponentActionee));

  var TranslateSelector = {
    BUTTON: api.internals.ns.selector('translate__btn')
  };

  var ID$1 = 'translate';

  var TranslateButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TranslateButtonActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) TranslateButtonActionee.__proto__ = ComponentActionee;
    TranslateButtonActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TranslateButtonActionee.prototype.constructor = TranslateButtonActionee;

    var prototypeAccessors = { button: { configurable: true },label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TranslateButtonActionee';
    };

    TranslateButtonActionee.prototype.init = function init () {
      this.setClickType();
      this.id = this.node.id || this.registration.creator.node.id;
      this.listenClick();
    };

    prototypeAccessors.button.get = function () {
      return this.element.getInstance('CollapseButton');
    };

    TranslateButtonActionee.prototype.handleClick = function handleClick () {
      var button = this.button;
      if (button && !button.disclosed) { this.act(); }
    };

    prototypeAccessors.label.get = function () {
      var label = this.getInteractionLabel();
      if (label) { return label; }
      return 'bouton sélecteur de langue';
    };

    prototypeAccessors.component.get = function () {
      return ID$1;
    };

    Object.defineProperties( TranslateButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( TranslateButtonActionee, staticAccessors );

    return TranslateButtonActionee;
  }(ComponentActionee));

  var TranslateActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TranslateActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) TranslateActionee.__proto__ = ComponentActionee;
    TranslateActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    TranslateActionee.prototype.constructor = TranslateActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TranslateActionee';
    };

    TranslateActionee.prototype.init = function init () {
      this.setDiscloseType();
      this.register(("[aria-controls=\"" + (this.id) + "\"]"), TranslateButtonActionee);
      this.listenDisclose();
    };

    prototypeAccessors.label.get = function () {
      var button = this.node.querySelector(TranslateSelector.BUTTON);
      if (button) {
        var title = button.getAttribute('title');
        if (title) { return title; }
      }

      return 'sélecteur de langue';
    };

    prototypeAccessors.component.get = function () {
      return ID$1;
    };

    Object.defineProperties( TranslateActionee.prototype, prototypeAccessors );
    Object.defineProperties( TranslateActionee, staticAccessors );

    return TranslateActionee;
  }(ComponentActionee));

  var UploadSelector = {
    UPLOAD: api.internals.ns.selector('upload')
  };

  var ID = 'upload';

  var UploadActionee = /*@__PURE__*/(function (ComponentActionee) {
    function UploadActionee () {
      ComponentActionee.call(this, 1, true);
    }

    if ( ComponentActionee ) UploadActionee.__proto__ = ComponentActionee;
    UploadActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    UploadActionee.prototype.constructor = UploadActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'UploadActionee';
    };

    UploadActionee.prototype.init = function init () {
      this.setChangeType();
      this._label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
      this.listenChange();
    };

    UploadActionee.prototype.setChangeValue = function setChangeValue (e) {
      if (!e.target || !e.target.files) { return; }
      var value = Array.from(e.target.files).map(function (file) { return /(?:\.([^.]+))?$/.exec(file.name)[1]; }).filter(function (name, index, array) { return array.indexOf(name) === index; }).join(' - ');
      if (value) { this.value = value; }
    };

    prototypeAccessors.label.get = function () {
      if (this._label) {
        var text = this.getFirstText(this._label);
        if (text) { return text; }
      }

      return 'ajout de fichier';
    };

    prototypeAccessors.component.get = function () {
      return ID;
    };

    Object.defineProperties( UploadActionee.prototype, prototypeAccessors );
    Object.defineProperties( UploadActionee, staticAccessors );

    return UploadActionee;
  }(ComponentActionee));

  var integrateComponents = function () {
    if (api.accordion) {
      api.internals.register(api.accordion.AccordionSelector.COLLAPSE, AccordionActionee);
    }

    if (api.breadcrumb) {
      api.internals.register(BreadcrumbSelector.COLLAPSE, BreadcrumbActionee);
      api.internals.register(BreadcrumbSelector.LINK, BreadcrumbLinkActionee);
    }

    api.internals.register(AlertSelector.ALERT, AlertActionee);

    api.internals.register(BadgeSelector.BADGE, BadgeActionee);

    api.internals.register(ButtonSelector.BUTTON, ButtonActionee);

    api.internals.register(CalloutSelector.CALLOUT, CalloutActionee);

    api.internals.register(ConnectSelector.CONNECT, ConnectActionee);
    api.internals.register(ConnectSelector.LINK, ConnectLinkActionee);

    api.internals.register(ContentSelector.CONTENT, ContentActionee);

    api.internals.register(ConsentSelector.BANNER, ConsentActionee);

    api.internals.register(CardSelector.CARD, CardActionee);

    api.internals.register(InputSelector.INPUT, InputActionee);

    api.internals.register(CheckboxSelector.INPUT, CheckboxActionee);

    api.internals.register(DownloadSelector.LINK, DownloadActionee);

    api.internals.register(FooterSelector.FOOTER, FooterActionee);
    api.internals.register(FooterSelector.FOOTER_LINKS, FooterLinkActionee);

    api.internals.register(FollowSelector.FOLLOW, FollowActionee);

    if (api.header) {
      api.internals.register(api.header.HeaderSelector.HEADER, HeaderActionee);
      api.internals.register(api.header.HeaderSelector.MODALS, HeaderModalActionee);
      api.internals.register(HeaderSelector.TOOLS_BUTTON, HeaderToolsButtonActionee);
      api.internals.register(HeaderSelector.MENU_BUTTON, HeaderMenuButtonActionee);
    }

    api.internals.register(HighlightSelector.HIGHLIGHT, HighlightActionee);

    api.internals.register(LinkSelector.LINK, LinkActionee);

    if (api.modal) {
      api.internals.register(api.modal.ModalSelector.MODAL, ModalActionee);
    }

    if (api.navigation) {
      api.internals.register(api.navigation.NavigationSelector.NAVIGATION, NavigationActionee);
      api.internals.register(NavigationSelector.LINK, NavigationLinkActionee);
      api.internals.register(api.navigation.NavigationSelector.COLLAPSE, NavigationSectionActionee);
    }

    api.internals.register(NoticeSelector.NOTICE, NoticeActionee);

    api.internals.register(PaginationSelector.PAGINATION, PaginationActionee);
    api.internals.register(PaginationSelector.LINK, PaginationLinkActionee);

    api.internals.register(QuoteSelector.QUOTE, QuoteActionee);

    api.internals.register(RadioSelector.INPUT, RadioActionee);

    api.internals.register(SearchSelector.SEARCH_BAR, SearchActionee);

    api.internals.register(SelectSelector.SELECT, SelectActionee);

    if (api.sidemenu) {
      api.internals.register(SidemenuSelector.SIDEMENU, SidemenuActionee);
      api.internals.register(SidemenuSelector.LINK, SidemenuLinkActionee);
      api.internals.register(api.sidemenu.SidemenuSelector.COLLAPSE, SidemenuSectionActionee);
    }

    api.internals.register(ShareSelector.SHARE, ShareActionee);

    api.internals.register(StepperSelector.STEPPER, StepperActionee);

    api.internals.register(SummarySelector.SUMMARY, SummaryActionee);
    api.internals.register(SummarySelector.LINK, SummaryLinkActionee);
    api.internals.register(SummarySelector.ITEM, SummarySectionActionee);

    if (api.tab) {
      api.internals.register(api.tab.TabSelector.PANEL, TabActionee);
    }

    api.internals.register(TableSelector.TABLE, TableActionee);

    api.internals.register(TagSelector.TAG, TagActionee);

    api.internals.register(TileSelector.TILE, TileActionee);

    api.internals.register(ToggleSelector.INPUT, ToggleActionee);

    api.internals.register(TranscriptionSelector.COLLAPSE, TranscriptionActionee);

    api.internals.register(TranslateSelector.COLLAPSE, TranslateActionee);

    api.internals.register(UploadSelector.UPLOAD, UploadActionee);
  };

  // import './core/core';

  var integration = function () {
    integrateAttributes();
    integrateComponents();
  };

  api.analytics.readiness.then(function () { return integration(); }, function () {});

})();
//# sourceMappingURL=analytics.nomodule.js.map

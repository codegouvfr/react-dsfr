/*! DSFR v1.14.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.14.2'
  };

  var api = window[config.namespace];

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

  var prototypeAccessors$e = { isDisabled: { configurable: true } };

  Opt.prototype._configure = function _configure () {
    var scope = this;
    window[DISABLED] = function () { return scope.isDisabled; };
    window[TOGGLE] = this.toggle.bind(this);
  };

  prototypeAccessors$e.isDisabled.get = function () {
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

  Object.defineProperties( Opt.prototype, prototypeAccessors$e );

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

  var prototypeAccessors$d = { id: { configurable: true },store: { configurable: true } };

  prototypeAccessors$d.id.get = function () {
    return this._id;
  };

  prototypeAccessors$d.store.get = function () {
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

  Object.defineProperties( Init.prototype, prototypeAccessors$d );

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

  var ActionRegulation = {
    ENFORCE: 'enforce',
    PREVENT: 'prevent',
    NONE: 'none'
  };

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

  Queue.prototype.regulate = function regulate (action, queue) {
    if (!action) { return false; }
    if (queue.some(function (queued) { return queued.test(action); })) {
      api.inspector.log('action exists in queue', action);
      return false;
    }
    switch (action.regulation) {
      case ActionRegulation.PREVENT:
        return false;
      case ActionRegulation.ENFORCE:
        return true;
      default:
        return this._collector.isActionEnabled === true;
    }
  };

  Queue.prototype.appendStartingAction = function appendStartingAction (action, data) {
    if (!this.regulate(action, this._startingActions)) { return; }
    var queued = new QueuedAction(action, data);
    this._startingActions.push(queued);
    this._request();
  };

  Queue.prototype.appendEndingAction = function appendEndingAction (action, data) {
    if (!this.regulate(action, this._endingActions)) { return; }
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

    if (this._type === PushType.COLLECTOR && this._collector.isCollecting) {
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

  var prototypeAccessors$c = { debugger: { configurable: true },isActive: { configurable: true } };

  prototypeAccessors$c.debugger.get = function () {
    return window._oEa;
  };

  prototypeAccessors$c.isActive.get = function () {
    if (!this.debugger) { return false; }
    return this.debugger._dbg === '1';
  };

  prototypeAccessors$c.isActive.set = function (value) {
    if (!this.debugger || this.isActive === value) { return; }
    this.debugger.debug(value ? 1 : 0);
  };

  Object.defineProperties( Debug.prototype, prototypeAccessors$c );

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

  var normaliseISODate = function (date) { return date.toISOString().split('T')[0]; };

  var validateDate = function (value, name, allowNull) {
    if ( allowNull === void 0 ) allowNull = true;

    switch (true) {
      case value instanceof Date:
        return normaliseISODate(value);

      case typeof value === 'string': {
        var date = new Date(value);
        if (date.toString() !== 'Invalid Date') { return normaliseISODate(date); }
        break;
      }

      case value === undefined && allowNull:
      case value === null && allowNull:
        return null;
    }

    api.inspector.warn(("unexpected value '" + value + "' set at analytics." + name + ". Expecting a Date"));
    return null;
  };

  var User = function User (config) {
    this._config = config || {};
  };

  var prototypeAccessors$b = { uid: { configurable: true },email: { configurable: true },isNew: { configurable: true },status: { configurable: true },profile: { configurable: true },language: { configurable: true },type: { configurable: true },layer: { configurable: true } };

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

  prototypeAccessors$b.uid.get = function () {
    return this._uid;
  };

  prototypeAccessors$b.email.get = function () {
    return this._email;
  };

  prototypeAccessors$b.isNew.get = function () {
    return this._isNew;
  };

  prototypeAccessors$b.status.set = function (id) {
      var this$1$1 = this;

    var stati = Object.values(Status).filter(function (status) { return status.isConnected === this$1$1._isConnected; });
    this._status = stati.filter(function (status) { return status.id === id || status.value === id; })[0] || stati.filter(function (status) { return status.isDefault; })[0];
  };

  prototypeAccessors$b.status.get = function () {
    return this._status.id;
  };

  prototypeAccessors$b.profile.set = function (value) {
    var valid = validateString(value, 'user.profile');
    if (valid !== null) { this._profile = valid; }
  };

  prototypeAccessors$b.profile.get = function () {
    return this._profile.id;
  };

  prototypeAccessors$b.language.set = function (value) {
    var valid = validateLang(value, 'user.language');
    if (valid !== null) { this._language = valid; }
  };

  prototypeAccessors$b.language.get = function () {
    return this._language || navigator.language;
  };

  prototypeAccessors$b.type.set = function (id) {
    this._type = Object.values(Type$2).filter(function (type) { return type.id === id || type.value === id; })[0];
  };

  prototypeAccessors$b.type.get = function () {
    return this._type.id;
  };

  prototypeAccessors$b.layer.get = function () {
    var layer = [];
    if (this.uid) { layer.push('uid', normalize(this.uid)); }
    if (this.email) { layer.push('email', normalize(this.email)); }
    if (this.isNew) { layer.push('newcustomer', '1'); }
    if (this.language) { layer.push('user_language', this.language); }
    layer.push('user_login_status', this._status.value);
    if (this._profile) { layer.push('profile', this._profile); }
    if (this._type) { layer.push('user_type', this._type.value); }
    return layer;
  };

  Object.defineProperties( User.prototype, prototypeAccessors$b );

  User.Status = Status;
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

  var prototypeAccessors$a = { environment: { configurable: true },entity: { configurable: true },language: { configurable: true },target: { configurable: true },type: { configurable: true },region: { configurable: true },department: { configurable: true },version: { configurable: true },api: { configurable: true },layer: { configurable: true } };

  Site.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this.environment = clear ? Environment.DEVELOPMENT.id : this._config.environment;
    this.entity = clear ? undefined : this._config.entity;
    this.language = clear ? undefined : this._config.language;
    this.target = clear ? undefined : this._config.target;
    this.type = clear ? undefined : this._config.type;
    this.region = clear ? undefined : this._config.region;
    this.department = clear ? undefined : this._config.department;
    this.version = clear ? undefined : this._config.version;
    this._api = api.version;
  };

  prototypeAccessors$a.environment.set = function (value) {
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

  prototypeAccessors$a.environment.get = function () {
    return this._environment ? this._environment.id : Environment.DEVELOPMENT.id;
  };

  prototypeAccessors$a.entity.set = function (value) {
    var valid = validateString(value, 'site.entity');
    if (valid !== null) { this._entity = valid; }
  };

  prototypeAccessors$a.entity.get = function () {
    return this._entity;
  };

  prototypeAccessors$a.language.set = function (value) {
    var valid = validateLang(value, 'site.language');
    if (valid !== null) { this._language = valid; }
  };

  prototypeAccessors$a.language.get = function () {
    return this._language || document.documentElement.lang;
  };

  prototypeAccessors$a.target.set = function (value) {
    var valid = validateString(value, 'site.target');
    if (valid !== null) { this._target = valid; }
  };

  prototypeAccessors$a.target.get = function () {
    return this._target;
  };

  prototypeAccessors$a.type.set = function (value) {
    var valid = validateString(value, 'site.type');
    if (valid !== null) { this._type = valid; }
  };

  prototypeAccessors$a.type.get = function () {
    return this._type;
  };

  prototypeAccessors$a.region.set = function (value) {
    var valid = validateGeography(value, 'site.region');
    if (valid !== null) { this._region = valid; }
  };

  prototypeAccessors$a.region.get = function () {
    return this._region;
  };

  prototypeAccessors$a.department.set = function (value) {
    var valid = validateGeography(value, 'site.department');
    if (valid !== null) { this._department = valid; }
  };

  prototypeAccessors$a.department.get = function () {
    return this._department;
  };

  prototypeAccessors$a.version.set = function (value) {
    var valid = validateString(value, 'site.version');
    if (valid !== null) { this._version = valid; }
  };

  prototypeAccessors$a.version.get = function () {
    return this._version;
  };

  prototypeAccessors$a.api.get = function () {
    return this._api;
  };

  prototypeAccessors$a.layer.get = function () {
    var layer = [];
    layer.push('site_environment', this._environment.value);
    if (this.entity) { layer.push('site_entity', normalize(this.entity)); }
    else { api.inspector.warn('entity is required in analytics.site'); }
    if (this.language) { layer.push('site_language', this.language); }
    if (this.target) { layer.push('site_target', normalize(this.target)); }
    if (this.type) { layer.push('site_type', normalize(this.type)); }
    if (this.region) { layer.push('site_region', this.region); }
    if (this.department) { layer.push('site_department', this.department); }
    if (this.version) { layer.push('site_version', this.version); }
    if (this.api) { layer.push('api_version', this.api); }
    return layer;
  };

  Object.defineProperties( Site.prototype, prototypeAccessors$a );

  Site.Environment = Environment;

  var Inventory = {
    accordion: api.internals.ns.selector('accordion'),
    alert: api.internals.ns.selector('alert'),
    badge: api.internals.ns.selector('badge'),
    breadcrumb: api.internals.ns.selector('breadcrumb'),
    button: api.internals.ns.selector('btn'),
    callout: api.internals.ns.selector('callout'),
    card: api.internals.ns.selector('card'),
    checkbox: api.internals.ns.selector('checkbox-group'),
    connect: api.internals.ns.selector('connect'),
    consent: api.internals.ns.selector('consent-banner'),
    content: api.internals.ns.selector('content-media'),
    download: api.internals.ns.selector('download'),
    follow: api.internals.ns.selector('follow'),
    footer: api.internals.ns.selector('footer'),
    header: api.internals.ns.selector('header'),
    highlight: api.internals.ns.selector('highlight'),
    input: api.internals.ns.selector('input-group'),
    link: api.internals.ns.selector('link'),
    modal: api.internals.ns.selector('modal'),
    navigation: api.internals.ns.selector('nav'),
    notice: api.internals.ns.selector('notice'),
    pagination: api.internals.ns.selector('pagination'),
    quote: api.internals.ns.selector('quote'),
    radio: api.internals.ns.selector('radio-group'),
    search: api.internals.ns.selector('search-bar'),
    select: api.internals.ns.selector('select'),
    share: api.internals.ns.selector('share'),
    sidemenu: api.internals.ns.selector('sidemenu'),
    stepper: api.internals.ns.selector('stepper'),
    summary: api.internals.ns.selector('summary'),
    tab: api.internals.ns.selector('tabs'),
    table: api.internals.ns.selector('table'),
    tag: api.internals.ns.selector('tag'),
    tile: api.internals.ns.selector('tile'),
    toggle: api.internals.ns.selector('toggle'),
    tooltip: api.internals.ns.selector('tooltip'),
    transcription: api.internals.ns.selector('transcription'),
    translate: api.internals.ns.selector('translate'),
    upload: api.internals.ns.selector('upload-group')
  };

  var CollectionState = {
    COLLECTABLE: 'collectable',
    COLLECTING: 'collecting',
    COLLECTED: 'collected'
  };

  var Page = function Page (config) {
    this._config = config || {};
    this._state = CollectionState.COLLECTABLE;
  };

  var prototypeAccessors$9 = { isCollecting: { configurable: true },path: { configurable: true },referrer: { configurable: true },title: { configurable: true },id: { configurable: true },author: { configurable: true },date: { configurable: true },tags: { configurable: true },name: { configurable: true },labels: { configurable: true },categories: { configurable: true },isError: { configurable: true },template: { configurable: true },segment: { configurable: true },group: { configurable: true },subtemplate: { configurable: true },theme: { configurable: true },subtheme: { configurable: true },related: { configurable: true },depth: { configurable: true },current: { configurable: true },total: { configurable: true },filters: { configurable: true },layer: { configurable: true } };

  Page.prototype.reset = function reset (clear) {
      if ( clear === void 0 ) clear = false;

    this.path = clear ? '' : this._config.path;
    this.referrer = clear ? '' : this._config.referrer;
    this.title = clear ? '' : this._config.title;
    this.name = clear ? '' : this._config.name;
    this.id = clear ? '' : this._config.id;
    this.author = clear ? '' : this._config.author;
    this.date = clear ? '' : this._config.date;
    this._labels = clear || !this._config.labels ? ['', '', '', '', ''] : this._config.labels;
    this._labels.length = 5;
    this._tags = clear || !this._config.tags ? [] : this._config.tags;
    this._categories = clear || !this._config.categories ? ['', '', ''] : this._config.categories;
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

  Page.prototype.collecting = function collecting () {
    if (this._state !== CollectionState.COLLECTABLE) {
      api.inspector.warn(("current path '" + (this.path) + "' was already collected"));
      return false;
    }
    this._state = CollectionState.COLLECTING;
    return true;
  };

  prototypeAccessors$9.isCollecting.get = function () {
    return this._state === CollectionState.COLLECTING;
  };

  prototypeAccessors$9.path.set = function (value) {
    var valid = validateString(value, 'page.path');
    if (valid !== null) {
      this._path = valid;
      this._state = CollectionState.COLLECTABLE;
    }
  };

  prototypeAccessors$9.path.get = function () {
    return this._path || ("" + (document.location.pathname) + (document.location.search));
  };

  prototypeAccessors$9.referrer.set = function (value) {
    var valid = validateString(value, 'page.referrer');
    if (valid !== null) { this._referrer = valid; }
  };

  prototypeAccessors$9.referrer.get = function () {
    return this._referrer;
  };

  prototypeAccessors$9.title.set = function (value) {
    var valid = validateString(value, 'page.title');
    if (valid !== null) { this._title = valid; }
  };

  prototypeAccessors$9.title.get = function () {
    return this._title || document.title;
  };

  prototypeAccessors$9.id.set = function (value) {
    var valid = validateString(value, 'page.id');
    if (valid !== null) { this._id = valid; }
  };

  prototypeAccessors$9.id.get = function () {
    return this._id;
  };

  prototypeAccessors$9.author.set = function (value) {
    var valid = validateString(value, 'page.author');
    if (valid !== null) { this._author = valid; }
  };

  prototypeAccessors$9.author.get = function () {
    return this._author;
  };

  prototypeAccessors$9.date.set = function (value) {
    var valid = validateDate(value, 'page.date');
    if (valid !== null) { this._date = valid; }
  };

  prototypeAccessors$9.date.get = function () {
    return this._date;
  };

  prototypeAccessors$9.tags.get = function () {
    return this._tags;
  };

  prototypeAccessors$9.name.set = function (value) {
    var valid = validateString(value, 'page.name');
    if (valid !== null) { this._name = valid; }
  };

  prototypeAccessors$9.name.get = function () {
    return this._name || this.title;
  };

  prototypeAccessors$9.labels.get = function () {
    return this._labels;
  };

  prototypeAccessors$9.categories.get = function () {
    return this._categories;
  };

  prototypeAccessors$9.isError.set = function (value) {
    var valid = validateBoolean(value, 'page.isError');
    if (valid !== null) { this._isError = valid; }
  };

  prototypeAccessors$9.isError.get = function () {
    return this._isError;
  };

  prototypeAccessors$9.template.set = function (value) {
    var valid = validateString(value, 'page.template');
    if (valid !== null) { this._template = valid; }
  };

  prototypeAccessors$9.template.get = function () {
    return this._template || 'autres';
  };

  prototypeAccessors$9.segment.set = function (value) {
    var valid = validateString(value, 'page.segment');
    if (valid !== null) { this._segment = valid; }
  };

  prototypeAccessors$9.segment.get = function () {
    return this._segment || this.template;
  };

  prototypeAccessors$9.group.set = function (value) {
    var valid = validateString(value, 'page.group');
    if (valid !== null) { this._group = valid; }
  };

  prototypeAccessors$9.group.get = function () {
    return this._group || this.template;
  };

  prototypeAccessors$9.subtemplate.set = function (value) {
    var valid = validateString(value, 'page.subtemplate');
    if (valid !== null) { this._subtemplate = valid; }
  };

  prototypeAccessors$9.subtemplate.get = function () {
    return this._subtemplate;
  };

  prototypeAccessors$9.theme.set = function (value) {
    var valid = validateString(value, 'page.theme');
    if (valid !== null) { this._theme = valid; }
  };

  prototypeAccessors$9.theme.get = function () {
    return this._theme;
  };

  prototypeAccessors$9.subtheme.set = function (value) {
    var valid = validateString(value, 'page.subtheme');
    if (valid !== null) { this._subtheme = valid; }
  };

  prototypeAccessors$9.subtheme.get = function () {
    return this._subtheme;
  };

  prototypeAccessors$9.related.set = function (value) {
    var valid = validateString(value, 'page.related');
    if (valid !== null) { this._related = valid; }
  };

  prototypeAccessors$9.related.get = function () {
    return this._related;
  };

  prototypeAccessors$9.depth.set = function (value) {
    var valid = validateNumber(value, 'page.depth');
    if (valid !== null) { this._depth = valid; }
  };

  prototypeAccessors$9.depth.get = function () {
    return this._depth;
  };

  prototypeAccessors$9.current.set = function (value) {
    var valid = validateNumber(value, 'page.current');
    if (valid !== null) { this._current = valid; }
  };

  prototypeAccessors$9.current.get = function () {
    return this._current;
  };

  prototypeAccessors$9.total.set = function (value) {
    var valid = validateNumber(value, 'page.total');
    if (valid !== null) { this._total = valid; }
  };

  prototypeAccessors$9.total.get = function () {
    return this._total;
  };

  prototypeAccessors$9.filters.get = function () {
    return this._filters;
  };

  prototypeAccessors$9.layer.get = function () {
    this._state = CollectionState.COLLECTED;
    var layer = [];
    if (this.path) { layer.push('path', normalize(this.path)); }
    if (this.referrer) { layer.push('referrer', normalize(this.referrer)); }
    if (this.title) { layer.push('page_title', normalize(this.title)); }
    if (this.name) { layer.push('page_name', normalize(this.name)); }
    if (this.id) { layer.push('page_id', normalize(this.id)); }
    if (this.author) { layer.push('page_author', normalize(this.author)); }
    if (this.date) { layer.push('page_date', normalize(this.date)); }

    var components = Object.keys(Inventory).map(function (id) { return document.querySelector(Inventory[id]) !== null ? id : null; }).filter(function (id) { return id !== null; }).join(',');
    if (components) { layer.push('page_components', components); }

    var labels = this._labels.slice(0, 5);
    labels.length = 5;
    if (labels.some(function (label) { return label; })) { layer.push('pagelabel', labels.map(function (label) { return typeof label === 'string' ? normalize(label) : ''; }).join(',')); }

    var tags = this._tags;
    if (tags.some(function (tag) { return tag; })) { layer.push('pagetag', tags.map(function (tag) { return typeof tag === 'string' ? normalize(tag) : ''; }).join(',')); }

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

  Object.defineProperties( Page.prototype, prototypeAccessors$9 );

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

  var prototypeAccessors$8 = { engine: { configurable: true },results: { configurable: true },terms: { configurable: true },category: { configurable: true },theme: { configurable: true },type: { configurable: true },method: { configurable: true },layer: { configurable: true } };

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

  prototypeAccessors$8.engine.set = function (value) {
    var valid = validateString(value, 'search.engine');
    if (valid !== null) { this._engine = valid; }
  };

  prototypeAccessors$8.engine.get = function () {
    return this._engine;
  };

  prototypeAccessors$8.results.set = function (value) {
    var valid = validateNumber(value, 'search.results');
    if (valid !== null) { this._results = valid; }
  };

  prototypeAccessors$8.results.get = function () {
    return this._results;
  };

  prototypeAccessors$8.terms.set = function (value) {
    var valid = validateString(value, 'search.terms');
    if (valid !== null) { this._terms = valid; }
  };

  prototypeAccessors$8.terms.get = function () {
    return this._terms;
  };

  prototypeAccessors$8.category.set = function (value) {
    var valid = validateString(value, 'search.category');
    if (valid !== null) { this._category = valid; }
  };

  prototypeAccessors$8.category.get = function () {
    return this._category;
  };

  prototypeAccessors$8.theme.set = function (value) {
    var valid = validateString(value, 'search.theme');
    if (valid !== null) { this._theme = valid; }
  };

  prototypeAccessors$8.theme.get = function () {
    return this._theme;
  };

  prototypeAccessors$8.type.set = function (value) {
    var valid = validateString(value, 'search.type');
    if (valid !== null) { this._type = valid; }
    this._type = value;
  };

  prototypeAccessors$8.type.get = function () {
    return this._type;
  };

  prototypeAccessors$8.method.set = function (id) {
    var methods = Object.values(Method);
    this._method = methods.filter(function (method) { return method.id === id || method.value === id; })[0] || methods.filter(function (method) { return method.isDefault; })[0];
  };

  prototypeAccessors$8.method.get = function () {
    return this._method;
  };

  prototypeAccessors$8.layer.get = function () {
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

  Object.defineProperties( Search.prototype, prototypeAccessors$8 );

  Search.Method = Method;

  var Funnel = function Funnel (config) {
    this._config = config || {};
  };

  var prototypeAccessors$7 = { id: { configurable: true },type: { configurable: true },name: { configurable: true },step: { configurable: true },current: { configurable: true },total: { configurable: true },objective: { configurable: true },error: { configurable: true },layer: { configurable: true } };

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

  prototypeAccessors$7.id.set = function (value) {
    var valid = validateString(value, 'funnel.id');
    if (valid !== null) { this._id = valid; }
  };

  prototypeAccessors$7.id.get = function () {
    return this._id;
  };

  prototypeAccessors$7.type.set = function (value) {
    var valid = validateString(value, 'funnel.type');
    if (valid !== null) { this._type = valid; }
  };

  prototypeAccessors$7.type.get = function () {
    return this._type;
  };

  prototypeAccessors$7.name.set = function (value) {
    var valid = validateString(value, 'funnel.name');
    if (valid !== null) { this._name = valid; }
  };

  prototypeAccessors$7.name.get = function () {
    return this._name;
  };

  prototypeAccessors$7.step.set = function (value) {
    var valid = validateString(value, 'funnel.step');
    if (valid !== null) { this._step = valid; }
  };

  prototypeAccessors$7.step.get = function () {
    return this._step;
  };

  prototypeAccessors$7.current.set = function (value) {
    var valid = validateNumber(value, 'funnel.current');
    if (valid !== null) { this._current = valid; }
  };

  prototypeAccessors$7.current.get = function () {
    return this._current;
  };

  prototypeAccessors$7.total.set = function (value) {
    var valid = validateNumber(value, 'funnel.total');
    if (valid !== null) { this._total = valid; }
  };

  prototypeAccessors$7.total.get = function () {
    return this._total;
  };

  prototypeAccessors$7.objective.set = function (value) {
    var valid = validateString(value, 'funnel.objective');
    if (valid !== null) { this._objective = valid; }
    this._objective = value;
  };

  prototypeAccessors$7.objective.get = function () {
    return this._objective;
  };

  prototypeAccessors$7.error.set = function (value) {
    var valid = validateString(value, 'funnel.error');
    if (valid !== null) { this._error = valid; }
    this._error = value;
  };

  prototypeAccessors$7.error.get = function () {
    return this._error;
  };

  prototypeAccessors$7.layer.get = function () {
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

  Object.defineProperties( Funnel.prototype, prototypeAccessors$7 );

  var ActionMode = {
    IN: 'in',
    OUT: 'out',
    NONE: 'none'
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
    SINGULAR: {
      id: 'singular',
      value: 2
    },
    ENDED: {
      id: 'ended',
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
    this._regulation = ActionRegulation.NONE;
    this._name = name;
    this._status = ActionStatus.UNSTARTED;
    this._labels = [];
    this._parameters = {};
    this._sentData = [];
  };

  var prototypeAccessors$6 = { isMuted: { configurable: true },regulation: { configurable: true },isSingular: { configurable: true },status: { configurable: true },name: { configurable: true },labels: { configurable: true },reference: { configurable: true },parameters: { configurable: true },mode: { configurable: true },_base: { configurable: true } };

  prototypeAccessors$6.isMuted.get = function () {
    return this._isMuted;
  };

  prototypeAccessors$6.isMuted.set = function (value) {
    this._isMuted = value;
  };

  prototypeAccessors$6.regulation.get = function () {
    return this._regulation;
  };

  prototypeAccessors$6.regulation.set = function (value) {
    if (Object.values(ActionRegulation).includes(value)) { this._regulation = value; }
  };

  prototypeAccessors$6.isSingular.get = function () {
    return this._status === ActionStatus.SINGULAR;
  };

  prototypeAccessors$6.status.get = function () {
    return this._status;
  };

  prototypeAccessors$6.name.get = function () {
    return this._name;
  };

  prototypeAccessors$6.labels.get = function () {
    return this._labels;
  };

  prototypeAccessors$6.reference.get = function () {
    return this._reference;
  };

  prototypeAccessors$6.parameters.get = function () {
    return this._parameters;
  };

  prototypeAccessors$6.mode.get = function () {
    return this._mode;
  };

  Action.prototype.singularize = function singularize () {
    this._status = ActionStatus.SINGULAR;
  };

  Action.prototype.rewind = function rewind () {
    this._sentData = [];
    this._status = ActionStatus.UNSTARTED;
  };

  Action.prototype.addParameter = function addParameter (key, value) {
    this._parameters[key] = value;
  };

  Action.prototype.removeParameter = function removeParameter (key) {
    delete this._parameters[key];
  };

  prototypeAccessors$6.reference.set = function (value) {
    var valid = validateString(value, ("action " + (this._name)));
    if (valid !== null) { this._reference = valid; }
  };

  prototypeAccessors$6._base.get = function () {
    return ['actionname', this._name];
  };

  Action.prototype._getLayer = function _getLayer (data) {
      if ( data === void 0 ) data = {};

    if (this._isMuted) { return []; }

    if (this._mode !== ActionMode.IN) { this._sentData.push(JSON.stringify(data)); }

    var layer = this._base;
    switch (this._mode) {
      case ActionMode.IN:
      case ActionMode.OUT:
        layer.push('actionmode', this._mode);
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
    switch (this._status) {
      case ActionStatus.UNSTARTED:
        this._mode = ActionMode.IN;
        this._status = ActionStatus.STARTED;
        break;

      case ActionStatus.SINGULAR:
        this._mode = ActionMode.NONE;
        this._status = ActionStatus.ENDED;
        break;

      default:
        api.inspector.error(("unexpected start on action " + (this._name) + " with status " + (this._status.id)));
        return [];
    }
    return this._getLayer(data);
  };

  Action.prototype.end = function end (data) {
    switch (this._status) {
      case ActionStatus.STARTED:
        this._mode = ActionMode.OUT;
        this._status = ActionStatus.ENDED;
        break;

      case ActionStatus.UNSTARTED:
        this._mode = ActionMode.NONE;
        this._status = ActionStatus.ENDED;
        break;

      case ActionStatus.SINGULAR:
        this._mode = ActionMode.NONE;
        this._status = ActionStatus.ENDED;
        break;

      case ActionStatus.ENDED:
        if (this._sentData.includes(JSON.stringify(data))) { return []; }
        this._mode = ActionMode.NONE;
        this._status = ActionStatus.ENDED;
        break;

      default:
        return [];
    }
    return this._getLayer(data);
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

  Object.defineProperties( Action.prototype, prototypeAccessors$6 );

  var Actions = function Actions () {
    this._actions = [];
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

  Actions.ActionMode = ActionMode;

  var actions = new Actions();
  Actions.instance = actions;

  var Location = function Location (onRouteChange, isListeningHash) {
    if ( isListeningHash === void 0 ) isListeningHash = false;

    this._onRouteChange = onRouteChange;
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
    this._onRouteChange();
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

  var ActionEnable = {
    ENABLE: {
      entries: ['enable', 'enabled', 'true', 'yes', '1', true],
      value: true,
      output: true
    },
    DISABLE: {
      entries: ['disable', 'disabled', 'false', 'no', '0', false],
      value: false,
      output: false
    },
    REDUCE: {
      entries: ['reduce'],
      value: 'reduce',
      output: false
    }
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

    this.isActionEnabled = config.isActionEnabled;

    this._user = new User(config.user);
    this._site = new Site(config.site);
    this._page = new Page(config.page);
    this._search = new Search(config.search);
    this._funnel = new Funnel(config.funnel);

    this._delay = -1;
    queue.setCollector(this);
  };

  var prototypeAccessors$4 = { page: { configurable: true },user: { configurable: true },site: { configurable: true },search: { configurable: true },funnel: { configurable: true },collection: { configurable: true },isCollecting: { configurable: true },isActionEnabled: { configurable: true },isActionReduced: { configurable: true },layer: { configurable: true } };

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
    var handleRouteChange = this._handleRouteChange.bind(this);
    switch (this._collection) {
      case Collection.LOAD:
        this.collect();
        break;

      case Collection.FULL:
        this.collect();
        this._location = new Location(handleRouteChange);
        break;

      case Collection.HASH:
        this.collect();
        this._location = new Location(handleRouteChange, true);
        break;
    }
  };

  Collector.prototype._handleRouteChange = function _handleRouteChange () {
    queue.send(true);
    this._delay = 6;
    renderer.add(this);
  };

  Collector.prototype.render = function render () {
    this._delay--;
    if (this._delay < 0) {
      renderer.remove(this);
      this._routeChanged();
    }
  };

  Collector.prototype._routeChanged = function _routeChanged () {
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
    if (!this.page.collecting()) { return; }
    queue.collect();
  };

  prototypeAccessors$4.collection.get = function () {
    return this._collection;
  };

  prototypeAccessors$4.isCollecting.get = function () {
    return this._page.isCollecting;
  };

  prototypeAccessors$4.isActionEnabled.get = function () {
    return this._isActionEnabled.value;
  };

  prototypeAccessors$4.isActionEnabled.set = function (value) {
    this._isActionEnabled = Object.values(ActionEnable).find(function (enable) { return enable.entries.includes(value); }) || ActionEnable.DISABLE;
  };

  prototypeAccessors$4.isActionReduced.get = function () {
    return this._isActionEnabled === ActionEnable.REDUCE;
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

  var prototypeAccessors$3 = { isReady: { configurable: true },readiness: { configurable: true },page: { configurable: true },user: { configurable: true },site: { configurable: true },search: { configurable: true },funnel: { configurable: true },cmp: { configurable: true },opt: { configurable: true },collection: { configurable: true },isActionEnabled: { configurable: true },isDebugging: { configurable: true } };

  Analytics.prototype._configure = function _configure () {
    switch (true) {
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

  prototypeAccessors$3.isActionEnabled.get = function () {
    return this._collector.isActionEnabled;
  };

  prototypeAccessors$3.isActionEnabled.set = function (value) {
    this._collector.isActionEnabled = value;
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
    var top = Array.from(this._node.querySelectorAll(selector)).map(function (heading) { return new Heading(heading); }).sort(function (a, b) { return a.level - b.level; })[0];
    if (top && top.level <= this._level) { this._level = top.level - 1; }

    var hx = this._node.closest(selector);
    if (hx) {
      var heading = new Heading(hx);
      if (heading.level <= this._level) { this._level = heading.level - 1; }
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

  var ActionElement = function ActionElement (node, type, id, category, title, parameters, isRating, regulation) {
    if ( category === void 0 ) category = '';
    if ( title === void 0 ) title = null;
    if ( parameters === void 0 ) parameters = {};
    if ( isRating === void 0 ) isRating = false;
    if ( regulation === void 0 ) regulation = ActionRegulation.NONE;

    this._node = node;
    this._type = type;
    this._id = id || this._node.id;
    this._isMuted = false;
    this._title = title;
    this._category = category;
    this._parameters = parameters;
    this._isRating = isRating;
    this._regulation = regulation;
    this._hasBegun = false;

    // this._init();
    requestAnimationFrame(this._init.bind(this));
  };

  var prototypeAccessors = { isMuted: { configurable: true },regulation: { configurable: true },action: { configurable: true } };

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
    this._action.regulation = this._regulation;

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

  prototypeAccessors.regulation.get = function () {
    return this._regulation;
  };

  prototypeAccessors.regulation.set = function (value) {
    this._regulation = value;
    if (this._action) { this._action.regulation = value; }
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
    if (this._type.isBeginning && (this._type.isSingular || this._isRating)) { queue.appendStartingAction(this._action, data); }
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

  var ActionAttributes = {
    RATING: api.internals.ns.attr('analytics-rating'),
    ACTION: api.internals.ns.attr('analytics-action')
  };

  var Actionee = /*@__PURE__*/(function (superclass) {
    function Actionee (priority, category, title, regulation) {
      if ( priority === void 0 ) priority = -1;
      if ( category === void 0 ) category = '';
      if ( title === void 0 ) title = null;
      if ( regulation === void 0 ) regulation = ActionRegulation.NONE;

      superclass.call(this);
      this._type = null;
      this._priority = priority;
      this._category = category;
      this._title = title;
      this._parameters = {};
      this._data = {};
      this._isMuted = false;
      this._regulation = regulation;
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
        },
        get act () {
          return scope.act.bind(scope);
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
        this._sort(element);
        this._isMuted = true;
        return;
      }

      var regulation = this.getRegulation();
      this._regulation = regulation !== ActionRegulation.NONE ? regulation : this._regulation;
      var actionAttribute = this.getAttribute(ActionAttributes.ACTION);
      var title = typeof actionAttribute === 'string' && actionAttribute.toLowerCase() !== 'false' && actionAttribute.toLowerCase() !== 'true' ? normalize(actionAttribute) : this._title;
      this._isRating = this.hasAttribute(ActionAttributes.RATING);

      this._actionElement = new ActionElement(this.node, this._type, this.id, this._category, title, this._parameters, this._isRating, this._regulation);
      if (this._isMuted) { this._actionElement.isMuted = true; }

      this.addDescent(ActioneeEmission.REWIND, this.rewind.bind(this));

      this._sort(element);
    };

    Actionee.prototype.getRegulation = function getRegulation () {
      var actionAttribute = this.getAttribute(ActionAttributes.ACTION);
      switch (true) {
        case typeof actionAttribute === 'string' && actionAttribute.toLowerCase() === 'false':
          return ActionRegulation.PREVENT;
        case actionAttribute !== null:
          return ActionRegulation.ENFORCE;
        default:
          return ActionRegulation.NONE;
      }
    };

    Actionee.prototype.mutate = function mutate (attributeNames) {
      if (attributeNames.includes(ActionAttributes.ACTION)) {
        var regulation = this.getRegulation();
        if (this._regulation !== regulation) {
          this._regulation = regulation;
          if (this._actionElement) { this._actionElement.regulation = regulation; }
        }
      }
      superclass.prototype.mutate.call(this, attributeNames);
    };

    Actionee.prototype._sort = function _sort (element) {
      var actionees = element.instances.filter(function (instance) { return instance.isActionee; }).sort(function (a, b) { return b.priority - a.priority; });
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

    Actionee.prototype.listenActionClick = function listenActionClick (target) {
      if (target) {
        this._clickTarget = target;
        this._clickTarget.addEventListener('click', this._handlingClick, { capture: true });
      } else { this.listenClick({ capture: true }); }
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
        this._clickTarget.removeEventListener('click', this._handlingClick);
      }
      superclass.prototype.dispose.call(this);
    };

    Object.defineProperties( Actionee.prototype, prototypeAccessors );
    Object.defineProperties( Actionee, staticAccessors );

    return Actionee;
  }(api.core.Instance));

  var AttributeActionee = /*@__PURE__*/(function (Actionee) {
    function AttributeActionee () {
      Actionee.call(this, 100, '', null, ActionRegulation.ENFORCE);
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
    function ComponentActionee (priority) {
      if ( priority === void 0 ) priority = -1;

      Actionee.call(this, priority, 'dsfr_component');
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
      this._handlingInputValidation = this._handleInputValidation.bind(this);
      if (this._validatedInput) { this._validatedInput.addEventListener('keydown', this._handlingInputValidation); }
    };

    ComponentActionee.prototype._handleInputValidation = function _handleInputValidation (e) {
      if (e.keyCode === 13) { this._actValidatedInput(); }
    };

    ComponentActionee.prototype._actValidatedInput = function _actValidatedInput () {
      if (this._isActingValidatedInput) { return; }
      this._isActingValidatedInput = true;
      if (this._isSendingInputValue) { this.value = this._validatedInput.value.trim(); }
      this.act();
      this.request(this._actedValidatedInput.bind(this));
    };

    ComponentActionee.prototype._actedValidatedInput = function _actedValidatedInput () {
      this._isActingValidatedInput = false;
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
        this._validatedInput.removeEventListener('keydown', this._handlingInputValidation);
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

  var ID$y = 'accordion';

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
      this.isMuted = true;
    };

    prototypeAccessors.button.get = function () {
      return this.element.getInstance('CollapseButton');
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'bouton d\'accordéon';
    };

    prototypeAccessors.component.get = function () {
      return ID$y;
    };

    Object.defineProperties( AccordionButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( AccordionButtonActionee, staticAccessors );

    return AccordionButtonActionee;
  }(ComponentActionee));

  var AccordionActionee = /*@__PURE__*/(function (ComponentActionee) {
    function AccordionActionee () {
      ComponentActionee.call(this, 2);
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
      return ID$y;
    };

    AccordionActionee.prototype.dispose = function dispose () {
      ComponentActionee.prototype.dispose.call(this);
    };

    Object.defineProperties( AccordionActionee.prototype, prototypeAccessors );
    Object.defineProperties( AccordionActionee, staticAccessors );

    return AccordionActionee;
  }(ComponentActionee));

  var joinSelector = function (selectors, join) { return selectors.split(',').map(function (selector) { return ("" + selector + join); }).join(','); };

  var integrateAccordion = function (selector) {
    if ( selector === void 0 ) selector = '';

    if (api.accordion) {
      api.internals.register(joinSelector(api.accordion.AccordionSelector.COLLAPSE, selector), AccordionActionee);
    }
  };

  var AlertSelector = {
    ALERT: api.internals.ns.selector('alert'),
    TITLE: api.internals.ns.selector('alert__title')
  };

  var ID$x = 'alert';

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

    prototypeAccessors.label.get = function () {
      var alertTitle = this.node.querySelector(AlertSelector.TITLE);
      if (alertTitle) {
        var text = this.getFirstText(alertTitle);
        if (text) { return text; }
      }
      return 'alerte';
    };

    prototypeAccessors.component.get = function () {
      return ID$x;
    };

    Object.defineProperties( AlertActionee.prototype, prototypeAccessors );
    Object.defineProperties( AlertActionee, staticAccessors );

    return AlertActionee;
  }(ComponentActionee));

  var integrateAlert = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(AlertSelector.ALERT, selector), AlertActionee);
  };

  var BreadcrumbSelector = {
    LINK: ((api.internals.ns.selector('breadcrumb__link')) + ":not([aria-current])"),
    COLLAPSE: ((api.internals.ns.selector('breadcrumb')) + " " + (api.internals.ns.selector('collapse')))
  };

  var ID$w = 'breadcrumb';

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

    prototypeAccessors.label.get = function () {
      return 'fil d\'ariane';
    };

    prototypeAccessors.component.get = function () {
      return ID$w;
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
      this.listenActionClick();
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

  var integrateBreadcrumb = function (selector) {
    if ( selector === void 0 ) selector = '';

    if (api.breadcrumb) {
      api.internals.register(joinSelector(BreadcrumbSelector.COLLAPSE, selector), BreadcrumbActionee);
      api.internals.register(joinSelector(BreadcrumbSelector.LINK, selector), BreadcrumbLinkActionee);
    }
  };

  var ButtonSelector = {
    BUTTON: ((api.internals.ns.selector('btn')) + ":not(" + (api.internals.ns.selector('btn--close')) + ")")
  };

  var ID$v = 'button';

  var ButtonActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ButtonActionee () {
      ComponentActionee.call(this, 1);
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
      this.listenActionClick();
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
      return ID$v;
    };

    Object.defineProperties( ButtonActionee.prototype, prototypeAccessors );
    Object.defineProperties( ButtonActionee, staticAccessors );

    return ButtonActionee;
  }(ComponentActionee));

  var integrateButton = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(ButtonSelector.BUTTON, selector), ButtonActionee);
  };

  var CalloutSelector = {
    CALLOUT: api.internals.ns.selector('callout'),
    TITLE: api.internals.ns.selector('callout__title')
  };

  var ID$u = 'callout';

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

    prototypeAccessors.label.get = function () {
      var calloutTitle = this.node.querySelector(CalloutSelector.TITLE);
      if (calloutTitle) {
        var text = this.getFirstText(calloutTitle);
        if (text) { return text; }
      }

      return 'mise en avant';
    };

    prototypeAccessors.component.get = function () {
      return ID$u;
    };

    Object.defineProperties( CalloutActionee.prototype, prototypeAccessors );
    Object.defineProperties( CalloutActionee, staticAccessors );

    return CalloutActionee;
  }(ComponentActionee));

  var integrateCallout = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(CalloutSelector.CALLOUT, selector), CalloutActionee);
  };

  var CardSelector = {
    CARD: api.internals.ns.selector('card'),
    LINK: ((api.internals.ns.selector('card__title')) + " a, " + (api.internals.ns.selector('card__title')) + " button"),
    TITLE: api.internals.ns.selector('card__title')
  };

  var ID$t = 'card';

  var CardActionee = /*@__PURE__*/(function (ComponentActionee) {
    function CardActionee () {
      ComponentActionee.call(this, 1);
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
        this.listenActionClick(link);
      }
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
      return ID$t;
    };

    Object.defineProperties( CardActionee.prototype, prototypeAccessors );
    Object.defineProperties( CardActionee, staticAccessors );

    return CardActionee;
  }(ComponentActionee));

  var integrateCard = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(CardSelector.CARD, selector), CardActionee);
  };

  var CheckboxSelector = {
    INPUT: api.internals.ns.selector('checkbox-group [type="checkbox"]')
  };

  var ID$s = 'checkbox';

  var CheckboxActionee = /*@__PURE__*/(function (ComponentActionee) {
    function CheckboxActionee () {
      ComponentActionee.call(this, 1);
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
      return ID$s;
    };

    Object.defineProperties( CheckboxActionee.prototype, prototypeAccessors );
    Object.defineProperties( CheckboxActionee, staticAccessors );

    return CheckboxActionee;
  }(ComponentActionee));

  var integrateCheckbox = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(CheckboxSelector.INPUT, selector), CheckboxActionee);
  };

  var ConnectSelector = {
    CONNECT: api.internals.ns.selector('connect'),
    LINK: api.internals.ns.selector('connect + * a, connect + a')
  };

  var ID$r = 'connect';

  var ConnectActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ConnectActionee () {
      ComponentActionee.call(this, 1);
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
      this.listenActionClick();
    };

    prototypeAccessors.label.get = function () {
      if (this.node.classList.contains('fr-connect--plus')) { return 'FranceConnect+'; }
      return 'FranceConnect';
    };

    prototypeAccessors.component.get = function () {
      return ID$r;
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
      this.listenActionClick();
    };

    prototypeAccessors.label.get = function () {
      return this.getFirstText() || 'qu\'est-ce que FranceConnect ?';
    };

    prototypeAccessors.component.get = function () {
      return ID$r;
    };

    Object.defineProperties( ConnectLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( ConnectLinkActionee, staticAccessors );

    return ConnectLinkActionee;
  }(ComponentActionee));

  var integrateConnect = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(ConnectSelector.CONNECT, selector), ConnectActionee);
    api.internals.register(joinSelector(ConnectSelector.LINK, selector), ConnectLinkActionee);
  };

  var ConsentSelector = {
    BANNER: api.internals.ns.selector('consent-banner')
  };

  var ID$q = 'consent';

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
      return ID$q;
    };

    Object.defineProperties( ConsentActionee.prototype, prototypeAccessors );
    Object.defineProperties( ConsentActionee, staticAccessors );

    return ConsentActionee;
  }(ComponentActionee));

  var integrateConsent = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(ConsentSelector.BANNER, selector), ConsentActionee);
  };

  var DownloadSelector = {
    LINK: api.internals.ns.selector('download__link')
  };

  var ID$p = 'download';

  var DownloadActionee = /*@__PURE__*/(function (ComponentActionee) {
    function DownloadActionee () {
      ComponentActionee.call(this, 1);
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
      this.listenActionClick();
    };

    prototypeAccessors.label.get = function () {
      var text = this.getFirstText();
      if (text) { return text; }
      return 'téléchargement';
    };

    prototypeAccessors.component.get = function () {
      return ID$p;
    };

    Object.defineProperties( DownloadActionee.prototype, prototypeAccessors );
    Object.defineProperties( DownloadActionee, staticAccessors );

    return DownloadActionee;
  }(ComponentActionee));

  var integrateDownload = function (selector) {
    api.internals.register(joinSelector(DownloadSelector.LINK, selector), DownloadActionee);
  };

  var FollowSelector = {
    FOLLOW: api.internals.ns.selector('follow'),
    NEWSLETTER_INPUT_GROUP: api.internals.ns.selector('follow__newsletter') + ' ' + api.internals.ns.selector('input-group')
  };

  var ID$o = 'follow';

  var FollowActionee = /*@__PURE__*/(function (ComponentActionee) {
    function FollowActionee () {
      ComponentActionee.call(this, 2);
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

  var integrateFollow = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(FollowSelector.FOLLOW, selector), FollowActionee);
  };

  var FooterSelector = {
    FOOTER: api.internals.ns.selector('footer'),
    FOOTER_LINKS: ((api.internals.ns.selector('footer')) + " a[href], " + (api.internals.ns.selector('footer')) + " button")
  };

  var ID$n = 'footer';

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

    prototypeAccessors.label.get = function () {
      return 'pied de page';
    };

    prototypeAccessors.component.get = function () {
      return ID$n;
    };

    Object.defineProperties( FooterActionee.prototype, prototypeAccessors );
    Object.defineProperties( FooterActionee, staticAccessors );

    return FooterActionee;
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
      this.listenActionClick();
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

  var integrateFooter = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(FooterSelector.FOOTER, selector), FooterActionee);
    api.internals.register(joinSelector(FooterSelector.FOOTER_LINKS, selector), FooterLinkActionee);
  };

  var ID$m = 'header';

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

    prototypeAccessors.label.get = function () {
      return 'en-tête';
    };

    prototypeAccessors.component.get = function () {
      return ID$m;
    };

    Object.defineProperties( HeaderActionee.prototype, prototypeAccessors );
    Object.defineProperties( HeaderActionee, staticAccessors );

    return HeaderActionee;
  }(ComponentActionee));

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
      ComponentActionee.call(this, 0);
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

  var HeaderSelector = {
    TOOLS_BUTTON: ((api.internals.ns.selector('header__tools-links')) + " " + (api.internals.ns.selector('btns-group')) + " " + (api.internals.ns.selector('btn'))),
    MENU_BUTTON: ((api.internals.ns.selector('header__menu-links')) + " " + (api.internals.ns.selector('btns-group')) + " " + (api.internals.ns.selector('btn')))
  };

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

  var integrateHeader = function (selector) {
    if ( selector === void 0 ) selector = '';

    if (api.header) {
      api.internals.register(joinSelector(api.header.HeaderSelector.HEADER, selector), HeaderActionee);
      api.internals.register(joinSelector(api.header.HeaderSelector.MODALS, selector), HeaderModalActionee);
      api.internals.register(joinSelector(HeaderSelector.TOOLS_BUTTON, selector), HeaderToolsButtonActionee);
      api.internals.register(joinSelector(HeaderSelector.MENU_BUTTON, selector), HeaderMenuButtonActionee);
    }
  };

  var HighlightSelector = {
    HIGHLIGHT: api.internals.ns.selector('highlight')
  };

  var ID$l = 'highlight';

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

    prototypeAccessors.label.get = function () {
      return 'mise en exergue';
    };

    prototypeAccessors.component.get = function () {
      return ID$l;
    };

    Object.defineProperties( HighlightActionee.prototype, prototypeAccessors );
    Object.defineProperties( HighlightActionee, staticAccessors );

    return HighlightActionee;
  }(ComponentActionee));

  var integrateHighlight = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(HighlightSelector.HIGHLIGHT, selector), HighlightActionee);
  };

  var LinkSelector = {
    LINK: api.internals.ns.selector('link')
  };

  var ID$k = 'link';

  var LinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function LinkActionee () {
      ComponentActionee.call(this, 1);
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
      this.listenActionClick();
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

  var integrateLink = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(LinkSelector.LINK, selector), LinkActionee);
  };

  var InputSelector = {
    INPUT: api.internals.ns.selector('input-group')
  };

  var ID$j = 'input';

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
      return ID$j;
    };

    Object.defineProperties( InputActionee.prototype, prototypeAccessors );
    Object.defineProperties( InputActionee, staticAccessors );

    return InputActionee;
  }(ComponentActionee));

  var integrateInput = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(InputSelector.INPUT, selector), InputActionee);
  };

  var ModalSelector = {
    TITLE: api.internals.ns.selector('modal__title')
  };

  var ID$i = 'modal';

  var ModalActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ModalActionee () {
      ComponentActionee.call(this, 2);
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
      return ID$i;
    };

    Object.defineProperties( ModalActionee.prototype, prototypeAccessors );
    Object.defineProperties( ModalActionee, staticAccessors );

    return ModalActionee;
  }(ComponentActionee));

  var integrateModal = function (selector) {
    if ( selector === void 0 ) selector = '';

    if (api.modal) {
      api.internals.register(joinSelector(api.modal.ModalSelector.MODAL, selector), ModalActionee);
    }
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

  var NavigationSelector = {
    LINK: api.internals.ns.selector('nav__link'),
    BUTTON: api.internals.ns.selector('nav__btn')
  };

  var ID$h = 'navigation';

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
      this.listenActionClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'lien de navigation';
    };

    prototypeAccessors.component.get = function () {
      return ID$h;
    };

    Object.defineProperties( NavigationLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( NavigationLinkActionee, staticAccessors );

    return NavigationLinkActionee;
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

  var integrateNavigation = function (selector) {
    if ( selector === void 0 ) selector = '';

    if (api.navigation) {
      api.internals.register(joinSelector(api.navigation.NavigationSelector.NAVIGATION, selector), NavigationActionee);
      api.internals.register(joinSelector(NavigationSelector.LINK, selector), NavigationLinkActionee);
      api.internals.register(joinSelector(api.navigation.NavigationSelector.COLLAPSE, selector), NavigationSectionActionee);
    }
  };

  var NoticeSelector = {
    NOTICE: api.internals.ns.selector('notice'),
    TITLE: api.internals.ns.selector('notice__title'),
    LINK: api.internals.ns.selector('notice a')
  };

  var ID$g = 'notice';

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

    prototypeAccessors.label.get = function () {
      var noticeTitle = this.node.querySelector(NoticeSelector.TITLE);
      if (noticeTitle) {
        var firstText = this.getFirstText(noticeTitle);
        if (firstText) { return firstText; }
      }

      return 'bandeau d\'information importante';
    };

    prototypeAccessors.component.get = function () {
      return ID$g;
    };

    Object.defineProperties( NoticeActionee.prototype, prototypeAccessors );
    Object.defineProperties( NoticeActionee, staticAccessors );

    return NoticeActionee;
  }(ComponentActionee));

  var NoticeLinkActionee = /*@__PURE__*/(function (ComponentActionee) {
    function NoticeLinkActionee () {
      ComponentActionee.call(this, 2);
    }

    if ( ComponentActionee ) NoticeLinkActionee.__proto__ = ComponentActionee;
    NoticeLinkActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    NoticeLinkActionee.prototype.constructor = NoticeLinkActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NoticeLinkActionee';
    };

    NoticeLinkActionee.prototype.init = function init () {
      this.detectInteractionType();
      this.listenActionClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'lien de bandeau d\'information importante';
    };

    prototypeAccessors.component.get = function () {
      return ID$g;
    };

    Object.defineProperties( NoticeLinkActionee.prototype, prototypeAccessors );
    Object.defineProperties( NoticeLinkActionee, staticAccessors );

    return NoticeLinkActionee;
  }(ComponentActionee));

  var integrateNotice = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(NoticeSelector.NOTICE, selector), NoticeActionee);
    api.internals.register(joinSelector(NoticeSelector.LINK, selector), NoticeLinkActionee);
  };

  var PaginationSelector = {
    PAGINATION: api.internals.ns.selector('pagination'),
    LINK: api.internals.ns.selector('pagination__link'),
    NEXT_LINK: api.internals.ns.selector('pagination__link--next'),
    LAST_LINK: api.internals.ns.selector('pagination__link--last'),
    ANALYTICS_TOTAL: api.internals.ns.attr('analytics-page-total'),
    CURRENT: '[aria-current="page"]'
  };

  var ID$f = 'pagination';

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
      return ID$f;
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
      this.listenActionClick();
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

  var integratePagination = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(PaginationSelector.PAGINATION, selector), PaginationActionee);
    api.internals.register(joinSelector(PaginationSelector.LINK, selector), PaginationLinkActionee);
  };

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

  var integrateQuote = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(QuoteSelector.QUOTE, selector), QuoteActionee);
  };

  var RadioSelector = {
    INPUT: api.internals.ns.selector('radio-group [type="radio"]')
  };

  var FormSelector = {
    LABEL: api.internals.ns.selector('label'),
    FIELDSET: api.internals.ns.selector('fieldset'),
    LEGEND: api.internals.ns.selector('fieldset__legend')
  };

  var ID$d = 'radio';

  var RadioActionee = /*@__PURE__*/(function (ComponentActionee) {
    function RadioActionee () {
      ComponentActionee.call(this, 1);
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
      return ID$d;
    };

    Object.defineProperties( RadioActionee.prototype, prototypeAccessors );
    Object.defineProperties( RadioActionee, staticAccessors );

    return RadioActionee;
  }(ComponentActionee));

  var integrateRadio = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(RadioSelector.INPUT, selector), RadioActionee);
  };

  var SearchSelector = {
    SEARCH_BAR: api.internals.ns.selector('search-bar')
  };

  var ID$c = 'search';

  var SearchActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SearchActionee () {
      ComponentActionee.call(this, 2);
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
      return ID$c;
    };

    Object.defineProperties( SearchActionee.prototype, prototypeAccessors );
    Object.defineProperties( SearchActionee, staticAccessors );

    return SearchActionee;
  }(ComponentActionee));

  var integrateSearch = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(SearchSelector.SEARCH_BAR, selector), SearchActionee);
  };

  var SelectSelector = {
    SELECT: api.internals.ns.selector('select')
  };

  var ID$b = 'select';

  var SelectActionee = /*@__PURE__*/(function (ComponentActionee) {
    function SelectActionee () {
      ComponentActionee.call(this, 1);
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
      return ID$b;
    };

    Object.defineProperties( SelectActionee.prototype, prototypeAccessors );
    Object.defineProperties( SelectActionee, staticAccessors );

    return SelectActionee;
  }(ComponentActionee));

  var integrateSelect = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(SelectSelector.SELECT, selector), SelectActionee);
  };

  var ShareSelector = {
    SHARE: api.internals.ns.selector('share'),
    TITLE: api.internals.ns.selector('share__title')
  };

  var ID$a = 'share';

  var ShareActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ShareActionee () {
      ComponentActionee.call(this, 1);
    }

    if ( ComponentActionee ) ShareActionee.__proto__ = ComponentActionee;
    ShareActionee.prototype = Object.create( ComponentActionee && ComponentActionee.prototype );
    ShareActionee.prototype.constructor = ShareActionee;

    var prototypeAccessors = { label: { configurable: true },component: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ShareActionee';
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

  var integrateShare = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(ShareSelector.SHARE, selector), ShareActionee);
  };

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

  var ID$9 = 'sidemenu';

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
      this.listenActionClick();
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'lien menu latéral';
    };

    prototypeAccessors.component.get = function () {
      return ID$9;
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

  var integrateSidemenu = function (selector) {
    if (api.sidemenu) {
      api.internals.register(joinSelector(SidemenuSelector.SIDEMENU, selector), SidemenuActionee);
      api.internals.register(joinSelector(SidemenuSelector.LINK, selector), SidemenuLinkActionee);
      api.internals.register(joinSelector(api.sidemenu.SidemenuSelector.COLLAPSE, selector), SidemenuSectionActionee);
    }
  };

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
      this.listenActionClick();
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

  var integrateSummary = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(SummarySelector.SUMMARY, selector), SummaryActionee);
    api.internals.register(joinSelector(SummarySelector.LINK, selector), SummaryLinkActionee);
    api.internals.register(joinSelector(SummarySelector.ITEM, selector), SummarySectionActionee);
  };

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
      this.isMuted = true;
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
      ComponentActionee.call(this, 2);
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

  var integrateTab = function (selector) {
    if ( selector === void 0 ) selector = '';

    if (api.tab) {
      api.internals.register(joinSelector(api.tab.TabSelector.PANEL, selector), TabActionee);
    }
  };

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

  var integrateTable = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(TableSelector.TABLE, selector), TableActionee);
  };

  var TagSelector = {
    TAG: api.internals.ns.selector('tag'),
    PRESSABLE: '[aria-pressed]',
    DISMISSIBLE: ("" + (api.internals.ns.selector('tag--dismiss', '')))
  };

  var ID$5 = 'tag';

  var TagActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TagActionee () {
      ComponentActionee.call(this, 2);
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
          this.listenActionClick();
          break;

        case this.isInteractive:
          this.detectInteractionType();
          this.listenActionClick();
          break;
      }
    };

    prototypeAccessors.label.get = function () {
      var firstText = this.getFirstText();
      if (firstText) { return firstText; }

      return 'tag';
    };

    prototypeAccessors.component.get = function () {
      return ID$5;
    };

    Object.defineProperties( TagActionee.prototype, prototypeAccessors );
    Object.defineProperties( TagActionee, staticAccessors );

    return TagActionee;
  }(ComponentActionee));

  var integrateTag = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(TagSelector.TAG, selector), TagActionee);
  };

  var TileSelector = {
    TILE: api.internals.ns.selector('tile'),
    LINK: ((api.internals.ns.selector('tile__title')) + " a, " + (api.internals.ns.selector('tile__title')) + " button"),
    TITLE: api.internals.ns.selector('tile__title')
  };

  var ID$4 = 'tile';

  var TileActionee = /*@__PURE__*/(function (ComponentActionee) {
    function TileActionee () {
      ComponentActionee.call(this, 1);
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
        this.listenActionClick(link);
      }
    };

    prototypeAccessors.label.get = function () {
      var tileTitle = this.node.querySelector(TileSelector.TITLE);
      if (tileTitle) { return this.getFirstText(tileTitle); }

      var heading = this.getHeadingLabel();
      if (heading) { return heading; }

      return 'tuile';
    };

    prototypeAccessors.component.get = function () {
      return ID$4;
    };

    Object.defineProperties( TileActionee.prototype, prototypeAccessors );
    Object.defineProperties( TileActionee, staticAccessors );

    return TileActionee;
  }(ComponentActionee));

  var integrateTile = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(TileSelector.TILE, selector), TileActionee);
  };

  var ToggleSelector = {
    INPUT: api.internals.ns.selector('toggle [type="checkbox"]')
  };

  var ID$3 = 'toggle';

  var ToggleActionee = /*@__PURE__*/(function (ComponentActionee) {
    function ToggleActionee () {
      ComponentActionee.call(this, 1);
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
      return ID$3;
    };

    Object.defineProperties( ToggleActionee.prototype, prototypeAccessors );
    Object.defineProperties( ToggleActionee, staticAccessors );

    return ToggleActionee;
  }(ComponentActionee));

  var integrateToggle = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(ToggleSelector.INPUT, selector), ToggleActionee);
  };

  var TRANSCRIPTION = api.internals.ns.selector('transcription');
  var COLLAPSE$1 = api.internals.ns.selector('collapse');

  var TranscriptionSelector = {
    TRANSCRIPTION: TRANSCRIPTION,
    COLLAPSE: (TRANSCRIPTION + " > " + COLLAPSE$1 + ", " + TRANSCRIPTION + " > *:not(" + TRANSCRIPTION + "):not(" + COLLAPSE$1 + ") > " + COLLAPSE$1 + ", " + TRANSCRIPTION + " > *:not(" + TRANSCRIPTION + "):not(" + COLLAPSE$1 + ") > *:not(" + TRANSCRIPTION + "):not(" + COLLAPSE$1 + ") > " + COLLAPSE$1),
    COLLAPSE_LEGACY: (TRANSCRIPTION + " " + COLLAPSE$1),
    TITLE: (TRANSCRIPTION + "__title")
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
      this.isMuted = true;
    };

    prototypeAccessors.button.get = function () {
      return this.element.getInstance('CollapseButton');
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
      ComponentActionee.call(this, 2);
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

  var integrateTranscription = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(TranscriptionSelector.COLLAPSE, selector), TranscriptionActionee);
  };

  var TRANSLATE = api.internals.ns.selector('translate');
  var COLLAPSE = api.internals.ns.selector('collapse');

  var TranslateSelector = {
    BUTTON: (TRANSLATE + "__btn"),
    COLLAPSE: (TRANSLATE + " > " + COLLAPSE + ", " + TRANSLATE + " > *:not(" + TRANSLATE + "):not(" + COLLAPSE + ") > " + COLLAPSE + ", " + TRANSLATE + " > *:not(" + TRANSLATE + "):not(" + COLLAPSE + ") > *:not(" + TRANSLATE + "):not(" + COLLAPSE + ") > " + COLLAPSE),
    COLLAPSE_LEGACY: (TRANSLATE + " " + COLLAPSE)
  };

  var ID$1 = 'translate';

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
      this.isMuted = true;
    };

    prototypeAccessors.button.get = function () {
      return this.element.getInstance('CollapseButton');
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

  var integrateTranslate = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(TranslateSelector.COLLAPSE, selector), TranslateActionee);
    api.internals.register(joinSelector(TranslateSelector.BUTTON, selector), TranslateButtonActionee);
  };

  var UploadSelector = {
    UPLOAD: api.internals.ns.selector('upload')
  };

  var ID = 'upload';

  var UploadActionee = /*@__PURE__*/(function (ComponentActionee) {
    function UploadActionee () {
      ComponentActionee.call(this, 1);
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

  var integrateUpload = function (selector) {
    if ( selector === void 0 ) selector = '';

    api.internals.register(joinSelector(UploadSelector.UPLOAD, selector), UploadActionee);
  };

  var integrateComponents = function (selector) {
    if ( selector === void 0 ) selector = '';

    integrateAccordion(selector);
    integrateBreadcrumb(selector);
    integrateAlert(selector);
    // integrateBadge(selector);
    integrateButton(selector);
    integrateCallout(selector);
    integrateConnect(selector);
    integrateConsent(selector);
    // integrateContent(selector);
    integrateCard(selector);
    integrateInput(selector);
    integrateCheckbox(selector);
    integrateDownload(selector);
    integrateFooter(selector);
    integrateFollow(selector);
    integrateHeader(selector);
    integrateHighlight(selector);
    integrateLink(selector);
    integrateModal(selector);
    integrateNavigation(selector);
    integrateNotice(selector);
    integratePagination(selector);
    integrateQuote(selector);
    integrateRadio(selector);
    integrateSearch(selector);
    integrateSelect(selector);
    integrateShare(selector);
    integrateSidemenu(selector);
    // integrateStepper(selector);
    integrateSummary(selector);
    integrateTab(selector);
    integrateTable(selector);
    integrateTag(selector);
    integrateTile(selector);
    integrateToggle(selector);
    // integrateTooltip(selector);
    integrateTranscription(selector);
    integrateTranslate(selector);
    integrateUpload(selector);
  };

  // import './core/core';

  var integration = function (selector) {
    integrateAttributes();
    integrateComponents(selector);
  };

  api.analytics.readiness.then(function () {
    var selector = api.analytics._collector.isActionReduced ? api.internals.ns.attr.selector('analytics-action') : '';
    integration(selector);
  }, function () {});

})();
//# sourceMappingURL=analytics.nomodule.js.map

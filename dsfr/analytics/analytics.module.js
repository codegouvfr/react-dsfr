/*! DSFR v1.14.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.14.2'
};

const api = window[config.namespace];

const Collection = {
  MANUAL: 'manual',
  LOAD: 'load',
  FULL: 'full',
  HASH: 'hash'
};

const key = '_EA_';
const DISABLED = `${key}disabled`;
const TOGGLE = `${key}toggle`;

class Opt {
  constructor () {
    this._configure();
  }

  _configure () {
    const scope = this;
    window[DISABLED] = () => scope.isDisabled;
    window[TOGGLE] = this.toggle.bind(this);
  }

  get isDisabled () {
    return localStorage.getItem(key);
  }

  toggle () {
    if (this.isDisabled) this.enable();
    else this.disable();
  }

  enable () {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }

  disable () {
    localStorage.setItem(key, '1');
  }
}

const opt = new Opt();

const PUSH = 'EA_push';

class Init {
  constructor (domain) {
    this._domain = domain;
    this._isLoaded = false;
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  get id () {
    return this._id;
  }

  get store () {
    return this._store;
  }

  configure () {
    this.init();
    return this._promise;
  }

  init () {
    let bit = 5381;
    for (let i = this._domain.length - 1; i > 0; i--) bit = (bit * 33) ^ this._domain.charCodeAt(i);
    bit >>>= 0;
    this._id = `_EA_${bit}`;

    this._store = [];
    this._store.eah = this._domain;
    window[this._id] = this._store;

    if (!window[PUSH]) window[PUSH] = (...args) => this.store.push(args);

    if (opt.isDisabled) {
      api.inspector.warn('User opted out, eulerian is disabled');
      this._reject('User opted out, eulerian is disabled');
    } else this.load();
  }

  load () {
    const stamp = new Date() / 1E7 | 0;
    const offset = stamp % 26;
    const key = String.fromCharCode(97 + offset, 122 - offset, 65 + offset) + (stamp % 1E3);
    this._script = document.createElement('script');
    this._script.ea = this.id;
    this._script.async = true;
    this._script.addEventListener('load', this.loaded.bind(this));
    this._script.addEventListener('error', this.error.bind(this));
    this._script.src = `//${this._domain}/${key}.js?2`;
    const node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(this._script, node);
  }

  error () {
    api.inspector.error('unable to load Eulerian script file. the domain declared in your configuration must match the domain provided by the Eulerian interface (tag creation)');
    this._reject('eulerian script loading error');
  }

  loaded () {
    if (this._isLoaded) return;
    this._isLoaded = true;
    this._resolve();
  }
}

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

const State = {
  UNKNOWN: -1,
  CONFIGURING: 0,
  CONFIGURED: 1,
  INITIATED: 2,
  READY: 3
};

class TarteAuCitronIntegration {
  constructor (config) {
    this._config = config;
    this._state = State.UNKNOWN;
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  configure () {
    if (this._state >= State.CONFIGURED) return this._promise;
    if (this._state === State.UNKNOWN) {
      api.inspector.info('analytics configures tarteaucitron');
      this._state = State.CONFIGURING;
    }

    const tarteaucitron = window.tarteaucitron;
    if (!tarteaucitron || !tarteaucitron.services) {
      window.requestAnimationFrame(this.configure.bind(this));
      return;
    }

    this._state = State.CONFIGURED;
    const init = this.init.bind(this);

    const data = {
      key: 'eulerian',
      type: 'analytic',
      name: 'Eulerian Analytics',
      needConsent: true,
      cookies: ['etuix'],
      uri: 'https://eulerian.com/vie-privee',
      js: init,
      fallback: () => { tarteaucitron.services.eulerian.js(); }
    };

    tarteaucitron.services.eulerian = data;
    if (!tarteaucitron.job) tarteaucitron.job = [];
    tarteaucitron.job.push('eulerian');

    return this._promise;
  }

  init () {
    if (this._state >= State.INITIATED) return;
    this._state = State.INITIATED;
    window.__eaGenericCmpApi = this.integrate.bind(this);
    const update = this.update.bind(this);
    window.addEventListener('tac.close_alert', update);
    window.addEventListener('tac.close_panel', update);
  }

  integrate (cmpApi) {
    if (this._state >= State.READY) return;
    this._state = State.READY;
    this._cmpApi = cmpApi;

    api.inspector.info('analytics has integrated tarteaucitron');

    this._resolve();
    this.update();
  }

  update () {
    if (this._state < State.READY) return;
    this._cmpApi('tac', window.tarteaucitron, 1);
  }
}

class ConsentManagerPlatform {
  constructor (config) {
    this._config = config;

    if (config) {
      switch (config.id) {
        case 'tarteaucitron':
          this.integrateTarteAuCitron();
          break;
      }
    }
  }

  integrateTarteAuCitron () {
    this._tac = new TarteAuCitronIntegration(this._config);
    return this._tac.configure();
  }

  optin () {

  }
}

const push = (type, layer) => {
  if (typeof window.EA_push !== 'function') {
    api.inspector.warn('Analytics datalayer not sent, Eulerian API isn\'t yet avalaible');
    return;
  }

  api.inspector.info('analytics', type, layer);

  window.EA_push(type, layer);
};

const PushType = {
  COLLECTOR: 'collector',
  ACTION: 'action',
  ACTION_PARAMETER: 'actionparam'
};

class Renderer {
  constructor () {
    this._renderables = [];
    this._rendering = this.render.bind(this);
    requestAnimationFrame(this._rendering);
  }

  add (renderable) {
    const index = this._renderables.indexOf(renderable);
    if (index === -1) this._renderables.push(renderable);
  }

  remove (renderable) {
    const index = this._renderables.indexOf(renderable);
    if (index > -1) this._renderables.splice(index, 1);
  }

  render () {
    this._renderables.forEach(renderable => renderable.render());
    requestAnimationFrame(this._rendering);
  }
}

const renderer = new Renderer();

const ActionRegulation = {
  ENFORCE: 'enforce',
  PREVENT: 'prevent',
  NONE: 'none'
};

const SLICE = 80;

class Queue {
  constructor () {
    this._startingActions = [];
    this._endingActions = [];
    this._handlingVisibilityChange = this._handleVisibilityChange.bind(this);
    this._handlingEnd = this._handleEnd.bind(this);
    this._isStarted = false;
    this._isListening = false;
    this.reset();
  }

  setCollector (collector) {
    this._collector = collector;
  }

  reset (ending = false) {
    this._type = PushType.ACTION;
    if (!ending) this._startingActions.length = 0;
    this._endingActions.length = 0;
    this._count = 0;
    this._delay = -1;
    this._isRequested = false;
    this._unlisten();
  }

  start () {
    if (this._isStarted) return;
    this._isStarted = true;
    renderer.add(this);
  }

  collect () {
    this._type = PushType.COLLECTOR;
    this._request();
  }

  regulate (action, queue) {
    if (!action) return false;
    if (queue.some(queued => queued.test(action))) {
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
  }

  appendStartingAction (action, data) {
    if (!this.regulate(action, this._startingActions)) return;
    const queued = new QueuedAction(action, data);
    this._startingActions.push(queued);
    this._request();
  }

  appendEndingAction (action, data) {
    if (!this.regulate(action, this._endingActions)) return;
    const queued = new QueuedAction(action, data);
    this._endingActions.push(queued);
    this._request();
  }

  _request () {
    this._listen();
    this._isRequested = true;
    this._delay = 4;
  }

  _listen () {
    if (this._isListening) return;
    this._isListening = true;
    document.addEventListener('visibilitychange', this._handlingVisibilityChange);
    document.addEventListener('unload', this._handlingEnd);
    document.addEventListener('beforeunload', this._handlingEnd);
    document.addEventListener('pagehide', this._handlingEnd);
  }

  _unlisten () {
    if (!this._isListening) return;
    this._isListening = false;
    document.removeEventListener('visibilitychange', this._handlingVisibilityChange);
    document.removeEventListener('unload', this._handlingEnd);
    document.removeEventListener('beforeunload', this._handlingEnd);
    document.removeEventListener('pagehide', this._handlingEnd);
  }

  _handleVisibilityChange (e) {
    if (document.visibilityState === 'hidden') this.send();
  }

  _handleEnd () {
    this.send();
  }

  render () {
    if (this._delay <= -1) return;
    this._delay--;
    this._count++;
    switch (true) {
      case this._count > 20:
      case this._delay === 0:
        this.send();
        break;
    }
  }

  send (ending = false) {
    if (!this._isRequested) return;
    const actionLayers = [];
    if (!ending) actionLayers.push(...this._startingActions.map(queued => queued.start()).filter(layer => layer.length > 0));
    actionLayers.push(...this._endingActions.map(queued => queued.end()).filter(layer => layer.length > 0));

    const length = ((actionLayers.length / SLICE) + 1) | 0;
    const slices = [];
    for (let i = 0; i < length; i++) {
      const slice = actionLayers.slice(i * SLICE, (i + 1) * SLICE);
      slices.push(slice.flat());
    }

    if (this._type === PushType.COLLECTOR && this._collector.isCollecting) {
      const layer = this._collector.layer;
      if (slices.length > 0) {
        const slice = slices.splice(0, 1)[0];
        if (slice.length > 0) layer.push.apply(layer, slice);
      }
      layer.flat();
      if (layer.length > 0) push(PushType.COLLECTOR, layer);
    }

    if (slices.length > 0) {
      for (let i = 0; i < slices.length; i++) {
        const slice = slices[i];
        if (slice.length > 0) push(PushType.ACTION, slice);
      }
    }

    this.reset(ending);
  }
}

class QueuedAction {
  constructor (action, data) {
    this._action = action;
    this._data = data;
  }

  test (action) {
    return this._action === action;
  }

  start () {
    return this._action.start(this._data);
  }

  end () {
    return this._action.end(this._data);
  }
}

const queue = new Queue();

class Debug {
  get debugger () {
    return window._oEa;
  }

  get isActive () {
    if (!this.debugger) return false;
    return this.debugger._dbg === '1';
  }

  set isActive (value) {
    if (!this.debugger || this.isActive === value) return;
    this.debugger.debug(value ? 1 : 0);
  }
}

const debug = new Debug();

const Status = {
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

const Type$2 = {
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

const charCodeHex = (char) => {
  const code = char.charCodeAt(0).toString(16);
  return '0x0000'.slice(0, -code.length) + code;
};

const normalize = (text) => {
  if (!text) return text;
  // text = [...text].map(char => TABLE[charCodeHex(char)] || char).join('');
  text = [...text].map(char => RESTRICTED[charCodeHex(char)] || char).join('');
  text = text.replace(/\s+/g, ' ').replace(/\s/g, '_');
  text = text.toLowerCase();
  return text;
};

const validateString = (value, name, allowNull = true) => {
  switch (true) {
    case typeof value === 'number':
      return `${value}`;

    case typeof value === 'string':
      return value;

    case value === undefined && allowNull:
    case value === null && allowNull:
      return '';
  }

  api.inspector.warn(`unexpected value '${value}' set at analytics.${name}. Expecting a String`);
  return null;
};

const validateNumber = (value, name, allowNull = true) => {
  switch (true) {
    case !isNaN(value):
      return value;

    case typeof value === 'string' && !isNaN(Number(value)):
      return Number(value);

    case value === undefined && allowNull:
    case value === null && allowNull:
      return -1;
  }

  api.inspector.warn(`unexpected value '${value}' set at analytics.${name}. Expecting a Number`);
  return null;
};

const validateBoolean = (value, name) => {
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

  api.inspector.warn(`unexpected value '${value}' set at analytics.${name}. Expecting a Boolean`);
  return null;
};

const validateLang = (value, name, allowNull = true) => {
  switch (true) {
    case typeof value === 'string' && /^[A-Za-z]{2}$|^[A-Za-z]{2}[-_]/.test(value):
      return value.split(/[-_]/)[0].toLowerCase();

    case value === undefined && allowNull:
    case value === null && allowNull:
      return '';
  }

  api.inspector.warn(`unexpected value '${value}' set at analytics.${name}. Expecting language as a String following ISO 639-1 format`);
  return null;
};

const validateGeography = (value, name, allowNull = true) => {
  switch (true) {
    case typeof value === 'string':
      if (!/^FR-[A-Z0-9]{2,3}$/.test(value)) api.inspector.warn(`value '${value}' set at analytics.${name} with wrong format. Geographic location should be a String following ISO 3166-2:FR format`);
      return value;

    case value === undefined && allowNull:
    case value === null && allowNull:
      return '';
  }

  api.inspector.warn(`unexpected value '${value}' set at analytics.${name}. Expecting geographic location as a String following ISO 3166-2:FR format`);
  return null;
};

const normaliseISODate = (date) => date.toISOString().split('T')[0];

const validateDate = (value, name, allowNull = true) => {
  switch (true) {
    case value instanceof Date:
      return normaliseISODate(value);

    case typeof value === 'string': {
      const date = new Date(value);
      if (date.toString() !== 'Invalid Date') return normaliseISODate(date);
      break;
    }

    case value === undefined && allowNull:
    case value === null && allowNull:
      return null;
  }

  api.inspector.warn(`unexpected value '${value}' set at analytics.${name}. Expecting a Date`);
  return null;
};

class User {
  constructor (config) {
    this._config = config || {};
  }

  reset (clear = false) {
    this._isConnected = false;
    this.status = Status.ANONYMOUS;
    if (!clear && this._config.connect) this.connect(this._config.connect.uid, this._config.connect.email, this._config.connect.isNew);
    else {
      this._uid = undefined;
      this._email = undefined;
      this._isNew = false;
    }
    this.profile = clear ? undefined : this._config.profile;
    this.language = clear ? undefined : this._config.language;
    this.type = clear ? undefined : this._config.type;
  }

  connect (uid, email, isNew = false) {
    this._uid = validateString(uid, 'user.uid');
    if (/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/.test(email)) api.inspector.warn('Please check analytics.user.email is properly encrypted ');
    this._email = validateString(email, 'user.email');
    this._isNew = validateBoolean(isNew);
    this._isConnected = true;
    this.status = Status.CONNECTED;
  }

  get uid () {
    return this._uid;
  }

  get email () {
    return this._email;
  }

  get isNew () {
    return this._isNew;
  }

  set status (id) {
    const stati = Object.values(Status).filter(status => status.isConnected === this._isConnected);
    this._status = stati.filter(status => status.id === id || status.value === id)[0] || stati.filter(status => status.isDefault)[0];
  }

  get status () {
    return this._status.id;
  }

  set profile (value) {
    const valid = validateString(value, 'user.profile');
    if (valid !== null) this._profile = valid;
  }

  get profile () {
    return this._profile.id;
  }

  set language (value) {
    const valid = validateLang(value, 'user.language');
    if (valid !== null) this._language = valid;
  }

  get language () {
    return this._language || navigator.language;
  }

  set type (id) {
    this._type = Object.values(Type$2).filter(type => type.id === id || type.value === id)[0];
  }

  get type () {
    return this._type.id;
  }

  get layer () {
    const layer = [];
    if (this.uid) layer.push('uid', normalize(this.uid));
    if (this.email) layer.push('email', normalize(this.email));
    if (this.isNew) layer.push('newcustomer', '1');
    if (this.language) layer.push('user_language', this.language);
    layer.push('user_login_status', this._status.value);
    if (this._profile) layer.push('profile', this._profile);
    if (this._type) layer.push('user_type', this._type.value);
    return layer;
  }
}

User.Status = Status;
User.Type = Type$2;

const Environment = {
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

class Site {
  constructor (config) {
    this._config = config || {};
  }

  reset (clear = false) {
    this.environment = clear ? Environment.DEVELOPMENT.id : this._config.environment;
    this.entity = clear ? undefined : this._config.entity;
    this.language = clear ? undefined : this._config.language;
    this.target = clear ? undefined : this._config.target;
    this.type = clear ? undefined : this._config.type;
    this.region = clear ? undefined : this._config.region;
    this.department = clear ? undefined : this._config.department;
    this.version = clear ? undefined : this._config.version;
    this._api = api.version;
  }

  set environment (value) {
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
  }

  get environment () {
    return this._environment ? this._environment.id : Environment.DEVELOPMENT.id;
  }

  set entity (value) {
    const valid = validateString(value, 'site.entity');
    if (valid !== null) this._entity = valid;
  }

  get entity () {
    return this._entity;
  }

  set language (value) {
    const valid = validateLang(value, 'site.language');
    if (valid !== null) this._language = valid;
  }

  get language () {
    return this._language || document.documentElement.lang;
  }

  set target (value) {
    const valid = validateString(value, 'site.target');
    if (valid !== null) this._target = valid;
  }

  get target () {
    return this._target;
  }

  set type (value) {
    const valid = validateString(value, 'site.type');
    if (valid !== null) this._type = valid;
  }

  get type () {
    return this._type;
  }

  set region (value) {
    const valid = validateGeography(value, 'site.region');
    if (valid !== null) this._region = valid;
  }

  get region () {
    return this._region;
  }

  set department (value) {
    const valid = validateGeography(value, 'site.department');
    if (valid !== null) this._department = valid;
  }

  get department () {
    return this._department;
  }

  set version (value) {
    const valid = validateString(value, 'site.version');
    if (valid !== null) this._version = valid;
  }

  get version () {
    return this._version;
  }

  get api () {
    return this._api;
  }

  get layer () {
    const layer = [];
    layer.push('site_environment', this._environment.value);
    if (this.entity) layer.push('site_entity', normalize(this.entity));
    else api.inspector.warn('entity is required in analytics.site');
    if (this.language) layer.push('site_language', this.language);
    if (this.target) layer.push('site_target', normalize(this.target));
    if (this.type) layer.push('site_type', normalize(this.type));
    if (this.region) layer.push('site_region', this.region);
    if (this.department) layer.push('site_department', this.department);
    if (this.version) layer.push('site_version', this.version);
    if (this.api) layer.push('api_version', this.api);
    return layer;
  }
}

Site.Environment = Environment;

const Inventory = {
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

const CollectionState = {
  COLLECTABLE: 'collectable',
  COLLECTING: 'collecting',
  COLLECTED: 'collected'
};

class Page {
  constructor (config) {
    this._config = config || {};
    this._state = CollectionState.COLLECTABLE;
  }

  reset (clear = false) {
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
  }

  collecting () {
    if (this._state !== CollectionState.COLLECTABLE) {
      api.inspector.warn(`current path '${this.path}' was already collected`);
      return false;
    }
    this._state = CollectionState.COLLECTING;
    return true;
  }

  get isCollecting () {
    return this._state === CollectionState.COLLECTING;
  }

  set path (value) {
    const valid = validateString(value, 'page.path');
    if (valid !== null) {
      this._path = valid;
      this._state = CollectionState.COLLECTABLE;
    }
  }

  get path () {
    return this._path || `${document.location.pathname}${document.location.search}`;
  }

  set referrer (value) {
    const valid = validateString(value, 'page.referrer');
    if (valid !== null) this._referrer = valid;
  }

  get referrer () {
    return this._referrer;
  }

  set title (value) {
    const valid = validateString(value, 'page.title');
    if (valid !== null) this._title = valid;
  }

  get title () {
    return this._title || document.title;
  }

  set id (value) {
    const valid = validateString(value, 'page.id');
    if (valid !== null) this._id = valid;
  }

  get id () {
    return this._id;
  }

  set author (value) {
    const valid = validateString(value, 'page.author');
    if (valid !== null) this._author = valid;
  }

  get author () {
    return this._author;
  }

  set date (value) {
    const valid = validateDate(value, 'page.date');
    if (valid !== null) this._date = valid;
  }

  get date () {
    return this._date;
  }

  get tags () {
    return this._tags;
  }

  set name (value) {
    const valid = validateString(value, 'page.name');
    if (valid !== null) this._name = valid;
  }

  get name () {
    return this._name || this.title;
  }

  get labels () {
    return this._labels;
  }

  get categories () {
    return this._categories;
  }

  set isError (value) {
    const valid = validateBoolean(value, 'page.isError');
    if (valid !== null) this._isError = valid;
  }

  get isError () {
    return this._isError;
  }

  set template (value) {
    const valid = validateString(value, 'page.template');
    if (valid !== null) this._template = valid;
  }

  get template () {
    return this._template || 'autres';
  }

  set segment (value) {
    const valid = validateString(value, 'page.segment');
    if (valid !== null) this._segment = valid;
  }

  get segment () {
    return this._segment || this.template;
  }

  set group (value) {
    const valid = validateString(value, 'page.group');
    if (valid !== null) this._group = valid;
  }

  get group () {
    return this._group || this.template;
  }

  set subtemplate (value) {
    const valid = validateString(value, 'page.subtemplate');
    if (valid !== null) this._subtemplate = valid;
  }

  get subtemplate () {
    return this._subtemplate;
  }

  set theme (value) {
    const valid = validateString(value, 'page.theme');
    if (valid !== null) this._theme = valid;
  }

  get theme () {
    return this._theme;
  }

  set subtheme (value) {
    const valid = validateString(value, 'page.subtheme');
    if (valid !== null) this._subtheme = valid;
  }

  get subtheme () {
    return this._subtheme;
  }

  set related (value) {
    const valid = validateString(value, 'page.related');
    if (valid !== null) this._related = valid;
  }

  get related () {
    return this._related;
  }

  set depth (value) {
    const valid = validateNumber(value, 'page.depth');
    if (valid !== null) this._depth = valid;
  }

  get depth () {
    return this._depth;
  }

  set current (value) {
    const valid = validateNumber(value, 'page.current');
    if (valid !== null) this._current = valid;
  }

  get current () {
    return this._current;
  }

  set total (value) {
    const valid = validateNumber(value, 'page.total');
    if (valid !== null) this._total = valid;
  }

  get total () {
    return this._total;
  }

  get filters () {
    return this._filters;
  }

  get layer () {
    this._state = CollectionState.COLLECTED;
    const layer = [];
    if (this.path) layer.push('path', normalize(this.path));
    if (this.referrer) layer.push('referrer', normalize(this.referrer));
    if (this.title) layer.push('page_title', normalize(this.title));
    if (this.name) layer.push('page_name', normalize(this.name));
    if (this.id) layer.push('page_id', normalize(this.id));
    if (this.author) layer.push('page_author', normalize(this.author));
    if (this.date) layer.push('page_date', normalize(this.date));

    const components = Object.keys(Inventory).map(id => document.querySelector(Inventory[id]) !== null ? id : null).filter(id => id !== null).join(',');
    if (components) layer.push('page_components', components);

    const labels = this._labels.slice(0, 5);
    labels.length = 5;
    if (labels.some(label => label)) layer.push('pagelabel', labels.map(label => typeof label === 'string' ? normalize(label) : '').join(','));

    const tags = this._tags;
    if (tags.some(tag => tag)) layer.push('pagetag', tags.map(tag => typeof tag === 'string' ? normalize(tag) : '').join(','));

    this._categories.forEach((category, index) => {
      if (category) layer.push(`page_category${index + 1}`, category);
    });

    if (this._isError) layer.push('error', '1');

    layer.push('page_template', normalize(this.template));
    layer.push('pagegroup', normalize(this.group));
    layer.push('site-segment', normalize(this.segment));

    if (this.subtemplate) layer.push('page_subtemplate', normalize(this.subtemplate));
    if (this.theme) layer.push('page_theme', normalize(this.theme));
    if (this.subtheme) layer.push('page_subtheme', normalize(this.subtheme));
    if (this.related) layer.push('page_related', normalize(this.related));
    if (!isNaN(this.depth)) layer.push('page_depth', this.depth);

    if (!isNaN(this.current) && this.current > -1) {
      let pagination = `${this.current}`;
      if (!isNaN(this.total) && this.total > -1) pagination += `/${this.total}`;
      layer.push('page_pagination', pagination);
    }

    if (this.filters.length && this.filters.some(label => label)) {
      const filters = this.filters.map(filter => typeof filter === 'string' ? normalize(filter) : '');
      layer.push('page_filters', filters.join(','));
    }
    return layer;
  }
}

const Method = {
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

class Search {
  constructor (config) {
    this._config = config || {};
  }

  reset (clear = false) {
    this.engine = clear ? undefined : this._config.engine;
    this.results = clear || isNaN(this._config.results) ? -1 : this._config.results;
    this.terms = clear ? undefined : this._config.terms;
    this.category = clear ? undefined : this._config.category;
    this.theme = clear ? undefined : this._config.theme;
    this.type = clear ? undefined : this._config.type;
    this.method = clear ? undefined : this._config.method;
  }

  set engine (value) {
    const valid = validateString(value, 'search.engine');
    if (valid !== null) this._engine = valid;
  }

  get engine () {
    return this._engine;
  }

  set results (value) {
    const valid = validateNumber(value, 'search.results');
    if (valid !== null) this._results = valid;
  }

  get results () {
    return this._results;
  }

  set terms (value) {
    const valid = validateString(value, 'search.terms');
    if (valid !== null) this._terms = valid;
  }

  get terms () {
    return this._terms;
  }

  set category (value) {
    const valid = validateString(value, 'search.category');
    if (valid !== null) this._category = valid;
  }

  get category () {
    return this._category;
  }

  set theme (value) {
    const valid = validateString(value, 'search.theme');
    if (valid !== null) this._theme = valid;
  }

  get theme () {
    return this._theme;
  }

  set type (value) {
    const valid = validateString(value, 'search.type');
    if (valid !== null) this._type = valid;
    this._type = value;
  }

  get type () {
    return this._type;
  }

  set method (id) {
    const methods = Object.values(Method);
    this._method = methods.filter(method => method.id === id || method.value === id)[0] || methods.filter(method => method.isDefault)[0];
  }

  get method () {
    return this._method;
  }

  get layer () {
    const layer = [];
    if (this.engine) layer.push('isearchengine', normalize(this.engine));
    if (this.results > -1) layer.push('isearchresults', this.results);
    if (this.terms) layer.push('isearchkey', 'search_terms', 'isearchdata', normalize(this.terms));
    if (this.category) layer.push('isearchkey', 'search_category', 'isearchdata', normalize(this.category));
    if (this.theme) layer.push('isearchkey', 'search_theme', 'isearchdata', normalize(this.theme));
    if (this.type) layer.push('isearchkey', 'search_type', 'isearchdata', normalize(this.type));
    if (this._method && layer.length) layer.push('isearchkey', 'search_method', 'isearchdata', this._method.value);
    return layer;
  }
}

Search.Method = Method;

class Funnel {
  constructor (config) {
    this._config = config || {};
  }

  reset (clear = false) {
    this.id = clear ? undefined : this._config.id;
    this.type = clear ? undefined : this._config.type;
    this.name = clear ? undefined : this._config.name;
    this.step = clear ? undefined : this._config.step;
    this.current = clear || isNaN(this._config.current) ? -1 : this._config.current;
    this.total = clear || isNaN(this._config.total) ? -1 : this._config.total;
    this.objective = clear ? undefined : this._config.objective;
    this.error = clear ? undefined : this._config.error;
  }

  set id (value) {
    const valid = validateString(value, 'funnel.id');
    if (valid !== null) this._id = valid;
  }

  get id () {
    return this._id;
  }

  set type (value) {
    const valid = validateString(value, 'funnel.type');
    if (valid !== null) this._type = valid;
  }

  get type () {
    return this._type;
  }

  set name (value) {
    const valid = validateString(value, 'funnel.name');
    if (valid !== null) this._name = valid;
  }

  get name () {
    return this._name;
  }

  set step (value) {
    const valid = validateString(value, 'funnel.step');
    if (valid !== null) this._step = valid;
  }

  get step () {
    return this._step;
  }

  set current (value) {
    const valid = validateNumber(value, 'funnel.current');
    if (valid !== null) this._current = valid;
  }

  get current () {
    return this._current;
  }

  set total (value) {
    const valid = validateNumber(value, 'funnel.total');
    if (valid !== null) this._total = valid;
  }

  get total () {
    return this._total;
  }

  set objective (value) {
    const valid = validateString(value, 'funnel.objective');
    if (valid !== null) this._objective = valid;
    this._objective = value;
  }

  get objective () {
    return this._objective;
  }

  set error (value) {
    const valid = validateString(value, 'funnel.error');
    if (valid !== null) this._error = valid;
    this._error = value;
  }

  get error () {
    return this._error;
  }

  get layer () {
    const layer = [];
    if (this.id) layer.push('funnel_id', normalize(this.id));
    if (this.type) layer.push('funnel_type', normalize(this.type));
    if (this.name) layer.push('funnel_name', normalize(this.name));
    if (this.step) layer.push('funnel_step_name', normalize(this.step));
    if (!isNaN(this.current) && this.current > -1) layer.push('funnel_step_number', this.current);
    if (!isNaN(this.total) && this.total > -1) layer.push('funnel_step_max', this.total);
    if (this.objective) layer.push('funnel_objective', normalize(this.objective));
    if (this.error) layer.push('funnel_error', normalize(this.error));
    return layer;
  }
}

const ActionMode = {
  IN: 'in',
  OUT: 'out',
  NONE: 'none'
};

const ActionStatus = {
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

const getParametersLayer = (data) => {
  return Object.entries(data).map(([key, value]) => ['actionpname', normalize(key), 'actionpvalue', normalize(value)]).flat();
};

class Action {
  constructor (name) {
    this._isMuted = false;
    this._regulation = ActionRegulation.NONE;
    this._name = name;
    this._status = ActionStatus.UNSTARTED;
    this._labels = [];
    this._parameters = {};
    this._sentData = [];
  }

  get isMuted () {
    return this._isMuted;
  }

  set isMuted (value) {
    this._isMuted = value;
  }

  get regulation () {
    return this._regulation;
  }

  set regulation (value) {
    if (Object.values(ActionRegulation).includes(value)) this._regulation = value;
  }

  get isSingular () {
    return this._status === ActionStatus.SINGULAR;
  }

  get status () {
    return this._status;
  }

  get name () {
    return this._name;
  }

  get labels () {
    return this._labels;
  }

  get reference () {
    return this._reference;
  }

  get parameters () {
    return this._parameters;
  }

  get mode () {
    return this._mode;
  }

  singularize () {
    this._status = ActionStatus.SINGULAR;
  }

  rewind () {
    this._sentData = [];
    this._status = ActionStatus.UNSTARTED;
  }

  addParameter (key, value) {
    this._parameters[key] = value;
  }

  removeParameter (key) {
    delete this._parameters[key];
  }

  set reference (value) {
    const valid = validateString(value, `action ${this._name}`);
    if (valid !== null) this._reference = valid;
  }

  get _base () {
    return ['actionname', this._name];
  }

  _getLayer (data = {}) {
    if (this._isMuted) return [];

    if (this._mode !== ActionMode.IN) this._sentData.push(JSON.stringify(data));

    const layer = this._base;
    switch (this._mode) {
      case ActionMode.IN:
      case ActionMode.OUT:
        layer.push('actionmode', this._mode);
        break;
    }

    const labels = this._labels.slice(0, 5);
    labels.length = 5;
    if (labels.some(label => label)) layer.push('actionlabel', labels.map(label => typeof label === 'string' ? normalize(label) : '').join(','));

    if (this._reference) layer.push('actionref', this._reference);

    layer.push.apply(layer, getParametersLayer(Object.assign(this._parameters, data || {})));
    return layer;
  }

  start (data) {
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
        api.inspector.error(`unexpected start on action ${this._name} with status ${this._status.id}`);
        return [];
    }
    return this._getLayer(data);
  }

  end (data) {
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
        if (this._sentData.includes(JSON.stringify(data))) return [];
        this._mode = ActionMode.NONE;
        this._status = ActionStatus.ENDED;
        break;

      default:
        return [];
    }
    return this._getLayer(data);
  }

  resume (data) {
    if (this._isMuted) return [];
    if (this._status.value >= ActionStatus.ENDED.value) {
      api.inspector.error(`unexpected resuming on action ${this._name} with status ${this._status.id}`);
      return [];
    }
    const layer = this._base;
    if (data) layer.push.apply(layer, getParametersLayer(data));
    return layer;
  }
}

class Actions {
  constructor () {
    this._actions = [];
  }

  rewind () {
    this._actions.forEach(action => action.rewind());
  }

  getAction (name) {
    let action = this._actions.filter(action => action.name === name)[0];
    if (!action) {
      action = new Action(name);
      this._actions.push(action);
    }
    return action;
  }

  hasAction (name) {
    return this._actions.some(action => action.name === name);
  }

  remove (action) {
    const index = this._actions.indexOf(action);
    if (index === -1) return false;
    this._actions.splice(index, 1);
    return true;
  }
}

Actions.ActionMode = ActionMode;

const actions = new Actions();
Actions.instance = actions;

class Location {
  constructor (onRouteChange, isListeningHash = false) {
    this._onRouteChange = onRouteChange;
    this._isListeningHash = isListeningHash;
    this._update();
    renderer.add(this);
  }

  _update () {
    this._pathname = document.location.pathname;
    this._search = document.location.search;
    this._hash = document.location.hash;
    this._path = `${this._pathname}${this._search}`;
    if (this._isListeningHash) this._path += this._hash;
    this._hasTitle = this._title === document.title;
    this._title = document.title;
  }

  render () {
    if (this._pathname !== document.location.pathname || this._search !== document.location.search) this.change();
    if (this._isListeningHash && this._hash !== document.location.hash) this.change();
  }

  change () {
    this._referrer = this._path;
    this._update();
    this._onRouteChange();
  }

  get path () {
    return this._path;
  }

  get hasTitle () {
    return this._hasTitle;
  }

  get title () {
    return this._title;
  }

  get referrer () {
    return this._referrer;
  }
}

const CollectorEvent = {
  COLLECT: api.internals.ns.event('collect')
};

const ActioneeEmission = {
  REWIND: api.internals.ns.emission('analytics', 'rewind')
};

const ActionEnable = {
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

class Collector {
  constructor (config) {
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
  }

  get page () {
    return this._page;
  }

  get user () {
    return this._user;
  }

  get site () {
    return this._site;
  }

  get search () {
    return this._search;
  }

  get funnel () {
    return this._funnel;
  }

  start () {
    const handleRouteChange = this._handleRouteChange.bind(this);
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
  }

  _handleRouteChange () {
    queue.send(true);
    this._delay = 6;
    renderer.add(this);
  }

  render () {
    this._delay--;
    if (this._delay < 0) {
      renderer.remove(this);
      this._routeChanged();
    }
  }

  _routeChanged () {
    actions.rewind();
    this._page.referrer = this._location.referrer;
    if (this._location.hasTitle) this._page.title = this._location.title;
    this._page.path = this._location.path;
    const event = new CustomEvent(CollectorEvent.COLLECT);
    document.documentElement.dispatchEvent(event);
    this.collect();
    if (api.internals && api.internals.stage && api.internals.stage.root) api.internals.stage.root.descend(ActioneeEmission.REWIND);
  }

  reset (clear = false) {
    this._user.reset(clear);
    this._site.reset(clear);
    this._page.reset(clear);
    this._search.reset(clear);
    this._funnel.reset(clear);
  }

  collect () {
    if (!this.page.collecting()) return;
    queue.collect();
  }

  get collection () {
    return this._collection;
  }

  get isCollecting () {
    return this._page.isCollecting;
  }

  get isActionEnabled () {
    return this._isActionEnabled.value;
  }

  set isActionEnabled (value) {
    this._isActionEnabled = Object.values(ActionEnable).find(enable => enable.entries.includes(value)) || ActionEnable.DISABLE;
  }

  get isActionReduced () {
    return this._isActionEnabled === ActionEnable.REDUCE;
  }

  get layer () {
    return [
      ...this._user.layer,
      ...this._site.layer,
      ...this._page.layer,
      ...this._search.layer,
      ...this._funnel.layer
    ];
  }
}

class Analytics {
  constructor () {
    this._isReady = false;
    this._readiness = new Promise((resolve, reject) => {
      if (this._isReady) resolve();
      else {
        this._resolve = resolve;
        this._reject = reject;
      }
    });
    this._configure();
  }

  _configure () {
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
  }

  _build () {
    this._init = new Init(this._config.domain);
    this._init.configure().then(this._start.bind(this), (reason) => this._reject(reason));
  }

  get isReady () {
    return this._isReady;
  }

  get readiness () {
    return this._readiness;
  }

  _start () {
    if (this._isReady) return;

    this._cmp = new ConsentManagerPlatform(this._config.cmp);
    this._collector = new Collector(this._config);
    this._collector.reset();

    this._isReady = true;
    this._resolve();

    queue.start();
    this._collector.start();
  }

  get page () {
    return this._collector.page;
  }

  get user () {
    return this._collector.user;
  }

  get site () {
    return this._collector._site;
  }

  get search () {
    return this._collector.search;
  }

  get funnel () {
    return this._collector.funnel;
  }

  get cmp () {
    return this._cmp;
  }

  get opt () {
    return opt;
  }

  get collection () {
    return this._collector.collection;
  }

  get isActionEnabled () {
    return this._collector.isActionEnabled;
  }

  set isActionEnabled (value) {
    this._collector.isActionEnabled = value;
  }

  get isDebugging () {
    return debug.isActive;
  }

  set isDebugging (value) {
    debug.isActive = value;
  }

  push (type, layer) {
    push(type, layer);
  }

  reset (clear = false) {
    this._collector.reset();
  }

  collect () {
    this._collector.collect();
  }
}

const analytics = new Analytics();

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
const completeAssign = (target, ...sources) => {
  sources.forEach(source => {
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    Object.getOwnPropertySymbols(source).forEach(sym => {
      const descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
};

api.analytics = completeAssign(analytics, {});

const Type$1 = {
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

const Type = {
  UNDEFINED: 'undefined',
  HEADING: 'heading',
  COMPONENT: 'component',
  CONTENT: 'content'
};

const NODE_POSITION = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINED_BY;

class Heading {
  constructor (heading) {
    this._label = heading.textContent.trim();
    this._level = Number(heading.tagName.charAt(1));
  }

  get level () {
    return this._level;
  }

  get label () {
    return this._label;
  }
}

class Member {
  constructor (node, target, level) {
    this._type = Type.UNDEFINED;
    this._node = node;
    this._target = target;
    this._level = level;
    this._label = '';
    this._component = '';
    this._isValid = true;
    this.analyse();
  }

  _parseHeadings () {
    const selector = Array.from({ length: this._level }, (v, i) => `h${i + 1}`).join(',');
    this._headings = Array.from(this._node.querySelectorAll(selector)).filter(heading => heading === this._node || heading.parentNode === this._node || (heading.parentNode != null && heading.parentNode.parentNode === this._node)).filter(heading => (this._target.compareDocumentPosition(heading) & NODE_POSITION) > 0).map(heading => new Heading(heading)).reverse();
  }

  _getComponent () {
    if (typeof api !== 'function') return false;
    const element = api(this._node);
    if (!element) return false;
    const instance = Object.values(element).filter(actionee => actionee.isActionee).sort((a, b) => b.priority - a.priority)[0];
    if (!instance) return false;

    this._type = Type.COMPONENT;
    this._isValid = instance.validate(this._target);
    const selector = Array.from({ length: 6 }, (v, i) => `h${i + 1}`).join(',');
    const top = Array.from(this._node.querySelectorAll(selector)).map(heading => new Heading(heading)).sort((a, b) => a.level - b.level)[0];
    if (top && top.level <= this._level) this._level = top.level - 1;

    const hx = this._node.closest(selector);
    if (hx) {
      const heading = new Heading(hx);
      if (heading.level <= this._level) this._level = heading.level - 1;
    }

    if (!isNaN(instance.level) && instance.level < this._level) this._level = instance.level;
    this._label = instance.label;
    this._component = instance.component;
    return true;
  }

  _getHeading () {
    if (!this._headings.length) return false;
    const labels = [];
    this._headings.forEach(heading => {
      if (heading.level <= this._level) {
        if (heading.level > 1) labels.unshift(heading.label);
        this._level = heading.level - 1;
      }
    });
    if (!labels.length) return false;
    this._type = Type.HEADING;
    this._label = labels.join(' › ');
    return true;
  }

  analyse () {
    this._parseHeadings();
    if (this._getComponent()) return;
    if (this._getHeading()) return;
    if (this._node !== this._target) return;

    const label = this._node.textContent.trim();
    if (!label) return;
    this._type = Type.CONTENT;
    this._label = label;
  }

  get type () {
    return this._type;
  }

  get level () {
    return this._level;
  }

  get label () {
    return this._label;
  }

  get component () {
    return this._component;
  }

  get node () {
    return this._node;
  }

  get target () {
    return this._target;
  }

  get isValid () {
    return this._isValid;
  }
}

class Hierarchy {
  constructor (node) {
    this._node = node;
    this._process();
  }

  _process () {
    // console.log('_______________ start ____________________');
    const member = new Member(this._node, this._node, 6);
    // console.log('- FIRST MEMBER', member);
    this._level = member.level;
    this._members = [member];

    let node = this._node.parentNode;

    while (document.documentElement.contains(node) && node !== document.documentElement && this._level > 0) {
      // console.log('MEMBERS ARRAY', this._members);
      // console.log('NODE ANALYSIS', node);
      const member = new Member(node, this._node, this._level);
      // console.log('NEW MEMBER', member);
      switch (true) {
        case member.type === Type.UNDEFINED:
          // console.log('****UNDEFINED');
          break;

        case !member.isValid:
          // console.log('****INVALID');
          break;

        case member.label === this._members[0].label && member.type === Type.HEADING && this._members[0].type === Type.COMPONENT:
          // console.log('***** SAME');
          // do nothing
          break;

        case member.label === this._members[0].label && member.type === Type.COMPONENT && this._members[0].type === Type.HEADING:
          // console.log('***** SAME INVERT');
          this._members.splice(0, 1, member);
          break;

        default:
          this._members.unshift(member);
          if (member.level < this._level) this._level = member.level;
      }

      node = node.parentNode;
    }

    this._label = normalize(this._members[this._members.length - 1].label);
    this._title = normalize(this._members.filter(member => member.label).map(member => member.label).join(' › '));
    const components = this._members.filter(member => member.component).map(member => member.component);
    this._component = normalize(components.join(' › '));
    this._localComponent = components[components.length - 1];
    this._globalComponent = components[0];

    // console.log('========= end ===========');
  }

  get localComponent () {
    return this._localComponent;
  }

  get globalComponent () {
    return this._globalComponent;
  }

  get label () {
    return this._label;
  }

  get title () {
    return this._title;
  }

  get component () {
    return this._component;
  }
}

class ActionElement {
  constructor (node, type, id, category = '', title = null, parameters = {}, isRating = false, regulation = ActionRegulation.NONE) {
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
  }

  _init () {
    this._hierarchy = new Hierarchy(this._node);

    let id = '';
    let type = '';
    if (this._id) id = `_[${this._id}]`;
    else api.inspector.warn(`Analytics API requires an id to be set on tracked element. Missing on ${this._node.outerHTML}`);
    if (this._type) type = `(${this._type.id})_`;
    this._name = `${type}${this._title || this._hierarchy.title}${id}`;

    this._action = actions.getAction(this._name, this._type.status);
    if (this._type.isSingular) this._action.singularize();
    Object.keys(this._parameters).forEach(key => this._action.addParameter(key, this._parameters[key]));
    this._action.isMuted = this._isMuted;
    this._action.regulation = this._regulation;

    this._action.labels[0] = this._type.id;
    this._action.labels[1] = this._hierarchy.globalComponent;
    this._action.labels[2] = this._hierarchy.localComponent;
    this._action.labels[4] = this._category;

    if (this._hierarchy.label) this._action.addParameter('component_label', this._hierarchy.label);
    if (this._hierarchy.title) this._action.addParameter('heading_hierarchy', this._hierarchy.title);
    if (this._hierarchy.component) this._action.addParameter('component_hierarchy', this._hierarchy.component);

    this.begin();
  }

  get isMuted () {
    return this._action ? this._action.isMuted : this._isMuted;
  }

  set isMuted (value) {
    this._isMuted = value;
    if (this._action) this._action.isMuted = value;
  }

  get regulation () {
    return this._regulation;
  }

  set regulation (value) {
    this._regulation = value;
    if (this._action) this._action.regulation = value;
  }

  get action () {
    return this._action;
  }

  rewind () {
    this._hasBegun = false;
    this.begin();
  }

  begin (data = {}) {
    if (this._hasBegun) return;
    this._hasBegun = true;
    if (this._type.isBeginning && (this._type.isSingular || this._isRating)) queue.appendStartingAction(this._action, data);
  }

  act (data = {}) {
    if (this._isMuted) return;
    if (!this._action) {
      requestAnimationFrame(() => this.act(data));
      return;
    }
    queue.appendEndingAction(this._action, data);
  }

  dispose () {
    actions.remove(this._action);
  }
}

const ActionAttributes = {
  RATING: api.internals.ns.attr('analytics-rating'),
  ACTION: api.internals.ns.attr('analytics-action')
};

class Actionee extends api.core.Instance {
  constructor (priority = -1, category = '', title = null, regulation = ActionRegulation.NONE) {
    super();
    this._type = null;
    this._priority = priority;
    this._category = category;
    this._title = title;
    this._parameters = {};
    this._data = {};
    this._isMuted = false;
    this._regulation = regulation;
  }

  static get instanceClassName () {
    return 'Actionee';
  }

  get proxy () {
    const scope = this;

    const proxy = {
      validate: (target, members) => scope.validate(target, members)
    };

    const proxyAccessors = {
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

    return api.internals.property.completeAssign(super.proxy, proxy, proxyAccessors);
  }

  get data () {
    return this._data;
  }

  _config (element, registration) {
    super._config(element, registration);

    if (this._type === null) {
      this._sort(element);
      this._isMuted = true;
      return;
    }

    const regulation = this.getRegulation();
    this._regulation = regulation !== ActionRegulation.NONE ? regulation : this._regulation;
    const actionAttribute = this.getAttribute(ActionAttributes.ACTION);
    const title = typeof actionAttribute === 'string' && actionAttribute.toLowerCase() !== 'false' && actionAttribute.toLowerCase() !== 'true' ? normalize(actionAttribute) : this._title;
    this._isRating = this.hasAttribute(ActionAttributes.RATING);

    this._actionElement = new ActionElement(this.node, this._type, this.id, this._category, title, this._parameters, this._isRating, this._regulation);
    if (this._isMuted) this._actionElement.isMuted = true;

    this.addDescent(ActioneeEmission.REWIND, this.rewind.bind(this));

    this._sort(element);
  }

  getRegulation () {
    const actionAttribute = this.getAttribute(ActionAttributes.ACTION);
    switch (true) {
      case typeof actionAttribute === 'string' && actionAttribute.toLowerCase() === 'false':
        return ActionRegulation.PREVENT;
      case actionAttribute !== null:
        return ActionRegulation.ENFORCE;
      default:
        return ActionRegulation.NONE;
    }
  }

  mutate (attributeNames) {
    if (attributeNames.includes(ActionAttributes.ACTION)) {
      const regulation = this.getRegulation();
      if (this._regulation !== regulation) {
        this._regulation = regulation;
        if (this._actionElement) this._actionElement.regulation = regulation;
      }
    }
    super.mutate(attributeNames);
  }

  _sort (element) {
    const actionees = element.instances.filter(instance => instance.isActionee).sort((a, b) => b.priority - a.priority);
    if (actionees.length <= 1) return;
    actionees.forEach((actionee, index) => { actionee.isMuted = index > 0; });
  }

  get isMuted () {
    return this._actionElement ? this._actionElement.isMuted : this._isMuted;
  }

  set isMuted (value) {
    this._isMuted = value;
    if (this._actionElement) this._actionElement.isMuted = value;
  }

  get priority () {
    return this._priority;
  }

  setPriority (value) {
    this._priority = value;
  }

  get isInteractive () {
    return this.node.tagName === 'A' || this.node.tagName === 'BUTTON';
  }

  detectInteractionType (node) {
    if (!node) node = this.node;
    const tag = node.tagName;
    const href = node.getAttribute('href');
    const isDownload = node.hasAttribute('download');
    const hostname = node.hostname;

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
  }

  setClickType () {
    this._type = Type$1.CLICK;
  }

  listenActionClick (target) {
    if (target) {
      this._clickTarget = target;
      this._clickTarget.addEventListener('click', this._handlingClick, { capture: true });
    } else this.listenClick({ capture: true });
  }

  handleClick () {
    this.act();
  }

  setImpressionType () {
    this._type = Type$1.IMPRESSION;
  }

  rewind () {
    if (this._actionElement) this._actionElement.rewind();
  }

  act (data = {}) {
    if (this._actionElement !== undefined) {
      this._data.component_value = this.value;
      this._actionElement.act(Object.assign(this._data, data));
    }
  }

  getFirstText (node) {
    if (!node) node = this.node;
    if (node.childNodes && node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === Node.TEXT_NODE) {
          const text = node.childNodes[i].textContent.trim();
          if (text) {
            return this.cropText(text);
          }
        }
      }

      for (let i = 0; i < node.childNodes.length; i++) {
        const text = this.getFirstText(node.childNodes[i]);
        if (text) {
          return this.cropText(text);
        }
      }
    }
    return '';
  }

  cropText (text, length = 50) {
    return text.length > 50 ? `${text.substring(0, 50).trim()}[...]` : text;
  }

  getInteractionLabel () {
    const title = this.getAttribute('title');
    if (title) return this.cropText(title);

    const text = this.getFirstText();
    if (text) return text;

    const img = this.node.querySelector('img');
    if (img) {
      const alt = img.getAttribute('alt');
      if (alt) return this.cropText(alt);
    }

    return null;
  }

  getHeadingLabel (length = 6) {
    const selector = Array.from({ length: length }, (v, i) => `h${i + 1}`).join(',');
    const headings = Array.from(this.querySelectorAll(selector)).filter(heading => (this.node.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0);
    if (headings.length) {
      for (const heading of headings) {
        const text = this.getFirstText(heading);
        if (text) return text;
      }
    }
  }

  detectLevel (node) {
    if (!node) node = this.node;
    const selector = Array.from({ length: 6 }, (v, i) => `h${i + 1}`).join(',');
    const levels = Array.from(node.querySelectorAll(selector)).map(heading => Number(heading.tagName.charAt(1)));
    if (levels.length) this._level = Math.min.apply(null, levels) - 1;
  }

  validate (target) {
    return true;
  }

  get actionElement () {
    return this._actionElement;
  }

  get label () {
    return null;
  }

  get value () {
    return this._value || this.label;
  }

  set value (value) {
    this._value = value;
  }

  get isActionee () {
    return true;
  }

  get level () {
    return this._level;
  }

  get type () {
    return this._type;
  }

  dispose () {
    if (this._clickTarget) {
      this._clickTarget.removeEventListener('click', this._handlingClick);
    }
    super.dispose();
  }
}

class AttributeActionee extends Actionee {
  constructor () {
    super(100, '', null, ActionRegulation.ENFORCE);
  }

  static get instanceClassName () {
    return 'AttributeActionee';
  }

  init () {
    this._attribute = this.registration.selector.replace(/[[\]]/g, '');
    const id = this._attribute.split('-').pop();
    this._type = Object.values(Type$1).filter(type => type.id === id)[0];
    this._title = this.getAttribute(this._attribute);
    if (this._type === Type$1.CLICK) this.detectInteractionType();

    switch (this._type.method) {
      case 'eventListener':
        this.listen(this._type.event, this.handleEvent.bind(this));
        break;

      case 'change':
        this.listen(this._type.event, this.handleChange.bind(this));
        break;
    }
  }

  handleEvent (e) {
    this._actionElement.act();
  }

  handleChange (e) {
    this._actionElement.act({ change_value: e.target.value });
  }

  dispose () {
    this._actionElement.dispose();
    super.dispose();
  }
}

const integrateAttributes = () => {
  Object.values(Type$1)
    .filter(type => type.attributed)
    .forEach(type => api.internals.register(api.internals.ns.attr.selector(`analytics-${type.id}`), AttributeActionee));
};

const ButtonEmission = {
  CLICK: api.internals.ns.emission('button', 'click')
};

class ComponentActionee extends Actionee {
  constructor (priority = -1) {
    super(priority, 'dsfr_component');
  }

  static get instanceClassName () {
    return 'ComponentActionee';
  }

  get proxy () {
    const scope = this;

    const proxyAccessors = {
      get component () {
        return scope.component;
      }
    };

    return api.internals.property.completeAssign(super.proxy, proxyAccessors);
  }

  setDiscloseType () {
    this._type = Type$1.DISCLOSE;
  }

  listenDisclose () {
    this.listen(api.core.DisclosureEvent.DISCLOSE, this._handleDisclose.bind(this), { capture: true });
  }

  _handleDisclose () {
    this.act();
  }

  setChangeType () {
    this._type = Type$1.CHANGE;
  }

  listenChange () {
    this.listen('change', this._handleChange.bind(this), { capture: true });
  }

  _handleChange (e) {
    if (e.target && e.target.value) {
      this.setChangeValue(e);
      this.act();
    }
  }

  setChangeValue (e) {
    this.value = e.target.value;
  }

  listenInputValidation (node, type = Type$1.CLICK, isSendingInputValue = false) {
    if (!node) node = this.node;
    this._type = type;
    this._isSendingInputValue = isSendingInputValue;
    this.addAscent(ButtonEmission.CLICK, this._actValidatedInput.bind(this));
    const button = this.element.getDescendantInstances('ButtonActionee', null, true)[0];
    if (button) button.isMuted = true;
    this._validatedInput = node.querySelector('input');
    this._handlingInputValidation = this._handleInputValidation.bind(this);
    if (this._validatedInput) this._validatedInput.addEventListener('keydown', this._handlingInputValidation);
  }

  _handleInputValidation (e) {
    if (e.keyCode === 13) this._actValidatedInput();
  }

  _actValidatedInput () {
    if (this._isActingValidatedInput) return;
    this._isActingValidatedInput = true;
    if (this._isSendingInputValue) this.value = this._validatedInput.value.trim();
    this.act();
    this.request(this._actedValidatedInput.bind(this));
  }

  _actedValidatedInput () {
    this._isActingValidatedInput = false;
  }

  setCheckType () {
    this._type = Type$1.CHECK;
  }

  detectCheckableType () {
    const isChecked = this.node.checked;
    this._type = isChecked ? Type$1.UNCHECK : Type$1.CHECK;
  }

  listenCheckable () {
    this.listen('change', this._handleCheckable.bind(this), { capture: true });
  }

  _handleCheckable (e) {
    if (e.target && e.target.value !== 'on') {
      this.value = e.target.value;
    }

    switch (true) {
      case this._type === Type$1.CHECK && e.target.checked:
      case this._type === Type$1.UNCHECK && !e.target.checked:
        this.act();
        break;
    }
  }

  detectPressableType () {
    const isPressable = this.node.hasAttribute('aria-pressed');
    if (isPressable) {
      const isPressed = this.node.getAttribute('aria-pressed') === 'true';
      this._type = isPressed ? Type$1.RELEASE : Type$1.PRESS;
    }
    return isPressable;
  }

  listenPressable () {
    this.listen('click', this._handlePressable.bind(this), { capture: true });
  }

  _handlePressable (e) {
    switch (true) {
      case this._type === Type$1.PRESS && e.target.getAttribute('aria-pressed') === 'false':
      case this._type === Type$1.RELEASE && e.target.getAttribute('aria-pressed') === 'true':
        this.act();
        break;
    }
  }

  setDismissType () {
    this._type = Type$1.DISMISS;
  }

  get component () {
    return null;
  }

  dispose () {
    if (this._validatedInput) {
      this._validatedInput.removeEventListener('keydown', this._handlingInputValidation);
    }

    super.dispose();
  }
}

const AccordionSelector = {
  ACCORDION: api.internals.ns.selector('accordion'),
  TITLE: api.internals.ns.selector('accordion__title')
};

const ID$y = 'accordion';

class AccordionButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'AccordionButtonActionee';
  }

  init () {
    this.isMuted = true;
  }

  get button () {
    return this.element.getInstance('CollapseButton');
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'bouton d\'accordéon';
  }

  get component () {
    return ID$y;
  }
}

class AccordionActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'AccordionActionee';
  }

  init () {
    this.setDiscloseType();
    this.wrapper = this.node.closest(AccordionSelector.ACCORDION);
    this.detectLevel(this.wrapper);
    this.register(`[aria-controls="${this.id}"]`, AccordionButtonActionee);
    this.listenDisclose();
  }

  get label () {
    if (this.wrapper) {
      const title = this.wrapper.querySelector(AccordionSelector.TITLE);
      if (title) {
        const text = this.getFirstText(title);
        if (text) return text;
      }
    }
    const instance = this.element.getInstance('Collapse');
    if (instance) {
      const button = instance.buttons.filter(button => button.isPrimary)[0];
      if (button) {
        const text = this.getFirstText(button);
        if (text) return text;
      }
    }
    return 'accordéon';
  }

  get component () {
    return ID$y;
  }

  dispose () {
    super.dispose();
  }
}

const joinSelector = (selectors, join) => selectors.split(',').map(selector => `${selector}${join}`).join(',');

const integrateAccordion = (selector = '') => {
  if (api.accordion) {
    api.internals.register(joinSelector(api.accordion.AccordionSelector.COLLAPSE, selector), AccordionActionee);
  }
};

const AlertSelector = {
  ALERT: api.internals.ns.selector('alert'),
  TITLE: api.internals.ns.selector('alert__title')
};

const ID$x = 'alert';

class AlertActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'AlertActionee';
  }

  get label () {
    const alertTitle = this.node.querySelector(AlertSelector.TITLE);
    if (alertTitle) {
      const text = this.getFirstText(alertTitle);
      if (text) return text;
    }
    return 'alerte';
  }

  get component () {
    return ID$x;
  }
}

const integrateAlert = (selector = '') => {
  api.internals.register(joinSelector(AlertSelector.ALERT, selector), AlertActionee);
};

const BreadcrumbSelector = {
  LINK: `${api.internals.ns.selector('breadcrumb__link')}:not([aria-current])`,
  COLLAPSE: `${api.internals.ns.selector('breadcrumb')} ${api.internals.ns.selector('collapse')}`
};

const ID$w = 'breadcrumb';

class BreadcrumbActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'BreadcrumbActionee';
  }

  get label () {
    return 'fil d\'ariane';
  }

  get component () {
    return ID$w;
  }
}

class BreadcrumbLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'BreadcrumbLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  handleClick () {
    this.act();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;
    return 'lien fil d\'ariane';
  }

  get component () {
    return null;
  }
}

const integrateBreadcrumb = (selector = '') => {
  if (api.breadcrumb) {
    api.internals.register(joinSelector(BreadcrumbSelector.COLLAPSE, selector), BreadcrumbActionee);
    api.internals.register(joinSelector(BreadcrumbSelector.LINK, selector), BreadcrumbLinkActionee);
  }
};

const ButtonSelector = {
  BUTTON: `${api.internals.ns.selector('btn')}:not(${api.internals.ns.selector('btn--close')})`
};

const ID$v = 'button';

class ButtonActionee extends ComponentActionee {
  constructor () {
    super(1);
    this._data = {};
  }

  static get instanceClassName () {
    return 'ButtonActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  handleClick () {
    this.ascend(ButtonEmission.CLICK);
    this.act();
  }

  get label () {
    if (this.node.tagName === 'input') {
      switch (this.node.type) {
        case 'button':
        case 'submit':
          if (this.hasAttribute('value')) return this.getAttribute('value');
      }
    }
    const firstText = this.getFirstText();
    if (firstText) return firstText;
    return 'bouton';
  }

  get component () {
    return ID$v;
  }
}

const integrateButton = (selector = '') => {
  api.internals.register(joinSelector(ButtonSelector.BUTTON, selector), ButtonActionee);
};

const CalloutSelector = {
  CALLOUT: api.internals.ns.selector('callout'),
  TITLE: api.internals.ns.selector('callout__title')
};

const ID$u = 'callout';

class CalloutActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'CalloutActionee';
  }

  get label () {
    const calloutTitle = this.node.querySelector(CalloutSelector.TITLE);
    if (calloutTitle) {
      const text = this.getFirstText(calloutTitle);
      if (text) return text;
    }

    return 'mise en avant';
  }

  get component () {
    return ID$u;
  }
}

const integrateCallout = (selector = '') => {
  api.internals.register(joinSelector(CalloutSelector.CALLOUT, selector), CalloutActionee);
};

const CardSelector = {
  CARD: api.internals.ns.selector('card'),
  LINK: `${api.internals.ns.selector('card__title')} a, ${api.internals.ns.selector('card__title')} button`,
  TITLE: api.internals.ns.selector('card__title')
};

const ID$t = 'card';

class CardActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'CardActionee';
  }

  init () {
    const link = this.node.querySelector(CardSelector.LINK);
    if (link) {
      this.link = link;
      this.detectInteractionType(link);
      this.listenActionClick(link);
    }
  }

  get label () {
    const cardTitle = this.node.querySelector(CardSelector.TITLE);
    if (cardTitle) {
      const text = this.getFirstText(cardTitle);
      if (text) return text;
    }

    const heading = this.getHeadingLabel();
    if (heading) return heading;

    return 'carte';
  }

  get component () {
    return ID$t;
  }
}

const integrateCard = (selector = '') => {
  api.internals.register(joinSelector(CardSelector.CARD, selector), CardActionee);
};

const CheckboxSelector = {
  INPUT: api.internals.ns.selector('checkbox-group [type="checkbox"]')
};

const ID$s = 'checkbox';

class CheckboxActionee extends ComponentActionee {
  constructor () {
    super(1);
    this._data = {};
  }

  static get instanceClassName () {
    return 'CheckboxActionee';
  }

  init () {
    this.detectCheckableType();
    this.listenCheckable();
  }

  get label () {
    const label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
    if (label) {
      const text = this.getFirstText(label);
      if (text) return text;
    }
    return 'case à cocher';
  }

  get component () {
    return ID$s;
  }
}

const integrateCheckbox = (selector = '') => {
  api.internals.register(joinSelector(CheckboxSelector.INPUT, selector), CheckboxActionee);
};

const ConnectSelector = {
  CONNECT: api.internals.ns.selector('connect'),
  LINK: api.internals.ns.selector('connect + * a, connect + a')
};

const ID$r = 'connect';

class ConnectActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'ConnectActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    if (this.node.classList.contains('fr-connect--plus')) return 'FranceConnect+';
    return 'FranceConnect';
  }

  get component () {
    return ID$r;
  }
}

class ConnectLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'ConnectLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    return this.getFirstText() || 'qu\'est-ce que FranceConnect ?';
  }

  get component () {
    return ID$r;
  }
}

const integrateConnect = (selector = '') => {
  api.internals.register(joinSelector(ConnectSelector.CONNECT, selector), ConnectActionee);
  api.internals.register(joinSelector(ConnectSelector.LINK, selector), ConnectLinkActionee);
};

const ConsentSelector = {
  BANNER: api.internals.ns.selector('consent-banner')
};

const ID$q = 'consent';

class ConsentActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'ConsentActionee';
  }

  get label () {
    return 'gestionnaire de consentement';
  }

  get component () {
    return ID$q;
  }
}

const integrateConsent = (selector = '') => {
  api.internals.register(joinSelector(ConsentSelector.BANNER, selector), ConsentActionee);
};

const DownloadSelector = {
  LINK: api.internals.ns.selector('download__link')
};

const ID$p = 'download';

class DownloadActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'DownloadActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const text = this.getFirstText();
    if (text) return text;
    return 'téléchargement';
  }

  get component () {
    return ID$p;
  }
}

const integrateDownload = (selector) => {
  api.internals.register(joinSelector(DownloadSelector.LINK, selector), DownloadActionee);
};

const FollowSelector = {
  FOLLOW: api.internals.ns.selector('follow'),
  NEWSLETTER_INPUT_GROUP: api.internals.ns.selector('follow__newsletter') + ' ' + api.internals.ns.selector('input-group')
};

const ID$o = 'follow';

class FollowActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'FollowActionee';
  }

  init () {
    this._inputGroup = this.querySelector(FollowSelector.NEWSLETTER_INPUT_GROUP);
    if (this._inputGroup) {
      this.listenInputValidation(this._inputGroup, Type$1.SUBSCRIBE);
      const input = this.element.getDescendantInstances('InputActionee', null, true)[0];
      if (input) input.isMuted = true;
    }
  }

  get label () {
    return 'lettre d\'information et réseaux sociaux';
  }

  get component () {
    return ID$o;
  }
}

const integrateFollow = (selector = '') => {
  api.internals.register(joinSelector(FollowSelector.FOLLOW, selector), FollowActionee);
};

const FooterSelector = {
  FOOTER: api.internals.ns.selector('footer'),
  FOOTER_LINKS: `${api.internals.ns.selector('footer')} a[href], ${api.internals.ns.selector('footer')} button`
};

const ID$n = 'footer';

class FooterActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'FooterActionee';
  }

  get label () {
    return 'pied de page';
  }

  get component () {
    return ID$n;
  }
}

class FooterLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'FooterLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const label = this.getInteractionLabel();
    if (label) return label;

    return 'lien pied de page';
  }
}

const integrateFooter = (selector = '') => {
  api.internals.register(joinSelector(FooterSelector.FOOTER, selector), FooterActionee);
  api.internals.register(joinSelector(FooterSelector.FOOTER_LINKS, selector), FooterLinkActionee);
};

const ID$m = 'header';

class HeaderActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'HeaderActionee';
  }

  get label () {
    return 'en-tête';
  }

  get component () {
    return ID$m;
  }
}

class HeaderModalButtonActionee extends ComponentActionee {
  constructor () {
    super(4);
  }

  static get instanceClassName () {
    return 'HeaderModalButtonActionee';
  }
}

class HeaderModalActionee extends ComponentActionee {
  constructor () {
    super(0);
  }

  static get instanceClassName () {
    return 'HeaderModalActionee';
  }

  init () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) {
      this.setPriority(4);
      this.register(`[aria-controls="${this.id}"]`, HeaderModalButtonActionee);
    }
  }
}

const HeaderSelector = {
  TOOLS_BUTTON: `${api.internals.ns.selector('header__tools-links')} ${api.internals.ns.selector('btns-group')} ${api.internals.ns.selector('btn')}`,
  MENU_BUTTON: `${api.internals.ns.selector('header__menu-links')} ${api.internals.ns.selector('btns-group')} ${api.internals.ns.selector('btn')}`
};

class HeaderToolsButtonActionee extends ComponentActionee {
  constructor () {
    super(4);
  }

  static get instanceClassName () {
    return 'HeaderToolsButtonActionee';
  }

  init () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this._priority = -1;
  }
}

class HeaderMenuButtonActionee extends ComponentActionee {
  static get instanceClassName () {
    return 'HeaderMenuButtonActionee';
  }

  init () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this.setPriority(4);
  }
}

const integrateHeader = (selector = '') => {
  if (api.header) {
    api.internals.register(joinSelector(api.header.HeaderSelector.HEADER, selector), HeaderActionee);
    api.internals.register(joinSelector(api.header.HeaderSelector.MODALS, selector), HeaderModalActionee);
    api.internals.register(joinSelector(HeaderSelector.TOOLS_BUTTON, selector), HeaderToolsButtonActionee);
    api.internals.register(joinSelector(HeaderSelector.MENU_BUTTON, selector), HeaderMenuButtonActionee);
  }
};

const HighlightSelector = {
  HIGHLIGHT: api.internals.ns.selector('highlight')
};

const ID$l = 'highlight';

class HighlightActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'HighlightActionee';
  }

  get label () {
    return 'mise en exergue';
  }

  get component () {
    return ID$l;
  }
}

const integrateHighlight = (selector = '') => {
  api.internals.register(joinSelector(HighlightSelector.HIGHLIGHT, selector), HighlightActionee);
};

const LinkSelector = {
  LINK: api.internals.ns.selector('link')
};

const ID$k = 'link';

class LinkActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'LinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'lien';
  }

  get component () {
    return ID$k;
  }
}

const integrateLink = (selector = '') => {
  api.internals.register(joinSelector(LinkSelector.LINK, selector), LinkActionee);
};

const InputSelector = {
  INPUT: api.internals.ns.selector('input-group')
};

const ID$j = 'input';

class InputActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'InputActionee';
  }

  init () {
    this._input = this.querySelector(api.internals.ns.selector('input'));
    this._label = this.querySelector(api.internals.ns.selector('label'));
    this._inputWrap = this.querySelector(api.internals.ns.selector('input-wrap'));

    if (this._inputWrap) this.listenInputValidation(this._inputWrap);
  }

  get label () {
    if (this._label) {
      const text = this.getFirstText(this._label);
      if (text) return text;
    }

    return 'champ de saisie';
  }

  get component () {
    return ID$j;
  }
}

const integrateInput = (selector = '') => {
  api.internals.register(joinSelector(InputSelector.INPUT, selector), InputActionee);
};

const ModalSelector = {
  TITLE: api.internals.ns.selector('modal__title')
};

const ID$i = 'modal';

class ModalActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'ModalActionee';
  }

  init () {
    this.setDiscloseType();
    this.detectLevel();
    this.listenDisclose();
  }

  get label () {
    const title = this.node.querySelector(ModalSelector.TITLE);

    if (title) {
      const text = this.getFirstText(title);
      if (text) return text;
    }

    const heading = this.getHeadingLabel(2);
    if (heading) return heading;

    const instance = this.element.getInstance('Modal');
    if (instance) {
      const button = instance.buttons.filter(button => button.isPrimary)[0];
      if (button) {
        const text = this.getFirstText(button.node);
        if (text) return text;
      }
    }
    return 'modale';
  }

  get component () {
    return ID$i;
  }
}

const integrateModal = (selector = '') => {
  if (api.modal) {
    api.internals.register(joinSelector(api.modal.ModalSelector.MODAL, selector), ModalActionee);
  }
};

class NavigationActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'NavigationActionee';
  }

  get label () {
    return 'navigation';
  }
}

const NavigationSelector = {
  LINK: api.internals.ns.selector('nav__link'),
  BUTTON: api.internals.ns.selector('nav__btn')
};

const ID$h = 'navigation';

class NavigationLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'NavigationLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'lien de navigation';
  }

  get component () {
    return ID$h;
  }
}

class NavigationSectionActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'NavigationSectionActionee';
  }

  init () {
    this._wrapper = this.node.closest(api.navigation.NavigationSelector.ITEM);
  }

  get label () {
    if (this._wrapper) {
      const button = this._wrapper.querySelector(NavigationSelector.BUTTON);
      if (button) {
        const text = this.getFirstText(button);
        if (text) return text;
      }
    }

    const instance = this.element.getInstance('Collapse');
    if (instance) {
      const button = instance.buttons.filter(button => button.isPrimary)[0];
      if (button) {
        const text = this.getFirstText(button);
        if (text) return text;
      }
    }
    return 'section de navigation';
  }
}

const integrateNavigation = (selector = '') => {
  if (api.navigation) {
    api.internals.register(joinSelector(api.navigation.NavigationSelector.NAVIGATION, selector), NavigationActionee);
    api.internals.register(joinSelector(NavigationSelector.LINK, selector), NavigationLinkActionee);
    api.internals.register(joinSelector(api.navigation.NavigationSelector.COLLAPSE, selector), NavigationSectionActionee);
  }
};

const NoticeSelector = {
  NOTICE: api.internals.ns.selector('notice'),
  TITLE: api.internals.ns.selector('notice__title'),
  LINK: api.internals.ns.selector('notice a')
};

const ID$g = 'notice';

class NoticeActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'NoticeActionee';
  }

  get label () {
    const noticeTitle = this.node.querySelector(NoticeSelector.TITLE);
    if (noticeTitle) {
      const firstText = this.getFirstText(noticeTitle);
      if (firstText) return firstText;
    }

    return 'bandeau d\'information importante';
  }

  get component () {
    return ID$g;
  }
}

class NoticeLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'NoticeLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'lien de bandeau d\'information importante';
  }

  get component () {
    return ID$g;
  }
}

const integrateNotice = (selector = '') => {
  api.internals.register(joinSelector(NoticeSelector.NOTICE, selector), NoticeActionee);
  api.internals.register(joinSelector(NoticeSelector.LINK, selector), NoticeLinkActionee);
};

const PaginationSelector = {
  PAGINATION: api.internals.ns.selector('pagination'),
  LINK: api.internals.ns.selector('pagination__link'),
  NEXT_LINK: api.internals.ns.selector('pagination__link--next'),
  LAST_LINK: api.internals.ns.selector('pagination__link--last'),
  ANALYTICS_TOTAL: api.internals.ns.attr('analytics-page-total'),
  CURRENT: '[aria-current="page"]'
};

const ID$f = 'pagination';

class PaginationActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'PaginationActionee';
  }

  init () {
    this.setPagination();
  }

  get label () {
    return 'pagination';
  }

  get component () {
    return ID$f;
  }

  setPagination () {
    const currentLink = this.node.querySelector(PaginationSelector.CURRENT);
    if (!currentLink) return;
    const currentLabel = this.getFirstText(currentLink);
    if (!currentLabel) return;
    const current = this.getInt(currentLabel);
    if (isNaN(current)) return;
    api.analytics.page.current = current;

    const total = this.getTotalPage();
    if (isNaN(total)) return;
    api.analytics.page.total = total;
  }

  getTotalPage () {
    const attr = parseInt(this.node.getAttribute(PaginationSelector.ANALYTICS_TOTAL));
    if (!isNaN(attr)) return attr;
    const links = this.node.querySelectorAll(`${PaginationSelector.LINK}:not(${PaginationSelector.NEXT_LINK}):not(${PaginationSelector.LAST_LINK})`);
    if (!links) return null;
    const totalLabel = this.getFirstText(links[links.length - 1]);
    if (!totalLabel) return null;
    return this.getInt(totalLabel);
  }

  getInt (val) {
    const ints = val.match(/\d+/);
    if (!ints || ints.length === 0) return null;
    return parseInt(ints[0]);
  }
}

class PaginationLinkActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'PaginationLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;
    return 'lien pagination';
  }

  get component () {
    return null;
  }
}

const integratePagination = (selector = '') => {
  api.internals.register(joinSelector(PaginationSelector.PAGINATION, selector), PaginationActionee);
  api.internals.register(joinSelector(PaginationSelector.LINK, selector), PaginationLinkActionee);
};

const QuoteSelector = {
  QUOTE: api.internals.ns.selector('quote')
};

const ID$e = 'quote';

class QuoteActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'QuoteActionee';
  }

  get label () {
    const blockquote = this.node.querySelector('blockquote');
    if (blockquote) {
      const firstText = this.getFirstText(blockquote);
      if (firstText) {
        return firstText;
      }
    }
    return 'citation';
  }

  get component () {
    return ID$e;
  }
}

const integrateQuote = (selector = '') => {
  api.internals.register(joinSelector(QuoteSelector.QUOTE, selector), QuoteActionee);
};

const RadioSelector = {
  INPUT: api.internals.ns.selector('radio-group [type="radio"]')
};

const FormSelector = {
  LABEL: api.internals.ns.selector('label'),
  FIELDSET: api.internals.ns.selector('fieldset'),
  LEGEND: api.internals.ns.selector('fieldset__legend')
};

const ID$d = 'radio';

class RadioActionee extends ComponentActionee {
  constructor () {
    super(1);
    this._data = {};
  }

  static get instanceClassName () {
    return 'RadioActionee';
  }

  init () {
    this.setCheckType();
    this.listenCheckable();
  }

  get label () {
    const parts = [];
    const fieldset = this.node.closest(FormSelector.FIELDSET);
    if (fieldset) {
      const legend = fieldset.querySelector(FormSelector.LEGEND);
      if (legend) {
        const firstTextLegend = this.getFirstText(legend);
        if (firstTextLegend) parts.push(firstTextLegend);
      }
    }
    const label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
    if (label) {
      const firstTextLabel = this.getFirstText(label);
      if (firstTextLabel) parts.push(firstTextLabel);
    }
    return parts.join(' › ');
  }

  get component () {
    return ID$d;
  }
}

const integrateRadio = (selector = '') => {
  api.internals.register(joinSelector(RadioSelector.INPUT, selector), RadioActionee);
};

const SearchSelector = {
  SEARCH_BAR: api.internals.ns.selector('search-bar')
};

const ID$c = 'search';

class SearchActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'SearchActionee';
  }

  init () {
    this.listenInputValidation(this.node, Type$1.SEARCH, true);
  }

  get label () {
    return 'barre de recherche';
  }

  get component () {
    return ID$c;
  }
}

const integrateSearch = (selector = '') => {
  api.internals.register(joinSelector(SearchSelector.SEARCH_BAR, selector), SearchActionee);
};

const SelectSelector = {
  SELECT: api.internals.ns.selector('select')
};

const ID$b = 'select';

class SelectActionee extends ComponentActionee {
  constructor () {
    super(1);
    this._data = {};
  }

  static get instanceClassName () {
    return 'SelectActionee';
  }

  init () {
    this.setChangeType();
    this.listenChange();
  }

  setChangeValue (e) {
    if (!e.target || !e.target.selectedOptions) return;
    const value = Array.from(e.target.selectedOptions).map(option => option.text).join(' - ');
    if (value) this.value = value;
  }

  get label () {
    const label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
    if (label) {
      const firstText = this.getFirstText(label);
      if (firstText) return firstText;
    }

    return 'liste déroulante';
  }

  get component () {
    return ID$b;
  }
}

const integrateSelect = (selector = '') => {
  api.internals.register(joinSelector(SelectSelector.SELECT, selector), SelectActionee);
};

const ShareSelector = {
  SHARE: api.internals.ns.selector('share'),
  TITLE: api.internals.ns.selector('share__title')
};

const ID$a = 'share';

class ShareActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'ShareActionee';
  }

  get label () {
    const title = this.querySelector(ShareSelector.TITLE);
    if (title) {
      const firstText = this.getFirstText(title);
      if (firstText) return firstText;
    }
    return 'boutons de partage';
  }

  get component () {
    return ID$a;
  }
}

const integrateShare = (selector = '') => {
  api.internals.register(joinSelector(ShareSelector.SHARE, selector), ShareActionee);
};

const SidemenuSelector = {
  SIDEMENU: api.internals.ns.selector('sidemenu'),
  ITEM: api.internals.ns.selector('sidemenu__item'),
  LINK: api.internals.ns.selector('sidemenu__link'),
  BUTTON: api.internals.ns.selector('sidemenu__btn'),
  TITLE: api.internals.ns.selector('sidemenu__title')
};

class SidemenuActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'SidemenuActionee';
  }

  get label () {
    const sidemenu = this.node.closest(SidemenuSelector.SIDEMENU);
    if (sidemenu) {
      const title = sidemenu.querySelector(SidemenuSelector.TITLE);
      if (title) {
        const firstText = this.getFirstText(title);
        if (firstText) return firstText;
      }
    }

    return 'menu Latéral';
  }
}

const ID$9 = 'sidemenu';

class SidemenuLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'SidemenuLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'lien menu latéral';
  }

  get component () {
    return ID$9;
  }
}

class SidemenuSectionActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'SidemenuSectionActionee';
  }

  init () {
    this._wrapper = this.node.closest(SidemenuSelector.ITEM);
  }

  get label () {
    if (this._wrapper) {
      const button = this._wrapper.querySelector(SidemenuSelector.BUTTON);
      if (button) {
        const firstText = this.getFirstText(button);
        if (firstText) return firstText;
      }
    }
    const instance = this.element.getInstance('Collapse');
    if (instance) {
      const button = instance.buttons.filter(button => button.isPrimary)[0];
      if (button) {
        const firstTextBtn = this.getFirstText(button);
        if (firstTextBtn) return firstTextBtn;
      }
    }
    return 'section menu latéral';
  }
}

const integrateSidemenu = (selector) => {
  if (api.sidemenu) {
    api.internals.register(joinSelector(SidemenuSelector.SIDEMENU, selector), SidemenuActionee);
    api.internals.register(joinSelector(SidemenuSelector.LINK, selector), SidemenuLinkActionee);
    api.internals.register(joinSelector(api.sidemenu.SidemenuSelector.COLLAPSE, selector), SidemenuSectionActionee);
  }
};

const SummarySelector = {
  SUMMARY: api.internals.ns.selector('summary'),
  LINK: api.internals.ns.selector('summary__link'),
  TITLE: api.internals.ns.selector('summary__title'),
  ITEM: `${api.internals.ns.selector('summary')} li`
};

class SummaryActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'SummaryActionee';
  }

  get label () {
    const title = this.node.querySelector(SummarySelector.TITLE);
    if (title) {
      const firstText = this.getFirstText(title);
      if (firstText) return firstText;
    }
    return 'sommaire';
  }
}

const ID$8 = 'summary';

class SummaryLinkActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'SummaryLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenActionClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;
    return 'lien sommaire';
  }

  get component () {
    return ID$8;
  }
}

class SummarySectionActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'SummarySectionActionee';
  }

  init () {
    this._link = this.querySelector(SummarySelector.LINK);
  }

  validate (target) {
    return this._link !== target;
  }

  get label () {
    if (!this._link) return null;
    const firstText = this.getFirstText(this._link);
    if (firstText) return firstText;
    return 'section sommaire';
  }
}

const integrateSummary = (selector = '') => {
  api.internals.register(joinSelector(SummarySelector.SUMMARY, selector), SummaryActionee);
  api.internals.register(joinSelector(SummarySelector.LINK, selector), SummaryLinkActionee);
  api.internals.register(joinSelector(SummarySelector.ITEM, selector), SummarySectionActionee);
};

const ID$7 = 'tab';

class TabButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TabButtonActionee';
  }

  init () {
    this.isMuted = true;
  }

  get label () {
    const text = this.getFirstText();
    if (text) return text;
    return 'bouton onglet';
  }

  get component () {
    return ID$7;
  }
}

class TabActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TabActionee';
  }

  init () {
    this.setDiscloseType();
    this.register(`[aria-controls="${this.id}"]`, TabButtonActionee);
    this._instance = this.element.getInstance('TabPanel');
    this.listenDisclose();
  }

  get label () {
    const tabs = this.node.closest(api.tab.TabSelector.GROUP);
    if (tabs) {
      const tab = tabs.querySelector(`${api.tab.TabSelector.LIST} [aria-controls="${this.id}"]${api.tab.TabSelector.TAB}`);
      if (tab) {
        const firstTextTab = this.getFirstText(tab);
        if (firstTextTab) return firstTextTab;
      }
    }

    const button = this._instance.buttons.filter(button => button.isPrimary)[0];
    if (button) {
      const firstTextBtn = this.getFirstText(button);
      if (firstTextBtn) return firstTextBtn;
    }
    return 'onglet';
  }

  get component () {
    return ID$7;
  }
}

const integrateTab = (selector = '') => {
  if (api.tab) {
    api.internals.register(joinSelector(api.tab.TabSelector.PANEL, selector), TabActionee);
  }
};

const TableSelector = {
  TABLE: api.internals.ns.selector('table')
};

const ID$6 = 'table';

class TableActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'TableActionee';
  }

  get label () {
    const caption = this.node.querySelector('caption');
    if (caption) {
      const firstText = this.getFirstText(caption);
      if (firstText) return firstText;
    }
    return 'tableau';
  }

  get component () {
    return ID$6;
  }
}

const integrateTable = (selector = '') => {
  api.internals.register(joinSelector(TableSelector.TABLE, selector), TableActionee);
};

const TagSelector = {
  TAG: api.internals.ns.selector('tag'),
  PRESSABLE: '[aria-pressed]',
  DISMISSIBLE: `${api.internals.ns.selector('tag--dismiss', '')}`
};

const ID$5 = 'tag';

class TagActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TagActionee';
  }

  init () {
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
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'tag';
  }

  get component () {
    return ID$5;
  }
}

const integrateTag = (selector = '') => {
  api.internals.register(joinSelector(TagSelector.TAG, selector), TagActionee);
};

const TileSelector = {
  TILE: api.internals.ns.selector('tile'),
  LINK: `${api.internals.ns.selector('tile__title')} a, ${api.internals.ns.selector('tile__title')} button`,
  TITLE: api.internals.ns.selector('tile__title')
};

const ID$4 = 'tile';

class TileActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'TileActionee';
  }

  init () {
    const link = this.node.querySelector(TileSelector.LINK);
    if (link) {
      this.link = link;
      this.detectInteractionType(link);
      this.listenActionClick(link);
    }
  }

  get label () {
    const tileTitle = this.node.querySelector(TileSelector.TITLE);
    if (tileTitle) return this.getFirstText(tileTitle);

    const heading = this.getHeadingLabel();
    if (heading) return heading;

    return 'tuile';
  }

  get component () {
    return ID$4;
  }
}

const integrateTile = (selector = '') => {
  api.internals.register(joinSelector(TileSelector.TILE, selector), TileActionee);
};

const ToggleSelector = {
  INPUT: api.internals.ns.selector('toggle [type="checkbox"]')
};

const ID$3 = 'toggle';

class ToggleActionee extends ComponentActionee {
  constructor () {
    super(1);
    this._data = {};
  }

  static get instanceClassName () {
    return 'ToggleActionee';
  }

  init () {
    this.detectCheckableType();
    this.listenCheckable();
  }

  get label () {
    const label = this.node.parentNode.querySelector(api.internals.ns.selector('toggle__label'));
    if (label) {
      const firstText = this.getFirstText(label);
      if (firstText) return firstText;
    }

    return 'interrupteur';
  }

  get component () {
    return ID$3;
  }
}

const integrateToggle = (selector = '') => {
  api.internals.register(joinSelector(ToggleSelector.INPUT, selector), ToggleActionee);
};

const TRANSCRIPTION = api.internals.ns.selector('transcription');
const COLLAPSE$1 = api.internals.ns.selector('collapse');

const TranscriptionSelector = {
  TRANSCRIPTION: TRANSCRIPTION,
  COLLAPSE: `${TRANSCRIPTION} > ${COLLAPSE$1}, ${TRANSCRIPTION} > *:not(${TRANSCRIPTION}):not(${COLLAPSE$1}) > ${COLLAPSE$1}, ${TRANSCRIPTION} > *:not(${TRANSCRIPTION}):not(${COLLAPSE$1}) > *:not(${TRANSCRIPTION}):not(${COLLAPSE$1}) > ${COLLAPSE$1}`,
  COLLAPSE_LEGACY: `${TRANSCRIPTION} ${COLLAPSE$1}`,
  TITLE: `${TRANSCRIPTION}__title`
};

const ID$2 = 'transcription';

class TranscriptionButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TranscriptionButtonActionee';
  }

  init () {
    this.isMuted = true;
  }

  get button () {
    return this.element.getInstance('CollapseButton');
  }

  get label () {
    const text = this.getFirstText();
    if (text) return text;
    return 'bouton transcription';
  }

  get component () {
    return ID$2;
  }
}

class TranscriptionActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TranscriptionActionee';
  }

  init () {
    this.setDiscloseType();
    this.wrapper = this.node.closest(TranscriptionSelector.ACCORDION);
    this.detectLevel(this.wrapper);
    this.register(`[aria-controls="${this.id}"]`, TranscriptionButtonActionee);
    this.listenDisclose();
  }

  get label () {
    if (this.wrapper) {
      const title = this.wrapper.querySelector(TranscriptionSelector.TITLE);
      if (title) {
        const firstTextTitle = this.getFirstText(title);
        if (firstTextTitle) return firstTextTitle;
      }
    }
    const instance = this.element.getInstance('Collapse');
    if (instance) {
      const button = instance.buttons.filter(button => button.isPrimary)[0];
      if (button) {
        const firstTextBtn = this.getFirstText(button);
        if (firstTextBtn) return firstTextBtn;
      }
    }
    return 'transcription';
  }

  get component () {
    return ID$2;
  }
}

const integrateTranscription = (selector = '') => {
  api.internals.register(joinSelector(TranscriptionSelector.COLLAPSE, selector), TranscriptionActionee);
};

const TRANSLATE = api.internals.ns.selector('translate');
const COLLAPSE = api.internals.ns.selector('collapse');

const TranslateSelector = {
  BUTTON: `${TRANSLATE}__btn`,
  COLLAPSE: `${TRANSLATE} > ${COLLAPSE}, ${TRANSLATE} > *:not(${TRANSLATE}):not(${COLLAPSE}) > ${COLLAPSE}, ${TRANSLATE} > *:not(${TRANSLATE}):not(${COLLAPSE}) > *:not(${TRANSLATE}):not(${COLLAPSE}) > ${COLLAPSE}`,
  COLLAPSE_LEGACY: `${TRANSLATE} ${COLLAPSE}`
};

const ID$1 = 'translate';

class TranslateActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TranslateActionee';
  }

  get label () {
    const button = this.node.querySelector(TranslateSelector.BUTTON);
    if (button) {
      const title = button.getAttribute('title');
      if (title) return title;
    }

    return 'sélecteur de langue';
  }

  get component () {
    return ID$1;
  }
}

class TranslateButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TranslateButtonActionee';
  }

  init () {
    this.isMuted = true;
  }

  get button () {
    return this.element.getInstance('CollapseButton');
  }

  get label () {
    const label = this.getInteractionLabel();
    if (label) return label;
    return 'bouton sélecteur de langue';
  }

  get component () {
    return ID$1;
  }
}

const integrateTranslate = (selector = '') => {
  api.internals.register(joinSelector(TranslateSelector.COLLAPSE, selector), TranslateActionee);
  api.internals.register(joinSelector(TranslateSelector.BUTTON, selector), TranslateButtonActionee);
};

const UploadSelector = {
  UPLOAD: api.internals.ns.selector('upload')
};

const ID = 'upload';

class UploadActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'UploadActionee';
  }

  init () {
    this.setChangeType();
    this._label = this.node.parentNode.querySelector(api.internals.ns.selector('label'));
    this.listenChange();
  }

  setChangeValue (e) {
    if (!e.target || !e.target.files) return;
    const value = Array.from(e.target.files).map(file => /(?:\.([^.]+))?$/.exec(file.name)[1]).filter((name, index, array) => array.indexOf(name) === index).join(' - ');
    if (value) this.value = value;
  }

  get label () {
    if (this._label) {
      const text = this.getFirstText(this._label);
      if (text) return text;
    }

    return 'ajout de fichier';
  }

  get component () {
    return ID;
  }
}

const integrateUpload = (selector = '') => {
  api.internals.register(joinSelector(UploadSelector.UPLOAD, selector), UploadActionee);
};

const integrateComponents = (selector = '') => {
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

const integration = (selector) => {
  integrateAttributes();
  integrateComponents(selector);
};

api.analytics.readiness.then(() => {
  const selector = api.analytics._collector.isActionReduced ? api.internals.ns.attr.selector('analytics-action') : '';
  integration(selector);
}, () => {});
//# sourceMappingURL=analytics.module.js.map

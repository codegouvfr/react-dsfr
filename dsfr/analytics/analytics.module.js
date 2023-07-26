/*! DSFR v1.9.3 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.9.3'
};

const api = window[config.namespace];

const patch = {
  namespace: 'a4e35ba2a938ba9d007689dbf3f46acbb9807869'
};

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

const ActionMode = {
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

const ActionStatus = {
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

const getParametersLayer = (data) => {
  return Object.entries(data).map(([key, value]) => ['actionpname', normalize(key), 'actionpvalue', normalize(value)]).flat();
};

class Action {
  constructor (name) {
    this._isMuted = false;
    this._name = name;
    this._status = ActionStatus.UNSTARTED;
    this._labels = [];
    this._parameters = {};
  }

  get isMuted () {
    return this._isMuted;
  }

  set isMuted (value) {
    this._isMuted = value;
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

  singularize () {
    this._status = ActionStatus.SINGULAR;
  }

  rewind () {
    switch (this._status) {
      case ActionStatus.STARTED:
      case ActionStatus.ENDED:
        this._status = ActionStatus.UNSTARTED;
    }
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

  _getLayer (mode, data = {}) {
    if (this._isMuted) return [];
    const layer = this._base;
    switch (mode) {
      case ActionMode.IN:
      case ActionMode.OUT:
        layer.push('actionmode', mode);
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
    let mode;
    switch (this._status) {
      case ActionStatus.UNSTARTED:
        mode = ActionMode.IN;
        this._status = ActionStatus.STARTED;
        break;

      case ActionStatus.SINGULAR:
        mode = ActionMode.NONE;
        break;

      default:
        api.inspector.error(`unexpected start on action ${this._name} with status ${this._status.id}`);
        return [];
    }
    return this._getLayer(mode, data);
  }

  end (data) {
    let mode;
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
    this._isRatingEnabled = false;
  }

  configure (config) {
    this._isRatingEnabled = config.enableRating === true;
  }

  get isRatingEnabled () {
    return this._isRatingEnabled;
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

  appendStartingAction (action, data) {
    if (!action || this._startingActions.some(queued => queued.test(action))) {
      api.inspector.log('appendStartingAction exists or null', action);
      return;
    }
    const queued = new QueuedAction(action, data);
    this._startingActions.push(queued);
    this._request();
  }

  appendEndingAction (action, data) {
    if (!action || this._endingActions.some(queued => queued.test(action))) {
      api.inspector.log('appendEndingAction exists or null', action);
      return;
    }
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

    if (this._type === PushType.COLLECTOR) {
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

const Profile = {
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

  set profile (id) {
    this._profile = Object.values(Profile).filter(profile => profile.id === id || profile.value === id)[0];
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
    if (this._profile) layer.push('profile', this._profile.value);
    if (this._type) layer.push('user_type', this._type.value);
    return layer;
  }
}

User.Status = Status;
User.Profile = Profile;
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
    if (this.api) layer.push('api_version', this.api);
    return layer;
  }
}

Site.Environment = Environment;

class Page {
  constructor (config) {
    this._config = config || {};
  }

  reset (clear = false) {
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
  }

  set path (value) {
    const valid = validateString(value, 'page.path');
    if (valid !== null) this._path = valid;
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
    const layer = [];
    if (this.path) layer.push('path', normalize(this.path));
    if (this.referrer) layer.push('referrer', normalize(this.referrer));
    if (this.title) layer.push('page_title', normalize(this.title));
    if (this.name) layer.push('page_name', normalize(this.name));

    const labels = this._labels.slice(0, 5);
    labels.length = 5;
    if (labels.some(label => label)) layer.push('pagelabel', labels.map(label => typeof label === 'string' ? normalize(label) : '').join(','));

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

class Location {
  constructor (onChange, isListeningHash = false) {
    this._onChange = onChange;
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
    this._onChange();
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

    this._user = new User(config.user);
    this._site = new Site(config.site);
    this._page = new Page(config.page);
    this._search = new Search(config.search);
    this._funnel = new Funnel(config.funnel);

    this._isCollected = false;
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
    const handleChange = this._handleChange.bind(this);
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
  }

  _handleChange () {
    queue.send(true);
    this._delay = 6;
    renderer.add(this);
  }

  render () {
    this._delay--;
    if (this._delay < 0) {
      renderer.remove(this);
      this._changed();
    }
  }

  _changed () {
    this._isCollected = false;
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
    if (this._isCollected) return;
    queue.collect();
    this._isCollected = true;
  }

  get collection () {
    return this._collection;
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
      case window[patch.namespace] !== undefined:
        this._config = window[patch.namespace].configuration.analytics;
        window[patch.namespace].promise.then(this._build.bind(this), () => {});
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
    actions.configure(this._config);

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
    const heading = this._node.closest(selector);
    if (heading) {
      this._level = Number(heading.tagName.charAt(1)) - 1;
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
  constructor (node, type, id, category = '', title = null, parameters = {}, isRatingActive) {
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
    if (this._type.isBeginning) queue.appendStartingAction(this._action, data);
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

ActionElement.isRatingEnabled = false;

class Actionee extends api.core.Instance {
  constructor (priority = -1, isRatingActive = false, category = '', title = null) {
    super();
    this._type = null;
    this._priority = priority;
    this._category = category;
    this._title = title;
    this._parameters = {};
    this._data = {};
    this._isMuted = false;
    this._isRatingActive = isRatingActive;
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
      this._isMuted = true;
      return;
    }

    this._actionElement = new ActionElement(this.node, this._type, this.id, this._category, this._title, this._parameters, this._isRatingActive);
    if (this._isMuted) this._actionElement.isMuted = true;

    this.addDescent(ActioneeEmission.REWIND, this.rewind.bind(this));

    const actionees = element.instances.filter(instance => instance.isActionee && instance.type).sort((a, b) => b.priority - a.priority);
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

  listenClick (target) {
    if (target) {
      this._clickTarget = target;
      this._clickHandler = this.handleClick.bind(this);
      this._clickTarget.addEventListener('click', this._clickHandler, { capture: true });
    } else this.listen('click', this.handleClick.bind(this), { capture: true });
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
      this._clickTarget.removeEventListener('click', this._clickHandler);
    }
    super.dispose();
  }
}

class AttributeActionee extends Actionee {
  constructor () {
    super(100);
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
  constructor (priority = -1, isRatingActive = false) {
    super(priority, isRatingActive, 'dsfr_component');
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
    this._inputValidationHandler = this._handleInputValidation.bind(this);
    if (this._validatedInput) this._validatedInput.addEventListener('keydown', this._inputValidationHandler);
  }

  _handleInputValidation (e) {
    if (e.keyCode === 13) this._actValidatedInput();
  }

  _actValidatedInput () {
    if (this._isActingValidatedInput) return;
    this._isActingValidatedInput = true;
    if (this._isSendingInputValue) this.value = this._validatedInput.value.trim();
    this.act();
    this.request(() => { this._isActingValidatedInput = false; });
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
      this._validatedInput.removeEventListener('keydown', this._inputValidationHandler);
    }

    super.dispose();
  }
}

const AccordionSelector = {
  ACCORDION: api.internals.ns.selector('accordion'),
  TITLE: api.internals.ns.selector('accordion__title')
};

const ID$B = 'accordion';

class AccordionButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'AccordionButtonActionee';
  }

  init () {
    this.setClickType();
    this.id = this.node.id || this.registration.creator.node.id;
    this.listenClick();
  }

  get button () {
    return this.element.getInstance('CollapseButton');
  }

  handleClick () {
    if (this.button && !this.button.disclosed) this.act();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'bouton d\'accordéon';
  }

  get component () {
    return ID$B;
  }
}

class AccordionActionee extends ComponentActionee {
  constructor () {
    super(2, true);
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
    return ID$B;
  }

  dispose () {
    super.dispose();
  }
}

const BreadcrumbSelector = {
  LINK: api.internals.ns.selector('breadcrumb__link'),
  COLLAPSE: `${api.internals.ns.selector('breadcrumb')} ${api.internals.ns.selector('collapse')}`
};

class BreadcrumbButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'BreadcrumbButtonActionee';
  }

  init () {
    if (this.isBreakpoint(api.core.Breakpoints.MD)) return;
    this.setClickType();
    this.id = this.node.id || this.registration.creator.node.id;
    this.listenClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;
    return 'voir le fil d\'ariane';
  }

  get component () {
    return null;
  }
}

const ID$A = 'breadcrumb';

class BreadcrumbActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'BreadcrumbActionee';
  }

  init () {
    if (!this.isBreakpoint(api.core.Breakpoints.MD)) {
      this.setDiscloseType();
      this.register(`[aria-controls="${this.id}"]`, BreadcrumbButtonActionee);
      this.listenDisclose();
    } else {
      this.setImpressionType();
    }
  }

  get label () {
    return 'fil d\'ariane';
  }

  get component () {
    return ID$A;
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
    this.listenClick();
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

const ButtonSelector = {
  BUTTON: `${api.internals.ns.selector('btn')}:not(${api.internals.ns.selector('btn--close')})`
};

const ID$z = 'button';

class ButtonActionee extends ComponentActionee {
  constructor () {
    super(1, true);
    this._data = {};
  }

  static get instanceClassName () {
    return 'ButtonActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
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
    return ID$z;
  }
}

const AlertSelector = {
  ALERT: api.internals.ns.selector('alert'),
  TITLE: api.internals.ns.selector('alert__title')
};

const ID$y = 'alert';

class AlertActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'AlertActionee';
  }

  init () {
    this.setImpressionType();
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
    return ID$y;
  }
}

const BadgeSelector = {
  BADGE: api.internals.ns.selector('badge')
};

const ID$x = 'badge';

class BadgeActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'BadgeActionee';
  }

  init () {
    this.setImpressionType();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'badge';
  }

  get component () {
    return ID$x;
  }
}

const CalloutSelector = {
  CALLOUT: api.internals.ns.selector('callout'),
  TITLE: api.internals.ns.selector('callout__title')
};

const ID$w = 'callout';

class CalloutActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'CalloutActionee';
  }

  init () {
    this.setImpressionType();
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
    return ID$w;
  }
}

const ConnectSelector = {
  CONNECT: api.internals.ns.selector('connect'),
  LINK: api.internals.ns.selector('connect + * a, connect + a')
};

const ID$v = 'connect';

class ConnectActionee extends ComponentActionee {
  constructor () {
    super(1, true);
  }

  static get instanceClassName () {
    return 'ConnectActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
  }

  get label () {
    if (this.node.classList.contains('fr-connect--plus')) return 'FranceConnect+';
    return 'FranceConnect';
  }

  get component () {
    return ID$v;
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
    this.listenClick();
  }

  get label () {
    return this.getFirstText() || 'qu\'est-ce que FranceConnect ?';
  }

  get component () {
    return ID$v;
  }
}

const ContentSelector = {
  CONTENT: api.internals.ns.selector('content-media'),
  IMG: api.internals.ns.selector('content-media__img')
};

const ID$u = 'content-media';

class ContentActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'ContentActionee';
  }

  init () {
    this.setImpressionType();
  }

  _getImageLabel () {
    const contentImg = this.querySelector(ContentSelector.IMG);
    if (!contentImg) return false;
    const img = contentImg.getElementsByTagName('img')[0];
    if (img) {
      const alt = img.getAttribute('alt');
      if (alt) return alt;
      const ariaLabel = img.getAttribute('aria-label');
      if (ariaLabel) return ariaLabel;
    }
    const svg = contentImg.getElementsByTagName('svg')[0];
    if (svg) {
      const ariaLabel = svg.getAttribute('aria-label');
      if (ariaLabel) return ariaLabel;
      const title = svg.querySelector('title');
      if (title) {
        const textContent = title.textContent;
        if (textContent) return textContent.trim();
      }
    }
    return false;
  }

  get label () {
    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;

    const imageLabel = this._getImageLabel();
    if (imageLabel) return imageLabel;

    const iframe = this.querySelector('iframe');
    if (iframe) {
      const title = iframe.getAttribute('title');
      if (title) return title;
      const ariaLabel = iframe.getAttribute('aria-label');
      if (ariaLabel) return ariaLabel;
    }

    const video = this.querySelector('video');
    if (video) {
      const ariaLabel = video.getAttribute('aria-label');
      if (ariaLabel) return ariaLabel;
    }

    return 'contenu média';
  }

  get component () {
    return ID$u;
  }
}

const ConsentSelector = {
  BANNER: api.internals.ns.selector('consent-banner')
};

const ID$t = 'consent';

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
    return ID$t;
  }
}

const CardSelector = {
  CARD: api.internals.ns.selector('card'),
  LINK: `${api.internals.ns.selector('card__title')} a`,
  TITLE: api.internals.ns.selector('card__title')
};

const ID$s = 'card';

class CardActionee extends ComponentActionee {
  constructor () {
    super(1, true);
  }

  static get instanceClassName () {
    return 'CardActionee';
  }

  init () {
    const link = this.node.querySelector(CardSelector.LINK);
    if (link) {
      this.link = link;
      this.detectInteractionType(link);
      this.listenClick(link);
    } else this.setImpressionType();
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
    return ID$s;
  }
}

const CheckboxSelector = {
  INPUT: api.internals.ns.selector('checkbox-group [type="checkbox"]')
};

const ID$r = 'checkbox';

class CheckboxActionee extends ComponentActionee {
  constructor () {
    super(1, true);
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
    return ID$r;
  }
}

const DownloadSelector = {
  LINK: api.internals.ns.selector('download__link')
};

const ID$q = 'download';

class DownloadActionee extends ComponentActionee {
  constructor () {
    super(1, true);
  }

  static get instanceClassName () {
    return 'DownloadActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
  }

  get label () {
    const text = this.getFirstText();
    if (text) return text;
    return 'téléchargement';
  }

  get component () {
    return ID$q;
  }
}

const FooterSelector = {
  FOOTER: api.internals.ns.selector('footer'),
  FOOTER_LINKS: `${api.internals.ns.selector('footer')} a[href], ${api.internals.ns.selector('footer')} button`
};

const ID$p = 'footer';

class FooterActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'FooterActionee';
  }

  init () {
    this.setImpressionType();
  }

  get label () {
    return 'pied de page';
  }

  get component () {
    return ID$p;
  }
}

const FollowSelector = {
  FOLLOW: api.internals.ns.selector('follow'),
  NEWSLETTER_INPUT_GROUP: api.internals.ns.selector('follow__newsletter') + ' ' + api.internals.ns.selector('input-group')
};

const ID$o = 'follow';

class FollowActionee extends ComponentActionee {
  constructor () {
    super(2, true);
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

class FooterLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'FooterLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
  }

  get label () {
    const label = this.getInteractionLabel();
    if (label) return label;

    return 'lien pied de page';
  }
}

const ID$n = 'header';

class HeaderActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'HeaderActionee';
  }

  init () {
    this.setImpressionType();
  }

  get label () {
    return 'en-tête';
  }

  get component () {
    return ID$n;
  }
}

const HeaderSelector = {
  TOOLS_BUTTON: `${api.internals.ns.selector('header__tools-links')} ${api.internals.ns.selector('btns-group')} ${api.internals.ns.selector('btn')}`,
  MENU_BUTTON: `${api.internals.ns.selector('header__menu-links')} ${api.internals.ns.selector('btns-group')} ${api.internals.ns.selector('btn')}`
};

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
    super(null, 0);
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

const HighlightSelector = {
  HIGHLIGHT: api.internals.ns.selector('highlight')
};

const ID$m = 'highlight';

class HighlightActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'HighlightActionee';
  }

  init () {
    this.setImpressionType();
  }

  get label () {
    return 'mise en exergue';
  }

  get component () {
    return ID$m;
  }
}

const InputSelector = {
  INPUT: api.internals.ns.selector('input-group')
};

const ID$l = 'input';

class InputActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'InputActionee';
  }

  init () {
    this.setImpressionType();
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
    return ID$l;
  }
}

const LinkSelector = {
  LINK: api.internals.ns.selector('link')
};

const ID$k = 'link';

class LinkActionee extends ComponentActionee {
  constructor () {
    super(1, true);
  }

  static get instanceClassName () {
    return 'LinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
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

const ModalSelector = {
  TITLE: api.internals.ns.selector('modal__title')
};

const ID$j = 'modal';

class ModalActionee extends ComponentActionee {
  constructor () {
    super(2, true);
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
    return ID$j;
  }
}

const NavigationSelector = {
  LINK: api.internals.ns.selector('nav__link'),
  BUTTON: api.internals.ns.selector('nav__btn')
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

const ID$i = 'navigation';

class NavigationLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'NavigationLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'lien de navigation';
  }

  get component () {
    return ID$i;
  }
}

const NoticeSelector = {
  NOTICE: api.internals.ns.selector('notice'),
  TITLE: api.internals.ns.selector('notice__title')
};

const ID$h = 'notice';

class NoticeActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'NoticeActionee';
  }

  init () {
    this.setImpressionType();
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
    return ID$h;
  }
}

const PaginationSelector = {
  PAGINATION: api.internals.ns.selector('pagination'),
  LINK: api.internals.ns.selector('pagination__link'),
  NEXT_LINK: api.internals.ns.selector('pagination__link--next'),
  LAST_LINK: api.internals.ns.selector('pagination__link--last'),
  ANALYTICS_TOTAL: api.internals.ns.attr('analytics-page-total'),
  CURRENT: '[aria-current="page"]'
};

const ID$g = 'pagination';

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
    return ID$g;
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
    this.listenClick();
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

const RadioSelector = {
  INPUT: api.internals.ns.selector('radio-group [type="radio"]')
};

const FormSelector = {
  LABEL: api.internals.ns.selector('label'),
  FIELDSET: api.internals.ns.selector('fieldset'),
  LEGEND: api.internals.ns.selector('fieldset__legend')
};

const ID$f = 'radio';

class RadioActionee extends ComponentActionee {
  constructor () {
    super(1, true);
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
    return ID$f;
  }
}

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

  init () {
    this.setImpressionType();
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

const SearchSelector = {
  SEARCH_BAR: api.internals.ns.selector('search-bar')
};

const ID$d = 'search';

class SearchActionee extends ComponentActionee {
  constructor () {
    super(2, true);
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
    return ID$d;
  }
}

const SelectSelector = {
  SELECT: api.internals.ns.selector('select')
};

const ID$c = 'select';

class SelectActionee extends ComponentActionee {
  constructor () {
    super(1, true);
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
    return ID$c;
  }
}

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

const ID$b = 'sidemenu';

class SidemenuLinkActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'SidemenuLinkActionee';
  }

  init () {
    this.detectInteractionType();
    this.listenClick();
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'lien menu latéral';
  }

  get component () {
    return ID$b;
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

const ShareSelector = {
  SHARE: api.internals.ns.selector('share'),
  TITLE: api.internals.ns.selector('share__title')
};

const ID$a = 'share';

class ShareActionee extends ComponentActionee {
  constructor () {
    super(1, true);
  }

  static get instanceClassName () {
    return 'ShareActionee';
  }

  init () {
    this.setImpressionType();
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

const StepperSelector = {
  STEPPER: api.internals.ns.selector('stepper')
};

const ID$9 = 'stepper';

class StepperActionee extends ComponentActionee {
  constructor () {
    super(1);
  }

  static get instanceClassName () {
    return 'StepperActionee';
  }

  init () {
    this.setImpressionType();
  }

  get label () {
    return 'indicateur d\'étapes';
  }

  get component () {
    return ID$9;
  }
}

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
    this.listenClick();
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

const ID$7 = 'tab';

class TabButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TabButtonActionee';
  }

  init () {
    this.setClickType();
    this.id = this.node.id || this.registration.creator.node.id;
    this.listen('click', this.click.bind(this), { capture: true });
  }

  click () {
    this.act();
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
    super(2, true);
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

  init () {
    this.setImpressionType();
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

const TileSelector = {
  TILE: api.internals.ns.selector('tile'),
  LINK: `${api.internals.ns.selector('tile__link')}`,
  TITLE: api.internals.ns.selector('tile__title')
};

const ID$5 = 'tile';

class TileActionee extends ComponentActionee {
  constructor () {
    super(1, true);
  }

  static get instanceClassName () {
    return 'TileActionee';
  }

  init () {
    const link = this.node.querySelector(TileSelector.LINK);
    if (link) {
      this.link = link;
      this.detectInteractionType(link);
      this.listenClick(link);
    } else this.setImpressionType();
  }

  get label () {
    const tileTitle = this.node.querySelector(TileSelector.TITLE);
    if (tileTitle) return this.getFirstText(tileTitle);

    const heading = this.getHeadingLabel();
    if (heading) return heading;

    return 'tuile';
  }

  get component () {
    return ID$5;
  }
}

const ToggleSelector = {
  INPUT: api.internals.ns.selector('toggle [type="checkbox"]')
};

const ID$4 = 'toggle';

class ToggleActionee extends ComponentActionee {
  constructor () {
    super(1, true);
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
    return ID$4;
  }
}

const TagSelector = {
  TAG: api.internals.ns.selector('tag'),
  PRESSABLE: '[aria-pressed]',
  DISMISSIBLE: `${api.internals.ns.selector('tag--dismiss', '')}`
};

const ID$3 = 'tag';

class TagActionee extends ComponentActionee {
  constructor () {
    super(2, true);
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
        this.listenClick();
        break;

      case this.isInteractive:
        this.detectInteractionType();
        this.listenClick();
        break;

      default:
        this.setImpressionType();
    }
  }

  get label () {
    const firstText = this.getFirstText();
    if (firstText) return firstText;

    return 'tag';
  }

  get component () {
    return ID$3;
  }
}

const TranscriptionSelector = {
  TRANSCRIPTION: api.internals.ns.selector('transcription'),
  COLLAPSE: `${api.internals.ns.selector('transcription')} ${api.internals.ns.selector('collapse')}`,
  TITLE: api.internals.ns.selector('transcription__title')
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
    this.setClickType();
    this.id = this.node.id || this.registration.creator.node.id;
    this.listenClick();
  }

  get button () {
    return this.element.getInstance('CollapseButton');
  }

  handleClick () {
    const button = this.button;
    if (button && !button.disclosed) this.act();
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
    super(2, true);
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

const TranslateSelector = {
  BUTTON: api.internals.ns.selector('translate__btn')
};

const ID$1 = 'translate';

class TranslateButtonActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TranslateButtonActionee';
  }

  init () {
    this.setClickType();
    this.id = this.node.id || this.registration.creator.node.id;
    this.listenClick();
  }

  get button () {
    return this.element.getInstance('CollapseButton');
  }

  handleClick () {
    const button = this.button;
    if (button && !button.disclosed) this.act();
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

class TranslateActionee extends ComponentActionee {
  constructor () {
    super(2);
  }

  static get instanceClassName () {
    return 'TranslateActionee';
  }

  init () {
    this.setDiscloseType();
    this.register(`[aria-controls="${this.id}"]`, TranslateButtonActionee);
    this.listenDisclose();
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

const UploadSelector = {
  UPLOAD: api.internals.ns.selector('upload')
};

const ID = 'upload';

class UploadActionee extends ComponentActionee {
  constructor () {
    super(1, true);
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

const integrateComponents = () => {
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

const integration = () => {
  integrateAttributes();
  integrateComponents();
};

api.analytics.readiness.then(() => integration(), () => {});
//# sourceMappingURL=analytics.module.js.map

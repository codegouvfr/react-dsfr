/*! DSFR v1.13.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

class State {
  constructor () {
    this.modules = {};
  }

  create (ModuleClass) {
    const module = new ModuleClass();
    this.modules[module.type] = module;
  }

  getModule (type) {
    return this.modules[type];
  }

  add (type, item) {
    this.modules[type].add(item);
  }

  remove (type, item) {
    this.modules[type].remove(item);
  }

  get isActive () {
    return this._isActive;
  }

  set isActive (value) {
    if (value === this._isActive) return;
    this._isActive = value;
    const values = Object.keys(this.modules).map((e) => {
      return this.modules[e];
    });
    if (value) {
      for (const module of values) {
        module.activate();
      }
    } else {
      for (const module of values) {
        module.deactivate();
      }
    }
  }

  get isLegacy () {
    return this._isLegacy;
  }

  set isLegacy (value) {
    if (value === this._isLegacy) return;
    this._isLegacy = value;
  }
}

const state = new State();

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.13.0'
};

class LogLevel {
  constructor (level, light, dark, logger) {
    this.level = level;
    this.light = light;
    this.dark = dark;

    switch (logger) {
      case 'warn':
        this.logger = console.warn;
        break;

      case 'error':
        this.logger = console.error;
        break;

      default:
        this.logger = console.log;
    }
  }

  log (...values) {
    const message = new Message(config.namespace);
    for (const value of values) message.add(value);
    this.print(message);
  }

  print (message) {
    message.setColor(this.color);
    this.logger.apply(console, message.getMessage());
  }

  get color () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.dark : this.light;
  }
}

class Message {
  constructor (domain) {
    this.inputs = ['%c'];
    this.styles = ['font-family:Marianne', 'line-height: 1.5'];
    this.objects = [];

    if (domain) this.add(`${domain} :`);
  }

  add (value) {
    switch (typeof value) {
      case 'object':
      case 'function':
        this.inputs.push('%o ');
        this.objects.push(value);
        break;

      default:
        this.inputs.push(`${value} `);
    }
  }

  setColor (color) {
    this.styles.push(`color:${color}`);
  }

  getMessage () {
    return [this.inputs.join(''), this.styles.join(';'), ...this.objects];
  }
}

const LEVELS = {
  log: new LogLevel(0, '#616161', '#989898'),
  debug: new LogLevel(1, '#000091', '#8B8BFF'),
  info: new LogLevel(2, '#007c3b', '#00ed70'),
  warn: new LogLevel(3, '#ba4500', '#fa5c00', 'warn'),
  error: new LogLevel(4, '#D80600', '#FF4641', 'error')
};

class Inspector {
  constructor () {
    this.level = 2;

    for (const id in LEVELS) {
      const level = LEVELS[id];
      this[id] = (...msgs) => {
        if (this.level <= level.level) level.log.apply(level, msgs);
      };
      this[id].print = level.print.bind(level);
    }
  }

  state () {
    const message = new Message();
    message.add(state);
    this.log.print(message);
  }

  tree () {
    const stage = state.getModule('stage');
    if (!stage) return;
    const message = new Message();
    this._branch(stage.root, 0, message);
    this.log.print(message);
  }

  _branch (element, space, message) {
    let branch = '';
    if (space > 0) {
      let indent = '';
      for (let i = 0; i < space; i++) indent += '    ';
      // branch += indent + '|\n';
      branch += indent + '└─ ';
    }
    branch += `[${element.id}] ${element.html}`;
    message.add(branch);
    message.add({ '@': element });
    message.add('\n');
    for (const child of element.children) branch += this._branch(child, space + 1, message);
  }
}

const inspector = new Inspector();

const startAtDomContentLoaded = (callback) => {
  if (document.readyState !== 'loading') window.requestAnimationFrame(callback);
  else document.addEventListener('DOMContentLoaded', callback);
};

const startAuto = (callback) => {
  // detect
  startAtDomContentLoaded(callback);
};

const Modes = {
  AUTO: 'auto',
  MANUAL: 'manual',
  RUNTIME: 'runtime',
  LOADED: 'loaded',
  VUE: 'vue',
  ANGULAR: 'angular',
  REACT: 'react'
};

const dispatch = (node, type, detail = null, bubbles = true, cancelable = false) => {
  const options = { bubbles: bubbles === true, cancelable: cancelable === true };
  if (detail) options.detail = detail;
  const event = new CustomEvent(type, options);
  node.dispatchEvent(event);
};

const rootDispatch = (type, detail = null, bubbles = false, cancelable = false) => dispatch(document.documentElement, type, detail, bubbles, cancelable);

const ns = name => `${config.prefix}-${name}`;

ns.selector = (name, notation) => {
  if (notation === undefined) notation = '.';
  return `${notation}${ns(name)}`;
};

ns.attr = (name) => `data-${ns(name)}`;

ns.attr.selector = (name, value) => {
  let result = ns.attr(name);
  if (value !== undefined) result += `="${value}"`;
  return `[${result}]`;
};

ns.event = (type) => `${config.namespace}.${type}`;

ns.emission = (domain, type) => `emission:${domain}.${type}`;

const RootEvent = {
  READY: ns.event('ready'),
  START: ns.event('start'),
  STOP: ns.event('stop'),
  RENDER: ns.event('render'),
  RESIZE: ns.event('resize'),
  BREAKPOINT: ns.event('breakpoint'),
  SCROLL_LOCK: ns.event('scroll-lock'),
  SCROLL_UNLOCK: ns.event('scroll-unlock')
};

class Options {
  constructor () {
    this._mode = Modes.AUTO;
    this.isStarted = false;
    this.starting = this.start.bind(this);
    this.preventManipulation = false;
  }

  configure (settings = {}, start, query) {
    this.startCallback = start;
    const isProduction = settings.production && (!query || query.production !== 'false');
    switch (true) {
      case query && !isNaN(query.level):
        inspector.level = Number(query.level);
        break;

      case query && query.verbose && (query.verbose === 'true' || query.verbose === 1):
        inspector.level = 0;
        break;

      case isProduction:
        inspector.level = 999;
        break;

      case settings.verbose:
        inspector.level = 0;
        break;
    }
    inspector.info(`version ${config.version}`);
    rootDispatch(RootEvent.READY);
    this.mode = settings.mode || Modes.AUTO;
  }

  set mode (value) {
    switch (value) {
      case Modes.AUTO:
        this.preventManipulation = false;
        startAuto(this.starting);
        break;

      case Modes.LOADED:
        this.preventManipulation = false;
        startAtDomContentLoaded(this.starting);
        break;

      case Modes.RUNTIME:
        this.preventManipulation = false;
        this.start();
        break;

      case Modes.MANUAL:
        this.preventManipulation = false;
        break;

      case Modes.VUE:
        this.preventManipulation = true;
        break;

      case Modes.ANGULAR:
        this.preventManipulation = true;
        break;

      case Modes.REACT:
        this.preventManipulation = true;
        break;

      default:
        inspector.error('Illegal mode');
        return;
    }

    this._mode = value;
    inspector.info(`mode set to ${value}`);
  }

  get mode () {
    return this._mode;
  }

  start () {
    inspector.info('start');
    this.startCallback();
  }
}

const options = new Options();

class Collection {
  constructor () {
    this._collection = [];
  }

  forEach (callback) {
    this._collection.forEach(callback);
  }

  map (callback) {
    return this._collection.map(callback);
  }

  get length () {
    return this._collection.length;
  }

  add (collectable) {
    if (this._collection.indexOf(collectable) > -1) return false;
    this._collection.push(collectable);
    if (this.onAdd) this.onAdd();
    if (this.onPopulate && this._collection.length === 1) this.onPopulate();
    return true;
  }

  remove (collectable) {
    const index = this._collection.indexOf(collectable);
    if (index === -1) return false;
    this._collection.splice(index, 1);
    if (this.onRemove) this.onRemove();
    if (this.onEmpty && this._collection.length === 0) this.onEmpty();
  }

  execute (...args) {
    for (const collectable of this._collection) if (collectable) collectable.apply(null, args);
  }

  clear () {
    this._collection.length = 0;
  }

  clone () {
    const clone = new Collection();
    clone._collection = this._collection.slice();
    return clone;
  }

  get collection () {
    return this._collection;
  }
}

class Module extends Collection {
  constructor (type) {
    super();
    this.type = type;
    this.isActive = false;
  }

  activate () {}
  deactivate () {}
}

const querySelectorAllArray = (element, selectors) => Array.prototype.slice.call(element.querySelectorAll(selectors));

const queryParentSelector = (element, selectors) => {
  const parent = element.parentElement;
  if (parent.matches(selectors)) return parent;
  if (parent === document.documentElement) return null;
  return queryParentSelector(parent, selectors);
};

class Registration {
  constructor (selector, InstanceClass, creator) {
    this.selector = selector;
    this.InstanceClass = InstanceClass;
    this.creator = creator;
    this.instances = new Collection();
    this.isIntroduced = false;
    this._instanceClassName = this.InstanceClass.instanceClassName;
    this._instanceClassNames = this.getInstanceClassNames(this.InstanceClass);
    this._property = this._instanceClassName.substring(0, 1).toLowerCase() + this._instanceClassName.substring(1);
    const dashed = this._instanceClassName
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([0-9])([^0-9])/g, '$1-$2')
      .replace(/([^0-9])([0-9])/g, '$1-$2')
      .toLowerCase();
    this._attribute = ns.attr(`js-${dashed}`);
  }

  getInstanceClassNames (InstanceClass) {
    const prototype = Object.getPrototypeOf(InstanceClass);
    if (!prototype || prototype.instanceClassName === 'Instance') return [InstanceClass.instanceClassName];
    return [...this.getInstanceClassNames(prototype), InstanceClass.instanceClassName];
  }

  hasInstanceClassName (instanceClassName) {
    return this._instanceClassNames.indexOf(instanceClassName) > -1;
  }

  introduce () {
    if (this.isIntroduced) return;
    this.isIntroduced = true;
    state.getModule('stage').parse(document.documentElement, this);
  }

  parse (node, nonRecursive) {
    const nodes = [];
    if (node.matches && node.matches(this.selector)) nodes.push(node);
    // eslint-disable-next-line no-useless-call
    if (!nonRecursive && node.querySelectorAll && node.querySelector(this.selector)) nodes.push.apply(nodes, querySelectorAllArray(node, this.selector));
    return nodes;
  }

  create (element) {
    if (!element.node.matches(this.selector)) return;
    const instance = new this.InstanceClass();
    this.instances.add(instance);
    return instance;
  }

  remove (instance) {
    this.instances.remove(instance);
  }

  dispose () {
    const instances = this.instances.collection;
    for (let i = instances.length - 1; i > -1; i--) instances[i]._dispose();
    this.creator = null;
  }

  get instanceClassName () {
    return this._instanceClassName;
  }

  get instanceClassNames () {
    return this._instanceClassNames;
  }

  get property () {
    return this._property;
  }

  get attribute () {
    return this._attribute;
  }
}

class Register extends Module {
  constructor () {
    super('register');
  }

  register (selector, InstanceClass, creator) {
    const registration = new Registration(selector, InstanceClass, creator);
    this.add(registration);
    if (state.isActive) registration.introduce();
    return registration;
  }

  activate () {
    for (const registration of this.collection) registration.introduce();
  }

  remove (registration) {
    registration.dispose();
    super.remove(registration);
  }
}

let count = 0;

class Element$1 {
  constructor (node, id) {
    if (!id) {
      count++;
      this.id = count;
    } else this.id = id;
    this.node = node;
    this.attributeNames = [];
    this.instances = [];
    this._children = [];
    this._parent = null;
    this._projects = [];
  }

  get proxy () {
    const scope = this;
    if (!this._proxy) {
      this._proxy = {
        id: this.id,
        get parent () {
          return scope.parent ? scope.parent.proxy : null;
        },
        get children () {
          return scope.children.map((child) => child.proxy);
        }
      };

      for (const instance of this.instances) this._proxy[instance.registration.property] = instance.proxy;
    }
    return this._proxy;
  }

  get html () {
    if (!this.node || !this.node.outerHTML) return '';
    const end = this.node.outerHTML.indexOf('>');
    return this.node.outerHTML.substring(0, end + 1);
  }

  project (registration) {
    if (this._projects.indexOf(registration) === -1) this._projects.push(registration);
  }

  populate () {
    const projects = this._projects.slice();
    this._projects.length = 0;
    for (const registration of projects) this.create(registration);
  }

  create (registration) {
    if (this.hasInstance(registration.instanceClassName)) {
      // inspector.debug(`failed creation, instance of ${registration.instanceClassName} already exists on element [${this.id}]`);
      return;
    }
    inspector.debug(`create instance of ${registration.instanceClassName} on element [${this.id}]`);
    const instance = registration.create(this);
    this.instances.push(instance);
    instance._config(this, registration);
    if (this._proxy) this._proxy[registration.property] = instance.proxy;
  }

  remove (instance) {
    const index = this.instances.indexOf(instance);
    if (index > -1) this.instances.splice(index, 1);
    if (this._proxy) delete this._proxy[instance.registration.property];
  }

  get parent () {
    return this._parent;
  }

  get ascendants () {
    return [this.parent, ...this.parent.ascendants];
  }

  get children () {
    return this._children;
  }

  get descendants () {
    const descendants = [...this._children];
    this._children.forEach(child => descendants.push(...child.descendants));
    return descendants;
  }

  // TODO : emit ascendant et descendant de changement ?

  addChild (child, index) {
    if (this._children.indexOf(child) > -1) return null;
    child._parent = this;
    if (!isNaN(index) && index > -1 && index < this._children.length) this._children.splice(index, 0, child);
    else this._children.push(child);
    return child;
  }

  removeChild (child) {
    const index = this._children.indexOf(child);
    if (index === -1) return null;
    child._parent = null;
    this._children.splice(index, 1);
  }

  emit (type, data) {
    const elements = state.getModule('stage').collection;
    const response = [];
    for (const element of elements) response.push(...element._emit(type, data));
    return response;
  }

  _emit (type, data) {
    const response = [];
    for (const instance of this.instances) response.push(...instance._emitter.emit(type, data));
    return response;
  }

  ascend (type, data) {
    if (this._parent) return this._parent._ascend(type, data);
    return [];
  }

  _ascend (type, data) {
    const response = [];
    for (const instance of this.instances) response.push(...instance._ascent.emit(type, data));
    if (this._parent) response.push(...this._parent._ascend(type, data));
    return response;
  }

  descend (type, data) {
    const response = [];
    for (const child of this._children) response.push(...child._descend(type, data));
    return response;
  }

  _descend (type, data) {
    const response = [];
    for (const instance of this.instances) response.push(...instance._descent.emit(type, data));
    for (const child of this._children) response.push(...child._descend(type, data));
    return response;
  }

  getInstance (instanceClassName) {
    for (const instance of this.instances) if (instance.registration.hasInstanceClassName(instanceClassName)) return instance;
    return null;
  }

  hasInstance (instanceClassName) {
    return this.getInstance(instanceClassName) !== null;
  }

  getDescendantInstances (instanceClassName, stopAtInstanceClassName, stopAtFirstInstance) {
    if (!instanceClassName) return [];
    const instances = [];
    for (const child of this._children) {
      const instance = child.getInstance(instanceClassName);
      if (instance) {
        instances.push(instance);
        if (stopAtFirstInstance) continue;
      }
      if ((!stopAtInstanceClassName || !child.hasInstance(stopAtInstanceClassName)) && child.children.length) instances.push.apply(instances, child.getDescendantInstances(instanceClassName, stopAtInstanceClassName, stopAtFirstInstance));
    }
    return instances;
  }

  getAscendantInstance (instanceClassName, stopAtInstanceClassName) {
    if (!instanceClassName || !this._parent) return null;
    const instance = this._parent.getInstance(instanceClassName);
    if (instance) return instance;
    if (stopAtInstanceClassName && this._parent.hasInstance(stopAtInstanceClassName)) return null;
    return this._parent.getAscendantInstance(instanceClassName, stopAtInstanceClassName);
  }

  dispose () {
    for (let i = this.instances.length - 1; i >= 0; i--) {
      const instance = this.instances[i];
      if (instance) instance._dispose();
    }
    this.instances.length = 0;
    state.remove('stage', this);
    this.parent.removeChild(this);
    this._children.length = 0;
    inspector.debug(`remove element [${this.id}] ${this.html}`);
  }

  prepare (attributeName) {
    if (this.attributeNames.indexOf(attributeName) === -1) this.attributeNames.push(attributeName);
  }

  examine () {
    const attributeNames = this.attributeNames.slice();
    this.attributeNames.length = 0;
    for (let i = this.instances.length - 1; i > -1; i--) this.instances[i].examine(attributeNames);
  }
}

const RootEmission = {
  CLICK: ns.emission('root', 'click'),
  KEYDOWN: ns.emission('root', 'keydown'),
  KEYUP: ns.emission('root', 'keyup')
};

const KeyCodes = {
  TAB: {
    id: 'tab',
    value: 9
  },
  ESCAPE: {
    id: 'escape',
    value: 27
  },
  END: {
    id: 'end',
    value: 35
  },
  HOME: {
    id: 'home',
    value: 36
  },
  LEFT: {
    id: 'left',
    value: 37
  },
  UP: {
    id: 'up',
    value: 38
  },
  RIGHT: {
    id: 'right',
    value: 39
  },
  DOWN: {
    id: 'down',
    value: 40
  }
};

const getKeyCode = (keyCode) => Object.values(KeyCodes).filter(entry => entry.value === keyCode)[0];

class Root extends Element$1 {
  constructor () {
    super(document.documentElement, 'root');
    this.node.setAttribute(ns.attr('js'), true);
    this.listen();
  }

  listen () {
    // TODO v2 => listener au niveau des éléments qui redistribuent aux instances.
    document.documentElement.addEventListener('click', this.click.bind(this), { capture: true });
    document.documentElement.addEventListener('keydown', this.keydown.bind(this), { capture: true });
    document.documentElement.addEventListener('keyup', this.keyup.bind(this), { capture: true });
  }

  click (e) {
    this.emit(RootEmission.CLICK, e.target);
  }

  keydown (e) {
    this.emit(RootEmission.KEYDOWN, getKeyCode(e.keyCode));
  }

  keyup (e) {
    this.emit(RootEmission.KEYUP, getKeyCode(e.keyCode));
  }
}

class Stage extends Module {
  constructor () {
    super('stage');
    this.root = new Root();
    super.add(this.root);
    this.observer = new MutationObserver(this.mutate.bind(this));
    this.modifications = [];
    this.willModify = false;
    this.modifying = this.modify.bind(this);
  }

  hasElement (node) {
    for (const element of this.collection) if (element.node === node) return true;
    return false;
  }

  getElement (node) {
    for (const element of this.collection) if (element.node === node) return element;
    const element = new Element$1(node);
    this.add(element);
    inspector.debug(`add element [${element.id}] ${element.html}`);
    return element;
  }

  getProxy (node) {
    if (!this.hasElement(node)) return null;
    const element = this.getElement(node);
    return element.proxy;
  }

  add (element) {
    super.add(element);
    this.put(element, this.root);
  }

  put (element, branch) {
    let index = 0;
    for (let i = branch.children.length - 1; i > -1; i--) {
      const child = branch.children[i];
      const position = element.node.compareDocumentPosition(child.node);
      if (position & Node.DOCUMENT_POSITION_CONTAINS) {
        this.put(element, child);
        return;
      } else if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        branch.removeChild(child);
        element.addChild(child, 0);
      } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
        index = i + 1;
        break;
      }
    }

    branch.addChild(element, index);
  }

  activate () {
    this.observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  }

  deactivate () {
    this.observer.disconnect();
  }

  mutate (mutations) {
    const examinations = [];
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case 'childList':
          mutation.removedNodes.forEach((node) => this.dispose(node));
          mutation.addedNodes.forEach((node) => this.parse(node));
          break;

        case 'attributes':
          if (this.hasElement(mutation.target)) {
            const element = this.getElement(mutation.target);
            element.prepare(mutation.attributeName);
            if (examinations.indexOf(element) === -1) examinations.push(element);
            for (const descendant of element.descendants) if (examinations.indexOf(descendant) === -1) examinations.push(descendant);
          }
          if (this.modifications.indexOf(mutation.target) === -1) this.modifications.push(mutation.target);
          break;
      }
    });

    examinations.forEach(element => element.examine());
    if (this.modifications.length && !this.willModify) {
      this.willModify = true;
      window.requestAnimationFrame(this.modifying);
    }
  }

  modify () {
    this.willModify = false;
    const targets = this.modifications.slice();
    this.modifications.length = 0;
    for (const target of targets) if (document.documentElement.contains(target)) this.parse(target);
  }

  dispose (node) {
    const disposables = [];
    this.forEach((element) => {
      if (node.contains(element.node)) disposables.push(element);
    });

    for (const disposable of disposables) {
      disposable.dispose();
      this.remove(disposable);
    }
  }

  parse (node, registration, nonRecursive) {
    const registrations = registration ? [registration] : state.getModule('register').collection;
    const creations = [];

    for (const registration of registrations) {
      const nodes = registration.parse(node, nonRecursive);

      for (const n of nodes) {
        const element = this.getElement(n);
        element.project(registration);
        if (creations.indexOf(element) === -1) creations.push(element);
      }
    }

    for (const element of creations) element.populate();
  }
}

class Renderer extends Module {
  constructor () {
    super('render');
    this.rendering = this.render.bind(this);
    this.nexts = new Collection();
  }

  activate () {
    window.requestAnimationFrame(this.rendering);
  }

  request (instance) {
    this.nexts.add(instance);
  }

  render () {
    if (!state.isActive) return;
    window.requestAnimationFrame(this.rendering);
    this.forEach((instance) => instance.render());
    if (!this.nexts.length) return;
    const nexts = this.nexts.clone();
    this.nexts.clear();
    nexts.forEach((instance) => instance.next());
    rootDispatch(RootEvent.RENDER);
  }
}

class Resizer extends Module {
  constructor () {
    super('resize');
    this.requireResize = false;
    this.resizing = this.resize.bind(this);
    const requesting = this.request.bind(this);
    if (document.fonts) {
      document.fonts.ready.then(requesting);
    }
    window.addEventListener('resize', requesting);
    window.addEventListener('orientationchange', requesting);
  }

  activate () {
    this.request();
  }

  request () {
    if (this.requireResize) return;
    this.requireResize = true;
    window.requestAnimationFrame(this.resizing);
  }

  resize () {
    if (!this.requireResize) return;
    this.forEach((instance) => instance.resize());
    this.requireResize = false;
    rootDispatch(RootEvent.RESIZE);
  }
}

class ScrollLocker extends Module {
  constructor () {
    super('lock');
    this._isLocked = false;
    this._scrollY = 0;
    this.onPopulate = this.lock.bind(this);
    this.onEmpty = this.unlock.bind(this);
  }

  get isLocked () {
    return this._isLocked;
  }

  lock () {
    if (!this._isLocked) {
      this._isLocked = true;
      this._scrollY = window.scrollY;
      const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.setAttribute(ns.attr('scrolling'), 'false');
      document.body.style.top = `${-this._scrollY}px`;
      this.behavior = getComputedStyle(document.documentElement).getPropertyValue('scroll-behavior');
      if (this.behavior === 'smooth') document.documentElement.style.scrollBehavior = 'auto';
      if (scrollBarGap > 0) {
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarGap}px`);
      }
      rootDispatch(RootEvent.SCROLL_LOCK);
    }
  }

  unlock () {
    if (this._isLocked) {
      this._isLocked = false;
      document.documentElement.removeAttribute(ns.attr('scrolling'));
      document.body.style.top = '';
      window.scrollTo(0, this._scrollY);
      if (this.behavior === 'smooth') document.documentElement.style.removeProperty('scroll-behavior');
      document.documentElement.style.removeProperty('--scrollbar-width');
      rootDispatch(RootEvent.SCROLL_UNLOCK);
    }
  }

  move (value) {
    if (this._isLocked) {
      this._scrollY += value;
      document.body.style.top = `${-this._scrollY}px`;
    } else {
      window.scrollTo(0, window.scrollY + value);
    }
  }
}

class Load extends Module {
  constructor () {
    super('load');
    this.loading = this.load.bind(this);
  }

  activate () {
    window.addEventListener('load', this.loading);
  }

  load () {
    this.forEach((instance) => instance.load());
  }
}

const FONT_FAMILIES = ['Marianne', 'Spectral'];

class FontSwap extends Module {
  constructor () {
    super('font-swap');
    this.swapping = this.swap.bind(this);
  }

  activate () {
    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', this.swapping);
    }
  }

  swap () {
    const families = FONT_FAMILIES.filter(family => document.fonts.check(`16px ${family}`));

    this.forEach((instance) => instance.swapFont(families));
  }
}

class MouseMove extends Module {
  constructor () {
    super('mouse-move');
    this.requireMove = false;
    this._isMoving = false;
    this.moving = this.move.bind(this);
    this.requesting = this.request.bind(this);
    this.onPopulate = this.listen.bind(this);
    this.onEmpty = this.unlisten.bind(this);
  }

  listen () {
    if (this._isMoving) return;
    this._isMoving = true;
    this.requireMove = false;
    document.documentElement.addEventListener('mousemove', this.requesting);
  }

  unlisten () {
    if (!this._isMoving) return;
    this._isMoving = false;
    this.requireMove = false;
    document.documentElement.removeEventListener('mousemove', this.requesting);
  }

  request (e) {
    if (!this._isMoving) return;
    this.point = { x: e.clientX, y: e.clientY };
    if (this.requireMove) return;
    this.requireMove = true;
    window.requestAnimationFrame(this.moving);
  }

  move () {
    if (!this.requireMove) return;
    this.forEach((instance) => instance.mouseMove(this.point));
    this.requireMove = false;
  }
}

class Hash extends Module {
  constructor () {
    super('hash');
    this.handling = this.handle.bind(this);
    this.getLocationHash();
  }

  activate () {
    window.addEventListener('hashchange', this.handling);
  }

  deactivate () {
    window.removeEventListener('hashchange', this.handling);
  }

  _sanitize (hash) {
    if (hash.charAt(0) === '#') return hash.substring(1);
    return hash;
  }

  set hash (value) {
    const hash = this._sanitize(value);
    if (this._hash !== hash) window.location.hash = hash;
  }

  get hash () {
    return this._hash;
  }

  getLocationHash () {
    const hash = window.location.hash;
    this._hash = this._sanitize(hash);
  }

  handle (e) {
    this.getLocationHash();
    this.forEach((instance) => instance.handleHash(this._hash, e));
  }
}

class Engine {
  constructor () {
    state.create(Register);
    state.create(Stage);
    state.create(Renderer);
    state.create(Resizer);
    state.create(ScrollLocker);
    state.create(Load);
    state.create(FontSwap);
    state.create(MouseMove);
    state.create(Hash);

    const registerModule = state.getModule('register');
    this.register = registerModule.register.bind(registerModule);
  }

  get isActive () {
    return state.isActive;
  }

  start () {
    inspector.debug('START');
    state.isActive = true;
    rootDispatch(RootEvent.START);
  }

  stop () {
    inspector.debug('STOP');
    state.isActive = false;
    rootDispatch(RootEvent.STOP);
  }
}

const engine = new Engine();

class Colors {
  getColor (context, use, tint, options = {}) {
    const option = getOption(options);
    const decision = `--${context}-${use}-${tint}${option}`;
    return getComputedStyle(document.documentElement).getPropertyValue(decision).trim() || null;
  }
}

const getOption = (options) => {
  switch (true) {
    case options.hover:
      return '-hover';
    case options.active:
      return '-active';
    default:
      return '';
  }
};

const colors = new Colors();

const sanitize = (className) => className.charAt(0) === '.' ? className.substr(1) : className;

const getClassNames = (element) => {
  switch (true) {
    case !element.className:
      return [];

    case typeof element.className === 'string':
      return element.className.split(' ');

    case typeof element.className.baseVal === 'string':
      return element.className.baseVal.split(' ');
  }

  return [];
};

const modifyClass = (element, className, remove) => {
  className = sanitize(className);
  const classNames = getClassNames(element);
  const index = classNames.indexOf(className);
  if (remove === true) {
    if (index > -1) classNames.splice(index, 1);
  } else if (index === -1) classNames.push(className);
  element.className = classNames.join(' ');
};

const addClass = (element, className) => modifyClass(element, className);

const removeClass = (element, className) => modifyClass(element, className, true);

const hasClass = (element, className) => getClassNames(element).indexOf(sanitize(className)) > -1;

const ACTIONS = [
  '[tabindex]:not([tabindex="-1"])',
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  'details>summary:first-of-type',
  'details',
  'iframe'
];

const ACTIONS_SELECTOR = ACTIONS.join();

const queryActions = (element) => {
  return element.querySelectorAll(ACTIONS_SELECTOR);
};

let counter = 0;

const uniqueId = (id) => {
  if (!document.getElementById(id)) return id;
  let element = true;
  const base = id;
  while (element) {
    counter++;
    id = `${base}-${counter}`;
    element = document.getElementById(id);
  }
  return id;
};

const dom = {
  addClass: addClass,
  hasClass: hasClass,
  removeClass: removeClass,
  queryParentSelector: queryParentSelector,
  querySelectorAllArray: querySelectorAllArray,
  queryActions: queryActions,
  uniqueId: uniqueId,
  dispatch: dispatch
};

class DataURISVG {
  constructor (width = 0, height = 0) {
    this._width = width;
    this._height = height;
    this._content = '';
  }

  get width () {
    return this._width;
  }

  set width (value) {
    this._width = value;
  }

  get height () {
    return this._height;
  }

  set height (value) {
    this._height = value;
  }

  get content () {
    return this._content;
  }

  set content (value) {
    this._content = value;
  }

  getDataURI (isLegacy = false) {
    let svg = `<svg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 ${this._width} ${this._height}' width='${this._width}px' height='${this._height}px'>${this._content}</svg>`;

    svg = svg.replace(/#/gi, '%23');
    if (isLegacy) {
      svg = svg.replace(/</gi, '%3C');
      svg = svg.replace(/>/gi, '%3E');
      svg = svg.replace(/"/gi, '\'');
      svg = svg.replace(/{/gi, '%7B');
      svg = svg.replace(/}/gi, '%7D');
    }
    return `data:image/svg+xml;charset=utf8,${svg}`;
  }
}

const image = {
  DataURISVG: DataURISVG
};

const supportLocalStorage = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

const supportAspectRatio = () => {
  if (!window.CSS) return false;
  return CSS.supports('aspect-ratio: 16 / 9');
};

const support = {
  supportLocalStorage: supportLocalStorage,
  supportAspectRatio: supportAspectRatio
};

const TransitionSelector = {
  NONE: ns.selector('transition-none')
};

const selector = {
  TransitionSelector: TransitionSelector
};

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

const property = {
  completeAssign: completeAssign
};

/**
 * Return an object of query params or null
 *
 * @method
 * @name searchParams
 * @param {string} url - an url
 * @returns {Object} object of query params or null
 */

const searchParams = (url) => {
  if (url && url.search) {
    const params = new URLSearchParams(window.location.search);
    const entries = params.entries();
    return Object.fromEntries(entries);
  }
  return null;
};

const internals = {};
const legacy = {};

Object.defineProperty(legacy, 'isLegacy', {
  get: () => state.isLegacy
});

legacy.setLegacy = () => {
  state.isLegacy = true;
};

internals.legacy = legacy;
internals.dom = dom;
internals.image = image;
internals.support = support;
internals.motion = selector;
internals.property = property;
internals.ns = ns;
internals.register = engine.register;
internals.state = state;
internals.query = searchParams(window.location);

Object.defineProperty(internals, 'preventManipulation', {
  get: () => options.preventManipulation
});
Object.defineProperty(internals, 'stage', {
  get: () => state.getModule('stage')
});

const api$1 = (node) => {
  const stage = state.getModule('stage');
  return stage.getProxy(node);
};

api$1.version = config.version;
api$1.prefix = config.prefix;
api$1.organisation = config.organisation;
api$1.Modes = Modes;

Object.defineProperty(api$1, 'mode', {
  set: (value) => { options.mode = value; },
  get: () => options.mode
});

api$1.internals = internals;
api$1.version = config.version;

api$1.start = engine.start;
api$1.stop = engine.stop;

api$1.inspector = inspector;
api$1.colors = colors;

const configuration = window[config.namespace];
api$1.internals.configuration = configuration;

options.configure(configuration, api$1.start, api$1.internals.query);

window[config.namespace] = api$1;

class Emitter {
  constructor () {
    this.emissions = {};
  }

  add (type, closure) {
    if (typeof closure !== 'function') throw new Error('closure must be a function');
    if (!this.emissions[type]) this.emissions[type] = [];
    this.emissions[type].push(closure);
  }

  remove (type, closure) {
    if (!this.emissions[type]) return;
    if (!closure) delete this.emissions[type];
    else {
      const index = this.emissions[type].indexOf(closure);
      if (index > -1) this.emissions[type].splice(index);
    }
  }

  emit (type, data) {
    if (!this.emissions[type]) return [];
    const response = [];
    for (const closure of this.emissions[type]) if (closure) response.push(closure(data));
    return response;
  }

  dispose () {
    this.emissions = null;
  }
}

class Breakpoint {
  constructor (id, minWidth) {
    this.id = id;
    this.minWidth = minWidth;
  }

  test () {
    return window.matchMedia(`(min-width: ${this.minWidth}em)`).matches;
  }
}

const Breakpoints = {
  XS: new Breakpoint('xs', 0),
  SM: new Breakpoint('sm', 36),
  MD: new Breakpoint('md', 48),
  LG: new Breakpoint('lg', 62),
  XL: new Breakpoint('xl', 78)
};

const InstanceEvent = {
  CLICK: ns.event('click')
};

class Instance {
  constructor (jsAttribute = true) {
    this.jsAttribute = jsAttribute;
    this._isRendering = false;
    this._isResizing = false;
    this._isScrollLocked = false;
    this._isLoading = false;
    this._isSwappingFont = false;
    this._isEnabled = true;
    this._isDisposed = false;
    this._listeners = {};
    this._handlingClick = this._handleClick.bind(this);
    this._hashes = [];
    this._hash = '';
    this._keyListenerTypes = [];
    this._keys = [];
    this.handlingKey = this.handleKey.bind(this);
    this._emitter = new Emitter();
    this._ascent = new Emitter();
    this._descent = new Emitter();
    this._registrations = [];
    this._nexts = [];
  }

  static get instanceClassName () {
    return 'Instance';
  }

  _config (element, registration) {
    this.element = element;
    this.registration = registration;
    this.node = element.node;
    this.id = element.node.id;
    if (this.jsAttribute) this.setAttribute(registration.attribute, true);
    this.init();
  }

  init () {}

  get proxy () {
    const scope = this;
    const proxy = {
      render: () => scope.render(),
      resize: () => scope.resize()
    };

    const proxyAccessors = {
      get node () {
        return scope.node;
      },
      get isEnabled () {
        return scope.isEnabled;
      },
      set isEnabled (value) {
        scope.isEnabled = value;
      }
    };

    return completeAssign(proxy, proxyAccessors);
  }

  log (...values) {
    values.unshift(`${this.registration.instanceClassName} #${this.id} - `);
    inspector.log.apply(inspector, values);
  }

  debug (...values) {
    values.unshift(`${this.registration.instanceClassName} #${this.id} - `);
    inspector.debug.apply(inspector, values);
  }

  info (...values) {
    values.unshift(`${this.registration.instanceClassName} #${this.id} - `);
    inspector.info.apply(inspector, values);
  }

  warn (...values) {
    values.unshift(`${this.registration.instanceClassName} #${this.id} - `);
    inspector.warn.apply(inspector, values);
  }

  error (...values) {
    values.unshift(`${this.registration.instanceClassName} #${this.id} - `);
    inspector.error.apply(inspector, values);
  }

  register (selector, InstanceClass) {
    const registration = state.getModule('register').register(selector, InstanceClass, this);
    this._registrations.push(registration);
  }

  getRegisteredInstances (instanceClassName) {
    for (const registration of this._registrations) if (registration.hasInstanceClassName(instanceClassName)) return registration.instances.collection;
    return [];
  }

  dispatch (type, detail = null, bubbles = true, cancelable = false) {
    dispatch(this.node, type, detail, bubbles, cancelable);
  }

  // TODO v2 => listener au niveau des éléments qui redistribuent aux instances.
  listen (type, closure, options) {
    if (!this._listeners[type]) this._listeners[type] = [];
    const listeners = this._listeners[type];
    // if (listeners.some(listener => listener.closure === closure)) return;
    const listener = new Listener(this.node, type, closure, options);
    listeners.push(listener);
    listener.listen();
  }

  unlisten (type, closure, options) {
    if (!type) {
      for (const type in this._listeners) this.unlisten(type);
      return;
    }

    const listeners = this._listeners[type];

    if (!listeners) return;

    if (!closure) {
      listeners.forEach(listener => this.unlisten(type, listener.closure));
      return;
    }

    const removal = listeners.filter(listener => listener.closure === closure && listener.matchOptions(options));
    removal.forEach(listener => listener.unlisten());
    this._listeners[type] = listeners.filter(listener => removal.indexOf(listener) === -1);
  }

  listenClick (options) {
    this.listen('click', this._handlingClick, options);
  }

  unlistenClick (options) {
    this.unlisten('click', this._handlingClick, options);
  }

  _handleClick (e) {
    this.handleClick(e);
    this.dispatch(InstanceEvent.CLICK, this);
  }

  handleClick (e) {}

  set hash (value) {
    state.getModule('hash').hash = value;
  }

  get hash () {
    return state.getModule('hash').hash;
  }

  listenHash (hash, add) {
    if (!this._hashes) return;
    if (this._hashes.length === 0) state.add('hash', this);
    const action = new HashAction(hash, add);
    this._hashes = this._hashes.filter(action => action.hash !== hash);
    this._hashes.push(action);
  }

  unlistenHash (hash) {
    if (!this._hashes) return;
    this._hashes = this._hashes.filter(action => action.hash !== hash);
    if (this._hashes.length === 0) state.remove('hash', this);
  }

  handleHash (hash, e) {
    if (!this._hashes) return;
    for (const action of this._hashes) action.handle(hash, e);
  }

  listenKey (keyCode, closure, preventDefault = false, stopPropagation = false, type = 'down') {
    if (this._keyListenerTypes.indexOf(type) === -1) {
      this.listen(`key${type}`, this.handlingKey);
      this._keyListenerTypes.push(type);
    }

    this._keys.push(new KeyAction(type, keyCode, closure, preventDefault, stopPropagation));
  }

  unlistenKey (code, closure) {
    this._keys = this._keys.filter((key) => key.code !== code || key.closure !== closure);

    this._keyListenerTypes.forEach(type => {
      if (!this._keys.some(key => key.type === type)) this.unlisten(`key${type}`, this.handlingKey);
    });
  }

  handleKey (e) {
    for (const key of this._keys) key.handle(e);
  }

  get isEnabled () { return this._isEnabled; }

  set isEnabled (value) {
    this._isEnabled = value;
  }

  get isRendering () { return this._isRendering; }

  set isRendering (value) {
    if (this._isRendering === value) return;
    if (value) state.add('render', this);
    else state.remove('render', this);
    this._isRendering = value;
  }

  render () {}

  request (closure) {
    this._nexts.push(closure);
    state.getModule('render').request(this);
  }

  next () {
    const nexts = this._nexts.slice();
    this._nexts.length = 0;
    for (const closure of nexts) if (closure) closure();
  }

  get isResizing () { return this._isResizing; }

  set isResizing (value) {
    if (this._isResizing === value) return;
    if (value) {
      state.add('resize', this);
      this.resize();
    } else state.remove('resize', this);
    this._isResizing = value;
  }

  resize () {}

  isBreakpoint (breakpoint) {
    switch (true) {
      case typeof breakpoint === 'string':
        return Breakpoints[breakpoint.toUpperCase()].test();

      default:
        return breakpoint.test();
    }
  }

  get isScrollLocked () {
    return this._isScrollLocked;
  }

  set isScrollLocked (value) {
    if (this._isScrollLocked === value) return;
    if (value) state.add('lock', this);
    else state.remove('lock', this);
    this._isScrollLocked = value;
  }

  get isLoading () {
    return this._isLoading;
  }

  set isLoading (value) {
    if (this._isLoading === value) return;
    if (value) state.add('load', this);
    else state.remove('load', this);
    this._isLoading = value;
  }

  load () {}

  get isSwappingFont () {
    return this._isSwappingFont;
  }

  set isSwappingFont (value) {
    if (this._isSwappingFont === value) return;
    if (value) state.add('font-swap', this);
    else state.remove('font-swap', this);
    this._isSwappingFont = value;
  }

  swapFont () {}

  get isMouseMoving () { return this._isMouseMoving; }

  set isMouseMoving (value) {
    if (this._isMouseMoving === value) return;
    if (value) {
      state.add('mouse-move', this);
    } else {
      state.remove('mouse-move', this);
    }
    this._isMouseMoving = value;
  }

  mouseMove (point) {}

  examine (attributeNames) {
    if (!this.node.matches(this.registration.selector)) {
      this._dispose();
      return;
    }

    this.mutate(attributeNames);
  }

  mutate (attributeNames) {}

  retrieveNodeId (node, append) {
    if (node.id) return node.id;
    const id = uniqueId(`${this.id}-${append}`);
    this.warn(`add id '${id}' to ${append}`);
    node.setAttribute('id', id);
    return id;
  }

  get isDisposed () {
    return this._isDisposed;
  }

  _dispose () {
    this.debug(`dispose instance of ${this.registration.instanceClassName} on element [${this.element.id}]`);
    this.removeAttribute(this.registration.attribute);
    this.unlisten();
    state.remove('hash', this);
    this._hashes = null;
    this._keys = null;
    this.isRendering = false;
    this.isResizing = false;
    this._nexts = null;
    state.getModule('render').nexts.remove(this);
    this.isScrollLocked = false;
    this.isLoading = false;
    this.isSwappingFont = false;
    this.isMouseMoving = false;
    this._emitter.dispose();
    this._emitter = null;
    this._ascent.dispose();
    this._ascent = null;
    this._descent.dispose();
    this._descent = null;
    this.element.remove(this);
    for (const registration of this._registrations) state.remove('register', registration);
    this._registrations = null;
    this.registration.remove(this);
    this._isDisposed = true;
    this.dispose();
  }

  dispose () {}

  emit (type, data) {
    return this.element.emit(type, data);
  }

  addEmission (type, closure) {
    this._emitter.add(type, closure);
  }

  removeEmission (type, closure) {
    this._emitter.remove(type, closure);
  }

  ascend (type, data) {
    return this.element.ascend(type, data);
  }

  addAscent (type, closure) {
    this._ascent.add(type, closure);
  }

  removeAscent (type, closure) {
    this._ascent.remove(type, closure);
  }

  descend (type, data) {
    return this.element.descend(type, data);
  }

  addDescent (type, closure) {
    this._descent.add(type, closure);
  }

  removeDescent (type, closure) {
    this._descent.remove(type, closure);
  }

  get style () {
    return this.node.style;
  }

  addClass (className) {
    addClass(this.node, className);
  }

  removeClass (className) {
    removeClass(this.node, className);
  }

  hasClass (className) {
    return hasClass(this.node, className);
  }

  get classNames () {
    return getClassNames(this.node);
  }

  remove () {
    this.node.parentNode.removeChild(this.node);
  }

  setAttribute (attributeName, value) {
    this.node.setAttribute(attributeName, value);
  }

  getAttribute (attributeName) {
    return this.node.getAttribute(attributeName);
  }

  hasAttribute (attributeName) {
    return this.node.hasAttribute(attributeName);
  }

  removeAttribute (attributeName) {
    this.node.removeAttribute(attributeName);
  }

  setProperty (propertyName, value) {
    this.node.style.setProperty(propertyName, value);
  }

  removeProperty (propertyName) {
    this.node.style.removeProperty(propertyName);
  }

  focus () {
    this.node.focus();
  }

  blur () {
    this.node.blur();
  }

  focusClosest () {
    const closest = this._focusClosest(this.node.parentNode);
    if (closest) closest.focus();
  }

  _focusClosest (parent) {
    if (!parent) return null;
    const actions = [...queryActions(parent)];
    if (actions.length <= 1) {
      return this._focusClosest(parent.parentNode);
    } else {
      const index = actions.indexOf(this.node);
      return actions[index + (index < actions.length - 1 ? 1 : -1)];
    }
  }

  get hasFocus () {
    return this.node === document.activeElement;
  }

  scrollIntoView () {
    const rect = this.getRect();

    const scroll = state.getModule('lock');

    if (rect.top < 0) {
      scroll.move(rect.top - 50);
    }

    if (rect.bottom > window.innerHeight) {
      scroll.move(rect.bottom - window.innerHeight + 50);
    }
  }

  matches (selectors) {
    return this.node.matches(selectors);
  }

  querySelector (selectors) {
    return this.node.querySelector(selectors);
  }

  querySelectorAll (selectors) {
    return querySelectorAllArray(this.node, selectors);
  }

  queryParentSelector (selectors) {
    return queryParentSelector(this.node, selectors);
  }

  getRect () {
    const rect = this.node.getBoundingClientRect();
    rect.center = rect.left + rect.width * 0.5;
    rect.middle = rect.top + rect.height * 0.5;
    return rect;
  }

  get isLegacy () {
    return state.isLegacy;
  }
}

class KeyAction {
  constructor (type, keyCode, closure, preventDefault, stopPropagation) {
    this.type = type;
    this.eventType = `key${type}`;
    this.keyCode = keyCode;
    this.closure = closure;
    this.preventDefault = preventDefault === true;
    this.stopPropagation = stopPropagation === true;
  }

  handle (e) {
    if (e.type !== this.eventType) return;
    if (e.keyCode === this.keyCode.value) {
      this.closure(e);
      if (this.preventDefault) {
        e.preventDefault();
      }
      if (this.stopPropagation) {
        e.stopPropagation();
      }
    }
  }
}

class Listener {
  constructor (node, type, closure, options) {
    this._node = node;
    this._type = type;
    this._closure = closure;
    this._options = options;
  }

  get closure () {
    return this._closure;
  }

  listen () {
    this._node.addEventListener(this._type, this._closure, this._options);
  }

  matchOptions (options = null) {
    switch (true) {
      case options === null:
      case typeof this._options === 'boolean' && typeof options === 'boolean' && this._options === options:
        return true;

      case Object.keys(this._options).length !== Object.keys(options).length:
        return false;

      case Object.keys(options).every(key => this._options[key] === options[key]):
        return true;
    }

    return false;
  }

  unlisten () {
    this._node.removeEventListener(this._type, this._closure, this._options);
  }
}

class HashAction {
  constructor (hash, add) {
    this.hash = hash;
    this.add = add;
  }

  handle (hash, e) {
    if (this.hash === hash) this.add(e);
  }
}

const DisclosureEvent = {
  DISCLOSE: ns.event('disclose'),
  CONCEAL: ns.event('conceal'),
  CURRENT: ns.event('current')
};

const DisclosureEmission = {
  RESET: ns.emission('disclosure', 'reset'),
  ADDED: ns.emission('disclosure', 'added'),
  RETRIEVE: ns.emission('disclosure', 'retrieve'),
  REMOVED: ns.emission('disclosure', 'removed'),
  GROUP: ns.emission('disclosure', 'group'),
  UNGROUP: ns.emission('disclosure', 'ungroup'),
  SPOTLIGHT: ns.emission('disclosure', 'spotlight')
};

class Disclosure extends Instance {
  constructor (type, selector, DisclosureButtonInstanceClass, disclosuresGroupInstanceClassName) {
    super();
    this.type = type;
    this._selector = selector;
    this.DisclosureButtonInstanceClass = DisclosureButtonInstanceClass;
    this.disclosuresGroupInstanceClassName = disclosuresGroupInstanceClassName;
    this.modifier = this._selector + '--' + this.type.id;
    this._isPristine = true;
    this._isRetrievingPrimaries = false;
    this._hasRetrieved = false;
    this._primaryButtons = [];
  }

  static get instanceClassName () {
    return 'Disclosure';
  }

  init () {
    this.addDescent(DisclosureEmission.RESET, this.reset.bind(this));
    this.addDescent(DisclosureEmission.GROUP, this.update.bind(this));
    this.addDescent(DisclosureEmission.UNGROUP, this.update.bind(this));
    this.addAscent(DisclosureEmission.SPOTLIGHT, this.disclose.bind(this));
    this.register(`[aria-controls="${this.id}"]`, this.DisclosureButtonInstanceClass);
    this.ascend(DisclosureEmission.ADDED);
    this.listenHash(this.id, this._spotlight.bind(this));
    this.update();
  }

  get isEnabled () { return super.isEnabled; }

  set isEnabled (value) {
    if (this.isEnabled === value) return;
    super.isEnabled = value;
    if (value) this.ascend(DisclosureEmission.ADDED);
    else this.ascend(DisclosureEmission.REMOVED);
  }

  get isPristine () {
    return this._isPristine;
  }

  get proxy () {
    const scope = this;
    const proxy = Object.assign(super.proxy, {
      disclose: scope.disclose.bind(scope),
      focus: scope.focus.bind(scope)
    });

    if (this.type.canConceal) proxy.conceal = scope.conceal.bind(scope);

    const proxyAccessors = {
      get buttons () {
        return scope.buttons.map((button) => button.proxy);
      },
      get group () {
        const group = scope.group;
        return group ? group.proxy : null;
      },
      get isDisclosed () {
        return scope.isDisclosed;
      }
    };

    return completeAssign(proxy, proxyAccessors);
  }

  get buttons () {
    return this.getRegisteredInstances(this.DisclosureButtonInstanceClass.instanceClassName);
  }

  update () {
    this.getGroup();
    this.retrievePrimaries();
  }

  getGroup () {
    if (!this.disclosuresGroupInstanceClassName) {
      this._group = null;
      return;
    }

    const group = this.element.getAscendantInstance(this.disclosuresGroupInstanceClassName, this.constructor.instanceClassName);
    if (!group || !group.validate(this)) {
      this._group = null;
      return;
    }

    this._group = group;
  }

  get group () {
    return this._group;
  }

  disclose (withhold) {
    if (this.isDisclosed === true || !this.isEnabled) return false;
    this._isPristine = false;
    this.isDisclosed = true;
    if (!withhold && this.group) this.group.current = this;
    return true;
  }

  conceal (withhold, preventFocus = true) {
    if (this.isDisclosed === false) return false;
    if (!this.type.canConceal && this.group && this.group.current === this) return false;
    this.isDisclosed = false;
    if (!withhold && this.group && this.group.current === this) this.group.current = null;
    if (!preventFocus) this.focus();
    if (!this._isPristine) this.descend(DisclosureEmission.RESET);
    return true;
  }

  get isDisclosed () {
    return this._isDisclosed;
  }

  set isDisclosed (value) {
    if (this._isDisclosed === value || (!this.isEnabled && value === true)) return;
    this.dispatch(value ? DisclosureEvent.DISCLOSE : DisclosureEvent.CONCEAL, this);
    this._isDisclosed = value;
    if (value) this.addClass(this.modifier);
    else this.removeClass(this.modifier);
    for (let i = 0; i < this.buttons.length; i++) this.buttons[i].apply(value);
  }

  get isInitiallyDisclosed () {
    return this.primaryButtons.some(button => button.isInitiallyDisclosed);
  }

  hasRetrieved () {
    return this._hasRetrieved;
  }

  reset () {}

  toggle (canDisclose) {
    if (!this.type.canConceal) this.disclose();
    else {
      switch (true) {
        case !canDisclose:
        case this.isDisclosed:
          this.conceal(false, false);
          break;

        default:
          this.disclose();
      }
    }
  }

  get buttonHasFocus () {
    return this.buttons.some((button) => { return button.hasFocus; });
  }

  get hasFocus () {
    if (super.hasFocus) return true;
    if (this.buttonHasFocus) return true;
    return this.querySelectorAll(':focus').length > 0;
  }

  focus () {
    if (this._primaryButtons.length > 0) this._primaryButtons[0].focus();
  }

  get primaryButtons () {
    return this._primaryButtons;
  }

  retrievePrimaries () {
    if (this._isRetrievingPrimaries) return;
    this._isRetrievingPrimaries = true;
    this.request(this._retrievePrimaries.bind(this));
  }

  _retrievePrimaries () {
    this._isRetrievingPrimaries = false;
    this._primaryButtons = this._electPrimaries(this.buttons);

    if (this._hasRetrieved || this._primaryButtons.length === 0) return;
    this.retrieved();
    this._hasRetrieved = true;

    this.applyAbility(true);

    if (this.group) {
      this.group.retrieve();
      return;
    }

    if (this._isPristine && this.isEnabled && !this.group) {
      switch (true) {
        case this.hash === this.id:
          this._spotlight();
          break;

        case this.isInitiallyDisclosed:
          this.disclose();
          break;
      }
    }
  }

  retrieved () {}

  _spotlight () {
    this.disclose();
    this.request(() => { this.ascend(DisclosureEmission.SPOTLIGHT); });
  }

  _electPrimaries (candidates) {
    return candidates.filter(button => button.canDisclose && !this.node.contains(button.node));
  }

  applyAbility (withhold = false) {
    const isEnabled = !this._primaryButtons.every(button => button.isDisabled);

    if (this.isEnabled === isEnabled) return;

    this.isEnabled = isEnabled;

    if (withhold) return;

    if (!this.isEnabled && this.isDisclosed) {
      if (this.group) this.ascend(DisclosureEmission.REMOVED);
      else if (this.type.canConceal) this.conceal();
    }

    if (this.isEnabled) {
      if (this.group) this.ascend(DisclosureEmission.ADDED);
      if (this.hash === this.id) {
        this._spotlight();
      }
    }
  }

  dispose () {
    this._group = null;
    this._primaryButtons = null;
    super.dispose();
    this.ascend(DisclosureEmission.REMOVED);
  }
}

class DisclosureButton extends Instance {
  constructor (type) {
    super();
    this.type = type;
    this.attributeName = type.ariaState ? 'aria-' + type.id : ns.attr(type.id);
    this._canDisclose = false;
  }

  static get instanceClassName () {
    return 'DisclosureButton';
  }

  get isPrimary () {
    return this.registration.creator.primaryButtons.includes(this);
  }

  get canDisclose () {
    return this._canDisclose;
  }

  get isDisabled () {
    return this.type.canDisable && this.hasAttribute('disabled');
  }

  init () {
    this._canDisclose = this.hasAttribute(this.attributeName);
    this._isInitiallyDisclosed = this.isDisclosed;
    this._isContained = this.registration.creator.node.contains(this.node);
    this.controlsId = this.getAttribute('aria-controls');
    this.registration.creator.retrievePrimaries();
    this.listenClick();
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      focus: scope.focus.bind(scope)
    });
  }

  handleClick (e) {
    if (this.registration.creator) this.registration.creator.toggle(this.canDisclose);
  }

  mutate (attributeNames) {
    this._canDisclose = this.hasAttribute(this.attributeName);
    this.registration.creator.applyAbility();
    if (!this._isApplying && this.isPrimary && attributeNames.indexOf(this.attributeName) > -1 && this.registration.creator) {
      if (this.isDisclosed) this.registration.creator.disclose();
      else if (this.type.canConceal) this.registration.creator.conceal();
    }
  }

  apply (value) {
    if (!this.canDisclose) return;
    this._isApplying = true;
    this.setAttribute(this.attributeName, value);
    this.request(() => { this._isApplying = false; });
  }

  get isDisclosed () {
    return this.getAttribute(this.attributeName) === 'true';
  }

  get isInitiallyDisclosed () {
    return this._isInitiallyDisclosed;
  }

  focus () {
    super.focus();
    this.scrollIntoView();
  }

  measure (rect) {
    const buttonRect = this.rect;
    this._dx = rect.x - buttonRect.x;
    this._dy = rect.y - buttonRect.y;
  }

  get dx () {
    return this._dx;
  }

  get dy () {
    return this._dy;
  }
}

const DisclosureSelector = {
  PREVENT_CONCEAL: ns.attr.selector('prevent-conceal'),
  GROUP: ns.attr('group')
};

class DisclosuresGroup extends Instance {
  constructor (disclosureInstanceClassName, jsAttribute) {
    super(jsAttribute);
    this.disclosureInstanceClassName = disclosureInstanceClassName;
    this._members = [];
    this._index = -1;
    this._isRetrieving = false;
    this._hasRetrieved = false;
    this._isGrouped = true;
  }

  static get instanceClassName () {
    return 'DisclosuresGroup';
  }

  init () {
    this.addAscent(DisclosureEmission.ADDED, this.update.bind(this));
    this.addAscent(DisclosureEmission.RETRIEVE, this.retrieve.bind(this));
    this.addAscent(DisclosureEmission.REMOVED, this.update.bind(this));
    this.descend(DisclosureEmission.GROUP);
    this._isGrouped = this.getAttribute(DisclosureSelector.GROUP) !== 'false';
    this.update();
  }

  get proxy () {
    const scope = this;

    const proxyAccessors = {
      set index (value) {
        scope.index = value;
      },
      get index () {
        return scope.index;
      },
      get length () {
        return scope.length;
      },
      get current () {
        const current = scope.current;
        return current ? current.proxy : null;
      },
      get members () {
        return scope.members.map((member) => member.proxy);
      },
      get hasFocus () {
        return scope.hasFocus;
      },
      set isGrouped (value) {
        scope.isGrouped = value;
      },
      get isGrouped () {
        return scope.isGrouped;
      }
    };

    return completeAssign(super.proxy, proxyAccessors);
  }

  validate (member) {
    return true;
  }

  getMembers () {
    const members = this.element.getDescendantInstances(this.disclosureInstanceClassName, this.constructor.instanceClassName, true);
    this._members = members.filter(this.validate.bind(this)).filter(member => member.isEnabled);
    const invalids = members.filter(member => !this._members.includes(member));
    invalids.forEach(invalid => invalid.conceal());
  }

  retrieve (bypassPrevention = false) {
    if (this._isRetrieving || (this._hasRetrieved && !bypassPrevention)) return;
    this._isRetrieving = true;
    this.request(this._retrieve.bind(this));
  }

  _retrieve () {
    this.getMembers();
    this._isRetrieving = false;
    this._hasRetrieved = true;

    if (!this.isGrouped) {
      for (let i = 0; i < this.length; i++) {
        const member = this.members[i];
        if (member.isInitiallyDisclosed) {
          member.disclose(true);
        }
      }
      return;
    }

    if (this.hash) {
      for (let i = 0; i < this.length; i++) {
        const member = this.members[i];
        if (this.hash === member.id) {
          this.index = i;
          this.request(() => { this.ascend(DisclosureEmission.SPOTLIGHT); });
          return i;
        }
      }
    }

    for (let i = 0; i < this.length; i++) {
      const member = this.members[i];
      if (member.isInitiallyDisclosed) {
        this.index = i;
        return i;
      }
    }

    return this.getIndex();
  }

  update () {
    this.getMembers();
    if (this._hasRetrieved) {
      if (this.isGrouped) this.getIndex();
    }
  }

  get members () {
    return this._members;
  }

  get length () {
    return this.members ? this.members.length : 0;
  }

  getIndex (defaultIndex = -1) {
    this._index = undefined;
    let index = defaultIndex;
    for (let i = 0; i < this.length; i++) {
      if (this.members[i].isDisclosed) {
        index = i;
        break;
      }
    }

    this.index = index;
    return index;
  }

  get index () {
    return this._index;
  }

  set index (value) {
    if (value < -1 || value >= this.length || value === this._index) return;
    this._index = value;
    for (let i = 0; i < this.length; i++) {
      const member = this.members[i];
      if (value === i) {
        if (!member.isDisclosed) member.disclose(true);
      } else {
        if ((this.isGrouped || !this.canUngroup) && member.isDisclosed !== false) member.conceal(true);
      }
    }
    this.apply();
    this.dispatch(DisclosureEvent.CURRENT, this.current);
  }

  get current () {
    if (this._index === -1 || isNaN(this._index)) return null;
    return this._members[this._index] || null;
  }

  set current (member) {
    this.index = this.members.indexOf(member);
  }

  get hasFocus () {
    const current = this.current;
    if (current) return current.hasFocus;
    return false;
  }

  set isGrouped (value) {
    const isGrouped = !!value;
    if (this._isGrouped === isGrouped) return;
    this._isGrouped = isGrouped;
    this.setAttribute(DisclosureSelector.GROUP, !!value);
    this.update();
  }

  get isGrouped () {
    return this._isGrouped;
  }

  get canUngroup () {
    return false;
  }

  mutate (attributesNames) {
    if (attributesNames.includes(DisclosureSelector.GROUP)) {
      this.isGrouped = this.getAttribute(DisclosureSelector.GROUP) !== 'false';
    }
  }

  apply () {}

  dispose () {
    super.dispose();
    this.descend(DisclosureEmission.UNGROUP);
    this._members = null;
  }
}

const DisclosureType = {
  EXPAND: {
    id: 'expanded',
    ariaState: true,
    ariaControls: true,
    canConceal: true,
    canDisable: true
  },
  SELECT: {
    id: 'selected',
    ariaState: true,
    ariaControls: true,
    canConceal: false,
    canDisable: true
  },
  OPENED: {
    id: 'opened',
    ariaState: false,
    ariaControls: true,
    canConceal: true,
    canDisable: false
  }
};

class CollapseButton extends DisclosureButton {
  constructor () {
    super(DisclosureType.EXPAND);
  }

  static get instanceClassName () {
    return 'CollapseButton';
  }
}

const CollapseSelector = {
  COLLAPSE: ns.selector('collapse'),
  COLLAPSING: ns.selector('collapsing')
};

/**
 * Tab coorespond au panel d'un élement Tabs (tab panel)
 * Tab étend disclosure qui ajoute/enleve le modifier --selected,
 * et ajoute/eleve l'attribut hidden, sur le panel
 */
class Collapse extends Disclosure {
  constructor () {
    super(DisclosureType.EXPAND, CollapseSelector.COLLAPSE, CollapseButton, 'CollapsesGroup');
  }

  static get instanceClassName () {
    return 'Collapse';
  }

  init () {
    super.init();
    this.listen('transitionend', this.endCollapsing.bind(this));
  }

  endCollapsing (e) {
    if (!this._isCollpasing) return;
    if (this._timeout) clearTimeout(this._timeout);
    this._timeout = null;
    this._isCollpasing = false;
    this.removeClass(CollapseSelector.COLLAPSING);
    if (!this.isDisclosed) {
      if (this.isLegacy) this.style.maxHeight = '';
    }
  }

  unbound () {
    if (this.isLegacy) this.style.maxHeight = 'none';
  }

  disclose (withhold) {
    if (this.isDisclosed === true || !this.isEnabled) return false;
    this.unbound();
    this.collapsing(() => super.disclose(withhold));
  }

  conceal (withhold, preventFocus) {
    if (this.isDisclosed === false) return false;
    this.collapsing(() => super.conceal(withhold, preventFocus));
  }

  collapsing (request) {
    this._isCollpasing = true;
    if (this._timeout) clearTimeout(this._timeout);
    this.addClass(CollapseSelector.COLLAPSING);
    this.adjust();
    this.request(() => {
      request();
      this._timeout = setTimeout(this.endCollapsing.bind(this), 500);
    });
  }

  adjust () {
    this.setProperty('--collapser', 'none');
    const height = this.node.offsetHeight;
    this.setProperty('--collapse', -height + 'px');
    this.setProperty('--collapser', '');
  }

  reset () {
    if (!this.isPristine) this.isDisclosed = false;
  }

  _electPrimaries (candidates) {
    const primary = this.element.parent.instances.map(instance => instance.collapsePrimary).filter(button => button !== undefined && candidates.indexOf(button) > -1);
    if (primary.length === 1) return primary;
    candidates = super._electPrimaries(candidates);
    if (candidates.length === 1) return candidates;
    const before = candidates.filter(candidate => candidate.dy >= 0);
    if (before.length > 0) candidates = before;
    if (candidates.length === 1) return candidates;
    const min = Math.min(...candidates.map(candidate => candidate.dy));
    const mins = candidates.filter(candidate => candidate.dy === min);
    if (mins.length > 0) candidates = mins;
    if (candidates.length === 1) return candidates;
    candidates.sort((a, b) => Math.abs(b.dx) - Math.abs(a.dx));
    return candidates;
  }
}

class CollapsesGroup extends DisclosuresGroup {
  constructor () {
    super('Collapse');
  }

  static get instanceClassName () {
    return 'CollapsesGroup';
  }

  get canUngroup () {
    return true;
  }
}

const EquisizedEmission = {
  CHANGE: ns('equisized')
};

class Equisized extends Instance {
  static get instanceClassName () {
    return 'Equisized';
  }

  init () {
    this.ascend(EquisizedEmission.CHANGE);
  }

  measure () {
    if (this.isLegacy) this.style.width = 'auto';
    return this.getRect().width;
  }

  adjust (width) {
    if (this.isLegacy) this.style.width = `${width}px`;
  }

  dispose () {
    this.ascend(EquisizedEmission.CHANGE);
  }
}

class EquisizedsGroup extends Instance {
  static get instanceClassName () {
    return 'EquisizedsGroup';
  }

  init () {
    this.isResizing = true;
    this.isLoading = true;
    this.addAscent(EquisizedEmission.CHANGE, this.resize.bind(this));
  }

  load () {
    this.resize();
  }

  resize () {
    const equisizeds = this.element.getDescendantInstances('Equisized');
    if (!this.isLegacy) this.style.setProperty('--equisized-width', 'auto');

    const width = Math.max(...equisizeds.map(equisized => equisized.measure()));
    if (this.isLegacy) equisizeds.forEach(equisized => equisized.adjust(width));
    else this.style.setProperty('--equisized-width', `${width}px`);
  }
}

class Toggle extends Instance {
  static get instanceClassName () {
    return 'Toggle';
  }

  init () {
    this.pressed = this.pressed === 'true';
    this.listenClick();
  }

  handleClick () {
    this.toggle();
  }

  toggle () {
    this.pressed = this.pressed !== 'true';
  }

  get pressed () {
    return this.getAttribute('aria-pressed');
  }

  set pressed (value) {
    this.setAttribute('aria-pressed', value ? 'true' : 'false');
  }

  get proxy () {
    const scope = this;
    const proxy = Object.assign(super.proxy, {
      toggle: scope.toggle.bind(scope)
    });

    const proxyAccessors = {
      get pressed () {
        return scope.pressed;
      },
      set pressed (value) {
        scope.pressed = value;
      }
    };

    return completeAssign(proxy, proxyAccessors);
  }
}

const RootSelector = {
  ROOT: ':root'
};

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
};

class InjectSvg extends Instance {
  static get instanceClassName () {
    return 'InjectSvg';
  }

  init () {
    if (this.node) {
      this.img = this.node.querySelector('img');
    }

    if (!this.isLegacy) {
      this.replace();
    }
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      replace: scope.replace.bind(scope),
      restore: scope.restore.bind(scope)
    });
  }

  fetch () {
    if (this.img) {
      this.imgID = this.img.getAttribute('id');
      this.imgClass = this.img.getAttribute('class');
      this.imgURL = this.img.getAttribute('src');

      fetch(this.imgURL)
        .then(data => data.text())
        .then(response => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response, 'text/html');
          this.svg = xmlDoc.querySelector('svg');

          if (this.svg) {
            this.replace();
          }
        });
    }
  }

  replace () {
    if (!this.svg) {
      this.fetch();
      return;
    }

    if (this.imgID && typeof this.imgID !== 'undefined') {
      this.svg.setAttribute('id', this.imgID);
    }

    // gestion de la dépréciation
    let name = this.imgURL.match(/[ \w-]+\./)[0];
    if (name) {
      name = name.slice(0, -1);

      if (['dark', 'light', 'system'].includes(name)) {
        this.svg.innerHTML = this.svg.innerHTML.replaceAll('id="artwork-', `id="${name}-artwork-`);
        this.svg.innerHTML = this.svg.innerHTML.replaceAll('"#artwork-', `"#${name}-artwork-`);
      }
    }

    if (this.imgClass && typeof this.imgClass !== 'undefined') {
      this.svg.setAttribute('class', this.imgClass);
    }

    if (this.svg.hasAttribute('xmlns:a')) {
      this.svg.removeAttribute('xmlns:a');
    }

    this.node.setAttribute('data-fr-inject-svg', true);
    const svgAttributes = {
      'aria-hidden': true,
      focusable: false
    };
    setAttributes(this.svg, svgAttributes);
    this.node.replaceChild(this.svg, this.img);
  }

  restore () {
    if (this.img && this.svg) {
      this.node.setAttribute('data-fr-inject-svg', false);
      this.node.replaceChild(this.img, this.svg);
    }
  }
}

const InjectSvgSelector = {
  INJECT_SVG: `[${ns.attr('inject-svg')}]`
};

class Artwork extends Instance {
  static get instanceClassName () {
    return 'Artwork';
  }

  init () {
    if (this.isLegacy) {
      this.replace();
    }
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      replace: scope.replace.bind(scope)
    });
  }

  fetch () {
    this.xlink = this.node.getAttribute('href');
    const splitUrl = this.xlink.split('#');
    this.svgUrl = splitUrl[0];
    this.svgName = splitUrl[1];

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
      this.realSvgContent = xmlDoc.getElementById(this.svgName);
      if (this.realSvgContent) {
        if (this.realSvgContent.tagName === 'symbol') {
          this.use = xmlDoc.querySelector('use[href="#' + this.svgName + '"]');
          if (this.use) this.node.parentNode.insertBefore(this.use, this.node);
        } else {
          // deprecated svg structure
          this.realSvgContent.classList.add(this.node.classList);
        }

        this.replace();
      }
    };
    xhr.open('GET', this.svgUrl);
    xhr.send();
  }

  replace () {
    if (!this.realSvgContent) {
      this.fetch();
      return;
    }

    this.node.parentNode.replaceChild(this.realSvgContent, this.node);
  }
}

const ArtworkSelector = {
  ARTWORK_USE: `${ns.selector('artwork')} use`
};

const AssessSelector = {
  ASSESS_FILE: `${ns.attr.selector('assess-file')}`,
  DETAIL: `${ns.attr.selector('assess-file')} [class$="__detail"], ${ns.attr.selector('assess-file')} [class*="__detail "]`
};

const AssessEmission = {
  UPDATE: ns.emission('assess', 'update'),
  ADDED: ns.emission('assess', 'added')
};

class AssessFile extends Instance {
  static get instanceClassName () {
    return 'AssessFile';
  }

  init () {
    this.lang = this.getLang(this.node);
    this.href = this.getAttribute('href');
    this.hreflang = this.getAttribute('hreflang');
    this.file = {};
    this.gather();
    this.addAscent(AssessEmission.ADDED, this.update.bind(this));
    this.addDescent(AssessEmission.ADDED, this.update.bind(this));
  }

  getFileLength () {
    if (this.href === undefined) {
      this.length = -1;
      return;
    }

    fetch(this.href, { method: 'HEAD', mode: 'cors' }).then(response => {
      this.length = response.headers.get('content-length') || -1;
      if (this.length === -1) {
        inspector.warn('File size unknown: ' + this.href + '\nUnable to get HTTP header: "content-length"');
      }
      this.gather();
    });
  }

  mutate (attributeNames) {
    if (attributeNames.indexOf('href') !== -1) {
      this.href = this.getAttribute('href');
      this.getFileLength();
    }

    if (attributeNames.indexOf('hreflang') !== -1) {
      this.hreflang = this.getAttribute('hreflang');
      this.gather();
    }
  }

  gather () {
    // TODO V2: implémenter async
    if (this.isLegacy) this.length = -1;

    if (!this.length) {
      this.getFileLength();
      return;
    }

    this.details = [];

    if (this.href) {
      const extension = this.parseExtension(this.href);
      if (extension) this.details.push(extension.toUpperCase());
    }

    if (this.length !== -1) {
      this.details.push(this.bytesToSize(this.length));
    }

    if (this.hreflang) {
      this.details.push(this.getLangDisplayName(this.hreflang));
    }

    this.update();
  }

  update () {
    if (!this.details) return;
    this.descend(AssessEmission.UPDATE, this.details);
    this.ascend(AssessEmission.UPDATE, this.details);
  }

  getLang (elem) {
    // todo: ajouter un listener global de changement de langue
    if (elem.lang) return elem.lang;
    if (document.documentElement === elem) return window.navigator.language;
    return this.getLang(elem.parentElement);
  }

  parseExtension (url) {
    const regexExtension = /\.(\w{1,9})(?:$|[?#])/;
    return url.match(regexExtension)[0].replace('.', '');
  }

  getLangDisplayName (locale) {
    if (this.isLegacy) return locale;
    const displayNames = new Intl.DisplayNames([this.lang], { type: 'language' });
    const name = displayNames.of(locale);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  bytesToSize (bytes) {
    if (bytes === -1) return null;

    let sizeUnits = ['octets', 'ko', 'Mo', 'Go', 'To'];
    if (this.getAttribute(ns.attr('assess-file')) === 'bytes') {
      sizeUnits = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
    if (i === 0) return `${bytes} ${sizeUnits[i]}`;

    const size = bytes / (1000 ** i);
    const roundedSize = Math.round((size + Number.EPSILON) * 100) / 100; // arrondi a 2 décimal
    const stringSize = String(roundedSize).replace('.', ',');

    return `${stringSize} ${sizeUnits[i]}`;
  }
}

class AssessDetail extends Instance {
  static get instanceClassName () {
    return 'AssessDetail';
  }

  init () {
    this.addDescent(AssessEmission.UPDATE, this.update.bind(this));
    this.ascend(AssessEmission.ADDED);
  }

  update (details) {
    this.node.innerHTML = details.join(' - ');
  }
}

const ratiosImg = ['32x9', '16x9', '3x2', '4x3', '1x1', '3x4', '2x3'];
const ratiosVid = ['16x9', '4x3', '1x1'];

const ratioSelector = (name, modifiers) => {
  return modifiers.map(modifier => ns.selector(`${name}--${modifier}`)).join(',');
};

const deprecatedRatioSelector = `${ns.selector('responsive-img')}, ${ratioSelector('responsive-img', ratiosImg)}, ${ns.selector('responsive-vid')}, ${ratioSelector('responsive-vid', ratiosVid)}`;

const RatioSelector = {
  RATIO: `${ns.selector('ratio')}, ${ratioSelector('ratio', ratiosImg)}, ${deprecatedRatioSelector}`
};

const api = window[config.namespace];

class Ratio extends Instance {
  static get instanceClassName () {
    return 'Ratio';
  }

  init () {
    if (!api.internals.support.supportAspectRatio()) {
      this.ratio = 16 / 9;
      for (const className in this.classNames) {
        if (this.registration.selector.indexOf(this.classNames[className]) > 0) {
          const ratio = this.classNames[className].split('ratio-');
          if (ratio[1]) {
            this.ratio = ratio[1].split('x')[0] / ratio[1].split('x')[1];
          }
        }
      }
      this.isRendering = true;
      this.update();
    }
  }

  render () {
    const width = this.getRect().width;
    if (width !== this.currentWidth) this.update();
  }

  update () {
    this.currentWidth = this.getRect().width;
    this.style.height = this.currentWidth / this.ratio + 'px';
  }
}

const PlaceSelector = {
  TOP: ns.selector('placement--top'),
  RIGHT: ns.selector('placement--right'),
  BOTTOM: ns.selector('placement--bottom'),
  LEFT: ns.selector('placement--left')
};

const AlignSelector = {
  START: ns.selector('placement--start'),
  CENTER: ns.selector('placement--center'),
  END: ns.selector('placement--end')
};

const PlacementPosition = {
  TOP: 'place_top',
  RIGHT: 'place_right',
  BOTTOM: 'place_bottom',
  LEFT: 'place_left'
};

const PlacementAlign = {
  START: 'align_start',
  CENTER: 'align_center',
  END: 'align_end'
};

const PlacementMode = {
  AUTO: 'placement_auto',
  MANUAL: 'placement_manual'
};

class Placement extends Instance {
  constructor (mode = PlacementMode.AUTO, places = [PlacementPosition.BOTTOM, PlacementPosition.TOP, PlacementPosition.LEFT, PlacementPosition.RIGHT], aligns = [PlacementAlign.CENTER, PlacementAlign.START, PlacementAlign.END], safeAreaMargin = 16) {
    super();
    this._mode = mode;
    this._places = places;
    this._aligns = aligns;
    this._safeAreaMargin = safeAreaMargin;
    this._isShown = false;
    this._x = this._y = 0;
  }

  static get instanceClassName () {
    return 'Placement';
  }

  init () {
    this.isResizing = true;
  }

  get proxy () {
    const scope = this;
    const proxy = Object.assign(super.proxy, {
      show: scope.show.bind(scope),
      hide: scope.hide.bind(scope)
    });

    const proxyAccessors = {
      get mode () {
        return scope.mode;
      },
      set mode (value) {
        scope.mode = value;
      },
      get place () {
        return scope.place;
      },
      set place (value) {
        scope.place = value;
      },
      get align () {
        return scope.align;
      },
      set align (value) {
        scope.align = value;
      },
      get isShown () {
        return scope.isShown;
      },
      set isShown (value) {
        scope.isShown = value;
      }
    };

    return completeAssign(proxy, proxyAccessors);
  }

  get mode () {
    return this._mode;
  }

  set mode (value) {
    this._mode = value;
  }

  get place () {
    return this._place;
  }

  set place (value) {
    if (this._place === value) return;
    switch (this._place) {
      case PlacementPosition.TOP:
        this.removeClass(PlaceSelector.TOP);
        break;

      case PlacementPosition.RIGHT:
        this.removeClass(PlaceSelector.RIGHT);
        break;

      case PlacementPosition.BOTTOM:
        this.removeClass(PlaceSelector.BOTTOM);
        break;

      case PlacementPosition.LEFT:
        this.removeClass(PlaceSelector.LEFT);
        break;
    }
    this._place = value;
    switch (this._place) {
      case PlacementPosition.TOP:
        this.addClass(PlaceSelector.TOP);
        break;

      case PlacementPosition.RIGHT:
        this.addClass(PlaceSelector.RIGHT);
        break;

      case PlacementPosition.BOTTOM:
        this.addClass(PlaceSelector.BOTTOM);
        break;

      case PlacementPosition.LEFT:
        this.addClass(PlaceSelector.LEFT);
        break;
    }
  }

  get align () {
    return this._align;
  }

  set align (value) {
    if (this._align === value) return;
    switch (this._align) {
      case PlacementAlign.START:
        this.removeClass(AlignSelector.START);
        break;

      case PlacementAlign.CENTER:
        this.removeClass(AlignSelector.CENTER);
        break;

      case PlacementAlign.END:
        this.removeClass(AlignSelector.END);
        break;
    }
    this._align = value;
    switch (this._align) {
      case PlacementAlign.START:
        this.addClass(AlignSelector.START);
        break;

      case PlacementAlign.CENTER:
        this.addClass(AlignSelector.CENTER);
        break;

      case PlacementAlign.END:
        this.addClass(AlignSelector.END);
        break;
    }
  }

  show () {
    this.isShown = true;
  }

  hide () {
    this.isShown = false;
  }

  get isShown () {
    return this._isShown;
  }

  set isShown (value) {
    if (this._isShown === value || !this.isEnabled) return;
    this.isRendering = value;
    this._isShown = value;
  }

  setReferent (referent) {
    this._referent = referent;
  }

  render () {
    if (!this._referent) return;
    this.referentRect = this._referent.getRect();
    this.rect = this.getRect();
    this.safeArea = this.getSafeArea();

    if (this.mode === PlacementMode.AUTO) {
      this.place = this.getPlace();
      switch (this.place) {
        case PlacementPosition.TOP:
        case PlacementPosition.BOTTOM:
          this.align = this.getHorizontalAlign();
          break;

        case PlacementPosition.LEFT:
        case PlacementPosition.RIGHT:
          this.align = this.getVerticalAlign();
      }
    }

    let x, y;

    switch (this.place) {
      case PlacementPosition.TOP:
        y = this.referentRect.top - this.rect.top - this.rect.height;
        break;

      case PlacementPosition.RIGHT:
        x = this.referentRect.left - this.rect.left + this.referentRect.width;
        break;

      case PlacementPosition.BOTTOM:
        y = this.referentRect.top - this.rect.top + this.referentRect.height;
        break;

      case PlacementPosition.LEFT:
        x = this.referentRect.left - this.rect.left - this.rect.width;
        break;
    }

    switch (this.place) {
      case PlacementPosition.TOP:
      case PlacementPosition.BOTTOM:
        switch (this.align) {
          case PlacementAlign.CENTER:
            x = this.referentRect.left - this.rect.left + this.referentRect.width * 0.5 - this.rect.width * 0.5;
            break;

          case PlacementAlign.START:
            x = this.referentRect.left - this.rect.left;
            break;

          case PlacementAlign.END:
            x = this.referentRect.left - this.rect.left + this.referentRect.width - this.rect.width;
            break;
        }
        break;

      case PlacementPosition.RIGHT:
      case PlacementPosition.LEFT:
        switch (this.align) {
          case PlacementAlign.CENTER:
            y = this.referentRect.top - this.rect.top + this.referentRect.height * 0.5 - this.rect.height * 0.5;
            break;

          case PlacementAlign.START:
            y = this.referentRect.top - this.rect.top;
            break;

          case PlacementAlign.END:
            y = this.referentRect.top - this.rect.top - this.rect.height;
            break;
        }
        break;
    }

    this._x += (x + 0.5) | 0;
    this._y += (y + 0.5) | 0;
    this.node.style.transform = `translate(${this._x}px,${this._y}px)`;
  }

  getPlace () {
    for (const place of this._places) {
      switch (place) {
        case PlacementPosition.TOP:
          if (this.referentRect.top - this.rect.height > this.safeArea.top) return PlacementPosition.TOP;
          break;

        case PlacementPosition.RIGHT:
          if (this.referentRect.right + this.rect.width < this.safeArea.right) return PlacementPosition.RIGHT;
          break;

        case PlacementPosition.BOTTOM:
          if (this.referentRect.bottom + this.rect.height < this.safeArea.bottom) return PlacementPosition.BOTTOM;
          break;

        case PlacementPosition.LEFT:
          if (this.referentRect.left - this.rect.width > this.safeArea.left) return PlacementPosition.LEFT;
          break;
      }
    }

    return this._places[0];
  }

  getHorizontalAlign () {
    for (const align of this._aligns) {
      switch (align) {
        case PlacementAlign.CENTER:
          if (this.referentRect.center - this.rect.width * 0.5 > this.safeArea.left && this.referentRect.center + this.rect.width * 0.5 < this.safeArea.right) return PlacementAlign.CENTER;
          break;

        case PlacementAlign.START:
          if (this.referentRect.left + this.rect.width < this.safeArea.right) return PlacementAlign.START;
          break;

        case PlacementAlign.END:
          if (this.referentRect.right - this.rect.width > this.safeArea.left) return PlacementAlign.END;
          break;
      }
    }

    return this._aligns[0];
  }

  getVerticalAlign () {
    for (const align of this._aligns) {
      switch (align) {
        case PlacementAlign.CENTER:
          if (this.referentRect.middle - this.rect.height * 0.5 > this.safeArea.top && this.referentRect.middle + this.rect.height * 0.5 < this.safeArea.bottom) return PlacementAlign.CENTER;
          break;

        case PlacementAlign.START:
          if (this.referentRect.top + this.rect.height < this.safeArea.bottom) return PlacementAlign.START;
          break;

        case PlacementAlign.END:
          if (this.referentRect.bottom - this.rect.height > this.safeArea.top) return PlacementAlign.END;
          break;
      }
    }

    return this._aligns[0];
  }

  getSafeArea () {
    let element = this.node;
    let isX, isY;
    let top = this._safeAreaMargin;
    let right = window.innerWidth - this._safeAreaMargin;
    let bottom = window.innerHeight - this._safeAreaMargin;
    let left = this._safeAreaMargin;

    while (element) {
      if (element === document.body) break;
      element = element.parentElement;
      const style = window.getComputedStyle(element);

      const overflow = /(visible|(\w+))(\s(visible|(\w+)))?/.exec(style.overflow);
      isX = overflow[2] !== undefined;
      isY = overflow[3] !== undefined ? overflow[5] !== undefined : overflow[2] !== undefined;

      if (!isX && !isY) continue;
      const rect = element.getBoundingClientRect();

      if (isX) {
        if (rect.left > left) left = rect.left;
        if (rect.right < right) right = rect.right;
      }
      if (isY) {
        if (rect.top > top) top = rect.top;
        if (rect.bottom < bottom) bottom = rect.bottom;
      }
    }

    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      center: left + (right - left) * 0.5,
      middle: top + (bottom - top) * 0.5
    };
  }

  dispose () {
    this._referent = null;
    super.dispose();
  }
}

class PlacementReferent extends Instance {
  constructor () {
    super();
    this._isShown = false;
  }

  static get instanceClassName () {
    return 'PlacementReferent';
  }

  init () {
    this.registration.creator.setReferent(this);
    this._placement = this.registration.creator;
  }

  get placement () {
    return this._placement;
  }

  get isShown () {
    return this._isShown;
  }

  set isShown (value) {
    if (this._isShown === value || !this.isEnabled) return;
    this._isShown = value;
    if (value) this.registration.creator.show();
    else this.registration.creator.hide();
  }

  show () {
    this.isShown = true;
  }

  hide () {
    this.isShown = false;
  }
}

api$1.core = {
  Instance: Instance,
  Breakpoints: Breakpoints,
  KeyCodes: KeyCodes,
  Disclosure: Disclosure,
  DisclosureButton: DisclosureButton,
  DisclosuresGroup: DisclosuresGroup,
  DisclosureType: DisclosureType,
  DisclosureEvent: DisclosureEvent,
  DisclosureSelector: DisclosureSelector,
  DisclosureEmission: DisclosureEmission,
  Collapse: Collapse,
  CollapseButton: CollapseButton,
  CollapsesGroup: CollapsesGroup,
  CollapseSelector: CollapseSelector,
  RootSelector: RootSelector,
  RootEmission: RootEmission,
  Equisized: Equisized,
  EquisizedEmission: EquisizedEmission,
  Toggle: Toggle,
  EquisizedsGroup: EquisizedsGroup,
  InjectSvg: InjectSvg,
  InjectSvgSelector: InjectSvgSelector,
  Artwork: Artwork,
  ArtworkSelector: ArtworkSelector,
  AssessFile: AssessFile,
  AssessDetail: AssessDetail,
  AssessEmission: AssessEmission,
  AssessSelector: AssessSelector,
  Ratio: Ratio,
  RatioSelector: RatioSelector,
  Placement: Placement,
  PlacementReferent: PlacementReferent,
  PlacementAlign: PlacementAlign,
  PlacementPosition: PlacementPosition,
  PlacementMode: PlacementMode
};

api$1.internals.register(api$1.core.CollapseSelector.COLLAPSE, api$1.core.Collapse);
api$1.internals.register(api$1.core.InjectSvgSelector.INJECT_SVG, api$1.core.InjectSvg);
api$1.internals.register(api$1.core.RatioSelector.RATIO, api$1.core.Ratio);
api$1.internals.register(api$1.core.AssessSelector.ASSESS_FILE, api$1.core.AssessFile);
api$1.internals.register(api$1.core.AssessSelector.DETAIL, api$1.core.AssessDetail);

const SchemeValue = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark'
};

const SchemeAttribute = {
  THEME: api.internals.ns.attr('theme'),
  SCHEME: api.internals.ns.attr('scheme'),
  TRANSITION: api.internals.ns.attr('transition')
};

const SchemeTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const SchemeEmission = {
  SCHEME: api.internals.ns.emission('scheme', 'scheme'),
  THEME: api.internals.ns.emission('scheme', 'theme'),
  ASK: api.internals.ns.emission('scheme', 'ask')
};

const SchemeEvent = {
  SCHEME: api.internals.ns.event('scheme'),
  THEME: api.internals.ns.event('theme')
};

class Scheme extends api.core.Instance {
  constructor () {
    super(false);
  }

  static get instanceClassName () {
    return 'Scheme';
  }

  init () {
    this.changing = this.change.bind(this);

    if (this.hasAttribute(SchemeAttribute.TRANSITION)) {
      this.removeAttribute(SchemeAttribute.TRANSITION);
      this.request(this.restoreTransition.bind(this));
    }

    const scheme = api.internals.support.supportLocalStorage() ? localStorage.getItem('scheme') : '';
    const schemeAttr = this.getAttribute(SchemeAttribute.SCHEME);

    switch (scheme) {
      case SchemeValue.DARK:
      case SchemeValue.LIGHT:
      case SchemeValue.SYSTEM:
        this.scheme = scheme;
        break;

      default:
        switch (schemeAttr) {
          case SchemeValue.DARK:
            this.scheme = SchemeValue.DARK;
            break;

          case SchemeValue.LIGHT:
            this.scheme = SchemeValue.LIGHT;
            break;

          default:
            this.scheme = SchemeValue.SYSTEM;
        }
    }

    this.addAscent(SchemeEmission.ASK, this.ask.bind(this));
    this.addAscent(SchemeEmission.SCHEME, this.apply.bind(this));
  }

  get proxy () {
    const scope = this;

    const proxyAccessors = {
      get scheme () {
        return scope.scheme;
      },
      set scheme (value) {
        scope.scheme = value;
      }
    };

    return api.internals.property.completeAssign(super.proxy, proxyAccessors);
  }

  restoreTransition () {
    this.setAttribute(SchemeAttribute.TRANSITION, '');
  }

  ask () {
    this.descend(SchemeEmission.SCHEME, this.scheme);
  }

  apply (value) {
    this.scheme = value;
  }

  get scheme () {
    return this._scheme;
  }

  set scheme (value) {
    if (this._scheme === value) return;
    this._scheme = value;
    switch (value) {
      case SchemeValue.SYSTEM:
        this.listenPreferences();
        break;

      case SchemeValue.DARK:
        this.unlistenPreferences();
        this.theme = SchemeTheme.DARK;
        break;

      case SchemeValue.LIGHT:
        this.unlistenPreferences();
        this.theme = SchemeTheme.LIGHT;
        break;

      default:
        this.scheme = SchemeValue.SYSTEM;
        return;
    }

    this.descend(SchemeEmission.SCHEME, value);
    if (api.internals.support.supportLocalStorage()) {
      localStorage.setItem('scheme', value);
    }
    this.setAttribute(SchemeAttribute.SCHEME, value);
    this.dispatch(SchemeEvent.SCHEME, { scheme: this._scheme }, false);
  }

  get theme () {
    return this._theme;
  }

  set theme (value) {
    if (this._theme === value) return;
    switch (value) {
      case SchemeTheme.LIGHT:
      case SchemeTheme.DARK:
        this._theme = value;
        this.setAttribute(SchemeAttribute.THEME, value);
        this.descend(SchemeEmission.THEME, value);
        this.dispatch(SchemeEvent.THEME, { theme: this._theme }, false);
        document.documentElement.style.colorScheme = value === SchemeTheme.DARK ? 'dark' : '';
        break;
    }
  }

  listenPreferences () {
    if (this.isListening) return;
    this.isListening = true;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (this.mediaQuery.addEventListener) this.mediaQuery.addEventListener('change', this.changing);
    this.change();
  }

  unlistenPreferences () {
    if (!this.isListening) return;
    this.isListening = false;
    this.mediaQuery.removeEventListener('change', this.changing);
    this.mediaQuery = null;
  }

  change () {
    if (!this.isListening) return;
    this.theme = this.mediaQuery.matches ? SchemeTheme.DARK : SchemeTheme.LIGHT;
  }

  mutate (attributeNames) {
    if (attributeNames.indexOf(SchemeAttribute.SCHEME) > -1) this.scheme = this.getAttribute(SchemeAttribute.SCHEME);
    if (attributeNames.indexOf(SchemeAttribute.THEME) > -1) this.theme = this.getAttribute(SchemeAttribute.THEME);
  }

  dispose () {
    this.unlistenPreferences();
  }
}

const SchemeSelector = {
  SCHEME: `:root${api.internals.ns.attr.selector('theme')}, :root${api.internals.ns.attr.selector('scheme')}`,
  SWITCH_THEME: api.internals.ns.selector('switch-theme'),
  RADIO_BUTTONS: `input[name="${api.internals.ns('radios-theme')}"]`
};

api.scheme = {
  Scheme: Scheme,
  SchemeValue: SchemeValue,
  SchemeSelector: SchemeSelector,
  SchemeEmission: SchemeEmission,
  SchemeTheme: SchemeTheme,
  SchemeEvent: SchemeEvent
};

api.internals.register(api.scheme.SchemeSelector.SCHEME, api.scheme.Scheme);

const ACCORDION = api.internals.ns.selector('accordion');
const COLLAPSE$2 = api.internals.ns.selector('collapse');

const AccordionSelector = {
  GROUP: api.internals.ns.selector('accordions-group'),
  ACCORDION: ACCORDION,
  COLLAPSE: `${ACCORDION} > ${COLLAPSE$2}, ${ACCORDION} > *:not(${ACCORDION}):not(${COLLAPSE$2}) > ${COLLAPSE$2}, ${ACCORDION} > *:not(${ACCORDION}):not(${COLLAPSE$2}) > *:not(${ACCORDION}):not(${COLLAPSE$2}) > ${COLLAPSE$2}`,
  COLLAPSE_LEGACY: `${ACCORDION} ${COLLAPSE$2}`,
  BUTTON: `${ACCORDION}__btn`
};

class Accordion extends api.core.Instance {
  static get instanceClassName () {
    return 'Accordion';
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(AccordionSelector.BUTTON));
    return buttons[0];
  }
}

class AccordionsGroup extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'AccordionsGroup';
  }

  validate (member) {
    const match = member.node.matches(api.internals.legacy.isLegacy ? AccordionSelector.COLLAPSE_LEGACY : AccordionSelector.COLLAPSE);
    return super.validate(member) && match;
  }
}

api.accordion = {
  Accordion: Accordion,
  AccordionSelector: AccordionSelector,
  AccordionsGroup: AccordionsGroup
};

api.internals.register(api.accordion.AccordionSelector.GROUP, api.accordion.AccordionsGroup);
api.internals.register(api.accordion.AccordionSelector.ACCORDION, api.accordion.Accordion);

const ButtonSelector = {
  EQUISIZED_BUTTON: `${api.internals.ns.selector('btns-group--equisized')} ${api.internals.ns.selector('btn')}`,
  EQUISIZED_GROUP: api.internals.ns.selector('btns-group--equisized')
};

api.button = {
  ButtonSelector: ButtonSelector
};

api.internals.register(api.button.ButtonSelector.EQUISIZED_BUTTON, api.core.Equisized);
api.internals.register(api.button.ButtonSelector.EQUISIZED_GROUP, api.core.EquisizedsGroup);

class CardDownload extends api.core.Instance {
  static get instanceClassName () {
    return 'CardDownload';
  }

  init () {
    this.addAscent(api.core.AssessEmission.UPDATE, details => {
      this.descend(api.core.AssessEmission.UPDATE, details);
    });
    this.addAscent(api.core.AssessEmission.ADDED, () => {
      this.descend(api.core.AssessEmission.ADDED);
    });
  }
}

const CardSelector = {
  DOWNLOAD: api.internals.ns.selector('card--download'),
  DOWNLOAD_DETAIL: `${api.internals.ns.selector('card--download')} ${api.internals.ns.selector('card__end')} ${api.internals.ns.selector('card__detail')}`
};

api.card = {
  CardSelector: CardSelector,
  CardDownload: CardDownload
};

api.internals.register(api.card.CardSelector.DOWNLOAD, api.card.CardDownload);
api.internals.register(api.card.CardSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

const CheckboxSelector = {
  INPUT: `${api.internals.ns.selector('checkbox-group')} input[type="checkbox"]`
};

const CheckboxEmission = {
  CHANGE: api.internals.ns.emission('checkbox', 'change'),
  RETRIEVE: api.internals.ns.emission('checkbox', 'retrieve')
};

class CheckboxInput extends api.core.Instance {
  static get instanceClassName () {
    return 'CheckboxInput';
  }

  constructor () {
    super();
    this._handlingChange = this.handleChange.bind(this);
  }

  init () {
    this.node.addEventListener('change', this._handlingChange);
    this.addDescent(CheckboxEmission.RETRIEVE, this._handlingChange);
    this.handleChange();
  }

  get isChecked () {
    return this.node.checked;
  }

  handleChange () {
    this.ascend(CheckboxEmission.CHANGE, this.node);
  }
}

api.checkbox = {
  CheckboxSelector: CheckboxSelector,
  CheckboxEmission: CheckboxEmission,
  CheckboxInput: CheckboxInput
};

api.internals.register(api.checkbox.CheckboxSelector.INPUT, api.checkbox.CheckboxInput);

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

const BreadcrumbSelector = {
  BREADCRUMB: api.internals.ns.selector('breadcrumb'),
  BUTTON: api.internals.ns.selector('breadcrumb__button')
};

class Breadcrumb extends api.core.Instance {
  constructor () {
    super();
    this.count = 0;
    this.focusing = this.focus.bind(this);
  }

  static get instanceClassName () {
    return 'Breadcrumb';
  }

  init () {
    this.getCollapse();
    this.isResizing = true;
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      focus: scope.focus.bind(scope),
      disclose: scope.collapse.disclose.bind(scope.collapse)
    });
  }

  getCollapse () {
    const collapse = this.collapse;
    if (collapse) {
      collapse.listen(api.core.DisclosureEvent.DISCLOSE, this.focusing);
    } else {
      this.addAscent(api.core.DisclosureEmission.ADDED, this.getCollapse.bind(this));
    }
  }

  resize () {
    const collapse = this.collapse;
    const links = this.links;
    if (!collapse || !links.length) return;

    if (this.isBreakpoint(api.core.Breakpoints.MD)) {
      if (collapse.buttonHasFocus) links[0].focus();
    } else {
      if (links.indexOf(document.activeElement) > -1) collapse.focus();
    }
  }

  get links () {
    return [...this.querySelectorAll('a[href]')];
  }

  get collapse () {
    return this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
  }

  focus () {
    this.count = 0;
    this._focus();
  }

  _focus () {
    const link = this.links[0];
    if (!link) return;
    link.focus();
    this.request(this.verify.bind(this));
  }

  verify () {
    this.count++;
    if (this.count > 100) return;
    const link = this.links[0];
    if (!link) return;
    if (document.activeElement !== link) this._focus();
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(BreadcrumbSelector.BUTTON));
    return buttons[0];
  }
}

api.breadcrumb = {
  BreadcrumbSelector: BreadcrumbSelector,
  Breadcrumb: Breadcrumb
};

api.internals.register(api.breadcrumb.BreadcrumbSelector.BREADCRUMB, api.breadcrumb.Breadcrumb);

const TooltipSelector = {
  TOOLTIP: api.internals.ns.selector('tooltip'),
  SHOWN: api.internals.ns.selector('tooltip--shown'),
  HIDDING: api.internals.ns.selector('tooltip--hidding'),
  BUTTON: api.internals.ns.selector('btn--tooltip')
};

const TooltipReferentState = {
  FOCUS: 1 << 0,
  HOVER: 1 << 1
};

class TooltipReferent extends api.core.PlacementReferent {
  constructor () {
    super();
    this._state = 0;
  }

  static get instanceClassName () {
    return 'TooltipReferent';
  }

  init () {
    super.init();
    this.listen('focusin', this.focusIn.bind(this));
    this.listen('focusout', this.focusOut.bind(this));
    if (!this.matches(TooltipSelector.BUTTON)) {
      const mouseover = this.mouseover.bind(this);
      this.listen('mouseover', mouseover);
      this.placement.listen('mouseover', mouseover);
      const mouseout = this.mouseout.bind(this);
      this.listen('mouseout', mouseout);
      this.placement.listen('mouseout', mouseout);
    }
    this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
    this.listen('click', this._click.bind(this));
    this.addEmission(api.core.RootEmission.CLICK, this._clickOut.bind(this));
  }

  _click () {
    this.focus();
  }

  _clickOut (target) {
    if (!this.node.contains(target)) this.blur();
  }

  _keydown (keyCode) {
    switch (keyCode) {
      case api.core.KeyCodes.ESCAPE:
        this.blur();
        this.close();
        break;
    }
  }

  close () {
    this.state = 0;
  }

  get state () {
    return this._state;
  }

  set state (value) {
    if (this._state === value) return;
    this.isShown = value > 0;
    this._state = value;
  }

  focusIn () {
    this.state |= TooltipReferentState.FOCUS;
  }

  focusOut () {
    this.state &= ~TooltipReferentState.FOCUS;
  }

  mouseover () {
    this.state |= TooltipReferentState.HOVER;
  }

  mouseout () {
    this.state &= ~TooltipReferentState.HOVER;
  }
}

const TooltipEvent = {
  SHOW: ns.event('show'),
  HIDE: ns.event('hide')
};

const TooltipState = {
  HIDDEN: 'hidden',
  SHOWN: 'shown',
  HIDING: 'hiding'
};

class Tooltip extends api.core.Placement {
  constructor () {
    super(api.core.PlacementMode.AUTO, [api.core.PlacementPosition.TOP, api.core.PlacementPosition.BOTTOM], [api.core.PlacementAlign.CENTER, api.core.PlacementAlign.START, api.core.PlacementAlign.END]);
    this.modifier = '';
    this._state = TooltipState.HIDDEN;
  }

  static get instanceClassName () {
    return 'Tooltip';
  }

  init () {
    super.init();
    this.register(`[aria-describedby="${this.id}"]`, TooltipReferent);
    this.listen('transitionend', this.transitionEnd.bind(this));
  }

  transitionEnd () {
    if (this._state === TooltipState.HIDING) {
      this.removeClass(TooltipSelector.SHOWN);
      this.removeClass(TooltipSelector.HIDDING);
      this._state = TooltipState.HIDDEN;
      this.isShown = false;
    }
  }

  get isShown () {
    return super.isShown;
  }

  set isShown (value) {
    if (!this.isEnabled) return;
    switch (true) {
      case value:
        this._state = TooltipState.SHOWN;
        this.addClass(TooltipSelector.SHOWN);
        this.removeClass(TooltipSelector.HIDDING);
        this.dispatch(TooltipEvent.SHOW);
        super.isShown = true;
        break;

      case this.isShown && !value && this._state === TooltipState.SHOWN:
        this._state = TooltipState.HIDING;
        this.addClass(TooltipSelector.HIDDING);
        break;

      case this.isShown && !value && this._state === TooltipState.HIDDEN:
        this.dispatch(TooltipEvent.HIDE);
        this.removeClass(TooltipSelector.HIDDING);
        super.isShown = false;
        break;
    }
  }

  render () {
    super.render();
    this.rect = this.getRect();
    let x = this.referentRect.center - this.rect.center;
    const limit = this.rect.width * 0.5 - 8;
    if (x < -limit) x = -limit;
    if (x > limit) x = limit;
    this.setProperty('--arrow-x', `${x.toFixed(2)}px`);
  }
}

api.tooltip = {
  Tooltip: Tooltip,
  TooltipSelector: TooltipSelector,
  TooltipEvent: TooltipEvent
};

api.internals.register(api.tooltip.TooltipSelector.TOOLTIP, api.tooltip.Tooltip);

class ToggleInput extends api.core.Instance {
  static get instanceClassName () {
    return 'ToggleInput';
  }

  get isChecked () {
    return this.node.checked;
  }
}

class ToggleStatusLabel extends api.core.Instance {
  static get instanceClassName () {
    return 'ToggleStatusLabel';
  }

  init () {
    this.register(`input[id="${this.getAttribute('for')}"]`, ToggleInput);
    this.update();
    this.isSwappingFont = true;
  }

  get proxy () {
    const scope = this;
    return Object.assign(super.proxy, {
      update: scope.update.bind(scope)
    });
  }

  get input () {
    return this.getRegisteredInstances('ToggleInput')[0];
  }

  update () {
    this.node.style.removeProperty('--toggle-status-width');
    const checked = this.input.isChecked;

    const style = getComputedStyle(this.node, ':before');
    let maxWidth = parseFloat(style.width);
    this.input.node.checked = !checked;

    const style2 = getComputedStyle(this.node, ':before');
    const width = parseFloat(style2.width);
    if (width > maxWidth) maxWidth = width;
    this.input.node.checked = checked;

    this.node.style.setProperty('--toggle-status-width', (maxWidth / 16) + 'rem');
  }

  swapFont (families) {
    this.update();
  }
}

const ToggleSelector = {
  STATUS_LABEL: `${api.internals.ns.selector('toggle__label')}${api.internals.ns.attr.selector('checked-label')}${api.internals.ns.attr.selector('unchecked-label')}`
};

// import { ToggleInput } from './script/toggle/toggle-input.js';

api.toggle = {
  ToggleStatusLabel: ToggleStatusLabel,
  ToggleSelector: ToggleSelector
};

api.internals.register(api.toggle.ToggleSelector.STATUS_LABEL, api.toggle.ToggleStatusLabel);

const ITEM$1 = api.internals.ns.selector('sidemenu__item');
const COLLAPSE$1 = api.internals.ns.selector('collapse');

const SidemenuSelector = {
  LIST: api.internals.ns.selector('sidemenu__list'),
  COLLAPSE: `${ITEM$1} > ${COLLAPSE$1}, ${ITEM$1} > *:not(${ITEM$1}):not(${COLLAPSE$1}) > ${COLLAPSE$1}, ${ITEM$1} > *:not(${ITEM$1}):not(${COLLAPSE$1}) > *:not(${ITEM$1}):not(${COLLAPSE$1}) > ${COLLAPSE$1}`,
  COLLAPSE_LEGACY: `${ITEM$1} ${COLLAPSE$1}`,
  ITEM: api.internals.ns.selector('sidemenu__item'),
  BUTTON: api.internals.ns.selector('sidemenu__btn')
};

class SidemenuList extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'SidemenuList';
  }

  validate (member) {
    return super.validate(member) && member.node.matches(api.internals.legacy.isLegacy ? SidemenuSelector.COLLAPSE_LEGACY : SidemenuSelector.COLLAPSE);
  }
}

class SidemenuItem extends api.core.Instance {
  static get instanceClassName () {
    return 'SidemenuItem';
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(SidemenuSelector.BUTTON));
    return buttons[0];
  }
}

api.sidemenu = {
  SidemenuList: SidemenuList,
  SidemenuItem: SidemenuItem,
  SidemenuSelector: SidemenuSelector
};

api.internals.register(api.sidemenu.SidemenuSelector.LIST, api.sidemenu.SidemenuList);
api.internals.register(api.sidemenu.SidemenuSelector.ITEM, api.sidemenu.SidemenuItem);

const ModalSelector = {
  MODAL: api.internals.ns.selector('modal'),
  SCROLL_DIVIDER: api.internals.ns.selector('scroll-divider'),
  BODY: api.internals.ns.selector('modal__body'),
  TITLE: api.internals.ns.selector('modal__title')
};

class ModalButton extends api.core.DisclosureButton {
  constructor () {
    super(api.core.DisclosureType.OPENED);
  }

  static get instanceClassName () {
    return 'ModalButton';
  }
}

const ModalAttribute = {
  CONCEALING_BACKDROP: api.internals.ns.attr('concealing-backdrop')
};

class Modal extends api.core.Disclosure {
  constructor () {
    super(api.core.DisclosureType.OPENED, ModalSelector.MODAL, ModalButton, 'ModalsGroup');
    this._isActive = false;
    this.scrolling = this.resize.bind(this, false);
    this.resizing = this.resize.bind(this, true);
  }

  static get instanceClassName () {
    return 'Modal';
  }

  init () {
    super.init();
    this._isDialog = this.node.tagName === 'DIALOG';
    this.isScrolling = false;
    this.listenClick();
    this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
  }

  _keydown (keyCode) {
    switch (keyCode) {
      case api.core.KeyCodes.ESCAPE:
        this._escape();
        break;
    }
  }

  // TODO v2 : passer les tagName d'action en constante
  _escape () {
    const tagName = document.activeElement ? document.activeElement.tagName : undefined;

    switch (tagName) {
      case 'INPUT':
      case 'LABEL':
      case 'TEXTAREA':
      case 'SELECT':
      case 'AUDIO':
      case 'VIDEO':
        break;

      default:
        if (this.isDisclosed) {
          this.conceal();
          this.focus();
        }
    }
  }

  retrieved () {
    this._ensureAccessibleName();
  }

  get body () {
    return this.element.getDescendantInstances('ModalBody', 'Modal')[0];
  }

  handleClick (e) {
    if (e.target === this.node && this.getAttribute(ModalAttribute.CONCEALING_BACKDROP) !== 'false') this.conceal();
  }

  disclose (withhold) {
    if (!super.disclose(withhold)) return false;
    if (this.body) this.body.activate();
    this.isScrollLocked = true;
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('open', 'true');
    if (!this._isDialog) {
      this.activateModal();
    }
    return true;
  }

  conceal (withhold, preventFocus) {
    if (!super.conceal(withhold, preventFocus)) return false;
    this.isScrollLocked = false;
    this.removeAttribute('aria-modal');
    this.removeAttribute('open');
    if (this.body) this.body.deactivate();
    if (!this._isDialog) {
      this.deactivateModal();
    }
    return true;
  }

  get isDialog () {
    return this._isDialog;
  }

  set isDialog (value) {
    this._isDialog = value;
  }

  activateModal () {
    if (this._isActive) return;
    this._isActive = true;
    this._hasDialogRole = this.getAttribute('role') === 'dialog';
    if (!this._hasDialogRole) this.setAttribute('role', 'dialog');
  }

  deactivateModal () {
    if (!this._isActive) return;
    this._isActive = false;
    if (!this._hasDialogRole) this.removeAttribute('role');
  }

  _setAccessibleName (node, append) {
    const id = this.retrieveNodeId(node, append);
    this.warn(`add reference to ${append} for accessible name (aria-labelledby)`);
    this.setAttribute('aria-labelledby', id);
  }

  _ensureAccessibleName () {
    if (!this.isEnabled || (this.isEnabled && (this.hasAttribute('aria-labelledby') || this.hasAttribute('aria-label')))) return;
    this.warn('missing accessible name');
    const title = this.node.querySelector(ModalSelector.TITLE);
    const primary = this.primaryButtons[0];

    switch (true) {
      case title !== null:
        this._setAccessibleName(title, 'title');
        break;

      case primary !== undefined:
        this.warn('missing required title, fallback to primary button');
        this._setAccessibleName(primary, 'primary');
        break;
    }
  }
}

const unordereds = [
  '[tabindex="0"]',
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  'details>summary:first-of-type',
  'details',
  'iframe'
];

const UNORDEREDS = unordereds.join();

const ordereds = [
  '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
];

const ORDEREDS = ordereds.join();

const isFocusable = (element, container) => {
  if (!(element instanceof Element)) return false;
  const style = window.getComputedStyle(element);
  if (!style) return false;
  if (style.visibility === 'hidden') return false;
  if (container === undefined) container = element;

  while (container.contains(element)) {
    if (style.display === 'none') return false;
    element = element.parentElement;
  }

  return true;
};

class FocusTrap {
  constructor (onTrap, onUntrap) {
    this.element = null;
    this.activeElement = null;
    this.onTrap = onTrap;
    this.onUntrap = onUntrap;
    this.waiting = this.wait.bind(this);
    this.handling = this.handle.bind(this);
    this.focusing = this.maintainFocus.bind(this);
    this.current = null;
  }

  get trapped () { return this.element !== null; }

  trap (element) {
    if (this.trapped) this.untrap();

    this.element = element;
    this.isTrapping = true;
    this.wait();

    if (this.onTrap) this.onTrap();
  }

  wait () {
    if (!isFocusable(this.element)) {
      window.requestAnimationFrame(this.waiting);
      return;
    }

    this.trapping();
  }

  trapping () {
    if (!this.isTrapping) return;
    this.isTrapping = false;
    const focusables = this.focusables;
    if (focusables.length && focusables.indexOf(document.activeElement) === -1) focusables[0].focus();
    this.element.setAttribute('aria-modal', true);
    window.addEventListener('keydown', this.handling);
    document.body.addEventListener('focus', this.focusing, true);
  }

  stun (node) {
    for (const child of node.children) {
      if (child === this.element) continue;
      if (child.contains(this.element)) {
        this.stun(child);
        continue;
      }
      this.stunneds.push(new Stunned(child));
    }
  }

  maintainFocus (event) {
    if (!this.element.contains(event.target)) {
      const focusables = this.focusables;
      if (focusables.length === 0) return;
      const first = focusables[0];
      event.preventDefault();
      first.focus();
    }
  }

  handle (e) {
    if (e.keyCode !== 9) return;

    const focusables = this.focusables;
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const index = focusables.indexOf(document.activeElement);

    if (e.shiftKey) {
      if (!this.element.contains(document.activeElement) || index < 1) {
        e.preventDefault();
        last.focus();
      } else if (document.activeElement.tabIndex > 0 || focusables[index - 1].tabIndex > 0) {
        e.preventDefault();
        focusables[index - 1].focus();
      }
    } else {
      if (!this.element.contains(document.activeElement) || index === focusables.length - 1 || index === -1) {
        e.preventDefault();
        first.focus();
      } else if (document.activeElement.tabIndex > 0) {
        e.preventDefault();
        focusables[index + 1].focus();
      }
    }
  }

  get focusables () {
    let unordereds = api.internals.dom.querySelectorAllArray(this.element, UNORDEREDS);

    /**
     *  filtrage des radiobutttons de même name (la navigations d'un groupe de radio se fait à la flèche et non pas au tab
     **/
    const radios = api.internals.dom.querySelectorAllArray(document.documentElement, 'input[type="radio"]');

    if (radios.length) {
      const groups = {};

      for (const radio of radios) {
        const name = radio.getAttribute('name');
        if (groups[name] === undefined) groups[name] = new RadioButtonGroup(name);
        groups[name].push(radio);
      }

      unordereds = unordereds.filter((unordered) => {
        if (unordered.tagName.toLowerCase() !== 'input' || (unordered.getAttribute('type') && unordered.getAttribute('type').toLowerCase() !== 'radio')) return true;
        const name = unordered.getAttribute('name');
        return groups[name].keep(unordered);
      });
    }

    const ordereds = api.internals.dom.querySelectorAllArray(this.element, ORDEREDS);

    ordereds.sort((a, b) => a.tabIndex - b.tabIndex);

    const noDuplicates = unordereds.filter((element) => ordereds.indexOf(element) === -1);
    const concateneds = ordereds.concat(noDuplicates);
    return concateneds.filter((element) => element.tabIndex !== '-1' && isFocusable(element, this.element));
  }

  untrap () {
    if (!this.trapped) return;
    this.isTrapping = false;

    this.element.removeAttribute('aria-modal');
    window.removeEventListener('keydown', this.handling);
    document.body.removeEventListener('focus', this.focusing, true);

    this.element = null;

    if (this.onUntrap) this.onUntrap();
  }

  dispose () {
    this.untrap();
  }
}

class Stunned {
  constructor (element) {
    this.element = element;
    // this.hidden = element.getAttribute('aria-hidden');
    this.inert = element.getAttribute('inert');

    // this.element.setAttribute('aria-hidden', true);
    this.element.setAttribute('inert', '');
  }

  unstun () {
    /*
    if (this.hidden === null) this.element.removeAttribute('aria-hidden');
    else this.element.setAttribute('aria-hidden', this.hidden);
     */

    if (this.inert === null) this.element.removeAttribute('inert');
    else this.element.setAttribute('inert', this.inert);
  }
}

class RadioButtonGroup {
  constructor (name) {
    this.name = name;
    this.buttons = [];
  }

  push (button) {
    this.buttons.push(button);
    if (button === document.activeElement || button.checked || this.selected === undefined) this.selected = button;
  }

  keep (button) {
    return this.selected === button;
  }
}

class ModalsGroup extends api.core.DisclosuresGroup {
  constructor () {
    super('Modal', false);
    this.focusTrap = new FocusTrap();
  }

  static get instanceClassName () {
    return 'ModalsGroup';
  }

  apply (value, initial) {
    super.apply(value, initial);
    if (this.current === null) this.focusTrap.untrap();
    else this.focusTrap.trap(this.current.node);
  }
}

const OFFSET = 32; // 32px => 8v => 2rem

class ModalBody extends api.core.Instance {
  static get instanceClassName () {
    return 'ModalBody';
  }

  init () {
    this.listen('scroll', this.divide.bind(this));
  }

  activate () {
    this.isResizing = true;
    this.resize();
  }

  deactivate () {
    this.isResizing = false;
  }

  divide () {
    if (this.node.scrollHeight > this.node.clientHeight) {
      if (this.node.offsetHeight + this.node.scrollTop >= this.node.scrollHeight) {
        this.removeClass(ModalSelector.SCROLL_DIVIDER);
      } else {
        this.addClass(ModalSelector.SCROLL_DIVIDER);
      }
    } else {
      this.removeClass(ModalSelector.SCROLL_DIVIDER);
    }
  }

  resize () {
    this.adjust();
    this.request(this.adjust.bind(this));
  }

  adjust () {
    const offset = OFFSET * (this.isBreakpoint(api.core.Breakpoints.MD) ? 2 : 1);
    if (this.isLegacy) this.style.maxHeight = `${window.innerHeight - offset}px`;
    else this.style.setProperty('--modal-max-height', `${window.innerHeight - offset}px`);
    this.divide();
  }
}

api.modal = {
  Modal: Modal,
  ModalButton: ModalButton,
  ModalBody: ModalBody,
  ModalsGroup: ModalsGroup,
  ModalSelector: ModalSelector
};

api.internals.register(api.modal.ModalSelector.MODAL, api.modal.Modal);
api.internals.register(api.modal.ModalSelector.BODY, api.modal.ModalBody);
api.internals.register(api.core.RootSelector.ROOT, api.modal.ModalsGroup);

const PasswordEmission = {
  TOGGLE: api.internals.ns.emission('password', 'toggle'),
  ADJUST: api.internals.ns.emission('password', 'adjust')
};

class PasswordToggle extends api.core.Instance {
  static get instanceClassName () {
    return 'PasswordToggle';
  }

  init () {
    this.listenClick();
    this.ascend(PasswordEmission.ADJUST, this.width);
    this.isSwappingFont = true;
    this._isChecked = this.isChecked;
  }

  get width () {
    const style = getComputedStyle(this.node.parentNode);
    return parseInt(style.width);
  }

  get isChecked () {
    return this.node.checked;
  }

  set isChecked (value) {
    this._isChecked = value;
    this.ascend(PasswordEmission.TOGGLE, value);
  }

  handleClick () {
    this.isChecked = !this._isChecked;
  }

  swapFont (families) {
    this.ascend(PasswordEmission.ADJUST, this.width);
  }
}

class Password extends api.core.Instance {
  static get instanceClassName () {
    return 'Password';
  }

  init () {
    this.addAscent(PasswordEmission.TOGGLE, this.toggle.bind(this));
    this.addAscent(PasswordEmission.ADJUST, this.adjust.bind(this));
  }

  toggle (value) {
    this.descend(PasswordEmission.TOGGLE, value);
  }

  adjust (value) {
    this.descend(PasswordEmission.ADJUST, value);
  }
}

const PasswordSelector = {
  PASSWORD: api.internals.ns.selector('password'),
  INPUT: api.internals.ns.selector('password__input'),
  LABEL: api.internals.ns.selector('password__label'),
  TOOGLE: `${api.internals.ns.selector('password__checkbox')} input[type="checkbox"]`
};

class PasswordInput extends api.core.Instance {
  static get instanceClassName () {
    return 'PasswordInput';
  }

  init () {
    this.addDescent(PasswordEmission.TOGGLE, this.toggle.bind(this));
    this._isRevealed = this.hasAttribute('type') === 'password';
    this.listen('keydown', this.capslock.bind(this)); // for capslock enabled
    this.listen('keyup', this.capslock.bind(this)); // for capslock desabled
  }

  toggle (value) {
    this.isRevealed = value;
    this.setAttribute('type', value ? 'text' : 'password');
  }

  get isRevealed () {
    return this._isRevealed;
  }

  capslock (event) {
    if (event && typeof event.getModifierState !== 'function') return;
    if (event.getModifierState('CapsLock')) {
      this.node.parentNode.setAttribute(api.internals.ns.attr('capslock'), '');
    } else {
      this.node.parentNode.removeAttribute(api.internals.ns.attr('capslock'));
    }
  }

  set isRevealed (value) {
    this._isRevealed = value;
    this.setAttribute('type', value ? 'text' : 'password');
  }
}

class PasswordLabel extends api.core.Instance {
  static get instanceClassName () {
    return 'PasswordLabel';
  }

  init () {
    this.addDescent(PasswordEmission.ADJUST, this.adjust.bind(this));
  }

  adjust (value) {
    const valueREM = Math.ceil(value / 16);
    this.node.style.paddingRight = valueREM + 'rem';
  }
}

api.password = {
  Password: Password,
  PasswordToggle: PasswordToggle,
  PasswordSelector: PasswordSelector,
  PasswordInput: PasswordInput,
  PasswordLabel: PasswordLabel
};

api.internals.register(api.password.PasswordSelector.INPUT, api.password.PasswordInput);
api.internals.register(api.password.PasswordSelector.PASSWORD, api.password.Password);
api.internals.register(api.password.PasswordSelector.TOOGLE, api.password.PasswordToggle);
api.internals.register(api.password.PasswordSelector.LABEL, api.password.PasswordLabel);

const ITEM = api.internals.ns.selector('nav__item');
const COLLAPSE = api.internals.ns.selector('collapse');

const NavigationSelector = {
  NAVIGATION: api.internals.ns.selector('nav'),
  COLLAPSE: `${ITEM} > ${COLLAPSE}, ${ITEM} > *:not(${ITEM}):not(${COLLAPSE}) > ${COLLAPSE}, ${ITEM} > *:not(${ITEM}):not(${COLLAPSE}) > *:not(${ITEM}):not(${COLLAPSE}) > ${COLLAPSE}`,
  COLLAPSE_LEGACY: `${ITEM} ${COLLAPSE}`,
  ITEM: ITEM,
  ITEM_RIGHT: `${ITEM}--align-right`,
  MENU: api.internals.ns.selector('menu'),
  BUTTON: api.internals.ns.selector('nav__btn'),
  TRANSLATE_BUTTON: api.internals.ns.selector('translate__btn')
};

class NavigationItem extends api.core.Instance {
  constructor () {
    super();
    this._isRightAligned = false;
  }

  static get instanceClassName () {
    return 'NavigationItem';
  }

  init () {
    this.addAscent(api.core.DisclosureEmission.ADDED, this.calculate.bind(this));
    this.addAscent(api.core.DisclosureEmission.REMOVED, this.calculate.bind(this));
    this.isResizing = true;
    this.calculate();
  }

  resize () {
    this.calculate();
  }

  calculate () {
    const collapse = this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
    if (collapse && this.isBreakpoint(api.core.Breakpoints.LG) && collapse.element.node.matches(NavigationSelector.MENU)) {
      const right = this.element.node.parentElement.getBoundingClientRect().right; // todo: ne fonctionne que si la nav fait 100% du container
      const width = collapse.element.node.getBoundingClientRect().width;
      const left = this.element.node.getBoundingClientRect().left;
      this.isRightAligned = left + width > right;
    } else this.isRightAligned = false;
  }

  get isRightAligned () {
    return this._isRightAligned;
  }

  set isRightAligned (value) {
    if (this._isRightAligned === value) return;
    this._isRightAligned = value;
    if (value) api.internals.dom.addClass(this.element.node, NavigationSelector.ITEM_RIGHT);
    else api.internals.dom.removeClass(this.element.node, NavigationSelector.ITEM_RIGHT);
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && (button.hasClass(NavigationSelector.BUTTON) || button.hasClass(NavigationSelector.TRANSLATE_BUTTON)));
    return buttons[0];
  }
}

const NavigationMousePosition = {
  NONE: -1,
  INSIDE: 0,
  OUTSIDE: 1
};

class Navigation extends api.core.CollapsesGroup {
  static get instanceClassName () {
    return 'Navigation';
  }

  init () {
    super.init();
    this.clicked = false;
    this.out = false;
    this.addEmission(api.core.RootEmission.CLICK, this._handleRootClick.bind(this));
    this.listen('mousedown', this.handleMouseDown.bind(this));
    this.listenClick({ capture: true });
    this.isResizing = true;
  }

  validate (member) {
    return super.validate(member) && member.element.node.matches(api.internals.legacy.isLegacy ? NavigationSelector.COLLAPSE_LEGACY : NavigationSelector.COLLAPSE);
  }

  handleMouseDown (e) {
    if (!this.isBreakpoint(api.core.Breakpoints.LG) || this.index === -1 || !this.current) return;
    this.position = this.current.node.contains(e.target) ? NavigationMousePosition.INSIDE : NavigationMousePosition.OUTSIDE;
    this.requestPosition();
  }

  handleClick (e) {
    if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
      this.index = -1;
    }
  }

  _handleRootClick (target) {
    if (!this.isBreakpoint(api.core.Breakpoints.LG)) return;
    if (!this.node.contains(target)) {
      this.out = true;
      this.requestPosition();
    }
  }

  requestPosition () {
    if (this.isRequesting) return;
    this.isRequesting = true;
    this.request(this.getPosition.bind(this));
  }

  getPosition () {
    if (this.out) {
      switch (this.position) {
        case NavigationMousePosition.OUTSIDE:
          this.index = -1;
          break;

        case NavigationMousePosition.INSIDE:
          if (this.current && !this.current.node.contains(document.activeElement)) this.current.focus();
          break;

        default:
          if (this.index > -1 && !this.current.hasFocus) this.index = -1;
      }
    }

    this.request(this.requested.bind(this));
  }

  requested () {
    this.position = NavigationMousePosition.NONE;
    this.out = false;
    this.isRequesting = false;
  }

  get index () { return super.index; }

  set index (value) {
    if (value === -1 && this.current && this.current.hasFocus) this.current.focus();
    super.index = value;
  }

  get canUngroup () {
    return !this.isBreakpoint(api.core.Breakpoints.LG);
  }

  resize () {
    this.update();
  }
}

api.navigation = {
  Navigation: Navigation,
  NavigationItem: NavigationItem,
  NavigationMousePosition: NavigationMousePosition,
  NavigationSelector: NavigationSelector
};

api.internals.register(api.navigation.NavigationSelector.NAVIGATION, api.navigation.Navigation);
api.internals.register(api.navigation.NavigationSelector.ITEM, api.navigation.NavigationItem);

/**
  * TabButton correspond au bouton cliquable qui change le panel
  * TabButton étend de DisclosureButton qui ajoute/enelve l'attribut aria-selected,
  * Et change l'attributte tabindex a 0 si le boutton est actif (value=true), -1 s'il n'est pas actif (value=false)
 */
class TabButton extends api.core.DisclosureButton {
  constructor () {
    super(api.core.DisclosureType.SELECT);
  }

  static get instanceClassName () {
    return 'TabButton';
  }

  handleClick (e) {
    super.handleClick(e);
    this.focus();
  }

  apply (value) {
    super.apply(value);
    if (this.isPrimary) {
      this.setAttribute('tabindex', value ? '0' : '-1');
      if (value) {
        if (this.list) this.list.focalize(this);
      }
    }
  }

  get list () {
    return this.element.getAscendantInstance('TabsList', 'TabsGroup');
  }
}

const TabSelector = {
  TAB: api.internals.ns.selector('tabs__tab'),
  GROUP: api.internals.ns.selector('tabs'),
  PANEL: api.internals.ns.selector('tabs__panel'),
  LIST: api.internals.ns.selector('tabs__list'),
  SHADOW: api.internals.ns.selector('tabs__shadow'),
  SHADOW_LEFT: api.internals.ns.selector('tabs__shadow--left'),
  SHADOW_RIGHT: api.internals.ns.selector('tabs__shadow--right'),
  PANEL_START: api.internals.ns.selector('tabs__panel--direction-start'),
  PANEL_END: api.internals.ns.selector('tabs__panel--direction-end')
};

const TabPanelDirection = {
  START: 'direction-start',
  END: 'direction-end',
  NONE: 'none'
};

/**
  * Tab coorespond au panel d'un élement Tabs (tab panel)
  * Tab étend disclosure qui ajoute/enleve le modifier --selected,
  * et ajoute/eleve l'attribut hidden, sur le panel
  */
class TabPanel extends api.core.Disclosure {
  constructor () {
    super(api.core.DisclosureType.SELECT, TabSelector.PANEL, TabButton, 'TabsGroup');
    this._direction = TabPanelDirection.NONE;
    this._isPreventingTransition = false;
  }

  static get instanceClassName () {
    return 'TabPanel';
  }

  get direction () {
    return this._direction;
  }

  set direction (value) {
    if (value === this._direction) return;
    switch (this._direction) {
      case TabPanelDirection.START:
        this.removeClass(TabSelector.PANEL_START);
        break;

      case TabPanelDirection.END:
        this.removeClass(TabSelector.PANEL_END);
        break;

      case TabPanelDirection.NONE:
        break;

      default:
        return;
    }

    this._direction = value;

    switch (this._direction) {
      case TabPanelDirection.START:
        this.addClass(TabSelector.PANEL_START);
        break;

      case TabPanelDirection.END:
        this.addClass(TabSelector.PANEL_END);
        break;
    }
  }

  get isPreventingTransition () {
    return this._isPreventingTransition;
  }

  set isPreventingTransition (value) {
    if (this._isPreventingTransition === value) return;
    if (value) this.addClass(api.internals.motion.TransitionSelector.NONE);
    else this.removeClass(api.internals.motion.TransitionSelector.NONE);
    this._isPreventingTransition = value === true;
  }

  translate (direction, initial) {
    this.isPreventingTransition = initial;
    this.direction = direction;
  }

  reset () {
    if (this.group) this.group.retrieve(true);
  }

  _electPrimaries (candidates) {
    if (!this.group || !this.group.list) return [];
    return super._electPrimaries(candidates).filter(candidate => this.group.list.node.contains(candidate.node));
  }
}

const TabKeys = {
  LEFT: 'tab_keys_left',
  RIGHT: 'tab_keys_right',
  HOME: 'tab_keys_home',
  END: 'tab_keys_end'
};

const TabEmission = {
  PRESS_KEY: api.internals.ns.emission('tab', 'press_key'),
  LIST_HEIGHT: api.internals.ns.emission('tab', 'list_height')
};

/**
* TabGroup est la classe étendue de DiscosuresGroup
* Correspond à un objet Tabs avec plusieurs tab-button & Tab (panel)
*/
class TabsGroup extends api.core.DisclosuresGroup {
  constructor () {
    super('TabPanel');
  }

  static get instanceClassName () {
    return 'TabsGroup';
  }

  init () {
    super.init();

    this.listen('transitionend', this.transitionend.bind(this));
    this.addAscent(TabEmission.PRESS_KEY, this.pressKey.bind(this));
    this.addAscent(TabEmission.LIST_HEIGHT, this.setListHeight.bind(this));
    this.isRendering = true;
  }

  getIndex (defaultIndex = 0) {
    super.getIndex(defaultIndex);
  }

  get list () {
    return this.element.getDescendantInstances('TabsList', 'TabsGroup', true)[0];
  }

  setListHeight (value) {
    this.listHeight = value;
  }

  transitionend (e) {
    this.isPreventingTransition = true;
  }

  get buttonHasFocus () {
    return this.members.some(member => member.buttonHasFocus);
  }

  pressKey (key) {
    switch (key) {
      case TabKeys.LEFT:
        this.pressLeft();
        break;

      case TabKeys.RIGHT:
        this.pressRight();
        break;

      case TabKeys.HOME:
        this.pressHome();
        break;

      case TabKeys.END:
        this.pressEnd();
        break;
    }
  }

  /**
   * Selectionne l'element suivant de la liste si on est sur un bouton
   * Si on est à la fin on retourne au début
   */
  pressRight () {
    if (this.buttonHasFocus) {
      if (this.index < this.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }

      this.focus();
    }
  };

  /**
   * Selectionne l'element précédent de la liste si on est sur un bouton
   * Si on est au debut retourne a la fin
   */
  pressLeft () {
    if (this.buttonHasFocus) {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.length - 1;
      }

      this.focus();
    }
  };

  /**
   * Selectionne le permier element de la liste si on est sur un bouton
   */
  pressHome () {
    if (this.buttonHasFocus) {
      this.index = 0;
      this.focus();
    }
  };

  /**
   * Selectionne le dernier element de la liste si on est sur un bouton
   */
  pressEnd () {
    if (this.buttonHasFocus) {
      this.index = this.length - 1;
      this.focus();
    }
  };

  focus () {
    if (this.current) {
      this.current.focus();
    }
  }

  apply () {
    for (let i = 0; i < this._index; i++) this.members[i].translate(TabPanelDirection.START);
    if (this.current) this.current.translate(TabPanelDirection.NONE);
    for (let i = this._index + 1; i < this.length; i++) this.members[i].translate(TabPanelDirection.END);
    this.isPreventingTransition = false;
  }

  get isPreventingTransition () {
    return this._isPreventingTransition;
  }

  set isPreventingTransition (value) {
    if (this._isPreventingTransition === value) return;
    if (value) this.addClass(api.internals.motion.TransitionSelector.NONE);
    else this.removeClass(api.internals.motion.TransitionSelector.NONE);
    this._isPreventingTransition = value === true;
  }

  render () {
    if (this.current === null) return;
    this.node.scrollTop = 0;
    this.node.scrollLeft = 0;
    const paneHeight = Math.round(this.current.node.offsetHeight);
    if (this.panelHeight === paneHeight) return;
    this.panelHeight = paneHeight;
    this.style.setProperty('--tabs-height', (this.panelHeight + this.listHeight) + 'px');
  }
}

const FOCALIZE_OFFSET = 16;
const SCROLL_OFFSET$1 = 16; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

class TabsList extends api.core.Instance {
  static get instanceClassName () {
    return 'TabsList';
  }

  init () {
    this.listen('scroll', this.scroll.bind(this));
    this.listenKey(api.core.KeyCodes.RIGHT, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.RIGHT), true, true);
    this.listenKey(api.core.KeyCodes.LEFT, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.LEFT), true, true);
    this.listenKey(api.core.KeyCodes.HOME, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.HOME), true, true);
    this.listenKey(api.core.KeyCodes.END, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.END), true, true);
    this.isResizing = true;
  }

  focalize (btn) {
    const btnRect = btn.getRect();
    const listRect = this.getRect();
    const actualScroll = this.node.scrollLeft;
    if (btnRect.left < listRect.left) this.node.scrollTo(actualScroll - listRect.left + btnRect.left - FOCALIZE_OFFSET, 0);
    else if (btnRect.right > listRect.right) this.node.scrollTo(actualScroll - listRect.right + btnRect.right + FOCALIZE_OFFSET, 0);
  }

  get isScrolling () {
    return this._isScrolling;
  }

  set isScrolling (value) {
    if (this._isScrolling === value) return;
    this._isScrolling = value;
    this.apply();
  }

  apply () {
    if (this._isScrolling) {
      this.addClass(TabSelector.SHADOW);
      this.scroll();
    } else {
      this.removeClass(TabSelector.SHADOW_RIGHT);
      this.removeClass(TabSelector.SHADOW_LEFT);
      this.removeClass(TabSelector.SHADOW);
    }
  }

  /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
  scroll () {
    const scrollLeft = Math.abs(this.node.scrollLeft);
    const isMin = scrollLeft <= SCROLL_OFFSET$1;
    const max = this.node.scrollWidth - this.node.clientWidth - SCROLL_OFFSET$1;
    const isMax = Math.abs(scrollLeft) >= max;
    const isRtl = getComputedStyle(this.node).direction === 'rtl';
    const minSelector = isRtl ? TabSelector.SHADOW_RIGHT : TabSelector.SHADOW_LEFT;
    const maxSelector = isRtl ? TabSelector.SHADOW_LEFT : TabSelector.SHADOW_RIGHT;

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
    this.isScrolling = this.node.scrollWidth > this.node.clientWidth + SCROLL_OFFSET$1;
    const height = this.getRect().height;
    this.setProperty('--tabs-list-height', `${height}px`);
    this.ascend(TabEmission.LIST_HEIGHT, height);
  }

  dispose () {
    this.isScrolling = false;
  }
}

api.tab = {
  TabPanel: TabPanel,
  TabButton: TabButton,
  TabsGroup: TabsGroup,
  TabsList: TabsList,
  TabSelector: TabSelector,
  TabEmission: TabEmission
};

api.internals.register(api.tab.TabSelector.PANEL, api.tab.TabPanel);
api.internals.register(api.tab.TabSelector.GROUP, api.tab.TabsGroup);
api.internals.register(api.tab.TabSelector.LIST, api.tab.TabsList);

const TagEvent = {
  DISMISS: api.internals.ns.event('dismiss')
};

class TagDismissible extends api.core.Instance {
  static get instanceClassName () {
    return 'TagDismissible';
  }

  init () {
    this.listenClick();
  }

  handleClick () {
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
  }

  verify () {
    if (document.body.contains(this.node)) this.warn(`a TagDismissible has just been dismissed and should be removed from the dom. In ${api.mode} mode, the api doesn't handle dom modification. An event ${TagEvent.DISMISS} is dispatched by the element to trigger the removal`);
  }
}

const TagSelector = {
  PRESSABLE: `${api.internals.ns.selector('tag')}[aria-pressed]`,
  DISMISSIBLE: `${api.internals.ns.selector('tag--dismiss')}`
};

api.tag = {
  TagDismissible: TagDismissible,
  TagSelector: TagSelector,
  TagEvent: TagEvent
};

api.internals.register(api.tag.TagSelector.PRESSABLE, api.core.Toggle);
api.internals.register(api.tag.TagSelector.DISMISSIBLE, api.tag.TagDismissible);

const TRANSCRIPTION = api.internals.ns.selector('transcription');

const TranscriptionSelector = {
  TRANSCRIPTION: TRANSCRIPTION,
  BUTTON: `${TRANSCRIPTION}__btn`
};

class Transcription extends api.core.Instance {
  static get instanceClassName () {
    return 'Transcription';
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(TranscriptionSelector.BUTTON));
    return buttons[0];
  }
}

api.transcription = {
  Transcription: Transcription,
  TranscriptionSelector: TranscriptionSelector
};

api.internals.register(api.transcription.TranscriptionSelector.TRANSCRIPTION, api.transcription.Transcription);

class TileDownload extends api.core.Instance {
  static get instanceClassName () {
    return 'TileDownload';
  }

  init () {
    this.addAscent(api.core.AssessEmission.UPDATE, details => {
      this.descend(api.core.AssessEmission.UPDATE, details);
    });
    this.addAscent(api.core.AssessEmission.ADDED, () => {
      this.descend(api.core.AssessEmission.ADDED);
    });
  }
}

const TileSelector = {
  DOWNLOAD: api.internals.ns.selector('tile--download'),
  DOWNLOAD_DETAIL: `${api.internals.ns.selector('tile--download')} ${api.internals.ns.selector('tile__detail')}`
};

api.tile = {
  TileSelector: TileSelector,
  TileDownload: TileDownload
};

api.internals.register(api.tile.TileSelector.DOWNLOAD, api.tile.TileDownload);
api.internals.register(api.tile.TileSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

const RangeSelector = {
  RANGE: api.internals.ns.selector('range'),
  RANGE_SM: api.internals.ns.selector('range--sm'),
  RANGE_STEP: api.internals.ns.selector('range--step'),
  RANGE_DOUBLE: api.internals.ns.selector('range--double'),
  RANGE_DOUBLE_STEP: api.internals.ns.selector('range--double') + api.internals.ns.selector('range--step'),
  RANGE_INPUT: api.internals.ns.selector('range input[type=range]:nth-of-type(1)'),
  RANGE_INPUT2: `${api.internals.ns.selector('range--double')} input[type=range]:nth-of-type(2)`,
  RANGE_OUTPUT: api.internals.ns.selector('range__output'),
  RANGE_MIN: api.internals.ns.selector('range__min'),
  RANGE_MAX: api.internals.ns.selector('range__max'),
  RANGE_PREFIX: api.internals.ns.attr('prefix'),
  RANGE_SUFFIX: api.internals.ns.attr('suffix')
};

const RangeEmission = {
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

class RangeModel {
  constructor () {
    this._width = 0;
    this._min = 0;
    this._max = 0;
    this._value = 0;
    this._thumbSize = 24;
    this._innerWidth = 0;
    this._prefix = '';
    this._suffix = '';
    this._background = {};
  }

  configure (model) {
    if (!model) return;
    this._prefix = model._prefix;
    this._suffix = model._suffix;
    this._width = model.width;
    this.setConstraints(model._constraints);
    this.value = model.value;
    this.update();
  }

  setPrefix (value) {
    this._prefix = value !== null ? value : '';
  }

  setSuffix (value) {
    this._suffix = value !== null ? value : '';
  }

  _decorate (value) {
    return `${this._prefix}${value}${this._suffix}`;
  }

  get width () {
    return this._width;
  }

  set width (value) {
    this._width = value;
  }

  get isSm () {
    return this._isSm;
  }

  set isSm (value) {
    if (this._isSm === value) return;
    this._isSm = value;
    this.setThumbSize(value ? 16 : 24);
    this.update();
  }

  setThumbSize (value, mult = 1) {
    this._thumbSize = value;
    this._innerPadding = value * mult;
  }

  get textValue () {
    return this._decorate(this._value);
  }

  get value () {
    return this._value;
  }

  set value (value) {
    this._value = value;
  }

  get outputX () {
    return this._outputX;
  }

  setConstraints (constraints) {
    this._constraints = constraints;
    this._min = constraints.min;
    this._max = constraints.max;
    this._step = constraints.step;
    this._rangeWidth = constraints.rangeWidth;
  }

  get min () {
    return this._min;
  }

  get textMin () {
    return this._decorate(this._min);
  }

  get max () {
    return this._max;
  }

  get textMax () {
    return this._decorate(this._max);
  }

  get step () {
    return this._step;
  }

  get output () {
    return {
      text: this.textValue,
      transform: `translateX(${this._translateX}px) translateX(-${this._centerPercent}%)`
    };
  }

  _getRatio (value) {
    return (value - this._min) / this._rangeWidth;
  }

  get progress () {
    return this._progress;
  }

  update () {
    this._update();
  }

  _update () {
    this._innerWidth = this._width - this._innerPadding;
    const ratio = this._getRatio(this._value);
    this._translateX = ratio * this._width;
    this._centerPercent = ratio * 100;
    this._progress = {
      right: `${(this._innerWidth * ratio + this._innerPadding * 0.5).toFixed(2)}px`
    };
  }
}

class RangeModelStep extends RangeModel {
  get stepWidth () {
    return `${this._stepWidth.toFixed(3)}px`;
  }

  _update () {
    super._update();
    const steps = this._rangeWidth / this._step;
    this._stepWidth = this._innerWidth / steps;
    if (this._stepWidth < 1 || !isFinite(this._stepWidth)) this._stepWidth = 4;
    while (this._stepWidth < 4) this._stepWidth *= 2;
  }
}

class RangeModelDouble extends RangeModel {
  get value2 () {
    return this._value;
  }

  set value2 (value) {
    if (this._value2 === value) return;
    this._value2 = value;
    this.update();
  }

  get textValue () {
    return `${this._decorate(this._value)} - ${this._decorate(this._value2)}`;
  }

  setThumbSize (value) {
    super.setThumbSize(value, 2);
  }

  _update () {
    super._update();
    const ratio = this._getRatio((this._value + this._value2) * 0.5);
    this._translateX = ratio * this._width;
    this._centerPercent = ratio * 100;
    const ratio1 = this._getRatio(this._value);
    const ratio2 = this._getRatio(this._value2);
    this._progress = {
      left: `${(this._innerWidth * ratio1 + this._innerPadding * 0.25).toFixed(2)}px`,
      right: `${(this._innerWidth * ratio2 + this._innerPadding * 0.75).toFixed(2)}px`
    };
  }
}

class RangeModelDoubleStep extends RangeModelDouble {
  get stepWidth () {
    return `${this._stepWidth.toFixed(3)}px`;
  }

  _update () {
    super._update();
    const steps = this._rangeWidth / this._step;
    this._stepWidth = this._innerWidth / steps;
    if (this._stepWidth < 4) this._stepWidth *= Math.ceil(4 / this._stepWidth);
  }
}

const RangeTypes = {
  STEP: 'step',
  DOUBLE: 'double',
  DOUBLE_STEP: 'double-step',
  DEFAULT: 'default'
};

class Range extends api.core.Instance {
  static get instanceClassName () {
    return 'Range';
  }

  init () {
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
    if (this.getAttribute(RangeSelector.RANGE_PREFIX)) this.setPrefix(this.getAttribute(RangeSelector.RANGE_PREFIX));
    if (this.getAttribute(RangeSelector.RANGE_SUFFIX)) this.setSuffix(this.getAttribute(RangeSelector.RANGE_SUFFIX));
    this.update();
  }

  _retrieveType () {
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
  }

  set type (value) {
    if (this._type === value) return;
    this._type = value;

    const oldModel = this._model;

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
  }

  get type () {
    return this._type;
  }

  _retrieveSize () {
    this._model.isSm = this.matches(RangeSelector.RANGE_SM);
  }

  resize () {
    this._retrieveWidth();
    this.update();
  }

  _retrieveWidth () {
    this._model.width = this.getRect().width;
  }

  setValue (value) {
    this._model.value = value;
    switch (this._type) {
      case RangeTypes.DOUBLE_STEP:
      case RangeTypes.DOUBLE:
        this.descend(RangeEmission.VALUE, value);
        break;
    }
    this.update();
  }

  setValue2 (value) {
    this._model.value2 = value;
    this.descend(RangeEmission.VALUE2, value);
    this.update();
  }

  setConstraints (constraints) {
    this._model.setConstraints(constraints);
    this.update();
    this.descend(RangeEmission.CONSTRAINTS, constraints);
  }

  setPrefix (value) {
    this._model.setPrefix(value);
    this.update();
  }

  setSuffix (value) {
    this._model.setSuffix(value);
    this.update();
  }

  mutate (attributesNames) {
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
  }

  update () {
    this._model.update();
    this.descend(RangeEmission.OUTPUT, this._model.output);
    this.descend(RangeEmission.MIN, this._model.textMin);
    this.descend(RangeEmission.MAX, this._model.textMax);
    const progress = this._model.progress;
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
          this.style.setProperty('background-size', `${parseFloat(progress.right) - parseFloat(progress.left)}px ${this._model.isSm ? '8px' : '12px'}`);
        }
      }
    } else {
      this.style.removeProperty('--progress-right');
      if (this.isLegacy) {
        this.style.removeProperty('background-size');
        this.style.removeProperty('background-position-x');
      }
    }
    if (this._model.stepWidth) this.style.setProperty('--step-width', this._model.stepWidth);
    else this.style.removeProperty('--step-width');
  }

  mouseMove (point) {
    if (this._type !== RangeTypes.DOUBLE && this._type !== RangeTypes.DOUBLE_STEP) return;
    const x = point.x - this.getRect().left;
    this.descend(RangeEmission.ENABLE_POINTER, (parseFloat(this._model.progress.right) - parseFloat(this._model.progress.left)) / 2 + parseFloat(this._model.progress.left) < x ? 2 : 1);
  }

  dispose () {
    this._observer.disconnect();
  }
}

class RangeConstraints {
  constructor (node) {
    this._min = isNaN(node.min) ? 0 : node.min;
    this._max = isNaN(node.max) ? 100 : node.max;
    this._step = isNaN(node.step) ? 1 : node.step;
    this._rangeWidth = this._max - this._min;
  }

  get min () {
    return this._min;
  }

  get max () {
    return this._max;
  }

  get step () {
    return this._step;
  }

  get rangeWidth () {
    return this._rangeWidth;
  }

  test (min, max, step) {
    return this._min === min && this._max === max && this._step === step;
  }
}

class RangeInput extends api.core.Instance {
  static get instanceClassName () {
    return 'RangeInput';
  }

  init () {
    this._init();
    this._value = parseFloat(this.node.getAttribute('value'));
    if (this.isLegacy) this.addDescent(RangeEmission.ENABLE_POINTER, this._enablePointer.bind(this));
    this.isRendering = true;
    this.change();
  }

  _init () {
    this._pointerId = 1;
    this.request(() => {
      if (!this.hasAttribute('min')) this.setAttribute('min', 0);
      this.ascend(RangeEmission.CONSTRAINTS, new RangeConstraints(this.node));
      this.ascend(RangeEmission.DISABLED, this.node.disabled);
    });

    this.addDescent(RangeEmission.VALUE2, this.setValue.bind(this));
  }

  get proxy () {
    const scope = this;

    const proxyAccessors = {
      get value () {
        return scope.value;
      },
      set value (value) {
        scope.value = value;
      }
    };

    return api.internals.property.completeAssign(super.proxy, proxyAccessors);
  }

  _enablePointer (pointerId) {
    const isEnabled = pointerId === this._pointerId;
    if (this._isPointerEnabled === isEnabled) return;
    this._isPointerEnabled = isEnabled;
    if (isEnabled) this.style.removeProperty('pointer-events');
    else this.style.setProperty('pointer-events', 'none');
  }

  get value () {
    return parseFloat(this.node.value);
  }

  set value (value) {
    const parsedValue = parseFloat(value);
    if (parsedValue === this._value) return;
    this._value = parsedValue;
    this.node.value = parsedValue;
    this.dispatch('change');
    this.change();
  }

  setValue (value) {
    if (parseFloat(this.node.value) > value) {
      this.value = value;
    }
  }

  change () {
    this.ascend(RangeEmission.VALUE, this._value);
  }

  render () {
    const parsedValue = parseFloat(this.node.value);
    if (parsedValue !== this._value) this.value = parsedValue;
  }

  mutate (attributesNames) {
    if (attributesNames.includes('disabled')) this.ascend(RangeEmission.DISABLED, this.node.disabled);
    if (attributesNames.includes('min') || attributesNames.includes('max') || attributesNames.includes('step')) {
      this.ascend(RangeEmission.CONSTRAINTS, new RangeConstraints(this.node));
      this.change();
    }
  }

  dispose () {
    if (this._listenerType) this.unlisten(this._listenerType, this._changing);
  }
}

class RangeInput2 extends RangeInput {
  static get instanceClassName () {
    return 'RangeInput2';
  }

  _init () {
    this._pointerId = 2;
    this.addDescent(RangeEmission.CONSTRAINTS, this.setConstraints.bind(this));
    this.addDescent(RangeEmission.VALUE, this.setValue.bind(this));
  }

  setValue (value) {
    if (parseFloat(this.node.value) < value) {
      this.value = value;
    }
  }

  change () {
    this.ascend(RangeEmission.VALUE2, parseFloat(this.node.value));
  }

  setConstraints (constraints) {
    this.node.min = constraints.min;
    this.node.max = constraints.max;
    this.node.step = constraints.step;
    this.change();
  }

  mutate (attributesNames) {}
}

class RangeOutput extends api.core.Instance {
  static get instanceClassName () {
    return 'RangeOutput';
  }

  init () {
    this.addDescent(RangeEmission.OUTPUT, this.change.bind(this));
  }

  change (data) {
    this.node.innerText = data.text;
    this.node.style.transform = data.transform;
  }
}

class RangeLimit extends api.core.Instance {
  static get instanceClassName () {
    return 'RangeLimit';
  }

  init () {
    switch (true) {
      case this.matches(RangeSelector.RANGE_MIN):
        this.addDescent(RangeEmission.MIN, this.change.bind(this));
        break;

      case this.matches(RangeSelector.RANGE_MAX):
        this.addDescent(RangeEmission.MAX, this.change.bind(this));
        break;
    }
  }

  change (text) {
    this.node.innerText = text;
  }
}

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

const HeaderSelector = {
  HEADER: api.internals.ns.selector('header'),
  TOOLS_LINKS: api.internals.ns.selector('header__tools-links'),
  MENU_LINKS: api.internals.ns.selector('header__menu-links'),
  BUTTONS: `${api.internals.ns.selector('header__tools-links')} ${api.internals.ns.selector('btns-group')}, ${api.internals.ns.selector('header__tools-links')} ${api.internals.ns.selector('links-group')}`,
  MODALS: `${api.internals.ns.selector('header__search')}${api.internals.ns.selector('modal')}, ${api.internals.ns.selector('header__menu')}${api.internals.ns.selector('modal')}`
};

class HeaderLinks extends api.core.Instance {
  static get instanceClassName () {
    return 'HeaderLinks';
  }

  init () {
    const header = this.queryParentSelector(HeaderSelector.HEADER);
    this.toolsLinks = header.querySelector(HeaderSelector.TOOLS_LINKS);
    this.menuLinks = header.querySelector(HeaderSelector.MENU_LINKS);
    const copySuffix = '-mobile';

    const toolsHtml = this.toolsLinks.innerHTML.replace(/  +/g, ' ');
    const menuHtml = this.menuLinks.innerHTML.replace(/  +/g, ' ');
    // Pour éviter de dupliquer des id, on ajoute un suffixe aux id et aria-controls duppliqués.
    let toolsHtmlIdList = toolsHtml.match(/id="(.*?)"/gm) || [];

    // on a besoin d'échapper les backslash dans la chaine de caractère
    // eslint-disable-next-line no-useless-escape
    toolsHtmlIdList = toolsHtmlIdList.map(element => element.replace('id=\"', '').replace('\"', ''));

    const dupplicateAttributes = ['aria-controls', 'aria-describedby', 'aria-labelledby'];

    let toolsHtmlDuplicateId = toolsHtml.replace(/id="(.*?)"/gm, `id="$1${copySuffix}"`);

    for (const attribute of dupplicateAttributes) {
      const toolsHtmlAttributeList = toolsHtml.match(new RegExp(`${attribute}="(.*?)"`, 'gm'));
      if (toolsHtmlAttributeList) {
        for (const element of toolsHtmlAttributeList) {
          const attributeValue = element.replace(`${attribute}="`, '').replace('"', '');
          if (toolsHtmlIdList.includes(attributeValue)) {
            toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace(`${attribute}="${attributeValue}"`, `${attribute}="${attributeValue + copySuffix}"`);
          }        }
      }
    }

    if (toolsHtmlDuplicateId === menuHtml) return;

    switch (api.mode) {
      case api.Modes.ANGULAR:
      case api.Modes.REACT:
      case api.Modes.VUE:
        /*
        this.warn(`header__tools-links content is different from header__menu-links content.
As you're using a dynamic framework, you should handle duplication of this content yourself, please refer to documentation:
${api.header.doc}`);
        */
        break;

      default:
        this.menuLinks.innerHTML = toolsHtmlDuplicateId;
    }
  }
}

class HeaderModal extends api.core.Instance {
  static get instanceClassName () {
    return 'HeaderModal';
  }

  init () {
    this.storeAria();
    this.isResizing = true;
  }

  resize () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this.deactivateModal();
    else this.activateModal();
  }

  activateModal () {
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    modal.isEnabled = true;
    this.restoreAria();
    this.listenClick({ capture: true });
  }

  deactivateModal () {
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    modal.conceal();
    modal.isEnabled = false;
    this.storeAria();
    this.unlistenClick({ capture: true });
  }

  storeAria () {
    if (this.hasAttribute('aria-labelledby')) this._ariaLabelledby = this.getAttribute('aria-labelledby');
    if (this.hasAttribute('aria-label')) this._ariaLabel = this.getAttribute('aria-label');
    this.removeAttribute('aria-labelledby');
    this.removeAttribute('aria-label');
  }

  restoreAria () {
    if (this._ariaLabelledby) this.setAttribute('aria-labelledby', this._ariaLabelledby);
    if (this._ariaLabel) this.setAttribute('aria-label', this._ariaLabel);
  }

  handleClick (e) {
    if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
      const modal = this.element.getInstance('Modal');
      modal.conceal();
    }
  }
}

api.header = {
  HeaderLinks: HeaderLinks,
  HeaderModal: HeaderModal,
  HeaderSelector: HeaderSelector,
  doc: 'https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete'
};

api.internals.register(api.header.HeaderSelector.TOOLS_LINKS, api.header.HeaderLinks);
api.internals.register(api.header.HeaderSelector.MODALS, api.header.HeaderModal);

const DisplaySelector = {
  DISPLAY: api.internals.ns.selector('display'),
  RADIO_BUTTONS: `input[name="${api.internals.ns('radios-theme')}"]`,
  FIELDSET: api.internals.ns.selector('fieldset')
};

class Display extends api.core.Instance {
  static get instanceClassName () {
    return 'Display';
  }

  init () {
    this.radios = this.querySelectorAll(DisplaySelector.RADIO_BUTTONS);

    if (api.scheme) {
      this.changing = this.change.bind(this);
      for (const radio of this.radios) radio.addEventListener('change', this.changing);
      this.addDescent(api.scheme.SchemeEmission.SCHEME, this.apply.bind(this));
      this.ascend(api.scheme.SchemeEmission.ASK);
    } else {
      this.querySelector(DisplaySelector.FIELDSET).setAttribute('disabled', '');
    }
  }

  get scheme () {
    return this._scheme;
  }

  set scheme (value) {
    if (this._scheme === value || !api.scheme) return;
    switch (value) {
      case api.scheme.SchemeValue.SYSTEM:
      case api.scheme.SchemeValue.LIGHT:
      case api.scheme.SchemeValue.DARK:
        this._scheme = value;
        for (const radio of this.radios) {
          radio.checked = radio.value === value;
        }
        this.ascend(api.scheme.SchemeEmission.SCHEME, value);
        break;
    }
  }

  change () {
    for (const radio of this.radios) {
      if (radio.checked) {
        this.scheme = radio.value;
        return;
      }
    }
  }

  apply (value) {
    this.scheme = value;
  }

  dispose () {
    for (const radio of this.radios) radio.removeEventListener('change', this.changing);
  }
}

api.display = {
  Display: Display,
  DisplaySelector: DisplaySelector
};

api.internals.register(api.display.DisplaySelector.DISPLAY, api.display.Display);

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
    if (node.name === 'row-select' ||
      node.getAttribute(api.internals.ns.attr('row-select')) === 'true') {
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
//# sourceMappingURL=dsfr.module.js.map

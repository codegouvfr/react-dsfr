/*! DSFR v1.10.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var State = function State () {
    this.modules = {};
  };

  var prototypeAccessors$8 = { isActive: { configurable: true },isLegacy: { configurable: true } };

  State.prototype.create = function create (ModuleClass) {
    var module = new ModuleClass();
    this.modules[module.type] = module;
  };

  State.prototype.getModule = function getModule (type) {
    return this.modules[type];
  };

  State.prototype.add = function add (type, item) {
    this.modules[type].add(item);
  };

  State.prototype.remove = function remove (type, item) {
    this.modules[type].remove(item);
  };

  prototypeAccessors$8.isActive.get = function () {
    return this._isActive;
  };

  prototypeAccessors$8.isActive.set = function (value) {
      var this$1$1 = this;

    if (value === this._isActive) { return; }
    this._isActive = value;
    var values = Object.keys(this.modules).map(function (e) {
      return this$1$1.modules[e];
    });
    if (value) {
      for (var i = 0, list = values; i < list.length; i += 1) {
        var module = list[i];

          module.activate();
      }
    } else {
      for (var i$1 = 0, list$1 = values; i$1 < list$1.length; i$1 += 1) {
        var module$1 = list$1[i$1];

          module$1.deactivate();
      }
    }
  };

  prototypeAccessors$8.isLegacy.get = function () {
    return this._isLegacy;
  };

  prototypeAccessors$8.isLegacy.set = function (value) {
    if (value === this._isLegacy) { return; }
    this._isLegacy = value;
  };

  Object.defineProperties( State.prototype, prototypeAccessors$8 );

  var state = new State();

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.10.0'
  };

  var LogLevel = function LogLevel (level, light, dark, logger) {
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
  };

  var prototypeAccessors$7 = { color: { configurable: true } };

  LogLevel.prototype.log = function log () {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

    var message = new Message(config.namespace);
    for (var i = 0, list = values; i < list.length; i += 1) {
        var value = list[i];

        message.add(value);
      }
    this.print(message);
  };

  LogLevel.prototype.print = function print (message) {
    message.setColor(this.color);
    this.logger.apply(console, message.getMessage());
  };

  prototypeAccessors$7.color.get = function () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.dark : this.light;
  };

  Object.defineProperties( LogLevel.prototype, prototypeAccessors$7 );

  var Message = function Message (domain) {
    this.inputs = ['%c'];
    this.styles = ['font-family:Marianne', 'line-height: 1.5'];
    this.objects = [];

    if (domain) { this.add((domain + " :")); }
  };

  Message.prototype.add = function add (value) {
    switch (typeof value) {
      case 'object':
      case 'function':
        this.inputs.push('%o ');
        this.objects.push(value);
        break;

      default:
        this.inputs.push((value + " "));
    }
  };

  Message.prototype.setColor = function setColor (color) {
    this.styles.push(("color:" + color));
  };

  Message.prototype.getMessage = function getMessage () {
    return [this.inputs.join(''), this.styles.join(';') ].concat( this.objects);
  };

  var LEVELS = {
    log: new LogLevel(0, '#616161', '#989898'),
    debug: new LogLevel(1, '#000091', '#8B8BFF'),
    info: new LogLevel(2, '#007c3b', '#00ed70'),
    warn: new LogLevel(3, '#ba4500', '#fa5c00', 'warn'),
    error: new LogLevel(4, '#D80600', '#FF4641', 'error')
  };

  var Inspector = function Inspector () {
    var this$1$1 = this;

    this.level = 2;

    var loop = function ( id ) {
      var level = LEVELS[id];
      this$1$1[id] = function () {
        var msgs = [], len = arguments.length;
        while ( len-- ) msgs[ len ] = arguments[ len ];

        if (this$1$1.level <= level.level) { level.log.apply(level, msgs); }
      };
      this$1$1[id].print = level.print.bind(level);
    };

    for (var id in LEVELS) loop( id );
  };

  Inspector.prototype.state = function state$1 () {
    var message = new Message();
    message.add(state);
    this.log.print(message);
  };

  Inspector.prototype.tree = function tree () {
    var stage = state.getModule('stage');
    if (!stage) { return; }
    var message = new Message();
    this._branch(stage.root, 0, message);
    this.log.print(message);
  };

  Inspector.prototype._branch = function _branch (element, space, message) {
    var branch = '';
    if (space > 0) {
      var indent = '';
      for (var i = 0; i < space; i++) { indent += '    '; }
      // branch += indent + '|\n';
      branch += indent + '└─ ';
    }
    branch += "[" + (element.id) + "] " + (element.html);
    message.add(branch);
    message.add({ '@': element });
    message.add('\n');
    for (var i$1 = 0, list = element.children; i$1 < list.length; i$1 += 1) {
        var child = list[i$1];

        branch += this._branch(child, space + 1, message);
      }
  };

  var inspector = new Inspector();

  var startAtDomContentLoaded = function (callback) {
    if (document.readyState !== 'loading') { window.requestAnimationFrame(callback); }
    else { document.addEventListener('DOMContentLoaded', callback); }
  };

  var startAuto = function (callback) {
    // detect
    startAtDomContentLoaded(callback);
  };

  var Modes = {
    AUTO: 'auto',
    MANUAL: 'manual',
    RUNTIME: 'runtime',
    LOADED: 'loaded',
    VUE: 'vue',
    ANGULAR: 'angular',
    REACT: 'react'
  };

  var Options = function Options () {
    this._mode = Modes.AUTO;
    this.isStarted = false;
    this.starting = this.start.bind(this);
    this.preventManipulation = false;
  };

  var prototypeAccessors$6 = { mode: { configurable: true } };

  Options.prototype.configure = function configure (settings, start, query) {
      if ( settings === void 0 ) settings = {};

    this.startCallback = start;
    var isProduction = settings.production && (!query || query.production !== 'false');
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
    inspector.info(("version " + (config.version)));
    this.mode = settings.mode || Modes.AUTO;
  };

  prototypeAccessors$6.mode.set = function (value) {
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
    inspector.info(("mode set to " + value));
  };

  prototypeAccessors$6.mode.get = function () {
    return this._mode;
  };

  Options.prototype.start = function start () {
    inspector.info('start');
    this.startCallback();
  };

  Object.defineProperties( Options.prototype, prototypeAccessors$6 );

  var options = new Options();

  var Collection = function Collection () {
    this._collection = [];
  };

  var prototypeAccessors$5 = { length: { configurable: true },collection: { configurable: true } };

  Collection.prototype.forEach = function forEach (callback) {
    this._collection.forEach(callback);
  };

  Collection.prototype.map = function map (callback) {
    return this._collection.map(callback);
  };

  prototypeAccessors$5.length.get = function () {
    return this._collection.length;
  };

  Collection.prototype.add = function add (collectable) {
    if (this._collection.indexOf(collectable) > -1) { return false; }
    this._collection.push(collectable);
    if (this.onAdd) { this.onAdd(); }
    if (this.onPopulate && this._collection.length === 1) { this.onPopulate(); }
    return true;
  };

  Collection.prototype.remove = function remove (collectable) {
    var index = this._collection.indexOf(collectable);
    if (index === -1) { return false; }
    this._collection.splice(index, 1);
    if (this.onRemove) { this.onRemove(); }
    if (this.onEmpty && this._collection.length === 0) { this.onEmpty(); }
  };

  Collection.prototype.execute = function execute () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    for (var i = 0, list = this._collection; i < list.length; i += 1) {
        var collectable = list[i];

        if (collectable) { collectable.apply(null, args);
      } }
  };

  Collection.prototype.clear = function clear () {
    this._collection.length = 0;
  };

  Collection.prototype.clone = function clone () {
    var clone = new Collection();
    clone._collection = this._collection.slice();
    return clone;
  };

  prototypeAccessors$5.collection.get = function () {
    return this._collection;
  };

  Object.defineProperties( Collection.prototype, prototypeAccessors$5 );

  var Module = /*@__PURE__*/(function (Collection) {
    function Module (type) {
      Collection.call(this);
      this.type = type;
      this.isActive = false;
    }

    if ( Collection ) Module.__proto__ = Collection;
    Module.prototype = Object.create( Collection && Collection.prototype );
    Module.prototype.constructor = Module;

    Module.prototype.activate = function activate () {};
    Module.prototype.deactivate = function deactivate () {};

    return Module;
  }(Collection));

  var ns = function (name) { return ((config.prefix) + "-" + name); };

  ns.selector = function (name, notation) {
    if (notation === undefined) { notation = '.'; }
    return ("" + notation + (ns(name)));
  };

  ns.attr = function (name) { return ("data-" + (ns(name))); };

  ns.attr.selector = function (name, value) {
    var result = ns.attr(name);
    if (value !== undefined) { result += "=\"" + value + "\""; }
    return ("[" + result + "]");
  };

  ns.event = function (type) { return ((config.namespace) + "." + type); };

  ns.emission = function (domain, type) { return ("emission:" + domain + "." + type); };

  var querySelectorAllArray = function (element, selectors) { return Array.prototype.slice.call(element.querySelectorAll(selectors)); };

  var queryParentSelector = function (element, selectors) {
    var parent = element.parentElement;
    if (parent.matches(selectors)) { return parent; }
    if (parent === document.documentElement) { return null; }
    return queryParentSelector(parent, selectors);
  };

  var Registration = function Registration (selector, InstanceClass, creator) {
    this.selector = selector;
    this.InstanceClass = InstanceClass;
    this.creator = creator;
    this.instances = new Collection();
    this.isIntroduced = false;
    this._instanceClassName = this.InstanceClass.instanceClassName;
    this._instanceClassNames = this.getInstanceClassNames(this.InstanceClass);
    this._property = this._instanceClassName.substring(0, 1).toLowerCase() + this._instanceClassName.substring(1);
    var dashed = this._instanceClassName
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([0-9])([^0-9])/g, '$1-$2')
      .replace(/([^0-9])([0-9])/g, '$1-$2')
      .toLowerCase();
    this._attribute = ns.attr(("js-" + dashed));
  };

  var prototypeAccessors$4 = { instanceClassName: { configurable: true },instanceClassNames: { configurable: true },property: { configurable: true },attribute: { configurable: true } };

  Registration.prototype.getInstanceClassNames = function getInstanceClassNames (InstanceClass) {
    var prototype = Object.getPrototypeOf(InstanceClass);
    if (!prototype || prototype.instanceClassName === 'Instance') { return [InstanceClass.instanceClassName]; }
    return this.getInstanceClassNames(prototype).concat( [InstanceClass.instanceClassName]);
  };

  Registration.prototype.hasInstanceClassName = function hasInstanceClassName (instanceClassName) {
    return this._instanceClassNames.indexOf(instanceClassName) > -1;
  };

  Registration.prototype.introduce = function introduce () {
    if (this.isIntroduced) { return; }
    this.isIntroduced = true;
    state.getModule('stage').parse(document.documentElement, this);
  };

  Registration.prototype.parse = function parse (node, nonRecursive) {
    var nodes = [];
    if (node.matches && node.matches(this.selector)) { nodes.push(node); }
    // eslint-disable-next-line no-useless-call
    if (!nonRecursive && node.querySelectorAll && node.querySelector(this.selector)) { nodes.push.apply(nodes, querySelectorAllArray(node, this.selector)); }
    return nodes;
  };

  Registration.prototype.create = function create (element) {
    if (!element.node.matches(this.selector)) { return; }
    var instance = new this.InstanceClass();
    this.instances.add(instance);
    return instance;
  };

  Registration.prototype.remove = function remove (instance) {
    this.instances.remove(instance);
  };

  Registration.prototype.dispose = function dispose () {
    var instances = this.instances.collection;
    for (var i = instances.length - 1; i > -1; i--) { instances[i]._dispose(); }
    this.creator = null;
  };

  prototypeAccessors$4.instanceClassName.get = function () {
    return this._instanceClassName;
  };

  prototypeAccessors$4.instanceClassNames.get = function () {
    return this._instanceClassNames;
  };

  prototypeAccessors$4.property.get = function () {
    return this._property;
  };

  prototypeAccessors$4.attribute.get = function () {
    return this._attribute;
  };

  Object.defineProperties( Registration.prototype, prototypeAccessors$4 );

  var Register = /*@__PURE__*/(function (Module) {
    function Register () {
      Module.call(this, 'register');
    }

    if ( Module ) Register.__proto__ = Module;
    Register.prototype = Object.create( Module && Module.prototype );
    Register.prototype.constructor = Register;

    Register.prototype.register = function register (selector, InstanceClass, creator) {
      var registration = new Registration(selector, InstanceClass, creator);
      this.add(registration);
      if (state.isActive) { registration.introduce(); }
      return registration;
    };

    Register.prototype.activate = function activate () {
      for (var i = 0, list = this.collection; i < list.length; i += 1) {
        var registration = list[i];

        registration.introduce();
      }
    };

    Register.prototype.remove = function remove (registration) {
      registration.dispose();
      Module.prototype.remove.call(this, registration);
    };

    return Register;
  }(Module));

  var count = 0;

  var Element$1 = function Element (node, id) {
    if (!id) {
      count++;
      this.id = count;
    } else { this.id = id; }
    this.node = node;
    this.attributeNames = [];
    this.instances = [];
    this._children = [];
    this._parent = null;
    this._projects = [];
  };

  var prototypeAccessors$3 = { proxy: { configurable: true },html: { configurable: true },parent: { configurable: true },ascendants: { configurable: true },children: { configurable: true },descendants: { configurable: true } };

  prototypeAccessors$3.proxy.get = function () {
    var scope = this;
    if (!this._proxy) {
      this._proxy = {
        id: this.id,
        get parent () {
          return scope.parent ? scope.parent.proxy : null;
        },
        get children () {
          return scope.children.map(function (child) { return child.proxy; });
        }
      };

      for (var i = 0, list = this.instances; i < list.length; i += 1) {
          var instance = list[i];

          this._proxy[instance.registration.property] = instance.proxy;
        }
    }
    return this._proxy;
  };

  prototypeAccessors$3.html.get = function () {
    if (!this.node || !this.node.outerHTML) { return ''; }
    var end = this.node.outerHTML.indexOf('>');
    return this.node.outerHTML.substring(0, end + 1);
  };

  Element$1.prototype.project = function project (registration) {
    if (this._projects.indexOf(registration) === -1) { this._projects.push(registration); }
  };

  Element$1.prototype.populate = function populate () {
    var projects = this._projects.slice();
    this._projects.length = 0;
    for (var i = 0, list = projects; i < list.length; i += 1) {
        var registration = list[i];

        this.create(registration);
      }
  };

  Element$1.prototype.create = function create (registration) {
    if (this.hasInstance(registration.instanceClassName)) {
      // inspector.debug(`failed creation, instance of ${registration.instanceClassName} already exists on element [${this.id}]`);
      return;
    }
    inspector.debug(("create instance of " + (registration.instanceClassName) + " on element [" + (this.id) + "]"));
    var instance = registration.create(this);
    this.instances.push(instance);
    instance._config(this, registration);
    if (this._proxy) { this._proxy[registration.property] = instance.proxy; }
  };

  Element$1.prototype.remove = function remove (instance) {
    var index = this.instances.indexOf(instance);
    if (index > -1) { this.instances.splice(index, 1); }
    if (this._proxy) { delete this._proxy[instance.registration.property]; }
  };

  prototypeAccessors$3.parent.get = function () {
    return this._parent;
  };

  prototypeAccessors$3.ascendants.get = function () {
    return [this.parent ].concat( this.parent.ascendants);
  };

  prototypeAccessors$3.children.get = function () {
    return this._children;
  };

  prototypeAccessors$3.descendants.get = function () {
    var descendants = [].concat( this._children );
    this._children.forEach(function (child) { return descendants.push.apply(descendants, child.descendants); });
    return descendants;
  };

  // TODO : emit ascendant et descendant de changement ?

  Element$1.prototype.addChild = function addChild (child, index) {
    if (this._children.indexOf(child) > -1) { return null; }
    child._parent = this;
    if (!isNaN(index) && index > -1 && index < this._children.length) { this._children.splice(index, 0, child); }
    else { this._children.push(child); }
    return child;
  };

  Element$1.prototype.removeChild = function removeChild (child) {
    var index = this._children.indexOf(child);
    if (index === -1) { return null; }
    child._parent = null;
    this._children.splice(index, 1);
  };

  Element$1.prototype.emit = function emit (type, data) {
    var elements = state.getModule('stage').collection;
    var response = [];
    for (var i = 0, list = elements; i < list.length; i += 1) {
        var element = list[i];

        response.push.apply(response, element._emit(type, data));
      }
    return response;
  };

  Element$1.prototype._emit = function _emit (type, data) {
    var response = [];
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        response.push.apply(response, instance._emitter.emit(type, data));
      }
    return response;
  };

  Element$1.prototype.ascend = function ascend (type, data) {
    if (this._parent) { return this._parent._ascend(type, data); }
    return [];
  };

  Element$1.prototype._ascend = function _ascend (type, data) {
    var response = [];
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        response.push.apply(response, instance._ascent.emit(type, data));
      }
    if (this._parent) { response.push.apply(response, this._parent._ascend(type, data)); }
    return response;
  };

  Element$1.prototype.descend = function descend (type, data) {
    var response = [];
    for (var i = 0, list = this._children; i < list.length; i += 1) {
        var child = list[i];

        response.push.apply(response, child._descend(type, data));
      }
    return response;
  };

  Element$1.prototype._descend = function _descend (type, data) {
    var response = [];
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        response.push.apply(response, instance._descent.emit(type, data));
      }
    for (var i$1 = 0, list$1 = this._children; i$1 < list$1.length; i$1 += 1) {
        var child = list$1[i$1];

        response.push.apply(response, child._descend(type, data));
      }
    return response;
  };

  Element$1.prototype.getInstance = function getInstance (instanceClassName) {
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        if (instance.registration.hasInstanceClassName(instanceClassName)) { return instance;
      } }
    return null;
  };

  Element$1.prototype.hasInstance = function hasInstance (instanceClassName) {
    return this.getInstance(instanceClassName) !== null;
  };

  Element$1.prototype.getDescendantInstances = function getDescendantInstances (instanceClassName, stopAtInstanceClassName, stopAtFirstInstance) {
    if (!instanceClassName) { return []; }
    var instances = [];
    for (var i = 0, list = this._children; i < list.length; i += 1) {
      var child = list[i];

        var instance = child.getInstance(instanceClassName);
      if (instance) {
        instances.push(instance);
        if (stopAtFirstInstance) { continue; }
      }
      if ((!stopAtInstanceClassName || !child.hasInstance(stopAtInstanceClassName)) && child.children.length) { instances.push.apply(instances, child.getDescendantInstances(instanceClassName, stopAtInstanceClassName, stopAtFirstInstance)); }
    }
    return instances;
  };

  Element$1.prototype.getAscendantInstance = function getAscendantInstance (instanceClassName, stopAtInstanceClassName) {
    if (!instanceClassName || !this._parent) { return null; }
    var instance = this._parent.getInstance(instanceClassName);
    if (instance) { return instance; }
    if (stopAtInstanceClassName && this._parent.hasInstance(stopAtInstanceClassName)) { return null; }
    return this._parent.getAscendantInstance(instanceClassName, stopAtInstanceClassName);
  };

  Element$1.prototype.dispose = function dispose () {
    for (var i = this.instances.length - 1; i >= 0; i--) {
      var instance = this.instances[i];
      if (instance) { instance._dispose(); }
    }
    this.instances.length = 0;
    state.remove('stage', this);
    this.parent.removeChild(this);
    this._children.length = 0;
    inspector.debug(("remove element [" + (this.id) + "] " + (this.html)));
  };

  Element$1.prototype.prepare = function prepare (attributeName) {
    if (this.attributeNames.indexOf(attributeName) === -1) { this.attributeNames.push(attributeName); }
  };

  Element$1.prototype.examine = function examine () {
    var attributeNames = this.attributeNames.slice();
    this.attributeNames.length = 0;
    for (var i = this.instances.length - 1; i > -1; i--) { this.instances[i].examine(attributeNames); }
  };

  Object.defineProperties( Element$1.prototype, prototypeAccessors$3 );

  var RootEmission = {
    CLICK: ns.emission('root', 'click'),
    KEYDOWN: ns.emission('root', 'keydown'),
    KEYUP: ns.emission('root', 'keyup')
  };

  var KeyCodes = {
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

  var getKeyCode = function (keyCode) { return Object.values(KeyCodes).filter(function (entry) { return entry.value === keyCode; })[0]; };

  var Root = /*@__PURE__*/(function (Element) {
    function Root () {
      Element.call(this, document.documentElement, 'root');
      this.node.setAttribute(ns.attr('js'), true);
      this.listen();
    }

    if ( Element ) Root.__proto__ = Element;
    Root.prototype = Object.create( Element && Element.prototype );
    Root.prototype.constructor = Root;

    Root.prototype.listen = function listen () {
      // TODO v2 => listener au niveau des éléments qui redistribuent aux instances.
      document.documentElement.addEventListener('click', this.click.bind(this), { capture: true });
      document.documentElement.addEventListener('keydown', this.keydown.bind(this), { capture: true });
      document.documentElement.addEventListener('keyup', this.keyup.bind(this), { capture: true });
    };

    Root.prototype.click = function click (e) {
      this.emit(RootEmission.CLICK, e.target);
    };

    Root.prototype.keydown = function keydown (e) {
      this.emit(RootEmission.KEYDOWN, getKeyCode(e.keyCode));
    };

    Root.prototype.keyup = function keyup (e) {
      this.emit(RootEmission.KEYUP, getKeyCode(e.keyCode));
    };

    return Root;
  }(Element$1));

  var Stage = /*@__PURE__*/(function (Module) {
    function Stage () {
      Module.call(this, 'stage');
      this.root = new Root();
      Module.prototype.add.call(this, this.root);
      this.observer = new MutationObserver(this.mutate.bind(this));
      this.modifications = [];
      this.willModify = false;
      this.modifying = this.modify.bind(this);
    }

    if ( Module ) Stage.__proto__ = Module;
    Stage.prototype = Object.create( Module && Module.prototype );
    Stage.prototype.constructor = Stage;

    Stage.prototype.hasElement = function hasElement (node) {
      for (var i = 0, list = this.collection; i < list.length; i += 1) {
        var element = list[i];

        if (element.node === node) { return true;
      } }
      return false;
    };

    Stage.prototype.getElement = function getElement (node) {
      for (var i = 0, list = this.collection; i < list.length; i += 1) {
        var element$1 = list[i];

        if (element$1.node === node) { return element$1;
      } }
      var element = new Element$1(node);
      this.add(element);
      inspector.debug(("add element [" + (element.id) + "] " + (element.html)));
      return element;
    };

    Stage.prototype.getProxy = function getProxy (node) {
      if (!this.hasElement(node)) { return null; }
      var element = this.getElement(node);
      return element.proxy;
    };

    Stage.prototype.add = function add (element) {
      Module.prototype.add.call(this, element);
      this.put(element, this.root);
    };

    Stage.prototype.put = function put (element, branch) {
      var index = 0;
      for (var i = branch.children.length - 1; i > -1; i--) {
        var child = branch.children[i];
        var position = element.node.compareDocumentPosition(child.node);
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
    };

    Stage.prototype.activate = function activate () {
      this.observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    };

    Stage.prototype.deactivate = function deactivate () {
      this.observer.disconnect();
    };

    Stage.prototype.mutate = function mutate (mutations) {
      var this$1$1 = this;

      var examinations = [];
      mutations.forEach(function (mutation) {
        switch (mutation.type) {
          case 'childList':
            mutation.removedNodes.forEach(function (node) { return this$1$1.dispose(node); });
            mutation.addedNodes.forEach(function (node) { return this$1$1.parse(node); });
            break;

          case 'attributes':
            if (this$1$1.hasElement(mutation.target)) {
              var element = this$1$1.getElement(mutation.target);
              element.prepare(mutation.attributeName);
              if (examinations.indexOf(element) === -1) { examinations.push(element); }
              for (var i = 0, list = element.descendants; i < list.length; i += 1) {
                var descendant = list[i];

                if (examinations.indexOf(descendant) === -1) { examinations.push(descendant);
              } }
            }
            if (this$1$1.modifications.indexOf(mutation.target) === -1) { this$1$1.modifications.push(mutation.target); }
            break;
        }
      });

      examinations.forEach(function (element) { return element.examine(); });
      if (this.modifications.length && !this.willModify) {
        this.willModify = true;
        window.requestAnimationFrame(this.modifying);
      }
    };

    Stage.prototype.modify = function modify () {
      this.willModify = false;
      var targets = this.modifications.slice();
      this.modifications.length = 0;
      for (var i = 0, list = targets; i < list.length; i += 1) {
        var target = list[i];

        if (document.documentElement.contains(target)) { this.parse(target);
      } }
    };

    Stage.prototype.dispose = function dispose (node) {
      var disposables = [];
      this.forEach(function (element) {
        if (node.contains(element.node)) { disposables.push(element); }
      });

      for (var i = 0, list = disposables; i < list.length; i += 1) {
        var disposable = list[i];

        disposable.dispose();
        this.remove(disposable);
      }
    };

    Stage.prototype.parse = function parse (node, registration, nonRecursive) {
      var registrations = registration ? [registration] : state.getModule('register').collection;
      var creations = [];

      for (var i$1 = 0, list$1 = registrations; i$1 < list$1.length; i$1 += 1) {
        var registration$1 = list$1[i$1];

        var nodes = registration$1.parse(node, nonRecursive);

        for (var i = 0, list = nodes; i < list.length; i += 1) {
          var n = list[i];

          var element = this.getElement(n);
          element.project(registration$1);
          if (creations.indexOf(element) === -1) { creations.push(element); }
        }
      }

      for (var i$2 = 0, list$2 = creations; i$2 < list$2.length; i$2 += 1) {
        var element$1 = list$2[i$2];

        element$1.populate();
      }
    };

    return Stage;
  }(Module));

  var Renderer = /*@__PURE__*/(function (Module) {
    function Renderer () {
      Module.call(this, 'render');
      this.rendering = this.render.bind(this);
      this.nexts = new Collection();
    }

    if ( Module ) Renderer.__proto__ = Module;
    Renderer.prototype = Object.create( Module && Module.prototype );
    Renderer.prototype.constructor = Renderer;

    Renderer.prototype.activate = function activate () {
      window.requestAnimationFrame(this.rendering);
    };

    Renderer.prototype.request = function request (instance) {
      this.nexts.add(instance);
    };

    Renderer.prototype.render = function render () {
      if (!state.isActive) { return; }
      window.requestAnimationFrame(this.rendering);
      this.forEach(function (instance) { return instance.render(); });
      if (!this.nexts.length) { return; }
      var nexts = this.nexts.clone();
      this.nexts.clear();
      nexts.forEach(function (instance) { return instance.next(); });
    };

    return Renderer;
  }(Module));

  var Resizer = /*@__PURE__*/(function (Module) {
    function Resizer () {
      Module.call(this, 'resize');
      this.requireResize = false;
      this.resizing = this.resize.bind(this);
      var requesting = this.request.bind(this);
      if (document.fonts) {
        document.fonts.ready.then(requesting);
      }
      window.addEventListener('resize', requesting);
      window.addEventListener('orientationchange', requesting);
    }

    if ( Module ) Resizer.__proto__ = Module;
    Resizer.prototype = Object.create( Module && Module.prototype );
    Resizer.prototype.constructor = Resizer;

    Resizer.prototype.activate = function activate () {
      this.request();
    };

    Resizer.prototype.request = function request () {
      if (this.requireResize) { return; }
      this.requireResize = true;
      window.requestAnimationFrame(this.resizing);
    };

    Resizer.prototype.resize = function resize () {
      if (!this.requireResize) { return; }
      this.forEach(function (instance) { return instance.resize(); });
      this.requireResize = false;
    };

    return Resizer;
  }(Module));

  var ScrollLocker = /*@__PURE__*/(function (Module) {
    function ScrollLocker () {
      Module.call(this, 'lock');
      this._isLocked = false;
      this._scrollY = 0;
      this.onPopulate = this.lock.bind(this);
      this.onEmpty = this.unlock.bind(this);
    }

    if ( Module ) ScrollLocker.__proto__ = Module;
    ScrollLocker.prototype = Object.create( Module && Module.prototype );
    ScrollLocker.prototype.constructor = ScrollLocker;

    var prototypeAccessors = { isLocked: { configurable: true } };

    prototypeAccessors.isLocked.get = function () {
      return this._isLocked;
    };

    ScrollLocker.prototype.lock = function lock () {
      if (!this._isLocked) {
        this._isLocked = true;
        this._scrollY = window.scrollY;
        var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.setAttribute(ns.attr('scrolling'), 'false');
        document.body.style.top = (-this._scrollY) + "px";
        this.behavior = getComputedStyle(document.documentElement).getPropertyValue('scroll-behavior');
        if (this.behavior === 'smooth') { document.documentElement.style.scrollBehavior = 'auto'; }
        if (scrollBarGap > 0) {
          document.documentElement.style.setProperty('--scrollbar-width', (scrollBarGap + "px"));
        }
      }
    };

    ScrollLocker.prototype.unlock = function unlock () {
      if (this._isLocked) {
        this._isLocked = false;
        document.documentElement.removeAttribute(ns.attr('scrolling'));
        document.body.style.top = '';
        window.scrollTo(0, this._scrollY);
        if (this.behavior === 'smooth') { document.documentElement.style.removeProperty('scroll-behavior'); }
        document.documentElement.style.removeProperty('--scrollbar-width');
      }
    };

    ScrollLocker.prototype.move = function move (value) {
      if (this._isLocked) {
        this._scrollY += value;
        document.body.style.top = (-this._scrollY) + "px";
      } else {
        window.scrollTo(0, window.scrollY + value);
      }
    };

    Object.defineProperties( ScrollLocker.prototype, prototypeAccessors );

    return ScrollLocker;
  }(Module));

  var Load = /*@__PURE__*/(function (Module) {
    function Load () {
      Module.call(this, 'load');
      this.loading = this.load.bind(this);
    }

    if ( Module ) Load.__proto__ = Module;
    Load.prototype = Object.create( Module && Module.prototype );
    Load.prototype.constructor = Load;

    Load.prototype.activate = function activate () {
      window.addEventListener('load', this.loading);
    };

    Load.prototype.load = function load () {
      this.forEach(function (instance) { return instance.load(); });
    };

    return Load;
  }(Module));

  var FONT_FAMILIES = ['Marianne', 'Spectral'];

  var FontSwap = /*@__PURE__*/(function (Module) {
    function FontSwap () {
      Module.call(this, 'font-swap');
      this.swapping = this.swap.bind(this);
    }

    if ( Module ) FontSwap.__proto__ = Module;
    FontSwap.prototype = Object.create( Module && Module.prototype );
    FontSwap.prototype.constructor = FontSwap;

    FontSwap.prototype.activate = function activate () {
      if (document.fonts) {
        document.fonts.addEventListener('loadingdone', this.swapping);
      }
    };

    FontSwap.prototype.swap = function swap () {
      var families = FONT_FAMILIES.filter(function (family) { return document.fonts.check(("16px " + family)); });

      this.forEach(function (instance) { return instance.swapFont(families); });
    };

    return FontSwap;
  }(Module));

  var MouseMove = /*@__PURE__*/(function (Module) {
    function MouseMove () {
      Module.call(this, 'mouse-move');
      this.requireMove = false;
      this._isMoving = false;
      this.moving = this.move.bind(this);
      this.requesting = this.request.bind(this);
      this.onPopulate = this.listen.bind(this);
      this.onEmpty = this.unlisten.bind(this);
    }

    if ( Module ) MouseMove.__proto__ = Module;
    MouseMove.prototype = Object.create( Module && Module.prototype );
    MouseMove.prototype.constructor = MouseMove;

    MouseMove.prototype.listen = function listen () {
      if (this._isMoving) { return; }
      this._isMoving = true;
      this.requireMove = false;
      document.documentElement.addEventListener('mousemove', this.requesting);
    };

    MouseMove.prototype.unlisten = function unlisten () {
      if (!this._isMoving) { return; }
      this._isMoving = false;
      this.requireMove = false;
      document.documentElement.removeEventListener('mousemove', this.requesting);
    };

    MouseMove.prototype.request = function request (e) {
      if (!this._isMoving) { return; }
      this.point = { x: e.clientX, y: e.clientY };
      if (this.requireMove) { return; }
      this.requireMove = true;
      window.requestAnimationFrame(this.moving);
    };

    MouseMove.prototype.move = function move () {
      var this$1$1 = this;

      if (!this.requireMove) { return; }
      this.forEach(function (instance) { return instance.mouseMove(this$1$1.point); });
      this.requireMove = false;
    };

    return MouseMove;
  }(Module));

  var Hash = /*@__PURE__*/(function (Module) {
    function Hash () {
      Module.call(this, 'hash');
      this.handling = this.handle.bind(this);
      this.getLocationHash();
    }

    if ( Module ) Hash.__proto__ = Module;
    Hash.prototype = Object.create( Module && Module.prototype );
    Hash.prototype.constructor = Hash;

    var prototypeAccessors = { hash: { configurable: true } };

    Hash.prototype.activate = function activate () {
      window.addEventListener('hashchange', this.handling);
    };

    Hash.prototype.deactivate = function deactivate () {
      window.removeEventListener('hashchange', this.handling);
    };

    Hash.prototype._sanitize = function _sanitize (hash) {
      if (hash.charAt(0) === '#') { return hash.substring(1); }
      return hash;
    };

    prototypeAccessors.hash.set = function (value) {
      var hash = this._sanitize(value);
      if (this._hash !== hash) { window.location.hash = hash; }
    };

    prototypeAccessors.hash.get = function () {
      return this._hash;
    };

    Hash.prototype.getLocationHash = function getLocationHash () {
      var hash = window.location.hash;
      this._hash = this._sanitize(hash);
    };

    Hash.prototype.handle = function handle (e) {
      var this$1$1 = this;

      this.getLocationHash();
      this.forEach(function (instance) { return instance.handleHash(this$1$1._hash, e); });
    };

    Object.defineProperties( Hash.prototype, prototypeAccessors );

    return Hash;
  }(Module));

  var Engine = function Engine () {
    state.create(Register);
    state.create(Stage);
    state.create(Renderer);
    state.create(Resizer);
    state.create(ScrollLocker);
    state.create(Load);
    state.create(FontSwap);
    state.create(MouseMove);
    state.create(Hash);

    var registerModule = state.getModule('register');
    this.register = registerModule.register.bind(registerModule);
  };

  var prototypeAccessors$2 = { isActive: { configurable: true } };

  prototypeAccessors$2.isActive.get = function () {
    return state.isActive;
  };

  Engine.prototype.start = function start () {
    inspector.debug('START');
    state.isActive = true;
  };

  Engine.prototype.stop = function stop () {
    inspector.debug('STOP');
    state.isActive = false;
  };

  Object.defineProperties( Engine.prototype, prototypeAccessors$2 );

  var engine = new Engine();

  var Colors = function Colors () {};

  Colors.prototype.getColor = function getColor (context, use, tint, options) {
      if ( options === void 0 ) options = {};

    var option = getOption(options);
    var decision = "--" + context + "-" + use + "-" + tint + option;
    return getComputedStyle(document.documentElement).getPropertyValue(decision).trim() || null;
  };

  var getOption = function (options) {
    switch (true) {
      case options.hover:
        return '-hover';
      case options.active:
        return '-active';
      default:
        return '';
    }
  };

  var colors = new Colors();

  var sanitize = function (className) { return className.charAt(0) === '.' ? className.substr(1) : className; };

  var getClassNames = function (element) { return element.className ? element.className.split(' ') : []; };

  var modifyClass = function (element, className, remove) {
    className = sanitize(className);
    var classNames = getClassNames(element);
    var index = classNames.indexOf(className);
    if (remove === true) {
      if (index > -1) { classNames.splice(index, 1); }
    } else if (index === -1) { classNames.push(className); }
    element.className = classNames.join(' ');
  };

  var addClass = function (element, className) { return modifyClass(element, className); };

  var removeClass = function (element, className) { return modifyClass(element, className, true); };

  var hasClass = function (element, className) { return getClassNames(element).indexOf(sanitize(className)) > -1; };

  var ACTIONS = [
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

  var ACTIONS_SELECTOR = ACTIONS.join();

  var queryActions = function (element) {
    return element.querySelectorAll(ACTIONS_SELECTOR);
  };

  var counter = 0;

  var uniqueId = function (id) {
    if (!document.getElementById(id)) { return id; }
    var element = true;
    var base = id;
    while (element) {
      counter++;
      id = base + "-" + counter;
      element = document.getElementById(id);
    }
    return id;
  };

  var dom = {};

  dom.addClass = addClass;
  dom.hasClass = hasClass;
  dom.removeClass = removeClass;
  dom.queryParentSelector = queryParentSelector;
  dom.querySelectorAllArray = querySelectorAllArray;
  dom.queryActions = queryActions;
  dom.uniqueId = uniqueId;

  var supportLocalStorage = function () {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  var supportAspectRatio = function () {
    if (!window.CSS) { return false; }
    return CSS.supports('aspect-ratio: 16 / 9');
  };

  var support = {};

  support.supportLocalStorage = supportLocalStorage;

  support.supportAspectRatio = supportAspectRatio;

  var TransitionSelector = {
    NONE: ns.selector('transition-none')
  };

  var selector = {};

  selector.TransitionSelector = TransitionSelector;

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

  var property = {};

  property.completeAssign = completeAssign;

  /**
   * Return an object of query params or null
   *
   * @method
   * @name searchParams
   * @param {string} url - an url
   * @returns {Object} object of query params or null
   */

  var searchParams = function (url) {
    if (url && url.search) {
      var params = new URLSearchParams(window.location.search);
      var entries = params.entries();
      return Object.fromEntries(entries);
    }
    return null;
  };

  var internals = {};
  var legacy = {};

  Object.defineProperty(legacy, 'isLegacy', {
    get: function () { return state.isLegacy; }
  });

  legacy.setLegacy = function () {
    state.isLegacy = true;
  };

  internals.legacy = legacy;
  internals.dom = dom;
  internals.support = support;
  internals.motion = selector;
  internals.property = property;
  internals.ns = ns;
  internals.register = engine.register;
  internals.state = state;
  internals.query = searchParams(window.location);

  Object.defineProperty(internals, 'preventManipulation', {
    get: function () { return options.preventManipulation; }
  });
  Object.defineProperty(internals, 'stage', {
    get: function () { return state.getModule('stage'); }
  });

  var api$1 = function (node) {
    var stage = state.getModule('stage');
    return stage.getProxy(node);
  };

  api$1.version = config.version;
  api$1.prefix = config.prefix;
  api$1.organisation = config.organisation;
  api$1.Modes = Modes;

  Object.defineProperty(api$1, 'mode', {
    set: function (value) { options.mode = value; },
    get: function () { return options.mode; }
  });

  api$1.internals = internals;
  api$1.version = config.version;

  api$1.start = engine.start;
  api$1.stop = engine.stop;

  api$1.inspector = inspector;
  api$1.colors = colors;

  var configuration = window[config.namespace];
  api$1.internals.configuration = configuration;

  options.configure(configuration, api$1.start, api$1.internals.query);

  window[config.namespace] = api$1;

  var Emitter = function Emitter () {
    this.emissions = {};
  };

  Emitter.prototype.add = function add (type, closure) {
    if (typeof closure !== 'function') { throw new Error('closure must be a function'); }
    if (!this.emissions[type]) { this.emissions[type] = []; }
    this.emissions[type].push(closure);
  };

  Emitter.prototype.remove = function remove (type, closure) {
    if (!this.emissions[type]) { return; }
    if (!closure) { delete this.emissions[type]; }
    else {
      var index = this.emissions[type].indexOf(closure);
      if (index > -1) { this.emissions[type].splice(index); }
    }
  };

  Emitter.prototype.emit = function emit (type, data) {
    if (!this.emissions[type]) { return []; }
    var response = [];
    for (var i = 0, list = this.emissions[type]; i < list.length; i += 1) {
        var closure = list[i];

        if (closure) { response.push(closure(data));
      } }
    return response;
  };

  Emitter.prototype.dispose = function dispose () {
    this.emissions = null;
  };

  var Breakpoint = function Breakpoint (id, minWidth) {
    this.id = id;
    this.minWidth = minWidth;
  };

  Breakpoint.prototype.test = function test () {
    return window.matchMedia(("(min-width: " + (this.minWidth) + "em)")).matches;
  };

  var Breakpoints = {
    XS: new Breakpoint('xs', 0),
    SM: new Breakpoint('sm', 36),
    MD: new Breakpoint('md', 48),
    LG: new Breakpoint('lg', 62),
    XL: new Breakpoint('xl', 78)
  };

  var Instance = function Instance (jsAttribute) {
    if ( jsAttribute === void 0 ) jsAttribute = true;

    this.jsAttribute = jsAttribute;
    this._isRendering = false;
    this._isResizing = false;
    this._isScrollLocked = false;
    this._isLoading = false;
    this._isSwappingFont = false;
    this._isEnabled = true;
    this._isDisposed = false;
    this._listeners = {};
    this.handlingClick = this.handleClick.bind(this);
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
  };

  var prototypeAccessors$1 = { proxy: { configurable: true },hash: { configurable: true },isEnabled: { configurable: true },isRendering: { configurable: true },isResizing: { configurable: true },isScrollLocked: { configurable: true },isLoading: { configurable: true },isSwappingFont: { configurable: true },isMouseMoving: { configurable: true },isDisposed: { configurable: true },style: { configurable: true },classNames: { configurable: true },hasFocus: { configurable: true },isLegacy: { configurable: true } };
  var staticAccessors = { instanceClassName: { configurable: true } };

  staticAccessors.instanceClassName.get = function () {
    return 'Instance';
  };

  Instance.prototype._config = function _config (element, registration) {
    this.element = element;
    this.registration = registration;
    this.node = element.node;
    this.id = element.node.id;
    if (this.jsAttribute) { this.setAttribute(registration.attribute, true); }
    this.init();
  };

  Instance.prototype.init = function init () {};

  prototypeAccessors$1.proxy.get = function () {
    var scope = this;
    var proxy = {
      render: function () { return scope.render(); },
      resize: function () { return scope.resize(); }
    };

    var proxyAccessors = {
      get node () {
        return this.node;
      },
      get isEnabled () {
        return scope.isEnabled;
      },
      set isEnabled (value) {
        scope.isEnabled = value;
      }
    };

    return completeAssign(proxy, proxyAccessors);
  };

  Instance.prototype.log = function log () {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

    values.unshift(((this.registration.instanceClassName) + " #" + (this.id) + " - "));
    inspector.log.apply(inspector, values);
  };

  Instance.prototype.debug = function debug () {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

    values.unshift(((this.registration.instanceClassName) + " #" + (this.id) + " - "));
    inspector.debug.apply(inspector, values);
  };

  Instance.prototype.info = function info () {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

    values.unshift(((this.registration.instanceClassName) + " #" + (this.id) + " - "));
    inspector.info.apply(inspector, values);
  };

  Instance.prototype.warn = function warn () {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

    values.unshift(((this.registration.instanceClassName) + " #" + (this.id) + " - "));
    inspector.warn.apply(inspector, values);
  };

  Instance.prototype.error = function error () {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

    values.unshift(((this.registration.instanceClassName) + " #" + (this.id) + " - "));
    inspector.error.apply(inspector, values);
  };

  Instance.prototype.register = function register (selector, InstanceClass) {
    var registration = state.getModule('register').register(selector, InstanceClass, this);
    this._registrations.push(registration);
  };

  Instance.prototype.getRegisteredInstances = function getRegisteredInstances (instanceClassName) {
    for (var i = 0, list = this._registrations; i < list.length; i += 1) {
        var registration = list[i];

        if (registration.hasInstanceClassName(instanceClassName)) { return registration.instances.collection;
      } }
    return [];
  };

  Instance.prototype.dispatch = function dispatch (type, detail, bubbles, cancelable) {
    var event = new CustomEvent(type, { detail: detail, bubble: bubbles === true, cancelable: cancelable === true });
    this.node.dispatchEvent(event);
  };

  // TODO v2 => listener au niveau des éléments qui redistribuent aux instances.
  Instance.prototype.listen = function listen (type, closure, options) {
    if (!this._listeners[type]) { this._listeners[type] = []; }
    var listeners = this._listeners[type];
    // if (listeners.some(listener => listener.closure === closure)) return;
    var listener = new Listener(this.node, type, closure, options);
    listeners.push(listener);
    listener.listen();
  };

  Instance.prototype.unlisten = function unlisten (type, closure, options) {
      var this$1$1 = this;

    if (!type) {
      for (var type$1 in this._listeners) { this.unlisten(type$1); }
      return;
    }

    var listeners = this._listeners[type];

    if (!listeners) { return; }

    if (!closure) {
      listeners.forEach(function (listener) { return this$1$1.unlisten(type, listener.closure); });
      return;
    }

    var removal = listeners.filter(function (listener) { return listener.closure === closure && listener.matchOptions(options); });
    removal.forEach(function (listener) { return listener.unlisten(); });
    this._listeners[type] = listeners.filter(function (listener) { return removal.indexOf(listener) === -1; });
  };

  Instance.prototype.listenClick = function listenClick (options) {
    this.listen('click', this.handlingClick, options);
  };

  Instance.prototype.unlistenClick = function unlistenClick (options) {
    this.unlisten('click', this.handlingClick, options);
  };

  Instance.prototype.handleClick = function handleClick (e) {};

  prototypeAccessors$1.hash.set = function (value) {
    state.getModule('hash').hash = value;
  };

  prototypeAccessors$1.hash.get = function () {
    return state.getModule('hash').hash;
  };

  Instance.prototype.listenHash = function listenHash (hash, add) {
    if (this._hashes.length === 0) { state.add('hash', this); }
    var action = new HashAction(hash, add);
    this._hashes = this._hashes.filter(function (action) { return action.hash !== hash; });
    this._hashes.push(action);
  };

  Instance.prototype.unlistenHash = function unlistenHash (hash) {
    this._hashes = this._hashes.filter(function (action) { return action.hash !== hash; });
    if (this._hashes.length === 0) { state.remove('hash', this); }
  };

  Instance.prototype.handleHash = function handleHash (hash, e) {
    for (var i = 0, list = this._hashes; i < list.length; i += 1) {
        var action = list[i];

        action.handle(hash, e);
      }
  };

  Instance.prototype.listenKey = function listenKey (keyCode, closure, preventDefault, stopPropagation, type) {
      if ( preventDefault === void 0 ) preventDefault = false;
      if ( stopPropagation === void 0 ) stopPropagation = false;
      if ( type === void 0 ) type = 'down';

    if (this._keyListenerTypes.indexOf(type) === -1) {
      this.listen(("key" + type), this.handlingKey);
      this._keyListenerTypes.push(type);
    }

    this._keys.push(new KeyAction(type, keyCode, closure, preventDefault, stopPropagation));
  };

  Instance.prototype.unlistenKey = function unlistenKey (code, closure) {
      var this$1$1 = this;

    this._keys = this._keys.filter(function (key) { return key.code !== code || key.closure !== closure; });

    this._keyListenerTypes.forEach(function (type) {
      if (!this$1$1._keys.some(function (key) { return key.type === type; })) { this$1$1.unlisten(("key" + type), this$1$1.handlingKey); }
    });
  };

  Instance.prototype.handleKey = function handleKey (e) {
    for (var i = 0, list = this._keys; i < list.length; i += 1) {
        var key = list[i];

        key.handle(e);
      }
  };

  prototypeAccessors$1.isEnabled.get = function () { return this._isEnabled; };

  prototypeAccessors$1.isEnabled.set = function (value) {
    this._isEnabled = value;
  };

  prototypeAccessors$1.isRendering.get = function () { return this._isRendering; };

  prototypeAccessors$1.isRendering.set = function (value) {
    if (this._isRendering === value) { return; }
    if (value) { state.add('render', this); }
    else { state.remove('render', this); }
    this._isRendering = value;
  };

  Instance.prototype.render = function render () {};

  Instance.prototype.request = function request (closure) {
    this._nexts.push(closure);
    state.getModule('render').request(this);
  };

  Instance.prototype.next = function next () {
    var nexts = this._nexts.slice();
    this._nexts.length = 0;
    for (var i = 0, list = nexts; i < list.length; i += 1) {
        var closure = list[i];

        if (closure) { closure();
      } }
  };

  prototypeAccessors$1.isResizing.get = function () { return this._isResizing; };

  prototypeAccessors$1.isResizing.set = function (value) {
    if (this._isResizing === value) { return; }
    if (value) {
      state.add('resize', this);
      this.resize();
    } else { state.remove('resize', this); }
    this._isResizing = value;
  };

  Instance.prototype.resize = function resize () {};

  Instance.prototype.isBreakpoint = function isBreakpoint (breakpoint) {
    switch (true) {
      case typeof breakpoint === 'string':
        return Breakpoints[breakpoint.toUpperCase()].test();

      default:
        return breakpoint.test();
    }
  };

  prototypeAccessors$1.isScrollLocked.get = function () {
    return this._isScrollLocked;
  };

  prototypeAccessors$1.isScrollLocked.set = function (value) {
    if (this._isScrollLocked === value) { return; }
    if (value) { state.add('lock', this); }
    else { state.remove('lock', this); }
    this._isScrollLocked = value;
  };

  prototypeAccessors$1.isLoading.get = function () {
    return this._isLoading;
  };

  prototypeAccessors$1.isLoading.set = function (value) {
    if (this._isLoading === value) { return; }
    if (value) { state.add('load', this); }
    else { state.remove('load', this); }
    this._isLoading = value;
  };

  Instance.prototype.load = function load () {};

  prototypeAccessors$1.isSwappingFont.get = function () {
    return this._isSwappingFont;
  };

  prototypeAccessors$1.isSwappingFont.set = function (value) {
    if (this._isSwappingFont === value) { return; }
    if (value) { state.add('font-swap', this); }
    else { state.remove('font-swap', this); }
    this._isSwappingFont = value;
  };

  Instance.prototype.swapFont = function swapFont () {};

  prototypeAccessors$1.isMouseMoving.get = function () { return this._isMouseMoving; };

  prototypeAccessors$1.isMouseMoving.set = function (value) {
    if (this._isMouseMoving === value) { return; }
    if (value) {
      state.add('mouse-move', this);
    } else {
      state.remove('mouse-move', this);
    }
    this._isMouseMoving = value;
  };

  Instance.prototype.mouseMove = function mouseMove (point) {};

  Instance.prototype.examine = function examine (attributeNames) {
    if (!this.node.matches(this.registration.selector)) {
      this._dispose();
      return;
    }

    this.mutate(attributeNames);
  };

  Instance.prototype.mutate = function mutate (attributeNames) {};

  Instance.prototype.retrieveNodeId = function retrieveNodeId (node, append) {
    if (node.id) { return node.id; }
    var id = uniqueId(((this.id) + "-" + append));
    this.warn(("add id '" + id + "' to " + append));
    node.setAttribute('id', id);
    return id;
  };

  prototypeAccessors$1.isDisposed.get = function () {
    return this._isDisposed;
  };

  Instance.prototype._dispose = function _dispose () {
    this.debug(("dispose instance of " + (this.registration.instanceClassName) + " on element [" + (this.element.id) + "]"));
    this.removeAttribute(this.registration.attribute);
    this.unlisten();
    this._hashes = null;
    this._keys = null;
    this.isRendering = false;
    this.isResizing = false;
    this._nexts = null;
    state.getModule('render').nexts.remove(this);
    this.isScrollLocked = false;
    this.isLoading = false;
    this.isSwappingFont = false;
    this._emitter.dispose();
    this._emitter = null;
    this._ascent.dispose();
    this._ascent = null;
    this._descent.dispose();
    this._descent = null;
    this.element.remove(this);
    for (var i = 0, list = this._registrations; i < list.length; i += 1) {
        var registration = list[i];

        state.remove('register', registration);
      }
    this._registrations = null;
    this.registration.remove(this);
    this._isDisposed = true;
    this.dispose();
  };

  Instance.prototype.dispose = function dispose () {};

  Instance.prototype.emit = function emit (type, data) {
    return this.element.emit(type, data);
  };

  Instance.prototype.addEmission = function addEmission (type, closure) {
    this._emitter.add(type, closure);
  };

  Instance.prototype.removeEmission = function removeEmission (type, closure) {
    this._emitter.remove(type, closure);
  };

  Instance.prototype.ascend = function ascend (type, data) {
    return this.element.ascend(type, data);
  };

  Instance.prototype.addAscent = function addAscent (type, closure) {
    this._ascent.add(type, closure);
  };

  Instance.prototype.removeAscent = function removeAscent (type, closure) {
    this._ascent.remove(type, closure);
  };

  Instance.prototype.descend = function descend (type, data) {
    return this.element.descend(type, data);
  };

  Instance.prototype.addDescent = function addDescent (type, closure) {
    this._descent.add(type, closure);
  };

  Instance.prototype.removeDescent = function removeDescent (type, closure) {
    this._descent.remove(type, closure);
  };

  prototypeAccessors$1.style.get = function () {
    return this.node.style;
  };

  Instance.prototype.addClass = function addClass$1 (className) {
    addClass(this.node, className);
  };

  Instance.prototype.removeClass = function removeClass$1 (className) {
    removeClass(this.node, className);
  };

  Instance.prototype.hasClass = function hasClass$1 (className) {
    return hasClass(this.node, className);
  };

  prototypeAccessors$1.classNames.get = function () {
    return getClassNames(this.node);
  };

  Instance.prototype.remove = function remove () {
    this.node.parentNode.removeChild(this.node);
  };

  Instance.prototype.setAttribute = function setAttribute (attributeName, value) {
    this.node.setAttribute(attributeName, value);
  };

  Instance.prototype.getAttribute = function getAttribute (attributeName) {
    return this.node.getAttribute(attributeName);
  };

  Instance.prototype.hasAttribute = function hasAttribute (attributeName) {
    return this.node.hasAttribute(attributeName);
  };

  Instance.prototype.removeAttribute = function removeAttribute (attributeName) {
    this.node.removeAttribute(attributeName);
  };

  Instance.prototype.setProperty = function setProperty (propertyName, value) {
    this.node.style.setProperty(propertyName, value);
  };

  Instance.prototype.removeProperty = function removeProperty (propertyName) {
    this.node.style.removeProperty(propertyName);
  };

  Instance.prototype.focus = function focus () {
    this.node.focus();
  };

  Instance.prototype.blur = function blur () {
    this.node.blur();
  };

  Instance.prototype.focusClosest = function focusClosest () {
    var closest = this._focusClosest(this.node.parentNode);
    if (closest) { closest.focus(); }
  };

  Instance.prototype._focusClosest = function _focusClosest (parent) {
    if (!parent) { return null; }
    var actions = [].concat( queryActions(parent) );
    if (actions.length <= 1) {
      return this._focusClosest(parent.parentNode);
    } else {
      var index = actions.indexOf(this.node);
      return actions[index + (index < actions.length - 1 ? 1 : -1)];
    }
  };

  prototypeAccessors$1.hasFocus.get = function () {
    return this.node === document.activeElement;
  };

  Instance.prototype.scrollIntoView = function scrollIntoView () {
    var rect = this.getRect();

    var scroll = state.getModule('lock');

    if (rect.top < 0) {
      scroll.move(rect.top - 50);
    }

    if (rect.bottom > window.innerHeight) {
      scroll.move(rect.bottom - window.innerHeight + 50);
    }
  };

  Instance.prototype.matches = function matches (selectors) {
    return this.node.matches(selectors);
  };

  Instance.prototype.querySelector = function querySelector (selectors) {
    return this.node.querySelector(selectors);
  };

  Instance.prototype.querySelectorAll = function querySelectorAll (selectors) {
    return querySelectorAllArray(this.node, selectors);
  };

  Instance.prototype.queryParentSelector = function queryParentSelector$1 (selectors) {
    return queryParentSelector(this.node, selectors);
  };

  Instance.prototype.getRect = function getRect () {
    var rect = this.node.getBoundingClientRect();
    rect.center = rect.left + rect.width * 0.5;
    rect.middle = rect.top + rect.height * 0.5;
    return rect;
  };

  prototypeAccessors$1.isLegacy.get = function () {
    return state.isLegacy;
  };

  Object.defineProperties( Instance.prototype, prototypeAccessors$1 );
  Object.defineProperties( Instance, staticAccessors );

  var KeyAction = function KeyAction (type, keyCode, closure, preventDefault, stopPropagation) {
    this.type = type;
    this.eventType = "key" + type;
    this.keyCode = keyCode;
    this.closure = closure;
    this.preventDefault = preventDefault === true;
    this.stopPropagation = stopPropagation === true;
  };

  KeyAction.prototype.handle = function handle (e) {
    if (e.type !== this.eventType) { return; }
    if (e.keyCode === this.keyCode.value) {
      this.closure(e);
      if (this.preventDefault) {
        e.preventDefault();
      }
      if (this.stopPropagation) {
        e.stopPropagation();
      }
    }
  };

  var Listener = function Listener (node, type, closure, options) {
    this._node = node;
    this._type = type;
    this._closure = closure;
    this._options = options;
  };

  var prototypeAccessors$1$1 = { closure: { configurable: true } };

  prototypeAccessors$1$1.closure.get = function () {
    return this._closure;
  };

  Listener.prototype.listen = function listen () {
    this._node.addEventListener(this._type, this._closure, this._options);
  };

  Listener.prototype.matchOptions = function matchOptions (options) {
      var this$1$1 = this;
      if ( options === void 0 ) options = null;

    switch (true) {
      case options === null:
      case typeof this._options === 'boolean' && typeof options === 'boolean' && this._options === options:
        return true;

      case Object.keys(this._options).length !== Object.keys(options).length:
        return false;

      case Object.keys(options).every(function (key) { return this$1$1._options[key] === options[key]; }):
        return true;
    }

    return false;
  };

  Listener.prototype.unlisten = function unlisten () {
    this._node.removeEventListener(this._type, this._closure, this._options);
  };

  Object.defineProperties( Listener.prototype, prototypeAccessors$1$1 );

  var HashAction = function HashAction (hash, add) {
    this.hash = hash;
    this.add = add;
  };

  HashAction.prototype.handle = function handle (hash, e) {
    if (this.hash === hash) { this.add(e); }
  };

  var DisclosureEvent = {
    DISCLOSE: ns.event('disclose'),
    CONCEAL: ns.event('conceal')
  };

  var DisclosureEmission = {
    RESET: ns.emission('disclosure', 'reset'),
    ADDED: ns.emission('disclosure', 'added'),
    RETRIEVE: ns.emission('disclosure', 'retrieve'),
    REMOVED: ns.emission('disclosure', 'removed'),
    GROUP: ns.emission('disclosure', 'group'),
    UNGROUP: ns.emission('disclosure', 'ungroup'),
    SPOTLIGHT: ns.emission('disclosure', 'spotlight')
  };

  var Disclosure = /*@__PURE__*/(function (Instance) {
    function Disclosure (type, selector, DisclosureButtonInstanceClass, disclosuresGroupInstanceClassName) {
      Instance.call(this);
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

    if ( Instance ) Disclosure.__proto__ = Instance;
    Disclosure.prototype = Object.create( Instance && Instance.prototype );
    Disclosure.prototype.constructor = Disclosure;

    var prototypeAccessors = { isEnabled: { configurable: true },isPristine: { configurable: true },proxy: { configurable: true },buttons: { configurable: true },group: { configurable: true },isDisclosed: { configurable: true },isInitiallyDisclosed: { configurable: true },buttonHasFocus: { configurable: true },hasFocus: { configurable: true },primaryButtons: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Disclosure';
    };

    Disclosure.prototype.init = function init () {
      this.addDescent(DisclosureEmission.RESET, this.reset.bind(this));
      this.addDescent(DisclosureEmission.GROUP, this.update.bind(this));
      this.addDescent(DisclosureEmission.UNGROUP, this.update.bind(this));
      this.addAscent(DisclosureEmission.SPOTLIGHT, this.disclose.bind(this));
      this.register(("[aria-controls=\"" + (this.id) + "\"]"), this.DisclosureButtonInstanceClass);
      this.ascend(DisclosureEmission.ADDED);
      this.listenHash(this.id, this._spotlight.bind(this));
      this.update();
    };

    prototypeAccessors.isEnabled.get = function () { return Instance.prototype.isEnabled; };

    prototypeAccessors.isEnabled.set = function (value) {
      if (this.isEnabled === value) { return; }
      Instance.prototype.isEnabled = value;
      if (value) { this.ascend(DisclosureEmission.ADDED); }
      else { this.ascend(DisclosureEmission.REMOVED); }
    };

    prototypeAccessors.isPristine.get = function () {
      return this._isPristine;
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      var proxy = Object.assign.call(this, Instance.prototype.proxy, {
        disclose: scope.disclose.bind(scope),
        focus: scope.focus.bind(scope)
      });

      if (this.type.canConceal) { proxy.conceal = scope.conceal.bind(scope); }

      var proxyAccessors = {
        get buttons () {
          return scope.buttons.map(function (button) { return button.proxy; });
        },
        get group () {
          var group = scope.group;
          return group ? group.proxy : null;
        },
        get isDisclosed () {
          return scope.isDisclosed;
        }
      };

      return completeAssign(proxy, proxyAccessors);
    };

    prototypeAccessors.buttons.get = function () {
      return this.getRegisteredInstances(this.DisclosureButtonInstanceClass.instanceClassName);
    };

    Disclosure.prototype.update = function update () {
      this.getGroup();
      this.retrievePrimaries();
    };

    Disclosure.prototype.getGroup = function getGroup () {
      if (!this.disclosuresGroupInstanceClassName) {
        this._group = null;
        return;
      }

      var group = this.element.getAscendantInstance(this.disclosuresGroupInstanceClassName, this.constructor.instanceClassName);
      if (!group || !group.validate(this)) {
        this._group = null;
        return;
      }

      this._group = group;
    };

    prototypeAccessors.group.get = function () {
      return this._group;
    };

    Disclosure.prototype.disclose = function disclose (withhold) {
      if (this.isDisclosed === true || !this.isEnabled) { return false; }
      this._isPristine = false;
      this.isDisclosed = true;
      if (!withhold && this.group) { this.group.current = this; }
      return true;
    };

    Disclosure.prototype.conceal = function conceal (withhold, preventFocus) {
      if ( preventFocus === void 0 ) preventFocus = true;

      if (this.isDisclosed === false) { return false; }
      if (!this.type.canConceal && this.group && this.group.current === this) { return false; }
      this.isDisclosed = false;
      if (!withhold && this.group && this.group.current === this) { this.group.current = null; }
      if (!preventFocus) { this.focus(); }
      if (!this._isPristine) { this.descend(DisclosureEmission.RESET); }
      return true;
    };

    prototypeAccessors.isDisclosed.get = function () {
      return this._isDisclosed;
    };

    prototypeAccessors.isDisclosed.set = function (value) {
      if (this._isDisclosed === value || (!this.isEnabled && value === true)) { return; }
      this.dispatch(value ? DisclosureEvent.DISCLOSE : DisclosureEvent.CONCEAL, this.type);
      this._isDisclosed = value;
      if (value) { this.addClass(this.modifier); }
      else { this.removeClass(this.modifier); }
      for (var i = 0; i < this.buttons.length; i++) { this.buttons[i].apply(value); }
    };

    prototypeAccessors.isInitiallyDisclosed.get = function () {
      return this.primaryButtons.some(function (button) { return button.isInitiallyDisclosed; });
    };

    Disclosure.prototype.hasRetrieved = function hasRetrieved () {
      return this._hasRetrieved;
    };

    Disclosure.prototype.reset = function reset () {};

    Disclosure.prototype.toggle = function toggle (canDisclose) {
      if (!this.type.canConceal) { this.disclose(); }
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
    };

    prototypeAccessors.buttonHasFocus.get = function () {
      return this.buttons.some(function (button) { return button.hasFocus; });
    };

    prototypeAccessors.hasFocus.get = function () {
      if (Instance.prototype.hasFocus) { return true; }
      if (this.buttonHasFocus) { return true; }
      return this.querySelectorAll(':focus').length > 0;
    };

    Disclosure.prototype.focus = function focus () {
      if (this._primaryButtons.length > 0) { this._primaryButtons[0].focus(); }
    };

    prototypeAccessors.primaryButtons.get = function () {
      return this._primaryButtons;
    };

    Disclosure.prototype.retrievePrimaries = function retrievePrimaries () {
      if (this._isRetrievingPrimaries) { return; }
      this._isRetrievingPrimaries = true;
      this.request(this._retrievePrimaries.bind(this));
    };

    Disclosure.prototype._retrievePrimaries = function _retrievePrimaries () {
      this._isRetrievingPrimaries = false;
      this._primaryButtons = this._electPrimaries(this.buttons);

      if (this._hasRetrieved || this._primaryButtons.length === 0) { return; }
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
    };

    Disclosure.prototype.retrieved = function retrieved () {};

    Disclosure.prototype._spotlight = function _spotlight () {
      var this$1$1 = this;

      this.disclose();
      this.request(function () { this$1$1.ascend(DisclosureEmission.SPOTLIGHT); });
    };

    Disclosure.prototype._electPrimaries = function _electPrimaries (candidates) {
      var this$1$1 = this;

      return candidates.filter(function (button) { return button.canDisclose && !this$1$1.node.contains(button.node); });
    };

    Disclosure.prototype.applyAbility = function applyAbility (withhold) {
      if ( withhold === void 0 ) withhold = false;

      var isEnabled = !this._primaryButtons.every(function (button) { return button.isDisabled; });

      if (this.isEnabled === isEnabled) { return; }

      this.isEnabled = isEnabled;

      if (withhold) { return; }

      if (!this.isEnabled && this.isDisclosed) {
        if (this.group) { this.ascend(DisclosureEmission.REMOVED); }
        else if (this.type.canConceal) { this.conceal(); }
      }

      if (this.isEnabled) {
        if (this.group) { this.ascend(DisclosureEmission.ADDED); }
        if (this.hash === this.id) {
          this._spotlight();
        }
      }
    };

    Disclosure.prototype.dispose = function dispose () {
      this._group = null;
      this._primaryButtons = null;
      Instance.prototype.dispose.call(this);
      this.ascend(DisclosureEmission.REMOVED);
    };

    Object.defineProperties( Disclosure.prototype, prototypeAccessors );
    Object.defineProperties( Disclosure, staticAccessors );

    return Disclosure;
  }(Instance));

  var DisclosureButton = /*@__PURE__*/(function (Instance) {
    function DisclosureButton (type) {
      Instance.call(this);
      this.type = type;
      this.attributeName = type.ariaState ? 'aria-' + type.id : ns.attr(type.id);
      this._canDisclose = false;
    }

    if ( Instance ) DisclosureButton.__proto__ = Instance;
    DisclosureButton.prototype = Object.create( Instance && Instance.prototype );
    DisclosureButton.prototype.constructor = DisclosureButton;

    var prototypeAccessors = { isPrimary: { configurable: true },canDisclose: { configurable: true },isDisabled: { configurable: true },proxy: { configurable: true },isDisclosed: { configurable: true },isInitiallyDisclosed: { configurable: true },dx: { configurable: true },dy: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'DisclosureButton';
    };

    prototypeAccessors.isPrimary.get = function () {
      return this.registration.creator.primaryButtons.includes(this);
    };

    prototypeAccessors.canDisclose.get = function () {
      return this._canDisclose;
    };

    prototypeAccessors.isDisabled.get = function () {
      return this.type.canDisable && this.hasAttribute('disabled');
    };

    DisclosureButton.prototype.init = function init () {
      this._canDisclose = this.hasAttribute(this.attributeName);
      this._isInitiallyDisclosed = this.isDisclosed;
      this._isContained = this.registration.creator.node.contains(this.node);
      this.controlsId = this.getAttribute('aria-controls');
      this.registration.creator.retrievePrimaries();
      this.listenClick();
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, Instance.prototype.proxy, {
        focus: scope.focus.bind(scope)
      });
    };

    DisclosureButton.prototype.handleClick = function handleClick (e) {
      if (this.registration.creator) { this.registration.creator.toggle(this.canDisclose); }
    };

    DisclosureButton.prototype.mutate = function mutate (attributeNames) {
      this._canDisclose = this.hasAttribute(this.attributeName);
      this.registration.creator.applyAbility();
      if (!this._isApplying && this.isPrimary && attributeNames.indexOf(this.attributeName) > -1 && this.registration.creator) {
        if (this.isDisclosed) { this.registration.creator.disclose(); }
        else if (this.type.canConceal) { this.registration.creator.conceal(); }
      }
    };

    DisclosureButton.prototype.apply = function apply (value) {
      var this$1$1 = this;

      if (!this.canDisclose) { return; }
      this._isApplying = true;
      this.setAttribute(this.attributeName, value);
      this.request(function () { this$1$1._isApplying = false; });
    };

    prototypeAccessors.isDisclosed.get = function () {
      return this.getAttribute(this.attributeName) === 'true';
    };

    prototypeAccessors.isInitiallyDisclosed.get = function () {
      return this._isInitiallyDisclosed;
    };

    DisclosureButton.prototype.focus = function focus () {
      Instance.prototype.focus.call(this);
      this.scrollIntoView();
    };

    DisclosureButton.prototype.measure = function measure (rect) {
      var buttonRect = this.rect;
      this._dx = rect.x - buttonRect.x;
      this._dy = rect.y - buttonRect.y;
    };

    prototypeAccessors.dx.get = function () {
      return this._dx;
    };

    prototypeAccessors.dy.get = function () {
      return this._dy;
    };

    Object.defineProperties( DisclosureButton.prototype, prototypeAccessors );
    Object.defineProperties( DisclosureButton, staticAccessors );

    return DisclosureButton;
  }(Instance));

  var DisclosuresGroup = /*@__PURE__*/(function (Instance) {
    function DisclosuresGroup (disclosureInstanceClassName, jsAttribute) {
      Instance.call(this, jsAttribute);
      this.disclosureInstanceClassName = disclosureInstanceClassName;
      this._members = [];
      this._index = -1;
      this._isRetrieving = false;
      this._hasRetrieved = false;
    }

    if ( Instance ) DisclosuresGroup.__proto__ = Instance;
    DisclosuresGroup.prototype = Object.create( Instance && Instance.prototype );
    DisclosuresGroup.prototype.constructor = DisclosuresGroup;

    var prototypeAccessors = { proxy: { configurable: true },members: { configurable: true },length: { configurable: true },index: { configurable: true },current: { configurable: true },hasFocus: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'DisclosuresGroup';
    };

    DisclosuresGroup.prototype.init = function init () {
      this.addAscent(DisclosureEmission.ADDED, this.update.bind(this));
      this.addAscent(DisclosureEmission.RETRIEVE, this.retrieve.bind(this));
      this.addAscent(DisclosureEmission.REMOVED, this.update.bind(this));
      this.descend(DisclosureEmission.GROUP);
      this.update();
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;

      var proxyAccessors = {
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
          var current = scope.current;
          return current ? current.proxy : null;
        },
        get members () {
          return scope.members.map(function (member) { return member.proxy; });
        },
        get hasFocus () {
          return scope.hasFocus;
        }
      };

      return completeAssign.call(this, Instance.prototype.proxy, proxyAccessors);
    };

    DisclosuresGroup.prototype.validate = function validate (member) {
      return true;
    };

    DisclosuresGroup.prototype.getMembers = function getMembers () {
      var this$1$1 = this;

      var members = this.element.getDescendantInstances(this.disclosureInstanceClassName, this.constructor.instanceClassName, true);
      this._members = members.filter(this.validate.bind(this)).filter(function (member) { return member.isEnabled; });
      var invalids = members.filter(function (member) { return !this$1$1._members.includes(member); });
      invalids.forEach(function (invalid) { return invalid.conceal(); });
    };

    DisclosuresGroup.prototype.retrieve = function retrieve (bypassPrevention) {
      if ( bypassPrevention === void 0 ) bypassPrevention = false;

      if (this._isRetrieving || (this._hasRetrieved && !bypassPrevention)) { return; }
      this._isRetrieving = true;
      this.request(this._retrieve.bind(this));
    };

    DisclosuresGroup.prototype._retrieve = function _retrieve () {
      var this$1$1 = this;

      this.getMembers();
      this._isRetrieving = false;
      this._hasRetrieved = true;
      if (this.hash) {
        for (var i = 0; i < this.length; i++) {
          var member = this.members[i];
          if (this.hash === member.id) {
            this.index = i;
            this.request(function () { this$1$1.ascend(DisclosureEmission.SPOTLIGHT); });
            return i;
          }
        }
      }

      for (var i$1 = 0; i$1 < this.length; i$1++) {
        var member$1 = this.members[i$1];
        if (member$1.isInitiallyDisclosed) {
          this.index = i$1;
          return i$1;
        }
      }

      return this.getIndex();
    };

    DisclosuresGroup.prototype.update = function update () {
      this.getMembers();
      if (this._hasRetrieved) { this.getIndex(); }
    };

    prototypeAccessors.members.get = function () {
      return this._members;
    };

    prototypeAccessors.length.get = function () {
      return this.members ? this.members.length : 0;
    };

    DisclosuresGroup.prototype.getIndex = function getIndex (defaultIndex) {
      if ( defaultIndex === void 0 ) defaultIndex = -1;

      this._index = undefined;
      var index = defaultIndex;
      for (var i = 0; i < this.length; i++) {
        if (this.members[i].isDisclosed) {
          index = i;
          break;
        }
      }

      this.index = index;
      return index;
    };

    prototypeAccessors.index.get = function () {
      return this._index;
    };

    prototypeAccessors.index.set = function (value) {
      if (value < -1 || value >= this.length || value === this._index) { return; }
      this._index = value;
      for (var i = 0; i < this.length; i++) {
        var member = this.members[i];
        if (value === i) {
          if (!member.isDisclosed) { member.disclose(true); }
        } else {
          if (member.isDisclosed) { member.conceal(true); }
        }
      }
      this.apply();
    };

    prototypeAccessors.current.get = function () {
      if (this._index === -1 || isNaN(this._index)) { return null; }
      return this._members[this._index] || null;
    };

    prototypeAccessors.current.set = function (member) {
      this.index = this.members.indexOf(member);
    };

    prototypeAccessors.hasFocus.get = function () {
      var current = this.current;
      if (current) { return current.hasFocus; }
      return false;
    };

    DisclosuresGroup.prototype.apply = function apply () {};

    DisclosuresGroup.prototype.dispose = function dispose () {
      Instance.prototype.dispose.call(this);
      this.descend(DisclosureEmission.UNGROUP);
      this._members = null;
    };

    Object.defineProperties( DisclosuresGroup.prototype, prototypeAccessors );
    Object.defineProperties( DisclosuresGroup, staticAccessors );

    return DisclosuresGroup;
  }(Instance));

  var DisclosureType = {
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

  var DisclosureSelector = {
    PREVENT_CONCEAL: ns.attr.selector('prevent-conceal')
  };

  var CollapseButton = /*@__PURE__*/(function (DisclosureButton) {
    function CollapseButton () {
      DisclosureButton.call(this, DisclosureType.EXPAND);
    }

    if ( DisclosureButton ) CollapseButton.__proto__ = DisclosureButton;
    CollapseButton.prototype = Object.create( DisclosureButton && DisclosureButton.prototype );
    CollapseButton.prototype.constructor = CollapseButton;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CollapseButton';
    };

    Object.defineProperties( CollapseButton, staticAccessors );

    return CollapseButton;
  }(DisclosureButton));

  var CollapseSelector = {
    COLLAPSE: ns.selector('collapse'),
    COLLAPSING: ns.selector('collapsing')
  };

  /**
   * Tab coorespond au panel d'un élement Tabs (tab panel)
   * Tab étend disclosure qui ajoute/enleve le modifier --selected,
   * et ajoute/eleve l'attribut hidden, sur le panel
   */
  var Collapse = /*@__PURE__*/(function (Disclosure) {
    function Collapse () {
      Disclosure.call(this, DisclosureType.EXPAND, CollapseSelector.COLLAPSE, CollapseButton, 'CollapsesGroup');
    }

    if ( Disclosure ) Collapse.__proto__ = Disclosure;
    Collapse.prototype = Object.create( Disclosure && Disclosure.prototype );
    Collapse.prototype.constructor = Collapse;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Collapse';
    };

    Collapse.prototype.init = function init () {
      Disclosure.prototype.init.call(this);
      this.listen('transitionend', this.transitionend.bind(this));
    };

    Collapse.prototype.transitionend = function transitionend (e) {
      this.removeClass(CollapseSelector.COLLAPSING);
      if (!this.isDisclosed) {
        if (this.isLegacy) { this.style.maxHeight = ''; }
        else { this.style.removeProperty('--collapse-max-height'); }
      }
    };

    Collapse.prototype.unbound = function unbound () {
      if (this.isLegacy) { this.style.maxHeight = 'none'; }
      else { this.style.setProperty('--collapse-max-height', 'none'); }
    };

    Collapse.prototype.disclose = function disclose (withhold) {
      var this$1$1 = this;

      if (this.isDisclosed === true || !this.isEnabled) { return false; }
      this.unbound();
      this.request(function () {
        this$1$1.addClass(CollapseSelector.COLLAPSING);
        this$1$1.adjust();
        this$1$1.request(function () {
          Disclosure.prototype.disclose.call(this$1$1, withhold);
        });
      });
    };

    Collapse.prototype.conceal = function conceal (withhold, preventFocus) {
      var this$1$1 = this;

      if (this.isDisclosed === false) { return false; }
      this.request(function () {
        this$1$1.addClass(CollapseSelector.COLLAPSING);
        this$1$1.adjust();
        this$1$1.request(function () {
          Disclosure.prototype.conceal.call(this$1$1, withhold, preventFocus);
        });
      });
    };

    Collapse.prototype.adjust = function adjust () {
      this.setProperty('--collapser', 'none');
      var height = this.node.offsetHeight;
      this.setProperty('--collapse', -height + 'px');
      this.setProperty('--collapser', '');
    };

    Collapse.prototype.reset = function reset () {
      if (!this.isPristine) { this.isDisclosed = false; }
    };

    Collapse.prototype._electPrimaries = function _electPrimaries (candidates) {
      var primary = this.element.parent.instances.map(function (instance) { return instance.collapsePrimary; }).filter(function (button) { return button !== undefined && candidates.indexOf(button) > -1; });
      if (primary.length === 1) { return primary; }
      candidates = Disclosure.prototype._electPrimaries.call(this, candidates);
      if (candidates.length === 1) { return candidates; }
      var before = candidates.filter(function (candidate) { return candidate.dy >= 0; });
      if (before.length > 0) { candidates = before; }
      if (candidates.length === 1) { return candidates; }
      var min = Math.min.apply(Math, candidates.map(function (candidate) { return candidate.dy; }));
      var mins = candidates.filter(function (candidate) { return candidate.dy === min; });
      if (mins.length > 0) { candidates = mins; }
      if (candidates.length === 1) { return candidates; }
      candidates.sort(function (a, b) { return Math.abs(b.dx) - Math.abs(a.dx); });
      return candidates;
    };

    Object.defineProperties( Collapse, staticAccessors );

    return Collapse;
  }(Disclosure));

  var CollapsesGroup = /*@__PURE__*/(function (DisclosuresGroup) {
    function CollapsesGroup () {
      DisclosuresGroup.call(this, 'Collapse');
    }

    if ( DisclosuresGroup ) CollapsesGroup.__proto__ = DisclosuresGroup;
    CollapsesGroup.prototype = Object.create( DisclosuresGroup && DisclosuresGroup.prototype );
    CollapsesGroup.prototype.constructor = CollapsesGroup;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CollapsesGroup';
    };

    Object.defineProperties( CollapsesGroup, staticAccessors );

    return CollapsesGroup;
  }(DisclosuresGroup));

  var EquisizedEmission = {
    CHANGE: ns('equisized')
  };

  var Equisized = /*@__PURE__*/(function (Instance) {
    function Equisized () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) Equisized.__proto__ = Instance;
    Equisized.prototype = Object.create( Instance && Instance.prototype );
    Equisized.prototype.constructor = Equisized;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Equisized';
    };

    Equisized.prototype.init = function init () {
      this.ascend(EquisizedEmission.CHANGE);
    };

    Equisized.prototype.measure = function measure () {
      if (this.isLegacy) { this.style.width = 'auto'; }
      return this.getRect().width;
    };

    Equisized.prototype.adjust = function adjust (width) {
      if (this.isLegacy) { this.style.width = width + "px"; }
    };

    Equisized.prototype.dispose = function dispose () {
      this.ascend(EquisizedEmission.CHANGE);
    };

    Object.defineProperties( Equisized, staticAccessors );

    return Equisized;
  }(Instance));

  var EquisizedsGroup = /*@__PURE__*/(function (Instance) {
    function EquisizedsGroup () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) EquisizedsGroup.__proto__ = Instance;
    EquisizedsGroup.prototype = Object.create( Instance && Instance.prototype );
    EquisizedsGroup.prototype.constructor = EquisizedsGroup;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'EquisizedsGroup';
    };

    EquisizedsGroup.prototype.init = function init () {
      this.isResizing = true;
      this.isLoading = true;
      this.addAscent(EquisizedEmission.CHANGE, this.resize.bind(this));
    };

    EquisizedsGroup.prototype.load = function load () {
      this.resize();
    };

    EquisizedsGroup.prototype.resize = function resize () {
      var equisizeds = this.element.getDescendantInstances('Equisized');
      if (!this.isLegacy) { this.style.setProperty('--equisized-width', 'auto'); }

      var width = Math.max.apply(Math, equisizeds.map(function (equisized) { return equisized.measure(); }));
      if (this.isLegacy) { equisizeds.forEach(function (equisized) { return equisized.adjust(width); }); }
      else { this.style.setProperty('--equisized-width', (width + "px")); }
    };

    Object.defineProperties( EquisizedsGroup, staticAccessors );

    return EquisizedsGroup;
  }(Instance));

  var ToggleEvent = {
    TOGGLE: ns.event('toggle')
  };

  var Toggle = /*@__PURE__*/(function (Instance) {
    function Toggle () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) Toggle.__proto__ = Instance;
    Toggle.prototype = Object.create( Instance && Instance.prototype );
    Toggle.prototype.constructor = Toggle;

    var prototypeAccessors = { pressed: { configurable: true },proxy: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Toggle';
    };

    Toggle.prototype.init = function init () {
      this.pressed = this.pressed === 'true';
      this.listenClick();
    };

    Toggle.prototype.handleClick = function handleClick () {
      this.toggle();
    };

    Toggle.prototype.toggle = function toggle () {
      this.pressed = this.pressed !== 'true';
    };

    prototypeAccessors.pressed.get = function () {
      return this.getAttribute('aria-pressed');
    };

    prototypeAccessors.pressed.set = function (value) {
      this.setAttribute('aria-pressed', value ? 'true' : 'false');
      this.dispatch(ToggleEvent.TOGGLE, value);
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      var proxy = Object.assign.call(this, Instance.prototype.proxy, {
        toggle: scope.toggle.bind(scope)
      });

      var proxyAccessors = {
        get pressed () {
          return scope.pressed;
        },
        set pressed (value) {
          scope.pressed = value;
        }
      };

      return completeAssign(proxy, proxyAccessors);
    };

    Object.defineProperties( Toggle.prototype, prototypeAccessors );
    Object.defineProperties( Toggle, staticAccessors );

    return Toggle;
  }(Instance));

  var RootSelector = {
    ROOT: ':root'
  };

  var setAttributes = function (el, attrs) {
    Object.keys(attrs).forEach(function (key) { return el.setAttribute(key, attrs[key]); });
  };

  var InjectSvg = /*@__PURE__*/(function (Instance) {
    function InjectSvg () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) InjectSvg.__proto__ = Instance;
    InjectSvg.prototype = Object.create( Instance && Instance.prototype );
    InjectSvg.prototype.constructor = InjectSvg;

    var prototypeAccessors = { proxy: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'InjectSvg';
    };

    InjectSvg.prototype.init = function init () {
      if (this.node) {
        this.img = this.node.querySelector('img');
      }

      if (!this.isLegacy) {
        this.replace();
      }
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, Instance.prototype.proxy, {
        replace: scope.replace.bind(scope),
        restore: scope.restore.bind(scope)
      });
    };

    InjectSvg.prototype.fetch = function fetch$1 () {
      var this$1$1 = this;

      if (this.img) {
        this.imgID = this.img.getAttribute('id');
        this.imgClass = this.img.getAttribute('class');
        this.imgURL = this.img.getAttribute('src');

        fetch(this.imgURL)
          .then(function (data) { return data.text(); })
          .then(function (response) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(response, 'text/html');
            this$1$1.svg = xmlDoc.querySelector('svg');

            if (this$1$1.svg) {
              this$1$1.replace();
            }
          });
      }
    };

    InjectSvg.prototype.replace = function replace () {
      if (!this.svg) {
        this.fetch();
        return;
      }

      if (this.imgID && typeof this.imgID !== 'undefined') {
        this.svg.setAttribute('id', this.imgID);
      }

      // gestion de la dépréciation
      var name = this.imgURL.match(/[ \w-]+\./)[0];
      if (name) {
        name = name.slice(0, -1);

        if (['dark', 'light', 'system'].includes(name)) {
          this.svg.innerHTML = this.svg.innerHTML.replaceAll('id="artwork-', ("id=\"" + name + "-artwork-"));
          this.svg.innerHTML = this.svg.innerHTML.replaceAll('"#artwork-', ("\"#" + name + "-artwork-"));
        }
      }

      if (this.imgClass && typeof this.imgClass !== 'undefined') {
        this.svg.setAttribute('class', this.imgClass);
      }

      if (this.svg.hasAttribute('xmlns:a')) {
        this.svg.removeAttribute('xmlns:a');
      }

      this.node.setAttribute('data-fr-inject-svg', true);
      var svgAttributes = {
        'aria-hidden': true,
        focusable: false
      };
      setAttributes(this.svg, svgAttributes);
      this.node.replaceChild(this.svg, this.img);
    };

    InjectSvg.prototype.restore = function restore () {
      if (this.img && this.svg) {
        this.node.setAttribute('data-fr-inject-svg', false);
        this.node.replaceChild(this.img, this.svg);
      }
    };

    Object.defineProperties( InjectSvg.prototype, prototypeAccessors );
    Object.defineProperties( InjectSvg, staticAccessors );

    return InjectSvg;
  }(Instance));

  var InjectSvgSelector = {
    INJECT_SVG: ("[" + (ns.attr('inject-svg')) + "]")
  };

  var Artwork = /*@__PURE__*/(function (Instance) {
    function Artwork () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) Artwork.__proto__ = Instance;
    Artwork.prototype = Object.create( Instance && Instance.prototype );
    Artwork.prototype.constructor = Artwork;

    var prototypeAccessors = { proxy: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Artwork';
    };

    Artwork.prototype.init = function init () {
      if (this.isLegacy) {
        this.replace();
      }
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, Instance.prototype.proxy, {
        replace: scope.replace.bind(scope)
      });
    };

    Artwork.prototype.fetch = function fetch () {
      var this$1$1 = this;

      this.xlink = this.node.getAttribute('href');
      var splitUrl = this.xlink.split('#');
      this.svgUrl = splitUrl[0];
      this.svgName = splitUrl[1];

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
        this$1$1.realSvgContent = xmlDoc.getElementById(this$1$1.svgName);

        if (this$1$1.realSvgContent) {
          this$1$1.realSvgContent.classList.add(this$1$1.node.classList);
          this$1$1.replace();
        }
      };
      xhr.open('GET', this.svgUrl);
      xhr.send();
    };

    Artwork.prototype.replace = function replace () {
      if (!this.realSvgContent) {
        this.fetch();
        return;
      }

      this.node.parentNode.replaceChild(this.realSvgContent, this.node);
    };

    Object.defineProperties( Artwork.prototype, prototypeAccessors );
    Object.defineProperties( Artwork, staticAccessors );

    return Artwork;
  }(Instance));

  var ArtworkSelector = {
    ARTWORK_USE: ((ns.selector('artwork')) + " use")
  };

  var AssessSelector = {
    ASSESS_FILE: ("" + (ns.attr.selector('assess-file'))),
    DETAIL: ((ns.attr.selector('assess-file')) + " [class$=\"__detail\"], " + (ns.attr.selector('assess-file')) + " [class*=\"__detail \"]")
  };

  var AssessEmission = {
    UPDATE: ns.emission('assess', 'update'),
    ADDED: ns.emission('assess', 'added')
  };

  var AssessFile = /*@__PURE__*/(function (Instance) {
    function AssessFile () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) AssessFile.__proto__ = Instance;
    AssessFile.prototype = Object.create( Instance && Instance.prototype );
    AssessFile.prototype.constructor = AssessFile;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AssessFile';
    };

    AssessFile.prototype.init = function init () {
      this.lang = this.getLang(this.node);
      this.href = this.getAttribute('href');
      this.hreflang = this.getAttribute('hreflang');
      this.file = {};
      this.gather();
      this.addAscent(AssessEmission.ADDED, this.update.bind(this));
      this.addDescent(AssessEmission.ADDED, this.update.bind(this));
    };

    AssessFile.prototype.getFileLength = function getFileLength () {
      var this$1$1 = this;

      if (this.href === undefined) {
        this.length = -1;
        return;
      }

      fetch(this.href, { method: 'HEAD', mode: 'cors' }).then(function (response) {
        this$1$1.length = response.headers.get('content-length') || -1;
        if (this$1$1.length === -1) {
          inspector.warn('File size unknown: ' + this$1$1.href + '\nUnable to get HTTP header: "content-length"');
        }
        this$1$1.gather();
      });
    };

    AssessFile.prototype.mutate = function mutate (attributeNames) {
      if (attributeNames.indexOf('href') !== -1) {
        this.href = this.getAttribute('href');
        this.getFileLength();
      }

      if (attributeNames.indexOf('hreflang') !== -1) {
        this.hreflang = this.getAttribute('hreflang');
        this.gather();
      }
    };

    AssessFile.prototype.gather = function gather () {
      // TODO V2: implémenter async
      if (this.isLegacy) { this.length = -1; }

      if (!this.length) {
        this.getFileLength();
        return;
      }

      this.details = [];

      if (this.href) {
        var extension = this.parseExtension(this.href);
        if (extension) { this.details.push(extension.toUpperCase()); }
      }

      if (this.length !== -1) {
        this.details.push(this.bytesToSize(this.length));
      }

      if (this.hreflang) {
        this.details.push(this.getLangDisplayName(this.hreflang));
      }

      this.update();
    };

    AssessFile.prototype.update = function update () {
      if (!this.details) { return; }
      this.descend(AssessEmission.UPDATE, this.details);
      this.ascend(AssessEmission.UPDATE, this.details);
    };

    AssessFile.prototype.getLang = function getLang (elem) {
      // todo: ajouter un listener global de changement de langue
      if (elem.lang) { return elem.lang; }
      if (document.documentElement === elem) { return window.navigator.language; }
      return this.getLang(elem.parentElement);
    };

    AssessFile.prototype.parseExtension = function parseExtension (url) {
      var regexExtension = /\.(\w{1,9})(?:$|[?#])/;
      return url.match(regexExtension)[0].replace('.', '');
    };

    AssessFile.prototype.getLangDisplayName = function getLangDisplayName (locale) {
      if (this.isLegacy) { return locale; }
      var displayNames = new Intl.DisplayNames([this.lang], { type: 'language' });
      var name = displayNames.of(locale);
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    AssessFile.prototype.bytesToSize = function bytesToSize (bytes) {
      if (bytes === -1) { return null; }

      var sizeUnits = ['octets', 'ko', 'Mo', 'Go', 'To'];
      if (this.getAttribute(ns.attr('assess-file')) === 'bytes') {
        sizeUnits = ['bytes', 'KB', 'MB', 'GB', 'TB'];
      }

      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
      if (i === 0) { return (bytes + " " + (sizeUnits[i])); }

      var size = bytes / (Math.pow( 1000, i ));
      var roundedSize = Math.round((size + Number.EPSILON) * 100) / 100; // arrondi a 2 décimal
      var stringSize = String(roundedSize).replace('.', ',');

      return (stringSize + " " + (sizeUnits[i]));
    };

    Object.defineProperties( AssessFile, staticAccessors );

    return AssessFile;
  }(Instance));

  var AssessDetail = /*@__PURE__*/(function (Instance) {
    function AssessDetail () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) AssessDetail.__proto__ = Instance;
    AssessDetail.prototype = Object.create( Instance && Instance.prototype );
    AssessDetail.prototype.constructor = AssessDetail;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AssessDetail';
    };

    AssessDetail.prototype.init = function init () {
      this.addDescent(AssessEmission.UPDATE, this.update.bind(this));
      this.ascend(AssessEmission.ADDED);
    };

    AssessDetail.prototype.update = function update (details) {
      this.node.innerHTML = details.join(' - ');
    };

    Object.defineProperties( AssessDetail, staticAccessors );

    return AssessDetail;
  }(Instance));

  var ratiosImg = ['32x9', '16x9', '3x2', '4x3', '1x1', '3x4', '2x3'];
  var ratiosVid = ['16x9', '4x3', '1x1'];

  var ratioSelector = function (name, modifiers) {
    return modifiers.map(function (modifier) { return ns.selector((name + "--" + modifier)); }).join(',');
  };

  var deprecatedRatioSelector = (ns.selector('responsive-img')) + ", " + (ratioSelector('responsive-img', ratiosImg)) + ", " + (ns.selector('responsive-vid')) + ", " + (ratioSelector('responsive-vid', ratiosVid));

  var RatioSelector = {
    RATIO: ((ns.selector('ratio')) + ", " + (ratioSelector('ratio', ratiosImg)) + ", " + deprecatedRatioSelector)
  };

  var api = window[config.namespace];

  var Ratio = /*@__PURE__*/(function (Instance) {
    function Ratio () {
      Instance.apply(this, arguments);
    }

    if ( Instance ) Ratio.__proto__ = Instance;
    Ratio.prototype = Object.create( Instance && Instance.prototype );
    Ratio.prototype.constructor = Ratio;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Ratio';
    };

    Ratio.prototype.init = function init () {
      if (!api.internals.support.supportAspectRatio()) {
        this.ratio = 16 / 9;
        for (var className in this.classNames) {
          if (this.registration.selector.indexOf(this.classNames[className]) > 0) {
            var ratio = this.classNames[className].split('ratio-');
            if (ratio[1]) {
              this.ratio = ratio[1].split('x')[0] / ratio[1].split('x')[1];
            }
          }
        }
        this.isRendering = true;
        this.update();
      }
    };

    Ratio.prototype.render = function render () {
      var width = this.getRect().width;
      if (width !== this.currentWidth) { this.update(); }
    };

    Ratio.prototype.update = function update () {
      this.currentWidth = this.getRect().width;
      this.style.height = this.currentWidth / this.ratio + 'px';
    };

    Object.defineProperties( Ratio, staticAccessors );

    return Ratio;
  }(Instance));

  var PlaceSelector = {
    TOP: ns.selector('placement--top'),
    RIGHT: ns.selector('placement--right'),
    BOTTOM: ns.selector('placement--bottom'),
    LEFT: ns.selector('placement--left')
  };

  var AlignSelector = {
    START: ns.selector('placement--start'),
    CENTER: ns.selector('placement--center'),
    END: ns.selector('placement--end')
  };

  var PlacementPosition = {
    TOP: 'place_top',
    RIGHT: 'place_right',
    BOTTOM: 'place_bottom',
    LEFT: 'place_left'
  };

  var PlacementAlign = {
    START: 'align_start',
    CENTER: 'align_center',
    END: 'align_end'
  };

  var PlacementMode = {
    AUTO: 'placement_auto',
    MANUAL: 'placement_manual'
  };

  var Placement = /*@__PURE__*/(function (Instance) {
    function Placement (mode, places, aligns, safeAreaMargin) {
      if ( mode === void 0 ) mode = PlacementMode.AUTO;
      if ( places === void 0 ) places = [PlacementPosition.BOTTOM, PlacementPosition.TOP, PlacementPosition.LEFT, PlacementPosition.RIGHT];
      if ( aligns === void 0 ) aligns = [PlacementAlign.CENTER, PlacementAlign.START, PlacementAlign.END];
      if ( safeAreaMargin === void 0 ) safeAreaMargin = 16;

      Instance.call(this);
      this._mode = mode;
      this._places = places;
      this._aligns = aligns;
      this._safeAreaMargin = safeAreaMargin;
      this._isShown = false;
    }

    if ( Instance ) Placement.__proto__ = Instance;
    Placement.prototype = Object.create( Instance && Instance.prototype );
    Placement.prototype.constructor = Placement;

    var prototypeAccessors = { proxy: { configurable: true },mode: { configurable: true },place: { configurable: true },align: { configurable: true },isShown: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Placement';
    };

    Placement.prototype.init = function init () {
      this.isResizing = true;
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      var proxy = Object.assign.call(this, Instance.prototype.proxy, {
        show: scope.show.bind(scope),
        hide: scope.hide.bind(scope)
      });

      var proxyAccessors = {
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
    };

    prototypeAccessors.mode.get = function () {
      return this._mode;
    };

    prototypeAccessors.mode.set = function (value) {
      this._mode = value;
    };

    prototypeAccessors.place.get = function () {
      return this._place;
    };

    prototypeAccessors.place.set = function (value) {
      if (this._place === value) { return; }
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
    };

    prototypeAccessors.align.get = function () {
      return this._align;
    };

    prototypeAccessors.align.set = function (value) {
      if (this._align === value) { return; }
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
    };

    Placement.prototype.show = function show () {
      this.isShown = true;
    };

    Placement.prototype.hide = function hide () {
      this.isShown = false;
    };

    prototypeAccessors.isShown.get = function () {
      return this._isShown;
    };

    prototypeAccessors.isShown.set = function (value) {
      if (this._isShown === value || !this.isEnabled) { return; }
      this.isRendering = value;
      this._isShown = value;
    };

    Placement.prototype.setReferent = function setReferent (referent) {
      this._referent = referent;
    };

    Placement.prototype.resize = function resize () {
      this.safeArea = {
        top: this._safeAreaMargin,
        right: window.innerWidth - this._safeAreaMargin,
        bottom: window.innerHeight - this._safeAreaMargin,
        left: this._safeAreaMargin,
        center: window.innerWidth * 0.5,
        middle: window.innerHeight * 0.5
      };
    };

    Placement.prototype.render = function render () {
      if (!this._referent) { return; }
      this.rect = this.getRect();
      this.referentRect = this._referent.getRect();

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

      var x, y;

      switch (this.place) {
        case PlacementPosition.TOP:
          y = this.referentRect.top - this.rect.height;
          break;

        case PlacementPosition.RIGHT:
          x = this.referentRect.right;
          break;

        case PlacementPosition.BOTTOM:
          y = this.referentRect.bottom;
          break;

        case PlacementPosition.LEFT:
          x = this.referentRect.left - this.rect.width;
          break;
      }

      switch (this.place) {
        case PlacementPosition.TOP:
        case PlacementPosition.BOTTOM:
          switch (this.align) {
            case PlacementAlign.CENTER:
              x = this.referentRect.center - this.rect.width * 0.5;
              break;

            case PlacementAlign.START:
              x = this.referentRect.left;
              break;

            case PlacementAlign.END:
              x = this.referentRect.right - this.rect.width;
              break;
          }
          break;

        case PlacementPosition.RIGHT:
        case PlacementPosition.LEFT:
          switch (this.align) {
            case PlacementAlign.CENTER:
              y = this.referentRect.middle - this.rect.height * 0.5;
              break;

            case PlacementAlign.START:
              y = this.referentRect.top;
              break;

            case PlacementAlign.END:
              y = this.referentRect.bottom - this.rect.height;
              break;
          }
          break;
      }

      if (this._x !== x || this._y !== y) {
        this._x = (x + 0.5) | 0;
        this._y = (y + 0.5) | 0;
        this.node.style.transform = "translate(" + (this._x) + "px," + (this._y) + "px)";
      }
    };

    Placement.prototype.getPlace = function getPlace () {
      for (var i = 0, list = this._places; i < list.length; i += 1) {
        var place = list[i];

        switch (place) {
          case PlacementPosition.TOP:
            if (this.referentRect.top - this.rect.height > this.safeArea.top) { return PlacementPosition.TOP; }
            break;

          case PlacementPosition.RIGHT:
            if (this.referentRect.right + this.rect.width < this.safeArea.right) { return PlacementPosition.RIGHT; }
            break;

          case PlacementPosition.BOTTOM:
            if (this.referentRect.bottom + this.rect.height < this.safeArea.bottom) { return PlacementPosition.BOTTOM; }
            break;

          case PlacementPosition.LEFT:
            if (this.referentRect.left - this.rect.width > this.safeArea.left) { return PlacementPosition.LEFT; }
            break;
        }
      }

      return this._places[0];
    };

    Placement.prototype.getHorizontalAlign = function getHorizontalAlign () {
      for (var i = 0, list = this._aligns; i < list.length; i += 1) {
        var align = list[i];

        switch (align) {
          case PlacementAlign.CENTER:
            if (this.referentRect.center - this.rect.width * 0.5 > this.safeArea.left && this.referentRect.center + this.rect.width * 0.5 < this.safeArea.right) { return PlacementAlign.CENTER; }
            break;

          case PlacementAlign.START:
            if (this.referentRect.left + this.rect.width < this.safeArea.right) { return PlacementAlign.START; }
            break;

          case PlacementAlign.END:
            if (this.referentRect.right - this.rect.width > this.safeArea.left) { return PlacementAlign.END; }
            break;
        }
      }

      return this._aligns[0];
    };

    Placement.prototype.getVerticalAlign = function getVerticalAlign () {
      for (var i = 0, list = this._aligns; i < list.length; i += 1) {
        var align = list[i];

        switch (align) {
          case PlacementAlign.CENTER:
            if (this.referentRect.middle - this.rect.height * 0.5 > this.safeArea.top && this.referentRect.middle + this.rect.height * 0.5 < this.safeArea.bottom) { return PlacementAlign.CENTER; }
            break;

          case PlacementAlign.START:
            if (this.referentRect.top + this.rect.height < this.safeArea.bottom) { return PlacementAlign.START; }
            break;

          case PlacementAlign.END:
            if (this.referentRect.bottom - this.rect.height > this.safeArea.top) { return PlacementAlign.END; }
            break;
        }
      }

      return this._aligns[0];
    };

    Placement.prototype.dispose = function dispose () {
      this._referent = null;
      Instance.prototype.dispose.call(this);
    };

    Object.defineProperties( Placement.prototype, prototypeAccessors );
    Object.defineProperties( Placement, staticAccessors );

    return Placement;
  }(Instance));

  var PlacementReferent = /*@__PURE__*/(function (Instance) {
    function PlacementReferent () {
      Instance.call(this);
      this._isShown = false;
    }

    if ( Instance ) PlacementReferent.__proto__ = Instance;
    PlacementReferent.prototype = Object.create( Instance && Instance.prototype );
    PlacementReferent.prototype.constructor = PlacementReferent;

    var prototypeAccessors = { placement: { configurable: true },isShown: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PlacementReferent';
    };

    PlacementReferent.prototype.init = function init () {
      this.registration.creator.setReferent(this);
      this._placement = this.registration.creator;
    };

    prototypeAccessors.placement.get = function () {
      return this._placement;
    };

    prototypeAccessors.isShown.get = function () {
      return this._isShown;
    };

    prototypeAccessors.isShown.set = function (value) {
      if (this._isShown === value || !this.isEnabled) { return; }
      this._isShown = value;
      if (value) { this.registration.creator.show(); }
      else { this.registration.creator.hide(); }
    };

    PlacementReferent.prototype.show = function show () {
      this.isShown = true;
    };

    PlacementReferent.prototype.hide = function hide () {
      this.isShown = false;
    };

    Object.defineProperties( PlacementReferent.prototype, prototypeAccessors );
    Object.defineProperties( PlacementReferent, staticAccessors );

    return PlacementReferent;
  }(Instance));

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

  var SchemeValue = {
    SYSTEM: 'system',
    LIGHT: 'light',
    DARK: 'dark'
  };

  var SchemeAttribute = {
    THEME: api.internals.ns.attr('theme'),
    SCHEME: api.internals.ns.attr('scheme'),
    TRANSITION: api.internals.ns.attr('transition')
  };

  var SchemeTheme = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  var SchemeEmission = {
    SCHEME: api.internals.ns.emission('scheme', 'scheme'),
    THEME: api.internals.ns.emission('scheme', 'theme'),
    ASK: api.internals.ns.emission('scheme', 'ask')
  };

  var SchemeEvent = {
    SCHEME: api.internals.ns.event('scheme'),
    THEME: api.internals.ns.event('theme')
  };

  var Scheme = /*@__PURE__*/(function (superclass) {
    function Scheme () {
      superclass.call(this, false);
    }

    if ( superclass ) Scheme.__proto__ = superclass;
    Scheme.prototype = Object.create( superclass && superclass.prototype );
    Scheme.prototype.constructor = Scheme;

    var prototypeAccessors = { proxy: { configurable: true },scheme: { configurable: true },theme: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Scheme';
    };

    Scheme.prototype.init = function init () {
      this.changing = this.change.bind(this);

      if (this.hasAttribute(SchemeAttribute.TRANSITION)) {
        this.removeAttribute(SchemeAttribute.TRANSITION);
        this.request(this.restoreTransition.bind(this));
      }

      var scheme = api.internals.support.supportLocalStorage() ? localStorage.getItem('scheme') : '';
      var schemeAttr = this.getAttribute(SchemeAttribute.SCHEME);

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
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;

      var proxyAccessors = {
        get scheme () {
          return scope.scheme;
        },
        set scheme (value) {
          scope.scheme = value;
        }
      };

      return api.internals.property.completeAssign.call(this, superclass.prototype.proxy, proxyAccessors);
    };

    Scheme.prototype.restoreTransition = function restoreTransition () {
      this.setAttribute(SchemeAttribute.TRANSITION, '');
    };

    Scheme.prototype.ask = function ask () {
      this.descend(SchemeEmission.SCHEME, this.scheme);
    };

    Scheme.prototype.apply = function apply (value) {
      this.scheme = value;
    };

    prototypeAccessors.scheme.get = function () {
      return this._scheme;
    };

    prototypeAccessors.scheme.set = function (value) {
      if (this._scheme === value) { return; }
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
      this.dispatch(SchemeEvent.SCHEME, { scheme: this._scheme });
    };

    prototypeAccessors.theme.get = function () {
      return this._theme;
    };

    prototypeAccessors.theme.set = function (value) {
      if (this._theme === value) { return; }
      switch (value) {
        case SchemeTheme.LIGHT:
        case SchemeTheme.DARK:
          this._theme = value;
          this.setAttribute(SchemeAttribute.THEME, value);
          this.descend(SchemeEmission.THEME, value);
          this.dispatch(SchemeEvent.THEME, { theme: this._theme });
          document.documentElement.style.colorScheme = value === SchemeTheme.DARK ? 'dark' : '';
          break;
      }
    };

    Scheme.prototype.listenPreferences = function listenPreferences () {
      if (this.isListening) { return; }
      this.isListening = true;
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.changing);
      this.change();
    };

    Scheme.prototype.unlistenPreferences = function unlistenPreferences () {
      if (!this.isListening) { return; }
      this.isListening = false;
      this.mediaQuery.removeEventListener('change', this.changing);
      this.mediaQuery = null;
    };

    Scheme.prototype.change = function change () {
      if (!this.isListening) { return; }
      this.theme = this.mediaQuery.matches ? SchemeTheme.DARK : SchemeTheme.LIGHT;
    };

    Scheme.prototype.mutate = function mutate (attributeNames) {
      if (attributeNames.indexOf(SchemeAttribute.SCHEME) > -1) { this.scheme = this.getAttribute(SchemeAttribute.SCHEME); }
      if (attributeNames.indexOf(SchemeAttribute.THEME) > -1) { this.theme = this.getAttribute(SchemeAttribute.THEME); }
    };

    Scheme.prototype.dispose = function dispose () {
      this.unlistenPreferences();
    };

    Object.defineProperties( Scheme.prototype, prototypeAccessors );
    Object.defineProperties( Scheme, staticAccessors );

    return Scheme;
  }(api.core.Instance));

  var SchemeSelector = {
    SCHEME: (":root" + (api.internals.ns.attr.selector('theme')) + ", :root" + (api.internals.ns.attr.selector('scheme'))),
    SWITCH_THEME: api.internals.ns.selector('switch-theme'),
    RADIO_BUTTONS: ("input[name=\"" + (api.internals.ns('radios-theme')) + "\"]")
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

  var ACCORDION = api.internals.ns.selector('accordion');
  var COLLAPSE$2 = api.internals.ns.selector('collapse');

  var AccordionSelector = {
    GROUP: api.internals.ns.selector('accordions-group'),
    ACCORDION: ACCORDION,
    COLLAPSE: (ACCORDION + " > " + COLLAPSE$2 + ", " + ACCORDION + " > *:not(" + ACCORDION + ", " + COLLAPSE$2 + ") > " + COLLAPSE$2 + ", " + ACCORDION + " > *:not(" + ACCORDION + ", " + COLLAPSE$2 + ") > *:not(" + ACCORDION + ", " + COLLAPSE$2 + ") > " + COLLAPSE$2),
    COLLAPSE_LEGACY: (ACCORDION + " " + COLLAPSE$2),
    BUTTON: (ACCORDION + "__btn")
  };

  var Accordion = /*@__PURE__*/(function (superclass) {
    function Accordion () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Accordion.__proto__ = superclass;
    Accordion.prototype = Object.create( superclass && superclass.prototype );
    Accordion.prototype.constructor = Accordion;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Accordion';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(AccordionSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Accordion.prototype, prototypeAccessors );
    Object.defineProperties( Accordion, staticAccessors );

    return Accordion;
  }(api.core.Instance));

  var AccordionsGroup = /*@__PURE__*/(function (superclass) {
    function AccordionsGroup () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) AccordionsGroup.__proto__ = superclass;
    AccordionsGroup.prototype = Object.create( superclass && superclass.prototype );
    AccordionsGroup.prototype.constructor = AccordionsGroup;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'AccordionsGroup';
    };

    AccordionsGroup.prototype.validate = function validate (member) {
      var match = member.node.matches(api.internals.legacy.isLegacy ? AccordionSelector.COLLAPSE_LEGACY : AccordionSelector.COLLAPSE);
      return superclass.prototype.validate.call(this, member) && match;
    };

    Object.defineProperties( AccordionsGroup, staticAccessors );

    return AccordionsGroup;
  }(api.core.CollapsesGroup));

  api.accordion = {
    Accordion: Accordion,
    AccordionSelector: AccordionSelector,
    AccordionsGroup: AccordionsGroup
  };

  api.internals.register(api.accordion.AccordionSelector.GROUP, api.accordion.AccordionsGroup);
  api.internals.register(api.accordion.AccordionSelector.ACCORDION, api.accordion.Accordion);

  var ButtonSelector = {
    EQUISIZED_BUTTON: ((api.internals.ns.selector('btns-group--equisized')) + " " + (api.internals.ns.selector('btn'))),
    EQUISIZED_GROUP: api.internals.ns.selector('btns-group--equisized')
  };

  api.button = {
    ButtonSelector: ButtonSelector
  };

  api.internals.register(api.button.ButtonSelector.EQUISIZED_BUTTON, api.core.Equisized);
  api.internals.register(api.button.ButtonSelector.EQUISIZED_GROUP, api.core.EquisizedsGroup);

  var CardDownload = /*@__PURE__*/(function (superclass) {
    function CardDownload () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) CardDownload.__proto__ = superclass;
    CardDownload.prototype = Object.create( superclass && superclass.prototype );
    CardDownload.prototype.constructor = CardDownload;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'CardDownload';
    };

    CardDownload.prototype.init = function init () {
      var this$1$1 = this;

      this.addAscent(api.core.AssessEmission.UPDATE, function (details) {
        this$1$1.descend(api.core.AssessEmission.UPDATE, details);
      });
      this.addAscent(api.core.AssessEmission.ADDED, function () {
        this$1$1.descend(api.core.AssessEmission.ADDED);
      });
    };

    Object.defineProperties( CardDownload, staticAccessors );

    return CardDownload;
  }(api.core.Instance));

  var CardSelector = {
    DOWNLOAD: api.internals.ns.selector('card--download'),
    DOWNLOAD_DETAIL: ((api.internals.ns.selector('card--download')) + " " + (api.internals.ns.selector('card__end')) + " " + (api.internals.ns.selector('card__detail')))
  };

  api.card = {
    CardSelector: CardSelector,
    CardDownload: CardDownload
  };

  api.internals.register(api.card.CardSelector.DOWNLOAD, api.card.CardDownload);
  api.internals.register(api.card.CardSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

  var BreadcrumbSelector = {
    BREADCRUMB: api.internals.ns.selector('breadcrumb'),
    BUTTON: api.internals.ns.selector('breadcrumb__button')
  };

  var Breadcrumb = /*@__PURE__*/(function (superclass) {
    function Breadcrumb () {
      superclass.call(this);
      this.count = 0;
      this.focusing = this.focus.bind(this);
    }

    if ( superclass ) Breadcrumb.__proto__ = superclass;
    Breadcrumb.prototype = Object.create( superclass && superclass.prototype );
    Breadcrumb.prototype.constructor = Breadcrumb;

    var prototypeAccessors = { proxy: { configurable: true },links: { configurable: true },collapse: { configurable: true },collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Breadcrumb';
    };

    Breadcrumb.prototype.init = function init () {
      this.getCollapse();
      this.isResizing = true;
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, superclass.prototype.proxy, {
        focus: scope.focus.bind(scope),
        disclose: scope.collapse.disclose.bind(scope.collapse)
      });
    };

    Breadcrumb.prototype.getCollapse = function getCollapse () {
      var collapse = this.collapse;
      if (collapse) {
        collapse.listen(api.core.DisclosureEvent.DISCLOSE, this.focusing);
      } else {
        this.addAscent(api.core.DisclosureEmission.ADDED, this.getCollapse.bind(this));
      }
    };

    Breadcrumb.prototype.resize = function resize () {
      var collapse = this.collapse;
      var links = this.links;
      if (!collapse || !links.length) { return; }

      if (this.isBreakpoint(api.core.Breakpoints.MD)) {
        if (collapse.buttonHasFocus) { links[0].focus(); }
      } else {
        if (links.indexOf(document.activeElement) > -1) { collapse.focus(); }
      }
    };

    prototypeAccessors.links.get = function () {
      return [].concat( this.querySelectorAll('a[href]') );
    };

    prototypeAccessors.collapse.get = function () {
      return this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
    };

    Breadcrumb.prototype.focus = function focus () {
      this.count = 0;
      this._focus();
    };

    Breadcrumb.prototype._focus = function _focus () {
      var link = this.links[0];
      if (!link) { return; }
      link.focus();
      this.request(this.verify.bind(this));
    };

    Breadcrumb.prototype.verify = function verify () {
      this.count++;
      if (this.count > 100) { return; }
      var link = this.links[0];
      if (!link) { return; }
      if (document.activeElement !== link) { this._focus(); }
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(BreadcrumbSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Breadcrumb.prototype, prototypeAccessors );
    Object.defineProperties( Breadcrumb, staticAccessors );

    return Breadcrumb;
  }(api.core.Instance));

  api.breadcrumb = {
    BreadcrumbSelector: BreadcrumbSelector,
    Breadcrumb: Breadcrumb
  };

  api.internals.register(api.breadcrumb.BreadcrumbSelector.BREADCRUMB, api.breadcrumb.Breadcrumb);

  var TooltipSelector = {
    TOOLTIP: api.internals.ns.selector('tooltip'),
    SHOWN: api.internals.ns.selector('tooltip--shown'),
    BUTTON: api.internals.ns.selector('btn--tooltip')
  };

  var TooltipReferentState = {
    FOCUS: 1 << 0,
    HOVER: 1 << 1
  };

  var TooltipReferent = /*@__PURE__*/(function (superclass) {
    function TooltipReferent () {
      superclass.call(this);
      this._state = 0;
    }

    if ( superclass ) TooltipReferent.__proto__ = superclass;
    TooltipReferent.prototype = Object.create( superclass && superclass.prototype );
    TooltipReferent.prototype.constructor = TooltipReferent;

    var prototypeAccessors = { state: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TooltipReferent';
    };

    TooltipReferent.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.listen('focusin', this.focusIn.bind(this));
      this.listen('focusout', this.focusOut.bind(this));
      if (!this.matches(TooltipSelector.BUTTON)) {
        var mouseover = this.mouseover.bind(this);
        this.listen('mouseover', mouseover);
        this.placement.listen('mouseover', mouseover);
        var mouseout = this.mouseout.bind(this);
        this.listen('mouseout', mouseout);
        this.placement.listen('mouseout', mouseout);
      }
      this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
      this.listen('click', this._click.bind(this));
      this.addEmission(api.core.RootEmission.CLICK, this._clickOut.bind(this));
    };

    TooltipReferent.prototype._click = function _click () {
      this.focus();
    };

    TooltipReferent.prototype._clickOut = function _clickOut (target) {
      if (!this.node.contains(target)) { this.blur(); }
    };

    TooltipReferent.prototype._keydown = function _keydown (keyCode) {
      switch (keyCode) {
        case api.core.KeyCodes.ESCAPE:
          this.blur();
          this.close();
          break;
      }
    };

    TooltipReferent.prototype.close = function close () {
      this.state = 0;
    };

    prototypeAccessors.state.get = function () {
      return this._state;
    };

    prototypeAccessors.state.set = function (value) {
      if (this._state === value) { return; }
      this.isShown = value > 0;
      this._state = value;
    };

    TooltipReferent.prototype.focusIn = function focusIn () {
      this.state |= TooltipReferentState.FOCUS;
    };

    TooltipReferent.prototype.focusOut = function focusOut () {
      this.state &= ~TooltipReferentState.FOCUS;
    };

    TooltipReferent.prototype.mouseover = function mouseover () {
      this.state |= TooltipReferentState.HOVER;
    };

    TooltipReferent.prototype.mouseout = function mouseout () {
      this.state &= ~TooltipReferentState.HOVER;
    };

    Object.defineProperties( TooltipReferent.prototype, prototypeAccessors );
    Object.defineProperties( TooltipReferent, staticAccessors );

    return TooltipReferent;
  }(api.core.PlacementReferent));

  var TooltipEvent = {
    SHOW: ns.event('show'),
    HIDE: ns.event('hide')
  };

  var TooltipState = {
    HIDDEN: 'hidden',
    SHOWN: 'shown',
    HIDING: 'hiding'
  };

  var Tooltip = /*@__PURE__*/(function (superclass) {
    function Tooltip () {
      superclass.call(this, api.core.PlacementMode.AUTO, [api.core.PlacementPosition.TOP, api.core.PlacementPosition.BOTTOM], [api.core.PlacementAlign.CENTER, api.core.PlacementAlign.START, api.core.PlacementAlign.END]);
      this.modifier = '';
      this._state = TooltipState.HIDDEN;
    }

    if ( superclass ) Tooltip.__proto__ = superclass;
    Tooltip.prototype = Object.create( superclass && superclass.prototype );
    Tooltip.prototype.constructor = Tooltip;

    var prototypeAccessors = { isShown: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Tooltip';
    };

    Tooltip.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.register(("[aria-describedby=\"" + (this.id) + "\"]"), TooltipReferent);
      this.listen('transitionend', this.transitionEnd.bind(this));
    };

    Tooltip.prototype.transitionEnd = function transitionEnd () {
      if (this._state === TooltipState.HIDING) {
        this._state = TooltipState.HIDDEN;
        this.isShown = false;
      }
    };

    prototypeAccessors.isShown.get = function () {
      return superclass.prototype.isShown;
    };

    prototypeAccessors.isShown.set = function (value) {
      if (!this.isEnabled) { return; }
      switch (true) {
        case value:
          this._state = TooltipState.SHOWN;
          this.addClass(TooltipSelector.SHOWN);
          this.dispatch(TooltipEvent.SHOW);
          superclass.prototype.isShown = true;
          break;

        case this.isShown && !value && this._state === TooltipState.SHOWN:
          this._state = TooltipState.HIDING;
          this.removeClass(TooltipSelector.SHOWN);
          break;

        case this.isShown && !value && this._state === TooltipState.HIDDEN:
          this.dispatch(TooltipEvent.HIDE);
          superclass.prototype.isShown = false;
          break;
      }
    };

    Tooltip.prototype.render = function render () {
      superclass.prototype.render.call(this);
      var x = this.referentRect.center - this.rect.center;
      var limit = this.rect.width * 0.5 - 8;
      if (x < -limit) { x = -limit; }
      if (x > limit) { x = limit; }
      this.setProperty('--arrow-x', ((x.toFixed(2)) + "px"));
    };

    Object.defineProperties( Tooltip.prototype, prototypeAccessors );
    Object.defineProperties( Tooltip, staticAccessors );

    return Tooltip;
  }(api.core.Placement));

  api.tooltip = {
    Tooltip: Tooltip,
    TooltipSelector: TooltipSelector,
    TooltipEvent: TooltipEvent
  };

  api.internals.register(api.tooltip.TooltipSelector.TOOLTIP, api.tooltip.Tooltip);

  var ToggleInput = /*@__PURE__*/(function (superclass) {
    function ToggleInput () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ToggleInput.__proto__ = superclass;
    ToggleInput.prototype = Object.create( superclass && superclass.prototype );
    ToggleInput.prototype.constructor = ToggleInput;

    var prototypeAccessors = { isChecked: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ToggleInput';
    };

    prototypeAccessors.isChecked.get = function () {
      return this.node.checked;
    };

    Object.defineProperties( ToggleInput.prototype, prototypeAccessors );
    Object.defineProperties( ToggleInput, staticAccessors );

    return ToggleInput;
  }(api.core.Instance));

  var ToggleStatusLabel = /*@__PURE__*/(function (superclass) {
    function ToggleStatusLabel () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ToggleStatusLabel.__proto__ = superclass;
    ToggleStatusLabel.prototype = Object.create( superclass && superclass.prototype );
    ToggleStatusLabel.prototype.constructor = ToggleStatusLabel;

    var prototypeAccessors = { proxy: { configurable: true },input: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ToggleStatusLabel';
    };

    ToggleStatusLabel.prototype.init = function init () {
      this.register(("input[id=\"" + (this.getAttribute('for')) + "\"]"), ToggleInput);
      this.update();
      this.isSwappingFont = true;
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, superclass.prototype.proxy, {
        update: scope.update.bind(scope)
      });
    };

    prototypeAccessors.input.get = function () {
      return this.getRegisteredInstances('ToggleInput')[0];
    };

    ToggleStatusLabel.prototype.update = function update () {
      this.node.style.removeProperty('--toggle-status-width');
      var checked = this.input.isChecked;

      var style = getComputedStyle(this.node, ':before');
      var maxWidth = parseFloat(style.width);
      this.input.node.checked = !checked;

      var style2 = getComputedStyle(this.node, ':before');
      var width = parseFloat(style2.width);
      if (width > maxWidth) { maxWidth = width; }
      this.input.node.checked = checked;

      this.node.style.setProperty('--toggle-status-width', (maxWidth / 16) + 'rem');
    };

    ToggleStatusLabel.prototype.swapFont = function swapFont (families) {
      this.update();
    };

    Object.defineProperties( ToggleStatusLabel.prototype, prototypeAccessors );
    Object.defineProperties( ToggleStatusLabel, staticAccessors );

    return ToggleStatusLabel;
  }(api.core.Instance));

  var ToggleSelector = {
    STATUS_LABEL: ("" + (api.internals.ns.selector('toggle__label')) + (api.internals.ns.attr.selector('checked-label')) + (api.internals.ns.attr.selector('unchecked-label')))
  };

  // import { ToggleInput } from './script/toggle/toggle-input.js';

  api.toggle = {
    ToggleStatusLabel: ToggleStatusLabel,
    ToggleSelector: ToggleSelector
  };

  api.internals.register(api.toggle.ToggleSelector.STATUS_LABEL, api.toggle.ToggleStatusLabel);

  var ITEM$1 = api.internals.ns.selector('sidemenu__item');
  var COLLAPSE$1 = api.internals.ns.selector('collapse');

  var SidemenuSelector = {
    LIST: api.internals.ns.selector('sidemenu__list'),
    COLLAPSE: (ITEM$1 + " > " + COLLAPSE$1 + ", " + ITEM$1 + " > *:not(" + ITEM$1 + ", " + COLLAPSE$1 + ") > " + COLLAPSE$1 + ", " + ITEM$1 + " > *:not(" + ITEM$1 + ", " + COLLAPSE$1 + ") > *:not(" + ITEM$1 + ", " + COLLAPSE$1 + ") > " + COLLAPSE$1),
    COLLAPSE_LEGACY: (ITEM$1 + " " + COLLAPSE$1),
    ITEM: api.internals.ns.selector('sidemenu__item'),
    BUTTON: api.internals.ns.selector('sidemenu__btn')
  };

  var SidemenuList = /*@__PURE__*/(function (superclass) {
    function SidemenuList () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) SidemenuList.__proto__ = superclass;
    SidemenuList.prototype = Object.create( superclass && superclass.prototype );
    SidemenuList.prototype.constructor = SidemenuList;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuList';
    };

    SidemenuList.prototype.validate = function validate (member) {
      return superclass.prototype.validate.call(this, member) && member.node.matches(api.internals.legacy.isLegacy ? SidemenuSelector.COLLAPSE_LEGACY : SidemenuSelector.COLLAPSE);
    };

    Object.defineProperties( SidemenuList, staticAccessors );

    return SidemenuList;
  }(api.core.CollapsesGroup));

  var SidemenuItem = /*@__PURE__*/(function (superclass) {
    function SidemenuItem () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) SidemenuItem.__proto__ = superclass;
    SidemenuItem.prototype = Object.create( superclass && superclass.prototype );
    SidemenuItem.prototype.constructor = SidemenuItem;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'SidemenuItem';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(SidemenuSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( SidemenuItem.prototype, prototypeAccessors );
    Object.defineProperties( SidemenuItem, staticAccessors );

    return SidemenuItem;
  }(api.core.Instance));

  api.sidemenu = {
    SidemenuList: SidemenuList,
    SidemenuItem: SidemenuItem,
    SidemenuSelector: SidemenuSelector
  };

  api.internals.register(api.sidemenu.SidemenuSelector.LIST, api.sidemenu.SidemenuList);
  api.internals.register(api.sidemenu.SidemenuSelector.ITEM, api.sidemenu.SidemenuItem);

  var ModalSelector = {
    MODAL: api.internals.ns.selector('modal'),
    SCROLL_DIVIDER: api.internals.ns.selector('scroll-divider'),
    BODY: api.internals.ns.selector('modal__body'),
    TITLE: api.internals.ns.selector('modal__title')
  };

  var ModalButton = /*@__PURE__*/(function (superclass) {
    function ModalButton () {
      superclass.call(this, api.core.DisclosureType.OPENED);
    }

    if ( superclass ) ModalButton.__proto__ = superclass;
    ModalButton.prototype = Object.create( superclass && superclass.prototype );
    ModalButton.prototype.constructor = ModalButton;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalButton';
    };

    Object.defineProperties( ModalButton, staticAccessors );

    return ModalButton;
  }(api.core.DisclosureButton));

  var ModalAttribute = {
    CONCEALING_BACKDROP: api.internals.ns.attr('concealing-backdrop')
  };

  var Modal = /*@__PURE__*/(function (superclass) {
    function Modal () {
      superclass.call(this, api.core.DisclosureType.OPENED, ModalSelector.MODAL, ModalButton, 'ModalsGroup');
      this._isActive = false;
      this.scrolling = this.resize.bind(this, false);
      this.resizing = this.resize.bind(this, true);
    }

    if ( superclass ) Modal.__proto__ = superclass;
    Modal.prototype = Object.create( superclass && superclass.prototype );
    Modal.prototype.constructor = Modal;

    var prototypeAccessors = { body: { configurable: true },isDialog: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Modal';
    };

    Modal.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this._isDialog = this.node.tagName === 'DIALOG';
      this.isScrolling = false;
      this.listenClick();
      this.addEmission(api.core.RootEmission.KEYDOWN, this._keydown.bind(this));
    };

    Modal.prototype._keydown = function _keydown (keyCode) {
      switch (keyCode) {
        case api.core.KeyCodes.ESCAPE:
          this._escape();
          break;
      }
    };

    // TODO v2 : passer les tagName d'action en constante
    Modal.prototype._escape = function _escape () {
      var tagName = document.activeElement ? document.activeElement.tagName : undefined;

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
    };

    Modal.prototype.retrieved = function retrieved () {
      this._ensureAccessibleName();
    };

    prototypeAccessors.body.get = function () {
      return this.element.getDescendantInstances('ModalBody', 'Modal')[0];
    };

    Modal.prototype.handleClick = function handleClick (e) {
      if (e.target === this.node && this.getAttribute(ModalAttribute.CONCEALING_BACKDROP) !== 'false') { this.conceal(); }
    };

    Modal.prototype.disclose = function disclose (withhold) {
      if (!superclass.prototype.disclose.call(this, withhold)) { return false; }
      if (this.body) { this.body.activate(); }
      this.isScrollLocked = true;
      this.setAttribute('aria-modal', 'true');
      this.setAttribute('open', 'true');
      if (!this._isDialog) {
        this.activateModal();
      }
      return true;
    };

    Modal.prototype.conceal = function conceal (withhold, preventFocus) {
      if (!superclass.prototype.conceal.call(this, withhold, preventFocus)) { return false; }
      this.isScrollLocked = false;
      this.removeAttribute('aria-modal');
      this.removeAttribute('open');
      if (this.body) { this.body.deactivate(); }
      if (!this._isDialog) {
        this.deactivateModal();
      }
      return true;
    };

    prototypeAccessors.isDialog.get = function () {
      return this._isDialog;
    };

    prototypeAccessors.isDialog.set = function (value) {
      this._isDialog = value;
    };

    Modal.prototype.activateModal = function activateModal () {
      if (this._isActive) { return; }
      this._isActive = true;
      this._hasDialogRole = this.getAttribute('role') === 'dialog';
      if (!this._hasDialogRole) { this.setAttribute('role', 'dialog'); }
    };

    Modal.prototype.deactivateModal = function deactivateModal () {
      if (!this._isActive) { return; }
      this._isActive = false;
      if (!this._hasDialogRole) { this.removeAttribute('role'); }
    };

    Modal.prototype._setAccessibleName = function _setAccessibleName (node, append) {
      var id = this.retrieveNodeId(node, append);
      this.warn(("add reference to " + append + " for accessible name (aria-labelledby)"));
      this.setAttribute('aria-labelledby', id);
    };

    Modal.prototype._ensureAccessibleName = function _ensureAccessibleName () {
      if (this.hasAttribute('aria-labelledby') || this.hasAttribute('aria-label')) { return; }
      this.warn('missing accessible name');
      var title = this.node.querySelector(ModalSelector.TITLE);
      var primary = this.primaryButtons[0];

      switch (true) {
        case title !== null:
          this._setAccessibleName(title, 'title');
          break;

        case primary !== undefined:
          this.warn('missing required title, fallback to primary button');
          this._setAccessibleName(primary, 'primary');
          break;
      }
    };

    Object.defineProperties( Modal.prototype, prototypeAccessors );
    Object.defineProperties( Modal, staticAccessors );

    return Modal;
  }(api.core.Disclosure));

  var unordereds = [
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

  var UNORDEREDS = unordereds.join();

  var ordereds = [
    '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
  ];

  var ORDEREDS = ordereds.join();

  var isFocusable = function (element, container) {
    if (!(element instanceof Element)) { return false; }
    var style = window.getComputedStyle(element);
    if (!style) { return false; }
    if (style.visibility === 'hidden') { return false; }
    if (container === undefined) { container = element; }

    while (container.contains(element)) {
      if (style.display === 'none') { return false; }
      element = element.parentElement;
    }

    return true;
  };

  var FocusTrap = function FocusTrap (onTrap, onUntrap) {
    this.element = null;
    this.activeElement = null;
    this.onTrap = onTrap;
    this.onUntrap = onUntrap;
    this.waiting = this.wait.bind(this);
    this.handling = this.handle.bind(this);
    this.focusing = this.maintainFocus.bind(this);
    this.current = null;
  };

  var prototypeAccessors = { trapped: { configurable: true },focusables: { configurable: true } };

  prototypeAccessors.trapped.get = function () { return this.element !== null; };

  FocusTrap.prototype.trap = function trap (element) {
    if (this.trapped) { this.untrap(); }

    this.element = element;
    this.isTrapping = true;
    this.wait();

    if (this.onTrap) { this.onTrap(); }
  };

  FocusTrap.prototype.wait = function wait () {
    if (!isFocusable(this.element)) {
      window.requestAnimationFrame(this.waiting);
      return;
    }

    this.trapping();
  };

  FocusTrap.prototype.trapping = function trapping () {
    if (!this.isTrapping) { return; }
    this.isTrapping = false;
    var focusables = this.focusables;
    if (focusables.length && focusables.indexOf(document.activeElement) === -1) { focusables[0].focus(); }
    this.element.setAttribute('aria-modal', true);
    window.addEventListener('keydown', this.handling);
    document.body.addEventListener('focus', this.focusing, true);
  };

  FocusTrap.prototype.stun = function stun (node) {
    for (var i = 0, list = node.children; i < list.length; i += 1) {
      var child = list[i];

        if (child === this.element) { continue; }
      if (child.contains(this.element)) {
        this.stun(child);
        continue;
      }
      this.stunneds.push(new Stunned(child));
    }
  };

  FocusTrap.prototype.maintainFocus = function maintainFocus (event) {
    if (!this.element.contains(event.target)) {
      var focusables = this.focusables;
      if (focusables.length === 0) { return; }
      var first = focusables[0];
      event.preventDefault();
      first.focus();
    }
  };

  FocusTrap.prototype.handle = function handle (e) {
    if (e.keyCode !== 9) { return; }

    var focusables = this.focusables;
    if (focusables.length === 0) { return; }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    var index = focusables.indexOf(document.activeElement);

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
  };

  prototypeAccessors.focusables.get = function () {
      var this$1$1 = this;

    var unordereds = api.internals.dom.querySelectorAllArray(this.element, UNORDEREDS);

    /**
     *filtrage des radiobutttons de même name (la navigations d'un groupe de radio se fait à la flèche et non pas au tab
     **/
    var radios = api.internals.dom.querySelectorAllArray(document.documentElement, 'input[type="radio"]');

    if (radios.length) {
      var groups = {};

      for (var i = 0, list = radios; i < list.length; i += 1) {
        var radio = list[i];

          var name = radio.getAttribute('name');
        if (groups[name] === undefined) { groups[name] = new RadioButtonGroup(name); }
        groups[name].push(radio);
      }

      unordereds = unordereds.filter(function (unordered) {
        if (unordered.tagName.toLowerCase() !== 'input' || unordered.getAttribute('type').toLowerCase() !== 'radio') { return true; }
        var name = unordered.getAttribute('name');
        return groups[name].keep(unordered);
      });
    }

    var ordereds = api.internals.dom.querySelectorAllArray(this.element, ORDEREDS);

    ordereds.sort(function (a, b) { return a.tabIndex - b.tabIndex; });

    var noDuplicates = unordereds.filter(function (element) { return ordereds.indexOf(element) === -1; });
    var concateneds = ordereds.concat(noDuplicates);
    return concateneds.filter(function (element) { return element.tabIndex !== '-1' && isFocusable(element, this$1$1.element); });
  };

  FocusTrap.prototype.untrap = function untrap () {
    if (!this.trapped) { return; }
    this.isTrapping = false;

    this.element.removeAttribute('aria-modal');
    window.removeEventListener('keydown', this.handling);
    document.body.removeEventListener('focus', this.focusing, true);

    this.element = null;

    if (this.onUntrap) { this.onUntrap(); }
  };

  FocusTrap.prototype.dispose = function dispose () {
    this.untrap();
  };

  Object.defineProperties( FocusTrap.prototype, prototypeAccessors );

  var Stunned = function Stunned (element) {
    this.element = element;
    // this.hidden = element.getAttribute('aria-hidden');
    this.inert = element.getAttribute('inert');

    // this.element.setAttribute('aria-hidden', true);
    this.element.setAttribute('inert', '');
  };

  Stunned.prototype.unstun = function unstun () {
    /*
    if (this.hidden === null) this.element.removeAttribute('aria-hidden');
    else this.element.setAttribute('aria-hidden', this.hidden);
     */

    if (this.inert === null) { this.element.removeAttribute('inert'); }
    else { this.element.setAttribute('inert', this.inert); }
  };

  var RadioButtonGroup = function RadioButtonGroup (name) {
    this.name = name;
    this.buttons = [];
  };

  RadioButtonGroup.prototype.push = function push (button) {
    this.buttons.push(button);
    if (button === document.activeElement || button.checked || this.selected === undefined) { this.selected = button; }
  };

  RadioButtonGroup.prototype.keep = function keep (button) {
    return this.selected === button;
  };

  var ModalsGroup = /*@__PURE__*/(function (superclass) {
    function ModalsGroup () {
      superclass.call(this, 'Modal', false);
      this.focusTrap = new FocusTrap();
    }

    if ( superclass ) ModalsGroup.__proto__ = superclass;
    ModalsGroup.prototype = Object.create( superclass && superclass.prototype );
    ModalsGroup.prototype.constructor = ModalsGroup;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalsGroup';
    };

    ModalsGroup.prototype.apply = function apply (value, initial) {
      superclass.prototype.apply.call(this, value, initial);
      if (this.current === null) { this.focusTrap.untrap(); }
      else { this.focusTrap.trap(this.current.node); }
    };

    Object.defineProperties( ModalsGroup, staticAccessors );

    return ModalsGroup;
  }(api.core.DisclosuresGroup));

  var OFFSET = 32; // 32px => 8v => 2rem

  var ModalBody = /*@__PURE__*/(function (superclass) {
    function ModalBody () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ModalBody.__proto__ = superclass;
    ModalBody.prototype = Object.create( superclass && superclass.prototype );
    ModalBody.prototype.constructor = ModalBody;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'ModalBody';
    };

    ModalBody.prototype.init = function init () {
      this.listen('scroll', this.divide.bind(this));
    };

    ModalBody.prototype.activate = function activate () {
      this.isResizing = true;
      this.resize();
    };

    ModalBody.prototype.deactivate = function deactivate () {
      this.isResizing = false;
    };

    ModalBody.prototype.divide = function divide () {
      if (this.node.scrollHeight > this.node.clientHeight) {
        if (this.node.offsetHeight + this.node.scrollTop >= this.node.scrollHeight) {
          this.removeClass(ModalSelector.SCROLL_DIVIDER);
        } else {
          this.addClass(ModalSelector.SCROLL_DIVIDER);
        }
      } else {
        this.removeClass(ModalSelector.SCROLL_DIVIDER);
      }
    };

    ModalBody.prototype.resize = function resize () {
      this.adjust();
      this.request(this.adjust.bind(this));
    };

    ModalBody.prototype.adjust = function adjust () {
      var offset = OFFSET * (this.isBreakpoint(api.core.Breakpoints.MD) ? 2 : 1);
      if (this.isLegacy) { this.style.maxHeight = (window.innerHeight - offset) + "px"; }
      else { this.style.setProperty('--modal-max-height', ((window.innerHeight - offset) + "px")); }
      this.divide();
    };

    Object.defineProperties( ModalBody, staticAccessors );

    return ModalBody;
  }(api.core.Instance));

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

  var PasswordEmission = {
    TOGGLE: api.internals.ns.emission('password', 'toggle'),
    ADJUST: api.internals.ns.emission('password', 'adjust')
  };

  var PasswordToggle = /*@__PURE__*/(function (superclass) {
    function PasswordToggle () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) PasswordToggle.__proto__ = superclass;
    PasswordToggle.prototype = Object.create( superclass && superclass.prototype );
    PasswordToggle.prototype.constructor = PasswordToggle;

    var prototypeAccessors = { width: { configurable: true },isChecked: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PasswordToggle';
    };

    PasswordToggle.prototype.init = function init () {
      this.listenClick();
      this.ascend(PasswordEmission.ADJUST, this.width);
      this.isSwappingFont = true;
      this._isChecked = this.isChecked;
    };

    prototypeAccessors.width.get = function () {
      var style = getComputedStyle(this.node.parentNode);
      return parseInt(style.width);
    };

    prototypeAccessors.isChecked.get = function () {
      return this.node.checked;
    };

    prototypeAccessors.isChecked.set = function (value) {
      this._isChecked = value;
      this.ascend(PasswordEmission.TOGGLE, value);
    };

    PasswordToggle.prototype.handleClick = function handleClick () {
      this.isChecked = !this._isChecked;
    };

    PasswordToggle.prototype.swapFont = function swapFont (families) {
      this.ascend(PasswordEmission.ADJUST, this.width);
    };

    Object.defineProperties( PasswordToggle.prototype, prototypeAccessors );
    Object.defineProperties( PasswordToggle, staticAccessors );

    return PasswordToggle;
  }(api.core.Instance));

  var Password = /*@__PURE__*/(function (superclass) {
    function Password () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Password.__proto__ = superclass;
    Password.prototype = Object.create( superclass && superclass.prototype );
    Password.prototype.constructor = Password;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Password';
    };

    Password.prototype.init = function init () {
      this.addAscent(PasswordEmission.TOGGLE, this.toggle.bind(this));
      this.addAscent(PasswordEmission.ADJUST, this.adjust.bind(this));
    };

    Password.prototype.toggle = function toggle (value) {
      this.descend(PasswordEmission.TOGGLE, value);
    };

    Password.prototype.adjust = function adjust (value) {
      this.descend(PasswordEmission.ADJUST, value);
    };

    Object.defineProperties( Password, staticAccessors );

    return Password;
  }(api.core.Instance));

  var PasswordSelector = {
    PASSWORD: api.internals.ns.selector('password'),
    INPUT: api.internals.ns.selector('password__input'),
    LABEL: api.internals.ns.selector('password__label'),
    TOOGLE: ((api.internals.ns.selector('password__checkbox')) + " input[type=\"checkbox\"]")
  };

  var PasswordInput = /*@__PURE__*/(function (superclass) {
    function PasswordInput () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) PasswordInput.__proto__ = superclass;
    PasswordInput.prototype = Object.create( superclass && superclass.prototype );
    PasswordInput.prototype.constructor = PasswordInput;

    var prototypeAccessors = { isRevealed: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PasswordInput';
    };

    PasswordInput.prototype.init = function init () {
      this.addDescent(PasswordEmission.TOGGLE, this.toggle.bind(this));
      this._isRevealed = this.hasAttribute('type') === 'password';
      this.listen('keydown', this.capslock.bind(this)); // for capslock enabled
      this.listen('keyup', this.capslock.bind(this)); // for capslock desabled
    };

    PasswordInput.prototype.toggle = function toggle (value) {
      this.isRevealed = value;
      this.setAttribute('type', value ? 'text' : 'password');
    };

    prototypeAccessors.isRevealed.get = function () {
      return this._isRevealed;
    };

    PasswordInput.prototype.capslock = function capslock (event) {
      if (event && typeof event.getModifierState !== 'function') { return; }
      if (event.getModifierState('CapsLock')) {
        this.node.parentNode.setAttribute(api.internals.ns.attr('capslock'), '');
      } else {
        this.node.parentNode.removeAttribute(api.internals.ns.attr('capslock'));
      }
    };

    prototypeAccessors.isRevealed.set = function (value) {
      this._isRevealed = value;
      this.setAttribute('type', value ? 'text' : 'password');
    };

    Object.defineProperties( PasswordInput.prototype, prototypeAccessors );
    Object.defineProperties( PasswordInput, staticAccessors );

    return PasswordInput;
  }(api.core.Instance));

  var PasswordLabel = /*@__PURE__*/(function (superclass) {
    function PasswordLabel () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) PasswordLabel.__proto__ = superclass;
    PasswordLabel.prototype = Object.create( superclass && superclass.prototype );
    PasswordLabel.prototype.constructor = PasswordLabel;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'PasswordLabel';
    };

    PasswordLabel.prototype.init = function init () {
      this.addDescent(PasswordEmission.ADJUST, this.adjust.bind(this));
    };

    PasswordLabel.prototype.adjust = function adjust (value) {
      var valueREM = Math.ceil(value / 16);
      this.node.style.paddingRight = valueREM + 'rem';
    };

    Object.defineProperties( PasswordLabel, staticAccessors );

    return PasswordLabel;
  }(api.core.Instance));

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

  var ITEM = api.internals.ns.selector('nav__item');
  var COLLAPSE = api.internals.ns.selector('collapse');

  var NavigationSelector = {
    NAVIGATION: api.internals.ns.selector('nav'),
    COLLAPSE: (ITEM + " > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + ", " + COLLAPSE + ") > " + COLLAPSE + ", " + ITEM + " > *:not(" + ITEM + ", " + COLLAPSE + ") > *:not(" + ITEM + ", " + COLLAPSE + ") > " + COLLAPSE),
    COLLAPSE_LEGACY: (ITEM + " " + COLLAPSE),
    ITEM: ITEM,
    ITEM_RIGHT: (ITEM + "--align-right"),
    MENU: api.internals.ns.selector('menu'),
    BUTTON: api.internals.ns.selector('nav__btn'),
    TRANSLATE_BUTTON: api.internals.ns.selector('translate__btn')
  };

  var NavigationItem = /*@__PURE__*/(function (superclass) {
    function NavigationItem () {
      superclass.call(this);
      this._isRightAligned = false;
    }

    if ( superclass ) NavigationItem.__proto__ = superclass;
    NavigationItem.prototype = Object.create( superclass && superclass.prototype );
    NavigationItem.prototype.constructor = NavigationItem;

    var prototypeAccessors = { isRightAligned: { configurable: true },collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'NavigationItem';
    };

    NavigationItem.prototype.init = function init () {
      this.addAscent(api.core.DisclosureEmission.ADDED, this.calculate.bind(this));
      this.addAscent(api.core.DisclosureEmission.REMOVED, this.calculate.bind(this));
      this.isResizing = true;
      this.calculate();
    };

    NavigationItem.prototype.resize = function resize () {
      this.calculate();
    };

    NavigationItem.prototype.calculate = function calculate () {
      var collapse = this.element.getDescendantInstances(api.core.Collapse.instanceClassName, null, true)[0];
      if (collapse && this.isBreakpoint(api.core.Breakpoints.LG) && collapse.element.node.matches(NavigationSelector.MENU)) {
        var right = this.element.node.parentElement.getBoundingClientRect().right; // todo: ne fonctionne que si la nav fait 100% du container
        var width = collapse.element.node.getBoundingClientRect().width;
        var left = this.element.node.getBoundingClientRect().left;
        this.isRightAligned = left + width > right;
      } else { this.isRightAligned = false; }
    };

    prototypeAccessors.isRightAligned.get = function () {
      return this._isRightAligned;
    };

    prototypeAccessors.isRightAligned.set = function (value) {
      if (this._isRightAligned === value) { return; }
      this._isRightAligned = value;
      if (value) { api.internals.dom.addClass(this.element.node, NavigationSelector.ITEM_RIGHT); }
      else { api.internals.dom.removeClass(this.element.node, NavigationSelector.ITEM_RIGHT); }
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && (button.hasClass(NavigationSelector.BUTTON) || button.hasClass(NavigationSelector.TRANSLATE_BUTTON)); });
      return buttons[0];
    };

    Object.defineProperties( NavigationItem.prototype, prototypeAccessors );
    Object.defineProperties( NavigationItem, staticAccessors );

    return NavigationItem;
  }(api.core.Instance));

  var NavigationMousePosition = {
    NONE: -1,
    INSIDE: 0,
    OUTSIDE: 1
  };

  var Navigation = /*@__PURE__*/(function (superclass) {
    function Navigation () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Navigation.__proto__ = superclass;
    Navigation.prototype = Object.create( superclass && superclass.prototype );
    Navigation.prototype.constructor = Navigation;

    var prototypeAccessors = { index: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Navigation';
    };

    Navigation.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.clicked = false;
      this.out = false;
      this.listen('focusout', this.focusOutHandler.bind(this));
      this.listen('mousedown', this.mouseDownHandler.bind(this));
      this.listenClick({ capture: true });
    };

    Navigation.prototype.validate = function validate (member) {
      return superclass.prototype.validate.call(this, member) && member.element.node.matches(api.internals.legacy.isLegacy ? NavigationSelector.COLLAPSE_LEGACY : NavigationSelector.COLLAPSE);
    };

    Navigation.prototype.mouseDownHandler = function mouseDownHandler (e) {
      if (!this.isBreakpoint(api.core.Breakpoints.LG) || this.index === -1 || !this.current) { return; }
      this.position = this.current.node.contains(e.target) ? NavigationMousePosition.INSIDE : NavigationMousePosition.OUTSIDE;
      this.requestPosition();
    };

    Navigation.prototype.clickHandler = function clickHandler (e) {
      if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) { this.index = -1; }
    };

    Navigation.prototype.focusOutHandler = function focusOutHandler (e) {
      if (!this.isBreakpoint(api.core.Breakpoints.LG)) { return; }
      this.out = true;
      this.requestPosition();
    };

    Navigation.prototype.requestPosition = function requestPosition () {
      if (this.isRequesting) { return; }
      this.isRequesting = true;
      this.request(this.getPosition.bind(this));
    };

    Navigation.prototype.getPosition = function getPosition () {
      if (this.out) {
        switch (this.position) {
          case NavigationMousePosition.OUTSIDE:
            this.index = -1;
            break;

          case NavigationMousePosition.INSIDE:
            if (this.current && !this.current.node.contains(document.activeElement)) { this.current.focus(); }
            break;

          default:
            if (this.index > -1 && !this.current.hasFocus) { this.index = -1; }
        }
      }

      this.request(this.requested.bind(this));
    };

    Navigation.prototype.requested = function requested () {
      this.position = NavigationMousePosition.NONE;
      this.out = false;
      this.isRequesting = false;
    };

    prototypeAccessors.index.get = function () { return superclass.prototype.index; };

    prototypeAccessors.index.set = function (value) {
      if (value === -1 && this.current && this.current.hasFocus) { this.current.focus(); }
      superclass.prototype.index = value;
    };

    Object.defineProperties( Navigation.prototype, prototypeAccessors );
    Object.defineProperties( Navigation, staticAccessors );

    return Navigation;
  }(api.core.CollapsesGroup));

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
  var TabButton = /*@__PURE__*/(function (superclass) {
    function TabButton () {
      superclass.call(this, api.core.DisclosureType.SELECT);
    }

    if ( superclass ) TabButton.__proto__ = superclass;
    TabButton.prototype = Object.create( superclass && superclass.prototype );
    TabButton.prototype.constructor = TabButton;

    var prototypeAccessors = { list: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabButton';
    };

    TabButton.prototype.handleClick = function handleClick (e) {
      superclass.prototype.handleClick.call(this, e);
      this.focus();
    };

    TabButton.prototype.apply = function apply (value) {
      superclass.prototype.apply.call(this, value);
      if (this.isPrimary) {
        this.setAttribute('tabindex', value ? '0' : '-1');
        if (value) {
          if (this.list) { this.list.focalize(this); }
        }
      }
    };

    prototypeAccessors.list.get = function () {
      return this.element.getAscendantInstance('TabsList', 'TabsGroup');
    };

    Object.defineProperties( TabButton.prototype, prototypeAccessors );
    Object.defineProperties( TabButton, staticAccessors );

    return TabButton;
  }(api.core.DisclosureButton));

  var TabSelector = {
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

  var TabPanelDirection = {
    START: 'direction-start',
    END: 'direction-end',
    NONE: 'none'
  };

  /**
    * Tab coorespond au panel d'un élement Tabs (tab panel)
    * Tab étend disclosure qui ajoute/enleve le modifier --selected,
    * et ajoute/eleve l'attribut hidden, sur le panel
    */
  var TabPanel = /*@__PURE__*/(function (superclass) {
    function TabPanel () {
      superclass.call(this, api.core.DisclosureType.SELECT, TabSelector.PANEL, TabButton, 'TabsGroup');
      this._direction = TabPanelDirection.NONE;
      this._isPreventingTransition = false;
    }

    if ( superclass ) TabPanel.__proto__ = superclass;
    TabPanel.prototype = Object.create( superclass && superclass.prototype );
    TabPanel.prototype.constructor = TabPanel;

    var prototypeAccessors = { direction: { configurable: true },isPreventingTransition: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabPanel';
    };

    prototypeAccessors.direction.get = function () {
      return this._direction;
    };

    prototypeAccessors.direction.set = function (value) {
      if (value === this._direction) { return; }
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
    };

    prototypeAccessors.isPreventingTransition.get = function () {
      return this._isPreventingTransition;
    };

    prototypeAccessors.isPreventingTransition.set = function (value) {
      if (this._isPreventingTransition === value) { return; }
      if (value) { this.addClass(api.internals.motion.TransitionSelector.NONE); }
      else { this.removeClass(api.internals.motion.TransitionSelector.NONE); }
      this._isPreventingTransition = value === true;
    };

    TabPanel.prototype.translate = function translate (direction, initial) {
      this.isPreventingTransition = initial;
      this.direction = direction;
    };

    TabPanel.prototype.reset = function reset () {
      if (this.group) { this.group.retrieve(true); }
    };

    TabPanel.prototype._electPrimaries = function _electPrimaries (candidates) {
      var this$1$1 = this;

      if (!this.group || !this.group.list) { return []; }
      return superclass.prototype._electPrimaries.call(this, candidates).filter(function (candidate) { return this$1$1.group.list.node.contains(candidate.node); });
    };

    Object.defineProperties( TabPanel.prototype, prototypeAccessors );
    Object.defineProperties( TabPanel, staticAccessors );

    return TabPanel;
  }(api.core.Disclosure));

  var TabKeys = {
    LEFT: 'tab_keys_left',
    RIGHT: 'tab_keys_right',
    HOME: 'tab_keys_home',
    END: 'tab_keys_end'
  };

  var TabEmission = {
    PRESS_KEY: api.internals.ns.emission('tab', 'press_key'),
    LIST_HEIGHT: api.internals.ns.emission('tab', 'list_height')
  };

  /**
  * TabGroup est la classe étendue de DiscosuresGroup
  * Correspond à un objet Tabs avec plusieurs tab-button & Tab (panel)
  */
  var TabsGroup = /*@__PURE__*/(function (superclass) {
    function TabsGroup () {
      superclass.call(this, 'TabPanel');
    }

    if ( superclass ) TabsGroup.__proto__ = superclass;
    TabsGroup.prototype = Object.create( superclass && superclass.prototype );
    TabsGroup.prototype.constructor = TabsGroup;

    var prototypeAccessors = { list: { configurable: true },buttonHasFocus: { configurable: true },isPreventingTransition: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabsGroup';
    };

    TabsGroup.prototype.init = function init () {
      superclass.prototype.init.call(this);

      this.listen('transitionend', this.transitionend.bind(this));
      this.addAscent(TabEmission.PRESS_KEY, this.pressKey.bind(this));
      this.addAscent(TabEmission.LIST_HEIGHT, this.setListHeight.bind(this));
      this.isRendering = true;
    };

    TabsGroup.prototype.getIndex = function getIndex (defaultIndex) {
      if ( defaultIndex === void 0 ) defaultIndex = 0;

      superclass.prototype.getIndex.call(this, defaultIndex);
    };

    prototypeAccessors.list.get = function () {
      return this.element.getDescendantInstances('TabsList', 'TabsGroup', true)[0];
    };

    TabsGroup.prototype.setListHeight = function setListHeight (value) {
      this.listHeight = value;
    };

    TabsGroup.prototype.transitionend = function transitionend (e) {
      this.isPreventingTransition = true;
    };

    prototypeAccessors.buttonHasFocus.get = function () {
      return this.members.some(function (member) { return member.buttonHasFocus; });
    };

    TabsGroup.prototype.pressKey = function pressKey (key) {
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
    };

    /**
     * Selectionne l'element suivant de la liste si on est sur un bouton
     * Si on est à la fin on retourne au début
     */
    TabsGroup.prototype.pressRight = function pressRight () {
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
    TabsGroup.prototype.pressLeft = function pressLeft () {
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
    TabsGroup.prototype.pressHome = function pressHome () {
      if (this.buttonHasFocus) {
        this.index = 0;
        this.focus();
      }
    };
    /**
     * Selectionne le dernier element de la liste si on est sur un bouton
     */
    TabsGroup.prototype.pressEnd = function pressEnd () {
      if (this.buttonHasFocus) {
        this.index = this.length - 1;
        this.focus();
      }
    };
    TabsGroup.prototype.focus = function focus () {
      if (this.current) {
        this.current.focus();
      }
    };

    TabsGroup.prototype.apply = function apply () {
      for (var i = 0; i < this._index; i++) { this.members[i].translate(TabPanelDirection.START); }
      if (this.current) { this.current.translate(TabPanelDirection.NONE); }
      for (var i$1 = this._index + 1; i$1 < this.length; i$1++) { this.members[i$1].translate(TabPanelDirection.END); }
      this.isPreventingTransition = false;
    };

    prototypeAccessors.isPreventingTransition.get = function () {
      return this._isPreventingTransition;
    };

    prototypeAccessors.isPreventingTransition.set = function (value) {
      if (this._isPreventingTransition === value) { return; }
      if (value) { this.addClass(api.internals.motion.TransitionSelector.NONE); }
      else { this.removeClass(api.internals.motion.TransitionSelector.NONE); }
      this._isPreventingTransition = value === true;
    };

    TabsGroup.prototype.render = function render () {
      if (this.current === null) { return; }
      this.node.scrollTop = 0;
      this.node.scrollLeft = 0;
      var paneHeight = Math.round(this.current.node.offsetHeight);
      if (this.panelHeight === paneHeight) { return; }
      this.panelHeight = paneHeight;
      this.style.setProperty('--tabs-height', (this.panelHeight + this.listHeight) + 'px');
    };

    Object.defineProperties( TabsGroup.prototype, prototypeAccessors );
    Object.defineProperties( TabsGroup, staticAccessors );

    return TabsGroup;
  }(api.core.DisclosuresGroup));

  var FOCALIZE_OFFSET = 16;
  var SCROLL_OFFSET$1 = 16; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

  var TabsList = /*@__PURE__*/(function (superclass) {
    function TabsList () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TabsList.__proto__ = superclass;
    TabsList.prototype = Object.create( superclass && superclass.prototype );
    TabsList.prototype.constructor = TabsList;

    var prototypeAccessors = { isScrolling: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabsList';
    };

    TabsList.prototype.init = function init () {
      this.listen('scroll', this.scroll.bind(this));
      this.listenKey(api.core.KeyCodes.RIGHT, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.RIGHT), true, true);
      this.listenKey(api.core.KeyCodes.LEFT, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.LEFT), true, true);
      this.listenKey(api.core.KeyCodes.HOME, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.HOME), true, true);
      this.listenKey(api.core.KeyCodes.END, this.ascend.bind(this, TabEmission.PRESS_KEY, TabKeys.END), true, true);
      this.isResizing = true;
    };

    TabsList.prototype.focalize = function focalize (btn) {
      var btnRect = btn.getRect();
      var listRect = this.getRect();
      var actualScroll = this.node.scrollLeft;
      if (btnRect.left < listRect.left) { this.node.scrollTo(actualScroll - listRect.left + btnRect.left - FOCALIZE_OFFSET, 0); }
      else if (btnRect.right > listRect.right) { this.node.scrollTo(actualScroll - listRect.right + btnRect.right + FOCALIZE_OFFSET, 0); }
    };

    prototypeAccessors.isScrolling.get = function () {
      return this._isScrolling;
    };

    prototypeAccessors.isScrolling.set = function (value) {
      if (this._isScrolling === value) { return; }
      this._isScrolling = value;
      this.apply();
    };

    TabsList.prototype.apply = function apply () {
      if (this._isScrolling) {
        this.addClass(TabSelector.SHADOW);
        this.scroll();
      } else {
        this.removeClass(TabSelector.SHADOW_RIGHT);
        this.removeClass(TabSelector.SHADOW_LEFT);
        this.removeClass(TabSelector.SHADOW);
      }
    };

    /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
    TabsList.prototype.scroll = function scroll () {
      var scrollLeft = this.node.scrollLeft;
      var isMin = scrollLeft <= SCROLL_OFFSET$1;
      var max = this.node.scrollWidth - this.node.clientWidth - SCROLL_OFFSET$1;

      var isMax = Math.abs(scrollLeft) >= max;
      var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      var minSelector = isRtl ? TabSelector.SHADOW_RIGHT : TabSelector.SHADOW_LEFT;
      var maxSelector = isRtl ? TabSelector.SHADOW_LEFT : TabSelector.SHADOW_RIGHT;

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

    TabsList.prototype.resize = function resize () {
      this.isScrolling = this.node.scrollWidth > this.node.clientWidth + SCROLL_OFFSET$1;
      var height = this.getRect().height;
      this.setProperty('--tabs-list-height', (height + "px"));
      this.ascend(TabEmission.LIST_HEIGHT, height);
    };

    TabsList.prototype.dispose = function dispose () {
      this.isScrolling = false;
    };

    Object.defineProperties( TabsList.prototype, prototypeAccessors );
    Object.defineProperties( TabsList, staticAccessors );

    return TabsList;
  }(api.core.Instance));

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

  var TableEmission = {
    SCROLLABLE: api.internals.ns.emission('table', 'scrollable'),
    CHANGE: api.internals.ns.emission('table', 'change'),
    CAPTION_HEIGHT: api.internals.ns.emission('table', 'captionheight')
  };

  var PADDING = '1rem'; // padding de 4v sur le caption

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
      this.setProperty('--table-offset', ("calc(" + value + "px + " + PADDING + ")"));
    };

    Object.defineProperties( Table, staticAccessors );

    return Table;
  }(api.core.Instance));

  var TableSelector = {
    TABLE: api.internals.ns.selector('table'),
    SHADOW: api.internals.ns.selector('table__shadow'),
    SHADOW_LEFT: api.internals.ns.selector('table__shadow--left'),
    SHADOW_RIGHT: api.internals.ns.selector('table__shadow--right'),
    ELEMENT: ((api.internals.ns.selector('table')) + ":not(" + (api.internals.ns.selector('table--no-scroll')) + ") table"),
    CAPTION: ((api.internals.ns.selector('table')) + " table caption")
  };

  var SCROLL_OFFSET = 8; // valeur en px du scroll avant laquelle le shadow s'active ou se desactive

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
      this.ascend(TableEmission.CAPTION_HEIGHT, height);
    };

    Object.defineProperties( TableCaption, staticAccessors );

    return TableCaption;
  }(api.core.Instance));

  api.table = {
    Table: Table,
    TableElement: TableElement,
    TableCaption: TableCaption,
    TableSelector: TableSelector
  };

  api.internals.register(api.table.TableSelector.TABLE, api.table.Table);
  api.internals.register(api.table.TableSelector.ELEMENT, api.table.TableElement);
  api.internals.register(api.table.TableSelector.CAPTION, api.table.TableCaption);

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

  var TRANSCRIPTION = api.internals.ns.selector('transcription');

  var TranscriptionSelector = {
    TRANSCRIPTION: TRANSCRIPTION,
    BUTTON: (TRANSCRIPTION + "__btn")
  };

  var Transcription = /*@__PURE__*/(function (superclass) {
    function Transcription () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Transcription.__proto__ = superclass;
    Transcription.prototype = Object.create( superclass && superclass.prototype );
    Transcription.prototype.constructor = Transcription;

    var prototypeAccessors = { collapsePrimary: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Transcription';
    };

    prototypeAccessors.collapsePrimary.get = function () {
      var buttons = this.element.children.map(function (child) { return child.getInstance('CollapseButton'); }).filter(function (button) { return button !== null && button.hasClass(TranscriptionSelector.BUTTON); });
      return buttons[0];
    };

    Object.defineProperties( Transcription.prototype, prototypeAccessors );
    Object.defineProperties( Transcription, staticAccessors );

    return Transcription;
  }(api.core.Instance));

  api.transcription = {
    Transcription: Transcription,
    TranscriptionSelector: TranscriptionSelector
  };

  api.internals.register(api.transcription.TranscriptionSelector.TRANSCRIPTION, api.transcription.Transcription);

  var TileDownload = /*@__PURE__*/(function (superclass) {
    function TileDownload () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) TileDownload.__proto__ = superclass;
    TileDownload.prototype = Object.create( superclass && superclass.prototype );
    TileDownload.prototype.constructor = TileDownload;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TileDownload';
    };

    TileDownload.prototype.init = function init () {
      var this$1$1 = this;

      this.addAscent(api.core.AssessEmission.UPDATE, function (details) {
        this$1$1.descend(api.core.AssessEmission.UPDATE, details);
      });
      this.addAscent(api.core.AssessEmission.ADDED, function () {
        this$1$1.descend(api.core.AssessEmission.ADDED);
      });
    };

    Object.defineProperties( TileDownload, staticAccessors );

    return TileDownload;
  }(api.core.Instance));

  var TileSelector = {
    DOWNLOAD: api.internals.ns.selector('tile--download'),
    DOWNLOAD_DETAIL: ((api.internals.ns.selector('tile--download')) + " " + (api.internals.ns.selector('tile__detail')))
  };

  api.tile = {
    TileSelector: TileSelector,
    TileDownload: TileDownload
  };

  api.internals.register(api.tile.TileSelector.DOWNLOAD, api.tile.TileDownload);
  api.internals.register(api.tile.TileSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);

  var HeaderSelector = {
    HEADER: api.internals.ns.selector('header'),
    TOOLS_LINKS: api.internals.ns.selector('header__tools-links'),
    MENU_LINKS: api.internals.ns.selector('header__menu-links'),
    BUTTONS: ((api.internals.ns.selector('header__tools-links')) + " " + (api.internals.ns.selector('btns-group')) + ", " + (api.internals.ns.selector('header__tools-links')) + " " + (api.internals.ns.selector('links-group'))),
    MODALS: ("" + (api.internals.ns.selector('header__search')) + (api.internals.ns.selector('modal')) + ", " + (api.internals.ns.selector('header__menu')) + (api.internals.ns.selector('modal')))
  };

  var HeaderLinks = /*@__PURE__*/(function (superclass) {
    function HeaderLinks () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) HeaderLinks.__proto__ = superclass;
    HeaderLinks.prototype = Object.create( superclass && superclass.prototype );
    HeaderLinks.prototype.constructor = HeaderLinks;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderLinks';
    };

    HeaderLinks.prototype.init = function init () {
      var header = this.queryParentSelector(HeaderSelector.HEADER);
      this.toolsLinks = header.querySelector(HeaderSelector.TOOLS_LINKS);
      this.menuLinks = header.querySelector(HeaderSelector.MENU_LINKS);
      var copySuffix = '-mobile';

      var toolsHtml = this.toolsLinks.innerHTML.replace(/  +/g, ' ');
      var menuHtml = this.menuLinks.innerHTML.replace(/  +/g, ' ');
      // Pour éviter de dupliquer des id, on ajoute un suffixe aux id et aria-controls duppliqués.
      var toolsHtmlDuplicateId = toolsHtml.replace(/id="(.*?)"/gm, 'id="$1' + copySuffix + '"');
      toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace(/(<nav[.\s\S]*-translate [.\s\S]*) aria-controls="(.*?)"([.\s\S]*<\/nav>)/gm, '$1 aria-controls="$2' + copySuffix + '"$3');

      if (toolsHtmlDuplicateId === menuHtml) { return; }

      switch (api.mode) {
        case api.Modes.ANGULAR:
        case api.Modes.REACT:
        case api.Modes.VUE:
          this.warn(("header__tools-links content is different from header__menu-links content.\nAs you're using a dynamic framework, you should handle duplication of this content yourself, please refer to documentation:\n" + (api.header.doc)));
          break;

        default:
          this.menuLinks.innerHTML = toolsHtmlDuplicateId;
      }
    };

    Object.defineProperties( HeaderLinks, staticAccessors );

    return HeaderLinks;
  }(api.core.Instance));

  var HeaderModal = /*@__PURE__*/(function (superclass) {
    function HeaderModal () {
      superclass.call(this);
      this._clickHandling = this.clickHandler.bind(this);
    }

    if ( superclass ) HeaderModal.__proto__ = superclass;
    HeaderModal.prototype = Object.create( superclass && superclass.prototype );
    HeaderModal.prototype.constructor = HeaderModal;

    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'HeaderModal';
    };

    HeaderModal.prototype.init = function init () {
      this.isResizing = true;
    };

    HeaderModal.prototype.resize = function resize () {
      if (this.isBreakpoint(api.core.Breakpoints.LG)) { this.deactivateModal(); }
      else { this.activateModal(); }
    };

    HeaderModal.prototype.activateModal = function activateModal () {
      var modal = this.element.getInstance('Modal');
      if (!modal) { return; }
      modal.isEnabled = true;
      this.listen('click', this._clickHandling, { capture: true });
    };

    HeaderModal.prototype.deactivateModal = function deactivateModal () {
      var modal = this.element.getInstance('Modal');
      if (!modal) { return; }
      modal.conceal();
      modal.isEnabled = false;
      this.unlisten('click', this._clickHandling, { capture: true });
    };

    HeaderModal.prototype.clickHandler = function clickHandler (e) {
      if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
        var modal = this.element.getInstance('Modal');
        modal.conceal();
      }
    };

    Object.defineProperties( HeaderModal, staticAccessors );

    return HeaderModal;
  }(api.core.Instance));

  api.header = {
    HeaderLinks: HeaderLinks,
    HeaderModal: HeaderModal,
    HeaderSelector: HeaderSelector,
    doc: 'https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete'
  };

  api.internals.register(api.header.HeaderSelector.TOOLS_LINKS, api.header.HeaderLinks);
  api.internals.register(api.header.HeaderSelector.MODALS, api.header.HeaderModal);

  var DisplaySelector = {
    DISPLAY: api.internals.ns.selector('display'),
    RADIO_BUTTONS: ("input[name=\"" + (api.internals.ns('radios-theme')) + "\"]"),
    FIELDSET: api.internals.ns.selector('fieldset')
  };

  var Display = /*@__PURE__*/(function (superclass) {
    function Display () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) Display.__proto__ = superclass;
    Display.prototype = Object.create( superclass && superclass.prototype );
    Display.prototype.constructor = Display;

    var prototypeAccessors = { scheme: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Display';
    };

    Display.prototype.init = function init () {
      this.radios = this.querySelectorAll(DisplaySelector.RADIO_BUTTONS);

      if (api.scheme) {
        this.changing = this.change.bind(this);
        for (var i = 0, list = this.radios; i < list.length; i += 1) {
          var radio = list[i];

          radio.addEventListener('change', this.changing);
        }
        this.addDescent(api.scheme.SchemeEmission.SCHEME, this.apply.bind(this));
        this.ascend(api.scheme.SchemeEmission.ASK);
      } else {
        this.querySelector(DisplaySelector.FIELDSET).setAttribute('disabled', '');
      }
    };

    prototypeAccessors.scheme.get = function () {
      return this._scheme;
    };

    prototypeAccessors.scheme.set = function (value) {
      if (this._scheme === value || !api.scheme) { return; }
      switch (value) {
        case api.scheme.SchemeValue.SYSTEM:
        case api.scheme.SchemeValue.LIGHT:
        case api.scheme.SchemeValue.DARK:
          this._scheme = value;
          for (var i = 0, list = this.radios; i < list.length; i += 1) {
            var radio = list[i];

        radio.checked = radio.value === value;
          }
          this.ascend(api.scheme.SchemeEmission.SCHEME, value);
          break;
      }
    };

    Display.prototype.change = function change () {
      for (var i = 0, list = this.radios; i < list.length; i += 1) {
        var radio = list[i];

        if (radio.checked) {
          this.scheme = radio.value;
          return;
        }
      }
    };

    Display.prototype.apply = function apply (value) {
      this.scheme = value;
    };

    Display.prototype.dispose = function dispose () {
      for (var i = 0, list = this.radios; i < list.length; i += 1) {
        var radio = list[i];

        radio.removeEventListener('change', this.changing);
      }
    };

    Object.defineProperties( Display.prototype, prototypeAccessors );
    Object.defineProperties( Display, staticAccessors );

    return Display;
  }(api.core.Instance));

  api.display = {
    Display: Display,
    DisplaySelector: DisplaySelector
  };

  api.internals.register(api.display.DisplaySelector.DISPLAY, api.display.Display);

  /* Polyfill service v3.108.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}function Get(n,t){return n[t]}function IsCallable(n){return "function"==typeof n}function SameValueNonNumber(e,n){return e===n}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(n,e){return Type(n)===Type(e)&&("number"===Type(n)?!(!isNaN(n)||!isNaN(e))||(1/n===Infinity&&1/e==-Infinity||(1/n==-Infinity&&1/e===Infinity||n===e)):SameValueNonNumber(n,e))}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}CreateMethodProperty(Array.prototype,"includes",function e(r){var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o){ return !1; }var n=ToInteger(arguments[1]);if(n>=0){ var a=n; }else { (a=o+n)<0&&(a=0); }for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i)){ return !0; }a+=1;}return !1});!function(){function e(e,t){if(!e){ throw new Error("Not enough arguments"); }var n;if("createEvent"in document){n=document.createEvent("Event");var o=!(!t||t.bubbles===undefined$1)&&t.bubbles,i=!(!t||t.cancelable===undefined$1)&&t.cancelable;return n.initEvent(e,o,i),n}return n=document.createEventObject(),n.type=e,n.bubbles=!(!t||t.bubbles===undefined$1)&&t.bubbles,n.cancelable=!(!t||t.cancelable===undefined$1)&&t.cancelable,n}var t={click:1,dblclick:1,keyup:1,keypress:1,keydown:1,mousedown:1,mouseup:1,mousemove:1,mouseover:1,mouseenter:1,mouseleave:1,mouseout:1,storage:1,storagecommit:1,textinput:1};if("undefined"!=typeof document&&"undefined"!=typeof window){var n=window.Event&&window.Event.prototype||null;e.NONE=0,e.CAPTURING_PHASE=1,e.AT_TARGET=2,e.BUBBLING_PHASE=3,window.Event=Window.prototype.Event=e,n&&Object.defineProperty(window.Event,"prototype",{configurable:!1,enumerable:!1,writable:!0,value:n}),"createEvent"in document||(window.addEventListener=Window.prototype.addEventListener=Document.prototype.addEventListener=Element.prototype.addEventListener=function o(){var e=this,n=arguments[0],o=arguments[1];if(e===window&&n in t){ throw new Error("In IE8 the event: "+n+" is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."); }e._events||(e._events={}),e._events[n]||(e._events[n]=function(t){var n,o=e._events[t.type].list,i=o.slice(),r=-1,c=i.length;for(t.preventDefault=function a(){!1!==t.cancelable&&(t.returnValue=!1);},t.stopPropagation=function l(){t.cancelBubble=!0;},t.stopImmediatePropagation=function s(){t.cancelBubble=!0,t.cancelImmediate=!0;},t.currentTarget=e,t.relatedTarget=t.fromElement||null,t.target=t.target||t.srcElement||e,t.timeStamp=(new Date).getTime(),t.clientX&&(t.pageX=t.clientX+document.documentElement.scrollLeft,t.pageY=t.clientY+document.documentElement.scrollTop);++r<c&&!t.cancelImmediate;){ r in i&&(n=i[r],o.includes(n)&&"function"==typeof n&&n.call(e,t)); }},e._events[n].list=[],e.attachEvent&&e.attachEvent("on"+n,e._events[n])),e._events[n].list.push(o);},window.removeEventListener=Window.prototype.removeEventListener=Document.prototype.removeEventListener=Element.prototype.removeEventListener=function i(){var e,t=this,n=arguments[0],o=arguments[1];t._events&&t._events[n]&&t._events[n].list&&-1!==(e=t._events[n].list.indexOf(o))&&(t._events[n].list.splice(e,1),t._events[n].list.length||(t.detachEvent&&t.detachEvent("on"+n,t._events[n]),delete t._events[n]));},window.dispatchEvent=Window.prototype.dispatchEvent=Document.prototype.dispatchEvent=Element.prototype.dispatchEvent=function r(e){if(!arguments.length){ throw new Error("Not enough arguments"); }if(!e||"string"!=typeof e.type){ throw new Error("DOM Events Exception 0"); }var t=this,n=e.type;try{if(!e.bubbles){e.cancelBubble=!0;var o=function(e){e.cancelBubble=!0,(t||window).detachEvent("on"+n,o);};this.attachEvent("on"+n,o);}this.fireEvent("on"+n,e);}catch(i){e.target=t;do{e.currentTarget=t,"_events"in t&&"function"==typeof t._events[n]&&t._events[n].call(t,e),"function"==typeof t["on"+n]&&t["on"+n].call(t,e),t=9===t.nodeType?t.parentWindow:t.parentNode;}while(t&&!e.cancelBubble)}return !0},document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&document.dispatchEvent(new e("DOMContentLoaded",{bubbles:!0}));}));}}();self.CustomEvent=function e(t,n){if(!t){ throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.'); }var l;if(n=n||{bubbles:!1,cancelable:!1,detail:null},"createEvent"in document){ try{l=document.createEvent("CustomEvent"),l.initCustomEvent(t,n.bubbles,n.cancelable,n.detail);}catch(a){l=document.createEvent("Event"),l.initEvent(t,n.bubbles,n.cancelable),l.detail=n.detail;} }else { l=new Event(t,n),l.detail=n&&n.detail||null; }return l},CustomEvent.prototype=Event.prototype;})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.108.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {!function(e){function n(e,n){if("change"===e&&this.addListener(n),arguments[2]&&arguments[2].once){var t=this,r=function(){t.removeListener(r),t.removeListener(n);};this.addListener(r);}}function t(e,n){"change"===e&&this.removeListener(n);}var r=function(){try{var n={};return e.Object.defineProperty(n,"t",{configurable:!0,enumerable:!1,get:function(){return this._v},set:function(e){this._v=e+e;}}),n.t=1,2===n.t}catch(t){return !1}}(),i={enumerable:!0,configurable:!0,get:function(){return this._onchangeHandler||null},set:function(e){var n=this;n._onchangeListener||(n._onchangeListener=function(){"function"==typeof n._onchangeHandler&&n._onchangeHandler.call(n,arguments[0]);},n.addEventListener("change",n._onchangeListener)),n._onchangeHandler=e;}};if("MediaQueryList"in e){var a=e.MediaQueryList.prototype.addListener,o=e.MediaQueryList.prototype.removeListener;e.MediaQueryList.prototype.addListener=function c(e){var n=e;n.handleEvent&&(n=n.handleEvent),a.call(this,n);},e.MediaQueryList.prototype.removeListener=function d(e){var n=e;n.handleEvent&&(n=n.handleEvent),o.call(this,n);},e.MediaQueryList.prototype.addEventListener=n,e.MediaQueryList.prototype.removeEventListener=t,r&&e.Object.defineProperty(e.MediaQueryList.prototype,"onchange",i);}else {var s=self.matchMedia;self.matchMedia=function h(a){var o=s(a),c=o.addListener,d=o.removeListener;return o.addListener=function h(e){var n=e;n.handleEvent&&(n=n.handleEvent),c.call(this,n);},o.removeListener=function u(e){var n=e;n.handleEvent&&(n=n.handleEvent),d.call(this,n);},o.addEventListener=n,o.removeEventListener=t,r&&e.Object.defineProperty(o,"onchange",i),o};}}(self);})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.108.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {var _DOMTokenList=function(){var n=!0,t=function(t,e,r,o){Object.defineProperty?Object.defineProperty(t,e,{configurable:!1===n||!!o,get:r}):t.__defineGetter__(e,r);};try{t({},"support");}catch(e){n=!1;}return function(n,e){var r=this,o=[],i={},a=0,c=0,f=function(n){t(r,n,function(){return u(),o[n]},!1);},l=function(){if(a>=c){ for(;c<a;++c){ f(c); } }},u=function(){var t,r,c=arguments,f=/\s+/;if(c.length){ for(r=0;r<c.length;++r){ if(f.test(c[r])){ throw t=new SyntaxError('String "'+c[r]+'" contains an invalid character'),t.code=5,t.name="InvalidCharacterError",t; } } }for(o="object"==typeof n[e]?(""+n[e].baseVal).replace(/^\s+|\s+$/g,"").split(f):(""+n[e]).replace(/^\s+|\s+$/g,"").split(f),""===o[0]&&(o=[]),i={},r=0;r<o.length;++r){ i[o[r]]=!0; }a=o.length,l();};return u(),t(r,"length",function(){return u(),a}),r.toLocaleString=r.toString=function(){return u(),o.join(" ")},r.item=function(n){return u(),o[n]},r.contains=function(n){return u(),!!i[n]},r.add=function(){u.apply(r,t=arguments);for(var t,c,f=0,p=t.length;f<p;++f){ c=t[f],i[c]||(o.push(c),i[c]=!0); }a!==o.length&&(a=o.length>>>0,"object"==typeof n[e]?n[e].baseVal=o.join(" "):n[e]=o.join(" "),l());},r.remove=function(){u.apply(r,t=arguments);for(var t,c={},f=0,p=[];f<t.length;++f){ c[t[f]]=!0,delete i[t[f]]; }for(f=0;f<o.length;++f){ c[o[f]]||p.push(o[f]); }o=p,a=p.length>>>0,"object"==typeof n[e]?n[e].baseVal=o.join(" "):n[e]=o.join(" "),l();},r.toggle=function(n,t){return u.apply(r,[n]),undefined$1!==t?t?(r.add(n),!0):(r.remove(n),!1):i[n]?(r.remove(n),!1):(r.add(n),!0)},r.forEach=Array.prototype.forEach,r}}();!function(t){"DOMTokenList"in t&&t.DOMTokenList&&(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg")||document.createElementNS("http://www.w3.org/2000/svg","svg").classList instanceof DOMTokenList)||(t.DOMTokenList=_DOMTokenList),function(){var t=document.createElement("span");"classList"in t&&(t.classList.toggle("x",!1),t.classList.contains("x")&&(t.classList.constructor.prototype.toggle=function s(t){var s=arguments[1];if(s===undefined$1){var e=!this.contains(t);return this[e?"add":"remove"](t),e}return s=!!s,this[s?"add":"remove"](t),s}));}(),function(){var t=document.createElement("span");if("classList"in t&&(t.classList.add("a","b"),!t.classList.contains("b"))){var s=t.classList.constructor.prototype.add;t.classList.constructor.prototype.add=function(){for(var t=arguments,e=arguments.length,n=0;n<e;n++){ s.call(this,t[n]); }};}}(),function(){var t=document.createElement("span");if("classList"in t&&(t.classList.add("a"),t.classList.add("b"),t.classList.remove("a","b"),t.classList.contains("b"))){var s=t.classList.constructor.prototype.remove;t.classList.constructor.prototype.remove=function(){for(var t=arguments,e=arguments.length,n=0;n<e;n++){ s.call(this,t[n]); }};}}();}(self);!function(e){var t=!0,r=function(e,r,n,i){Object.defineProperty?Object.defineProperty(e,r,{configurable:!1===t||!!i,get:n}):e.__defineGetter__(r,n);};try{r({},"support");}catch(i){t=!1;}var n=function(e,i,l){r(e.prototype,i,function(){var e,c=this,s="__defineGetter__DEFINE_PROPERTY"+i;if(c[s]){ return e; }if(c[s]=!0,!1===t){for(var o,a=n.mirror||document.createElement("div"),f=a.childNodes,d=f.length,m=0;m<d;++m){ if(f[m]._R===c){o=f[m];break} }o||(o=a.appendChild(document.createElement("div"))),e=DOMTokenList.call(o,c,l);}else { e=new _DOMTokenList(c,l); }return r(c,i,function(){return e}),delete c[s],e},!0);};n(e.Element,"classList","className"),n(e.HTMLElement,"classList","className"),n(e.HTMLLinkElement,"relList","rel"),n(e.HTMLAnchorElement,"relList","rel"),n(e.HTMLAreaElement,"relList","rel");}(self);!function(t){t.DOMTokenList.prototype.forEach=t.Array.prototype.forEach;var o=document.createElement("span");o.classList&&o.classList.constructor&&o.classList.constructor.prototype&&!o.classList.constructor.prototype.forEach&&(o.classList.constructor.prototype.forEach=t.Array.prototype.forEach);}(self);NodeList.prototype.forEach=Array.prototype.forEach;})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.108.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {!function(){function e(e){if(!(0 in arguments)){ throw new TypeError("1 argument is required"); }do{if(this===e){ return !0 }}while(e=e&&e.parentNode);return !1}if("HTMLElement"in self&&"contains"in HTMLElement.prototype){ try{delete HTMLElement.prototype.contains;}catch(t){} }"Node"in self?Node.prototype.contains=e:document.contains=Element.prototype.contains=e;}();})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.108.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {Element.prototype.matches=Element.prototype.webkitMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.mozMatchesSelector||function e(t){for(var o=this,r=(o.document||o.ownerDocument).querySelectorAll(t),c=0;r[c]&&r[c]!==o;){ ++c; }return !!r[c]};})();

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function SameValueNonNumber(e,n){return e===n}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(n,e){return Type(n)===Type(e)&&("number"===Type(n)?!(!isNaN(n)||!isNaN(e))||(1/n===Infinity&&1/e==-Infinity||(1/n==-Infinity&&1/e===Infinity||n===e)):SameValueNonNumber(n,e))}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}CreateMethodProperty(Array.prototype,"includes",function e(r){var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o){ return !1; }var n=ToInteger(arguments[1]);if(n>=0){ var a=n; }else { (a=o+n)<0&&(a=0); }for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i)){ return !0; }a+=1;}return !1});!function(){var t={}.toString,e="".split,r=[].concat,o=Object.prototype.hasOwnProperty,c=Object.getOwnPropertyNames||Object.keys,n="object"==typeof self?c(self):[];CreateMethodProperty(Object,"getOwnPropertyNames",function l(a){var p=ToObject(a);if("[object Window]"===t.call(p)){ try{return c(p)}catch(j){return r.call([],n)} }p="[object String]"==t.call(p)?e.call(p,""):Object(p);for(var i=c(p),s=["length","prototype"],O=0;O<s.length;O++){var b=s[O];o.call(p,b)&&!i.includes(b)&&i.push(b);}if(i.includes("__proto__")){var f=i.indexOf("__proto__");i.splice(f,1);}return i});}();function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();!function(e,r,n){function t(e){if("symbol"===Type(e)){ return e; }throw TypeError(e+" is not a symbol")}var u,o=function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}(),i=0,a=""+Math.random(),c="__symbol:",l=c.length,f="__symbol@@"+a,s={},v="defineProperty",y="defineProperties",b="getOwnPropertyNames",p="getOwnPropertyDescriptor",h="propertyIsEnumerable",m=e.prototype,d=m.hasOwnProperty,g=m[h],w=m.toString,S=Array.prototype.concat,P=e.getOwnPropertyNames?e.getOwnPropertyNames(self):[],O=e[b],j=function $(e){if("[object Window]"===w.call(e)){ try{return O(e)}catch(r){return S.call([],P)} }return O(e)},E=e[p],N=e.create,T=e.keys,_=e.freeze||e,k=e[v],F=e[y],I=E(e,b),x=function(e,r,n){if(!d.call(e,f)){ try{k(e,f,{enumerable:!1,configurable:!1,writable:!1,value:{}});}catch(t){e[f]={};} }e[f]["@@"+r]=n;},z=function(e,r){var n=N(e);return j(r).forEach(function(e){q.call(r,e)&&L(n,e,r[e]);}),n},A=function(e){var r=N(e);return r.enumerable=!1,r},D=function ee(){},M=function(e){return e!=f&&!d.call(H,e)},W=function(e){return e!=f&&d.call(H,e)},q=function re(e){var r=""+e;return W(r)?d.call(this,r)&&this[f]&&this[f]["@@"+r]:g.call(this,e)},B=function(r){var n={enumerable:!1,configurable:!0,get:D,set:function(e){u(this,r,{enumerable:!1,configurable:!0,writable:!0,value:e}),x(this,r,!0);}};try{k(m,r,n);}catch(o){m[r]=n.value;}H[r]=k(e(r),"constructor",J);var t=E(G.prototype,"description");return t&&k(H[r],"description",t),_(H[r])},C=function(e){var r=t(e);if(Y){var n=V(r);if(""!==n){ return n.slice(1,-1) }}if(s[r]!==undefined$1){ return s[r]; }var u=r.toString(),o=u.lastIndexOf("0.");return u=u.slice(10,o),""===u?undefined$1:u},G=function ne(){var r=arguments[0];if(this instanceof ne){ throw new TypeError("Symbol is not a constructor"); }var n=c.concat(r||"",a,++i);r===undefined$1||null!==r&&!isNaN(r)&&""!==String(r)||(s[n]=String(r));var t=B(n);return o||e.defineProperty(t,"description",{configurable:!0,enumerable:!1,value:C(t)}),t},H=N(null),J={value:G},K=function(e){return H[e]},L=function te(e,r,n){var t=""+r;return W(t)?(u(e,t,n.enumerable?A(n):n),x(e,t,!!n.enumerable)):k(e,r,n),e},Q=function(e){return function(r){return d.call(e,f)&&d.call(e[f],"@@"+r)}},R=function ue(e){return j(e).filter(e===m?Q(e):W).map(K)};I.value=L,k(e,v,I),I.value=R,k(e,"getOwnPropertySymbols",I),I.value=function oe(e){return j(e).filter(M)},k(e,b,I),I.value=function ie(e,r){var n=R(r);return n.length?T(r).concat(n).forEach(function(n){q.call(r,n)&&L(e,n,r[n]);}):F(e,r),e},k(e,y,I),I.value=q,k(m,h,I),I.value=G,k(n,"Symbol",I),I.value=function(e){var r=c.concat(c,e,a);return r in m?H[r]:B(r)},k(G,"for",I),I.value=function(e){if(M(e)){ throw new TypeError(e+" is not a symbol"); }return d.call(H,e)?e.slice(2*l,-a.length):void 0},k(G,"keyFor",I),I.value=function ae(e,r){var n=E(e,r);return n&&W(r)&&(n.enumerable=q.call(e,r)),n},k(e,p,I),I.value=function ce(e,r){return 1===arguments.length||void 0===r?N(e):z(e,r)},k(e,"create",I);var U=null===function(){return this}.call(null);if(I.value=U?function(){var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e}:function(){if(this===window){ return "[object Null]"; }var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e},k(m,"toString",I),u=function(e,r,n){var t=E(m,r);delete m[r],k(e,r,n),e!==m&&k(m,r,t);},function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}()){var V;try{V=Function("s","var v = s.valueOf(); return { [v]() {} }[v].name;");}catch(Z){}var X=function(){},Y=V&&"inferred"===X.name?V:null;e.defineProperty(n.Symbol.prototype,"description",{configurable:!0,enumerable:!1,get:function(){return C(this)}});}}(Object,0,self);Object.defineProperty(Symbol,"toStringTag",{value:Symbol("toStringTag")});!function(){function n(){return tn[q][B]||D}function t(n){return n&&"object"==typeof n}function e(n){return "function"==typeof n}function r(n,t){return n instanceof t}function o(n){return r(n,A)}function i(n,t,e){if(!t(n)){ throw a(e) }}function u(){try{return b.apply(R,arguments)}catch(n){return Y.e=n,Y}}function c(n,t){return b=n,R=t,u}function f(n,t){function e(){for(var e=0;e<o;){ t(r[e],r[e+1]),r[e++]=T,r[e++]=T; }o=0,r.length>n&&(r.length=n);}var r=L(n),o=0;return function(n,t){r[o++]=n,r[o++]=t,2===o&&tn.nextTick(e);}}function s(n,t){var o,i,u,f,s=0;if(!n){ throw a(N); }var l=n[tn[q][z]];if(e(l)){ i=l.call(n); }else {if(!e(n.next)){if(r(n,L)){for(o=n.length;s<o;){ t(n[s],s++); }return s}throw a(N)}i=n;}for(;!(u=i.next()).done;){ if((f=c(t)(u.value,s++))===Y){ throw e(i[G])&&i[G](),f.e; } }return s}function a(n){return new TypeError(n)}function l(n){return (n?"":Q)+(new A).stack}function h(n,t){var e="on"+n.toLowerCase(),r=F[e];E&&E.listeners(n).length?n===X?E.emit(n,t._v,t):E.emit(n,t):r?r({reason:t._v,promise:t}):tn[n](t._v,t);}function v(n){return n&&n._s}function _(n){if(v(n)){ return new n(Z); }var t,r,o;return t=new n(function(n,e){if(t){ throw a(); }r=n,o=e;}),i(r,e),i(o,e),t}function d(n,t){var e=!1;return function(r){e||(e=!0,I&&(n[M]=l(!0)),t===U?g(n,r):y(n,t,r));}}function p(n,t,r,o){return e(r)&&(t._onFulfilled=r),e(o)&&(n[J]&&h(W,n),t._onRejected=o),I&&(t._p=n),n[n._c++]=t,n._s!==$&&rn(n,t),t}function m(n){if(n._umark){ return !0; }n._umark=!0;for(var t,e=0,r=n._c;e<r;){ if(t=n[e++],t._onRejected||m(t)){ return !0 } }}function w(n,t){function e(n){return r.push(n.replace(/^\s+|\s+$/g,""))}var r=[];return I&&(t[M]&&e(t[M]),function o(n){n&&K in n&&(o(n._next),e(n[K]+""),o(n._p));}(t)),(n&&n.stack?n.stack:n)+("\n"+r.join("\n")).replace(nn,"")}function j(n,t){return n(t)}function y(n,t,e){var r=0,i=n._c;if(n._s===$){ for(n._s=t,n._v=e,t===O&&(I&&o(e)&&(e.longStack=w(e,n)),on(n));r<i;){ rn(n,n[r++]); } }return n}function g(n,r){if(r===n&&r){ return y(n,O,a(V)),n; }if(r!==S&&(e(r)||t(r))){var o=c(k)(r);if(o===Y){ return y(n,O,o.e),n; }e(o)?(I&&v(r)&&(n._next=r),v(r)?x(n,r,o):tn.nextTick(function(){x(n,r,o);})):y(n,U,r);}else { y(n,U,r); }return n}function k(n){return n.then}function x(n,t,e){var r=c(e,t)(function(e){t&&(t=S,g(n,e));},function(e){t&&(t=S,y(n,O,e));});r===Y&&t&&(y(n,O,r.e),t=S);}var T,b,R,S=null,C="object"==typeof self,F=self,P=F.Promise,E=F.process,H=F.console,I=!0,L=Array,A=Error,O=1,U=2,$=3,q="Symbol",z="iterator",B="species",D=q+"("+B+")",G="return",J="_uh",K="_pt",M="_st",N="Invalid argument",Q="\nFrom previous ",V="Chaining cycle detected for promise",W="rejectionHandled",X="unhandledRejection",Y={e:S},Z=function(){},nn=/^.+\/node_modules\/yaku\/.+\n?/gm,tn=function(n){var r,o=this;if(!t(o)||o._s!==T){ throw a("Invalid this"); }if(o._s=$,I&&(o[K]=l()),n!==Z){if(!e(n)){ throw a(N); }r=c(n)(d(o,U),d(o,O)),r===Y&&y(o,O,r.e);}};tn["default"]=tn,function en(n,t){for(var e in t){ n[e]=t[e]; }}(tn.prototype,{then:function(n,t){if(this._s===undefined$1){ throw a(); }return p(this,_(tn.speciesConstructor(this,tn)),n,t)},"catch":function(n){return this.then(T,n)},"finally":function(n){return this.then(function(t){return tn.resolve(n()).then(function(){return t})},function(t){return tn.resolve(n()).then(function(){throw t})})},_c:0,_p:S}),tn.resolve=function(n){return v(n)?n:g(_(this),n)},tn.reject=function(n){return y(_(this),O,n)},tn.race=function(n){var t=this,e=_(t),r=function(n){y(e,U,n);},o=function(n){y(e,O,n);},i=c(s)(n,function(n){t.resolve(n).then(r,o);});return i===Y?t.reject(i.e):e},tn.all=function(n){function t(n){y(o,O,n);}var e,r=this,o=_(r),i=[];return (e=c(s)(n,function(n,u){r.resolve(n).then(function(n){i[u]=n,--e||y(o,U,i);},t);}))===Y?r.reject(e.e):(e||y(o,U,[]),o)},tn.Symbol=F[q]||{},c(function(){Object.defineProperty(tn,n(),{get:function(){return this}});})(),tn.speciesConstructor=function(t,e){var r=t.constructor;return r?r[n()]||e:e},tn.unhandledRejection=function(n,t){H&&H.error("Uncaught (in promise)",I?t.longStack:w(n,t));},tn.rejectionHandled=Z,tn.enableLongStackTrace=function(){I=!0;},tn.nextTick=C?function(n){P?new P(function(n){n();}).then(n):setTimeout(n);}:E.nextTick,tn._s=1;var rn=f(999,function(n,t){var e,r;return (r=n._s!==O?t._onFulfilled:t._onRejected)===T?void y(t,n._s,n._v):(e=c(j)(r,n._v))===Y?void y(t,O,e.e):void g(t,e)}),on=f(9,function(n){m(n)||(n[J]=1,h(X,n));});F.Promise=tn;}();})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function ArrayCreate(r){if(1/r==-Infinity&&(r=0),r>Math.pow(2,32)-1){ throw new RangeError("Invalid array length"); }var n=[];return n.length=r,n}function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateDataProperty(e,r,t){var a={value:t,writable:!0,enumerable:!0,configurable:!0};try{return Object.defineProperty(e,r,a),!0}catch(n){return !1}}function CreateDataPropertyOrThrow(t,r,o){var e=CreateDataProperty(t,r,o);if(!e){ throw new TypeError("Cannot assign value `"+Object.prototype.toString.call(o)+"` to property `"+Object.prototype.toString.call(r)+"` on object `"+Object.prototype.toString.call(t)+"`"); }return e}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function SameValueNonNumber(e,n){return e===n}function ToBoolean(o){return Boolean(o)}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}!function(e){CreateMethodProperty(Object,"isExtensible",function t(n){return "object"===Type(n)&&(!e||e(n))});}(Object.isExtensible);function CreateIterResultObject(e,r){if("boolean"!==Type(r)){ throw new Error; }var t={};return CreateDataProperty(t,"value",e),CreateDataProperty(t,"done",r),t}function GetPrototypeFromConstructor(t,o){var r=Get(t,"prototype");return "object"!==Type(r)&&(r=o),r}function OrdinaryCreateFromConstructor(r,e){var t=arguments[2]||{},o=GetPrototypeFromConstructor(r,e),a=Object.create(o);for(var n in t){ Object.prototype.hasOwnProperty.call(t,n)&&Object.defineProperty(a,n,{configurable:!0,enumerable:!1,writable:!0,value:t[n]}); }return a}function IsConstructor(t){return "object"===Type(t)&&("function"==typeof t&&!!t.prototype)}function Construct(r){var t=arguments.length>2?arguments[2]:r,o=arguments.length>1?arguments[1]:[];if(!IsConstructor(r)){ throw new TypeError("F must be a constructor."); }if(!IsConstructor(t)){ throw new TypeError("newTarget must be a constructor."); }if(t===r){ return new(Function.prototype.bind.apply(r,[null].concat(o))); }var n=OrdinaryCreateFromConstructor(t,Object.prototype);return Call(r,n,o)}function IteratorClose(r,t){if("object"!==Type(r["[[Iterator]]"])){ throw new Error(Object.prototype.toString.call(r["[[Iterator]]"])+"is not an Object."); }var e=r["[[Iterator]]"],o=GetMethod(e,"return");if(o===undefined$1){ return t; }try{var n=Call(o,e);}catch(c){var a=c;}if(t){ return t; }if(a){ throw a; }if("object"!==Type(n)){ throw new TypeError("Iterator's return method returned a non-object."); }return t}function IteratorComplete(t){if("object"!==Type(t)){ throw new Error(Object.prototype.toString.call(t)+"is not an Object."); }return ToBoolean(Get(t,"done"))}function IteratorNext(t){if(arguments.length<2){ var e=Call(t["[[NextMethod]]"],t["[[Iterator]]"]); }else { e=Call(t["[[NextMethod]]"],t["[[Iterator]]"],[arguments[1]]); }if("object"!==Type(e)){ throw new TypeError("bad iterator"); }return e}function IteratorStep(t){var r=IteratorNext(t);return !0!==IteratorComplete(r)&&r}function IteratorValue(t){if("object"!==Type(t)){ throw new Error(Object.prototype.toString.call(t)+"is not an Object."); }return Get(t,"value")}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(n,e){return Type(n)===Type(e)&&("number"===Type(n)?!(!isNaN(n)||!isNaN(e))||(1/n===Infinity&&1/e==-Infinity||(1/n==-Infinity&&1/e===Infinity||n===e)):SameValueNonNumber(n,e))}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}CreateMethodProperty(Array.prototype,"includes",function e(r){var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o){ return !1; }var n=ToInteger(arguments[1]);if(n>=0){ var a=n; }else { (a=o+n)<0&&(a=0); }for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i)){ return !0; }a+=1;}return !1});!function(){var t={}.toString,e="".split,r=[].concat,o=Object.prototype.hasOwnProperty,c=Object.getOwnPropertyNames||Object.keys,n="object"==typeof self?c(self):[];CreateMethodProperty(Object,"getOwnPropertyNames",function l(a){var p=ToObject(a);if("[object Window]"===t.call(p)){ try{return c(p)}catch(j){return r.call([],n)} }p="[object String]"==t.call(p)?e.call(p,""):Object(p);for(var i=c(p),s=["length","prototype"],O=0;O<s.length;O++){var b=s[O];o.call(p,b)&&!i.includes(b)&&i.push(b);}if(i.includes("__proto__")){var f=i.indexOf("__proto__");i.splice(f,1);}return i});}();function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();!function(e,r,n){function t(e){if("symbol"===Type(e)){ return e; }throw TypeError(e+" is not a symbol")}var u,o=function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}(),i=0,a=""+Math.random(),c="__symbol:",l=c.length,f="__symbol@@"+a,s={},v="defineProperty",y="defineProperties",b="getOwnPropertyNames",p="getOwnPropertyDescriptor",h="propertyIsEnumerable",m=e.prototype,d=m.hasOwnProperty,g=m[h],w=m.toString,S=Array.prototype.concat,P=e.getOwnPropertyNames?e.getOwnPropertyNames(self):[],O=e[b],j=function $(e){if("[object Window]"===w.call(e)){ try{return O(e)}catch(r){return S.call([],P)} }return O(e)},E=e[p],N=e.create,T=e.keys,_=e.freeze||e,k=e[v],F=e[y],I=E(e,b),x=function(e,r,n){if(!d.call(e,f)){ try{k(e,f,{enumerable:!1,configurable:!1,writable:!1,value:{}});}catch(t){e[f]={};} }e[f]["@@"+r]=n;},z=function(e,r){var n=N(e);return j(r).forEach(function(e){q.call(r,e)&&L(n,e,r[e]);}),n},A=function(e){var r=N(e);return r.enumerable=!1,r},D=function ee(){},M=function(e){return e!=f&&!d.call(H,e)},W=function(e){return e!=f&&d.call(H,e)},q=function re(e){var r=""+e;return W(r)?d.call(this,r)&&this[f]&&this[f]["@@"+r]:g.call(this,e)},B=function(r){var n={enumerable:!1,configurable:!0,get:D,set:function(e){u(this,r,{enumerable:!1,configurable:!0,writable:!0,value:e}),x(this,r,!0);}};try{k(m,r,n);}catch(o){m[r]=n.value;}H[r]=k(e(r),"constructor",J);var t=E(G.prototype,"description");return t&&k(H[r],"description",t),_(H[r])},C=function(e){var r=t(e);if(Y){var n=V(r);if(""!==n){ return n.slice(1,-1) }}if(s[r]!==undefined$1){ return s[r]; }var u=r.toString(),o=u.lastIndexOf("0.");return u=u.slice(10,o),""===u?undefined$1:u},G=function ne(){var r=arguments[0];if(this instanceof ne){ throw new TypeError("Symbol is not a constructor"); }var n=c.concat(r||"",a,++i);r===undefined$1||null!==r&&!isNaN(r)&&""!==String(r)||(s[n]=String(r));var t=B(n);return o||e.defineProperty(t,"description",{configurable:!0,enumerable:!1,value:C(t)}),t},H=N(null),J={value:G},K=function(e){return H[e]},L=function te(e,r,n){var t=""+r;return W(t)?(u(e,t,n.enumerable?A(n):n),x(e,t,!!n.enumerable)):k(e,r,n),e},Q=function(e){return function(r){return d.call(e,f)&&d.call(e[f],"@@"+r)}},R=function ue(e){return j(e).filter(e===m?Q(e):W).map(K)};I.value=L,k(e,v,I),I.value=R,k(e,"getOwnPropertySymbols",I),I.value=function oe(e){return j(e).filter(M)},k(e,b,I),I.value=function ie(e,r){var n=R(r);return n.length?T(r).concat(n).forEach(function(n){q.call(r,n)&&L(e,n,r[n]);}):F(e,r),e},k(e,y,I),I.value=q,k(m,h,I),I.value=G,k(n,"Symbol",I),I.value=function(e){var r=c.concat(c,e,a);return r in m?H[r]:B(r)},k(G,"for",I),I.value=function(e){if(M(e)){ throw new TypeError(e+" is not a symbol"); }return d.call(H,e)?e.slice(2*l,-a.length):void 0},k(G,"keyFor",I),I.value=function ae(e,r){var n=E(e,r);return n&&W(r)&&(n.enumerable=q.call(e,r)),n},k(e,p,I),I.value=function ce(e,r){return 1===arguments.length||void 0===r?N(e):z(e,r)},k(e,"create",I);var U=null===function(){return this}.call(null);if(I.value=U?function(){var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e}:function(){if(this===window){ return "[object Null]"; }var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e},k(m,"toString",I),u=function(e,r,n){var t=E(m,r);delete m[r],k(e,r,n),e!==m&&k(m,r,t);},function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}()){var V;try{V=Function("s","var v = s.valueOf(); return { [v]() {} }[v].name;");}catch(Z){}var X=function(){},Y=V&&"inferred"===X.name?V:null;e.defineProperty(n.Symbol.prototype,"description",{configurable:!0,enumerable:!1,get:function(){return C(this)}});}}(Object,0,self);Object.defineProperty(self.Symbol,"iterator",{value:self.Symbol("iterator")});function GetIterator(t){var e=arguments.length>1?arguments[1]:GetMethod(t,Symbol.iterator),r=Call(e,t);if("object"!==Type(r)){ throw new TypeError("bad iterator"); }var o=GetV(r,"next"),a=Object.create(null);return a["[[Iterator]]"]=r,a["[[NextMethod]]"]=o,a["[[Done]]"]=!1,a}Object.defineProperty(Symbol,"species",{value:Symbol("species")});!function(e){function t(e,t){if("object"!==Type(e)){ throw new TypeError("createMapIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Map){ throw new TypeError("createMapIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }var r=Object.create(u);return Object.defineProperty(r,"[[Map]]",{configurable:!0,enumerable:!1,writable:!0,value:e}),Object.defineProperty(r,"[[MapNextIndex]]",{configurable:!0,enumerable:!1,writable:!0,value:0}),Object.defineProperty(r,"[[MapIterationKind]]",{configurable:!0,enumerable:!1,writable:!0,value:t}),r}var r=function(){try{var e={};return Object.defineProperty(e,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!e.t}catch(t){return !1}}(),o=0,a=Symbol("meta_"+(1e8*Math.random()+"").replace(".","")),n=function(e){if("object"==typeof e?null!==e:"function"==typeof e){if(!Object.isExtensible(e)){ return !1; }if(!Object.prototype.hasOwnProperty.call(e,a)){var t=typeof e+"-"+ ++o;Object.defineProperty(e,a,{configurable:!1,enumerable:!1,writable:!1,value:t});}return e[a]}return ""+e},i=function(e,t){var r=n(t);if(!1===r){ return p(e,t); }var o=e._table[r];return o!==undefined$1&&o},p=function(e,t){for(var r=0;r<e._keys.length;r++){var o=e._keys[r];if(o!==c&&SameValueZero(o,t)){ return r }}return !1},l=function(e,t,r){var o=n(t);return !1!==o&&(!1===r?delete e._table[o]:e._table[o]=r,!0)},c=Symbol("undef"),y=function f(){if(!(this instanceof f)){ throw new TypeError('Constructor Map requires "new"'); }var e=OrdinaryCreateFromConstructor(this,f.prototype,{_table:{},_keys:[],_values:[],_size:0,_es6Map:!0});r||Object.defineProperty(e,"size",{configurable:!0,enumerable:!1,writable:!0,value:0});var t=arguments.length>0?arguments[0]:undefined$1;if(null===t||t===undefined$1){ return e; }var o=e.set;if(!IsCallable(o)){ throw new TypeError("Map.prototype.set is not a function"); }try{for(var a=GetIterator(t);;){var n=IteratorStep(a);if(!1===n){ return e; }var i=IteratorValue(n);if("object"!==Type(i)){ try{throw new TypeError("Iterator value "+i+" is not an entry object")}catch(u){return IteratorClose(a,u)} }try{var p=i[0],l=i[1];o.call(e,p,l);}catch(s){return IteratorClose(a,s)}}}catch(s$1){if(Array.isArray(t)||"[object Arguments]"===Object.prototype.toString.call(t)||t.callee){var c,y=t.length;for(c=0;c<y;c++){ o.call(e,t[c][0],t[c][1]); }}}return e};Object.defineProperty(y,"prototype",{configurable:!1,enumerable:!1,writable:!1,value:{}}),r?Object.defineProperty(y,Symbol.species,{configurable:!0,enumerable:!1,get:function(){return this},set:undefined$1}):CreateMethodProperty(y,Symbol.species,y),CreateMethodProperty(y.prototype,"clear",function b(){var e=this;if("object"!==Type(e)){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Map){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }for(var t=e._keys,o=0;o<t.length;o++){ e._keys[o]=c,e._values[o]=c; }return this._size=0,r||(this.size=this._size),this._table={},undefined$1}),CreateMethodProperty(y.prototype,"constructor",y),CreateMethodProperty(y.prototype,"delete",function(e){var t=this;if("object"!==Type(t)){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(t)); }var o=i(t,e);if(!1!==o){var a=t._keys[o];if(a!==c&&SameValueZero(a,e)){ return this._keys[o]=c,this._values[o]=c,this._size=--this._size,r||(this.size=this._size),l(this,e,!1),!0 }}return !1}),CreateMethodProperty(y.prototype,"entries",function h(){return t(this,"key+value")}),CreateMethodProperty(y.prototype,"forEach",function(e){var t=this;if("object"!==Type(t)){ throw new TypeError("Method Map.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!IsCallable(e)){ throw new TypeError(Object.prototype.toString.call(e)+" is not a function."); }if(arguments[1]){ var r=arguments[1]; }for(var o=t._keys,a=0;a<o.length;a++){ t._keys[a]!==c&&t._values[a]!==c&&e.call(r,t._values[a],t._keys[a],t); }return undefined$1}),CreateMethodProperty(y.prototype,"get",function d(e){var t=this;if("object"!==Type(t)){ throw new TypeError("Method Map.prototype.get called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.get called on incompatible receiver "+Object.prototype.toString.call(t)); }var r=i(t,e);if(!1!==r){var o=t._keys[r];if(o!==c&&SameValueZero(o,e)){ return t._values[r] }}return undefined$1}),CreateMethodProperty(y.prototype,"has",function v(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Map.prototype.has called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.has called on incompatible receiver "+Object.prototype.toString.call(t)); }var r=i(t,e);if(!1!==r){var o=t._keys[r];if(o!==c&&SameValueZero(o,e)){ return !0 }}return !1}),CreateMethodProperty(y.prototype,"keys",function M(){return t(this,"key")}),CreateMethodProperty(y.prototype,"set",function w(e,t){var o=this;if("object"!==Type(o)){ throw new TypeError("Method Map.prototype.set called on incompatible receiver "+Object.prototype.toString.call(o)); }if(!0!==o._es6Map){ throw new TypeError("Method Map.prototype.set called on incompatible receiver "+Object.prototype.toString.call(o)); }var a=i(o,e);if(!1!==a){ o._values[a]=t; }else {-0===e&&(e=0);var n={"[[Key]]":e,"[[Value]]":t};o._keys.push(n["[[Key]]"]),o._values.push(n["[[Value]]"]),l(o,e,o._keys.length-1),++o._size,r||(o.size=o._size);}return o}),r&&Object.defineProperty(y.prototype,"size",{configurable:!0,enumerable:!1,get:function(){var e=this;if("object"!==Type(e)){ throw new TypeError("Method Map.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Map){ throw new TypeError("Method Map.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }return this._size},set:undefined$1}),CreateMethodProperty(y.prototype,"values",function j(){return t(this,"value")}),CreateMethodProperty(y.prototype,Symbol.iterator,y.prototype.entries),"name"in y||Object.defineProperty(y,"name",{configurable:!0,enumerable:!1,writable:!1,value:"Map"});var u={};Object.defineProperty(u,"isMapIterator",{configurable:!1,enumerable:!1,writable:!1,value:!0}),CreateMethodProperty(u,"next",function _(){var e=this;if("object"!==Type(e)){ throw new TypeError("Method %MapIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!e.isMapIterator){ throw new TypeError("Method %MapIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }var t=e["[[Map]]"],r=e["[[MapNextIndex]]"],o=e["[[MapIterationKind]]"];if(t===undefined$1){ return CreateIterResultObject(undefined$1,!0); }if(!t._es6Map){ throw new Error(Object.prototype.toString.call(t)+" has a [[MapData]] internal slot."); }for(var a=t._keys,n=a.length;r<n;){var i=Object.create(null);if(i["[[Key]]"]=t._keys[r],i["[[Value]]"]=t._values[r],r+=1,e["[[MapNextIndex]]"]=r,i["[[Key]]"]!==c){if("key"===o){ var p=i["[[Key]]"]; }else if("value"===o){ p=i["[[Value]]"]; }else {if("key+value"!==o){ throw new Error; }p=[i["[[Key]]"],i["[[Value]]"]];}return CreateIterResultObject(p,!1)}}return e["[[Map]]"]=undefined$1,CreateIterResultObject(undefined$1,!0)}),CreateMethodProperty(u,Symbol.iterator,function g(){return this});try{CreateMethodProperty(e,"Map",y);}catch(s){e.Map=y;}}(self);!function(e){function t(e,t){if("object"!=typeof e){ throw new TypeError("createSetIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Set){ throw new TypeError("createSetIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }var r=Object.create(i);return Object.defineProperty(r,"[[IteratedSet]]",{configurable:!0,enumerable:!1,writable:!0,value:e}),Object.defineProperty(r,"[[SetNextIndex]]",{configurable:!0,enumerable:!1,writable:!0,value:0}),Object.defineProperty(r,"[[SetIterationKind]]",{configurable:!0,enumerable:!1,writable:!0,value:t}),r}var r=function(){try{var e={};return Object.defineProperty(e,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!e.t}catch(t){return !1}}(),o=Symbol("undef"),n=function c(){if(!(this instanceof c)){ throw new TypeError('Constructor Set requires "new"'); }var e=OrdinaryCreateFromConstructor(this,c.prototype,{_values:[],_size:0,_es6Set:!0});r||Object.defineProperty(e,"size",{configurable:!0,enumerable:!1,writable:!0,value:0});var t=arguments.length>0?arguments[0]:undefined$1;if(null===t||t===undefined$1){ return e; }var o=e.add;if(!IsCallable(o)){ throw new TypeError("Set.prototype.add is not a function"); }try{for(var n=GetIterator(t);;){var a=IteratorStep(n);if(!1===a){ return e; }var i=IteratorValue(a);try{o.call(e,i);}catch(y){return IteratorClose(n,y)}}}catch(y$1){if(!Array.isArray(t)&&"[object Arguments]"!==Object.prototype.toString.call(t)&&!t.callee){ throw y$1; }var l,p=t.length;for(l=0;l<p;l++){ o.call(e,t[l]); }}return e};Object.defineProperty(n,"prototype",{configurable:!1,enumerable:!1,writable:!1,value:{}}),r?Object.defineProperty(n,Symbol.species,{configurable:!0,enumerable:!1,get:function(){return this},set:undefined$1}):CreateMethodProperty(n,Symbol.species,n),CreateMethodProperty(n.prototype,"add",function p(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.add called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.add called on incompatible receiver "+Object.prototype.toString.call(t)); }for(var n=t._values,a=0;a<n.length;a++){var i=n[a];if(i!==o&&SameValueZero(i,e)){ return t }}return 0===e&&1/e==-Infinity&&(e=0),t._values.push(e),this._size=++this._size,r||(this.size=this._size),t}),CreateMethodProperty(n.prototype,"clear",function y(){var e=this;if("object"!=typeof e){ throw new TypeError("Method Set.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Set){ throw new TypeError("Method Set.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }for(var t=e._values,n=0;n<t.length;n++){ t[n]=o; }return this._size=0,r||(this.size=this._size),undefined$1}),CreateMethodProperty(n.prototype,"constructor",n),CreateMethodProperty(n.prototype,"delete",function(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.delete called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.delete called on incompatible receiver "+Object.prototype.toString.call(t)); }for(var n=t._values,a=0;a<n.length;a++){var i=n[a];if(i!==o&&SameValueZero(i,e)){ return n[a]=o,this._size=--this._size,r||(this.size=this._size),!0 }}return !1}),CreateMethodProperty(n.prototype,"entries",function u(){return t(this,"key+value")}),CreateMethodProperty(n.prototype,"forEach",function f(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!IsCallable(e)){ throw new TypeError(Object.prototype.toString.call(e)+" is not a function."); }if(arguments[1]){ var r=arguments[1]; }for(var n=t._values,a=0;a<n.length;a++){var i=n[a];i!==o&&e.call(r,i,i,t);}return undefined$1}),CreateMethodProperty(n.prototype,"has",function d(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }for(var r=t._values,n=0;n<r.length;n++){var a=r[n];if(a!==o&&SameValueZero(a,e)){ return !0 }}return !1});var a=function h(){return t(this,"value")};CreateMethodProperty(n.prototype,"values",a),CreateMethodProperty(n.prototype,"keys",a),r&&Object.defineProperty(n.prototype,"size",{configurable:!0,enumerable:!1,get:function(){var e=this;if("object"!=typeof e){ throw new TypeError("Method Set.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Set){ throw new TypeError("Method Set.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }for(var t=e._values,r=0,n=0;n<t.length;n++){t[n]!==o&&(r+=1);}return r},set:undefined$1}),CreateMethodProperty(n.prototype,Symbol.iterator,a),"name"in n||Object.defineProperty(n,"name",{configurable:!0,enumerable:!1,writable:!1,value:"Set"});var i={};Object.defineProperty(i,"isSetIterator",{configurable:!1,enumerable:!1,writable:!1,value:!0}),CreateMethodProperty(i,"next",function b(){var e=this;if("object"!=typeof e){ throw new TypeError("Method %SetIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!e.isSetIterator){ throw new TypeError("Method %SetIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }var t=e["[[IteratedSet]]"],r=e["[[SetNextIndex]]"],n=e["[[SetIterationKind]]"];if(t===undefined$1){ return CreateIterResultObject(undefined$1,!0); }if(!t._es6Set){ throw new Error(Object.prototype.toString.call(t)+" does not have [[SetData]] internal slot."); }for(var a=t._values,i=a.length;r<i;){var l=a[r];if(r+=1,e["[[SetNextIndex]]"]=r,l!==o){ return "key+value"===n?CreateIterResultObject([l,l],!1):CreateIterResultObject(l,!1) }}return e["[[IteratedSet]]"]=undefined$1,CreateIterResultObject(undefined$1,!0)}),CreateMethodProperty(i,Symbol.iterator,function s(){return this});try{CreateMethodProperty(e,"Set",n);}catch(l){e.Set=n;}}(self);!function(){function r(r){return "string"==typeof r||"object"==typeof r&&"[object String]"===t.call(r)}var t=Object.prototype.toString,e=String.prototype.match;CreateMethodProperty(Array,"from",function o(t){var o=this,a=arguments.length>1?arguments[1]:undefined$1;if(a===undefined$1){ var n=!1; }else {if(!1===IsCallable(a)){ throw new TypeError(Object.prototype.toString.call(a)+" is not a function."); }var i=arguments.length>2?arguments[2]:undefined$1;if(i!==undefined$1){ var l=i; }else { l=undefined$1; }n=!0;}var u=GetMethod(t,Symbol.iterator);if(u!==undefined$1){if(IsConstructor(o)){ var f=Construct(o); }else { f=ArrayCreate(0); }for(var c=GetIterator(t,u),s=0;;){if(s>=Math.pow(2,53)-1){var h=new TypeError("Iteration count can not be greater than or equal 9007199254740991.");return IteratorClose(c,h)}var y=ToString(s),C=IteratorStep(c);if(!1===C){ return f.length=s,f; }var g=IteratorValue(C);if(n){ try{var p=Call(a,l,[g,s]);}catch(b){return IteratorClose(c,b)} }else { p=g; }try{CreateDataPropertyOrThrow(f,y,p);}catch(b$1){return IteratorClose(c,b$1)}s+=1;}}if(r(t)){ var v=e.call(t,/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g)||[]; }else { v=ToObject(t); }var d=ToLength(Get(v,"length"));for(f=IsConstructor(o)?Construct(o,[d]):ArrayCreate(d),s=0;s<d;){y=ToString(s);var I=Get(v,y);p=!0===n?Call(a,l,[I,s]):I,CreateDataPropertyOrThrow(f,y,p),s+=1;}return f.length=d,f});}();})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function ArrayCreate(r){if(1/r==-Infinity&&(r=0),r>Math.pow(2,32)-1){ throw new RangeError("Invalid array length"); }var n=[];return n.length=r,n}function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateDataProperty(e,r,t){var a={value:t,writable:!0,enumerable:!0,configurable:!0};try{return Object.defineProperty(e,r,a),!0}catch(n){return !1}}function CreateDataPropertyOrThrow(t,r,o){var e=CreateDataProperty(t,r,o);if(!e){ throw new TypeError("Cannot assign value `"+Object.prototype.toString.call(o)+"` to property `"+Object.prototype.toString.call(r)+"` on object `"+Object.prototype.toString.call(t)+"`"); }return e}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}function Get(n,t){return n[t]}function HasProperty(n,r){return r in n}function IsArray(r){return "[object Array]"===Object.prototype.toString.call(r)}function IsCallable(n){return "function"==typeof n}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function GetPrototypeFromConstructor(t,o){var r=Get(t,"prototype");return "object"!==Type(r)&&(r=o),r}function OrdinaryCreateFromConstructor(r,e){var t=arguments[2]||{},o=GetPrototypeFromConstructor(r,e),a=Object.create(o);for(var n in t){ Object.prototype.hasOwnProperty.call(t,n)&&Object.defineProperty(a,n,{configurable:!0,enumerable:!1,writable:!0,value:t[n]}); }return a}function IsConstructor(t){return "object"===Type(t)&&("function"==typeof t&&!!t.prototype)}function Construct(r){var t=arguments.length>2?arguments[2]:r,o=arguments.length>1?arguments[1]:[];if(!IsConstructor(r)){ throw new TypeError("F must be a constructor."); }if(!IsConstructor(t)){ throw new TypeError("newTarget must be a constructor."); }if(t===r){ return new(Function.prototype.bind.apply(r,[null].concat(o))); }var n=OrdinaryCreateFromConstructor(t,Object.prototype);return Call(r,n,o)}function ArraySpeciesCreate(e,r){if(0===r&&1/r==-Infinity&&(r=0),!1===IsArray(e)){ return ArrayCreate(r); }var n=Get(e,"constructor");if("object"===Type(n)&&null===(n="Symbol"in self&&"species"in self.Symbol?Get(n,self.Symbol.species):undefined$1)&&(n=undefined$1),n===undefined$1){ return ArrayCreate(r); }if(!IsConstructor(n)){ throw new TypeError("C must be a constructor"); }return Construct(n,[r])}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}function FlattenIntoArray(r,t,e,a,n){
  var arguments$1 = arguments;
  for(var o=arguments[5],i=arguments[6],l=a,g=0;g<e;){var h=ToString(g);if(!0===HasProperty(t,h)){var y=Get(t,h);5 in arguments$1&&(y=Call(o,i,[y,g,t]));var f=!1;if(n>0&&(f=IsArray(y)),!0===f){l=FlattenIntoArray(r,y,ToLength(Get(y,"length")),l,n-1);}else {if(l>=Math.pow(2,53)-1){ throw new TypeError("targetIndex is greater than or equal to 2^53-1"); }CreateDataPropertyOrThrow(r,ToString(l),y),l+=1;}}g+=1;}return l}CreateMethodProperty(Array.prototype,"flat",function t(){var t=arguments[0],e=ToObject(this),r=ToLength(Get(e,"length")),o=1;void 0!==t&&(o=ToInteger(t));var a=ArraySpeciesCreate(e,0);return FlattenIntoArray(a,e,r,0,o),a});})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();CreateMethodProperty(Object,"assign",function e(t,r){var n=ToObject(t);if(1===arguments.length){ return n; }var o,c,a,l,i=Array.prototype.slice.call(arguments,1);for(o=0;o<i.length;o++){var p=i[o];for(p===undefined$1||null===p?a=[]:(l="[object String]"===Object.prototype.toString.call(p)?String(p).split(""):ToObject(p),a=Object.keys(l)),c=0;c<a.length;c++){var b,y=a[c];try{var g=Object.getOwnPropertyDescriptor(l,y);b=g!==undefined$1&&!0===g.enumerable;}catch(u){b=Object.prototype.propertyIsEnumerable.call(l,y);}if(b){var j=Get(l,y);n[y]=j;}}}return n});})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();function EnumerableOwnProperties(e,r){for(var t=Object.keys(e),n=[],s=t.length,a=0;a<s;a++){var i=t[a];if("string"===Type(i)){var u=Object.getOwnPropertyDescriptor(e,i);if(u&&u.enumerable){ if("key"===r){ n.push(i); }else {var p=Get(e,i);if("value"===r){ n.push(p); }else {var f=[i,p];n.push(f);}} }}}return n}!function(){var e={}.toString,t="".split;CreateMethodProperty(Object,"entries",function r(n){var i=ToObject(n);return i=("string"===Type(i)||i instanceof String)&&"[object String]"==e.call(n)?t.call(n,""):Object(n),EnumerableOwnProperties(i,"key+value")});}();})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateDataProperty(e,r,t){var a={value:t,writable:!0,enumerable:!0,configurable:!0};try{return Object.defineProperty(e,r,a),!0}catch(n){return !1}}function CreateDataPropertyOrThrow(t,r,o){var e=CreateDataProperty(t,r,o);if(!e){ throw new TypeError("Cannot assign value `"+Object.prototype.toString.call(o)+"` to property `"+Object.prototype.toString.call(r)+"` on object `"+Object.prototype.toString.call(t)+"`"); }return e}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function RequireObjectCoercible(e){if(null===e||e===undefined$1){ throw TypeError(Object.prototype.toString.call(e)+" is not coercible to Object."); }return e}function SameValueNonNumber(e,n){return e===n}function ToBoolean(o){return Boolean(o)}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function IsRegExp(e){if("object"!==Type(e)){ return !1; }var n="Symbol"in self&&"match"in self.Symbol?Get(e,self.Symbol.match):undefined$1;if(n!==undefined$1){ return ToBoolean(n); }try{var t=e.lastIndex;return e.lastIndex=0,RegExp.prototype.exec.call(e),!0}catch(l){}finally{e.lastIndex=t;}return !1}function IteratorClose(r,t){if("object"!==Type(r["[[Iterator]]"])){ throw new Error(Object.prototype.toString.call(r["[[Iterator]]"])+"is not an Object."); }var e=r["[[Iterator]]"],o=GetMethod(e,"return");if(o===undefined$1){ return t; }try{var n=Call(o,e);}catch(c){var a=c;}if(t){ return t; }if(a){ throw a; }if("object"!==Type(n)){ throw new TypeError("Iterator's return method returned a non-object."); }return t}function IteratorComplete(t){if("object"!==Type(t)){ throw new Error(Object.prototype.toString.call(t)+"is not an Object."); }return ToBoolean(Get(t,"done"))}function IteratorNext(t){if(arguments.length<2){ var e=Call(t["[[NextMethod]]"],t["[[Iterator]]"]); }else { e=Call(t["[[NextMethod]]"],t["[[Iterator]]"],[arguments[1]]); }if("object"!==Type(e)){ throw new TypeError("bad iterator"); }return e}function IteratorStep(t){var r=IteratorNext(t);return !0!==IteratorComplete(r)&&r}function IteratorValue(t){if("object"!==Type(t)){ throw new Error(Object.prototype.toString.call(t)+"is not an Object."); }return Get(t,"value")}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(n,e){return Type(n)===Type(e)&&("number"===Type(n)?!(!isNaN(n)||!isNaN(e))||(1/n===Infinity&&1/e==-Infinity||(1/n==-Infinity&&1/e===Infinity||n===e)):SameValueNonNumber(n,e))}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}CreateMethodProperty(Array.prototype,"includes",function e(r){var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o){ return !1; }var n=ToInteger(arguments[1]);if(n>=0){ var a=n; }else { (a=o+n)<0&&(a=0); }for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i)){ return !0; }a+=1;}return !1});!function(){var t={}.toString,e="".split,r=[].concat,o=Object.prototype.hasOwnProperty,c=Object.getOwnPropertyNames||Object.keys,n="object"==typeof self?c(self):[];CreateMethodProperty(Object,"getOwnPropertyNames",function l(a){var p=ToObject(a);if("[object Window]"===t.call(p)){ try{return c(p)}catch(j){return r.call([],n)} }p="[object String]"==t.call(p)?e.call(p,""):Object(p);for(var i=c(p),s=["length","prototype"],O=0;O<s.length;O++){var b=s[O];o.call(p,b)&&!i.includes(b)&&i.push(b);}if(i.includes("__proto__")){var f=i.indexOf("__proto__");i.splice(f,1);}return i});}();CreateMethodProperty(String.prototype,"includes",function e(t){var r=arguments.length>1?arguments[1]:undefined$1,n=RequireObjectCoercible(this),i=ToString(n);if(IsRegExp(t)){ throw new TypeError("First argument to String.prototype.includes must not be a regular expression"); }var o=ToString(t),g=ToInteger(r),a=i.length,p=Math.min(Math.max(g,0),a);return -1!==String.prototype.indexOf.call(i,o,p)});function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();CreateMethodProperty(Object,"assign",function e(t,r){var n=ToObject(t);if(1===arguments.length){ return n; }var o,c,a,l,i=Array.prototype.slice.call(arguments,1);for(o=0;o<i.length;o++){var p=i[o];for(p===undefined$1||null===p?a=[]:(l="[object String]"===Object.prototype.toString.call(p)?String(p).split(""):ToObject(p),a=Object.keys(l)),c=0;c<a.length;c++){var b,y=a[c];try{var g=Object.getOwnPropertyDescriptor(l,y);b=g!==undefined$1&&!0===g.enumerable;}catch(u){b=Object.prototype.propertyIsEnumerable.call(l,y);}if(b){var j=Get(l,y);n[y]=j;}}}return n});!function(){if(!Object.setPrototypeOf){var t,e,o=Object.getOwnPropertyNames,r=Object.getOwnPropertyDescriptor,n=Object.create,c=Object.defineProperty,_=Object.getPrototypeOf,f=Object.prototype,p=function(t,e){return o(e).forEach(function(o){c(t,o,r(e,o));}),t},O=function i(t,e){return p(n(e),t)};try{t=r(f,"__proto__").set,t.call({},null),e=function a(e,o){return t.call(e,o),e};}catch(u){t={__proto__:null},t instanceof Object?e=O:(t.__proto__=f,e=t instanceof Object?function o(t,e){return t.__proto__=e,t}:function r(t,e){return _(t)?(t.__proto__=e,t):O(t,e)});}CreateMethodProperty(Object,"setPrototypeOf",e);}}();!function(e,r,n){function t(e){if("symbol"===Type(e)){ return e; }throw TypeError(e+" is not a symbol")}var u,o=function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}(),i=0,a=""+Math.random(),c="__symbol:",l=c.length,f="__symbol@@"+a,s={},v="defineProperty",y="defineProperties",b="getOwnPropertyNames",p="getOwnPropertyDescriptor",h="propertyIsEnumerable",m=e.prototype,d=m.hasOwnProperty,g=m[h],w=m.toString,S=Array.prototype.concat,P=e.getOwnPropertyNames?e.getOwnPropertyNames(self):[],O=e[b],j=function $(e){if("[object Window]"===w.call(e)){ try{return O(e)}catch(r){return S.call([],P)} }return O(e)},E=e[p],N=e.create,T=e.keys,_=e.freeze||e,k=e[v],F=e[y],I=E(e,b),x=function(e,r,n){if(!d.call(e,f)){ try{k(e,f,{enumerable:!1,configurable:!1,writable:!1,value:{}});}catch(t){e[f]={};} }e[f]["@@"+r]=n;},z=function(e,r){var n=N(e);return j(r).forEach(function(e){q.call(r,e)&&L(n,e,r[e]);}),n},A=function(e){var r=N(e);return r.enumerable=!1,r},D=function ee(){},M=function(e){return e!=f&&!d.call(H,e)},W=function(e){return e!=f&&d.call(H,e)},q=function re(e){var r=""+e;return W(r)?d.call(this,r)&&this[f]&&this[f]["@@"+r]:g.call(this,e)},B=function(r){var n={enumerable:!1,configurable:!0,get:D,set:function(e){u(this,r,{enumerable:!1,configurable:!0,writable:!0,value:e}),x(this,r,!0);}};try{k(m,r,n);}catch(o){m[r]=n.value;}H[r]=k(e(r),"constructor",J);var t=E(G.prototype,"description");return t&&k(H[r],"description",t),_(H[r])},C=function(e){var r=t(e);if(Y){var n=V(r);if(""!==n){ return n.slice(1,-1) }}if(s[r]!==undefined$1){ return s[r]; }var u=r.toString(),o=u.lastIndexOf("0.");return u=u.slice(10,o),""===u?undefined$1:u},G=function ne(){var r=arguments[0];if(this instanceof ne){ throw new TypeError("Symbol is not a constructor"); }var n=c.concat(r||"",a,++i);r===undefined$1||null!==r&&!isNaN(r)&&""!==String(r)||(s[n]=String(r));var t=B(n);return o||e.defineProperty(t,"description",{configurable:!0,enumerable:!1,value:C(t)}),t},H=N(null),J={value:G},K=function(e){return H[e]},L=function te(e,r,n){var t=""+r;return W(t)?(u(e,t,n.enumerable?A(n):n),x(e,t,!!n.enumerable)):k(e,r,n),e},Q=function(e){return function(r){return d.call(e,f)&&d.call(e[f],"@@"+r)}},R=function ue(e){return j(e).filter(e===m?Q(e):W).map(K)};I.value=L,k(e,v,I),I.value=R,k(e,"getOwnPropertySymbols",I),I.value=function oe(e){return j(e).filter(M)},k(e,b,I),I.value=function ie(e,r){var n=R(r);return n.length?T(r).concat(n).forEach(function(n){q.call(r,n)&&L(e,n,r[n]);}):F(e,r),e},k(e,y,I),I.value=q,k(m,h,I),I.value=G,k(n,"Symbol",I),I.value=function(e){var r=c.concat(c,e,a);return r in m?H[r]:B(r)},k(G,"for",I),I.value=function(e){if(M(e)){ throw new TypeError(e+" is not a symbol"); }return d.call(H,e)?e.slice(2*l,-a.length):void 0},k(G,"keyFor",I),I.value=function ae(e,r){var n=E(e,r);return n&&W(r)&&(n.enumerable=q.call(e,r)),n},k(e,p,I),I.value=function ce(e,r){return 1===arguments.length||void 0===r?N(e):z(e,r)},k(e,"create",I);var U=null===function(){return this}.call(null);if(I.value=U?function(){var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e}:function(){if(this===window){ return "[object Null]"; }var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e},k(m,"toString",I),u=function(e,r,n){var t=E(m,r);delete m[r],k(e,r,n),e!==m&&k(m,r,t);},function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}()){var V;try{V=Function("s","var v = s.valueOf(); return { [v]() {} }[v].name;");}catch(Z){}var X=function(){},Y=V&&"inferred"===X.name?V:null;e.defineProperty(n.Symbol.prototype,"description",{configurable:!0,enumerable:!1,get:function(){return C(this)}});}}(Object,0,self);Object.defineProperty(self.Symbol,"iterator",{value:self.Symbol("iterator")});function GetIterator(t){var e=arguments.length>1?arguments[1]:GetMethod(t,Symbol.iterator),r=Call(e,t);if("object"!==Type(r)){ throw new TypeError("bad iterator"); }var o=GetV(r,"next"),a=Object.create(null);return a["[[Iterator]]"]=r,a["[[NextMethod]]"]=o,a["[[Done]]"]=!1,a}var AddEntriesFromIterable=function(){var r={}.toString,t="".split;return function e(a,o,n){if(!1===IsCallable(n)){ throw new TypeError("adder is not callable."); }for(var l=GetIterator(o);;){var c=IteratorStep(l);if(!1===c){ return a; }var i=IteratorValue(c);if("object"!==Type(i)){var s=new TypeError("nextItem is not an object");throw IteratorClose(l,s),s}i=("string"===Type(i)||i instanceof String)&&"[object String]"==r.call(i)?t.call(i,""):i;var I;try{I=Get(i,"0");}catch(I$1){return IteratorClose(l,I$1)}var u;try{u=Get(i,"1");}catch(u$1){return IteratorClose(l,u$1)}try{Call(n,a,[I,u]);}catch(v){return IteratorClose(l,v)}}}}();Object.defineProperty(Symbol,"toStringTag",{value:Symbol("toStringTag")});var Iterator=function(){var e=function(){return this.length=0,this},t=function(e){if("function"!=typeof e){ throw new TypeError(e+" is not a function"); }return e},_=function(e,n){if(!(this instanceof _)){ return new _(e,n); }Object.defineProperties(this,{__list__:{writable:!0,value:e},__context__:{writable:!0,value:n},__nextIndex__:{writable:!0,value:0}}),n&&(t(n.on),n.on("_add",this._onAdd.bind(this)),n.on("_delete",this._onDelete.bind(this)),n.on("_clear",this._onClear.bind(this)));};return Object.defineProperties(_.prototype,Object.assign({constructor:{value:_,configurable:!0,enumerable:!1,writable:!0},_next:{value:function(){var e;if(this.__list__){ return this.__redo__&&(e=this.__redo__.shift())!==undefined$1?e:this.__nextIndex__<this.__list__.length?this.__nextIndex__++:void this._unBind() }},configurable:!0,enumerable:!1,writable:!0},next:{value:function(){return this._createResult(this._next())},configurable:!0,enumerable:!1,writable:!0},_createResult:{value:function(e){return e===undefined$1?{done:!0,value:undefined$1}:{done:!1,value:this._resolve(e)}},configurable:!0,enumerable:!1,writable:!0},_resolve:{value:function(e){return this.__list__[e]},configurable:!0,enumerable:!1,writable:!0},_unBind:{value:function(){this.__list__=null,delete this.__redo__,this.__context__&&(this.__context__.off("_add",this._onAdd.bind(this)),this.__context__.off("_delete",this._onDelete.bind(this)),this.__context__.off("_clear",this._onClear.bind(this)),this.__context__=null);},configurable:!0,enumerable:!1,writable:!0},toString:{value:function(){return "[object Iterator]"},configurable:!0,enumerable:!1,writable:!0}},{_onAdd:{value:function(e){if(!(e>=this.__nextIndex__)){if(++this.__nextIndex__,!this.__redo__){ return void Object.defineProperty(this,"__redo__",{value:[e],configurable:!0,enumerable:!1,writable:!1}); }this.__redo__.forEach(function(t,_){t>=e&&(this.__redo__[_]=++t);},this),this.__redo__.push(e);}},configurable:!0,enumerable:!1,writable:!0},_onDelete:{value:function(e){var t;e>=this.__nextIndex__||(--this.__nextIndex__,this.__redo__&&(t=this.__redo__.indexOf(e),-1!==t&&this.__redo__.splice(t,1),this.__redo__.forEach(function(t,_){t>e&&(this.__redo__[_]=--t);},this)));},configurable:!0,enumerable:!1,writable:!0},_onClear:{value:function(){this.__redo__&&e.call(this.__redo__),this.__nextIndex__=0;},configurable:!0,enumerable:!1,writable:!0}})),Object.defineProperty(_.prototype,Symbol.iterator,{value:function(){return this},configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(_.prototype,Symbol.toStringTag,{value:"Iterator",configurable:!1,enumerable:!1,writable:!0}),_}();var ArrayIterator=function(){var e=function(t,r){if(!(this instanceof e)){ return new e(t,r); }Iterator.call(this,t),r=r?String.prototype.includes.call(r,"key+value")?"key+value":String.prototype.includes.call(r,"key")?"key":"value":"value",Object.defineProperty(this,"__kind__",{value:r,configurable:!1,enumerable:!1,writable:!1});};return Object.setPrototypeOf&&Object.setPrototypeOf(e,Iterator.prototype),e.prototype=Object.create(Iterator.prototype,{constructor:{value:e,configurable:!0,enumerable:!1,writable:!0},_resolve:{value:function(e){return "value"===this.__kind__?this.__list__[e]:"key+value"===this.__kind__?[e,this.__list__[e]]:e},configurable:!0,enumerable:!1,writable:!0},toString:{value:function(){return "[object Array Iterator]"},configurable:!0,enumerable:!1,writable:!0}}),e}();"Symbol"in self&&"iterator"in Symbol&&"function"==typeof Array.prototype[Symbol.iterator]?CreateMethodProperty(Array.prototype,"values",Array.prototype[Symbol.iterator]):CreateMethodProperty(Array.prototype,"values",function r(){var r=ToObject(this);return new ArrayIterator(r,"value")});CreateMethodProperty(Array.prototype,Symbol.iterator,Array.prototype.values);CreateMethodProperty(Object,"fromEntries",function r(e){RequireObjectCoercible(e);var t={},o=function(r,e){var t=this,o=ToPropertyKey(r);CreateDataPropertyOrThrow(t,o,e);};return AddEntriesFromIterable(t,e,o)});})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}!function(){var t={}.toString,e="".split;CreateMethodProperty(Object,"values",function r(n){var c="[object String]"==t.call(n)?e.call(n,""):ToObject(n);return Object.keys(c).map(function(t){return c[t]})});}();})();

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function SameValueNonNumber(e,n){return e===n}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(n,e){return Type(n)===Type(e)&&("number"===Type(n)?!(!isNaN(n)||!isNaN(e))||(1/n===Infinity&&1/e==-Infinity||(1/n==-Infinity&&1/e===Infinity||n===e)):SameValueNonNumber(n,e))}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}CreateMethodProperty(Array.prototype,"includes",function e(r){var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o){ return !1; }var n=ToInteger(arguments[1]);if(n>=0){ var a=n; }else { (a=o+n)<0&&(a=0); }for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i)){ return !0; }a+=1;}return !1});!function(){var t={}.toString,e="".split,r=[].concat,o=Object.prototype.hasOwnProperty,c=Object.getOwnPropertyNames||Object.keys,n="object"==typeof self?c(self):[];CreateMethodProperty(Object,"getOwnPropertyNames",function l(a){var p=ToObject(a);if("[object Window]"===t.call(p)){ try{return c(p)}catch(j){return r.call([],n)} }p="[object String]"==t.call(p)?e.call(p,""):Object(p);for(var i=c(p),s=["length","prototype"],O=0;O<s.length;O++){var b=s[O];o.call(p,b)&&!i.includes(b)&&i.push(b);}if(i.includes("__proto__")){var f=i.indexOf("__proto__");i.splice(f,1);}return i});}();function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();!function(e,r,n){function t(e){if("symbol"===Type(e)){ return e; }throw TypeError(e+" is not a symbol")}var u,o=function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}(),i=0,a=""+Math.random(),c="__symbol:",l=c.length,f="__symbol@@"+a,s={},v="defineProperty",y="defineProperties",b="getOwnPropertyNames",p="getOwnPropertyDescriptor",h="propertyIsEnumerable",m=e.prototype,d=m.hasOwnProperty,g=m[h],w=m.toString,S=Array.prototype.concat,P=e.getOwnPropertyNames?e.getOwnPropertyNames(self):[],O=e[b],j=function $(e){if("[object Window]"===w.call(e)){ try{return O(e)}catch(r){return S.call([],P)} }return O(e)},E=e[p],N=e.create,T=e.keys,_=e.freeze||e,k=e[v],F=e[y],I=E(e,b),x=function(e,r,n){if(!d.call(e,f)){ try{k(e,f,{enumerable:!1,configurable:!1,writable:!1,value:{}});}catch(t){e[f]={};} }e[f]["@@"+r]=n;},z=function(e,r){var n=N(e);return j(r).forEach(function(e){q.call(r,e)&&L(n,e,r[e]);}),n},A=function(e){var r=N(e);return r.enumerable=!1,r},D=function ee(){},M=function(e){return e!=f&&!d.call(H,e)},W=function(e){return e!=f&&d.call(H,e)},q=function re(e){var r=""+e;return W(r)?d.call(this,r)&&this[f]&&this[f]["@@"+r]:g.call(this,e)},B=function(r){var n={enumerable:!1,configurable:!0,get:D,set:function(e){u(this,r,{enumerable:!1,configurable:!0,writable:!0,value:e}),x(this,r,!0);}};try{k(m,r,n);}catch(o){m[r]=n.value;}H[r]=k(e(r),"constructor",J);var t=E(G.prototype,"description");return t&&k(H[r],"description",t),_(H[r])},C=function(e){var r=t(e);if(Y){var n=V(r);if(""!==n){ return n.slice(1,-1) }}if(s[r]!==undefined$1){ return s[r]; }var u=r.toString(),o=u.lastIndexOf("0.");return u=u.slice(10,o),""===u?undefined$1:u},G=function ne(){var r=arguments[0];if(this instanceof ne){ throw new TypeError("Symbol is not a constructor"); }var n=c.concat(r||"",a,++i);r===undefined$1||null!==r&&!isNaN(r)&&""!==String(r)||(s[n]=String(r));var t=B(n);return o||e.defineProperty(t,"description",{configurable:!0,enumerable:!1,value:C(t)}),t},H=N(null),J={value:G},K=function(e){return H[e]},L=function te(e,r,n){var t=""+r;return W(t)?(u(e,t,n.enumerable?A(n):n),x(e,t,!!n.enumerable)):k(e,r,n),e},Q=function(e){return function(r){return d.call(e,f)&&d.call(e[f],"@@"+r)}},R=function ue(e){return j(e).filter(e===m?Q(e):W).map(K)};I.value=L,k(e,v,I),I.value=R,k(e,"getOwnPropertySymbols",I),I.value=function oe(e){return j(e).filter(M)},k(e,b,I),I.value=function ie(e,r){var n=R(r);return n.length?T(r).concat(n).forEach(function(n){q.call(r,n)&&L(e,n,r[n]);}):F(e,r),e},k(e,y,I),I.value=q,k(m,h,I),I.value=G,k(n,"Symbol",I),I.value=function(e){var r=c.concat(c,e,a);return r in m?H[r]:B(r)},k(G,"for",I),I.value=function(e){if(M(e)){ throw new TypeError(e+" is not a symbol"); }return d.call(H,e)?e.slice(2*l,-a.length):void 0},k(G,"keyFor",I),I.value=function ae(e,r){var n=E(e,r);return n&&W(r)&&(n.enumerable=q.call(e,r)),n},k(e,p,I),I.value=function ce(e,r){return 1===arguments.length||void 0===r?N(e):z(e,r)},k(e,"create",I);var U=null===function(){return this}.call(null);if(I.value=U?function(){var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e}:function(){if(this===window){ return "[object Null]"; }var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e},k(m,"toString",I),u=function(e,r,n){var t=E(m,r);delete m[r],k(e,r,n),e!==m&&k(m,r,t);},function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}()){var V;try{V=Function("s","var v = s.valueOf(); return { [v]() {} }[v].name;");}catch(Z){}var X=function(){},Y=V&&"inferred"===X.name?V:null;e.defineProperty(n.Symbol.prototype,"description",{configurable:!0,enumerable:!1,get:function(){return C(this)}});}}(Object,0,self);})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {Element.prototype.matches=Element.prototype.webkitMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.mozMatchesSelector||function e(t){for(var o=this,r=(o.document||o.ownerDocument).querySelectorAll(t),c=0;r[c]&&r[c]!==o;){ ++c; }return !!r[c]};Element.prototype.closest=function e(n){for(var t=this;t;){if(t.matches(n)){ return t; }t="SVGElement"in window&&t instanceof SVGElement?t.parentNode:t.parentElement;}return null};})();

  /* Polyfill service v3.111.0
   * Disable minification (remove `.min` from URL path) for more info */

  (function(self, undefined$1) {function ArrayCreate(r){if(1/r==-Infinity&&(r=0),r>Math.pow(2,32)-1){ throw new RangeError("Invalid array length"); }var n=[];return n.length=r,n}function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t)){ throw new TypeError(Object.prototype.toString.call(t)+"is not a function."); }return t.apply(l,n)}function CreateDataProperty(e,r,t){var a={value:t,writable:!0,enumerable:!0,configurable:!0};try{return Object.defineProperty(e,r,a),!0}catch(n){return !1}}function CreateDataPropertyOrThrow(t,r,o){var e=CreateDataProperty(t,r,o);if(!e){ throw new TypeError("Cannot assign value `"+Object.prototype.toString.call(o)+"` to property `"+Object.prototype.toString.call(r)+"` on object `"+Object.prototype.toString.call(t)+"`"); }return e}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a);}CreateMethodProperty(Object,"keys",function(){function t(){var t;try{t=Object.create({});}catch(r){return !0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window){ return !1; }for(var t in window){ try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t]){ try{u(window[t]);}catch(r){return !0} }}catch(r$1){return !0} }return !1}(),p=function(t){if("undefined"==typeof window||!f){ return u(t); }try{return u(t)}catch(r){return !1}};return function s(o){var u="[object Function]"===n.call(o),a=r(o),f="[object String]"===n.call(o),s=[];if(o===undefined$1||null===o){ throw new TypeError("Cannot convert undefined or null to object"); }var y=l&&u;if(f&&o.length>0&&!e.call(o,0)){ for(var h=0;h<o.length;++h){ s.push(String(h)); } }if(a&&o.length>0){ for(var g=0;g<o.length;++g){ s.push(String(g)); } }else { for(var w in o){ t()&&"__proto__"===w||y&&"prototype"===w||!e.call(o,w)||s.push(String(w)); } }if(c){ for(var d=p(o),$=0;$<i.length;++$){ d&&"constructor"===i[$]||!e.call(o,i[$])||s.push(i[$]); } }return s}}());function Get(n,t){return n[t]}function HasOwnProperty(r,t){return Object.prototype.hasOwnProperty.call(r,t)}function IsCallable(n){return "function"==typeof n}function SameValueNonNumber(e,n){return e===n}function ToBoolean(o){return Boolean(o)}function ToObject(e){if(null===e||e===undefined$1){ throw TypeError(); }return Object(e)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,n){var r=GetV(e,n);if(null===r||r===undefined$1){ return undefined$1; }if(!1===IsCallable(r)){ throw new TypeError("Method not callable: "+n); }return r}function Type(e){switch(typeof e){case"undefined":return "undefined";case"boolean":return "boolean";case"number":return "number";case"string":return "string";case"symbol":return "symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}!function(e){CreateMethodProperty(Object,"isExtensible",function t(n){return "object"===Type(n)&&(!e||e(n))});}(Object.isExtensible);function CreateIterResultObject(e,r){if("boolean"!==Type(r)){ throw new Error; }var t={};return CreateDataProperty(t,"value",e),CreateDataProperty(t,"done",r),t}function GetPrototypeFromConstructor(t,o){var r=Get(t,"prototype");return "object"!==Type(r)&&(r=o),r}function OrdinaryCreateFromConstructor(r,e){var t=arguments[2]||{},o=GetPrototypeFromConstructor(r,e),a=Object.create(o);for(var n in t){ Object.prototype.hasOwnProperty.call(t,n)&&Object.defineProperty(a,n,{configurable:!0,enumerable:!1,writable:!0,value:t[n]}); }return a}function IsConstructor(t){return "object"===Type(t)&&("function"==typeof t&&!!t.prototype)}function Construct(r){var t=arguments.length>2?arguments[2]:r,o=arguments.length>1?arguments[1]:[];if(!IsConstructor(r)){ throw new TypeError("F must be a constructor."); }if(!IsConstructor(t)){ throw new TypeError("newTarget must be a constructor."); }if(t===r){ return new(Function.prototype.bind.apply(r,[null].concat(o))); }var n=OrdinaryCreateFromConstructor(t,Object.prototype);return Call(r,n,o)}function IteratorClose(r,t){if("object"!==Type(r["[[Iterator]]"])){ throw new Error(Object.prototype.toString.call(r["[[Iterator]]"])+"is not an Object."); }var e=r["[[Iterator]]"],o=GetMethod(e,"return");if(o===undefined$1){ return t; }try{var n=Call(o,e);}catch(c){var a=c;}if(t){ return t; }if(a){ throw a; }if("object"!==Type(n)){ throw new TypeError("Iterator's return method returned a non-object."); }return t}function IteratorComplete(t){if("object"!==Type(t)){ throw new Error(Object.prototype.toString.call(t)+"is not an Object."); }return ToBoolean(Get(t,"done"))}function IteratorNext(t){if(arguments.length<2){ var e=Call(t["[[NextMethod]]"],t["[[Iterator]]"]); }else { e=Call(t["[[NextMethod]]"],t["[[Iterator]]"],[arguments[1]]); }if("object"!==Type(e)){ throw new TypeError("bad iterator"); }return e}function IteratorStep(t){var r=IteratorNext(t);return !0!==IteratorComplete(r)&&r}function IteratorValue(t){if("object"!==Type(t)){ throw new Error(Object.prototype.toString.call(t)+"is not an Object."); }return Get(t,"value")}function OrdinaryToPrimitive(r,t){if("string"===t){ var e=["toString","valueOf"]; }else { e=["valueOf","toString"]; }for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o)){ return o }}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(n,e){return Type(n)===Type(e)&&("number"===Type(n)?!(!isNaN(n)||!isNaN(e))||(1/n===Infinity&&1/e==-Infinity||(1/n==-Infinity&&1/e===Infinity||n===e)):SameValueNonNumber(n,e))}function ToInteger(n){if("symbol"===Type(n)){ throw new TypeError("Cannot convert a Symbol value to a number"); }var t=Number(n);return isNaN(t)?0:1/t===Infinity||1/t==-Infinity||t===Infinity||t===-Infinity?t:(t<0?-1:1)*Math.floor(Math.abs(t))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:undefined$1;if("object"===Type(e)){if(arguments.length<2){ var i="default"; }else { t===String?i="string":t===Number&&(i="number"); }var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):undefined$1;if(r!==undefined$1){var n=Call(r,e,[i]);if("object"!==Type(n)){ return n; }throw new TypeError("Cannot convert exotic object to primitive.")}return "default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}CreateMethodProperty(Array.prototype,"includes",function e(r){var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o){ return !1; }var n=ToInteger(arguments[1]);if(n>=0){ var a=n; }else { (a=o+n)<0&&(a=0); }for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i)){ return !0; }a+=1;}return !1});!function(){var t={}.toString,e="".split,r=[].concat,o=Object.prototype.hasOwnProperty,c=Object.getOwnPropertyNames||Object.keys,n="object"==typeof self?c(self):[];CreateMethodProperty(Object,"getOwnPropertyNames",function l(a){var p=ToObject(a);if("[object Window]"===t.call(p)){ try{return c(p)}catch(j){return r.call([],n)} }p="[object String]"==t.call(p)?e.call(p,""):Object(p);for(var i=c(p),s=["length","prototype"],O=0;O<s.length;O++){var b=s[O];o.call(p,b)&&!i.includes(b)&&i.push(b);}if(i.includes("__proto__")){var f=i.indexOf("__proto__");i.splice(f,1);}return i});}();function ToPropertyKey(r){var i=ToPrimitive(r,String);return "symbol"===Type(i)?i:ToString(i)}!function(){var e=Object.getOwnPropertyDescriptor,t=function(){try{return 1===Object.defineProperty(document.createElement("div"),"one",{get:function(){return 1}}).one}catch(e){return !1}},r={}.toString,n="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function c(o,i){var a=ToObject(o);a=("string"===Type(a)||a instanceof String)&&"[object String]"==r.call(o)?n.call(o,""):Object(o);var u=ToPropertyKey(i);if(t){ try{return e(a,u)}catch(l){} }if(HasOwnProperty(a,u)){ return {enumerable:!0,configurable:!0,writable:!0,value:a[u]} }});}();!function(e,r,n){function t(e){if("symbol"===Type(e)){ return e; }throw TypeError(e+" is not a symbol")}var u,o=function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}(),i=0,a=""+Math.random(),c="__symbol:",l=c.length,f="__symbol@@"+a,s={},v="defineProperty",y="defineProperties",b="getOwnPropertyNames",p="getOwnPropertyDescriptor",h="propertyIsEnumerable",m=e.prototype,d=m.hasOwnProperty,g=m[h],w=m.toString,S=Array.prototype.concat,P=e.getOwnPropertyNames?e.getOwnPropertyNames(self):[],O=e[b],j=function $(e){if("[object Window]"===w.call(e)){ try{return O(e)}catch(r){return S.call([],P)} }return O(e)},E=e[p],N=e.create,T=e.keys,_=e.freeze||e,k=e[v],F=e[y],I=E(e,b),x=function(e,r,n){if(!d.call(e,f)){ try{k(e,f,{enumerable:!1,configurable:!1,writable:!1,value:{}});}catch(t){e[f]={};} }e[f]["@@"+r]=n;},z=function(e,r){var n=N(e);return j(r).forEach(function(e){q.call(r,e)&&L(n,e,r[e]);}),n},A=function(e){var r=N(e);return r.enumerable=!1,r},D=function ee(){},M=function(e){return e!=f&&!d.call(H,e)},W=function(e){return e!=f&&d.call(H,e)},q=function re(e){var r=""+e;return W(r)?d.call(this,r)&&this[f]&&this[f]["@@"+r]:g.call(this,e)},B=function(r){var n={enumerable:!1,configurable:!0,get:D,set:function(e){u(this,r,{enumerable:!1,configurable:!0,writable:!0,value:e}),x(this,r,!0);}};try{k(m,r,n);}catch(o){m[r]=n.value;}H[r]=k(e(r),"constructor",J);var t=E(G.prototype,"description");return t&&k(H[r],"description",t),_(H[r])},C=function(e){var r=t(e);if(Y){var n=V(r);if(""!==n){ return n.slice(1,-1) }}if(s[r]!==undefined$1){ return s[r]; }var u=r.toString(),o=u.lastIndexOf("0.");return u=u.slice(10,o),""===u?undefined$1:u},G=function ne(){var r=arguments[0];if(this instanceof ne){ throw new TypeError("Symbol is not a constructor"); }var n=c.concat(r||"",a,++i);r===undefined$1||null!==r&&!isNaN(r)&&""!==String(r)||(s[n]=String(r));var t=B(n);return o||e.defineProperty(t,"description",{configurable:!0,enumerable:!1,value:C(t)}),t},H=N(null),J={value:G},K=function(e){return H[e]},L=function te(e,r,n){var t=""+r;return W(t)?(u(e,t,n.enumerable?A(n):n),x(e,t,!!n.enumerable)):k(e,r,n),e},Q=function(e){return function(r){return d.call(e,f)&&d.call(e[f],"@@"+r)}},R=function ue(e){return j(e).filter(e===m?Q(e):W).map(K)};I.value=L,k(e,v,I),I.value=R,k(e,"getOwnPropertySymbols",I),I.value=function oe(e){return j(e).filter(M)},k(e,b,I),I.value=function ie(e,r){var n=R(r);return n.length?T(r).concat(n).forEach(function(n){q.call(r,n)&&L(e,n,r[n]);}):F(e,r),e},k(e,y,I),I.value=q,k(m,h,I),I.value=G,k(n,"Symbol",I),I.value=function(e){var r=c.concat(c,e,a);return r in m?H[r]:B(r)},k(G,"for",I),I.value=function(e){if(M(e)){ throw new TypeError(e+" is not a symbol"); }return d.call(H,e)?e.slice(2*l,-a.length):void 0},k(G,"keyFor",I),I.value=function ae(e,r){var n=E(e,r);return n&&W(r)&&(n.enumerable=q.call(e,r)),n},k(e,p,I),I.value=function ce(e,r){return 1===arguments.length||void 0===r?N(e):z(e,r)},k(e,"create",I);var U=null===function(){return this}.call(null);if(I.value=U?function(){var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e}:function(){if(this===window){ return "[object Null]"; }var e=w.call(this);return "[object String]"===e&&W(this)?"[object Symbol]":e},k(m,"toString",I),u=function(e,r,n){var t=E(m,r);delete m[r],k(e,r,n),e!==m&&k(m,r,t);},function(){try{var r={};return e.defineProperty(r,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!r.t}catch(n){return !1}}()){var V;try{V=Function("s","var v = s.valueOf(); return { [v]() {} }[v].name;");}catch(Z){}var X=function(){},Y=V&&"inferred"===X.name?V:null;e.defineProperty(n.Symbol.prototype,"description",{configurable:!0,enumerable:!1,get:function(){return C(this)}});}}(Object,0,self);Object.defineProperty(self.Symbol,"iterator",{value:self.Symbol("iterator")});function GetIterator(t){var e=arguments.length>1?arguments[1]:GetMethod(t,Symbol.iterator),r=Call(e,t);if("object"!==Type(r)){ throw new TypeError("bad iterator"); }var o=GetV(r,"next"),a=Object.create(null);return a["[[Iterator]]"]=r,a["[[NextMethod]]"]=o,a["[[Done]]"]=!1,a}Object.defineProperty(Symbol,"species",{value:Symbol("species")});!function(e){function t(e,t){if("object"!==Type(e)){ throw new TypeError("createMapIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Map){ throw new TypeError("createMapIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }var r=Object.create(u);return Object.defineProperty(r,"[[Map]]",{configurable:!0,enumerable:!1,writable:!0,value:e}),Object.defineProperty(r,"[[MapNextIndex]]",{configurable:!0,enumerable:!1,writable:!0,value:0}),Object.defineProperty(r,"[[MapIterationKind]]",{configurable:!0,enumerable:!1,writable:!0,value:t}),r}var r=function(){try{var e={};return Object.defineProperty(e,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!e.t}catch(t){return !1}}(),o=0,a=Symbol("meta_"+(1e8*Math.random()+"").replace(".","")),n=function(e){if("object"==typeof e?null!==e:"function"==typeof e){if(!Object.isExtensible(e)){ return !1; }if(!Object.prototype.hasOwnProperty.call(e,a)){var t=typeof e+"-"+ ++o;Object.defineProperty(e,a,{configurable:!1,enumerable:!1,writable:!1,value:t});}return e[a]}return ""+e},i=function(e,t){var r=n(t);if(!1===r){ return p(e,t); }var o=e._table[r];return o!==undefined$1&&o},p=function(e,t){for(var r=0;r<e._keys.length;r++){var o=e._keys[r];if(o!==c&&SameValueZero(o,t)){ return r }}return !1},l=function(e,t,r){var o=n(t);return !1!==o&&(!1===r?delete e._table[o]:e._table[o]=r,!0)},c=Symbol("undef"),y=function f(){if(!(this instanceof f)){ throw new TypeError('Constructor Map requires "new"'); }var e=OrdinaryCreateFromConstructor(this,f.prototype,{_table:{},_keys:[],_values:[],_size:0,_es6Map:!0});r||Object.defineProperty(e,"size",{configurable:!0,enumerable:!1,writable:!0,value:0});var t=arguments.length>0?arguments[0]:undefined$1;if(null===t||t===undefined$1){ return e; }var o=e.set;if(!IsCallable(o)){ throw new TypeError("Map.prototype.set is not a function"); }try{for(var a=GetIterator(t);;){var n=IteratorStep(a);if(!1===n){ return e; }var i=IteratorValue(n);if("object"!==Type(i)){ try{throw new TypeError("Iterator value "+i+" is not an entry object")}catch(u){return IteratorClose(a,u)} }try{var p=i[0],l=i[1];o.call(e,p,l);}catch(s){return IteratorClose(a,s)}}}catch(s$1){if(Array.isArray(t)||"[object Arguments]"===Object.prototype.toString.call(t)||t.callee){var c,y=t.length;for(c=0;c<y;c++){ o.call(e,t[c][0],t[c][1]); }}}return e};Object.defineProperty(y,"prototype",{configurable:!1,enumerable:!1,writable:!1,value:{}}),r?Object.defineProperty(y,Symbol.species,{configurable:!0,enumerable:!1,get:function(){return this},set:undefined$1}):CreateMethodProperty(y,Symbol.species,y),CreateMethodProperty(y.prototype,"clear",function b(){var e=this;if("object"!==Type(e)){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Map){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }for(var t=e._keys,o=0;o<t.length;o++){ e._keys[o]=c,e._values[o]=c; }return this._size=0,r||(this.size=this._size),this._table={},undefined$1}),CreateMethodProperty(y.prototype,"constructor",y),CreateMethodProperty(y.prototype,"delete",function(e){var t=this;if("object"!==Type(t)){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(t)); }var o=i(t,e);if(!1!==o){var a=t._keys[o];if(a!==c&&SameValueZero(a,e)){ return this._keys[o]=c,this._values[o]=c,this._size=--this._size,r||(this.size=this._size),l(this,e,!1),!0 }}return !1}),CreateMethodProperty(y.prototype,"entries",function h(){return t(this,"key+value")}),CreateMethodProperty(y.prototype,"forEach",function(e){var t=this;if("object"!==Type(t)){ throw new TypeError("Method Map.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!IsCallable(e)){ throw new TypeError(Object.prototype.toString.call(e)+" is not a function."); }if(arguments[1]){ var r=arguments[1]; }for(var o=t._keys,a=0;a<o.length;a++){ t._keys[a]!==c&&t._values[a]!==c&&e.call(r,t._values[a],t._keys[a],t); }return undefined$1}),CreateMethodProperty(y.prototype,"get",function d(e){var t=this;if("object"!==Type(t)){ throw new TypeError("Method Map.prototype.get called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.get called on incompatible receiver "+Object.prototype.toString.call(t)); }var r=i(t,e);if(!1!==r){var o=t._keys[r];if(o!==c&&SameValueZero(o,e)){ return t._values[r] }}return undefined$1}),CreateMethodProperty(y.prototype,"has",function v(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Map.prototype.has called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Map){ throw new TypeError("Method Map.prototype.has called on incompatible receiver "+Object.prototype.toString.call(t)); }var r=i(t,e);if(!1!==r){var o=t._keys[r];if(o!==c&&SameValueZero(o,e)){ return !0 }}return !1}),CreateMethodProperty(y.prototype,"keys",function M(){return t(this,"key")}),CreateMethodProperty(y.prototype,"set",function w(e,t){var o=this;if("object"!==Type(o)){ throw new TypeError("Method Map.prototype.set called on incompatible receiver "+Object.prototype.toString.call(o)); }if(!0!==o._es6Map){ throw new TypeError("Method Map.prototype.set called on incompatible receiver "+Object.prototype.toString.call(o)); }var a=i(o,e);if(!1!==a){ o._values[a]=t; }else {-0===e&&(e=0);var n={"[[Key]]":e,"[[Value]]":t};o._keys.push(n["[[Key]]"]),o._values.push(n["[[Value]]"]),l(o,e,o._keys.length-1),++o._size,r||(o.size=o._size);}return o}),r&&Object.defineProperty(y.prototype,"size",{configurable:!0,enumerable:!1,get:function(){var e=this;if("object"!==Type(e)){ throw new TypeError("Method Map.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Map){ throw new TypeError("Method Map.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }return this._size},set:undefined$1}),CreateMethodProperty(y.prototype,"values",function j(){return t(this,"value")}),CreateMethodProperty(y.prototype,Symbol.iterator,y.prototype.entries),"name"in y||Object.defineProperty(y,"name",{configurable:!0,enumerable:!1,writable:!1,value:"Map"});var u={};Object.defineProperty(u,"isMapIterator",{configurable:!1,enumerable:!1,writable:!1,value:!0}),CreateMethodProperty(u,"next",function _(){var e=this;if("object"!==Type(e)){ throw new TypeError("Method %MapIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!e.isMapIterator){ throw new TypeError("Method %MapIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }var t=e["[[Map]]"],r=e["[[MapNextIndex]]"],o=e["[[MapIterationKind]]"];if(t===undefined$1){ return CreateIterResultObject(undefined$1,!0); }if(!t._es6Map){ throw new Error(Object.prototype.toString.call(t)+" has a [[MapData]] internal slot."); }for(var a=t._keys,n=a.length;r<n;){var i=Object.create(null);if(i["[[Key]]"]=t._keys[r],i["[[Value]]"]=t._values[r],r+=1,e["[[MapNextIndex]]"]=r,i["[[Key]]"]!==c){if("key"===o){ var p=i["[[Key]]"]; }else if("value"===o){ p=i["[[Value]]"]; }else {if("key+value"!==o){ throw new Error; }p=[i["[[Key]]"],i["[[Value]]"]];}return CreateIterResultObject(p,!1)}}return e["[[Map]]"]=undefined$1,CreateIterResultObject(undefined$1,!0)}),CreateMethodProperty(u,Symbol.iterator,function g(){return this});try{CreateMethodProperty(e,"Map",y);}catch(s){e.Map=y;}}(self);!function(e){function t(e,t){if("object"!=typeof e){ throw new TypeError("createSetIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Set){ throw new TypeError("createSetIterator called on incompatible receiver "+Object.prototype.toString.call(e)); }var r=Object.create(i);return Object.defineProperty(r,"[[IteratedSet]]",{configurable:!0,enumerable:!1,writable:!0,value:e}),Object.defineProperty(r,"[[SetNextIndex]]",{configurable:!0,enumerable:!1,writable:!0,value:0}),Object.defineProperty(r,"[[SetIterationKind]]",{configurable:!0,enumerable:!1,writable:!0,value:t}),r}var r=function(){try{var e={};return Object.defineProperty(e,"t",{configurable:!0,enumerable:!1,get:function(){return !0},set:undefined$1}),!!e.t}catch(t){return !1}}(),o=Symbol("undef"),n=function c(){if(!(this instanceof c)){ throw new TypeError('Constructor Set requires "new"'); }var e=OrdinaryCreateFromConstructor(this,c.prototype,{_values:[],_size:0,_es6Set:!0});r||Object.defineProperty(e,"size",{configurable:!0,enumerable:!1,writable:!0,value:0});var t=arguments.length>0?arguments[0]:undefined$1;if(null===t||t===undefined$1){ return e; }var o=e.add;if(!IsCallable(o)){ throw new TypeError("Set.prototype.add is not a function"); }try{for(var n=GetIterator(t);;){var a=IteratorStep(n);if(!1===a){ return e; }var i=IteratorValue(a);try{o.call(e,i);}catch(y){return IteratorClose(n,y)}}}catch(y$1){if(!Array.isArray(t)&&"[object Arguments]"!==Object.prototype.toString.call(t)&&!t.callee){ throw y$1; }var l,p=t.length;for(l=0;l<p;l++){ o.call(e,t[l]); }}return e};Object.defineProperty(n,"prototype",{configurable:!1,enumerable:!1,writable:!1,value:{}}),r?Object.defineProperty(n,Symbol.species,{configurable:!0,enumerable:!1,get:function(){return this},set:undefined$1}):CreateMethodProperty(n,Symbol.species,n),CreateMethodProperty(n.prototype,"add",function p(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.add called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.add called on incompatible receiver "+Object.prototype.toString.call(t)); }for(var n=t._values,a=0;a<n.length;a++){var i=n[a];if(i!==o&&SameValueZero(i,e)){ return t }}return 0===e&&1/e==-Infinity&&(e=0),t._values.push(e),this._size=++this._size,r||(this.size=this._size),t}),CreateMethodProperty(n.prototype,"clear",function y(){var e=this;if("object"!=typeof e){ throw new TypeError("Method Set.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Set){ throw new TypeError("Method Set.prototype.clear called on incompatible receiver "+Object.prototype.toString.call(e)); }for(var t=e._values,n=0;n<t.length;n++){ t[n]=o; }return this._size=0,r||(this.size=this._size),undefined$1}),CreateMethodProperty(n.prototype,"constructor",n),CreateMethodProperty(n.prototype,"delete",function(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.delete called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.delete called on incompatible receiver "+Object.prototype.toString.call(t)); }for(var n=t._values,a=0;a<n.length;a++){var i=n[a];if(i!==o&&SameValueZero(i,e)){ return n[a]=o,this._size=--this._size,r||(this.size=this._size),!0 }}return !1}),CreateMethodProperty(n.prototype,"entries",function u(){return t(this,"key+value")}),CreateMethodProperty(n.prototype,"forEach",function f(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!IsCallable(e)){ throw new TypeError(Object.prototype.toString.call(e)+" is not a function."); }if(arguments[1]){ var r=arguments[1]; }for(var n=t._values,a=0;a<n.length;a++){var i=n[a];i!==o&&e.call(r,i,i,t);}return undefined$1}),CreateMethodProperty(n.prototype,"has",function d(e){var t=this;if("object"!=typeof t){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }if(!0!==t._es6Set){ throw new TypeError("Method Set.prototype.forEach called on incompatible receiver "+Object.prototype.toString.call(t)); }for(var r=t._values,n=0;n<r.length;n++){var a=r[n];if(a!==o&&SameValueZero(a,e)){ return !0 }}return !1});var a=function h(){return t(this,"value")};CreateMethodProperty(n.prototype,"values",a),CreateMethodProperty(n.prototype,"keys",a),r&&Object.defineProperty(n.prototype,"size",{configurable:!0,enumerable:!1,get:function(){var e=this;if("object"!=typeof e){ throw new TypeError("Method Set.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!0!==e._es6Set){ throw new TypeError("Method Set.prototype.size called on incompatible receiver "+Object.prototype.toString.call(e)); }for(var t=e._values,r=0,n=0;n<t.length;n++){t[n]!==o&&(r+=1);}return r},set:undefined$1}),CreateMethodProperty(n.prototype,Symbol.iterator,a),"name"in n||Object.defineProperty(n,"name",{configurable:!0,enumerable:!1,writable:!1,value:"Set"});var i={};Object.defineProperty(i,"isSetIterator",{configurable:!1,enumerable:!1,writable:!1,value:!0}),CreateMethodProperty(i,"next",function b(){var e=this;if("object"!=typeof e){ throw new TypeError("Method %SetIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }if(!e.isSetIterator){ throw new TypeError("Method %SetIteratorPrototype%.next called on incompatible receiver "+Object.prototype.toString.call(e)); }var t=e["[[IteratedSet]]"],r=e["[[SetNextIndex]]"],n=e["[[SetIterationKind]]"];if(t===undefined$1){ return CreateIterResultObject(undefined$1,!0); }if(!t._es6Set){ throw new Error(Object.prototype.toString.call(t)+" does not have [[SetData]] internal slot."); }for(var a=t._values,i=a.length;r<i;){var l=a[r];if(r+=1,e["[[SetNextIndex]]"]=r,l!==o){ return "key+value"===n?CreateIterResultObject([l,l],!1):CreateIterResultObject(l,!1) }}return e["[[IteratedSet]]"]=undefined$1,CreateIterResultObject(undefined$1,!0)}),CreateMethodProperty(i,Symbol.iterator,function s(){return this});try{CreateMethodProperty(e,"Set",n);}catch(l){e.Set=n;}}(self);!function(){function r(r){return "string"==typeof r||"object"==typeof r&&"[object String]"===t.call(r)}var t=Object.prototype.toString,e=String.prototype.match;CreateMethodProperty(Array,"from",function o(t){var o=this,a=arguments.length>1?arguments[1]:undefined$1;if(a===undefined$1){ var n=!1; }else {if(!1===IsCallable(a)){ throw new TypeError(Object.prototype.toString.call(a)+" is not a function."); }var i=arguments.length>2?arguments[2]:undefined$1;if(i!==undefined$1){ var l=i; }else { l=undefined$1; }n=!0;}var u=GetMethod(t,Symbol.iterator);if(u!==undefined$1){if(IsConstructor(o)){ var f=Construct(o); }else { f=ArrayCreate(0); }for(var c=GetIterator(t,u),s=0;;){if(s>=Math.pow(2,53)-1){var h=new TypeError("Iteration count can not be greater than or equal 9007199254740991.");return IteratorClose(c,h)}var y=ToString(s),C=IteratorStep(c);if(!1===C){ return f.length=s,f; }var g=IteratorValue(C);if(n){ try{var p=Call(a,l,[g,s]);}catch(b){return IteratorClose(c,b)} }else { p=g; }try{CreateDataPropertyOrThrow(f,y,p);}catch(b$1){return IteratorClose(c,b$1)}s+=1;}}if(r(t)){ var v=e.call(t,/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g)||[]; }else { v=ToObject(t); }var d=ToLength(Get(v,"length"));for(f=IsConstructor(o)?Construct(o,[d]):ArrayCreate(d),s=0;s<d;){y=ToString(s);var I=Get(v,y);p=!0===n?Call(a,l,[I,s]):I,CreateDataPropertyOrThrow(f,y,p),s+=1;}return f.length=d,f});}();!function(e){function t(t){return !!t&&("Symbol"in e&&"iterator"in e.Symbol&&"function"==typeof t[Symbol.iterator]||!!Array.isArray(t))}!function(){function n(e){var t="",n=!0;return e.forEach(function(e){var r=encodeURIComponent(e.name),a=encodeURIComponent(e.value);n||(t+="&"),t+=r+"="+a,n=!1;}),t.replace(/%20/g,"+")}function r(e){return e.replace(/((%[0-9A-Fa-f]{2})*)/g,function(e,t){return decodeURIComponent(t)})}function a(e,t){var n=e.split("&");t&&-1===n[0].indexOf("=")&&(n[0]="="+n[0]);var a=[];n.forEach(function(e){if(0!==e.length){var t=e.indexOf("=");if(-1!==t){ var n=e.substring(0,t),r=e.substring(t+1); }else { n=e,r=""; }n=n.replace(/\+/g," "),r=r.replace(/\+/g," "),a.push({name:n,value:r});}});var i=[];return a.forEach(function(e){i.push({name:r(e.name),value:r(e.value)});}),i}function i(e){if(c){ return new s(e); }var t=document.createElement("a");return t.href=e,t}function o(e){var r=this;this._list=[],e===undefined$1||null===e||(e instanceof o?this._list=a(String(e)):"object"==typeof e&&t(e)?Array.from(e).forEach(function(e){if(!t(e)){ throw TypeError(); }var n=Array.from(e);if(2!==n.length){ throw TypeError(); }r._list.push({name:String(n[0]),value:String(n[1])});}):"object"==typeof e&&e?Object.keys(e).forEach(function(t){r._list.push({name:String(t),value:String(e[t])});}):(e=String(e),"?"===e.substring(0,1)&&(e=e.substring(1)),this._list=a(e))),this._url_object=null,this._setList=function(e){i||(r._list=e);};var i=!1;this._update_steps=function(){i||(i=!0,r._url_object&&("about:"===r._url_object.protocol&&-1!==r._url_object.pathname.indexOf("?")&&(r._url_object.pathname=r._url_object.pathname.split("?")[0]),r._url_object.search=n(r._list),i=!1));};}function u(e,t){var n=0;this.next=function(){if(n>=e.length){ return {done:!0,value:undefined$1}; }var r=e[n++];return {done:!1,value:"key"===t?r.name:"value"===t?r.value:[r.name,r.value]}};}function l(t,n){function r(){var e=l.href.replace(/#$|\?$|\?(?=#)/g,"");l.href!==e&&(l.href=e);}function u(){m._setList(l.search?a(l.search.substring(1)):[]),m._update_steps();}if(!(this instanceof e.URL)){ throw new TypeError("Failed to construct 'URL': Please use the 'new' operator."); }n&&(t=function(){if(c){ return new s(t,n).href; }var e;try{var r;if("[object OperaMini]"===Object.prototype.toString.call(window.operamini)?(e=document.createElement("iframe"),e.style.display="none",document.documentElement.appendChild(e),r=e.contentWindow.document):document.implementation&&document.implementation.createHTMLDocument?r=document.implementation.createHTMLDocument(""):document.implementation&&document.implementation.createDocument?(r=document.implementation.createDocument("http://www.w3.org/1999/xhtml","html",null),r.documentElement.appendChild(r.createElement("head")),r.documentElement.appendChild(r.createElement("body"))):window.ActiveXObject&&(r=new window.ActiveXObject("htmlfile"),r.write("<head></head><body></body>"),r.close()),!r){ throw Error("base not supported"); }var a=r.createElement("base");a.href=n,r.getElementsByTagName("head")[0].appendChild(a);var i=r.createElement("a");return i.href=t,i.href}finally{e&&e.parentNode.removeChild(e);}}());var l=i(t||""),f=function(){if(!("defineProperties"in Object)){ return !1; }try{var e={};return Object.defineProperties(e,{prop:{get:function(){return !0}}}),e.prop}catch(t){return !1}}(),h=f?this:document.createElement("a"),m=new o(l.search?l.search.substring(1):null);return m._url_object=h,Object.defineProperties(h,{href:{get:function(){return l.href},set:function(e){l.href=e,r(),u();},enumerable:!0,configurable:!0},origin:{get:function(){return "data:"===this.protocol.toLowerCase()?null:"origin"in l?l.origin:this.protocol+"//"+this.host},enumerable:!0,configurable:!0},protocol:{get:function(){return l.protocol},set:function(e){l.protocol=e;},enumerable:!0,configurable:!0},username:{get:function(){return l.username},set:function(e){l.username=e;},enumerable:!0,configurable:!0},password:{get:function(){return l.password},set:function(e){l.password=e;},enumerable:!0,configurable:!0},host:{get:function(){var e={"http:":/:80$/,"https:":/:443$/,"ftp:":/:21$/}[l.protocol];return e?l.host.replace(e,""):l.host},set:function(e){l.host=e;},enumerable:!0,configurable:!0},hostname:{get:function(){return l.hostname},set:function(e){l.hostname=e;},enumerable:!0,configurable:!0},port:{get:function(){return l.port},set:function(e){l.port=e;},enumerable:!0,configurable:!0},pathname:{get:function(){return "/"!==l.pathname.charAt(0)?"/"+l.pathname:l.pathname},set:function(e){l.pathname=e;},enumerable:!0,configurable:!0},search:{get:function(){return l.search},set:function(e){l.search!==e&&(l.search=e,r(),u());},enumerable:!0,configurable:!0},searchParams:{get:function(){return m},enumerable:!0,configurable:!0},hash:{get:function(){return l.hash},set:function(e){l.hash=e,r();},enumerable:!0,configurable:!0},toString:{value:function(){return l.toString()},enumerable:!1,configurable:!0},valueOf:{value:function(){return l.valueOf()},enumerable:!1,configurable:!0}}),h}var c,s=e.URL;try{if(s){if("searchParams"in(c=new e.URL("http://example.com"))){var f=new l("http://example.com");if(f.search="a=1&b=2","http://example.com/?a=1&b=2"===f.href&&(f.search="","http://example.com/"===f.href)){ return }}"href"in c||(c=undefined$1),c=undefined$1;}}catch(m){}if(Object.defineProperties(o.prototype,{append:{value:function(e,t){this._list.push({name:e,value:t}),this._update_steps();},writable:!0,enumerable:!0,configurable:!0},"delete":{value:function(e){for(var t=0;t<this._list.length;){ this._list[t].name===e?this._list.splice(t,1):++t; }this._update_steps();},writable:!0,enumerable:!0,configurable:!0},get:{value:function(e){for(var t=0;t<this._list.length;++t){ if(this._list[t].name===e){ return this._list[t].value; } }return null},writable:!0,enumerable:!0,configurable:!0},getAll:{value:function(e){for(var t=[],n=0;n<this._list.length;++n){ this._list[n].name===e&&t.push(this._list[n].value); }return t},writable:!0,enumerable:!0,configurable:!0},has:{value:function(e){for(var t=0;t<this._list.length;++t){ if(this._list[t].name===e){ return !0; } }return !1},writable:!0,enumerable:!0,configurable:!0},set:{value:function(e,t){for(var n=!1,r=0;r<this._list.length;){ this._list[r].name===e?n?this._list.splice(r,1):(this._list[r].value=t,n=!0,++r):++r; }n||this._list.push({name:e,value:t}),this._update_steps();},writable:!0,enumerable:!0,configurable:!0},entries:{value:function(){return new u(this._list,"key+value")},writable:!0,enumerable:!0,configurable:!0},keys:{value:function(){return new u(this._list,"key")},writable:!0,enumerable:!0,configurable:!0},values:{value:function(){return new u(this._list,"value")},writable:!0,enumerable:!0,configurable:!0},forEach:{value:function(e){var t=arguments.length>1?arguments[1]:undefined$1;this._list.forEach(function(n){e.call(t,n.value,n.name);});},writable:!0,enumerable:!0,configurable:!0},toString:{value:function(){return n(this._list)},writable:!0,enumerable:!1,configurable:!0},sort:{value:function p(){for(var e=this.entries(),t=e.next(),n=[],r={};!t.done;){var a=t.value,i=a[0];n.push(i),Object.prototype.hasOwnProperty.call(r,i)||(r[i]=[]),r[i].push(a[1]),t=e.next();}n.sort();for(var o=0;o<n.length;o++){ this["delete"](n[o]); }for(var u=0;u<n.length;u++){ i=n[u],this.append(i,r[i].shift()); }}}}),"Symbol"in e&&"iterator"in e.Symbol&&(Object.defineProperty(o.prototype,e.Symbol.iterator,{value:o.prototype.entries,writable:!0,enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,e.Symbol.iterator,{value:function(){return this},writable:!0,enumerable:!0,configurable:!0})),s){ for(var h in s){ Object.prototype.hasOwnProperty.call(s,h)&&"function"==typeof s[h]&&(l[h]=s[h]); } }e.URL=l,e.URLSearchParams=o;}(),function(){if("1"!==new e.URLSearchParams([["a",1]]).get("a")||"1"!==new e.URLSearchParams({a:1}).get("a")){var n=e.URLSearchParams;e.URLSearchParams=function(e){if(e&&"object"==typeof e&&t(e)){var r=new n;return Array.from(e).forEach(function(e){if(!t(e)){ throw TypeError(); }var n=Array.from(e);if(2!==n.length){ throw TypeError(); }r.append(n[0],n[1]);}),r}return e&&"object"==typeof e?(r=new n,Object.keys(e).forEach(function(t){r.set(t,e[t]);}),r):new n(e)};}}();}(self);})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  /* legacy code here */
  api$1.internals.legacy.setLegacy();
  api$1.internals.register(api$1.core.ArtworkSelector.ARTWORK_USE, api$1.core.Artwork);

})();
//# sourceMappingURL=dsfr.nomodule.js.map

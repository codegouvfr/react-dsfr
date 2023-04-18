/*! DSFR v1.9.1 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

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
    version: '1.9.1'
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
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        instance._dispose();
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

  var Root = /*@__PURE__*/(function (Element) {
    function Root () {
      Element.call(this, document.documentElement, 'root');
      this.node.setAttribute(ns.attr('js'), true);
    }

    if ( Element ) Root.__proto__ = Element;
    Root.prototype = Object.create( Element && Element.prototype );
    Root.prototype.constructor = Root;

    return Root;
  }(Element$1));

  var RootSelector = {
    ROOT: ':root'
  };

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
        if (this.isLegacy) { document.body.style.top = this._scrollY * -1 + 'px'; }
        else { document.body.style.setProperty('--scroll-top', this._scrollY * -1 + 'px'); }
        document.documentElement.setAttribute(ns.attr('scrolling'), 'false');
      }
    };

    ScrollLocker.prototype.unlock = function unlock () {
      if (this._isLocked) {
        this._isLocked = false;
        document.documentElement.removeAttribute(ns.attr('scrolling'));
        if (this.isLegacy) { document.body.style.top = ''; }
        else { document.body.style.removeProperty('--scroll-top'); }
        window.scroll(0, this._scrollY);
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

  var Engine = function Engine () {
    state.create(Register);
    state.create(Stage);
    state.create(Renderer);
    state.create(Resizer);
    state.create(ScrollLocker);
    state.create(Load);
    state.create(FontSwap);
    state.create(MouseMove);

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

  var dom = {};

  dom.addClass = addClass;
  dom.hasClass = hasClass;
  dom.removeClass = removeClass;
  dom.queryParentSelector = queryParentSelector;
  dom.querySelectorAllArray = querySelectorAllArray;
  dom.queryActions = queryActions;

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
    this._listeners = {};
    this._keyListenerTypes = [];
    this._keys = [];
    this.handlingKey = this.handleKey.bind(this);
    this._emitter = new Emitter();
    this._ascent = new Emitter();
    this._descent = new Emitter();
    this._registrations = [];
    this._nexts = [];
  };

  var prototypeAccessors$1 = { proxy: { configurable: true },isRendering: { configurable: true },isResizing: { configurable: true },isScrollLocked: { configurable: true },isLoading: { configurable: true },isSwappingFont: { configurable: true },isMouseMoving: { configurable: true },style: { configurable: true },classNames: { configurable: true },hasFocus: { configurable: true },isLegacy: { configurable: true } };
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
      }
    };
    return completeAssign(proxy, proxyAccessors);
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

  Instance.prototype.listen = function listen (type, closure, options) {
    if (!this._listeners[type]) { this._listeners[type] = []; }
    if (this._listeners[type].indexOf(closure) > -1) { return; }
    this._listeners[type].push(closure);
    this.node.addEventListener(type, closure, options);
  };

  Instance.prototype.unlisten = function unlisten (type, closure) {
    if (!type) {
      for (var type$1 in this._listeners) { this.unlisten(type$1); }
    } else if (!closure) {
      if (!this._listeners[type]) { return; }
      for (var i = 0, list = this._listeners[type]; i < list.length; i += 1) {
          var closure$1 = list[i];

          this.node.removeEventListener(type, closure$1);
        }
      this._listeners[type].length = 0;
    } else {
      if (!this._listeners[type]) { return; }
      var index = this._listeners[type].indexOf(closure);
      if (index > -1) { this._listeners[type].splice(index, 1); }
      this.node.removeEventListener(type, closure);
    }
  };

  Instance.prototype.listenKey = function listenKey (code, closure, preventDefault, stopPropagation, type) {
      if ( preventDefault === void 0 ) preventDefault = false;
      if ( stopPropagation === void 0 ) stopPropagation = false;
      if ( type === void 0 ) type = 'down';

    if (this._keyListenerTypes.indexOf(type) === -1) {
      this.listen(("key" + type), this.handlingKey);
      this._keyListenerTypes.push(type);
    }

    this._keys.push(new KeyAction(type, code, closure, preventDefault, stopPropagation));
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

  Instance.prototype._dispose = function _dispose () {
    inspector.debug(("dispose instance of " + (this.registration.instanceClassName) + " on element [" + (this.element.id) + "]"));
    this.removeAttribute(this.registration.attribute);
    this.unlisten();
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
    return this.node.getBoundingClientRect();
  };

  prototypeAccessors$1.isLegacy.get = function () {
    return state.isLegacy;
  };

  Object.defineProperties( Instance.prototype, prototypeAccessors$1 );
  Object.defineProperties( Instance, staticAccessors );

  var KeyAction = function KeyAction (type, code, closure, preventDefault, stopPropagation) {
    this.type = type;
    this.eventType = "key" + type;
    this.code = code;
    this.closure = closure;
    this.preventDefault = preventDefault === true;
    this.stopPropagation = stopPropagation === true;
  };

  KeyAction.prototype.handle = function handle (e) {
    if (e.type !== this.eventType) { return; }
    if (e.keyCode === this.code) {
      this.closure(e);
      if (this.preventDefault) {
        e.preventDefault();
      }
      if (this.stopPropagation) {
        e.stopPropagation();
      }
    }
  };

  var KeyCodes = {
    TAB: 9,
    ESCAPE: 27,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  var DisclosureEvent = {
    DISCLOSE: ns.event('disclose'),
    CONCEAL: ns.event('conceal')
  };

  var DisclosureEmission = {
    RESET: ns.emission('disclosure', 'reset'),
    ADDED: ns.emission('disclosure', 'added'),
    REMOVED: ns.emission('disclosure', 'removed'),
    GROUP: ns.emission('disclosure', 'group'),
    UNGROUP: ns.emission('disclosure', 'ungroup')
  };

  var Disclosure = /*@__PURE__*/(function (Instance) {
    function Disclosure (type, selector, DisclosureButtonInstanceClass, disclosuresGroupInstanceClassName) {
      Instance.call(this);
      this.type = type;
      this._selector = selector;
      this.DisclosureButtonInstanceClass = DisclosureButtonInstanceClass;
      this.disclosuresGroupInstanceClassName = disclosuresGroupInstanceClassName;
      this.modifier = this._selector + '--' + this.type.id;
      this.pristine = true;
    }

    if ( Instance ) Disclosure.__proto__ = Instance;
    Disclosure.prototype = Object.create( Instance && Instance.prototype );
    Disclosure.prototype.constructor = Disclosure;

    var prototypeAccessors = { proxy: { configurable: true },buttons: { configurable: true },group: { configurable: true },disclosed: { configurable: true },buttonHasFocus: { configurable: true },hasFocus: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Disclosure';
    };

    Disclosure.prototype.init = function init () {
      this.addDescent(DisclosureEmission.RESET, this.reset.bind(this));
      this.addDescent(DisclosureEmission.GROUP, this.update.bind(this));
      this.addDescent(DisclosureEmission.UNGROUP, this.update.bind(this));
      this.register(("[aria-controls=\"" + (this.id) + "\"]"), this.DisclosureButtonInstanceClass);
      this.ascend(DisclosureEmission.ADDED);
      this.update();
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
        }
      };

      return completeAssign(proxy, proxyAccessors);
    };

    prototypeAccessors.buttons.get = function () {
      return this.getRegisteredInstances(this.DisclosureButtonInstanceClass.instanceClassName);
    };

    Disclosure.prototype.update = function update () {
      this.getGroup();
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
      if (this.disclosed) { return false; }
      this.pristine = false;
      this.disclosed = true;
      if (!withhold && this.group) { this.group.current = this; }
      return true;
    };

    Disclosure.prototype.conceal = function conceal (withhold, preventFocus) {
      if (!this.disclosed) { return false; }
      if (!this.type.canConceal && this.group && this.group.current === this) { return false; }
      this.pristine = false;
      this.disclosed = false;
      if (!withhold && this.group && this.group.current === this) { this.group.current = null; }
      if (!preventFocus) { this.focus(); }
      this.descend(DisclosureEmission.RESET);
      return true;
    };

    prototypeAccessors.disclosed.get = function () {
      return this._disclosed;
    };

    prototypeAccessors.disclosed.set = function (value) {
      if (this._disclosed === value) { return; }
      this.dispatch(value ? DisclosureEvent.DISCLOSE : DisclosureEvent.CONCEAL, this.type);
      this._disclosed = value;
      if (value) { this.addClass(this.modifier); }
      else { this.removeClass(this.modifier); }
      for (var i = 0; i < this.buttons.length; i++) { this.buttons[i].apply(value); }
    };

    Disclosure.prototype.reset = function reset () {};

    Disclosure.prototype.toggle = function toggle (isPrimary) {
      if (!this.type.canConceal) { this.disclose(); }
      else {
        switch (true) {
          case !isPrimary:
          case this.disclosed:
            this.conceal();
            break;

          default:
            this.disclose();
        }
      }
    };

    prototypeAccessors.buttonHasFocus.get = function () {
      if (this.buttons.some(function (button) { return button.hasFocus; })) { return true; }
      return false;
    };

    prototypeAccessors.hasFocus.get = function () {
      if (Instance.prototype.hasFocus) { return true; }
      if (this.buttonHasFocus) { return true; }
      return this.querySelectorAll(':focus').length > 0;
    };

    Disclosure.prototype.focus = function focus () {
      for (var i = 0; i < this.buttons.length; i++) {
        var button = this.buttons[i];
        if (button.isPrimary) {
          button.focus();
          return;
        }
      }
    };

    Disclosure.prototype.dispose = function dispose () {
      this._group = null;
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
    }

    if ( Instance ) DisclosureButton.__proto__ = Instance;
    DisclosureButton.prototype = Object.create( Instance && Instance.prototype );
    DisclosureButton.prototype.constructor = DisclosureButton;

    var prototypeAccessors = { proxy: { configurable: true },disclosed: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'DisclosureButton';
    };

    DisclosureButton.prototype.init = function init () {
      this.controlsId = this.getAttribute('aria-controls');
      this.isPrimary = this.hasAttribute(this.attributeName);
      if (this.isPrimary && this.disclosed && this.registration.creator.pristine) { this.registration.creator.disclose(); }
      this.listen('click', this.click.bind(this));
    };

    prototypeAccessors.proxy.get = function () {
      var scope = this;
      return Object.assign.call(this, Instance.prototype.proxy, {
        focus: scope.focus.bind(scope)
      });
    };

    DisclosureButton.prototype.click = function click (e) {
      if (this.registration.creator) { this.registration.creator.toggle(this.isPrimary); }
    };

    DisclosureButton.prototype.mutate = function mutate (attributeNames) {
      if (this.isPrimary && attributeNames.indexOf(this.attributeName) > -1 && this.registration.creator) {
        if (this.disclosed) { this.registration.creator.disclose(); }
        else if (this.type.canConceal) { this.registration.creator.conceal(); }
      }
    };

    DisclosureButton.prototype.apply = function apply (value) {
      if (!this.isPrimary) { return; }
      this.setAttribute(this.attributeName, value);
    };

    prototypeAccessors.disclosed.get = function () {
      return this.getAttribute(this.attributeName) === 'true';
    };

    Object.defineProperties( DisclosureButton.prototype, prototypeAccessors );
    Object.defineProperties( DisclosureButton, staticAccessors );

    return DisclosureButton;
  }(Instance));

  var DisclosuresGroup = /*@__PURE__*/(function (Instance) {
    function DisclosuresGroup (disclosureInstanceClassName, jsAttribute) {
      Instance.call(this, jsAttribute);
      this.disclosureInstanceClassName = disclosureInstanceClassName;
      this._index = -1;
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
      var members = this.element.getDescendantInstances(this.disclosureInstanceClassName, this.constructor.instanceClassName, true);
      this._members = members.filter(this.validate.bind(this));
    };

    DisclosuresGroup.prototype.update = function update () {
      this.getMembers();
      this.getIndex();
    };

    prototypeAccessors.members.get = function () {
      return this._members;
    };

    prototypeAccessors.length.get = function () {
      return this.members ? this.members.length : 0;
    };

    DisclosuresGroup.prototype.getIndex = function getIndex () {
      this._index = -1;
      for (var i = 0; i < this.length; i++) {
        if (this.index > -1) { this.members[i].conceal(true, true); }
        else if (this.members[i].disclosed) {
          this.index = i;
        }
      }
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
          member.disclose(true);
        } else {
          member.conceal(true, true);
        }
      }
      this.apply();
    };

    prototypeAccessors.current.get = function () {
      return this._index === -1 ? null : this.members[this._index];
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
      canConceal: true
    },
    SELECT: {
      id: 'selected',
      ariaState: true,
      ariaControls: true,
      canConceal: false
    },
    OPENED: {
      id: 'opened',
      ariaState: false,
      ariaControls: true,
      canConceal: true
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
      if (!this.disclosed) {
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

      if (this.disclosed) { return; }
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

      if (!this.disclosed) { return; }
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
      if (!this.pristine) { this.disclosed = false; }
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
      this.listen('click', this.toggle.bind(this));
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
    Equisized: Equisized,
    EquisizedEmission: EquisizedEmission,
    Toggle: Toggle,
    EquisizedsGroup: EquisizedsGroup,
    InjectSvg: InjectSvg,
    InjectSvgSelector: InjectSvgSelector,
    Artwork: Artwork,
    ArtworkSelector: ArtworkSelector,
    Ratio: Ratio,
    RatioSelector: RatioSelector
  };

  api$1.internals.register(api$1.core.CollapseSelector.COLLAPSE, api$1.core.Collapse);
  api$1.internals.register(api$1.core.InjectSvgSelector.INJECT_SVG, api$1.core.InjectSvg);
  api$1.internals.register(api$1.core.RatioSelector.RATIO, api$1.core.Ratio);

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

  var AccordionSelector = {
    GROUP: api.internals.ns.selector('accordions-group'),
    COLLAPSE: ((api.internals.ns.selector('accordion')) + " > " + (api.internals.ns.selector('collapse')))
  };

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
      return member.node.matches(AccordionSelector.COLLAPSE);
    };

    Object.defineProperties( AccordionsGroup, staticAccessors );

    return AccordionsGroup;
  }(api.core.CollapsesGroup));

  api.accordion = {
    AccordionSelector: AccordionSelector,
    AccordionsGroup: AccordionsGroup
  };

  api.internals.register(api.accordion.AccordionSelector.GROUP, api.accordion.AccordionsGroup);

  var ButtonSelector = {
    EQUISIZED_BUTTON: ((api.internals.ns.selector('btns-group--equisized')) + " " + (api.internals.ns.selector('btn'))),
    EQUISIZED_GROUP: api.internals.ns.selector('btns-group--equisized')
  };

  api.button = {
    ButtonSelector: ButtonSelector
  };

  api.internals.register(api.button.ButtonSelector.EQUISIZED_BUTTON, api.core.Equisized);
  api.internals.register(api.button.ButtonSelector.EQUISIZED_GROUP, api.core.EquisizedsGroup);

  var Breadcrumb = /*@__PURE__*/(function (superclass) {
    function Breadcrumb () {
      superclass.call(this);
      this.count = 0;
      this.focusing = this.focus.bind(this);
    }

    if ( superclass ) Breadcrumb.__proto__ = superclass;
    Breadcrumb.prototype = Object.create( superclass && superclass.prototype );
    Breadcrumb.prototype.constructor = Breadcrumb;

    var prototypeAccessors = { proxy: { configurable: true },links: { configurable: true },collapse: { configurable: true } };
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

    Object.defineProperties( Breadcrumb.prototype, prototypeAccessors );
    Object.defineProperties( Breadcrumb, staticAccessors );

    return Breadcrumb;
  }(api.core.Instance));

  var BreadcrumbSelector = {
    BREADCRUMB: api.internals.ns.selector('breadcrumb')
  };

  api.breadcrumb = {
    BreadcrumbSelector: BreadcrumbSelector,
    Breadcrumb: Breadcrumb
  };

  api.internals.register(api.breadcrumb.BreadcrumbSelector.BREADCRUMB, api.breadcrumb.Breadcrumb);

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

  var SidemenuSelector = {
    LIST: api.internals.ns.selector('sidemenu__list'),
    COLLAPSE: ((api.internals.ns.selector('sidemenu__item')) + " > " + (api.internals.ns.selector('collapse')))
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
      return member.node.matches(SidemenuSelector.COLLAPSE);
    };

    Object.defineProperties( SidemenuList, staticAccessors );

    return SidemenuList;
  }(api.core.CollapsesGroup));

  api.sidemenu = {
    SidemenuList: SidemenuList,
    SidemenuSelector: SidemenuSelector
  };

  api.internals.register(api.sidemenu.SidemenuSelector.LIST, api.sidemenu.SidemenuList);

  var ModalSelector = {
    MODAL: api.internals.ns.selector('modal'),
    SCROLL_SHADOW: api.internals.ns.selector('scroll-shadow'),
    BODY: api.internals.ns.selector('modal__body')
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
      this.scrolling = this.resize.bind(this, false);
      this.resizing = this.resize.bind(this, true);
    }

    if ( superclass ) Modal.__proto__ = superclass;
    Modal.prototype = Object.create( superclass && superclass.prototype );
    Modal.prototype.constructor = Modal;

    var prototypeAccessors = { body: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'Modal';
    };

    Modal.prototype.init = function init () {
      superclass.prototype.init.call(this);
      this.listen('click', this.click.bind(this));
      this.listenKey(api.core.KeyCodes.ESCAPE, this.conceal.bind(this, false, false), true, true);
    };

    prototypeAccessors.body.get = function () {
      return this.element.getDescendantInstances('ModalBody', 'Modal')[0];
    };

    Modal.prototype.click = function click (e) {
      if (e.target === this.node && this.getAttribute(ModalAttribute.CONCEALING_BACKDROP) !== 'false') { this.conceal(); }
    };

    Modal.prototype.disclose = function disclose (withhold) {
      if (!superclass.prototype.disclose.call(this, withhold)) { return false; }
      if (this.body) { this.body.activate(); }
      this.isScrollLocked = true;
      this.setAttribute('aria-modal', 'true');
      this.setAttribute('open', 'true');
      return true;
    };

    Modal.prototype.conceal = function conceal (withhold, preventFocus) {
      if (!superclass.prototype.conceal.call(this, withhold, preventFocus)) { return false; }
      this.isScrollLocked = false;
      this.removeAttribute('aria-modal');
      this.removeAttribute('open');
      if (this.body) { this.body.deactivate(); }
      return true;
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
      this.listen('scroll', this.shade.bind(this));
    };

    ModalBody.prototype.activate = function activate () {
      this.isResizing = true;
      this.resize();
    };

    ModalBody.prototype.deactivate = function deactivate () {
      this.isResizing = false;
    };

    ModalBody.prototype.shade = function shade () {
      if (this.node.scrollHeight > this.node.clientHeight) {
        if (this.node.offsetHeight + this.node.scrollTop >= this.node.scrollHeight) {
          this.removeClass(ModalSelector.SCROLL_SHADOW);
        } else {
          this.addClass(ModalSelector.SCROLL_SHADOW);
        }
      } else {
        this.removeClass(ModalSelector.SCROLL_SHADOW);
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
      this.shade();
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
      this.listen('click', this.toggle.bind(this));
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

    PasswordToggle.prototype.toggle = function toggle () {
      this.isChecked = !this._isChecked;
      // this.node.checked = this.isChecked;
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

  var NavigationSelector = {
    NAVIGATION: api.internals.ns.selector('nav'),
    COLLAPSE: ((api.internals.ns.selector('nav__item')) + " > " + (api.internals.ns.selector('collapse'))),
    ITEM: api.internals.ns.selector('nav__item'),
    ITEM_RIGHT: api.internals.ns('nav__item--align-right'),
    MENU: api.internals.ns.selector('menu')
  };

  var NavigationItem = /*@__PURE__*/(function (superclass) {
    function NavigationItem () {
      superclass.call(this);
      this._isRightAligned = false;
    }

    if ( superclass ) NavigationItem.__proto__ = superclass;
    NavigationItem.prototype = Object.create( superclass && superclass.prototype );
    NavigationItem.prototype.constructor = NavigationItem;

    var prototypeAccessors = { isRightAligned: { configurable: true } };
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
      this.listen('click', this.clickHandler.bind(this), { capture: true });
    };

    Navigation.prototype.validate = function validate (member) {
      return member.element.node.matches(NavigationSelector.COLLAPSE);
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
      if (value === -1 && this.current !== null && this.current.hasFocus) { this.current.focus(); }
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
      this.group.index = 0;
    };

    Object.defineProperties( TabPanel.prototype, prototypeAccessors );
    Object.defineProperties( TabPanel, staticAccessors );

    return TabPanel;
  }(api.core.Disclosure));

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
      this.listenKey(api.core.KeyCodes.RIGHT, this.pressRight.bind(this), true, true);
      this.listenKey(api.core.KeyCodes.LEFT, this.pressLeft.bind(this), true, true);
      this.listenKey(api.core.KeyCodes.HOME, this.pressHome.bind(this), true, true);
      this.listenKey(api.core.KeyCodes.END, this.pressEnd.bind(this), true, true);
      this.isRendering = true;

      if (this.list) { this.list.apply(); }
    };

    prototypeAccessors.list.get = function () {
      return this.element.getDescendantInstances('TabsList', 'TabsGroup', true)[0];
    };

    TabsGroup.prototype.transitionend = function transitionend (e) {
      this.isPreventingTransition = true;
    };

    prototypeAccessors.buttonHasFocus.get = function () {
      return this.members.some(function (member) { return member.buttonHasFocus; });
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
      this.current.translate(TabPanelDirection.NONE);
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
      var paneHeight = Math.round(this.current.node.offsetHeight);
      if (this.panelHeight === paneHeight) { return; }
      this.panelHeight = paneHeight;
      var listHeight = 0;
      if (this.list) { listHeight = this.list.node.offsetHeight; }
      this.style.setProperty('--tabs-height', (this.panelHeight + listHeight) + 'px');
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

    var prototypeAccessors = { group: { configurable: true },isScrolling: { configurable: true } };
    var staticAccessors = { instanceClassName: { configurable: true } };

    staticAccessors.instanceClassName.get = function () {
      return 'TabsList';
    };

    TabsList.prototype.init = function init () {
      this.listen('scroll', this.scroll.bind(this));
      this.isResizing = true;
    };

    prototypeAccessors.group.get = function () {
      return this.element.getAscendantInstance('TabsGroup', 'TabsList');
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
      if (!this.group) { return; }
      if (this._isScrolling) {
        this.group.addClass(TabSelector.SHADOW);
        this.scroll();
      } else {
        this.group.removeClass(TabSelector.SHADOW_RIGHT);
        this.group.removeClass(TabSelector.SHADOW_LEFT);
        this.group.removeClass(TabSelector.SHADOW);
      }
    };

    /* ajoute la classe fr-table__shadow-left ou fr-table__shadow-right sur fr-table en fonction d'une valeur de scroll et du sens (right, left) */
    TabsList.prototype.scroll = function scroll () {
      if (!this.group) { return; }
      var scrollLeft = this.node.scrollLeft;
      var isMin = scrollLeft <= SCROLL_OFFSET$1;
      var max = this.node.scrollWidth - this.node.clientWidth - SCROLL_OFFSET$1;

      var isMax = Math.abs(scrollLeft) >= max;
      var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      var minSelector = isRtl ? TabSelector.SHADOW_RIGHT : TabSelector.SHADOW_LEFT;
      var maxSelector = isRtl ? TabSelector.SHADOW_LEFT : TabSelector.SHADOW_RIGHT;

      if (isMin) {
        this.group.removeClass(minSelector);
      } else {
        this.group.addClass(minSelector);
      }

      if (isMax) {
        this.group.removeClass(maxSelector);
      } else {
        this.group.addClass(maxSelector);
      }
    };

    TabsList.prototype.resize = function resize () {
      this.isScrolling = this.node.scrollWidth > this.node.clientWidth + SCROLL_OFFSET$1;
      this.setProperty('--tab-list-height', ((this.getRect().height) + "px"));
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
    TabSelector: TabSelector
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
      this.listen('click', this.click.bind(this));
    };

    TagDismissible.prototype.click = function click () {
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
      if (document.body.contains(this.node)) { api.inspector.warn(("a TagDismissible has just been dismissed and should be removed from the dom. In " + (api.mode) + " mode, the api doesn't handle dom modification. An event " + (TagEvent.DISMISS) + " is dispatched by the element to trigger the removal")); }
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

  var DownloadSelector = {
    DOWNLOAD_ASSESS_FILE: ("" + (api.internals.ns.attr.selector('assess-file'))),
    DOWNLOAD_DETAIL: ("" + (api.internals.ns.selector('download__detail')))
  };

  var AssessFile = /*@__PURE__*/(function (superclass) {
    function AssessFile () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) AssessFile.__proto__ = superclass;
    AssessFile.prototype = Object.create( superclass && superclass.prototype );
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
      this.detail = this.querySelector(DownloadSelector.DOWNLOAD_DETAIL);
      this.update();
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
          api.inspector.warn('File size unknown: ' + this$1$1.href + '\nUnable to get HTTP header: "content-length"');
        }
        this$1$1.update();
      });
    };

    AssessFile.prototype.update = function update () {
      // TODO V2: implémenter async
      if (this.isLegacy) { this.length = -1; }

      if (!this.length) {
        this.getFileLength();
        return;
      }

      var details = [];
      if (this.detail) {
        if (this.href) {
          var extension = this.parseExtension(this.href);
          if (extension) { details.push(extension.toUpperCase()); }
        }

        if (this.length !== -1) {
          details.push(this.bytesToSize(this.length));
        }

        if (this.hreflang) {
          details.push(this.getLangDisplayName(this.hreflang));
        }

        this.detail.innerHTML = details.join(' - ');
      }
    };

    AssessFile.prototype.getLang = function getLang (elem) {
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
      if (this.getAttribute(api.internals.ns.attr('assess-file')) === 'bytes') {
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
  }(api.core.Instance));

  api.download = {
    DownloadSelector: DownloadSelector,
    AssessFile: AssessFile

  };

  api.internals.register(api.download.DownloadSelector.DOWNLOAD_ASSESS_FILE, api.download.AssessFile);

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
      var toolsHtmlDuplicateId = toolsHtml.replace(/(<nav[.\s\S]*-translate [.\s\S]*) id="(.*?)"([.\s\S]*<\/nav>)/gm, '$1 id="$2' + copySuffix + '"$3');
      toolsHtmlDuplicateId = toolsHtmlDuplicateId.replace(/(<nav[.\s\S]*-translate [.\s\S]*) aria-controls="(.*?)"([.\s\S]*<\/nav>)/gm, '$1 aria-controls="$2' + copySuffix + '"$3');

      if (toolsHtmlDuplicateId === menuHtml) { return; }

      switch (api.mode) {
        case api.Modes.ANGULAR:
        case api.Modes.REACT:
        case api.Modes.VUE:
          api.inspector.warn(("header__tools-links content is different from header__menu-links content.\nAs you're using a dynamic framework, you should handle duplication of this content yourself, please refer to documentation:\n" + (api.header.doc)));
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
      if (this.isBreakpoint(api.core.Breakpoints.LG)) { this.unqualify(); }
      else { this.qualify(); }
    };

    HeaderModal.prototype.qualify = function qualify () {
      this.setAttribute('role', 'dialog');
      var modal = this.element.getInstance('Modal');
      if (!modal) { return; }
      var buttons = modal.buttons;
      var id = '';
      for (var i = 0, list = buttons; i < list.length; i += 1) {
        var button = list[i];

        id = button.id || id;
        if (button.isPrimary && id) { break; }
      }
      this.setAttribute('aria-labelledby', id);
      this.listen('click', this._clickHandling, { capture: true });
    };

    HeaderModal.prototype.unqualify = function unqualify () {
      var modal = this.element.getInstance('Modal');
      if (modal) { modal.conceal(); }
      this.removeAttribute('role');
      this.removeAttribute('aria-labelledby');
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

  /* legacy code here */
  api$1.internals.legacy.setLegacy();
  api$1.internals.register(api$1.core.ArtworkSelector.ARTWORK_USE, api$1.core.Artwork);

})();
//# sourceMappingURL=dsfr.nomodule.js.map

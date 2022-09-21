/*! DSFR v1.7.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

(function () {
  'use strict';

  var State = function State () {
    this.modules = {};
  };

  var prototypeAccessors$7 = { isActive: { configurable: true },isLegacy: { configurable: true } };

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

  prototypeAccessors$7.isActive.get = function () {
    return this._isActive;
  };

  prototypeAccessors$7.isActive.set = function (value) {
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

  prototypeAccessors$7.isLegacy.get = function () {
    return this._isLegacy;
  };

  prototypeAccessors$7.isLegacy.set = function (value) {
    if (value === this._isLegacy) { return; }
    this._isLegacy = value;
  };

  Object.defineProperties( State.prototype, prototypeAccessors$7 );

  var state = new State();

  var config = {
    prefix: 'fr',
    namespace: 'dsfr',
    organisation: '@gouvfr',
    version: '1.7.2'
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

  var prototypeAccessors$6 = { color: { configurable: true } };

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

  prototypeAccessors$6.color.get = function () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.dark : this.light;
  };

  Object.defineProperties( LogLevel.prototype, prototypeAccessors$6 );

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
    trace: new LogLevel(0, '#616161', '#989898'),
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
    this.trace.print(message);
  };

  Inspector.prototype.tree = function tree () {
    var stage = state.getModule('stage');
    if (!stage) { return; }
    var message = new Message();
    this._branch(stage.root, 0, message);
    this.trace.print(message);
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

  var prototypeAccessors$5 = { mode: { configurable: true } };

  Options.prototype.configure = function configure (settings, start) {
      if ( settings === void 0 ) settings = {};

    this.startCallback = start;
    if (settings.verbose === true) { inspector.level = 0; }
    this.mode = settings.mode || Modes.AUTO;
  };

  prototypeAccessors$5.mode.set = function (value) {
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

  prototypeAccessors$5.mode.get = function () {
    return this._mode;
  };

  Options.prototype.start = function start () {
    inspector.info('start');
    this.startCallback();
  };

  Object.defineProperties( Options.prototype, prototypeAccessors$5 );

  var options = new Options();

  var Collection = function Collection () {
    this._collection = [];
  };

  var prototypeAccessors$4 = { length: { configurable: true },collection: { configurable: true } };

  Collection.prototype.forEach = function forEach (callback) {
    this._collection.forEach(callback);
  };

  Collection.prototype.map = function map (callback) {
    return this._collection.map(callback);
  };

  prototypeAccessors$4.length.get = function () {
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

  prototypeAccessors$4.collection.get = function () {
    return this._collection;
  };

  Object.defineProperties( Collection.prototype, prototypeAccessors$4 );

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

  var prototypeAccessors$3 = { instanceClassName: { configurable: true },instanceClassNames: { configurable: true },property: { configurable: true },attribute: { configurable: true } };

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

  prototypeAccessors$3.instanceClassName.get = function () {
    return this._instanceClassName;
  };

  prototypeAccessors$3.instanceClassNames.get = function () {
    return this._instanceClassNames;
  };

  prototypeAccessors$3.property.get = function () {
    return this._property;
  };

  prototypeAccessors$3.attribute.get = function () {
    return this._attribute;
  };

  Object.defineProperties( Registration.prototype, prototypeAccessors$3 );

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

  var Element = function Element (node, id) {
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

  var prototypeAccessors$2 = { proxy: { configurable: true },html: { configurable: true },parent: { configurable: true },ascendants: { configurable: true },children: { configurable: true },descendants: { configurable: true } };

  prototypeAccessors$2.proxy.get = function () {
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

  prototypeAccessors$2.html.get = function () {
    if (!this.node || !this.node.outerHTML) { return ''; }
    var end = this.node.outerHTML.indexOf('>');
    return this.node.outerHTML.substring(0, end + 1);
  };

  Element.prototype.project = function project (registration) {
    if (this._projects.indexOf(registration) === -1) { this._projects.push(registration); }
  };

  Element.prototype.populate = function populate () {
    var projects = this._projects.slice();
    this._projects.length = 0;
    for (var i = 0, list = projects; i < list.length; i += 1) {
        var registration = list[i];

        this.create(registration);
      }
  };

  Element.prototype.create = function create (registration) {
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

  Element.prototype.remove = function remove (instance) {
    var index = this.instances.indexOf(instance);
    if (index > -1) { this.instances.splice(index, 1); }
    if (this._proxy) { delete this._proxy[instance.registration.property]; }
  };

  prototypeAccessors$2.parent.get = function () {
    return this._parent;
  };

  prototypeAccessors$2.ascendants.get = function () {
    return [this.parent ].concat( this.parent.ascendants);
  };

  prototypeAccessors$2.children.get = function () {
    return this._children;
  };

  prototypeAccessors$2.descendants.get = function () {
    var descendants = [].concat( this._children );
    this._children.forEach(function (child) { return descendants.push.apply(descendants, child.descendants); });
    return descendants;
  };

  // TODO : emit ascendant et descendant de changement ?

  Element.prototype.addChild = function addChild (child, index) {
    if (this._children.indexOf(child) > -1) { return null; }
    child._parent = this;
    if (!isNaN(index) && index > -1 && index < this._children.length) { this._children.splice(index, 0, child); }
    else { this._children.push(child); }
    return child;
  };

  Element.prototype.removeChild = function removeChild (child) {
    var index = this._children.indexOf(child);
    if (index === -1) { return null; }
    child._parent = null;
    this._children.splice(index, 1);
  };

  Element.prototype.emit = function emit (type, data) {
    var elements = state.getModule('stage').collection;
    var response = [];
    for (var i = 0, list = elements; i < list.length; i += 1) {
        var element = list[i];

        response.push.apply(response, element._emit(type, data));
      }
    return response;
  };

  Element.prototype._emit = function _emit (type, data) {
    var response = [];
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        response.push.apply(response, instance._emitter.emit(type, data));
      }
    return response;
  };

  Element.prototype.ascend = function ascend (type, data) {
    if (this._parent) { return this._parent._ascend(type, data); }
    return [];
  };

  Element.prototype._ascend = function _ascend (type, data) {
    var response = [];
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        response.push.apply(response, instance._ascent.emit(type, data));
      }
    if (this._parent) { response.push.apply(response, this._parent._ascend(type, data)); }
    return response;
  };

  Element.prototype.descend = function descend (type, data) {
    var response = [];
    for (var i = 0, list = this._children; i < list.length; i += 1) {
        var child = list[i];

        response.push.apply(response, child._descend(type, data));
      }
    return response;
  };

  Element.prototype._descend = function _descend (type, data) {
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

  Element.prototype.getInstance = function getInstance (instanceClassName) {
    for (var i = 0, list = this.instances; i < list.length; i += 1) {
        var instance = list[i];

        if (instance.registration.hasInstanceClassName(instanceClassName)) { return instance;
      } }
    return null;
  };

  Element.prototype.hasInstance = function hasInstance (instanceClassName) {
    return this.getInstance(instanceClassName) !== null;
  };

  Element.prototype.getDescendantInstances = function getDescendantInstances (instanceClassName, stopAtInstanceClassName, stopAtFirstInstance) {
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

  Element.prototype.getAscendantInstance = function getAscendantInstance (instanceClassName, stopAtInstanceClassName) {
    if (!instanceClassName || !this._parent) { return null; }
    var instance = this._parent.getInstance(instanceClassName);
    if (instance) { return instance; }
    if (stopAtInstanceClassName && this._parent.hasInstance(stopAtInstanceClassName)) { return null; }
    return this._parent.getAscendantInstance(instanceClassName, stopAtInstanceClassName);
  };

  Element.prototype.dispose = function dispose () {
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

  Element.prototype.prepare = function prepare (attributeName) {
    if (this.attributeNames.indexOf(attributeName) === -1) { this.attributeNames.push(attributeName); }
  };

  Element.prototype.examine = function examine () {
    var attributeNames = this.attributeNames.slice();
    this.attributeNames.length = 0;
    for (var i = this.instances.length - 1; i > -1; i--) { this.instances[i].examine(attributeNames); }
  };

  Object.defineProperties( Element.prototype, prototypeAccessors$2 );

  var Root = /*@__PURE__*/(function (Element) {
    function Root () {
      Element.call(this, document.documentElement, 'root');
      this.node.setAttribute(ns.attr('js'), true);
    }

    if ( Element ) Root.__proto__ = Element;
    Root.prototype = Object.create( Element && Element.prototype );
    Root.prototype.constructor = Root;

    return Root;
  }(Element));

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
      var element = new Element(node);
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

  var prototypeAccessors$1 = { isActive: { configurable: true } };

  prototypeAccessors$1.isActive.get = function () {
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

  Object.defineProperties( Engine.prototype, prototypeAccessors$1 );

  var engine = new Engine();

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

  var dom = {};

  dom.addClass = addClass;
  dom.hasClass = hasClass;
  dom.removeClass = removeClass;
  dom.queryParentSelector = queryParentSelector;
  dom.querySelectorAllArray = querySelectorAllArray;

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

  Object.defineProperty(internals, 'preventManipulation', {
    get: function () { return options.preventManipulation; }
  });
  Object.defineProperty(internals, 'stage', {
    get: function () { return state.getModule('stage'); }
  });

  inspector.info(("version " + (config.version)));

  var api$1 = function (node) {
    var stage = state.getModule('stage');
    return stage.getProxy(node);
  };

  api$1.Modes = Modes;

  Object.defineProperty(api$1, 'mode', {
    set: function (value) { options.mode = value; },
    get: function () { return options.mode; }
  });

  api$1.internals = internals;

  api$1.start = engine.start;
  api$1.stop = engine.stop;

  api$1.inspector = inspector;

  options.configure(window[config.namespace], api$1.start);

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

  var prototypeAccessors = { proxy: { configurable: true },isRendering: { configurable: true },isResizing: { configurable: true },isScrollLocked: { configurable: true },isLoading: { configurable: true },isSwappingFont: { configurable: true },isMouseMoving: { configurable: true },style: { configurable: true },classNames: { configurable: true },hasFocus: { configurable: true },isLegacy: { configurable: true } };
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

  prototypeAccessors.proxy.get = function () {
    var scope = this;
    return {
      render: function () { return scope.render(); },
      resize: function () { return scope.resize(); }
    };
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

  prototypeAccessors.isRendering.get = function () { return this._isRendering; };

  prototypeAccessors.isRendering.set = function (value) {
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

  prototypeAccessors.isResizing.get = function () { return this._isResizing; };

  prototypeAccessors.isResizing.set = function (value) {
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

  prototypeAccessors.isScrollLocked.get = function () {
    return this._isScrollLocked;
  };

  prototypeAccessors.isScrollLocked.set = function (value) {
    if (this._isScrollLocked === value) { return; }
    if (value) { state.add('lock', this); }
    else { state.remove('lock', this); }
    this._isScrollLocked = value;
  };

  prototypeAccessors.isLoading.get = function () {
    return this._isLoading;
  };

  prototypeAccessors.isLoading.set = function (value) {
    if (this._isLoading === value) { return; }
    if (value) { state.add('load', this); }
    else { state.remove('load', this); }
    this._isLoading = value;
  };

  Instance.prototype.load = function load () {};

  prototypeAccessors.isSwappingFont.get = function () {
    return this._isSwappingFont;
  };

  prototypeAccessors.isSwappingFont.set = function (value) {
    if (this._isSwappingFont === value) { return; }
    if (value) { state.add('font-swap', this); }
    else { state.remove('font-swap', this); }
    this._isSwappingFont = value;
  };

  Instance.prototype.swapFont = function swapFont () {};

  prototypeAccessors.isMouseMoving.get = function () { return this._isMouseMoving; };

  prototypeAccessors.isMouseMoving.set = function (value) {
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

  prototypeAccessors.style.get = function () {
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

  prototypeAccessors.classNames.get = function () {
    return getClassNames(this.node);
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

  prototypeAccessors.hasFocus.get = function () {
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

  prototypeAccessors.isLegacy.get = function () {
    return state.isLegacy;
  };

  Object.defineProperties( Instance.prototype, prototypeAccessors );
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

      this.xlink = this.node.getAttribute('xlink:href');
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

  /* legacy code here */
  api$1.internals.legacy.setLegacy();
  api$1.internals.register(api$1.core.ArtworkSelector.ARTWORK_USE, api$1.core.Artwork);

})();
//# sourceMappingURL=core.nomodule.js.map

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element");
    var n = Symbol.for("react.portal");
    var p = Symbol.for("react.fragment");
    var q = Symbol.for("react.strict_mode");
    var r = Symbol.for("react.profiler");
    var t = Symbol.for("react.provider");
    var u = Symbol.for("react.context");
    var v = Symbol.for("react.forward_ref");
    var w = Symbol.for("react.suspense");
    var x = Symbol.for("react.memo");
    var y = Symbol.for("react.lazy");
    var z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a)) for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q(k, g);
        h += R(k, b, e, f, c);
      }
      else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.act = X;
    exports.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = X;
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.3.1";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.3.1";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign = Object.assign;
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useInsertionEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module && module[requireString];
              enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.act = act;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_act = act;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useDeferredValue = useDeferredValue;
        exports.useEffect = useEffect;
        exports.useId = useId;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useInsertionEffect = useInsertionEffect;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState;
        exports.useSyncExternalStore = useSyncExternalStore;
        exports.useTransition = useTransition;
        exports.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_production_min();
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    var f = require_react();
    var k = Symbol.for("react.element");
    var l = Symbol.for("react.fragment");
    var m = Object.prototype.hasOwnProperty;
    var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    exports.Fragment = l;
    exports.jsx = q;
    exports.jsxs = q;
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx3 = jsxWithValidationDynamic;
        var jsxs2 = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx3;
        exports.jsxs = jsxs2;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_jsx_runtime_production_min();
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// scripts/generate-pdf.tsx
import ReactPDF from "@react-pdf/renderer";
import path from "path";
import { fileURLToPath } from "url";

// src/components/preview/AgreementPdfDocument.tsx
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// src/content/legalAgreementText.ts
var LEGAL_PREAMBLE = "This Client Service Agreement (\u201CAgreement\u201D) is entered into between OCEAN AND ORIGIN, operating under the brand The House of Parva (\u201CService Provider\u201D, \u201CParva\u201D, \u201Cwe\u201D, \u201Cus\u201D or \u201Cour\u201D), and the person or persons identified below (\u201CClient\u201D, \u201Cyou\u201D or \u201Cyour\u201D).";
var SECTION_1_FOOTER = "The detailed package, coverage, deliverables, fees and any booking-specific arrangements will be recorded in the Booking Schedule, which forms part of this Agreement.";
var SECTION_2_TEXT = {
  intro: "The Client is engaging Parva for the photography, filmmaking and/or creative services specifically stated in the Booking Schedule. Only the services and deliverables expressly listed there form part of the booking.",
  coverage: "Coverage & deliverables. The Booking Schedule will specify the agreed coverage period, team size where applicable, photographs, films, albums, files, formats and other deliverables.",
  creativeApproach: "Creative approach. Parva works through a candid, documentary and creatively directed approach, depending on the service selected. We will use professional and editorial judgment in photograph selection, filming, composition, editing, colour grading, music selection, story structure and final presentation.",
  additionalWork: "Additional work. Additional coverage, deliverables, albums, prints, travel, production requirements or other services requested after booking may carry additional charges and will be confirmed separately.",
  revisions: {
    title: "Revisions",
    photo: "Photography: up to two (2) rounds of reasonable revisions to the delivered photographic selection and editing. These may include colour, exposure, cropping or minor editing adjustments. They do not include a complete re-edit, a substantially different editing style, replacement of Parva\u2019s artistic selection, addition of photographs outside the agreed selection, or substantial alteration/recreation of photographs.",
    film: "Films: one (1) round of reasonable revisions to the delivered film, such as reasonable changes to editing, sequencing, text, music or similar elements where technically and creatively feasible. It does not include completely recreating or restructuring the film or changing the agreed creative direction.",
    window: "Revision window: all revision requests must be submitted together and in writing within 7 days of delivery. Requests after this period may be treated as final approval. Additional revision rounds may be charged separately."
  }
};
var SECTION_3_TEXT = {
  intro: "The total agreed fee for the booking will be stated in the Booking Schedule and invoice. The following payment structure applies unless a different schedule is expressly agreed in writing.",
  bookingConfirmation: "Booking confirmation. A date is considered confirmed only when the Client has accepted the agreed scope, signed this Agreement, and paid the 50% booking advance. Until then, the requested date remains subject to availability.",
  paymentMethods: "Payment methods. Payments may be made by bank transfer, UPI, or another payment method accepted by Parva. Payments will be recorded against the applicable invoice or receipt.",
  releaseOfWork: "Final payment and release of work. All final photographs, films, edited files, albums, digital galleries and other final deliverables will be released only after the full outstanding balance has been received and cleared. Parva is not required to provide access to final deliverables while any amount remains unpaid.",
  previewsNote: "Previews, proofs, selections or other materials shared during the production process do not constitute final delivery unless expressly stated in the Booking Schedule.",
  latePayment: "Late payment. If a scheduled payment remains unpaid after its due date, Parva may pause further work or withhold pending deliverables until the outstanding amount is cleared. Any delivery delay caused by late payment will extend the applicable delivery timeline accordingly.",
  additionalCharges: "Additional charges. Changes to the agreed scope, additional coverage, additional deliverables, albums, travel, production requirements or other client-requested additions may be charged separately and will be communicated to the Client."
};
var SECTION_4_TEXT = {
  clientCancellation: "Client cancellation. If the Client cancels a confirmed booking, the 50% booking advance is non-refundable, as the agreed date has been reserved for the Client and Parva may have declined other work for that date. Any additional amounts already paid will be dealt with according to the applicable cancellation circumstances and any specific terms recorded in the Booking Schedule.",
  rescheduling: "Rescheduling. If the Client requests a change of date, Parva will make reasonable efforts to accommodate the new date, subject to availability. If the new date is unavailable, the request may be treated as a cancellation. Additional travel, accommodation, vendor, production or other costs caused by rescheduling may be charged separately.",
  emergency: "Service Provider or team emergency. If an assigned photographer, filmmaker or other team member becomes unable to perform due to sudden illness, accident, injury, hospitalization, death in the immediate family, or another serious unforeseen emergency, Parva will promptly inform the Client and make reasonable efforts to arrange a suitable replacement from its team or trusted professional network. Where possible, the replacement will be briefed on the agreed scope and creative requirements. A replacement cannot be guaranteed in every emergency. If a suitable replacement or alternative arrangement cannot be provided, Parva and the Client will discuss a reasonable resolution. If the agreed services ultimately cannot be provided, amounts paid for services that cannot be delivered will be addressed accordingly.",
  forceMajeure: "Force majeure. Neither Party will be considered in breach where performance is prevented or materially affected by circumstances beyond reasonable control, including natural disasters, government restrictions, major emergencies, civil disturbances, strikes, or similar extraordinary events. The Parties will make reasonable efforts to reschedule or find an alternative arrangement.",
  providerCancellation: "Service Provider cancellation. If Parva is unable to provide the agreed services for reasons within its reasonable control, we will make reasonable efforts to provide a suitable alternative arrangement. If the booking cannot reasonably be fulfilled, the Parties will address amounts paid for services that cannot be provided."
};
var SECTION_5_TEXT = {
  parvaResponsibilities: "Parva responsibilities. Parva will provide the team and services stated in the Booking Schedule, arrive within the agreed reporting time, carry out the agreed coverage professionally, take reasonable precautions in handling captured media, and deliver the agreed work within the applicable delivery timeline.",
  clientResponsibilities: "Client responsibilities. The Client will provide accurate event details, timings and locations; inform Parva of material schedule changes as early as reasonably possible; provide reasonable access to required locations; obtain permissions required for photography or filming; and reasonably cooperate with the team.",
  timingsDelays: "Timings, delays & additional coverage. Coverage is limited to the duration stated in the Booking Schedule. Delays caused by the Client, guests, venue, vendors, traffic, schedule changes or other circumstances outside Parva\u2019s control do not automatically extend the contracted coverage period. Additional coverage may be provided subject to team availability and the applicable rate agreed for the booking.",
  venueRestrictions: "Venue and event restrictions. Venues, religious places, authorities, hotels or event organisers may impose restrictions on photography, filming, lighting, drones, equipment, movement or access. Parva will follow reasonable legal and venue restrictions and will not be responsible for aspects of the work that could not reasonably be completed because of such restrictions.",
  conduct: "Client & guest conduct. The Client agrees to maintain a respectful and professional environment for Parva and its team. The Client will make reasonable efforts to ensure that guests, family members, vendors, coordinators and other persons associated with the event do not engage in abusive, threatening, discriminatory, harassing or unsafe behaviour towards the team. Parva may request that such behaviour stop and may pause or, where necessary for safety, stop providing services if serious or continued misconduct creates an unsafe, hostile or unreasonably disruptive working environment. Parva will communicate with the Client and take reasonable steps toward an appropriate resolution. Parva and its team will likewise conduct themselves respectfully and professionally toward the Client and event attendees.",
  travelAccommodation: "Travel & accommodation. Travel, accommodation and related expenses will be determined on a booking-by-booking basis and stated in the Booking Schedule. For outstation or international assignments, flights or other transport, accommodation, local transport, permits, visas, taxes and other applicable expenses may be charged or arranged as agreed."
};
var SECTION_6_TEXT = {
  delivery: "Delivery. Final photographs, films and other deliverables will be provided through the delivery method and within the timeline stated in the Booking Schedule. Different services may have different delivery timelines.",
  rawFiles: "RAW and unedited files. RAW, unedited, rejected, duplicate, test, outtake or other source files are not included in the final deliverables unless specifically agreed in writing.",
  albums: "Albums & physical products. Albums, prints, frames, books and other physical products are included only where stated in the Booking Schedule. Where an album is included, the Client will select photographs or authorize Parva to make the selection, as agreed. The Client will receive a proof for approval where applicable. Reasonable album revisions may be requested within the limit specified in the Booking Schedule. Changes after final approval or after production has begun may result in additional charges and delays. Client delays in photograph selection, approvals, information or other required responses may extend the delivery timeline. Minor variations in colour, paper, texture, printing, binding or finish may occur as part of professional production and do not necessarily constitute a defect.",
  dataProtection: "Data protection & backup. Parva will take reasonable professional precautions to protect captured photographs and footage and may maintain backup copies as part of its normal workflow. No digital storage system can guarantee against every possible form of data loss, corruption, theft, hardware failure, software failure or other technical incident. In the event of significant data loss despite reasonable professional precautions, Parva will communicate with the Client and make reasonable efforts to recover or restore affected material where technically possible. Parva will not be responsible for material that cannot be recovered due to circumstances beyond its reasonable control.",
  archival: "Archival. Parva will make reasonable efforts to retain final delivered files for the archival period stated in the Booking Schedule. Unless otherwise stated, smaller shoots and events are archived for 3 months and weddings and larger productions for 6 months from final delivery. After that period, files may be permanently deleted without further notice. The Client is responsible for maintaining their own backup after delivery."
};
var SECTION_7_TEXT = {
  copyright: "Copyright & client use. Unless otherwise agreed in writing, copyright and intellectual property in photographs, films, footage, audio recordings, creative concepts, edits, compositions and other original creative works remain with the Service Provider, subject to applicable law. After full payment, the Client receives a non-exclusive, personal, non-commercial licence to use the final delivered photographs and films for personal social media, family sharing, personal printing, albums and personal keepsakes. Commercial sale, licensing, advertising, resale or other commercial exploitation requires written permission from Parva.",
  portfolio: "Portfolio & promotional usage. The Client grants Parva permission to use selected photographs, films and other creative works from the booking for its portfolio and promotional activities, including The House of Parva website, social media, portfolio presentations, brochures, advertising, showcases, awards, exhibitions, publications and competitions.",
  optOut: "Client opt-out. The Client may request in writing before the event or shoot that their identifiable photographs and/or films not be used for public portfolio or promotional purposes. Parva will respect such opt-out for future public use, subject to material already published or submitted before the request was received.",
  privacy: "Privacy. Parva will treat personal information shared for the purpose of providing services with reasonable care and confidentiality. The Client should inform Parva in advance of any specific privacy requirements or sensitive situations. Event coverage may naturally include guests, family members, vendors, venue staff and other attendees."
};
var SECTION_8_TEXT = {
  entireAgreement: "Entire agreement. This Agreement, together with the Booking Schedule, approved package details and applicable invoices, forms the complete understanding between the Parties regarding the booked services and supersedes prior discussions relating to the same booking.",
  changes: "Changes. Any material change to the agreed scope, fees, deliverables or other terms should be confirmed in writing by both Parties.",
  communication: "Communication. The Parties may use email, messaging applications or other mutually accepted written communication for booking-related confirmations, approvals and instructions. Important changes to the booking should be recorded in writing.",
  liability: "Liability. Parva will take reasonable professional care in providing the agreed services. To the extent permitted by applicable law, Parva will not be responsible for indirect or consequential losses arising from circumstances beyond its reasonable control. Nothing in this Agreement is intended to exclude any liability that cannot lawfully be excluded.",
  governingLaw: "Governing law. This Agreement will be governed by the laws applicable in India. The Parties will first attempt to resolve any dispute through good-faith discussion. Where a dispute cannot be resolved amicably, the courts having appropriate jurisdiction in Bengaluru, Karnataka will have jurisdiction, subject to applicable law.",
  execution: "Execution. This Agreement may be signed physically or electronically. For local Bangalore bookings, the Parties may execute physical copies. For bookings outside Bangalore, the Parties may execute the Agreement electronically and exchange the completed copy.",
  confirmationStatement: "By signing below, both Parties confirm that they have read, understood and agreed to the terms of this Agreement and the Booking Schedule."
};

// src/components/preview/AgreementPdfDocument.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function formatPdfCurrency(amount) {
  if (amount === void 0 || amount === null || isNaN(amount)) return "Rs. 0";
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(amount);
  return `Rs. ${formatted}`;
}
var styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 54,
    // Leave generous space for bottom initial boxes & footer
    paddingLeft: 44,
    paddingRight: 44,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.42,
    color: "#221F20"
  },
  // Running Bottom Container: Initials + Footer Rule + Page Number
  bottomContainer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44
  },
  bottomInitialsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginBottom: 6
  },
  initialText: {
    fontSize: 7.5,
    color: "#78716C"
  },
  runningFooterLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#D8CEBE",
    paddingTop: 5
  },
  footerText: {
    fontSize: 7.5,
    color: "#8E867E",
    letterSpacing: 0.5
  },
  // Cover Page Styles
  coverContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 16,
    alignItems: "center",
    textAlign: "center"
  },
  coverBrandHeader: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#581825",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 16
  },
  coverTitle: {
    fontSize: 22,
    fontFamily: "Times-Roman",
    color: "#581825",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6
  },
  coverSubtitle: {
    fontSize: 11,
    color: "#78716C",
    letterSpacing: 0.5,
    marginBottom: 30
  },
  watermarkImage: {
    width: 140,
    height: 140,
    marginVertical: 24,
    opacity: 0.45,
    alignSelf: "center"
  },
  coverTagline: {
    fontSize: 9.5,
    fontFamily: "Times-Italic",
    color: "#581825",
    maxWidth: 320,
    lineHeight: 1.5,
    marginVertical: 20
  },
  coverSummaryBox: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#D8CEBE",
    backgroundColor: "#FAF8F5",
    flexDirection: "row",
    marginVertical: 18
  },
  coverSummaryCol: {
    flex: 1,
    padding: 10,
    textAlign: "left"
  },
  coverSummaryColBorder: {
    borderRightWidth: 0.5,
    borderRightColor: "#D8CEBE"
  },
  coverSummaryHeader: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#581825",
    textTransform: "uppercase",
    marginBottom: 4
  },
  coverSummaryText: {
    fontSize: 8,
    color: "#4A4646",
    lineHeight: 1.35
  },
  coverLocationFooter: {
    fontSize: 8,
    color: "#78716C",
    letterSpacing: 0.5
  },
  // Section Headings
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    color: "#581825",
    marginBottom: 8,
    marginTop: 4
  },
  subSectionTitle: {
    fontSize: 9,
    fontFamily: "Times-Bold",
    color: "#221F20",
    marginTop: 6,
    marginBottom: 2
  },
  paragraph: {
    marginBottom: 6,
    textAlign: "justify"
  },
  clauseBold: {
    fontWeight: "bold",
    color: "#221F20"
  },
  // Boxed Details Table
  tableContainer: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#D8CEBE",
    marginVertical: 8
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAE3D9",
    minHeight: 18,
    alignItems: "center"
  },
  tableCellLabel: {
    width: "32%",
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 8,
    fontWeight: "bold",
    color: "#581825",
    backgroundColor: "#FAF8F5",
    borderRightWidth: 0.5,
    borderRightColor: "#EAE3D9"
  },
  tableCellValue: {
    width: "68%",
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 8,
    color: "#221F20"
  },
  // Milestone Schedule Table
  milestoneRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D8CEBE",
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  milestonePct: {
    width: "35%",
    fontSize: 8,
    fontWeight: "bold",
    color: "#581825"
  },
  milestoneCondition: {
    width: "65%",
    fontSize: 8,
    color: "#4A4646"
  },
  // Signature Block Table
  signatureTable: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#D8CEBE",
    marginTop: 14,
    marginBottom: 10
  },
  signatureCol: {
    width: "50%",
    padding: 10
  },
  signatureLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#221F20",
    marginVertical: 14,
    width: "90%"
  }
});
var AgreementPdfDocument = ({
  document: doc,
  watermarkSrc = "/logo4.png"
}) => {
  const { client, booking, commercial, delivery, specialTerms, signatures } = doc;
  const renderBottom = (pageNumber, showInitials = true) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.bottomContainer, fixed: true, children: [
    showInitials && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.bottomInitialsRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.initialText, children: "Client initials: _________" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.initialText, children: "The House of Parva, Designated Partner: _________" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.runningFooterLine, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.footerText, children: "THE HOUSE OF PARVA | CLIENT SERVICE AGREEMENT" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.footerText, children: pageNumber })
    ] })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    Document,
    {
      title: `Agreement - ${client.name || "Parva"}`,
      author: "The House of Parva (OCEAN AND ORIGIN)",
      subject: "Master Client Booking Agreement",
      keywords: "Photography, Film, Contract, The House of Parva",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.coverContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverBrandHeader, children: "THE HOUSE OF PARVA" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverTitle, children: "CLIENT SERVICE AGREEMENT" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverSubtitle, children: "Photography & Filmmaking" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: { alignItems: "center" }, children: [
              watermarkSrc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { src: watermarkSrc, style: styles.watermarkImage }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverTagline, children: "A clear agreement for the work, care and creative process behind your story." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: { width: "100%" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.coverSummaryBox, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: [styles.coverSummaryCol, styles.coverSummaryColBorder], children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverSummaryHeader, children: "Service Provider" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverSummaryText, children: "OCEAN AND ORIGIN" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverSummaryText, children: "Operating under The House of Parva" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.coverSummaryCol, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverSummaryHeader, children: "Client" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.coverSummaryText, children: [
                    "Name: ",
                    client.name || "__________________________"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.coverSummaryText, children: [
                    "Event / Shoot: ",
                    booking.eventType || "__________________________"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.coverLocationFooter, children: "Bangalore, Karnataka \u2022 Worldwide assignments welcome" })
            ] })
          ] }),
          renderBottom("01", false)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "1. Parties & Booking Details" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: LEGAL_PREAMBLE }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Client name" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: client.name || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Address" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: client.address || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Phone" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: client.phone || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Email" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: client.email || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Event / Shoot" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: booking.eventType || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Date(s)" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: booking.eventDate || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Location(s)" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: booking.location || "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Package / Services" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: doc.services.packageName || "Standard Coverage" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: [styles.tableRow, { borderBottomWidth: 0 }], children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Agreement date" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: booking.bookingDate || "\u2014" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: [styles.paragraph, { marginBottom: 10 }], children: SECTION_1_FOOTER }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "2. Services, Deliverables & Creative Approach" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_2_TEXT.intro }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Coverage & deliverables. " }),
            SECTION_2_TEXT.coverage.replace("Coverage & deliverables. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Creative approach. " }),
            SECTION_2_TEXT.creativeApproach.replace("Creative approach. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Additional work. " }),
            SECTION_2_TEXT.additionalWork.replace("Additional work. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Revisions" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Photography: " }),
            "up to two (2) rounds of reasonable revisions to the delivered photographic selection and editing. These may include colour, exposure, cropping or minor editing adjustments. They do not include a complete re-edit, a substantially different editing style, replacement of Parva\u2019s artistic selection, addition of photographs outside the agreed selection, or substantial alteration/recreation of photographs."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Films: " }),
            "one (1) round of reasonable revisions to the delivered film, such as reasonable changes to editing, sequencing, text, music or similar elements where technically and creatively feasible. It does not include completely recreating or restructuring the film or changing the agreed creative direction."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Revision window: " }),
            "all revision requests must be submitted together and in writing within 7 days of delivery. Requests after this period may be treated as final approval. Additional revision rounds may be charged separately."
          ] }),
          renderBottom("02")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "3. Fees, Payment & Booking Confirmation" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_3_TEXT.intro }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.milestoneRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.milestonePct, children: "50% \u2022 Booking advance" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.milestoneCondition, children: "Payable at booking to reserve the agreed date(s)." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.milestoneRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.milestonePct, children: "30% \u2022 Pre-event payment" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.milestoneCondition, children: "Payable before the event / shoot, on the date stated in the Booking Schedule or invoice." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: [styles.milestoneRow, { borderBottomWidth: 0 }], children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.milestonePct, children: "20% \u2022 Final payment" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.milestoneCondition, children: "Payable before release of the final deliverables." })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Booking confirmation. " }),
            SECTION_3_TEXT.bookingConfirmation.replace("Booking confirmation. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Payment methods. " }),
            SECTION_3_TEXT.paymentMethods.replace("Payment methods. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Final payment and release of work. " }),
            SECTION_3_TEXT.releaseOfWork.replace("Final payment and release of work. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_3_TEXT.previewsNote }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Late payment. " }),
            SECTION_3_TEXT.latePayment.replace("Late payment. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.clauseBold, children: "Additional charges. " }),
            SECTION_3_TEXT.additionalCharges.replace("Additional charges. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: [styles.subSectionTitle, { marginTop: 8 }], children: "BOOKING SCHEDULE / COMMERCIAL SUMMARY" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Total agreed fee" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.tableCellValue, children: [
                "\u25A0 ",
                formatPdfCurrency(commercial.totalFee)
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "50% advance received" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.tableCellValue, children: [
                "\u25A0 ",
                formatPdfCurrency(commercial.bookingAdvance)
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "30% due by" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: commercial.preEventDueDate || "7 days prior to event" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.tableRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "20% due before final delivery" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: commercial.finalDueDate || "Before release of final deliverables" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: [styles.tableRow, { borderBottomWidth: 0 }], children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellLabel, children: "Invoice / reference" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.tableCellValue, children: commercial.invoiceReference || "INV-2026" })
            ] })
          ] }),
          renderBottom("03")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "4. Cancellation, Rescheduling & Unforeseen Circumstances" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Client cancellation" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_4_TEXT.clientCancellation.replace("Client cancellation. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Rescheduling" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_4_TEXT.rescheduling.replace("Rescheduling. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Service Provider or team emergency" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_4_TEXT.emergency.replace("Service Provider or team emergency. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Force majeure" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_4_TEXT.forceMajeure.replace("Force majeure. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Service Provider cancellation" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_4_TEXT.providerCancellation.replace("Service Provider cancellation. ", "") }),
          renderBottom("04")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "5. Event, Client & Team Responsibilities" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Parva responsibilities" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_5_TEXT.parvaResponsibilities.replace("Parva responsibilities. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Client responsibilities" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_5_TEXT.clientResponsibilities.replace("Client responsibilities. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Timings, delays & additional coverage" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_5_TEXT.timingsDelays.replace("Timings, delays & additional coverage. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Venue and event restrictions" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_5_TEXT.venueRestrictions.replace("Venue and event restrictions. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Client & guest conduct" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_5_TEXT.conduct.replace("Client & guest conduct. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Travel & accommodation" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_5_TEXT.travelAccommodation.replace("Travel & accommodation. ", "") }),
          renderBottom("05")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "6. Delivery, Albums & Data" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Delivery" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: styles.paragraph, children: [
            delivery.expectedTimeline ? `Final deliverables will be provided within ${delivery.expectedTimeline}. ` : "",
            SECTION_6_TEXT.delivery.replace("Delivery. ", "")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "RAW and unedited files" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_6_TEXT.rawFiles.replace("RAW and unedited files. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Albums & physical products" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_6_TEXT.albums.replace("Albums & physical products. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Data protection & backup" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_6_TEXT.dataProtection.replace("Data protection & backup. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Archival" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_6_TEXT.archival.replace("Archival. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: [styles.sectionTitle, { marginTop: 8 }], children: "7. Copyright, Privacy & Portfolio Usage" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Copyright & client use" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_7_TEXT.copyright.replace("Copyright & client use. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Portfolio & promotional usage" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_7_TEXT.portfolio.replace("Portfolio & promotional usage. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Client opt-out" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_7_TEXT.optOut.replace("Client opt-out. ", "") }),
          renderBottom("06")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Privacy" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_7_TEXT.privacy.replace("Privacy. ", "") }),
          specialTerms.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: { marginTop: 14 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "Special Terms & Booking Rider" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, { style: [styles.tableContainer, { padding: 10, backgroundColor: "#FAF8F5" }], children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: [styles.paragraph, { fontFamily: "Times-Roman", fontStyle: "italic" }], children: specialTerms.text }) })
          ] }) : null,
          renderBottom("07")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.sectionTitle, children: "8. General Terms & Signatures" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Entire agreement" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_8_TEXT.entireAgreement.replace("Entire agreement. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Changes" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_8_TEXT.changes.replace("Changes. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Communication" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_8_TEXT.communication.replace("Communication. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Liability" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_8_TEXT.liability.replace("Liability. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Governing law" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_8_TEXT.governingLaw.replace("Governing law. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.subSectionTitle, children: "Execution" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: styles.paragraph, children: SECTION_8_TEXT.execution.replace("Execution. ", "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: [styles.paragraph, { marginTop: 8, fontWeight: "bold" }], children: SECTION_8_TEXT.confirmationStatement }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, { style: styles.signatureTable, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: { flexDirection: "row" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: [styles.signatureCol, { borderRightWidth: 0.5, borderRightColor: "#D8CEBE" }], children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8.5, fontWeight: "bold", color: "#581825", marginBottom: 2 }, children: "FOR OCEAN AND ORIGIN" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8, color: "#78716C", marginBottom: 14 }, children: "The House of Parva (Designated Partner)" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8, color: "#78716C" }, children: "Signature:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, { style: styles.signatureLine }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: { fontSize: 8, color: "#221F20", marginBottom: 5 }, children: [
                "Name: ",
                signatures.representativeName || "Designated Partner"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: { fontSize: 8, color: "#221F20", marginBottom: 5 }, children: [
                "Date: ",
                signatures.representativeSignatureDate || "_______________________"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8, color: "#78716C" }, children: "Phone / Email: hello@thehouseofparva.in" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { style: styles.signatureCol, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8.5, fontWeight: "bold", color: "#581825", marginBottom: 2 }, children: "CLIENT" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8, color: "#78716C", marginBottom: 14 }, children: "Authorized Representative / Client" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8, color: "#78716C" }, children: "Signature:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, { style: styles.signatureLine }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: { fontSize: 8, color: "#221F20", marginBottom: 5 }, children: [
                "Name: ",
                signatures.clientName || client.name || "_______________________"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: { fontSize: 8, color: "#221F20", marginBottom: 5 }, children: [
                "Date: ",
                signatures.clientSignatureDate || "_______________________"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { style: { fontSize: 8, color: "#78716C" }, children: [
                "Phone / Email: ",
                client.phone || "_______________________"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 8.5, fontFamily: "Times-Italic", textAlign: "center", color: "#581825", marginTop: 10 }, children: "Thank you for trusting us with your story." }),
          renderBottom("08", false)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { size: "A4", style: styles.page, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, { style: { flex: 1, justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { style: { fontSize: 10, letterSpacing: 2, color: "#581825", textTransform: "uppercase" }, children: "THE HOUSE OF PARVA \u2022 PHOTOGRAPHY \u2022 FILMS \u2022 STORIES" }) }),
          renderBottom("09", false)
        ] })
      ]
    }
  );
};

// src/utils/calculations.ts
function calculateMilestones(totalFee, customPercentages) {
  const cleanTotal = Math.max(0, Math.round(totalFee || 0));
  const advancePct = customPercentages?.advancePct ?? 0.5;
  const preEventPct = customPercentages?.preEventPct ?? 0.3;
  const bookingAdvance = Math.round(cleanTotal * advancePct);
  const preEventPayment = Math.round(cleanTotal * preEventPct);
  const finalPayment = Math.max(0, cleanTotal - bookingAdvance - preEventPayment);
  return {
    totalFee: cleanTotal,
    bookingAdvance,
    preEventPayment,
    finalPayment
  };
}

// src/utils/defaults.ts
function createDefaultBookingData(type = "Agreement") {
  const totalFee = 15e4;
  const milestones = calculateMilestones(totalFee);
  return {
    id: `DOC-${Date.now()}`,
    documentType: type,
    createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    updatedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    client: {
      name: "",
      address: "",
      phone: "",
      email: ""
    },
    booking: {
      bookingId: `PARVA-${(/* @__PURE__ */ new Date()).getFullYear()}-001`,
      bookingDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      eventType: "Wedding Photography & Film",
      eventDate: "",
      location: "Bangalore, Karnataka",
      coverageStart: "08:00 AM",
      coverageEnd: "10:00 PM"
    },
    services: {
      packageName: "Comprehensive Wedding Story",
      selectedServices: [
        "Candid Photography",
        "Cinematic Wedding Film",
        "Traditional / Stage Coverage"
      ],
      additionalServices: [],
      teamDetails: "4-person creative crew (2 photographers, 2 cinematographers)"
    },
    deliverables: {
      items: [
        "Curated selection of 400+ high-resolution edited photographs",
        "Cinematic Wedding Film (4\u20136 minutes)",
        "Full ceremony documentary cut (45\u201360 minutes)",
        "Handcrafted 12x12 Premium Fine-Art Wedding Album (40 pages)",
        "Private cloud gallery with high-speed download access"
      ]
    },
    commercial: {
      ...milestones,
      advanceDueDate: "Upon signing of agreement",
      preEventDueDate: "7 days prior to event",
      finalDueDate: "Before release of final deliverables",
      additionalCharges: [],
      travelAccommodation: {
        included: true,
        details: "Local Bangalore travel included. Outstation travel billed at actuals."
      },
      invoiceReference: "INV-2026-001"
    },
    delivery: {
      expectedTimeline: "4 to 6 weeks from photograph selection",
      photographyRevisions: 2,
      // Specification default
      filmRevisions: 1,
      // Specification default
      archivalPeriod: "3 months for smaller shoots/events, 6 months for weddings and larger productions"
    },
    specialTerms: {
      text: "RAW and unedited source files remain excluded unless expressly agreed in writing. High-resolution edited JPEGs will be provided via private gallery."
    },
    signatures: {
      clientName: "",
      clientSignatureDate: "",
      representativeName: "Designated Partner",
      representativeSignatureDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    }
  };
}
var SAMPLE_AGREEMENT_FIXTURE = {
  ...createDefaultBookingData("Agreement"),
  id: "AGR-PARVA-2026-112",
  client: {
    name: "Meera Krishnan & Aditya Singhania",
    address: "Villa 14, Prestige Golfshire, Nandi Hills Road, Devanahalli, Bengaluru, Karnataka 560085",
    phone: "+91 98450 67890",
    email: "meera.aditya@gmail.com"
  },
  booking: {
    bookingId: "PARVA-2026-112",
    bookingDate: "2026-04-10",
    eventType: "Three-Day Destination Wedding & Sangeet Gala",
    eventDate: "2026-12-04 to 2026-12-06",
    location: "Taj West End & Palace Grounds, Bengaluru",
    coverageStart: "06:30 AM",
    coverageEnd: "11:30 PM"
  },
  services: {
    packageName: "Grand Royal Editorial Wedding Collection (3 Days)",
    selectedServices: [
      "Candid & Editorial Fine-Art Photography",
      "Cinematic 4K Wedding Feature Film & Teaser Trailer",
      "Traditional Ceremony Documentation & Live Archival Feed",
      "Pre-Wedding Sunrise Couple Conceptual Portraiture"
    ],
    additionalServices: [],
    teamDetails: "6-Person Dedicated Creative Crew (3 Editorial Photographers, 2 Cinematographers, 1 Drone Pilot)"
  },
  deliverables: {
    items: [
      "Curated selection of 650+ master-graded, high-resolution digital photographs",
      "Cinematic 4K Wedding Teaser (3 to 5 minutes) delivered within 21 days",
      "Extended Full Ceremony Feature Documentary Film (45 to 60 minutes)",
      "Two Handcrafted 12x12 Premium Italian Leather Fine-Art Wedding Albums (50 pages each)",
      "Two 8x8 Mini-Duplicates for Parents (Fine-Art Archival Paper)",
      "Private Password-Protected Cloud Gallery with 1-Year Ultra-HD Streaming & Archival Downloads"
    ]
  },
  commercial: {
    totalFee: 45e4,
    bookingAdvance: 225e3,
    // 50%
    preEventPayment: 135e3,
    // 30%
    finalPayment: 9e4,
    // 20%
    advanceDueDate: "2026-04-18",
    preEventDueDate: "2026-11-13",
    finalDueDate: "Upon delivery of cinematic teaser preview",
    additionalCharges: [
      { id: "c1", description: "Licensed Dual-Operator 4K Drone Aerial Cinematography", amount: 35e3 },
      { id: "c2", description: "Heirloom Parent Albums (2x 8x8 Fine-Art Copies)", amount: 25e3 }
    ],
    travelAccommodation: {
      included: true,
      details: "Included in fee for all Bengaluru & Devanahalli locations. Dedicated crew transit provided by Parva."
    },
    invoiceReference: "INV-2026-112"
  },
  delivery: {
    expectedTimeline: "4 to 6 weeks from photograph selection",
    photographyRevisions: 2,
    filmRevisions: 1,
    archivalPeriod: "3 months for smaller shoots/events, 6 months for weddings and larger productions"
  },
  specialTerms: {
    text: "RAW and unedited source files remain excluded unless expressly agreed in writing. High-resolution edited JPEGs will be provided via private gallery. Drone flight subject to venue clearances and DGCA local airspace regulations."
  },
  signatures: {
    clientName: "Meera Krishnan",
    clientSignatureDate: "2026-04-12",
    representativeName: "Designated Partner",
    representativeSignatureDate: "2026-04-12"
  }
};
var SAMPLE_INVOICE_FIXTURE = {
  ...SAMPLE_AGREEMENT_FIXTURE,
  documentType: "Invoice",
  invoiceNumber: "INV-2026-112",
  invoiceDate: "2026-04-10",
  dueDate: "2026-04-18",
  commercial: {
    ...SAMPLE_AGREEMENT_FIXTURE.commercial,
    additionalCharges: []
  },
  lineItems: [
    {
      id: "item-1",
      description: "Grand Royal Editorial Wedding Collection (3 Days Coverage)",
      quantity: 1,
      rate: 45e4,
      amount: 45e4
    },
    {
      id: "item-2",
      description: "Licensed Dual-Operator 4K Drone Aerial Cinematography",
      quantity: 1,
      rate: 35e3,
      amount: 35e3
    },
    {
      id: "item-3",
      description: "Heirloom Parent Albums (2x 8x8 Fine-Art Copies)",
      quantity: 2,
      rate: 12500,
      amount: 25e3
    }
  ],
  discount: 2e4,
  taxEnabled: false,
  // Optional GST per spec
  taxRate: 18,
  paymentStatus: "Partially Paid",
  amountPaid: 245e3,
  // 50% advance paid (₹2,25,000 + ₹20,000 portion)
  paymentMethod: "Bank Transfer (NEFT/RTGS)",
  notes: "Bank details: HDFC Bank, Beneficiary: OCEAN AND ORIGIN, Account: 50200012345678, IFSC: HDFC0001234. Reference: INV-2026-112"
};

// scripts/generate-pdf.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function run() {
  const outputPath = path.resolve(__dirname, "../public/Parva_Master_Agreement_Generated.pdf");
  const watermarkPath = path.resolve(__dirname, "../public/logo4.png");
  console.log("Rendering Master Agreement PDF to:", outputPath);
  await ReactPDF.renderToFile(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      AgreementPdfDocument,
      {
        document: SAMPLE_AGREEMENT_FIXTURE,
        watermarkSrc: watermarkPath
      }
    ),
    outputPath
  );
  console.log("PDF successfully generated at:", outputPath);
}
run().catch(console.error);
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

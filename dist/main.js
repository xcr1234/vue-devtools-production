// ==UserScript==
// @name            Vue生产环境（production） Devtools 调试
// @namespace       https://github.com/xcr1234/vue-devtools-production
// @version         1.2.1
// @description     使用本脚本支持直接调试生产环境的Vue项目 完美支持Vue2、Vue3！
// @homepage        https://github.com/xcr1234/vue-devtools-production
// @icon            data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAbpJREFUOE+lkz9IG2EYxp/3Eo1GHWzFDqFKLQ6CIGpLS9GSQzGniw5OLTg6CCLO5kT86FpolnR3kFYXJ+9o2u9EcPEPEdqp4qKlbbaihpxw98n3JUqMqYp+03s87/P7/jzvEe656J5+KIC+ymwQBmR99OGnYgoh1rethdeyfjY4tg6gR9Z1U615HfTFMeIDCtC38u6RH/L/yPo0/S/lrmX6VRfRKAEBIcQn+Vn5on4j9LLhlQL43mNnaO7w4grR1XlGRHEpHn/c3xWu1wHgBwANQBtVaPu1E09bCuAEj8Wn1B7Fb6Bb7ARA2Pud28l+Pugq1sIjke+B5nA7gBw3zOpz7RIgarNREliSYnb5IOX9yqmraA2hzZq3Tc/Vjj4mvg2ZybIA9aAW4wCivutnjpN7NUSk1Y4/yVJ18CGANDfMzuKTXYlRt+e7IWhLNrk8w4WPYFVfY28+GejOoOlcCyjEmgBhsmRGFrlhvimdm7KDFLPmHpwikAEQyBvI01yKfB2e+XsrgDqFzaYh8L5gmOWGyUrNV2IsbdAtlgYQ5IYp4yu7rv0XojYbkQAnZi7fCfA/040p3MZ43nMG7TKHEfrJ20kAAAAASUVORK5CYII=
// @include         *
// @run-at          document-end
// @grant           none
// ==/UserScript==

//Build Code - DO NOT MODIFY:

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
main_1.default();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue2_1 = __webpack_require__(2);
var vue3_1 = __webpack_require__(3);
exports.default = (function () {
    if (self != top) {
        //在iframe中不执行此脚本
        return;
    }
    var devtools = window['__VUE_DEVTOOLS_GLOBAL_HOOK__'];
    if (!devtools) {
        console.warn('No Vue devtools found , Please install it first: ');
        console.warn('see https://github.com/vuejs/vue-devtools');
        return;
    }
    //脚本的运行时机为 document-end，因此脚本执行时 能获取到app对象
    var app = window.app;
    if (!app) {
        return;
    }
    if (app.__vue__) {
        //脚本运行时就取到了Vue2 app，直接注入Vue2
        vue2_1.hookVue2(devtools, app.__vue__);
        return;
    }
    if (app.__vue_app__) {
        //脚本运行时就取到了Vue3 app，直接注入Vue3
        vue3_1.hookVue3(devtools, app.__vue_app__);
        return;
    }
    //脚本运行时，vue2和vue3都没检测到，需要开启一个MutationObserver，动态检测
    //关于MutationObserver参考 https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
    var observer = new MutationObserver((function (mutations, observer) {
        var disconnect = observer.disconnect.bind(observer);
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var mutation = mutations_1[_i];
            //把target强制转成WindowApp，这样才能获取其中的实例
            var target = mutation.target;
            if (target.__vue__) {
                vue2_1.hookVue2(devtools, target.__vue__);
                disconnect();
            }
            else if (target.__vue_app__) {
                vue3_1.hookVue3(devtools, target.__vue_app__);
                disconnect();
            }
        }
    }));
    observer.observe(document.documentElement, {
        attributes: true,
        subtree: true,
        childList: true
    });
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hookVue2 = void 0;
/**
 * Vue2注册到Vue DevTool上的方式
 * 参考资料 https://zhuanlan.zhihu.com/p/23921964
 * @param devtools
 * @param root
 */
exports.hookVue2 = function (devtools, root) {
    //通过vue实例构造函数取出Vue实例
    var Vue = Object.getPrototypeOf(root).constructor;
    while (Vue.super) {
        //Vue2有多级，要找到最顶级的
        Vue = Vue.super;
    }
    if (Vue.config.devtools) {
        //当前已经开启了devtools了，避免在dev环境注入或者重复注入
        return;
    }
    //手工开启devtools
    Vue.config.devtools = true;
    //这部分代码参考了vue2的源码
    //https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/index.js
    devtools.emit('init', Vue);
    console.log("vue devtools for [" + Vue.version + "] already open !!!");
    //如果有vuex store，也注册
    //参考vuex的源码实现
    if (root.$store) {
        var store_1 = root.$store;
        store_1._devtoolHook = devtools;
        devtools.emit('vuex:init', store_1);
        devtools.on('vuex:travel-to-state', function (targetState) {
            store_1.replaceState(targetState);
        });
        store_1.subscribe(function (mutation, state) {
            devtools.emit('vuex:mutation', mutation, state);
        });
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hookVue3 = void 0;
var vue3_store_1 = __webpack_require__(4);
var getSymbol = function (value) {
    return typeof Symbol === 'function' ? Symbol(value) : value;
};
/**
 * vue3的注册方式
 * @param hook
 * @param vue
 */
exports.hookVue3 = function (hook, vue) {
    if (vue.config.devtools) {
        //当前已经开启了devtools了，避免在dev环境注入或者重复注入
        return;
    }
    //手工开启devtools
    vue.config.devtools = true;
    // 参考了 vue-core的源码 实现
    // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/devtools.ts
    hook.emit('app:init', vue, vue.version, {
        Fragment: getSymbol('Fragment'),
        Text: getSymbol('Text'),
        Comment: getSymbol('Comment'),
        Static: getSymbol('Static')
    });
    console.log("vue devtools for [" + vue.version + "] already open !!!");
    var unmount = vue.unmount.bind(vue);
    vue.unmount = function () {
        hook.emit('app:unmount', vue);
        unmount();
    };
    //注册Vue3 Store，参考代码
    // https://github.com/vuejs/vuex/blob/main/src/store.js
    // https://github.com/vuejs/vuex/blob/main/src/plugins/devtool.
    var store = vue.config.globalProperties.$store;
    if (store) {
        vue3_store_1.addDevtools(vue, store);
    }
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDevtools", function() { return addDevtools; });
/* harmony import */ var _vue_devtools_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/**
 * 此文件是vue3 的vuex注册方式，是直接从vue源码里面复制过来的，并且把es6转成了es5
 * 源文件：
 * https://github.com/vuejs/vuex/blob/main/src/plugins/devtool.js
 * 我复制时的Git commit id:d0409cb
 * es6转es5工具： https://es6console.com/
 */


function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

function makeLocalGetters(store, namespace) {
    if (!store._makeLocalGettersCache[namespace]) {
        (function () {
            var gettersProxy = {};
            var splitPos = namespace.length;
            Object.keys(store.getters).forEach(function (type) {
                // skip if the target getter is not match this namespace
                if (type.slice(0, splitPos) !== namespace) return;

                // extract local getter type
                var localType = type.slice(splitPos);

                // Add a port to the getters proxy.
                // Define as getter property because
                // we do not want to evaluate the getters in this time.
                Object.defineProperty(gettersProxy, localType, {
                    get: function get() {
                        return store.getters[type];
                    },
                    enumerable: true
                });
            });
            store._makeLocalGettersCache[namespace] = gettersProxy;
        })();
    }

    return store._makeLocalGettersCache[namespace];
}

var LABEL_VUEX_BINDINGS = 'vuex bindings';
var MUTATIONS_LAYER_ID = 'vuex:mutations';
var ACTIONS_LAYER_ID = 'vuex:actions';
var INSPECTOR_ID = 'vuex';

var actionId = 0;

function addDevtools(app, store) {
    Object(_vue_devtools_api__WEBPACK_IMPORTED_MODULE_0__["setupDevtoolsPlugin"])({
        id: 'org.vuejs.vuex',
        app: app,
        label: 'Vuex',
        homepage: 'https://next.vuex.vuejs.org/',
        logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
        packageName: 'vuex',
        componentStateTypes: [LABEL_VUEX_BINDINGS]
    }, function (api) {
        api.addTimelineLayer({
            id: MUTATIONS_LAYER_ID,
            label: 'Vuex Mutations',
            color: COLOR_LIME_500
        });

        api.addTimelineLayer({
            id: ACTIONS_LAYER_ID,
            label: 'Vuex Actions',
            color: COLOR_LIME_500
        });

        api.addInspector({
            id: INSPECTOR_ID,
            label: 'Vuex',
            icon: 'storage',
            treeFilterPlaceholder: 'Filter stores...'
        });

        api.on.getInspectorTree(function (payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                if (payload.filter) {
                    var nodes = [];
                    flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, '');
                    payload.rootNodes = nodes;
                } else {
                    payload.rootNodes = [formatStoreForInspectorTree(store._modules.root, '')];
                }
            }
        });

        api.on.getInspectorState(function (payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                var modulePath = payload.nodeId;
                makeLocalGetters(store, modulePath);
                payload.state = formatStoreForInspectorState(getStoreModule(store._modules, modulePath), modulePath === 'root' ? store.getters : store._makeLocalGettersCache, modulePath);
            }
        });

        api.on.editInspectorState(function (payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                (function () {
                    var modulePath = payload.nodeId;
                    var path = payload.path;
                    if (modulePath !== 'root') {
                        path = [].concat(_toConsumableArray(modulePath.split('/').filter(Boolean)), _toConsumableArray(path));
                    }
                    store._withCommit(function () {
                        payload.set(store._state.data, path, payload.state.value);
                    });
                })();
            }
        });

        store.subscribe(function (mutation, state) {
            var data = {};

            if (mutation.payload) {
                data.payload = mutation.payload;
            }

            data.state = state;

            api.notifyComponentUpdate();
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);

            api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: {
                    time: Date.now(),
                    title: mutation.type,
                    data: data
                }
            });
        });

        store.subscribeAction({
            before: function before(action, state) {
                var data = {};
                if (action.payload) {
                    data.payload = action.payload;
                }
                action._id = actionId++;
                action._time = Date.now();
                data.state = state;

                api.addTimelineEvent({
                    layerId: ACTIONS_LAYER_ID,
                    event: {
                        time: action._time,
                        title: action.type,
                        groupId: action._id,
                        subtitle: 'start',
                        data: data
                    }
                });
            },
            after: function after(action, state) {
                var data = {};
                var duration = Date.now() - action._time;
                data.duration = {
                    _custom: {
                        type: 'duration',
                        display: duration + 'ms',
                        tooltip: 'Action duration',
                        value: duration
                    }
                };
                if (action.payload) {
                    data.payload = action.payload;
                }
                data.state = state;

                api.addTimelineEvent({
                    layerId: ACTIONS_LAYER_ID,
                    event: {
                        time: Date.now(),
                        title: action.type,
                        groupId: action._id,
                        subtitle: 'end',
                        data: data
                    }
                });
            }
        });
    });
}

// extracted from tailwind palette
var COLOR_LIME_500 = 0x84cc16;
var COLOR_DARK = 0x666666;
var COLOR_WHITE = 0xffffff;

var TAG_NAMESPACED = {
    label: 'namespaced',
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
};

/**
 * @param {string} path
 */
function extractNameFromPath(path) {
    return path && path !== 'root' ? path.split('/').slice(-2, -1)[0] : 'Root';
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorNode}
 */
function formatStoreForInspectorTree(module, path) {
    return {
        id: path || 'root',
        // all modules end with a `/`, we want the last segment only
        // cart/ -> cart
        // nested/cart/ -> cart
        label: extractNameFromPath(path),
        tags: module.namespaced ? [TAG_NAMESPACED] : [],
        children: Object.keys(module._children).map(function (moduleName) {
            return formatStoreForInspectorTree(module._children[moduleName], path + moduleName + '/');
        })
    };
}

/**
 * @param {import('@vue/devtools-api').CustomInspectorNode[]} result
 * @param {*} module
 * @param {string} filter
 * @param {string} path
 */
function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
        result.push({
            id: path || 'root',
            label: path.endsWith('/') ? path.slice(0, path.length - 1) : path || 'Root',
            tags: module.namespaced ? [TAG_NAMESPACED] : []
        });
    }
    Object.keys(module._children).forEach(function (moduleName) {
        flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + '/');
    });
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorState}
 */
function formatStoreForInspectorState(module, getters, path) {
    getters = path === 'root' ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
        state: Object.keys(module.state).map(function (key) {
            return {
                key: key,
                editable: true,
                value: module.state[key]
            };
        })
    };

    if (gettersKeys.length) {
        (function () {
            var tree = transformPathsToObjectTree(getters);
            storeState.getters = Object.keys(tree).map(function (key) {
                return {
                    key: key.endsWith('/') ? extractNameFromPath(key) : key,
                    editable: false,
                    value: canThrow(function () {
                        return tree[key];
                    })
                };
            });
        })();
    }

    return storeState;
}

function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function (key) {
        var path = key.split('/');
        if (path.length > 1) {
            (function () {
                var target = result;
                var leafKey = path.pop();
                path.forEach(function (p) {
                    if (!target[p]) {
                        target[p] = {
                            _custom: {
                                value: {},
                                display: p,
                                tooltip: 'Module',
                                abstract: true
                            }
                        };
                    }
                    target = target[p]._custom.value;
                });
                target[leafKey] = canThrow(function () {
                    return getters[key];
                });
            })();
        } else {
            result[key] = canThrow(function () {
                return getters[key];
            });
        }
    });
    return result;
}

function getStoreModule(moduleMap, path) {
    var names = path.split('/').filter(function (n) {
        return n;
    });
    return names.reduce(function (module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
            throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
    }, path === 'root' ? moduleMap : moduleMap.root._children);
}

function canThrow(cb) {
    try {
        return cb();
    } catch (e) {
        return e;
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupDevtoolsPlugin", function() { return setupDevtoolsPlugin; });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _api_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* empty/unused harmony star reexport *//* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* empty/unused harmony star reexport *//* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPerformanceSupported", function() { return _time_js__WEBPACK_IMPORTED_MODULE_5__["isPerformanceSupported"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "now", function() { return _time_js__WEBPACK_IMPORTED_MODULE_5__["now"]; });







function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = Object(_env_js__WEBPACK_IMPORTED_MODULE_0__["getTarget"])();
    const hook = Object(_env_js__WEBPACK_IMPORTED_MODULE_0__["getDevtoolsGlobalHook"])();
    const enableProxy = _env_js__WEBPACK_IMPORTED_MODULE_0__["isProxyAvailable"] && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
        hook.emit(_const_js__WEBPACK_IMPORTED_MODULE_1__["HOOK_SETUP"], pluginDescriptor, setupFn);
    }
    else {
        const proxy = enableProxy ? new _proxy_js__WEBPACK_IMPORTED_MODULE_2__["ApiProxy"](descriptor, hook) : null;
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor: descriptor,
            setupFn,
            proxy,
        });
        if (proxy)
            setupFn(proxy.proxiedTarget);
    }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDevtoolsGlobalHook", function() { return getDevtoolsGlobalHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTarget", function() { return getTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProxyAvailable", function() { return isProxyAvailable; });
function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-ignore
    return (typeof navigator !== 'undefined' && typeof window !== 'undefined')
        ? window
        : typeof global !== 'undefined'
            ? global
            : {};
}
const isProxyAvailable = typeof Proxy === 'function';

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOOK_SETUP", function() { return HOOK_SETUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOOK_PLUGIN_SETTINGS_SET", function() { return HOOK_PLUGIN_SETTINGS_SET; });
const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiProxy", function() { return ApiProxy; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);


class ApiProxy {
    constructor(plugin, hook) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = plugin;
        this.hook = hook;
        const defaultSettings = {};
        if (plugin.settings) {
            for (const id in plugin.settings) {
                const item = plugin.settings[id];
                defaultSettings[id] = item.defaultValue;
            }
        }
        const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
        let currentSettings = Object.assign({}, defaultSettings);
        try {
            const raw = localStorage.getItem(localSettingsSaveId);
            const data = JSON.parse(raw);
            Object.assign(currentSettings, data);
        }
        catch (e) {
            // noop
        }
        this.fallbacks = {
            getSettings() {
                return currentSettings;
            },
            setSettings(value) {
                try {
                    localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
                }
                catch (e) {
                    // noop
                }
                currentSettings = value;
            },
            now() {
                return Object(_time_js__WEBPACK_IMPORTED_MODULE_1__["now"])();
            },
        };
        if (hook) {
            hook.on(_const_js__WEBPACK_IMPORTED_MODULE_0__["HOOK_PLUGIN_SETTINGS_SET"], (pluginId, value) => {
                if (pluginId === this.plugin.id) {
                    this.fallbacks.setSettings(value);
                }
            });
        }
        this.proxiedOn = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target.on[prop];
                }
                else {
                    return (...args) => {
                        this.onQueue.push({
                            method: prop,
                            args,
                        });
                    };
                }
            },
        });
        this.proxiedTarget = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target[prop];
                }
                else if (prop === 'on') {
                    return this.proxiedOn;
                }
                else if (Object.keys(this.fallbacks).includes(prop)) {
                    return (...args) => {
                        this.targetQueue.push({
                            method: prop,
                            args,
                            resolve: () => { },
                        });
                        return this.fallbacks[prop](...args);
                    };
                }
                else {
                    return (...args) => {
                        return new Promise(resolve => {
                            this.targetQueue.push({
                                method: prop,
                                args,
                                resolve,
                            });
                        });
                    };
                }
            },
        });
    }
    async setRealTarget(target) {
        this.target = target;
        for (const item of this.onQueue) {
            this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
            item.resolve(await this.target[item.method](...item.args));
        }
    }
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPerformanceSupported", function() { return isPerformanceSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
let supported;
let perf;
function isPerformanceSupported() {
    var _a;
    if (supported !== undefined) {
        return supported;
    }
    if (typeof window !== 'undefined' && window.performance) {
        supported = true;
        perf = window.performance;
    }
    else if (typeof global !== 'undefined' && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
        supported = true;
        perf = global.perf_hooks.performance;
    }
    else {
        supported = false;
    }
    return supported;
}
function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* empty/unused harmony star reexport *//* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* empty/unused harmony star reexport *//* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* empty/unused harmony star reexport *//* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* empty/unused harmony star reexport *//* harmony import */ var _hooks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* empty/unused harmony star reexport *//* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* empty/unused harmony star reexport */







/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ })
/******/ ]);
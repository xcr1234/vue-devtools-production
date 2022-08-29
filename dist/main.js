// ==UserScript==
// @name            Vue生产环境（production） Devtools 调试
// @namespace       https://github.com/xcr1234/vue-devtools-production
// @version         1.1.0
// @description     使用本脚本支持直接调试生产环境的Vue项目 支持Vue2、Vue3！
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
 * @param devtools
 * @param root
 */
exports.hookVue2 = function (devtools, root) {
    //vue构造函数
    var vue = Object.getPrototypeOf(root).constructor;
    while (vue.super) {
        //Vue2有多级，要找到最顶级的
        vue = vue.super;
    }
    if (vue.config.devtools) {
        //当前已经开启了devtools了，避免在dev环境注入或者重复注入
        return;
    }
    //手工开启devtools
    vue.config.devtools = true;
    //这部分代码参考了vue2的源码
    //https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/index.js
    devtools.emit('init', vue);
    console.log("vue devtools for [" + vue.version + "] already open !!!");
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
};


/***/ })
/******/ ]);
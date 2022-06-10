// ==UserScript==
// @name            Vue生产环境（production） Devtools 调试
// @namespace       https://github.com/xcr1234/vue-devtools-production
// @version         1.0.0
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
/***/ (function(module, exports) {

var vue2 = function (hook, vue) {
    //vue构造函数
    //Vue2有多级，要找到最顶级的
    var Vue = vue.__proto__.constructor;
    while (Vue.super) {
        Vue = Vue.super;
    }
    if (Vue.config.devtools) {
        //当前是测试环境，不注入
        return;
    }
    Vue.config.devtools = true;
    //注册到Vue DevTool上，这部分代码参考了vue2的源码
    //https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/index.js
    hook.emit('init', Vue);
    console.log("vue devtools for [" + Vue.version + "] already open !!!");
    //如果有vuex store，也注册
    //参考vuex的源码实现
    if (vue.$store) {
        var store_1 = vue.$store;
        store_1._devtoolHook = hook;
        hook.emit('vuex:init', store_1);
        hook.on('vuex:travel-to-state', function (targetState) {
            store_1.replaceState(targetState);
        });
        store_1.subscribe(function (mutation, state) {
            hook.emit('vuex:mutation', mutation, state);
        });
    }
};
var getSymbol = function (value) {
    return typeof Symbol === 'function' ? Symbol(value) : value;
};
var vue3 = function (hook, vue) {
    // vue3的注册方式 参考了 vue-core的源码 实现
    // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/devtools.ts
    if (vue.config.devtools) {
        return;
    }
    vue.config.devtools = true;
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
var main = function () {
    if (self != top) {
        //在iframe中不执行此脚本
        return;
    }
    var hook = window['__VUE_DEVTOOLS_GLOBAL_HOOK__'];
    if (!hook) {
        console.warn('No Vue devtools found , Please install it first: ');
        console.warn('see https://blog.csdn.net/goog_man/article/details/112556875');
        return;
    }
    //脚本的运行时机为 document-end，因此脚本执行时 能获取到app对象
    var app = window['app'];
    if (!app) {
        return;
    }
    var observer = new MutationObserver((function (mutations, observer) {
        var disconnect = observer.disconnect.bind(observer);
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var target = mutations_1[_i].target;
            if (target['__vue__']) {
                vue2(hook, target['__vue__']);
                disconnect();
            }
            else if (target['__vue_app']) {
                vue3(hook, target['__vue_app']);
                disconnect();
            }
        }
    }));
    observer.observe(document.documentElement, {
        attributes: true,
        subtree: true,
        childList: true
    });
};
main();


/***/ })
/******/ ]);
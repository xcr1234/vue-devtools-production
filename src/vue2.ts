/**
 * Vue2的hook和devtools声明
 */
import {DevtoolsHook} from "./hook";

/**
 * 此声明为vuex注册到vue2上的store实例
 */
export interface Vue2Store {
    _devtoolHook: DevtoolsHook

    replaceState(state: any): void;

    subscribe(cb: (mutation: any, state: any) => void): void;
}

/**
 * 声明vue实例，也就是我们new Vue()产生的vue实例
 */
export interface Vue2 {
    $store?: Vue2Store,
}

/**
 * 声明Vue类，也就是我们import Vue from 'vue'用到的这个Vue
 */
export interface Vue2App{
    config: {
        devtools: boolean
    },
    version: string,
    super?: Vue2App
}

/**
 * Vue2注册到Vue DevTool上的方式
 * 参考资料 https://zhuanlan.zhihu.com/p/23921964
 * @param devtools
 * @param root
 */
export const hookVue2 = (devtools: DevtoolsHook, root: Vue2) => {
    //通过vue实例构造函数取出Vue实例
    let Vue: Vue2App = Object.getPrototypeOf(root).constructor
    while (Vue.super) {
        //Vue2有多级，要找到最顶级的
        Vue = Vue.super
    }
    if(Vue.config.devtools){
        //当前已经开启了devtools了，避免在dev环境注入或者重复注入
        return
    }
    //手工开启devtools
    Vue.config.devtools = true

    //这部分代码参考了vue2的源码
    //https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/index.js
    devtools.emit('init', Vue)

    console.log(`vue devtools for [${Vue.version}] already open !!!`)

    //如果有vuex store，也注册
    //参考vuex的源码实现
    if (root.$store) {
        const store = root.$store;
        store._devtoolHook = devtools;
        devtools.emit('vuex:init', store);
        devtools.on('vuex:travel-to-state', (targetState) => {
            store.replaceState(targetState);
        });
        store.subscribe( (mutation, state) => {
            devtools.emit('vuex:mutation', mutation, state);
        });
    }
}

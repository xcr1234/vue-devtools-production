import {Devtools} from "./devtools";
import {hookVue2} from "./vue2";
import {hookVue3} from "./vue3";
import {WindowApp} from "./window";

export default () => {
    const devtools: Devtools = window['__VUE_DEVTOOLS_GLOBAL_HOOK__']
    if (!devtools) {
        console.warn('No Vue devtools found , Please install it first: ')
        console.warn('see https://github.com/vuejs/vue-devtools')
        return
    }
    //脚本的运行时机为 document-end，因此脚本执行时 能获取到app对象
    const app = window.app
    if (!app) {
        return;
    }
    if (app.__vue__) {
        //脚本运行时就取到了Vue2 app，直接注入Vue2
        hookVue2(devtools, app.__vue__)
        return;
    }
    if(app.__vue_app__){
        //脚本运行时就取到了Vue3 app，直接注入Vue3
        hookVue3(devtools,app.__vue_app__)
        return;
    }
    //脚本运行时，vue2和vue3都没检测到，需要开启一个MutationObserver，动态检测
    //关于MutationObserver参考 https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
    const observer = new MutationObserver(((mutations, observer) => {
        const disconnect = observer.disconnect.bind(observer);
        for (const mutation of mutations) {
            //把target强制转成WindowApp，这样才能获取其中的实例
            const target = <WindowApp>mutation.target
            if(target.__vue__){
                hookVue2(devtools,target.__vue__)
                disconnect()
            }else if(target.__vue_app__){
                hookVue3(devtools,target.__vue_app__)
                disconnect()
            }
        }
    }))

    observer.observe(document.documentElement, {
        attributes: true,
        subtree: true,
        childList: true
    });
}

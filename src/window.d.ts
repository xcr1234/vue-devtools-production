/**
 * 为window.app、app.__vue__、app.__vue_app提供完整声明支持
 */

import {Vue2} from "./vue2";
import {Vue3App} from "./vue3";


declare interface WindowApp{
    __vue__?: Vue2,
    __vue_app__?: Vue3App
}
declare global{
    interface Window{
        app?:WindowApp
    }
}


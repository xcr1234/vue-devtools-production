import {Devtools} from "./devtools";

export interface Vue3App {
    config: {
        devtools: boolean
    },
    version: string
    unmount():void;
}


const getSymbol = (value: string): symbol| string => {
    return typeof Symbol === 'function' ? Symbol(value) : value
}

/**
 * vue3的注册方式
 * @param hook
 * @param vue
 */
export const hookVue3 = (hook: Devtools, vue: Vue3App) => {
    if(vue.config.devtools){
        //当前已经开启了devtools了，避免在dev环境注入或者重复注入
        return
    }
    //手工开启devtools
    vue.config.devtools = true

    // 参考了 vue-core的源码 实现
    // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/devtools.ts
    hook.emit('app:init',vue,vue.version,{
        Fragment: getSymbol('Fragment'),
        Text: getSymbol('Text'),
        Comment: getSymbol('Comment'),
        Static: getSymbol('Static')
    })

    console.log(`vue devtools for [${vue.version}] already open !!!`)

    const unmount = vue.unmount.bind(vue);
    vue.unmount = () => {
        hook.emit('app:unmount', vue);
        unmount();
    }
}

import {DevtoolsHook} from "./hook";
import {registerPiniaDevtools} from 'pinia'

export interface Vue3App {
    config: {
        devtools: boolean,
        globalProperties:{
            $store?:any
            $pinia?: any
        },
    },
    version: string
    unmount():void;
}


const newVersion = (version: string) => {
    if(version.includes('-alpha.')){
        //版本号包括-alpha，只获取前面的部分
        version = version.split('-alpha.')[0]
    }
    // 字符串判断版本号是否大于3.3
    const [major, minor] = version.split('.').map(Number);
    return major > 3 || (major === 3 && minor >= 3);}


/**
 * vue3的注册方式
 * @param hook
 * @param vue
 */
export const hookVue3 = (hook: DevtoolsHook, vue: Vue3App) => {
    if(vue.config.devtools){
        //当前已经开启了devtools了，避免在dev环境注入或者重复注入
        return
    }
    //手工开启devtools
    vue.config.devtools = true

    // 参考了 vue-core的源码 实现
    // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/devtools.ts

    if(newVersion(vue.version)){
        hook.emit('app:init',vue,vue.version,{
            Fragment: Symbol.for('v-fgt'),
            Text: Symbol.for('v-txt'),
            Comment:  Symbol.for('v-cmt'),
            Static: Symbol.for('v-stc')
        })
    }else{
        hook.emit('app:init',vue,vue.version,{
            Fragment: Symbol.for('Fragment'),
            Text: Symbol.for('Text'),
            Comment: Symbol.for('Comment'),
            Static: Symbol.for('Static')
        })
    }



    console.log(`vue devtools for [${vue.version}] already open !!!`)

    const unmount = vue.unmount.bind(vue);
    vue.unmount = () => {
        hook.emit('app:unmount', vue);
        unmount();
    }
    if(vue.config.globalProperties.$store){
        console.warn('vuex for vue3 not support. please use pinia')
    }
    const pinia = vue.config.globalProperties.$pinia
    if(pinia){
        registerPiniaDevtools(vue, pinia)
    }
}

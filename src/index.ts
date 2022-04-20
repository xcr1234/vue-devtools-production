const vue2 = (hook,vue) => {
    console.log(vue)
    //vue构造函数
    //Vue2有多级，要找到最顶级的
    let Vue = vue.__proto__.constructor;
    while (Vue.super) {
        Vue = Vue.super
    }

    if(Vue.config.devtools){
        //当前是测试环境，不注入
        return
    }

    Vue.config.devtools = true;


    //注册到Vue DevTool上，这部分代码参考了vue2的源码
    //https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/index.js
    hook.emit('init', Vue)

    console.log(`vue devtools for [${Vue.version}] already open !!!`)


    //如果有vuex store，也注册
    //参考vuex的源码实现
    if (vue.$store) {
        const store = vue.$store;
        store._devtoolHook = hook;
        hook.emit('vuex:init', store);
        hook.on('vuex:travel-to-state', function (targetState) {
            store.replaceState(targetState);
        });
        store.subscribe(function (mutation, state) {
            hook.emit('vuex:mutation', mutation, state);
        });
    }
}

const vue3 = (hook,vue) => {
    // vue3的注册方式 参考了 vue-core的源码 实现
    // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/devtools.ts
    if(vue.config.devtools){
        return
    }

    vue.config.devtools = true
    hook.emit('app:init',vue,vue.version,{
        Fragment: 'Fragment',
        Text: 'Text',
        Comment: 'Comment',
        Static: 'Static'
    })

    console.log(`vue devtools for [${vue.version}] already open !!!`)

    const unmount = vue.unmount.bind(vue);
    vue.unmount = function () {
        hook.emit('app:unmount', vue);
        unmount();
    }
}

const main = () => {

    if (self != top) {
        //在iframe中不执行此脚本
        return;
    }

    const hook = window['__VUE_DEVTOOLS_GLOBAL_HOOK__']
    if(!hook){

        console.warn('No Vue devtools found , Please install it first: ')
        console.warn('see https://blog.csdn.net/goog_man/article/details/112556875')

        return
    }
    //脚本的运行时机为 document-end，因此脚本执行时 能获取到app对象
    const app = window['app']
    if(!app){
        return;
    }

    const observer = new MutationObserver(((mutations, observer) => {
        const disconnect = observer.disconnect.bind(observer);
        for (const {target} of mutations) {
            if(target['__vue__']){
                vue2(hook,target['__vue__'])
                disconnect()
            }else if(target['__vue_app']){
                vue3(hook,target['__vue_app'])
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


main()

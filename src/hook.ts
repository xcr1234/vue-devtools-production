import {Vue2App, Vue2Store} from "./vue2";
import {Vue3App} from "./vue3";

/**
 * Vue Devtools Hook的声明
 * 也就是__VUE_DEVTOOLS_GLOBAL_HOOK__的声明
 *
 * 此声明参考了Vue官方的实现，有一些修改，参考：
 * https://github.com/vuejs/devtools/blob/main/packages/app-backend-api/src/global-hook.ts
 */
export interface DevtoolsHook {
    //emit方法原来的声明是  emit: (event: string, ...payload: any[])，后面可以是any，这里加上了一些参数：

    emit(type: string, app: Vue2App|Vue2Store, payload?: any)

    emit(type: string, app: Vue3App, version?: string, payload?: any);

    //on方法没有修改：
    on: <T extends Function>(event: string, handler: T) => void
}

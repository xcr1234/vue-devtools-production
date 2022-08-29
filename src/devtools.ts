import {Vue2App, Vue2Store} from "./vue2";
import {Vue3App} from "./vue3";

export interface Devtools {
    emit(type: string, app: Vue2App|Vue2Store, param?: any)

    emit(type: string, app: Vue3App, version?: string, param?: any);

    on(type: string, ev: (state: any) => void);
}

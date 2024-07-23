declare module "pinia"{

    /**
     * 此方法修改了pinia的源码，导出registerPiniaDevtools方法，在package.json中通过 "postinstall": "patch-package"加载
     * 方法来源：
     * https://github.com/vuejs/pinia/blob/v2/packages/pinia/src/devtools/plugin.ts
     * @param app vue实例
     * @param pinia pinia实例
     */
   export function registerPiniaDevtools(app: any, pinia : any);

}
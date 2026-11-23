# Vue生产环境（production） Devtools 调试

使用本脚本，在生产环境也可以使用Vue Devtools调试你的项目，支持Vue2、Vue3  
1.1版本对hook方式进行了重写，结构更清晰  
**2.0版本用vite重新编译，vue3去除vuex，改用pinia**

正常情况下，开启成功后，控制台会显示：，并且可以使用Vue Devtools(vue2)和pinia(vue3):

![img](https://pic.imgdb.cn/item/6506d2af661c6c8e5458a22c.png)

![img](https://pic.imgdb.cn/item/6506d2c1661c6c8e5458a4a9.png)

![img](.github/img_6.png)

使用方法：    
**方法1**  
在你的vue项目，按F12打开控制台，复制dist/main.js中的内容执行  
**方法2**  
（1）在浏览器安装 [tampermonkey](https://www.tampermonkey.net/) 插件  
（2）去[greasyfork](https://greasyfork.org/zh-CN/scripts/443634-vue%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83-production-devtools-%E8%B0%83%E8%AF%95)安装脚本

## 开发

https://github.com/xcr1234/tampermonkey-typescript

### Pinia 生产环境调试

脚本通过 `@vue/devtools-api` 注册检查面板，读取页面已有的 `$pinia`，不打包 Pinia 或 Vue 运行时，也不修改它们的源码。项目中的 Pinia 和 Vue 开发依赖只用于回归测试。

支持 root 和单个 store 的状态查看、编辑、状态变化刷新，以及可用时的 getters、自定义属性和 store 重置。生产 store 缺少 `_getters`、`_customProperties` 等调试字段时不会导致状态面板空白。此适配并不等于恢复原生 Pinia Devtools 的全部功能，例如操作时间线、导入导出和组件面板集成。

运行 `npm test` 验证生产 store 的读取、编辑和构建产物，运行 `npm run build` 生成 `dist/main.js`。页面上的 Pinia 版本不需要与测试依赖一致，但仍需使用目标页面验证兼容性。



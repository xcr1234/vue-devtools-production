# Vue生产环境（production） Devtools 调试 

使用本脚本，在生产环境也可以使用Vue Devtools调试你的项目，支持Vue2、Vue3  
1.1版本对hook方式进行了重写，结构更清晰  
正常情况下，开启成功后，控制台会显示：，并且可以使用Vue Devtools:

![img](https://s1.328888.xyz/2022/09/11/KEi8w.png)

![img](https://s1.328888.xyz/2022/09/11/KEWAi.png)


使用方法：    
**方法1**  
在你的vue项目，按F12打开控制台，复制dist/main.js中的内容执行  
**方法2**  
（1）在浏览器安装 [tampermonkey](https://www.tampermonkey.net/) 插件  
（2）去[greasyfork](https://greasyfork.org/zh-CN/scripts/443634-vue%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83-production-devtools-%E8%B0%83%E8%AF%95)安装脚本  

## 开发

一个完整的油猴脚本格式如下

```javascript
// ==UserScript==

// 这部分是头部区域，一般来说不会经常修改

// ==/UserScript==

// 这里是正文，也就是脚本的执行部分，是需要经常修改的
console.log('hello world')
```

## 头部区域

头部区域的开发是在`header/index.ts`，使用了typescript，这样会有IDE完全支持，而不是单纯的写几个注释

![img](https://s1.328888.xyz/2022/09/11/KLEVh.png)


开发完毕后执行`npm run build:header`编译

## 正文

正文开发是在`src/index.ts`，在开发时，如果使用到`GM_`相关函数，有完整的声明支持：

![img](https://s1.328888.xyz/2022/09/11/KEv6g.png)


## 热部署

1.先执行 `npm run build` 编译一次，编译结果为 `dist/main.js`

2.执行 `npm run start:server` 启动 `http://localhost:7000`服务

默认用户名/密码为`derjanb / secret`

在油猴中设置

![img](https://s1.328888.xyz/2022/09/11/KLm90.png)


3.点 + ，把第1步编译的结果`dist/main.js`粘贴进去 保存

![img](https://s1.328888.xyz/2022/09/11/KLLHn.png)

![img](https://s1.328888.xyz/2022/09/11/KLlFs.png)

![img](https://s1.328888.xyz/2022/09/11/KLm90.png)

4.执行 `npm run sync`，现在每次更新就会自动同步到油猴中了，不需要手动粘贴！

## 发布

执行 `npm run build` 编译最新的文件

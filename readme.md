# Vue生产环境（production） Devtools 调试 

使用本脚本，在生产环境也可以使用Vue Devtools调试你的项目，支持Vue2、Vue3

## 开发

如果修改了`header/index.ts`，需要执行`npm run build:header`编译一下头

代码在`src/index.ts`中

## 热部署

1.先执行 `npm run build` 编译一次，编译结果为 `dist/main.js`

2.执行 `npm run start:server` 启动 `http://localhost:7000`服务

默认用户名/密码为`derjanb / secret`

在油猴中设置

![img](.github/img_4.png)


3.点 + ，把第1步编译的结果`dist/main.js`粘贴进去 保存

![img](.github/img_5.png)

![img](.github/img_2.png)

![img](.github/img_3.png)

4.执行 `npm run sync`，现在每次更新就会自动同步到油猴中了，不需要手动粘贴！

## 发布

执行 `npm run build` 编译最新的文件

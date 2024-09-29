![1727579182994](image/README/1727579182994.png)

# _代码跳转工具（code-link）Alt+鼠标左键点击跳转_

一个实现 dom 元素跳转至对应代码行的 vite 插件，运行环境为 vite+vue3+VSCode

通过 Alt+鼠标左键的方式点击 dom 元素跳转至 VSCode 对应行。

如果点击元素在代码中不存在，则会跳转至其存在代码的父元素，如 ElementPlus 中的 table 中的元素。

## 引入

1、引入 vite 插件和客户端点击插件；

```npm
npm install vite-plugin-vue-code-dev-link
npm install code-dev-link-client
```

2、vite.config.js 中使用；

```js
//...
import { codeLinkServer, codeLinkLoader } from "vite-plugin-vue-code-dev-link";

export default defineConfig({
    plugins: [
        //...
        codeLinkServer(),
        codeLinkLoader(),
    ],
    //...
});
```

3、入口文件 main.js 中使用

```js
import client from "code-dev-link-client";

if (process.env.NODE_ENV === "development") {
    client();
}
```

## 编辑器命令加入环境变量

### vscode 的 code 命令

-   vscode 的定位功能是基于 vscode 的 code 命令实现的，所以请确认 code 命令是否有效(cmd 或 shell 里直接执行 code)
-   若 code 命令找不到请如下操作:
    方案 1
    使用 command + shift + p (注意 window 下使用 ctrl + shift + p ) 然后搜索 code，选择 install 'code' command in path。
    方案 2
    也可直接手动将 code 命令的路径添加到环境变量中

## 注意事项

-   插件会根据生产与开发环境决定是否启用，不会对生产环境造成任何影响
-   仅支持 vue+vite+vscode，如果想在 webpack 用类似功能的可以参考[这个](https://github.com/chana1024/linzhinan-vue-code-link/tree/master)，如果想在 react 里使用类似功能可以用[LocatorJS](https://www.locatorjs.com/)，本插件是因为环境和二者都不符故才自己动手。当然也抄了二者非常多东西，嘿嘿。
-   第一次发布插件，存在 bug 的话可以发邮件至707080965@qq.com

---
title: 一些 vue-cli 3.0 使用过程中碰到的兼容性问题
date: 2019-02-22 10:36:49
tags: 
  -js
  -webpack
  -vue-cli
---

<!-- more -->

## 0. 出兼容性问题的表现列表：

> “Promise” 未定义。
>> 最常见于下述问题 1

> 某种函数未定义，

> 各种无效字符

![](./0.jpg)

## 1. 重点注意 插件 使用。

问题原因

* 因为 vue-cli 3.0 默认加载 `es6.promise`
* 加上 vue-cli 3.0 为了减小打包大小，不会自动编译用户引入的插件，如果你引用了 es6+ 语法的插件，逃过编译的插件代码就会搞死你。

解决办法

* 首先查看 package.json ，检查引入编译的插件里是否有用 es6+ 语法的
* 如果你不能一眼看出哪个使用了 es6+ ，这里提供一个笨办法：点到 node_modules 里查看插件的代码
* 找到插件后 编辑 `vue.config.js`，添加 项：`transpileDependencies: ['element-ui-verify', 'vuex']`，将有兼容性问题的插件填入，显示地提醒 babel 编译他们。

## 2. 某种函数未定义

问题原因

* 代码中使用的 es6+ 语法开发逃过了 babel 编译。

解决办法

* 下述 问题 3 的解决办法这里也适用，这里再说一种事急从权的简单办法：
* 某种函数没哟，就可以直接 hack 一下 
* 比如 Array.from() 函数
```
if (!Array.from) {
  Array.from = function (iterable: any) {
    return [].slice.call(new Uint8Array(iterable))
  }
}
```


## 3. 不明原因的问题。

问题原因

* 暂时未找到明确问题原因，猜想是开发过程中使用了一些隐式的代码逃过了 babel 的**自动选择**编译

解决办法

* 笨办法，入口文件添加：`import '@babel/polyfill';`，多入口项目每个入口都需要引入，可以设置一个公用库，每个入口都引入公用库
* vue-cli 3.0 还需要配置 `babel.config.js` 文件

![](./1.jpg)
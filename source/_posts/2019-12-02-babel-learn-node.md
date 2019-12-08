---
title: Babel 学习笔记
date: 2019-12-02 15:11:28
tags: -js
categories: 前端--js
---
sdf
<!-- more -->
## 学习文字思维图

babel (js 编译器(AST(抽象语法树)转换)：语法转换，添加环境缺失的polyfill，源码转换) => 

核心 @babel/core <]
命令行工具 @babel/cli => babel src --out-dir lib watch <]
插件系统(plugins) => 

语法插件，转换插件 => 

@babel-polyfill(为浏览器添加新的 API 片段集) => 

core-js <]

regenerator <]

缺点: 大（89kb） 、污染全局变量 <]

@babel/plugin-transform-runtime(避免编译后的代码中出现重复的帮助程序，有效减少包体积，避免全局污染) => 

配合 @babel/runtime 使用 <]

不支持实例方法 如：`[1,2,3].includes(1)`,但配合 @babel/runtime-corejs3 可以

需要处理 polyfill 的多次引用的话 添加 @babel/runtime-corejs3 <]<]<]

预设(presets: 一组相互配合的插件) =>

官方 Preset => 

@babel/preset-env(对目标浏览器缺失功能进行转换和加载polyfill) => 

浏览器环境配置([.browserslistrc](https://github.com/browserslist/browserslist)) <]

参数配置 =>

useBuiltIns(按需引入) => usage <]

[corejs](https://github.com/zloirock/core-js)(JavaScript 的模块化标准库) => 3(最新特性集) <]<]<]

插件和预设的执行原则 =>

Plugin 最先执行 <]

Plugins 数组从小的角标小的开始执行<]

Presets 从数组末尾脚本开始执行 <]<]

## 常用的babel配置文件

.bablerc
```json
{ 
  "presets": [ 
    ["@babel/preset-env", { 
      "modules": false, // 模块使用 es modules ，不使用 commonJS 规范 
      "useBuiltIns": "usage", // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill 
      "corejs": 3 // 就是以前的babel-polyfill 
    }], 
    "@babel/preset-react" 
  ], 
  "plugins": [ 
    ["@babel/plugin-proposal-decorators", { // 解析类的装饰器 
      "legacy": true 
    }], 
    ["@babel/plugin-proposal-class-properties", { // 解析class语法 
      "loose": true 
    }], 
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNavbabeljs.io/docs/en/babel-... 
    // 去除重复代码 
    // A plugin that enables the re-use of Babel's injected helper code to save on codesize 
    [ 
      "@babel/plugin-transform-runtime", 
      { 
        // 上面presets useBuiltIns写了，这里就不用写了 
        // "corejs": 3, // you can directly import "core-js" or use @babel/preset-env's useBuiltIns option. 
        "helpers": true, // 默认 
        "regenerator": false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime 
        "useESModules": true // 使用 es modules helpers, 减少 commonJS 语法代码 
      } 
    ], 
    // https://babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.htmlbabeljs.io/docs/en/next/b... 
    "@babel/plugin-syntax-dynamic-import" // 懒加载 
  ] 
}
```
简易版
```json
{
  "presets": [
    [
      "@babel/preset-env", {
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```
.browserslistrc
```
> 1%
last 2 versions
Firefox ESR
not ie 10
not ie_mob 10

[development]
last 1 chrome version
```
webpack 
```js
module: {
  rules: [
    {
        {
          test: /\.js$/,
          exclude: file => /node_modules/.test(file),
          loader: 'babel-loader',
        },
    }
  ]
}
```
package.json
```json
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/preset-env": "^7.2.3",
    "@babel/runtime": "^7.2.0",
    "babel-loader": "^8.0.4",
  }
```
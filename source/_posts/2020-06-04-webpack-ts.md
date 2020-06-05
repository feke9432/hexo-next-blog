---
title: 如何做一个 webpack TypeScript 模板
date: 2020-06-04 10:25:20
tags: 
  - webpack
  - TypeScript
categories: 前端--js
---

如何做一个 webpack TypeScript 模板
<!-- more -->

## 资料

1. [webpack 官网](https://www.webpackjs.com/guides/installation/)

## 开始

### 安装依赖：

```s
npm install --save-dev webpack webpack-cli

npm install --save-dev typescript ts-loader
```

### 根目录添加 `webpack.config.js` 文件，填入官网抄来的基础配置：

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### 根目录添加 `tsconfig.json` 文件，填入官网抄来的基础配置：

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

### 为了能在项目中少打几个字母，我们配置别名：

1. 在`webpack.config.js`文件中
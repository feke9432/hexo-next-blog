---
title: 使用 koa2 搭一个简易服务器
date: 2019-01-15 14:25:21
tags: 
  - js
  - node
categories: 服务端--node
---

研究微信小程序时候需要一个简易的后台服务器，加上想尝试一下 koa2

<!-- more -->

初步计划：

1. 安装本地版本，边学变做，文章：[Koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)

2. 建立本地 git 仓库，建立个人服务的 远程仓库，每次通过 git 推送完成代码传输

3. 使用 pm2 守护服务进程。

## 本地操作

### 安装 koa

```
$ npm init
$ npm i koa -s
```

书写 hello world 代码测试：

```
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```

访问本地 `http://localhost:3000/`，看到`hello koa2` 即为成功

### 安装 MySql

我这里使用 msi 安装，教程[MySql5.6msi细安装教程](https://blog.csdn.net/q1035331653/article/details/80256170)
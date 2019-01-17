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

2. 建立本地 git 仓库，建立个人服务器的 远程仓库，每次通过 git 推送完成代码传输(失败，可以推送，但.git 后缀名的文件夹npm无法安装依赖)

3. 使用 pm2 守护服务进程。

4. 服务器域名添加到小程序开发项后就可以使用了

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

## 远程操作

### 搭建远程Git服务器

大体参考[搭建Git服务器](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000)

两个重点再次强调：

1. 每次建立新仓库后要把仓库权限改为git：`chown -R git:git 仓库名.git`
2. 每次修改配置文件后，如果不想重启服务器，可以执行：`source 配置文件路径`，来使配置文件立马生效

### 配置静态文件目录

1. 安装插件 `koa-static`，添加如下代码，根目录新建文件夹 `views` 作为我们静态页面的根目录

```
const static = require('koa-static')
app.use(static(
  path.join(__dirname, './views')
))
```

接着在 views 文件夹内放一个 index.html 文件，随便填写一些内容，

重跑服务后，访问响应端口，就可以看到我们刚写的 html 了。

当然，为了以后维护方便，我们把公共参数提取到一处，

根目录新建文件夹 `config`，文件夹下新建 `config.js` 添加如下代码

```
const STATIC_HMTL_PATH = './Views'

module.exports = {
  STATIC_HMTL_PATH
}
```

其实就是设置一个具有语义化的常量承载我们的静态页目录，然后在 服务文件 中使用：

```
let { STATIC_HMTL_PATH } = require('./Config/config')
app.use(static(
  path.join(__dirname, STATIC_HMTL_PATH)
))

```

### 配置 https

1. 申请 ssl 证书，我这里申请的是百度云的免费证书，具体过程不再赘述，成功后获得文件如下：

![证书文件](./0.jpg)

项目跟目录新建 ssl 文件夹，将文件复制进去

2. koa2 安装插件 `koa-sslify` ，添加如下代码

```
const enforceHttps = require('koa-sslify')
const fs = require('fs')
const https = require('https')
const http = require('http')

var options = {
  key: fs.readFileSync('./ssl/xxx.key', 'utf8'),  //ssl文件路径
  cert: fs.readFileSync('./ssl/xxx.cer', 'utf8')  //ssl文件路径
};
// app.listen(3000)
http.createServer(app.callback()).listen(3001);
https.createServer(options, app.callback()).listen(3000);
```

重跑服务后，即可享用 https 了。